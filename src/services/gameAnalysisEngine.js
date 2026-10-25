/**
 * Chess Game Analysis Engine
 * Powered by Lichess Cloud Evaluation & Public Stockfish APIs.
 * Evaluates games move-by-move, classifies each move into Lichess standard categories,
 * generates 2-3 engine continuation lines, ACPL, and accuracy.
 */

import { Chess } from 'chess.js';
import { evaluatePositionOnline } from './lichessAnalysisApi.js';

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
 * Standard Opening Book line prefixes
 */
const OPENING_BOOK_MOVES = new Set([
  'e4', 'e4 e5', 'e4 e5 Nf3', 'e4 e5 Nf3 Nc6', 'e4 e5 Nf3 Nc6 Bb5', 'e4 e5 Nf3 Nc6 Bc4', 'e4 e5 Nf3 Nc6 d4',
  'e4 e5 Nf3 Nf6', 'e4 e5 f4', 'e4 e5 Nc3', 'e4 e5 d4',
  'e4 e6', 'e4 e6 d4', 'e4 e6 d4 d5', 'e4 e6 d4 d5 Nc3', 'e4 e6 d4 d5 Nd2', 'e4 e6 d4 d5 e5', 'e4 e6 d4 d5 exd5',
  'e4 e6 f4', 'e4 e6 f4 d5', 'e4 e6 f4 d5 Nf3', 'e4 e6 f4 d5 Nf3 c5', 'e4 e6 f4 d5 Nf3 c5 exd5', 'e4 e6 f4 d5 Nf3 c5 exd5 exd5',
  'e4 e6 f4 d5 Nf3 c5 exd5 exd5 d4', 'e4 e6 f4 d5 Nf3 c5 exd5 exd5 d4 cxd4', 'e4 e6 f4 d5 Nf3 c5 exd5 exd5 d4 cxd4 Bb5+',
  'e4 e6 f4 d5 Nf3 c5 exd5 exd5 d4 cxd4 Bb5+ Bd7', 'e4 e6 f4 d5 Nf3 c5 exd5 exd5 d4 cxd4 Bb5+ Bd7 Bxd7+',
  'e4 e6 f4 d5 Nf3 c5 exd5 exd5 d4 cxd4 Bb5+ Bd7 Bxd7+ Nxd7', 'e4 e6 f4 d5 Nf3 c5 exd5 exd5 d4 cxd4 Bb5+ Bd7 Bxd7+ Nxd7 O-O',
  'e4 e6 f4 d5 Nf3 c5 exd5 exd5 d4 cxd4 Bb5+ Bd7 Bxd7+ Nxd7 O-O Ngf6',
  'e4 c5', 'e4 c5 Nf3', 'e4 c5 Nf3 d6', 'e4 c5 Nf3 Nc6', 'e4 c5 Nf3 e6', 'e4 c5 Nf3 g6',
  'e4 c5 Nf3 d6 d4', 'e4 c5 Nf3 d6 d4 cxd4', 'e4 c5 Nf3 d6 d4 cxd4 Nxd4', 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6', 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3',
  'e4 c5 Nc3', 'e4 c5 c3', 'e4 c5 f4', 'e4 c5 d4',
  'e4 c6', 'e4 c6 d4', 'e4 c6 d4 d5', 'e4 c6 d4 d5 Nc3', 'e4 c6 d4 d5 e5', 'e4 c6 d4 d5 exd5',
  'e4 d5', 'e4 d5 exd5', 'e4 d5 exd5 Qxd5', 'e4 d5 exd5 Nf6',
  'e4 d6', 'e4 d6 d4', 'e4 d6 d4 Nf6', 'e4 d6 d4 Nf6 Nc3',
  'e4 Nf6', 'e4 Nf6 e5', 'e4 Nf6 e5 Nd5',
  'e4 g6', 'e4 g6 d4', 'e4 g6 d4 Bg7',
  'd4', 'd4 d5', 'd4 d5 c4', 'd4 d5 c4 e6', 'd4 d5 c4 c6', 'd4 d5 c4 dxc4', 'd4 d5 Nf3', 'd4 d5 Bf4',
  'd4 Nf6', 'd4 Nf6 c4', 'd4 Nf6 c4 e6', 'd4 Nf6 c4 g6', 'd4 Nf6 c4 c5', 'd4 Nf6 Nf3', 'd4 Nf6 Bg5',
  'd4 f5', 'd4 e6',
  'c4', 'c4 e5', 'c4 c5', 'c4 Nf6', 'c4 e6',
  'Nf3', 'Nf3 d5', 'Nf3 Nf6', 'Nf3 c5', 'Nf3 g6',
  'b3', 'g3', 'f4'
]);

function isOpeningBookMove(moveHistorySans) {
  const line = moveHistorySans.join(' ');
  return OPENING_BOOK_MOVES.has(line);
}

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
      return isMaximizing ? -10000 : 10000;
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
  if (loss <= 0.05) return 100;
  let adjustedLoss = loss;
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
  playedWinChance,
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
  } catch (e) {
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
  chessBefore,
  moveHistorySans = []
}) {
  const playedSan = movePlayed.san;
  const bestSan = bestMove?.san || playedSan;
  const isTopChoice = playedSan === bestSan;

  const winLoss = Math.max(0, winChanceBest - winChancePlayed);

  // 1. Book Move: standard theoretical opening
  if (plyIndex <= 20 && isOpeningBookMove(moveHistorySans)) {
    return {
      classification: Classification.BOOK,
      explanation: `Book move (${playedSan}). Theoretical opening line.`
    };
  }

  // 2. Brilliant Move: strict piece sacrifice
  if (isBrilliantSacrifice({
    movePlayed,
    winLoss,
    isWhite,
    playedWinChance: winChancePlayed,
    scorePlayed,
    chessBefore
  })) {
    return {
      classification: Classification.BRILLIANT,
      explanation: `Brilliant sacrifice (${playedSan})! Gives up material to maintain a decisive tactical edge.`
    };
  }

  // 3. Great Move: sharp only-move
  if (isTopChoice && winLoss <= 0.5 && winChancePlayed >= 52 && plyIndex > 6) {
    const isCritical = (isWhite ? scoreBest : -scoreBest) < 100;
    if (isCritical && movePlayed.piece !== 'p' && movePlayed.piece !== 'k') {
      return {
        classification: Classification.GREAT,
        explanation: `Great find (${playedSan})! Sharpest continuation holding the advantage.`
      };
    }
  }

  // 4. Best Move
  if (isTopChoice || winLoss <= 0.6 || cpLoss <= 10) {
    return {
      classification: Classification.BEST,
      explanation: `Best move (${playedSan}). Top engine recommendation.`
    };
  }

  // 5. Excellent Move
  if (winLoss <= 2.5 || cpLoss <= 30) {
    return {
      classification: Classification.EXCELLENT,
      explanation: `Excellent move (${playedSan}). Maintains the evaluation without compromise.`
    };
  }

  // 6. Good Move
  if (winLoss <= 6.5 || cpLoss <= 55) {
    return {
      classification: Classification.GOOD,
      explanation: `Solid move (${playedSan}). Sound and playable continuation.`
    };
  }

  // 7. Inaccuracy (Lichess standard: ~50-100 cp loss)
  if (winLoss <= 14.0 || cpLoss <= 100) {
    return {
      classification: Classification.INACCURACY,
      explanation: `Inaccuracy (${playedSan}). Cedes some advantage (-${Math.round(cpLoss)} cp). Best was ${bestSan}.`
    };
  }

  // 8. Missed Win
  if (winChanceBest >= 68 && winChancePlayed < 52) {
    return {
      classification: Classification.MISS,
      explanation: `Missed win (${playedSan}). Overlooked a decisive winning sequence. Best was ${bestSan}.`
    };
  }

  // 9. Mistake (Lichess standard: ~100-200 cp loss)
  if (winLoss <= 25.0 || cpLoss <= 200) {
    return {
      classification: Classification.MISTAKE,
      explanation: `Mistake (${playedSan}). Weakens the position considerably (-${Math.round(cpLoss)} cp). Best was ${bestSan}.`
    };
  }

  // 10. Blunder (Lichess standard: >200 cp loss)
  return {
    classification: Classification.BLUNDER,
    explanation: `Blunder (${playedSan})! A critical mistake shifting the advantage to ${isWhite ? 'Black' : 'White'} (-${Math.round(cpLoss)} cp). Best was ${bestSan}.`
  };
}

/**
 * Analyzes an entire PGN game move-by-move using Lichess Cloud Evaluation & Public APIs
 */
export async function analyzePgnGame(pgnText, onProgress = null) {
  const chess = new Chess();

  try {
    chess.loadPgn(pgnText);
  } catch (err) {
    throw new Error('Failed to parse PGN: ' + err.message);
  }

  const history = chess.history({ verbose: true });
  const headers = chess.header();

  if (history.length === 0) {
    throw new Error('PGN contains no moves.');
  }

  const analysisEngine = new Chess();
  const analyzedPositions = [];

  // Initial position eval (move 0)
  let initialScore = 0;
  let initialLines = [];
  try {
    const onlineInit = await evaluatePositionOnline(analysisEngine.fen(), true, 12);
    if (onlineInit && onlineInit.whiteCp !== undefined) {
      initialScore = onlineInit.whiteCp;
      initialLines = onlineInit.lines || [];
    } else {
      initialScore = evaluatePosition(analysisEngine);
    }
  } catch (e) {
    initialScore = evaluatePosition(analysisEngine);
  }

  const initialWinChance = centipawnsToWinChance(initialScore);

  analyzedPositions.push({
    ply: 0,
    fen: analysisEngine.fen(),
    move: null,
    score: initialScore,
    winChance: initialWinChance,
    classification: null,
    accuracy: 100,
    bestMove: null,
    lines: initialLines,
    explanation: 'Starting Position'
  });

  const moveHistorySans = [];
  let whiteCpLossSum = 0;
  let blackCpLossSum = 0;

  for (let i = 0; i < history.length; i++) {
    const move = history[i];
    const isWhite = i % 2 === 0;

    // Snapshot board state before move
    const fenBefore = analysisEngine.fen();
    const chessBefore = new Chess(fenBefore);

    let bestMove = null;
    let bestScore = 0;
    let playedScore = 0;
    let currentLines = [];

    const playedUci = `${move.from}${move.to}${move.promotion || ''}`;

    // 1. Query Lichess Cloud Evaluation API & Public Stockfish API
    let onlineEval = null;
    try {
      onlineEval = await evaluatePositionOnline(fenBefore, isWhite, 12);
    } catch (e) {}

    if (onlineEval) {
      bestScore = onlineEval.whiteCp;
      currentLines = onlineEval.lines || [];
      const bUci = onlineEval.bestMoveUci;

      if (bUci) {
        const bFrom = bUci.slice(0, 2);
        const bTo = bUci.slice(2, 4);
        const bPromo = bUci.length > 4 ? bUci[4] : undefined;
        const legals = chessBefore.moves({ verbose: true });
        const matched = legals.find(m => m.from === bFrom && m.to === bTo && (!bPromo || m.promotion === bPromo));
        if (matched) {
          bestMove = matched;
        } else {
          bestMove = { san: onlineEval.bestMoveSan || bUci, from: bFrom, to: bTo };
        }
      }

      if (bUci && playedUci === bUci) {
        playedScore = bestScore;
      } else {
        // Query evaluation after played move
        const tempChess = new Chess(fenBefore);
        tempChess.move(move);
        if (tempChess.isGameOver()) {
          if (tempChess.isCheckmate()) {
            playedScore = isWhite ? 10000 : -10000;
          } else {
            playedScore = 0;
          }
        } else {
          try {
            const nextOnline = await evaluatePositionOnline(tempChess.fen(), !isWhite, 12);
            if (nextOnline) {
              playedScore = nextOnline.whiteCp;
            } else {
              playedScore = evaluatePosition(tempChess);
            }
          } catch (e) {
            playedScore = evaluatePosition(tempChess);
          }
        }
      }
    }

    // 2. Fallback to Minimax Evaluator if online API returned null
    if (!bestMove) {
      const searchResult = findBestMove(chessBefore, 2);
      bestMove = searchResult.bestMove;
      bestScore = searchResult.bestScore;
      currentLines = searchResult.lines || [];

      if (bestMove && move.san === bestMove.san) {
        playedScore = bestScore;
      } else {
        playedScore = evaluateMovePlayed(chessBefore, move, 2);
      }
    }

    // Execute the actual move played in the game
    const executed = analysisEngine.move(move);
    moveHistorySans.push(executed.san);

    // Calculate win chances from current player's perspective
    const bestWinChance = isWhite ? centipawnsToWinChance(bestScore) : (100 - centipawnsToWinChance(bestScore));
    const playedWinChance = isWhite ? centipawnsToWinChance(playedScore) : (100 - centipawnsToWinChance(playedScore));
    const winLoss = Math.max(0, bestWinChance - playedWinChance);

    // Centipawn loss (Lichess metric)
    const cpLoss = Math.max(0, isWhite ? (bestScore - playedScore) : (playedScore - bestScore));
    if (isWhite) {
      whiteCpLossSum += Math.min(500, cpLoss);
    } else {
      blackCpLossSum += Math.min(500, cpLoss);
    }

    // Classify move
    const { classification, explanation } = classifyMove({
      movePlayed: executed,
      bestMove,
      winChanceBest: bestWinChance,
      winChancePlayed: playedWinChance,
      scoreBest: bestScore,
      scorePlayed: playedScore,
      cpLoss,
      isWhite,
      plyIndex: i + 1,
      chessBefore,
      moveHistorySans
    });

    // Book moves and best moves get 100% accuracy
    const moveAccuracy = classification === Classification.BOOK ? 100 : calculateMoveAccuracy(winLoss, bestWinChance);

    // Position score from White's perspective
    const currentScore = playedScore;
    const currentWinChance = centipawnsToWinChance(currentScore);

    analyzedPositions.push({
      ply: i + 1,
      moveNumber: Math.floor(i / 2) + 1,
      isWhite,
      san: executed.san,
      uci: `${executed.from}${executed.to}${executed.promotion || ''}`,
      from: executed.from,
      to: executed.to,
      fen: analysisEngine.fen(),
      score: currentScore,
      winChance: currentWinChance,
      classification,
      accuracy: moveAccuracy,
      cpLoss: Math.round(cpLoss),
      bestMove: bestMove ? { san: bestMove.san, from: bestMove.from, to: bestMove.to } : null,
      lines: currentLines,
      explanation
    });

    if (onProgress) {
      onProgress({
        current: i + 1,
        total: history.length,
        percentage: Math.round(((i + 1) / history.length) * 100)
      });
      if (i % 3 === 0) {
        await new Promise(r => setTimeout(r, 0));
      }
    }
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
    positions: analyzedPositions,
    totalPlies: history.length
  };
}
