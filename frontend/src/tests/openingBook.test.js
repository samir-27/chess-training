import test from 'node:test';
import assert from 'node:assert/strict';
import { Chess } from 'chess.js';
import { isOpeningBookMove, lookupBookPosition } from '../services/openingBookService.js';
import { classifyMove, Classification } from '../services/gameAnalysisEngine.js';
import { extractMovesFromLine } from '../services/analysisVariation.js';

test('Opening Book Service and Move Classification', async (t) => {
  await t.test('recognizes standard theoretical openings by FEN key', () => {
    const startBook = lookupBookPosition('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    assert.ok(startBook);
    assert.equal(startBook.eco, 'A00');
    assert.ok(startBook.bookMoves.includes('e4'));
    assert.ok(startBook.bookMoves.includes('d4'));
  });

  await t.test('classifies opening theoretical moves as Classification.BOOK with 100% accuracy', () => {
    const chess = new Chess();
    const played = chess.move('e4');
    const classification = classifyMove({
      movePlayed: played,
      bestMove: { san: 'e4' },
      winChanceBest: 52,
      winChancePlayed: 52,
      scoreBest: 20,
      scorePlayed: 20,
      cpLoss: 0,
      isWhite: true,
      plyIndex: 1,
      chessBefore: new Chess()
    });

    assert.equal(classification.classification, Classification.BOOK);
    assert.equal(classification.eco, 'B00');
    assert.match(classification.explanation, /Book move/i);
  });

  await t.test('does not classify non-book moves as book moves', () => {
    const chess = new Chess();
    const played = chess.move('h4');
    const nonBook = classifyMove({
      movePlayed: played,
      bestMove: { san: 'e4' },
      winChanceBest: 70,
      winChancePlayed: 20,
      scoreBest: 300,
      scorePlayed: -200,
      cpLoss: 500, // severe loss
      isWhite: true,
      plyIndex: 1,
      chessBefore: new Chess()
    });

    assert.notEqual(nonBook.classification, Classification.BOOK);
  });

  await t.test('extractMovesFromLine extracts legal moves from UCI, SAN, and formatted strings', () => {
    const chess = new Chess();
    chess.move('e4');
    const fen = chess.fen();

    // From UCI array
    const uciResult = extractMovesFromLine(fen, { continuationUci: ['e7e5', 'g1f3'] });
    assert.equal(uciResult.moves.length, 2);
    assert.deepEqual(uciResult.moves, ['e7e5', 'g1f3']);
    assert.equal(uciResult.san, 'e5 Nf3');

    // From SAN array
    const sanResult = extractMovesFromLine(fen, { continuationSan: ['c5', 'Nf3', 'd6'] });
    assert.equal(sanResult.moves.length, 3);
    assert.equal(sanResult.san, 'c5 Nf3 d6');

    // From movesText
    const textResult = extractMovesFromLine(fen, { movesText: '1... e5 2. Nf3 Nc6' });
    assert.equal(textResult.moves.length, 3);
    assert.equal(textResult.san, 'e5 Nf3 Nc6');

    // From single bestMoveUci
    const singleResult = extractMovesFromLine(fen, { bestMoveUci: 'c7c5' });
    assert.equal(singleResult.moves.length, 1);
    assert.equal(sanResult.san, 'c5 Nf3 d6');
    assert.equal(singleResult.san, 'c5');
  });

  await t.test('full game analysis classifies theoretical opening sequence as BOOK and identifies opening', async () => {
    const { analyzePgnGame } = await import('../services/gameAnalysisEngine.js');
    const pgn = '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6';
    const report = await analyzePgnGame(pgn);

    assert.ok(report);
    assert.ok(report.opening);
    assert.equal(report.opening.eco, 'C78');
    assert.match(report.opening.name, /Ruy Lopez/i);

    // First 6 plies (1. e4 e5 2. Nf3 Nc6 3. Bb5 a6) are verified theoretical book moves
    for (let i = 1; i <= 6; i++) {
      const pos = report.positions[i];
      assert.equal(pos.classification, Classification.BOOK, `Ply ${i} (${pos.san}) should be BOOK`);
      assert.equal(pos.isBook, true);
      assert.equal(pos.accuracy, 100);
      assert.equal(pos.cpLoss, 0);
      assert.ok(pos.eco);
      assert.ok(pos.opening);
    }
  });

  await t.test('handles opening transpositions accurately', () => {
    // 1. d4 Nf6 2. c4 e6 vs 1. c4 Nf6 2. d4 e6 (Nimzo/Indian transpositions)
    const chessA = new Chess();
    chessA.move('d4');
    chessA.move('Nf6');
    chessA.move('c4');

    const chessB = new Chess();
    chessB.move('c4');
    chessB.move('Nf6');
    chessB.move('d4');

    const bookA = lookupBookPosition(chessA.fen());
    const bookB = lookupBookPosition(chessB.fen());

    assert.ok(bookA);
    assert.ok(bookB);
    assert.equal(bookA.eco, bookB.eco);
    assert.equal(bookA.name, bookB.name);
  });
});
