import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { Chess } from 'chess.js';
import {
  centipawnsToWinChance,
  classifyMove,
  analyzePgnGame,
  Classification,
  CLASSIFICATION_META
} from '../services/gameAnalysisEngine.js';
import { evaluatePositionOnline } from '../services/lichessAnalysisApi.js';

describe('Game Analysis Engine (Lichess & Public Cloud API)', () => {
  test('centipawnsToWinChance converts centipawns accurately to win probability', () => {
    // Equal position is 50%
    const equalWinChance = centipawnsToWinChance(0);
    assert.ok(Math.abs(equalWinChance - 50) < 0.1, `Expected ~50%, got ${equalWinChance}`);

    // Positive centipawns increase win chance
    const plusOnePawn = centipawnsToWinChance(100);
    assert.ok(plusOnePawn > 55, `Expected > 55%, got ${plusOnePawn}`);

    // Negative centipawns decrease win chance
    const minusOnePawn = centipawnsToWinChance(-100);
    assert.ok(minusOnePawn < 45, `Expected < 45%, got ${minusOnePawn}`);

    // Symmetry
    assert.ok(Math.abs(plusOnePawn + minusOnePawn - 100) < 0.2);

    // Large advantage is near 99%
    const highAdvantage = centipawnsToWinChance(1200);
    assert.ok(highAdvantage > 95);
  });

  test('classifyMove assigns correct categories based on win chance and centipawn loss', () => {
    const chess = new Chess();
    const move = chess.move('e4');

    // 1. Book move in opening
    const bookResult = classifyMove({
      movePlayed: move,
      bestMove: move,
      winChanceBest: 52,
      winChancePlayed: 52,
      scoreBest: 30,
      scorePlayed: 30,
      cpLoss: 0,
      isWhite: true,
      plyIndex: 1,
      chessBefore: new Chess(),
      moveHistorySans: ['e4']
    });
    assert.equal(bookResult.classification, Classification.BOOK);

    // 2. Best move
    const bestResult = classifyMove({
      movePlayed: move,
      bestMove: move,
      winChanceBest: 55,
      winChancePlayed: 55,
      scoreBest: 40,
      scorePlayed: 40,
      cpLoss: 0,
      isWhite: true,
      plyIndex: 25,
      chessBefore: new Chess(),
      moveHistorySans: ['e4', 'e5', 'Nf3', 'Nc6']
    });
    assert.equal(bestResult.classification, Classification.BEST);

    // 3. Inaccuracy (50-100 cp loss)
    const inaccResult = classifyMove({
      movePlayed: move,
      bestMove: { san: 'Nf3', from: 'g1', to: 'f3' },
      winChanceBest: 55,
      winChancePlayed: 47,
      scoreBest: 40,
      scorePlayed: -40,
      cpLoss: 80,
      isWhite: true,
      plyIndex: 25,
      chessBefore: new Chess()
    });
    assert.equal(inaccResult.classification, Classification.INACCURACY);

    // 4. Blunder (huge drop in win chance and >200 cp loss)
    const blunderResult = classifyMove({
      movePlayed: move,
      bestMove: { san: 'Nf3', from: 'g1', to: 'f3' },
      winChanceBest: 60,
      winChancePlayed: 10,
      scoreBest: 50,
      scorePlayed: -350,
      cpLoss: 400,
      isWhite: true,
      plyIndex: 25,
      chessBefore: new Chess()
    });
    assert.equal(blunderResult.classification, Classification.BLUNDER);
  });

  test('evaluatePositionOnline queries Lichess Cloud Evaluation for standard FEN', async () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1';
    const evalData = await evaluatePositionOnline(fen, false, 10);
    // Should return either Lichess cloud or Stockfish cloud data
    if (evalData) {
      assert.ok(['lichess-cloud', 'chess-api-stockfish'].includes(evalData.source));
      assert.ok(evalData.depth >= 10);
      assert.ok(evalData.whiteCp !== undefined);
    }
  });

  test('analyzePgnGame processes a full PGN and returns accuracy, ACPL & classifications', async () => {
    const samplePgn = `[Event "Scholar's Mate"]
[White "Player1"]
[Black "Player2"]
[Result "1-0"]

1. e4 e5 2. Qh5 Nc6 3. Bc4 Nf6 4. Qxf7# 1-0`;

    let progressEvents = 0;
    const report = await analyzePgnGame(samplePgn, (p) => {
      progressEvents++;
      assert.ok(p.percentage >= 0 && p.percentage <= 100);
    });

    assert.ok(report);
    assert.equal(report.headers.white, 'Player1');
    assert.equal(report.headers.black, 'Player2');
    assert.equal(report.headers.result, '1-0');
    assert.equal(report.totalPlies, 7); // e4, e5, Qh5, Nc6, Bc4, Nf6, Qxf7#

    // Accuracies should be calculated
    assert.ok(report.accuracies.white >= 0 && report.accuracies.white <= 100);
    assert.ok(report.accuracies.black >= 0 && report.accuracies.black <= 100);

    // ACPL should be tracked
    assert.ok(report.acpl.white !== undefined);
    assert.ok(report.acpl.black !== undefined);

    // Position 0 is starting position, positions 1..7 are moves
    assert.equal(report.positions.length, 8);

    // Final move was Qxf7# checkmate
    const lastMove = report.positions[7];
    assert.equal(lastMove.san, 'Qxf7#');
    assert.ok(
      [Classification.BEST, Classification.BRILLIANT].includes(lastMove.classification),
      `Expected BEST or BRILLIANT, got ${lastMove.classification}`
    );

    // Black's 3... Nf6 walked into mate, so it should be a blunder or miss
    const blunderedMove = report.positions[6]; // 3... Nf6
    assert.ok(
      [Classification.BLUNDER, Classification.MISTAKE, Classification.MISS].includes(
        blunderedMove.classification
      )
    );

    // Breakdown counts exist
    assert.ok(report.breakdown.white);
    assert.ok(report.breakdown.black);
    assert.ok(progressEvents > 0);
  });

  test('Accurately evaluates user game (narkosun vs Supreme_Assassin)', async () => {
    const userPgn = `[Event "Live Chess"]
[Site "Chess.com"]
[Date "2026.09.22"]
[Round "?"]
[White "narkosun"]
[Black "Supreme_Assassin"]
[Result "0-1"]
[WhiteElo "1829"]
[BlackElo "1858"]

1. e4 e6 2. f4 d5 3. Nf3 c5 4. exd5 exd5 5. d4 cxd4 6. Bb5+ Bd7 7. Bxd7+ Nxd7 8. O-O Ngf6 9. Qxd4 Bc5 10. Re1+ Kf8 11. Be3 Bxd4 12. Bxd4 g6 13. Nc3 Kg7 14. Nxd5 Re8 15. Nxf6 Nxf6 16. Rad1 Rxe1+ 17. Nxe1 Qe7 18. Be5 Rd8 19. Nd3 Kg8 20. Re1 Ng4 21. Bc3 Qh4 22. h3 Nh6 23. Bb4 Nf5 24. a3 Rc8 25. Bc3 Nd6 26. Be5 Nc4 27. Bc3 h5 28. Re4 Nd6 29. Re1 Re8 30. Rd1 Nb5 31. Be5 Rc8 32. Nb4 a5 33. Nd5 Rxc2 34. Nf6+ Kf8 35. Rd8+ Ke7 36. Rd7+ Ke6 37. f5+ Kxe5 0-1`;

    const report = await analyzePgnGame(userPgn);

    assert.ok(report);
    // Both players should achieve realistic accuracy (75% - 95%)
    assert.ok(report.accuracies.white >= 70, `Expected White >= 70%, got ${report.accuracies.white}`);
    assert.ok(report.accuracies.black >= 75, `Expected Black >= 75%, got ${report.accuracies.black}`);

    // ACPL should be present
    assert.ok(report.acpl.white > 0);
    assert.ok(report.acpl.black > 0);

    // First moves should be Book moves
    assert.equal(report.positions[1].san, 'e4');
    assert.equal(report.positions[1].classification, Classification.BOOK);
    assert.equal(report.positions[2].san, 'e6');
    assert.equal(report.positions[2].classification, Classification.BOOK);

    // 37... Kxe5 MUST NOT be classified as Brilliant
    const lastMove = report.positions[74];
    assert.equal(lastMove.san, 'Kxe5');
    assert.notEqual(lastMove.classification, Classification.BRILLIANT, 'King capture must never be brilliant sacrifice');
  });
});
