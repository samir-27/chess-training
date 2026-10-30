import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { Chess } from 'chess.js';
import {
  calculateMoveAccuracy,
  centipawnsToWinChance,
  classifyMove,
  analyzePgnGame,
  createAnalysisPreview,
  Classification
} from '../services/gameAnalysisEngine.js';
import { normalizeFenKey, evaluatePositionOnline } from '../services/lichessAnalysisApi.js';
import { parseStockfishInfo, StockfishEngine, StockfishPool, STOCKFISH_SEARCH } from '../services/stockfishEngine.js';

describe('Game analysis engine', () => {
  test('converts centipawn scores to a symmetric win probability', () => {
    assert.equal(centipawnsToWinChance(0), 50);
    assert.ok(centipawnsToWinChance(100) > 50);
    assert.ok(centipawnsToWinChance(-100) < 50);
    assert.ok(Math.abs(centipawnsToWinChance(500) + centipawnsToWinChance(-500) - 100) < 0.001);
  });

  test('accuracy is bounded and decreases as win-probability loss increases', () => {
    const best = calculateMoveAccuracy(0);
    const moderate = calculateMoveAccuracy(10);
    const severe = calculateMoveAccuracy(50);
    assert.equal(best, 100);
    assert.ok(best > moderate && moderate > severe);
    assert.ok(severe >= 0 && severe <= 100);
  });

  test('normalizes UCI scores to White perspective, including mate scores', () => {
    assert.deepEqual(
      parseStockfishInfo('info depth 12 score cp 34 nodes 1200 pv e2e4', 'w'),
      { depth: 12, multiPv: 1, nodes: 1200, whiteCp: 34, mate: null, pv: ['e2e4'] }
    );
    assert.deepEqual(
      parseStockfishInfo('info depth 18 score cp 34 nodes 1200 pv e7e5', 'b'),
      { depth: 18, multiPv: 1, nodes: 1200, whiteCp: -34, mate: null, pv: ['e7e5'] }
    );
    const mate = parseStockfishInfo('info depth 20 score mate -3 nodes 900 pv e7e5', 'b');
    assert.equal(mate.mate, 3);
    assert.equal(mate.whiteCp, 9970);
    assert.equal(parseStockfishInfo('info depth 20 score cp 34 upperbound nodes 900 pv e2e4', 'w'), null);
  });

  test('uses depth 16 and up to three Stockfish lines by default', () => {
    assert.equal(STOCKFISH_SEARCH.multiPv, 3);
    assert.equal(STOCKFISH_SEARCH.depth, 16);
    assert.equal(STOCKFISH_SEARCH.threads, 1);
    assert.ok(STOCKFISH_SEARCH.hashMb > 0);
  });

  test('builds a legal PGN preview before engine analysis completes', () => {
    const preview = createAnalysisPreview('1. e4 e5 *');
    assert.equal(preview.totalPlies, 2);
    assert.equal(preview.positions.length, 3);
    assert.equal(preview.positions[1].san, 'e4');
    assert.equal(preview.positions[2].san, 'e5');
    assert.equal(preview.positions[2].depth, 0);
    assert.equal(preview.engine.depth, 0);
  });

  test('Stockfish UCI lifecycle waits for readiness, clears hash state, and returns depth/nodes', async () => {
    const originalWorker = globalThis.Worker;
    const commands = [];
    const partialResults = [];
    class FakeWorker {
      listeners = {};
      addEventListener(type, listener) {
        this.listeners[type] = listener;
      }
      postMessage(command) {
        commands.push(command);
        if (command === 'uci') {
          queueMicrotask(() => {
            this.emit('id name Test Stockfish');
            this.emit('option name Threads type spin default 1 min 1 max 1');
            this.emit('option name Hash type spin default 16 min 16 max 16');
            this.emit('option name MultiPV type spin default 1 min 1 max 10');
            this.emit('option name Ponder type check default false');
            this.emit('uciok');
          });
        } else if (command === 'isready') {
          queueMicrotask(() => this.emit('readyok'));
        } else if (command.startsWith('go depth')) {
          const depth = Number(command.split(' ')[2]);
          queueMicrotask(() => {
            this.emit(`info depth ${depth - 1} multipv 1 score cp 50 nodes 300 pv e2e4`);
            this.emit(`info depth ${depth} multipv 2 score cp 10 nodes 250 pv d2d4`);
            this.emit(`info depth ${depth} multipv 1 score cp 25 nodes 321 pv e2e4`);
            this.emit(`info depth ${depth} multipv 3 score cp -5 nodes 200 pv g1f3`);
            this.emit('bestmove e2e4');
          });
        }
      }
      emit(data) {
        this.listeners.message({ data });
      }
      terminate() {}
    }

    globalThis.Worker = FakeWorker;
    const engine = new StockfishEngine({ depth: 10 });
    try {
      const result = await engine.analyze(
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        undefined,
        (partial) => partialResults.push(partial)
      );
      assert.equal(result.engineVersion, 'Test Stockfish');
      assert.equal(result.depth, 10);
      assert.equal(result.nodes, 321);
      assert.equal(result.whiteCp, 25);
      assert.ok(commands.includes('ucinewgame'));
      assert.ok(commands.includes('setoption name MultiPV value 3'));
      assert.deepEqual(result.lines.map((line) => [line.rank, line.depth, line.whiteCp]), [
        [1, 10, 25],
        [2, 10, 10],
        [3, 10, -5]
      ]);
      assert.equal(partialResults[0].depth, 9);
      assert.equal(partialResults.at(-1).depth, 10);
    } finally {
      engine.close();
      globalThis.Worker = originalWorker;
    }
  });

  test('falls back to one line when Stockfish does not advertise MultiPV', async () => {
    const originalWorker = globalThis.Worker;
    class SinglePvWorker {
      listeners = {};
      addEventListener(type, listener) {
        this.listeners[type] = listener;
      }
      postMessage(command) {
        if (command === 'uci') queueMicrotask(() => this.emit('uciok'));
        else if (command === 'isready') queueMicrotask(() => this.emit('readyok'));
        else if (command.startsWith('go depth')) {
          queueMicrotask(() => {
            this.emit('info depth 16 score cp 25 nodes 321 pv e2e4');
            this.emit('bestmove e2e4');
          });
        }
      }
      emit(data) {
        this.listeners.message({ data });
      }
      terminate() {}
    }

    globalThis.Worker = SinglePvWorker;
    const engine = new StockfishEngine();
    try {
      const result = await engine.analyze('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
      assert.equal(engine.settings.multiPv, 1);
      assert.equal(result.lines.length, 1);
      assert.equal(result.lines[0].rank, 1);
    } finally {
      engine.close();
      globalThis.Worker = originalWorker;
    }
  });

  test('StockfishPool analyzes concurrent requests in parallel across workers', async () => {
    const originalWorker = globalThis.Worker;
    let workerCounter = 0;
    class PoolFakeWorker {
      constructor() {
        this.id = ++workerCounter;
        this.listeners = {};
      }
      addEventListener(type, listener) {
        this.listeners[type] = listener;
      }
      postMessage(command) {
        if (command === 'uci') queueMicrotask(() => this.emit('uciok'));
        else if (command === 'isready') queueMicrotask(() => this.emit('readyok'));
        else if (command.startsWith('go depth')) {
          queueMicrotask(() => {
            this.emit('info depth 16 score cp 30 nodes 500 pv e2e4');
            this.emit('bestmove e2e4');
          });
        }
      }
      emit(data) {
        this.listeners.message?.({ data });
      }
      terminate() {}
    }

    globalThis.Worker = PoolFakeWorker;
    const pool = new StockfishPool({ size: 2, depth: 16 });
    try {
      assert.equal(pool.engines.length, 2);
      const fens = [
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
        'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2'
      ];
      const results = await Promise.all(fens.map((fen) => pool.analyze(fen)));
      assert.equal(results.length, 3);
      results.forEach((res) => {
        assert.equal(res.depth, 16);
        assert.equal(Math.abs(res.whiteCp), 30);
        assert.equal(res.bestMoveUci, 'e2e4');
      });
    } finally {
      pool.close();
      globalThis.Worker = originalWorker;
    }
  });

  test('Stockfish reports a missing evaluation through the analysis promise', async () => {
    const originalWorker = globalThis.Worker;
    class MissingInfoWorker {
      listeners = {};
      addEventListener(type, listener) {
        this.listeners[type] = listener;
      }
      postMessage(command) {
        if (command === 'uci') queueMicrotask(() => this.emit('uciok'));
        if (command === 'isready') queueMicrotask(() => this.emit('readyok'));
        if (command.startsWith('go depth')) queueMicrotask(() => this.emit('bestmove e2e4'));
      }
      emit(data) {
        this.listeners.message({ data });
      }
      terminate() {}
    }

    globalThis.Worker = MissingInfoWorker;
    const engine = new StockfishEngine();
    try {
      await assert.rejects(
        engine.analyze('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'),
        /Stockfish returned no valid evaluation/
      );
    } finally {
      engine.close();
      globalThis.Worker = originalWorker;
    }
  });

  test('a replacement search waits for the canceled UCI search to finish', async () => {
    const originalWorker = globalThis.Worker;
    const commands = [];
    let markFirstSearchStarted;
    const firstSearchStarted = new Promise((resolve) => { markFirstSearchStarted = resolve; });
    class DelayedStopWorker {
      listeners = {};
      addEventListener(type, listener) {
        this.listeners[type] = listener;
      }
      postMessage(command) {
        commands.push(command);
        if (command === 'uci') queueMicrotask(() => this.emit('uciok'));
        if (command === 'isready') queueMicrotask(() => this.emit('readyok'));
        if (command === 'stop') setTimeout(() => this.emit('bestmove e2e4'), 20);
        if (command.startsWith('go depth')) {
          const searches = commands.filter((item) => item.startsWith('go depth')).length;
          if (searches === 1) {
            markFirstSearchStarted();
          } else {
            queueMicrotask(() => {
              this.emit('info depth 12 score cp 15 nodes 10 pv e2e4');
              this.emit('bestmove e2e4');
            });
          }
        }
      }
      emit(data) {
        this.listeners.message({ data });
      }
      terminate() {}
    }

    globalThis.Worker = DelayedStopWorker;
    const engine = new StockfishEngine();
    const controller = new AbortController();
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    try {
      const firstSearch = engine.analyze(fen, controller.signal);
      await firstSearchStarted;
      controller.abort();
      await assert.rejects(firstSearch, /cancelled/i);
      const nextResult = await engine.analyze(fen);
      assert.equal(nextResult.whiteCp, 15);
      assert.equal(commands.filter((command) => command.startsWith('go depth')).length, 2);
    } finally {
      engine.close();
      globalThis.Worker = originalWorker;
    }
  });

  test('classification requires both evaluation measures and catches missed wins', () => {
    const chess = new Chess();
    const played = chess.move('h4');
    const missedWin = classifyMove({
      movePlayed: played,
      bestMove: { san: 'Nf3' },
      winChanceBest: 80,
      winChancePlayed: 45,
      scoreBest: 300,
      scorePlayed: -100,
      cpLoss: 400,
      isWhite: true,
      plyIndex: 12,
      chessBefore: new Chess()
    });
    assert.equal(missedWin.classification, Classification.MISS);

    const blunder = classifyMove({
      movePlayed: played,
      bestMove: { san: 'Nf3' },
      winChanceBest: 60,
      winChancePlayed: 10,
      scoreBest: 100,
      scorePlayed: -300,
      cpLoss: 400,
      isWhite: true,
      plyIndex: 12,
      chessBefore: new Chess()
    });
    assert.equal(blunder.classification, Classification.BLUNDER);
  });

  test('repeated analysis of the same game is reproducible and maps plies to exact FENs', async () => {
    const pgn = '[Event "Repro"]\n[Result "*"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 *';
    const first = await analyzePgnGame(pgn);
    const second = await analyzePgnGame(pgn);
    const fields = (report) => report.positions.map((position) => [
      position.ply,
      position.fen,
      position.score,
      position.cpLoss,
      position.classification,
      position.bestMove?.san
    ]);

    assert.deepEqual(fields(first), fields(second));
    assert.equal(first.positions.length, 7);
    const replay = new Chess();
    first.positions.forEach((position, index) => {
      assert.equal(position.fen, replay.fen());
      if (index < first.positions.length - 1) replay.move(first.positions[index + 1].san);
    });
    assert.equal(first.engine.depth, 2);
    assert.equal(first.engine.multiPv, 1);
  });

  test('validates and analyzes en passant, castling, and promotion from PGN setup FENs', async () => {
    const cases = [
      {
        fen: '8/8/8/3pP3/8/8/8/K6k w - d6 0 1',
        san: 'exd6',
        uci: 'e5d6'
      },
      {
        fen: 'r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1',
        san: 'O-O',
        uci: 'e1g1'
      },
      {
        fen: '7k/P7/8/8/8/8/8/7K w - - 0 1',
        san: 'a8=Q+',
        uci: 'a7a8q'
      }
    ];

    for (const { fen, san, uci } of cases) {
      const report = await analyzePgnGame(`[Event "Rules"]\n[SetUp "1"]\n[FEN "${fen}"]\n[Result "*"]\n\n1. ${san} *`);
      assert.equal(report.positions[1].san, san);
      assert.equal(report.positions[1].uci, uci);
      assert.equal(report.positions[0].fen, fen);
      assert.doesNotThrow(() => new Chess(report.positions[1].fen));
    }
  });

  test('terminal checkmate is represented from White perspective', async () => {
    const pgn = '[Event "Mate"]\n[Result "1-0"]\n\n1. f3 e5 2. g4 Qh4# 1-0';
    const report = await analyzePgnGame(pgn);
    const finalPosition = report.positions.at(-1);
    assert.equal(finalPosition.score, -10000);
    assert.equal(finalPosition.mate, 0);
  });

  test('Lichess cache keys retain all FEN fields and search options', async () => {
    assert.notEqual(
      normalizeFenKey('8/8/8/8/8/8/8/K6k w - - 0 1'),
      normalizeFenKey('8/8/8/8/8/8/8/K6k w - - 8 1')
    );

    const originalFetch = globalThis.fetch;
    let requests = 0;
    globalThis.fetch = async () => {
      requests++;
      return {
        ok: true,
        json: async () => ({ depth: 12, pvs: [{ moves: 'e2e4', cp: 20 }] })
      };
    };
    try {
      const fenA = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      const fenB = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 8 1';
      await evaluatePositionOnline(fenA, true, 12, { multiPv: 1 });
      await evaluatePositionOnline(fenA, true, 12, { multiPv: 1 });
      await evaluatePositionOnline(fenB, true, 12, { multiPv: 1 });
      await evaluatePositionOnline(fenA, true, 12, { multiPv: 2 });
      assert.equal(requests, 3);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  test('Lichess rate limits and missing cloud results return no evaluation', async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => ({ ok: false, status: 429 });
    try {
      const fen = '8/8/8/8/8/8/8/K6k w - - 0 1';
      assert.equal(await evaluatePositionOnline(fen, true), null);
      globalThis.fetch = async () => ({
        ok: true,
        json: async () => ({ pvs: [] })
      });
      assert.equal(await evaluatePositionOnline(fen, true), null);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
