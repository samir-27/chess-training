/**
 * Chess Game Analysis Engine
 * Primary analysis uses the bundled local Stockfish UCI engine.
 * Evaluates games move-by-move, classifies each move into Lichess standard categories,
 * generates 2-3 engine continuation lines, ACPL, and accuracy.
 */

import { Chess } from 'chess.js';
import { StockfishEngine, StockfishPool, STOCKFISH_SEARCH } from './stockfishEngine.js';

// Move Classification Types
export const Classification = {
  BRILLIANT: 'brilliant',   // !! Cyan
  GREAT: 'great',           // ! Sky Blue
  BEST: 'best',             // ★ Emerald
  EXCELLENT: 'excellent',   // Green
  GOOD: 'good',             // Slate
  BOOK: 'book',             // 📖 Amber/Gold
  INACCURACY: 'inaccuracy', // ?! Yellow
  MISTAKE: 'mistake',       // ? Orange
  MISS: 'miss',             // ❌ Crimson
  BLUNDER: 'blunder'        // ?? Red
};

export const CLASSIFICATION_META = {
  [Classification.BRILLIANT]: {
    label: 'Brilliant',
    symbol: '!!',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    dotColor: '#06b6d4',
    description: 'A spectacular tactical sacrifice that maintains a decisive winning advantage.'
  },
  [Classification.GREAT]: {
    label: 'Great Move',
    symbol: '!',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    dotColor: '#38bdf8',
    description: 'A sharp and crucial continuation that preserves the initiative.'
  },
  [Classification.BEST]: {
    label: 'Best Move',
    symbol: '★',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    dotColor: '#10b981',
    description: 'The optimal choice identified by engine evaluation.'
  },
  [Classification.EXCELLENT]: {
    label: 'Excellent',
    symbol: '✓',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    dotColor: '#34d399',
    description: 'An almost equally strong alternative that retains the evaluation.'
  },
  [Classification.GOOD]: {
    label: 'Good Move',
    symbol: '•',
    badgeColor: 'bg-slate-700/40 text-slate-300 border-slate-600/40',
    dotColor: '#94a3b8',
    description: 'A solid, natural, and playable continuation.'
  },
  [Classification.BOOK]: {
    label: 'Book Move',
    symbol: '📖',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    dotColor: '#f59e0b',
    description: 'Standard opening theoretical move.'
  },
  [Classification.INACCURACY]: {
    label: 'Inaccuracy',
    symbol: '?!',
    badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    dotColor: '#eab308',
    description: 'A slight sub-optimal choice that cedes minor advantage (50-100 cp loss).'
  },
  [Classification.MISTAKE]: {
    label: 'Mistake',
    symbol: '?',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    dotColor: '#f97316',
    description: 'A clear mistake that significantly weakens the position (100-200 cp loss).'
  },
  [Classification.MISS]: {
    label: 'Missed Win',
    symbol: '❌',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    dotColor: '#f43f5e',
    description: 'Missed a winning tactical sequence or decisive checkmate.'
  },
  [Classification.BLUNDER]: {
    label: 'Blunder',
    symbol: '??',
    badgeColor: 'bg-red-500/25 text-red-300 border-red-500/50',
    dotColor: '#ef4444',
    description: 'A critical blunder that turns the game around (>200 cp loss).'
  }
};

// Piece values in centipawns
const PIECE_VALUES = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000
};

// Piece-Square Tables (White perspective, row 0 is rank 8, row 7 is rank 1)
const PAWN_PST = [
  0,  0,  0,  0,  0,  0,  0,  0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
   5,  5, 10, 25, 25, 10,  5,  5,
   0,  0,  0, 20, 20,  0,  0,  0,
   5, -5,-10,  0,  0,-10, -5,  5,
   5, 10, 10,-20,-20, 10, 10,  5,
   0,  0,  0,  0,  0,  0,  0,  0
];

const KNIGHT_PST = [
  -50,-40,-30,-30,-30,-30,-40,-50,
  -40,-20,  0,  0,  0,  0,-20,-40,
  -30,  0, 10, 15, 15, 10,  0,-30,
  -30,  5, 15, 20, 20, 15,  5,-30,
  -30,  0, 15, 20, 20, 15,  0,-30,
  -30,  5, 10, 15, 15, 10,  5,-30,
  -40,-20,  0,  5,  5,  0,-20,-40,
  -50,-40,-30,-30,-30,-30,-40,-50
];

const BISHOP_PST = [
  -20,-10,-10,-10,-10,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5, 10, 10,  5,  0,-10,
  -10,  5,  5, 10, 10,  5,  5,-10,
  -10,  0, 10, 10, 10, 10,  0,-10,
  -10, 10, 10, 10, 10, 10, 10,-10,
  -10,  5,  0,  0,  0,  0,  5,-10,
  -20,-10,-10,-10,-10,-10,-10,-20
];

const ROOK_PST = [
   0,  0,  0,  0,  0,  0,  0,  0,
   5, 10, 10, 10, 10, 10, 10,  5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
   0,  0,  0,  5,  5,  0,  0,  0
];

const QUEEN_PST = [
  -20,-10,-10, -5, -5,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5,  5,  5,  5,  0,-10,
   -5,  0,  5,  5,  5,  5,  0, -5,
    0,  0,  5,  5,  5,  5,  0, -5,
  -10,  5,  5,  5,  5,  5,  0,-10,
  -10,  0,  5,  0,  0,  0,  0,-10,
  -20,-10,-10, -5, -5,-10,-10,-20
];

const KING_PST_MID = [
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -20,-30,-30,-40,-40,-30,-30,-20,
  -10,-20,-20,-20,-20,-20,-20,-10,
   20, 20,  0,  0,  0,  0, 20, 20,
   20, 30, 10,  0,  0, 10, 30, 20
];

/**
 * Local symmetric position evaluator fallback
 */
export function evaluatePosition(chess) {
  let score = 0;
  const board = chess.board();

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (!piece) continue;

      const val = PIECE_VALUES[piece.type] || 0;
      const squareIdx = r * 8 + c;
      const flippedIdx = (7 - r) * 8 + c;

      let pst = 0;
      if (piece.type === 'p') pst = piece.color === 'w' ? PAWN_PST[squareIdx] : PAWN_PST[flippedIdx];
      else if (piece.type === 'n') pst = piece.color === 'w' ? KNIGHT_PST[squareIdx] : KNIGHT_PST[flippedIdx];
      else if (piece.type === 'b') pst = piece.color === 'w' ? BISHOP_PST[squareIdx] : BISHOP_PST[flippedIdx];
      else if (piece.type === 'r') pst = piece.color === 'w' ? ROOK_PST[squareIdx] : ROOK_PST[flippedIdx];
      else if (piece.type === 'q') pst = piece.color === 'w' ? QUEEN_PST[squareIdx] : QUEEN_PST[flippedIdx];
      else if (piece.type === 'k') pst = piece.color === 'w' ? KING_PST_MID[squareIdx] : KING_PST_MID[flippedIdx];

      if (piece.color === 'w') {
        score += (val + pst);
      } else {
        score -= (val + pst);
      }
    }
  }

  // Check state
  if (chess.inCheck()) {
    if (chess.moves().length === 0) {
      return chess.turn() === 'w' ? -10000 : 10000;
    }
    score += chess.turn() === 'w' ? -35 : 35;
  }

  return score;
}

function findHangingPieces(chess, color) {
  const pieces = [];
  const opponent = color === 'w' ? 'b' : 'w';
  const board = chess.board();

  for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
      const piece = board[row][column];
      if (!piece || piece.color !== color || piece.type === 'k') continue;

      const square = `${String.fromCharCode(97 + column)}${8 - row}`;
      const attacked = chess.attackers(square, opponent).length > 0;
      const defended = chess.attackers(square, color).length > 0;
      if (attacked && !defended) pieces.push({ square, piece: piece.type });
    }
  }
  return pieces;
}

/**
 * Minimax local search returning top 3 engine lines
 */
export function findBestMove(chess, depth = 2) {
  const isWhite = chess.turn() === 'w';
  const moves = chess.moves({ verbose: true });

  if (moves.length === 0) {
    return {
      bestMove: null,
      bestScore: chess.isCheckmate() ? (isWhite ? -10000 : 10000) : 0,
      lines: []
    };
  }

  const scoredMoves = [];

  for (const move of moves) {
    chess.move(move);
    const score = minimax(chess, depth - 1, -Infinity, Infinity, !isWhite);
    chess.undo();
    scoredMoves.push({ move, score });
  }

  if (isWhite) {
    scoredMoves.sort((a, b) => b.score - a.score);
  } else {
    scoredMoves.sort((a, b) => a.score - b.score);
  }

  const topMoves = scoredMoves.slice(0, 3);
  const lines = topMoves.map((item, idx) => ({
    id: idx + 1,
    cp: item.score,
    mate: Math.abs(item.score) >= 9000 ? (item.score > 0 ? 1 : -1) : null,
    bestMoveUci: `${item.move.from}${item.move.to}${item.move.promotion || ''}`,
    bestMoveSan: item.move.san,
    continuationSan: [item.move.san],
    movesText: item.move.san
  }));

  return {
    bestMove: topMoves[0].move,
    bestScore: topMoves[0].score,
    lines
  };
}

function minimax(chess, depth, alpha, beta, isMaximizing) {
  if (depth === 0) {
    return evaluatePosition(chess);
  }

  const moves = chess.moves({ verbose: true });
  if (moves.length === 0) {
    if (chess.inCheck()) {
      return chess.turn() === 'w' ? -10000 : 10000;
    }
    return 0;
  }

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of moves) {
      chess.move(move);
      const evalScore = minimax(chess, depth - 1, alpha, beta, false);
      chess.undo();
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      chess.move(move);
      const evalScore = minimax(chess, depth - 1, alpha, beta, true);
      chess.undo();
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

export function evaluateMovePlayed(chessBefore, movePlayed, depth = 2) {
  const isWhite = chessBefore.turn() === 'w';
  const testChess = new Chess(chessBefore.fen());
  testChess.move(movePlayed);

  if (testChess.isGameOver()) {
    if (testChess.isCheckmate()) {
      return isWhite ? 10000 : -10000;
    }
    return 0;
  }

  return minimax(testChess, depth - 1, -Infinity, Infinity, !isWhite);
}

/**
 * Converts centipawn score to Win Probability Percentage [0, 100]
 */
export function centipawnsToWinChance(cp) {
  if (cp === null || cp === undefined) return 50;
  if (cp >= 10000) return 100;
  if (cp <= -10000) return 0;
  const clampedCp = Math.max(-2000, Math.min(2000, cp));
  return 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * clampedCp)) - 1);
}

/**
 * Calculates Move Accuracy Score from win chance loss
 */
export function calculateMoveAccuracy(loss, winChanceBest = 50) {
  // This is an app-defined win-probability-loss model, not Chess.com's proprietary formula.
  let adjustedLoss = Math.max(0, loss);
  if (winChanceBest > 80) {
    const factor = Math.min(1, (winChanceBest - 80) / 20);
    adjustedLoss = loss * (1 - factor * 0.4);
  }
  const acc = 103.1668 * Math.exp(-0.04354 * adjustedLoss) - 3.1669;
  return Math.max(0, Math.min(100, Math.round(acc * 10) / 10));
}

/**
 * Strict Tactical Brilliant Sacrifice Detector
 * Rarely triggered: Only authentic sacrifices holding a decisive winning advantage.
 */
function isBrilliantSacrifice({
  movePlayed,
  winLoss,
  isWhite,
  scorePlayed,
  chessBefore
}) {
  // Never King, Pawn, or Checkmate
  if (movePlayed.piece === 'k' || movePlayed.piece === 'p') return false;

  // Must be optimal (winLoss <= 0.05)
  if (winLoss > 0.05) return false;

  const pieceValue = PIECE_VALUES[movePlayed.piece] || 100;
  const capturedValue = movePlayed.captured ? (PIECE_VALUES[movePlayed.captured] || 0) : 0;

  // Genuine material sacrifice
  if (pieceValue < 320 || capturedValue >= pieceValue) return false;

  try {
    const testChess = new Chess(chessBefore.fen());
    testChess.move(movePlayed);

    if (testChess.isGameOver()) return false; // Game over / mate is Best, not Sacrifice

    const opponentColor = isWhite ? 'b' : 'w';
    if (!testChess.isAttacked(movePlayed.to, opponentColor)) return false;

    // Must maintain a decisive winning advantage (+1.50 or better)
    const adv = isWhite ? scorePlayed : -scorePlayed;
    if (adv < 150) return false;

    return true;
  } catch {
    return false;
  }
}

/**
 * Classifies a move based on win chance and centipawn loss
 */
export function classifyMove({
  movePlayed,
  bestMove,
  winChanceBest,
  winChancePlayed,
  scoreBest,
  scorePlayed,
  cpLoss = 0,
  isWhite,
  plyIndex,
  chessBefore
}) {
  const playedSan = movePlayed.san;
  const bestSan = bestMove?.san || playedSan;
  const isTopChoice = playedSan === bestSan;

  const winLoss = Math.max(0, winChanceBest - winChancePlayed);

  // Brilliant is reserved for a best move that sacrifices attacked material while winning.
  if (isBrilliantSacrifice({
    movePlayed,
    winLoss,
    isWhite,
    scorePlayed,
    chessBefore
  })) {
    return {
      classification: Classification.BRILLIANT,
      explanation: `Brilliant sacrifice (${playedSan})! Gives up material to maintain a decisive tactical edge.`
    };
  }

  // Great is a qualitative label for a critical, best non-pawn move.
  if (isTopChoice && winLoss <= 0.5 && winChancePlayed >= 52 && plyIndex > 6) {
    const isCritical = (isWhite ? scoreBest : -scoreBest) < 100;
    if (isCritical && movePlayed.piece !== 'p' && movePlayed.piece !== 'k') {
      return {
        classification: Classification.GREAT,
        explanation: `Great find (${playedSan})! Sharpest continuation holding the advantage.`
      };
    }
  }

  if (isTopChoice) {
    return {
      classification: Classification.BEST,
      explanation: `Best move (${playedSan}). Top engine recommendation.`
    };
  }

  if (winChanceBest >= 68 && winChancePlayed < 52) {
    return {
      classification: Classification.MISS,
      explanation: `Missed win (${playedSan}). Overlooked a decisive winning sequence. Best was ${bestSan}.`
    };
  }

  // Both win-probability loss and centipawn loss must agree before assigning a band.
  if (winLoss <= 0.6 && cpLoss <= 10) {
    return {
      classification: Classification.EXCELLENT,
      explanation: `Excellent move (${playedSan}). Nearly as strong as the engine choice.`
    };
  }

  if (winLoss <= 2.5 && cpLoss <= 30) {
    return {
      classification: Classification.EXCELLENT,
      explanation: `Excellent move (${playedSan}). Maintains the evaluation without compromise.`
    };
  }

  if (winLoss <= 6.5 && cpLoss <= 55) {
    return {
      classification: Classification.GOOD,
      explanation: `Solid move (${playedSan}). Sound and playable continuation.`
    };
  }

  if (winLoss <= 14.0 && cpLoss <= 100) {
    return {
      classification: Classification.INACCURACY,
      explanation: `Inaccuracy (${playedSan}). Cedes some advantage (${Math.round(cpLoss)} cp loss). Best was ${bestSan}.`
    };
  }

  if (winLoss <= 25.0 && cpLoss <= 200) {
    return {
      classification: Classification.MISTAKE,
      explanation: `Mistake (${playedSan}). Weakens the position considerably (${Math.round(cpLoss)} cp loss). Best was ${bestSan}.`
    };
  }

  // 10. Blunder (Lichess standard: >200 cp loss)
  return {
    classification: Classification.BLUNDER,
    explanation: `Blunder (${playedSan})! A critical mistake shifting the advantage to ${isWhite ? 'Black' : 'White'} (-${Math.round(cpLoss)} cp). Best was ${bestSan}.`
  };
}

export function createAnalysisPreview(pgnText) {
  const chess = new Chess();
  chess.loadPgn(pgnText);
  const history = chess.history({ verbose: true });
  if (!history.length) throw new Error('PGN contains no moves.');
  const rawHeaders = chess.header();
  const startFen = rawHeaders.SetUp === '1' && rawHeaders.FEN ? rawHeaders.FEN : undefined;
  const replay = new Chess(startFen);
  const positions = [{
    ply: 0,
    fen: replay.fen(),
    score: null,
    mate: null,
    depth: 0,
    nodes: 0,
    lines: [],
    classification: null
  }];
  for (const [index, move] of history.entries()) {
    const played = replay.move(move);
    positions.push({
      ply: index + 1,
      moveNumber: Number(replay.fen().split(' ')[5]),
      isWhite: played.color === 'w',
      san: played.san,
      uci: `${played.from}${played.to}${played.promotion || ''}`,
      from: played.from,
      to: played.to,
      fen: replay.fen(),
      score: null,
      mate: null,
      depth: 0,
      nodes: 0,
      lines: [],
      classification: null
    });
  }
  return {
    headers: {
      white: rawHeaders.White || 'White Player',
      black: rawHeaders.Black || 'Black Player',
      event: rawHeaders.Event || 'Casual Game',
      date: rawHeaders.Date || new Date().toISOString().slice(0, 10),
      result: rawHeaders.Result || '*',
      whiteElo: rawHeaders.WhiteElo || '?',
      blackElo: rawHeaders.BlackElo || '?'
    },
    accuracies: { white: 100, black: 100 },
    acpl: { white: 0, black: 0 },
    breakdown: { white: {}, black: {} },
    engine: {
      name: typeof Worker === 'function' ? 'Stockfish' : 'deterministic local minimax fallback',
      version: 'Preparing engine analysis',
      depth: 0,
      threads: STOCKFISH_SEARCH.threads,
      hashMb: STOCKFISH_SEARCH.hashMb,
      multiPv: STOCKFISH_SEARCH.multiPv
    },
    positions,
    totalPlies: history.length
  };
}

/**
 * Analyzes each distinct position with one consistent local Stockfish search configuration.
 */
export async function analyzePgnGame(pgnText, onProgress = null, {
  signal,
  depth = STOCKFISH_SEARCH.depth,
  threads = STOCKFISH_SEARCH.threads,
  hashMb = STOCKFISH_SEARCH.hashMb,
  multiPv = 1
} = {}) {
  const chess = new Chess();

  try {
    chess.loadPgn(pgnText);
  } catch (err) {
    throw new Error('Failed to parse PGN: ' + err.message, { cause: err });
  }

  const history = chess.history({ verbose: true });
  const headers = chess.header();

  if (history.length === 0) {
    throw new Error('PGN contains no moves.');
  }

  const startFen = headers.SetUp === '1' && headers.FEN ? headers.FEN : undefined;
  const analysisEngine = new Chess(startFen);
  const analyzedPositions = [];
  let whiteCpLossSum = 0;
  let blackCpLossSum = 0;
  const poolSize = typeof Worker === 'function' && typeof navigator !== 'undefined'
    ? Math.min(3, Math.max(1, (navigator.hardwareConcurrency || 4) - 1))
    : 1;
  const engine = typeof Worker === 'function'
    ? new StockfishPool({ depth, threads, hashMb, multiPv, size: poolSize })
    : null;
  const sourceName = engine ? 'Stockfish' : 'deterministic local minimax fallback';
  const positionCache = new Map();
  const preview = createAnalysisPreview(pgnText);

  const evaluateFen = (fen) => {
    if (signal?.aborted) return Promise.reject(new DOMException('Analysis was cancelled.', 'AbortError'));
    if (positionCache.has(fen)) return positionCache.get(fen);

    const promise = (async () => {
      const position = new Chess(fen);
      let result;
      if (position.isGameOver()) {
        const whiteCp = position.isCheckmate() ? (position.turn() === 'w' ? -10000 : 10000) : 0;
        result = { source: engine ? 'stockfish-local' : 'local-minimax', whiteCp, mate: position.isCheckmate() ? 0 : null, depth: 0, nodes: 0, bestMoveUci: null, lines: [] };
      } else if (engine) {
        const uciResult = await engine.analyze(fen, signal);
        const bestMoveUci = uciResult.bestMoveUci;
        const bestMove = bestMoveUci ? position.moves({ verbose: true }).find((move) =>
          move.from === bestMoveUci.slice(0, 2) &&
          move.to === bestMoveUci.slice(2, 4) &&
          (move.promotion || '') === (bestMoveUci[4] || '')
        ) : null;
        if (bestMoveUci && !bestMove) {
          throw new Error(`Stockfish returned illegal move ${bestMoveUci} for FEN ${fen}.`);
        }
        const seenLines = new Set();
        const lines = (uciResult.lines || []).flatMap((line, index) => {
          const continuationBoard = new Chess(fen);
          const continuationSan = [];
          const continuationUci = [];
          for (const uci of line.pv || []) {
            const move = continuationBoard.move({
              from: uci.slice(0, 2),
              to: uci.slice(2, 4),
              ...(uci[4] ? { promotion: uci[4] } : {})
            });
            if (!move) break;
            continuationSan.push(move.san);
            continuationUci.push(uci);
          }
          if (!continuationUci.length || seenLines.has(continuationUci.join(' '))) return [];
          seenLines.add(continuationUci.join(' '));
          const lineMove = position.moves({ verbose: true }).find((move) =>
            `${move.from}${move.to}${move.promotion || ''}` === continuationUci[0]
          );
          if (!lineMove) return [];
          return [{
            id: index + 1,
            rank: index + 1,
            cp: line.whiteCp,
            mate: line.mate,
            bestMoveUci: continuationUci[0],
            bestMoveSan: lineMove.san,
            continuationUci,
            continuationSan,
            movesText: continuationSan.join(' '),
            depth: line.depth,
            nodes: line.nodes
          }];
        });
        result = {
          ...uciResult,
          bestMove,
          lines
        };
      } else {
        const search = findBestMove(position, 2);
        const bestMoveUci = search.bestMove
          ? `${search.bestMove.from}${search.bestMove.to}${search.bestMove.promotion || ''}`
          : null;
        result = {
          source: 'local-minimax',
          engineVersion: 'built-in deterministic minimax',
          depth: 2,
          nodes: null,
          whiteCp: search.bestScore,
          mate: null,
          bestMoveUci,
          bestMove: search.bestMove,
          lines: search.lines.map((line) => ({
            ...line,
            continuationUci: [line.bestMoveUci],
            continuationSan: line.continuationSan,
            depth: 2,
            nodes: null
          }))
        };
      }
      return result;
    })();

    positionCache.set(fen, promise);
    return promise;
  };

  // Pre-dispatch all unique game positions into the worker pool concurrently
  if (engine) {
    for (const pos of preview.positions) {
      evaluateFen(pos.fen).catch(() => {});
    }
  }

  try {
    let currentEval = await evaluateFen(analysisEngine.fen());
    analyzedPositions.push({
      ply: 0,
      fen: analysisEngine.fen(),
      move: null,
      score: currentEval.whiteCp,
      winChance: centipawnsToWinChance(currentEval.whiteCp),
      classification: null,
      accuracy: 100,
      bestMove: null,
      depth: currentEval.depth,
      nodes: currentEval.nodes,
      mate: currentEval.mate,
      lines: currentEval.lines,
      explanation: 'Starting Position'
    });

    for (let i = 0; i < history.length; i++) {
      if (signal?.aborted) throw new DOMException('Analysis was cancelled.', 'AbortError');
      const move = history[i];
      const isWhite = analysisEngine.turn() === 'w';
      const fenBefore = analysisEngine.fen();
      const chessBefore = new Chess(fenBefore);
      const inCheckBefore = chessBefore.isCheck();
      const bestScore = currentEval.whiteCp;
      let bestMove = currentEval.bestMove;
      const hangingBefore = findHangingPieces(chessBefore, isWhite ? 'w' : 'b');

      if (engine && !bestMove && !chessBefore.isGameOver()) {
        const uci = currentEval.bestMoveUci;
        if (!uci) throw new Error(`Stockfish did not return a best move for FEN ${fenBefore}.`);
        bestMove = chessBefore.moves({ verbose: true }).find((candidate) =>
          candidate.from === uci.slice(0, 2) &&
          candidate.to === uci.slice(2, 4) &&
          (candidate.promotion || '') === (uci[4] || '')
        );
      }
      if (!bestMove) throw new Error(`No legal best move found for FEN ${fenBefore}.`);

      const executed = analysisEngine.move(move);
      const givesCheck = analysisEngine.isCheck();
      const hangingAfter = findHangingPieces(analysisEngine, isWhite ? 'w' : 'b');
      const hangingPieces = hangingAfter.filter((piece) =>
        !hangingBefore.some((before) => before.square === piece.square && before.piece === piece.piece)
      );
      const afterEval = await evaluateFen(analysisEngine.fen());
      const playedScore = afterEval.whiteCp;
      const moverSign = isWhite ? 1 : -1;
      const bestWinChance = centipawnsToWinChance(bestScore * moverSign);
      const playedWinChance = centipawnsToWinChance(playedScore * moverSign);
      const winLoss = Math.max(0, bestWinChance - playedWinChance);
      const cpLoss = Math.max(0, (bestScore - playedScore) * moverSign);
      const missedTactic = currentEval.mate !== null &&
        currentEval.mate * moverSign > 0 &&
        !(afterEval.mate !== null && afterEval.mate * moverSign > 0);

      if (isWhite) whiteCpLossSum += Math.min(10000, cpLoss);
      else blackCpLossSum += Math.min(10000, cpLoss);

      const result = classifyMove({
        movePlayed: executed,
        bestMove,
        winChanceBest: bestWinChance,
        winChancePlayed: playedWinChance,
        scoreBest: bestScore,
        scorePlayed: playedScore,
        cpLoss,
        isWhite,
        plyIndex: i + 1,
        chessBefore
      });
      const { classification } = result;
      const annotations = [];
      if (missedTactic) annotations.push('A forced mate was available and is no longer maintained.');
      if (hangingPieces.length) {
        annotations.push(`Leaves attacked, undefended piece(s) on ${hangingPieces.map((piece) => piece.square).join(', ')}.`);
      }
      const explanation = [result.explanation, ...annotations].join(' ');
      const moveAccuracy = calculateMoveAccuracy(winLoss, bestWinChance);

      analyzedPositions.push({
        ply: i + 1,
        moveNumber: Number(fenBefore.split(' ')[5]),
        isWhite,
        san: executed.san,
        uci: `${executed.from}${executed.to}${executed.promotion || ''}`,
        from: executed.from,
        to: executed.to,
        fen: analysisEngine.fen(),
        score: playedScore,
        winChance: centipawnsToWinChance(playedScore),
        classification,
        accuracy: moveAccuracy,
        cpLoss: Math.round(cpLoss),
        cpLossRaw: cpLoss,
        winLoss,
        scoreBefore: bestScore,
        mateBefore: currentEval.mate,
        scoreAfter: playedScore,
        inCheckBefore,
        givesCheck,
        isCapture: executed.isCapture(),
        bestMove: {
          san: bestMove.san,
          from: bestMove.from,
          to: bestMove.to,
          uci: `${bestMove.from}${bestMove.to}${bestMove.promotion || ''}`
        },
        lines: afterEval.lines,
        depth: afterEval.depth,
        nodes: afterEval.nodes,
        mate: afterEval.mate,
        critical: cpLoss >= 200 || currentEval.mate !== null || hangingPieces.length > 0,
        missedTactic,
        hangingPieces,
        explanation
      });
      currentEval = afterEval;

      if (onProgress) {
        const partialPositions = [
          ...analyzedPositions,
          ...preview.positions.slice(analyzedPositions.length)
        ];
        onProgress({
          current: i + 1,
          total: history.length,
          percentage: Math.round(((i + 1) / history.length) * 100),
          report: {
            ...preview,
            positions: partialPositions,
            engine: {
              name: sourceName,
              version: engine?.engineVersion || 'built-in deterministic minimax',
              depth: engine?.depth || 2,
              threads: engine?.settings.threads || 1,
              hashMb: engine?.settings.hashMb || 0,
              multiPv: engine?.settings.multiPv || 1
            }
          }
        });
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }
  } finally {
    engine?.close();
  }

  // Calculate Overall Accuracies & ACPL
  const whiteMoves = analyzedPositions.filter(p => p.ply > 0 && p.isWhite);
  const blackMoves = analyzedPositions.filter(p => p.ply > 0 && !p.isWhite);

  const whiteAccuracy = whiteMoves.length > 0
    ? Math.round(whiteMoves.reduce((acc, m) => acc + m.accuracy, 0) / whiteMoves.length * 10) / 10
    : 100;

  const blackAccuracy = blackMoves.length > 0
    ? Math.round(blackMoves.reduce((acc, m) => acc + m.accuracy, 0) / blackMoves.length * 10) / 10
    : 100;

  const whiteAcpl = whiteMoves.length > 0 ? Math.round(whiteCpLossSum / whiteMoves.length) : 0;
  const blackAcpl = blackMoves.length > 0 ? Math.round(blackCpLossSum / blackMoves.length) : 0;

  // Count Classifications
  const countClassifications = (moves) => {
    const counts = {};
    Object.values(Classification).forEach(c => { counts[c] = 0; });
    moves.forEach(m => {
      if (m.classification && counts[m.classification] !== undefined) {
        counts[m.classification]++;
      }
    });
    return counts;
  };

  return {
    headers: {
      white: headers.White || 'White Player',
      black: headers.Black || 'Black Player',
      event: headers.Event || 'Casual Game',
      date: headers.Date || new Date().toISOString().slice(0, 10),
      result: headers.Result || '*',
      whiteElo: headers.WhiteElo || '?',
      blackElo: headers.BlackElo || '?'
    },
    accuracies: {
      white: whiteAccuracy,
      black: blackAccuracy
    },
    acpl: {
      white: whiteAcpl,
      black: blackAcpl
    },
    breakdown: {
      white: countClassifications(whiteMoves),
      black: countClassifications(blackMoves)
    },
    engine: {
      name: sourceName,
      version: engine?.engineVersion || 'built-in deterministic minimax',
      depth: engine?.depth || 2,
      threads: engine?.settings.threads || 1,
      hashMb: engine?.settings.hashMb || 0,
      multiPv: engine?.settings.multiPv || 1
    },
    positions: analyzedPositions,
    totalPlies: history.length
  };
}
