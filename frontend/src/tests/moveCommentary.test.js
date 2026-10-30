import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  COMMENTARY_RULES,
  createCommentaryFallback,
  selectCommentaryCandidates
} from '../services/moveCommentary.js';

function makeReport(positions) {
  return {
    engine: { name: 'Stockfish', version: 'test engine' },
    positions: [
      {
        ply: 0,
        fen: 'start',
        depth: 16,
        nodes: 100,
        lines: [{
          rank: 1,
          cp: 25,
          mate: null,
          continuationSan: ['Nf3', 'd5']
        }]
      },
      ...positions
    ]
  };
}

function makeMove(overrides = {}) {
  return {
    ply: 1,
    moveNumber: 1,
    isWhite: true,
    uci: 'f2f3',
    san: 'f3',
    classification: 'blunder',
    cpLossRaw: 220,
    cpLoss: 220,
    winLoss: 14,
    scoreBefore: 25,
    scoreAfter: -195,
    fen: 'after move',
    depth: 16,
    nodes: 200,
    bestMove: { san: 'Nf3', uci: 'g1f3' },
    hangingPieces: [],
    ...overrides
  };
}

describe('automatic move commentary selection', () => {
  test('selects only evidence-backed critical moves with engine context', () => {
    const candidates = selectCommentaryCandidates(makeReport([
      makeMove(),
      makeMove({
        ply: 2,
        isWhite: false,
        uci: 'e7e5',
        san: 'e5',
        classification: 'good',
        cpLossRaw: 10,
        cpLoss: 10
      }),
      makeMove({
        ply: 3,
        uci: 'g2g4',
        san: 'g4',
        classification: 'inaccuracy',
        cpLossRaw: 75,
        cpLoss: 75,
        winLoss: 8
      })
    ]));

    assert.deepEqual(candidates.map(({ ply }) => ply), [1, 3]);
    assert.equal(candidates[0].side, 'White');
    assert.deepEqual(candidates[0].playedMove, { san: 'f3', uci: 'f2f3' });
    assert.equal(candidates[0].bestMove.san, 'Nf3');
    assert.equal(candidates[0].lines[0].moves.join(' '), 'Nf3 d5');
    assert.equal(Object.hasOwn(candidates[0], 'priority'), false);
  });

  test('limits the number of candidates and requires engine evidence', () => {
    const moves = Array.from({ length: COMMENTARY_RULES.maxCandidates + 4 }, (_, index) =>
      makeMove({ ply: index + 1 })
    );
    const candidates = selectCommentaryCandidates(makeReport(moves));
    assert.equal(candidates.length, COMMENTARY_RULES.maxCandidates);
    assert.deepEqual(
      selectCommentaryCandidates(makeReport([makeMove({ bestMove: null })])),
      []
    );
  });

  test('uses factual fallback text only for verified engine findings', () => {
    const [blunder] = selectCommentaryCandidates(makeReport([makeMove()]));
    assert.match(createCommentaryFallback(blunder), /2\.2 pawns/);
    assert.match(createCommentaryFallback({
      ...blunder,
      verifiedFindings: {
        ...blunder.verifiedFindings,
        hangingPieces: [{ square: 'a8', piece: 'q' }]
      }
    }), /attacked queen/);
  });
});
