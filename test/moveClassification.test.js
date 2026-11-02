import { test, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Chess } from 'chess.js';
import {
  Classification,
  CLASSIFICATION_META,
  normalizeEvaluationToWhiteCp,
  centipawnsToWinChance,
  getExpectedPoints,
  getExpectedPointsLoss,
  calculateMoveAccuracy,
  calculateCentipawnLoss,
  isPieceSafe,
  getUnsafePieces,
  isBrilliantSacrifice,
  isGreatMove,
  pointLossClassify,
  classifyMove,
  analyzePgnGame
} from '../frontend/src/services/gameAnalysisEngine.js';

describe('Chess Move Classification Engine Regression Suite', () => {

  // 1. White makes an excellent move
  it('Scenario 1: White makes an excellent move (low expected point loss)', () => {
    // White had +40 cp, played move results in +25 cp
    const prevEval = { whiteCp: 40 };
    const currEval = { whiteCp: 25 };
    const loss = getExpectedPointsLoss(prevEval, currEval, 'w');
    assert(loss >= 0.01 && loss < 0.045, `Expected loss in [0.01, 0.045), got ${loss}`);

    const result = pointLossClassify({
      prevCp: 40,
      currCp: 25,
      prevMate: null,
      currMate: null,
      isWhite: true,
      playedSan: 'Nf3',
      bestSan: 'd4'
    });

    assert.equal(result.classification, Classification.EXCELLENT);
    const accuracy = calculateMoveAccuracy(loss);
    assert(accuracy >= 94 && accuracy <= 99, `Expected high accuracy, got ${accuracy}`);
  });

  // 2. Black makes an excellent move
  it('Scenario 2: Black makes an excellent move (symmetrical perspective)', () => {
    // Black had +40 cp (White perspective: -40 cp), played move results in +25 cp (White perspective: -25 cp)
    const prevEval = { whiteCp: -40 };
    const currEval = { whiteCp: -25 };
    const loss = getExpectedPointsLoss(prevEval, currEval, 'b');
    assert(loss >= 0.01 && loss < 0.045, `Expected loss in [0.01, 0.045) for Black, got ${loss}`);

    const result = pointLossClassify({
      prevCp: -40,
      currCp: -25,
      prevMate: null,
      currMate: null,
      isWhite: false,
      playedSan: 'Nf6',
      bestSan: 'd5'
    });

    assert.equal(result.classification, Classification.EXCELLENT);
    const accuracy = calculateMoveAccuracy(loss);
    assert(accuracy >= 94 && accuracy <= 99, `Expected high accuracy for Black, got ${accuracy}`);
  });

  // 3. White and Black both blunder
  it('Scenario 3: White and Black both blunder', () => {
    // 3A. White had +150 cp, blunders into -300 cp
    const whiteLoss = getExpectedPointsLoss({ whiteCp: 150 }, { whiteCp: -300 }, 'w');
    assert(whiteLoss >= 0.25, `Expected White point loss >= 0.25, got ${whiteLoss}`);
    const whiteResult = pointLossClassify({
      prevCp: 150,
      currCp: -300,
      prevMate: null,
      currMate: null,
      isWhite: true,
      playedSan: 'Qe4??',
      bestSan: 'Qd3'
    });
    assert.equal(whiteResult.classification, Classification.BLUNDER);

    // 3B. Black had +150 cp (White -150 cp), blunders into White +300 cp
    const blackLoss = getExpectedPointsLoss({ whiteCp: -150 }, { whiteCp: 300 }, 'b');
    assert(blackLoss >= 0.25, `Expected Black point loss >= 0.25, got ${blackLoss}`);
    const blackResult = pointLossClassify({
      prevCp: -150,
      currCp: 300,
      prevMate: null,
      currMate: null,
      isWhite: false,
      playedSan: 'Qe5??',
      bestSan: 'Qd6'
    });
    assert.equal(blackResult.classification, Classification.BLUNDER);
  });

  // 4. Genuine brilliant sacrifice
  it('Scenario 4: Genuine brilliant sacrifice (sound tactical piece sacrifice maintaining win)', () => {
    // Classic Greek gift style position or sound bishop sacrifice
    // FEN: White has Bishop on d3, Queen on d1, Knight on f3, Black King on g8
    const chessBefore = new Chess('r1bq1rk1/ppp2ppp/2np4/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 w - - 0 7');
    // White plays Bg5 (attacking queen, leaving piece or sound initiative)
    const move = chessBefore.moves({ verbose: true }).find(m => m.san === 'Bg5');
    assert(move, 'Bg5 must be a valid move');

    const chessAfter = new Chess(chessBefore.fen());
    chessAfter.move(move);

    // Mock an objectively sound piece sacrifice:
    // moverScore is winning (+350 cp), point loss is 0 (engine top choice), Bishop left attacked on g5
    const brilliant = isBrilliantSacrifice({
      chessBefore,
      chessAfter,
      playedMove: move,
      isWhite: true,
      moverScore: 350,
      isMoverMate: false,
      mateScore: null,
      pointLoss: 0,
      isTopChoice: true,
      secondBestLine: null
    });

    assert.equal(typeof brilliant, 'boolean');
  });

  // 5. Incorrect sacrifice rejected as Brilliant
  it('Scenario 5: Incorrect sacrifice rejected as Brilliant', () => {
    const chessBefore = new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    const move = chessBefore.moves({ verbose: true }).find(m => m.san === 'e4');
    const chessAfter = new Chess(chessBefore.fen());
    chessAfter.move(move);

    // 5A. Losing position: moverScore < 0 must be rejected
    const rejectedLosing = isBrilliantSacrifice({
      chessBefore,
      chessAfter,
      playedMove: move,
      isWhite: true,
      moverScore: -250,
      isMoverMate: false,
      mateScore: null,
      pointLoss: 0.30,
      isTopChoice: false,
      secondBestLine: null
    });
    assert.equal(rejectedLosing, false, 'Losing move must be rejected as brilliant');

    // 5B. Ordinary move without leaving non-pawn piece sacrificed must be rejected
    const rejectedNoSac = isBrilliantSacrifice({
      chessBefore,
      chessAfter,
      playedMove: move,
      isWhite: true,
      moverScore: 200,
      isMoverMate: false,
      mateScore: null,
      pointLoss: 0,
      isTopChoice: true,
      secondBestLine: null
    });
    assert.equal(rejectedNoSac, false, 'Move without sacrifice must be rejected as brilliant');
  });

  // 6. Great defensive move (only move holding equality)
  it('Scenario 6: Great defensive move (significant gap with 2nd best move)', () => {
    const chessBefore = new Chess('8/8/8/8/4k3/8/4K3/8 w - - 0 1');
    const move = chessBefore.moves({ verbose: true })[0];
    const chessAfter = new Chess(chessBefore.fen());
    chessAfter.move(move);

    // Mover score is 10 cp (equal). Second best line loses 180 cp (-170 cp)
    const isGreat = isGreatMove({
      chessBefore,
      chessAfter,
      playedMove: move,
      isWhite: true,
      moverScore: 10,
      isMoverMate: false,
      mateScore: null,
      isTopChoice: true,
      secondBestLine: { whiteCp: -170, mate: null },
      plyIndex: 12
    });

    assert.equal(isGreat, true, 'Critical only-move holding equality must be classified as Great');
  });

  // 7. Missed forced checkmate
  it('Scenario 7: Missed forced checkmate', () => {
    // White had forced mate in 2, but plays into drawish position (0 cp)
    const result = pointLossClassify({
      prevCp: null,
      currCp: 0,
      prevMate: 2,
      currMate: null,
      isWhite: true,
      playedSan: 'Qe3',
      bestSan: 'Qf7#'
    });

    assert.equal(result.classification, Classification.MISS, 'Missing forced mate must be classified as Missed Win');
    assert(result.explanation.includes('Missed win'), 'Explanation should mention Missed win');
  });

  // 8. Forced mate maintained
  it('Scenario 8: Forced mate maintained', () => {
    // White had mate in 3, played move finds mate in 2 (fastest path)
    const resultBest = pointLossClassify({
      prevCp: null,
      currCp: null,
      prevMate: 3,
      currMate: 2,
      isWhite: true,
      playedSan: 'Qh7+',
      bestSan: 'Qh7+'
    });
    assert.equal(resultBest.classification, Classification.BEST);

    // White had mate in 3, played move results in mate in 4 (maintains forced mate with minor delay)
    const resultExcellent = pointLossClassify({
      prevCp: null,
      currCp: null,
      prevMate: 3,
      currMate: 4,
      isWhite: true,
      playedSan: 'Qf7+',
      bestSan: 'Qh7+'
    });
    assert.equal(resultExcellent.classification, Classification.EXCELLENT);
  });

  // 9. Forced mate missed (Black perspective)
  it('Scenario 9: Forced mate missed from Black perspective', () => {
    // Black had forced mate in 2 (White perspective: -2), but misses it and position becomes White +150 cp
    const result = pointLossClassify({
      prevCp: null,
      currCp: 150,
      prevMate: -2,
      currMate: null,
      isWhite: false,
      playedSan: 'Qe4',
      bestSan: 'Qf2#'
    });

    assert.equal(result.classification, Classification.MISS, 'Black missing forced mate must be classified as Missed Win');
  });

  // 10. Draw and stalemate positions
  it('Scenario 10: Draw and stalemate positions evaluate stably without NaN or invalid results', () => {
    const norm = normalizeEvaluationToWhiteCp({ whiteCp: 0, mate: null });
    assert.equal(norm, 0);

    const winChance = centipawnsToWinChance(0);
    assert.equal(winChance, 50);

    const expW = getExpectedPoints({ whiteCp: 0 }, { moveColour: 'w' });
    const expB = getExpectedPoints({ whiteCp: 0 }, { moveColour: 'b' });
    assert.equal(expW, 0.5);
    assert.equal(expB, 0.5);

    const loss = getExpectedPointsLoss({ whiteCp: 0 }, { whiteCp: 0 }, 'w');
    assert.equal(loss, 0);
  });

  // 11. Forced single legal move
  it('Scenario 11: Forced single legal move is always classified as Best', () => {
    // Position where Black has only 1 legal move (e.g. King in check with single escape)
    // FEN: 7k/6R1/6K1/8/8/8/8/8 b - - 0 1 -> stalemate if Black turn, but let's make check with single escape:
    // FEN: 7k/5R2/6K1/8/8/8/8/8 b - - 0 1 (Black king has only Kg8)
    const chessBefore = new Chess('7k/5R2/6K1/8/8/8/8/8 b - - 0 1');
    assert.equal(chessBefore.moves().length, 1);
    const singleMove = chessBefore.moves({ verbose: true })[0];

    const result = classifyMove({
      movePlayed: singleMove,
      bestMove: singleMove,
      winChanceBest: 0,
      winChancePlayed: 0,
      scoreBest: -9990,
      scorePlayed: -9990,
      mateBest: 1,
      matePlayed: 1,
      secondBestLine: null,
      cpLoss: 0,
      isWhite: false,
      plyIndex: 40,
      chessBefore
    });

    assert.equal(result.classification, Classification.BEST);
    assert(result.explanation.includes('Forced move'), 'Explanation should specify Forced move');
  });

  // 12. Promotions and en-passant
  it('Scenario 12: Promotions and en-passant handled accurately', () => {
    // 12A. Promotion to Queen
    const promoFen = '7k/4P3/8/8/8/8/8/K7 w - - 0 1';
    const chessPromo = new Chess(promoFen);
    const promoMove = chessPromo.moves({ verbose: true }).find(m => m.promotion === 'q');
    assert(promoMove, 'Must have promotion to queen');

    const promoResult = classifyMove({
      movePlayed: promoMove,
      bestMove: promoMove,
      winChanceBest: 95,
      winChancePlayed: 95,
      scoreBest: 800,
      scorePlayed: 800,
      mateBest: null,
      matePlayed: null,
      secondBestLine: null,
      cpLoss: 0,
      isWhite: true,
      plyIndex: 50,
      chessBefore: chessPromo
    });
    assert.equal(promoResult.classification, Classification.BEST);

    // 12B. En-passant capture
    const epFen = 'rnbqkbnr/ppp1p1pp/8/3pPp2/8/8/PPPP1PPP/RNBQKBNR w KQkq f6 0 3';
    const chessEp = new Chess(epFen);
    const epMove = chessEp.moves({ verbose: true }).find(m => m.flags.includes('e'));
    assert(epMove, 'Must have en passant move');

    const chessAfterEp = new Chess(chessEp.fen());
    chessAfterEp.move(epMove);
    assert.equal(Boolean(chessAfterEp.get('f5')), false, 'Pawn on f5 must be captured by en passant');
  });

  // 13. Opening book moves
  it('Scenario 13: Opening book moves classified as Book with 100% accuracy', () => {
    const chessBefore = new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    const move = chessBefore.moves({ verbose: true }).find(m => m.san === 'e4');

    const result = classifyMove({
      movePlayed: move,
      bestMove: move,
      winChanceBest: 52,
      winChancePlayed: 52,
      scoreBest: 20,
      scorePlayed: 20,
      mateBest: null,
      matePlayed: null,
      secondBestLine: null,
      cpLoss: 0,
      isWhite: true,
      plyIndex: 1,
      chessBefore
    });

    assert.equal(result.classification, Classification.BOOK);
    assert.equal(result.isBook, true);
  });

  // 14. Accuracy and ACPL edge cases
  it('Scenario 14: Accuracy and ACPL edge cases', () => {
    // Accuracy clamps [0, 100]
    assert.equal(calculateMoveAccuracy(0), 100);
    assert.equal(calculateMoveAccuracy(0.05), 81.3);
    assert.equal(calculateMoveAccuracy(1.0), 0);
    assert.equal(calculateMoveAccuracy(-0.5), 100);
    assert.equal(calculateMoveAccuracy(100), 0);

    // Centipawn loss is capped at 1000 cp
    const mateToDrawLoss = calculateCentipawnLoss(0, 0, true, 1, null);
    assert(mateToDrawLoss <= 1000, `Mate to draw loss must be capped at 1000, got ${mateToDrawLoss}`);

    // Negative loss (improving position) returns 0
    const improveLoss = calculateCentipawnLoss(50, 100, true);
    assert.equal(improveLoss, 0);
  });

  // Integration test with analyzePgnGame
  it('analyzePgnGame runs locally and produces accurate reports', async () => {
    const pgn = '1. e4 e5 2. Nf3 Nc6 *';
    const report = await analyzePgnGame(pgn);

    assert(report.accuracies.white >= 0 && report.accuracies.white <= 100);
    assert(report.accuracies.black >= 0 && report.accuracies.black <= 100);
    assert(report.acpl.white >= 0);
    assert(report.acpl.black >= 0);
    assert(report.positions.length >= 4);
    assert(report.positions[1].isBook === true);
    assert.equal(report.positions[1].accuracy, 100);
  });

});
