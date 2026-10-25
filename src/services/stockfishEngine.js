export const STOCKFISH_SEARCH = Object.freeze({
  depth: 12,
  threads: 1,
  hashMb: 16,
  multiPv: 1
});

function abortError() {
  return new DOMException('Analysis was cancelled.', 'AbortError');
}

export function parseStockfishInfo(line, turn) {
  if (!line.startsWith('info ')) return null;
  if (/\b(?:upperbound|lowerbound)\b/.test(line)) return null;

  const depth = Number(line.match(/\bdepth\s+(\d+)/)?.[1]);
  const nodes = Number(line.match(/\bnodes\s+(\d+)/)?.[1] || 0);
  const cpMatch = line.match(/\bscore cp (-?\d+)/);
  const mateMatch = line.match(/\bscore mate (-?\d+)/);
  const pv = line.match(/\bpv\s+(.+)$/)?.[1]?.trim().split(/\s+/) || [];

  if (!Number.isFinite(depth) || (!cpMatch && !mateMatch)) return null;

  const rawMate = mateMatch ? Number(mateMatch[1]) : null;
  const rawScore = rawMate === null
    ? Number(cpMatch[1])
    : Math.sign(rawMate || 1) * (10000 - Math.abs(rawMate) * 10);
  const whiteSign = turn === 'w' ? 1 : -1;

  return {
    depth,
    nodes,
    whiteCp: rawScore * whiteSign,
    mate: rawMate === null ? null : rawMate * whiteSign,
    pv
  };
}

export class StockfishEngine {
  constructor({
    depth = STOCKFISH_SEARCH.depth,
    threads = STOCKFISH_SEARCH.threads,
    hashMb = STOCKFISH_SEARCH.hashMb,
    workerUrl = '/stockfish.js'
  } = {}) {
    if (typeof Worker !== 'function') {
      throw new Error('Web Workers are not available in this environment.');
    }

    this.depth = depth;
    this.worker = new Worker(workerUrl);
    this.waiters = [];
    this.activeSearch = null;
    this.readyPromise = null;
    this.engineVersion = 'Stockfish (bundled)';
    this.closed = false;
    this.options = new Map();

    this.worker.addEventListener('message', (event) => this.handleMessage(String(event.data).trim()));
    this.worker.addEventListener('error', (event) => {
      this.fail(new Error(event.message || 'Stockfish worker failed.'));
    });

    this.settings = { threads, hashMb };
  }

  handleMessage(line) {
    if (line.startsWith('id name ')) this.engineVersion = line.slice(8);
    if (line.startsWith('option name ')) {
      const option = line.match(/^option name (.+?) type (\w+)(.*)$/);
      const limits = option?.[3].match(/\bmin (-?\d+) max (-?\d+)/);
      const defaultValue = option?.[3].match(/\bdefault ([^\s]+)/)?.[1];
      if (option) {
        this.options.set(option[1], {
          type: option[2],
          min: limits ? Number(limits[1]) : null,
          max: limits ? Number(limits[2]) : null,
          defaultValue
        });
      }
    }

    for (let index = this.waiters.length - 1; index >= 0; index--) {
      const waiter = this.waiters[index];
      if (waiter.matches(line)) {
        this.waiters.splice(index, 1);
        clearTimeout(waiter.timeout);
        waiter.cleanup();
        waiter.resolve(line);
      }
    }

    if (!this.activeSearch) return;
    if (line.startsWith('info ')) {
      const info = parseStockfishInfo(line, this.activeSearch.turn);
      if (info && (!this.activeSearch.info || info.depth >= this.activeSearch.info.depth)) {
        this.activeSearch.info = info;
      }
    } else if (line.startsWith('bestmove ')) {
      const search = this.activeSearch;
      this.activeSearch = null;
      clearTimeout(search.timeout);
      search.signal?.removeEventListener('abort', search.abort);
      const bestMoveUci = line.split(/\s+/)[1];
      search.resolve(this.buildResult(search.info, bestMoveUci, search.fen));
    }
  }

  fail(error) {
    for (const waiter of this.waiters.splice(0)) {
      clearTimeout(waiter.timeout);
      waiter.cleanup();
      waiter.reject(error);
    }
    if (this.activeSearch) {
      const search = this.activeSearch;
      this.activeSearch = null;
      clearTimeout(search.timeout);
      search.signal?.removeEventListener('abort', search.abort);
      search.reject(error);
    }
  }

  waitForLine(matches, timeoutMs = 30000, signal) {
    if (signal?.aborted) return Promise.reject(abortError());
    return new Promise((resolve, reject) => {
      const cleanup = () => signal?.removeEventListener('abort', abort);
      const waiter = {
        matches,
        resolve,
        reject,
        timeout: setTimeout(() => {
          this.waiters = this.waiters.filter((item) => item !== waiter);
          cleanup();
          reject(new Error('Timed out waiting for Stockfish UCI response.'));
        }, timeoutMs),
        cleanup
      };
      const abort = () => {
        this.waiters = this.waiters.filter((item) => item !== waiter);
        clearTimeout(waiter.timeout);
        cleanup();
        reject(abortError());
      };
      signal?.addEventListener('abort', abort, { once: true });
      this.waiters.push(waiter);
    });
  }

  async initialize(signal) {
    if (this.readyPromise) return this.readyPromise;
    this.readyPromise = (async () => {
      const uciReady = this.waitForLine((line) => line === 'uciok', 30000, signal);
      this.worker.postMessage('uci');
      await uciReady;
      await new Promise((resolve) => setTimeout(resolve, 10));
      this.settings.threads = this.clampOption('Threads', this.settings.threads);
      this.settings.hashMb = this.clampOption('Hash', this.settings.hashMb);
      this.setOptionIfChanged('Threads', this.settings.threads);
      this.setOptionIfChanged('Hash', this.settings.hashMb);
      this.setOptionIfChanged('MultiPV', STOCKFISH_SEARCH.multiPv);
      this.setOptionIfChanged('Ponder', false);
      await new Promise((resolve) => setTimeout(resolve, 10));
      const ready = this.waitForLine((line) => line === 'readyok', 30000, signal);
      this.worker.postMessage('isready');
      await ready;
    })();
    return this.readyPromise;
  }

  clampOption(name, requestedValue) {
    const option = this.options.get(name);
    if (!option || option.type !== 'spin') return requestedValue;
    return Math.max(option.min, Math.min(option.max, requestedValue));
  }

  setOptionIfChanged(name, value) {
    const option = this.options.get(name);
    if (option?.defaultValue === String(value)) return;
    this.worker.postMessage(`setoption name ${name} value ${value}`);
  }

  async analyze(fen, signal) {
    if (this.closed) throw new Error('Stockfish engine is closed.');
    if (signal?.aborted) throw abortError();
    await this.initialize(signal);
    if (signal?.aborted) throw abortError();
    if (this.activeSearch) throw new Error('Stockfish already has an active search.');

    const ready = this.waitForLine((line) => line === 'readyok', 30000, signal);
    this.worker.postMessage('ucinewgame');
    this.worker.postMessage('isready');
    await ready;
    if (signal?.aborted) throw abortError();

    const turn = fen.split(' ')[1];
    return new Promise((resolve, reject) => {
      const abort = () => {
        if (!this.activeSearch) return;
        this.worker.postMessage('stop');
        const search = this.activeSearch;
        this.activeSearch = null;
        clearTimeout(search.timeout);
        signal?.removeEventListener('abort', abort);
        reject(abortError());
      };
      const search = {
        fen,
        turn,
        info: null,
        signal,
        abort,
        resolve,
        reject,
        timeout: setTimeout(() => {
          this.worker.postMessage('stop');
          this.activeSearch = null;
          signal?.removeEventListener('abort', abort);
          reject(new Error(`Stockfish search exceeded its 60 second limit at depth ${this.depth}.`));
        }, 60000)
      };

      this.activeSearch = search;
      signal?.addEventListener('abort', abort, { once: true });
      this.worker.postMessage(`position fen ${fen}`);
      this.worker.postMessage(`go depth ${this.depth}`);
    });
  }

  buildResult(info, bestMoveUci, fen) {
    if (!info) throw new Error('Stockfish returned no valid evaluation.');
    const bestMove = bestMoveUci && bestMoveUci !== '(none)' ? bestMoveUci : null;
    return {
      source: 'stockfish-local',
      engineVersion: this.engineVersion,
      depth: info.depth,
      nodes: info.nodes,
      whiteCp: info.whiteCp,
      mate: info.mate,
      bestMoveUci: bestMove,
      pv: info.pv,
      fen
    };
  }

  close() {
    if (this.closed) return;
    this.closed = true;
    this.fail(new Error('Stockfish engine was closed.'));
    this.worker.terminate();
  }
}
