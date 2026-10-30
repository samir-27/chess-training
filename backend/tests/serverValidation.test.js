import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { Chess } from 'chess.js';
import { validatePgn, validateReport, validateVariation } from '../services/validation.js';

describe('analysis API validation', () => {
  test('accepts a report only when its positions replay the submitted PGN', () => {
    const { moves } = validatePgn('1. e4 e5 2. Nf3');
    const chess = new Chess();
    const positions = [{ ply: 0, fen: chess.fen(), score: 0 }];
    for (const [ply, move] of moves.entries()) {
      chess.move(move);
      positions.push({ ply: ply + 1, fen: chess.fen(), score: 0 });
    }

    assert.deepEqual(validateReport({ positions }, moves).positions, positions);
    const forgedPositions = positions.map((position) => ({ ...position }));
    forgedPositions[1].fen = new Chess().fen();
    assert.throws(
      () => validateReport({ positions: forgedPositions }, moves),
      /do not match the validated PGN line/
    );
  });

  test('validates legal moves and cursor bounds for saved variations', () => {
    assert.doesNotThrow(() => validateVariation({
      rootFen: new Chess().fen(),
      originalPly: 0,
      moves: ['e2e4', 'c7c5'],
      cursor: 1
    }));
    assert.throws(() => validateVariation({
      rootFen: new Chess().fen(),
      originalPly: 0,
      moves: ['e2e5'],
      cursor: 1
    }), /illegal move/);
  });
});
