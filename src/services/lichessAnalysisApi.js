import { Chess } from 'chess.js';

const evalCache = new Map();
const pendingEvaluations = new Map();
const REQUEST_TIMEOUT_MS = 5000;
const MAX_CACHE_ENTRIES = 500;

export function normalizeFenKey(fen) {
  return fen.trim().split(/\s+/).join(' ');
}

export function uciMovesToSan(fen, uciMoves = [], maxMoves = 6) {
  if (!uciMoves.length) return [];
  const chess = new Chess(fen);
  const sanMoves = [];

  for (const uci of uciMoves.slice(0, maxMoves)) {
    if (!uci || uci.length < 4) break;
    const move = chess.move({
      from: uci.slice(0, 2),
      to: uci.slice(2, 4),
      promotion: uci[4]
    });
    if (!move) break;
    sanMoves.push(move.san);
  }
  return sanMoves;
}

async function fetchLichessCloudEval(fen, multiPv, signal) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const abort = () => controller.abort();
  signal?.addEventListener('abort', abort, { once: true });

  try {
    const url = `https://lichess.org/api/cloud-eval?fen=${encodeURIComponent(fen)}&multiPv=${multiPv}`;
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal
    });

    if (!response.ok) return null;
    const data = await response.json();
    if (!Array.isArray(data?.pvs) || data.pvs.length === 0) return null;

    const turn = fen.split(/\s+/)[1];
    const whiteSign = turn === 'b' ? -1 : 1;
    const lines = data.pvs.slice(0, multiPv).map((pv, index) => {
      const uciMoves = typeof pv.moves === 'string' ? pv.moves.split(/\s+/).filter(Boolean) : [];
      const sanMoves = uciMovesToSan(fen, uciMoves);
      const rawMate = Number.isFinite(pv.mate) ? pv.mate : null;
      const rawCp = Number.isFinite(pv.cp)
        ? pv.cp
        : rawMate === null ? null : Math.sign(rawMate || 1) * (10000 - Math.abs(rawMate) * 10);
      const score = (rawCp ?? 0) * whiteSign;

      return {
        id: index + 1,
        cp: score,
        mate: rawMate === null ? null : rawMate * whiteSign,
        bestMoveUci: uciMoves[0] || null,
        bestMoveSan: sanMoves[0] || null,
        continuationUci: uciMoves.slice(0, 6),
        continuationSan: sanMoves,
        movesText: sanMoves.join(' ')
      };
    });
    const topLine = lines[0];

    return {
      source: 'lichess-cloud',
      engineVersion: 'Lichess Cloud Evaluation (engine configuration not guaranteed)',
      depth: Number(data.depth) || null,
      nodes: Number(data.knodes) ? Number(data.knodes) * 1000 : null,
      whiteCp: topLine.cp,
      mate: topLine.mate,
      bestMoveUci: topLine.bestMoveUci,
      bestMoveSan: topLine.bestMoveSan,
      lines
    };
  } catch (error) {
    if (signal?.aborted) throw error;
    return null;
  } finally {
    clearTimeout(timeoutId);
    signal?.removeEventListener('abort', abort);
  }
}

/**
 * Fetches an optional cloud evaluation. This is not used to override local Stockfish review scores.
 */
export async function evaluatePositionOnline(fen, _isWhiteTurn, depth = 12, { multiPv = 3, signal } = {}) {
  const cacheKey = `${normalizeFenKey(fen)}|lichess-cloud|depth=${depth}|multiPv=${multiPv}`;
  if (evalCache.has(cacheKey)) return evalCache.get(cacheKey);
  if (pendingEvaluations.has(cacheKey)) return pendingEvaluations.get(cacheKey);

  const request = fetchLichessCloudEval(fen, multiPv, signal);
  pendingEvaluations.set(cacheKey, request);
  try {
    const result = await request;
    if (result) {
      if (evalCache.size >= MAX_CACHE_ENTRIES) {
        evalCache.delete(evalCache.keys().next().value);
      }
      evalCache.set(cacheKey, result);
    }
    return result;
  } finally {
    pendingEvaluations.delete(cacheKey);
  }
}

export function clearEvaluationCache() {
  evalCache.clear();
  pendingEvaluations.clear();
}
