import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  createAnalysis,
  deleteAnalysis,
  getLastAnalysisId,
  listAnalyses,
  loadAnalysis,
  saveAnalysisResume
} from '../services/analysisRepository.js';

describe('local analysis persistence fallback', () => {
  test('saves reports and resume variations when the API is unavailable', async () => {
    const originalStorage = globalThis.localStorage;
    const originalFetch = globalThis.fetch;
    const entries = new Map();
    globalThis.localStorage = {
      getItem: (key) => entries.get(key) ?? null,
      setItem: (key, value) => entries.set(key, String(value)),
      removeItem: (key) => entries.delete(key)
    };
    globalThis.fetch = async () => new Response(
      JSON.stringify({ error: 'MongoDB persistence is unavailable.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );

    try {
      const report = {
        headers: { white: 'White', black: 'Black' },
        positions: [{ ply: 0, fen: 'start' }, { ply: 1, fen: 'after-e4' }]
      };
      const { analysis, persistenceMessage } = await createAnalysis({
        title: 'White vs Black',
        pgn: '1. e4 *',
        report
      });
      assert.equal(analysis.localOnly, true);
      assert.match(persistenceMessage, /MongoDB persistence is unavailable/);
      assert.equal(getLastAnalysisId(), analysis.id);

      const resume = {
        selectedPly: 1,
        currentFen: 'after-e4',
        variation: {
          rootFen: 'start',
          originalPly: 0,
          moves: ['e2e4'],
          cursor: 1
        }
      };
      const result = await saveAnalysisResume(analysis.id, resume);
      assert.equal(result.remote, false);
      assert.deepEqual((await loadAnalysis(analysis.id)).variation, resume.variation);
      assert.equal((await listAnalyses()).length, 1);
      assert.equal((await deleteAnalysis(analysis.id)), undefined);
      assert.equal((await listAnalyses()).length, 0);
    } finally {
      globalThis.fetch = originalFetch;
      if (originalStorage === undefined) delete globalThis.localStorage;
      else globalThis.localStorage = originalStorage;
    }
  });
});
