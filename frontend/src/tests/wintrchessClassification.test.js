import test from 'node:test';
import assert from 'node:assert/strict';
import { Chess } from 'chess.js';
import {
  Classification,
  classifyMove,
  getExpectedPoints,
  getExpectedPointsLoss,
  calculateMoveAccuracy,
  isPieceSafe,
  getUnsafePieces,
  pointLossClassify
} from '../services/gameAnalysisEngine.js';
import { STOCKFISH_SEARCH } from '../services/stockfishEngine.js';

test('WintrChess Move Classification Rules', async (t) => {
  await t.test('engine search depth is set to default depth 16', () => {
    assert.equal(STOCKFISH_SEARCH.depth, 16);
  });

  await t.test('calculates expected points and point loss according to WintrChess logistic model', () => {
    // 0 cp -> 50% expected points
    const even = getExpectedPoints({ type: 'centipawn', value: 0 });
    assert.equal(Math.round(even * 100), 50);

    // +300 cp -> ~74% expected points for White
    const whiteAdv = getExpectedPoints({ type: 'centipawn', value: 300 });
    assert.ok(whiteAdv > 0.70 && whiteAdv < 0.76);

    // Expected points loss for White when score drops from +300 to -300
    const loss = getExpectedPointsLoss(
      { type: 'centipawn', value: 300 },
      { type: 'centipawn', value: -300 },
      'w'
    );
    assert.ok(loss >= 0.40); // >40% loss
  });

  await t.test('pointLossClassify assigns WintrChess classification bands accurately', () => {
    // 1. BEST (< 1% point loss)
    const best = pointLossClassify({
      prevCp: 100,
      currCp: 95,
      prevMate: null,
      currMate: null,
      isWhite: true,
      playedSan: 'Nf3',
      bestSan: 'Nf3'
    });
    assert.equal(best.classification, Classification.BEST);

    // 2. EXCELLENT (1% - 4.5% point loss)
    const excellent = pointLossClassify({
      prevCp: 100,
      currCp: 60,
      prevMate: null,
      currMate: null,
      isWhite: true,
      playedSan: 'd4',
      bestSan: 'Nf3'
    });
    assert.equal(excellent.classification, Classification.EXCELLENT);

    // 3. GOOD (4.5% - 8% point loss)
    const good = pointLossClassify({
      prevCp: 100,
      currCp: 20,
      prevMate: null,
      currMate: null,
      isWhite: true,
      playedSan: 'c4',
      bestSan: 'Nf3'
    });
    assert.equal(good.classification, Classification.GOOD);

    // 4. INACCURACY (8% - 12% point loss)
    const inaccuracy = pointLossClassify({
      prevCp: 100,
      currCp: -20,
      prevMate: null,
      currMate: null,
      isWhite: true,
      playedSan: 'b3',
      bestSan: 'Nf3'
    });
    assert.equal(inaccuracy.classification, Classification.INACCURACY);

    // 5. MISTAKE (12% - 22% point loss)
    const mistake = pointLossClassify({
      prevCp: 100,
      currCp: -100,
      prevMate: null,
      currMate: null,
      isWhite: true,
      playedSan: 'g3',
      bestSan: 'Nf3'
    });
    assert.equal(mistake.classification, Classification.MISTAKE);

    // 6. BLUNDER (>= 22% point loss)
    const blunder = pointLossClassify({
      prevCp: 100,
      currCp: -300,
      prevMate: null,
      currMate: null,
      isWhite: true,
      playedSan: 'f3',
      bestSan: 'Nf3'
    });
    assert.equal(blunder.classification, Classification.BLUNDER);
  });

  await t.test('classifies mate transitions per WintrChess rules', () => {
    // Blundering from winning mate to losing mate is a Blunder
    const thrownMate = pointLossClassify({
      prevCp: null,
      currCp: null,
      prevMate: 2,
      currMate: -1,
      isWhite: true,
      playedSan: 'Kh1',
      bestSan: 'Qf7#'
    });
    assert.equal(thrownMate.classification, Classification.BLUNDER);

    // Centipawn to allowing mate in 1 is a Blunder
    const walkedIntoMate = pointLossClassify({
      prevCp: 0,
      currCp: null,
      prevMate: null,
      currMate: -1,
      isWhite: true,
      playedSan: 'h3',
      bestSan: 'Kf1'
    });
    assert.equal(walkedIntoMate.classification, Classification.BLUNDER);
  });

  await t.test('detects piece safety and uncovers sacrificed pieces', () => {
    // White queen on e4 defended by pawn on d3, opponent pawn on d5 attacks it
    const chess = new Chess('rnb1kbnr/ppp1pppp/8/3p4/4Q3/3P4/PPP1PPPP/RNB1KBNR w KQkq - 0 3');
    const queen = { square: 'e4', type: 'q', color: 'w' };
    // Attacked by pawn d5 (lower value piece) -> unsafe
    assert.equal(isPieceSafe(chess, queen), false);

    const unsafePieces = getUnsafePieces(chess, 'w');
    assert.ok(unsafePieces.some((p) => p.square === 'e4'));
  });

  await t.test('classifies brilliant tactical sacrifice correctly', () => {
    // Classic Greek Gift / bishop sacrifice on h7
    // White plays Bxh7+ (bishop sacrificed while maintaining decisive advantage)
    const fenBefore = 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/3P4/2NBPN2/PPP2PPP/R2QK2R w KQ - 4 7';
    const chessBefore = new Chess(fenBefore);
    const playedMove = chessBefore.move('Bxh7+');

    const result = classifyMove({
      movePlayed: playedMove,
      bestMove: { san: 'Bxh7+' },
      winChanceBest: 85,
      winChancePlayed: 85,
      scoreBest: 350,
      scorePlayed: 350,
      mateBest: null,
      matePlayed: null,
      isWhite: true,
      plyIndex: 13,
      chessBefore: new Chess(fenBefore)
    });

    assert.equal(result.classification, Classification.BRILLIANT);
    assert.match(result.explanation, /Brilliant sacrifice/i);
  });

  await t.test('classifies critical / great move when second line point loss >= 10%', () => {
    const fenBefore = 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4';
    const chessBefore = new Chess(fenBefore);
    const playedMove = chessBefore.move('Ng5');

    const result = classifyMove({
      movePlayed: playedMove,
      bestMove: { san: 'Ng5' },
      winChanceBest: 60,
      winChancePlayed: 60,
      scoreBest: 60,
      scorePlayed: 60,
      mateBest: null,
      matePlayed: null,
      secondBestLine: { whiteCp: -100, mate: null }, // Second best line drops to -1.00 (>= 10% point loss)
      isWhite: true,
      plyIndex: 26,
      chessBefore: new Chess(fenBefore)
    });

    assert.equal(result.classification, Classification.GREAT);
  });

  await t.test('calculates move accuracy with WintrChess formula', () => {
    assert.equal(calculateMoveAccuracy(0), 100);
    // 5% point loss
    const acc5 = calculateMoveAccuracy(0.05);
    assert.ok(acc5 > 78 && acc5 < 85);
    // 25% point loss (mistake/blunder)
    const acc25 = calculateMoveAccuracy(0.25);
    assert.ok(acc25 < 40 && acc25 > 25);
  });
});
