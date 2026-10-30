export const STOCKFISH_SEARCH = Object.freeze({
  depth: 16,
  threads: 1,
  hashMb: 16,
  multiPv: 3
});
const MAX_SEARCH_MS = 120_000;

const APP_BASE_URL = import.meta.env?.BASE_URL || '/';

function abortError() {
  return new DOMException('Analysis was cancelled.', 'AbortError');
}

export function parseStockfishInfo(line, turn) {
  if (!line.startsWith('info ')) return null;
  if (/\b(?:upperbound|lowerbound)\b/.test(line)) return null;

  const depth = Number(line.match(/\bdepth\s+(\d+)/)?.[1]);
  const multiPv = Number(line.match(/\bmultipv\s+(\d+)/)?.[1] || 1);
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
    multiPv,
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
    multiPv = STOCKFISH_SEARCH.multiPv,
    workerUrl = `${APP_BASE_URL}stockfish.js`
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

    this.settings = { threads, hashMb, multiPv };
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
      if (info) {
        const search = this.activeSearch;
        const previous = search.lines.get(info.multiPv);
        if (!previous || info.depth >= previous.depth) {
          search.lines.set(info.multiPv, info);
        }
        if (info.multiPv === 1 && info.pv.length && search.onUpdate) {
          search.onUpdate(this.buildResult(search.lines, info.pv[0], search.fen));
        }
      }
    } else if (line.startsWith('bestmove ')) {
      const search = this.activeSearch;
      this.finishSearch(search);
      if (search.cancelled) return;
      const bestMoveUci = line.split(/\s+/)[1];
      try {
        search.resolve(this.buildResult(search.lines, bestMoveUci, search.fen));
      } catch (error) {
        search.rejectOnce(error);
      }
    }
  }

  finishSearch(search) {
    if (this.activeSearch === search) this.activeSearch = null;
    clearTimeout(search.timeout);
    clearTimeout(search.stopTimeout);
    search.signal?.removeEventListener('abort', search.abort);
    search.finish();
  }

  stopSearch(search, error) {
    if (this.activeSearch !== search || search.cancelled) return;
    search.cancelled = true;
    search.failure = error?.name === 'AbortError' ? null : error;
    search.rejectOnce(error);
    clearTimeout(search.timeout);
    this.worker.postMessage('stop');
    search.stopTimeout = setTimeout(() => {
      if (this.activeSearch !== search) return;
      search.failure = new Error('Stockfish did not finish the stopped search.');
      this.finishSearch(search);
    }, 5000);
  }

  fail(error) {
    for (const waiter of this.waiters.splice(0)) {
      clearTimeout(waiter.timeout);
      waiter.cleanup();
      waiter.reject(error);
    }
    if (this.activeSearch) {
      const search = this.activeSearch;
      this.finishSearch(search);
      search.failure = error;
      search.rejectOnce(error);
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

  async initialize() {
    if (this.readyPromise) return this.readyPromise;
    this.readyPromise = (async () => {
      const uciReady = this.waitForLine((line) => line === 'uciok', 30000);
      this.worker.postMessage('uci');
      await uciReady;
      await new Promise((resolve) => setTimeout(resolve, 10));
      this.settings.threads = this.clampOption('Threads', this.settings.threads);
      this.settings.hashMb = this.clampOption('Hash', this.settings.hashMb);
      this.settings.multiPv = this.options.has('MultiPV')
        ? this.clampOption('MultiPV', this.settings.multiPv)
        : 1;
      this.setOptionIfChanged('Threads', this.settings.threads);
      this.setOptionIfChanged('Hash', this.settings.hashMb);
      this.setOptionIfChanged('MultiPV', this.settings.multiPv);
      this.setOptionIfChanged('Ponder', false);
      this.worker.postMessage('ucinewgame');
      await new Promise((resolve) => setTimeout(resolve, 10));
      const ready = this.waitForLine((line) => line === 'readyok', 30000);
      this.worker.postMessage('isready');
      await ready;
    })();
    try {
      return await this.readyPromise;
    } catch (error) {
      this.readyPromise = null;
      throw error;
    }
  }

  clampOption(name, requestedValue) {
    const option = this.options.get(name);
    if (!option || option.type !== 'spin') return requestedValue;
    return Math.max(option.min, Math.min(option.max, requestedValue));
  }

  setOptionIfChanged(name, value) {
    const option = this.options.get(name);
    if (!option) return;
    if (option?.defaultValue === String(value)) return;
    this.worker.postMessage(`setoption name ${name} value ${value}`);
  }

  async analyze(fen, signal, onUpdate = null) {
    if (this.closed) throw new Error('Stockfish engine is closed.');
    if (signal?.aborted) throw abortError();
    await this.initialize();
    if (this.closed) throw new Error('Stockfish engine is closed.');
    if (signal?.aborted) throw abortError();
    if (this.activeSearch) {
      const previousSearch = this.activeSearch;
      if (!previousSearch.cancelled) throw new Error('Stockfish already has an active search.');
      await previousSearch.finished;
      if (previousSearch.failure) throw previousSearch.failure;
    }
    if (signal?.aborted) throw abortError();

    const turn = fen.split(' ')[1];
    return new Promise((resolve, reject) => {
      let finish;
      let settled = false;
      const finished = new Promise((resolveFinished) => { finish = resolveFinished; });
      const rejectOnce = (error) => {
        if (settled) return;
        settled = true;
        reject(error);
      };
      const search = {
        fen,
        turn,
        lines: new Map(),
        onUpdate,
        signal,
        cancelled: false,
        failure: null,
        finished,
        finish,
        rejectOnce,
        resolve,
        reject,
        abort: null,
        timeout: null,
        stopTimeout: null
      };
      search.abort = () => this.stopSearch(search, abortError());
      search.timeout = setTimeout(() => {
        this.stopSearch(
          search,
          new Error(`Stockfish search exceeded its 120 second limit at depth ${this.depth}.`)
        );
      }, MAX_SEARCH_MS);

      this.activeSearch = search;
      signal?.addEventListener('abort', search.abort, { once: true });
      if (signal?.aborted) search.abort();
      this.worker.postMessage(`position fen ${fen}`);
      if (!search.cancelled) this.worker.postMessage(`go depth ${this.depth}`);
    });
  }

  buildResult(lines, bestMoveUci, fen) {
    const orderedLines = [...lines.entries()]
      .sort(([rankA], [rankB]) => rankA - rankB)
      .map(([rank, info]) => ({ ...info, rank }));
    const info = lines.get(1) || orderedLines[0];
    if (!info) throw new Error('Stockfish returned no valid evaluation.');
    const currentDepthLines = orderedLines.filter((line) => line.depth === info.depth);
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
      lines: currentDepthLines.map((line) => ({
        rank: line.rank,
        depth: line.depth,
        nodes: line.nodes,
        whiteCp: line.whiteCp,
        mate: line.mate,
        bestMoveUci: line.pv[0] || null,
        pv: line.pv
      })),
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

export class StockfishPool {
  constructor({
    depth = STOCKFISH_SEARCH.depth,
    threads = STOCKFISH_SEARCH.threads,
    hashMb = STOCKFISH_SEARCH.hashMb,
    multiPv = 1,
    size = 1
  } = {}) {
    this.size = Math.max(1, size);
    this.depth = depth;
    this.settings = { threads, hashMb, multiPv };
    this.engineVersion = 'Stockfish (pool)';
    this.engines = Array.from({ length: this.size }, () => new StockfishEngine({ depth, threads, hashMb, multiPv }));
    this.idle = [...this.engines];
    this.queue = [];
    this.closed = false;
  }

  async acquire(signal) {
    if (this.closed) throw new Error('Stockfish pool is closed.');
    if (signal?.aborted) throw abortError();
    if (this.idle.length > 0) {
      return this.idle.pop();
    }
    return new Promise((resolve, reject) => {
      const onAbort = () => {
        const idx = this.queue.findIndex(item => item.resolve === resolve);
        if (idx !== -1) this.queue.splice(idx, 1);
        reject(abortError());
      };
      signal?.addEventListener('abort', onAbort, { once: true });
      this.queue.push({
        resolve: (engine) => {
          signal?.removeEventListener('abort', onAbort);
          resolve(engine);
        },
        reject
      });
    });
  }

  release(engine) {
    if (this.closed) {
      try { engine.close(); } catch {}
      return;
    }
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      next.resolve(engine);
    } else {
      this.idle.push(engine);
    }
  }

  async analyze(fen, signal, onUpdate = null) {
    const engine = await this.acquire(signal);
    try {
      const result = await engine.analyze(fen, signal, onUpdate);
      if (engine.engineVersion && this.engineVersion === 'Stockfish (pool)') {
        this.engineVersion = engine.engineVersion;
      }
      return result;
    } finally {
      this.release(engine);
    }
  }

  close() {
    if (this.closed) return;
    this.closed = true;
    for (const item of this.queue) {
      item.reject(new Error('Stockfish pool was closed.'));
    }
    this.queue = [];
    for (const engine of this.engines) {
      try {
        engine.close();
      } catch {}
    }
    this.idle = [];
  }
}

