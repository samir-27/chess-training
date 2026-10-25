/**
 * Public & Free Chess Analysis API Service
 * Powered by Lichess Cloud Evaluation API & Public Stockfish API.
 * Free, public, no registration or API keys required.
 * Provides multi-PV engine lines (up to 3 lines per move).
 */

import { Chess } from 'chess.js';

// In-memory cache for evaluated FENs during session
const evalCache = new Map();

/**
 * Normalizes FEN string for cache key
 */
function normalizeFenKey(fen) {
  return fen.split(' ').slice(0, 4).join(' ');
}

/**
 * Converts UCI moves sequence to readable SAN sequence using chess.js
 */
export function uciMovesToSan(fen, uciMoves = [], maxMoves = 6) {
  if (!uciMoves || uciMoves.length === 0) return [];
  try {
    const tempChess = new Chess(fen);
    const sanList = [];
    const count = Math.min(uciMoves.length, maxMoves);

    for (let i = 0; i < count; i++) {
      const uci = uciMoves[i];
      if (!uci || uci.length < 4) break;
      const from = uci.slice(0, 2);
      const to = uci.slice(2, 4);
      const promo = uci.length > 4 ? uci[4] : undefined;
      const m = tempChess.move({ from, to, promotion: promo });
      if (m) {
        sanList.push(m.san);
      } else {
        break;
      }
    }
    return sanList;
  } catch (err) {
    return [];
  }
}

/**
 * Fetches position evaluation and multiple engine lines from Lichess Cloud Evaluation API
 * Endpoint: https://lichess.org/api/cloud-eval?fen=...&multiPv=3
 */
async function fetchLichessCloudEval(fen) {
  try {
    const url = `https://lichess.org/api/cloud-eval?fen=${encodeURIComponent(fen)}&multiPv=3`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (res.status === 200) {
      const data = await res.json();
      if (data && data.pvs && data.pvs.length > 0) {
        // Parse all available PV lines (up to 3)
        const lines = data.pvs.slice(0, 3).map((pv, idx) => {
          const uciMoves = pv.moves ? pv.moves.split(' ') : [];
          const bestUci = uciMoves[0] || null;
          const sanList = uciMovesToSan(fen, uciMoves, 6);
          const cp = pv.cp !== undefined ? pv.cp : (pv.mate ? (pv.mate > 0 ? 10000 : -10000) : 0);

          return {
            id: idx + 1,
            cp,
            mate: pv.mate || null,
            bestMoveUci: bestUci,
            bestMoveSan: sanList[0] || bestUci,
            continuationUci: uciMoves.slice(0, 6),
            continuationSan: sanList,
            movesText: sanList.join(' ')
          };
        });

        const topPv = lines[0];

        return {
          source: 'lichess-cloud',
          depth: data.depth || 30,
          knodes: data.knodes || 0,
          whiteCp: topPv.cp,
          mate: topPv.mate,
          bestMoveUci: topPv.bestMoveUci,
          bestMoveSan: topPv.bestMoveSan,
          lines
        };
      }
    }
  } catch (err) {
    // Non-blocking fallback
  }
  return null;
}

/**
 * Fetches position evaluation from Free Public Stockfish API (Chess-API.com)
 * Endpoint: https://chess-api.com/v1
 */
async function fetchPublicStockfishApi(fen, depth = 12) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const res = await fetch('https://chess-api.com/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fen,
        depth: Math.min(16, depth),
        maxThinkingTime: 60,
        variants: 3
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (data && (data.move || data.eval !== undefined)) {
        let cp = 0;
        if (data.mate !== null && data.mate !== undefined) {
          const m = parseInt(data.mate, 10);
          cp = m > 0 ? 10000 : -10000;
        } else if (data.centipawns !== undefined) {
          cp = typeof data.centipawns === 'string' ? parseInt(data.centipawns, 10) : data.centipawns;
        } else if (data.eval !== undefined) {
          cp = Math.round(data.eval * 100);
        }

        const continuation = data.continuationArr || [];
        const continuationSan = uciMovesToSan(fen, [data.move, ...continuation], 6);

        const lines = [
          {
            id: 1,
            cp,
            mate: data.mate || null,
            bestMoveUci: data.move || null,
            bestMoveSan: data.san || continuationSan[0] || data.move,
            continuationUci: [data.move, ...continuation].slice(0, 6),
            continuationSan,
            movesText: continuationSan.join(' ')
          }
        ];

        return {
          source: 'chess-api-stockfish',
          depth: data.depth || depth,
          whiteCp: cp,
          mate: data.mate || null,
          bestMoveUci: data.move || null,
          bestMoveSan: data.san || continuationSan[0] || data.move,
          winChance: data.winChance,
          text: data.text,
          lines
        };
      }
    }
  } catch (err) {
    // Non-blocking fallback
  }
  return null;
}

/**
 * Universal Position Evaluator
 * Checks cache, Lichess Cloud Eval API, Public Stockfish API, and returns multi-line evaluation
 */
export async function evaluatePositionOnline(fen, isWhiteTurn, depth = 12) {
  const cacheKey = normalizeFenKey(fen);
  if (evalCache.has(cacheKey)) {
    return evalCache.get(cacheKey);
  }

  // 1. Try Lichess Cloud Evaluation (multiPv=3, up to depth 70)
  let evalResult = await fetchLichessCloudEval(fen);

  // 2. If not found in Lichess cache, query Public Stockfish API
  if (!evalResult) {
    evalResult = await fetchPublicStockfishApi(fen, depth);
  }

  if (evalResult) {
    evalCache.set(cacheKey, evalResult);
    return evalResult;
  }

  return null;
}

/**
 * Clears the evaluation cache
 */
export function clearEvaluationCache() {
  evalCache.clear();
}
