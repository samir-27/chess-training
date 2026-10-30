import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { Chess } from 'chess.js';
import {
  createVariationAtPosition,
  createVariationWithLine,
  getVariationMoveList,
  getVariationOriginalPrefixLength,
  getVariationPosition,
  playVariationMove,
  resetVariationToStart,
  setVariationCursor
} from '../services/analysisVariation.js';

describe('analysis variation state', () => {
  test('keeps exploratory branches separate and supports undo and redo', () => {
    const original = new Chess();
    const positions = [{ fen: original.fen() }];
    original.move('e4');
    positions.push({ fen: original.fen(), uci: 'e2e4' });
    original.move('e5');
    positions.push({ fen: original.fen(), uci: 'e7e5' });
    const variation = createVariationAtPosition(positions, 1);
    const branched = playVariationMove(variation, { from: 'c7', to: 'c5' });

    assert.equal(getVariationPosition(variation).fen(), positions[1].fen);
    const expectedBranch = new Chess(positions[1].fen);
    expectedBranch.move('c5');
    assert.equal(getVariationPosition(branched).fen(), expectedBranch.fen());
    assert.equal(getVariationOriginalPrefixLength(branched), 1);
    assert.deepEqual(getVariationMoveList(branched).map((move) => move.san), ['e4', 'c5']);
    assert.deepEqual(getVariationMoveList(branched).map((move) => move.moveNumber), [1, 1]);

    const undone = setVariationCursor(branched, 1);
    assert.equal(getVariationPosition(undone).fen(), positions[1].fen);
    assert.equal(getVariationPosition(setVariationCursor(undone, 2)).fen(), getVariationPosition(branched).fen());
    assert.equal(positions[2].uci, 'e7e5');
    assert.equal(original.fen(), positions[2].fen);
  });

  test('replay preserves special chess rules and rejects illegal moves', () => {
    const castle = createVariationAtPosition([{ fen: 'r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1' }]);
    const castled = playVariationMove(castle, { from: 'e1', to: 'g1' });
    assert.equal(getVariationPosition(castled).get('h1'), undefined);
    assert.equal(getVariationPosition(castled).get('f1').type, 'r');
    assert.equal(getVariationPosition(castled).get('g1').type, 'k');

    const enPassantFen = '4k3/8/8/3pP3/8/8/8/4K3 w - d6 0 2';
    const enPassant = playVariationMove(
      createVariationAtPosition([{ fen: enPassantFen }]),
      { from: 'e5', to: 'd6' }
    );
    assert.equal(getVariationPosition(enPassant).get('d5'), undefined);
    assert.equal(getVariationPosition(enPassant).get('d6').type, 'p');

    const promotion = playVariationMove(
      createVariationAtPosition([{ fen: '4k3/P7/8/8/8/8/8/4K3 w - - 0 1' }]),
      { from: 'a7', to: 'a8', promotion: 'n' }
    );
    assert.equal(getVariationPosition(promotion).get('a8').type, 'n');
    assert.equal(playVariationMove(castle, { from: 'e1', to: 'e3' }), null);
  });

  test('reset returns to the custom game start position', () => {
    const variation = createVariationAtPosition([
      { fen: '4k3/8/8/8/8/8/8/4K3 w - - 0 7' }
    ]);
    const reset = resetVariationToStart(variation);
    assert.equal(getVariationPosition(reset).fen(), variation.rootFen);
    assert.equal(reset.cursor, 0);
  });

  test('loads a legal engine line from the current position for step-through', () => {
    const chess = new Chess();
    const positions = [{ fen: chess.fen() }];
    chess.move('e4');
    positions.push({ fen: chess.fen(), uci: 'e2e4' });
    const variation = createVariationAtPosition(positions, 1);
    const withLine = createVariationWithLine(variation, ['c7c5', 'g1f3']);

    assert.deepEqual(withLine.moves, ['e2e4', 'c7c5', 'g1f3']);
    assert.equal(withLine.cursor, 1);
    assert.equal(getVariationPosition(withLine).fen(), positions[1].fen);
    assert.deepEqual(
      getVariationMoveList(setVariationCursor(withLine, 3)).map((move) => move.san),
      ['e4', 'c5', 'Nf3']
    );
    assert.equal(createVariationWithLine(variation, ['c7c5', 'a1a8']), variation);
  });
});
