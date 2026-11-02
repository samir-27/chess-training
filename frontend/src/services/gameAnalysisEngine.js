/**
 * Chess Game Analysis Engine
 * Primary analysis uses the bundled local Stockfish UCI engine.
 * Evaluates games move-by-move, classifies each move into Lichess standard categories,
 * generates 2-3 engine continuation lines, ACPL, and accuracy.
 */

import { Chess } from 'chess.js';
import { StockfishEngine, StockfishPool, STOCKFISH_SEARCH } from './stockfishEngine.js';
import { isOpeningBookMove } from './openingBookService.js';

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
 * Normalizes any evaluation (centipawns or mate) to a unified White-perspective score in centipawns.
 * White advantage is positive (+), Black advantage is negative (-).
 * Forced mates are mapped smoothly to the range [9000, 10000] and [-10000, -9000].
 */
export function normalizeEvaluationToWhiteCp(evaluation) {
  if (evaluation === null || evaluation === undefined) return 0;
  if (typeof evaluation === 'number') return evaluation;

  const isMate = evaluation.type === 'mate' || (evaluation.mate !== null && evaluation.mate !== undefined);
  if (isMate) {
    const rawMate = evaluation.type === 'mate' ? evaluation.value : evaluation.mate;
    if (rawMate === 0) {
      if (evaluation.whiteCp !== undefined && evaluation.whiteCp !== null) return evaluation.whiteCp;
      return evaluation.turn === 'w' ? -10000 : 10000;
    }
    if (rawMate > 0) {
      // White has forced mate in `rawMate` moves (shorter mate = higher score)
      return 10000 - Math.min(Math.abs(rawMate), 100) * 10;
    } else {
      // Black has forced mate in |rawMate| moves (shorter mate = lower/more negative score)
      return -10000 + Math.min(Math.abs(rawMate), 100) * 10;
    }
  }

  const cp = evaluation.whiteCp ?? evaluation.value ?? evaluation.score ?? evaluation.cp ?? 0;
  return Math.max(-10000, Math.min(10000, Number(cp)));
}

/**
 * Converts centipawn score to Win Probability Percentage [0, 100] from White's perspective
 * Uses standard logistic curve: 1 / (1 + exp(-0.0035 * cp))
 */
export function centipawnsToWinChance(cp) {
  if (cp === null || cp === undefined) return 50;
  if (cp >= 10000) return 100;
  if (cp <= -10000) return 0;
  const clampedCp = Math.max(-2000, Math.min(2000, Number(cp)));
  return Math.max(0, Math.min(100, 100 / (1 + Math.exp(-0.0035 * clampedCp))));
}

/**
 * Calculates Expected Points [0, 1] for an evaluation from the specified player's perspective.
 * When moveColour is 'w', returns White's expected points [0, 1].
 * When moveColour is 'b', returns Black's expected points (1 - White's expected points) [0, 1].
 */
export function getExpectedPoints(evaluation, options = {}) {
  const centipawnGradient = options.centipawnGradient || 0.0035;
  const moveColour = options.moveColour || 'w';
  const isWhite = moveColour === 'w' || moveColour === 'white';

  const isMate = evaluation?.type === 'mate' || (evaluation?.mate !== null && evaluation?.mate !== undefined);
  if (isMate) {
    const mateVal = evaluation?.type === 'mate' ? evaluation.value : evaluation.mate;
    if (mateVal === 0) {
      // Mate on the board
      const whiteWon = evaluation.whiteCp !== undefined ? evaluation.whiteCp > 0 : evaluation.turn === 'b';
      return (isWhite ? whiteWon : !whiteWon) ? 1.0 : 0.0;
    }
    const whiteWinning = mateVal > 0;
    return (isWhite ? whiteWinning : !whiteWinning) ? 1.0 : 0.0;
  }

  const whiteCp = normalizeEvaluationToWhiteCp(evaluation);
  const clampedCp = Math.max(-2000, Math.min(2000, whiteCp));
  const whiteExp = 1 / (1 + Math.exp(-centipawnGradient * clampedCp));

  return isWhite ? whiteExp : (1 - whiteExp);
}

/**
 * Calculates Expected Points Loss for the moving player [0, 1].
 * Guaranteed strictly symmetrical for White and Black.
 * If the played move maintains or improves expected points, returns 0.
 */
export function getExpectedPointsLoss(previousEvaluation, currentEvaluation, moveColour) {
  const isWhite = moveColour === 'w' || moveColour === 'white';
  const moverCol = isWhite ? 'w' : 'b';

  const prevExp = getExpectedPoints(previousEvaluation, { moveColour: moverCol });
  const currExp = getExpectedPoints(currentEvaluation, { moveColour: moverCol });

  const loss = prevExp - currExp;
  return Math.max(0, Math.min(1, loss));
}

/**
 * Calculates Move Accuracy Score from expected points loss [0, 100].
 * Standard formula: 103.16 * exp(-4 * loss) - 3.17, clamped between 0 and 100.
 */
export function calculateMoveAccuracy(loss = 0) {
  const normalizedLoss = loss > 1 ? loss / 100 : Math.max(0, Number(loss) || 0);
  const acc = 103.16 * Math.exp(-4 * normalizedLoss) - 3.17;
  return Math.max(0, Math.min(100, Math.round(acc * 10) / 10));
}

/**
 * Calculates centipawn loss for ACPL tracking, capped at 1000 centipawns to avoid
 * forced-mate transitions artificially blowing up the game's overall ACPL.
 */
export function calculateCentipawnLoss(scoreBefore, scorePlayed, isWhite, mateBefore = null, matePlayed = null) {
  const normBefore = normalizeEvaluationToWhiteCp({ whiteCp: scoreBefore, mate: mateBefore });
  const normPlayed = normalizeEvaluationToWhiteCp({ whiteCp: scorePlayed, mate: matePlayed });
  const loss = (normBefore - normPlayed) * (isWhite ? 1 : -1);
  return Math.max(0, Math.min(1000, Math.round(loss)));
}

/**
 * Checks piece safety using attackers and defenders (WintrChess pieceSafety.ts)
 */
export function isPieceSafe(board, piece, playedMove = null) {
  const oppColor = piece.color === 'w' ? 'b' : 'w';
  const attackerSquares = board.attackers(piece.square, oppColor);
  const directAttackers = attackerSquares.map((sq) => {
    const p = board.get(sq);
    return { square: sq, type: p?.type, color: oppColor };
  }).filter((p) => Boolean(p.type));

  if (directAttackers.length === 0) return true;

  const defenderSquares = board.attackers(piece.square, piece.color);
  const defenders = defenderSquares.map((sq) => {
    const p = board.get(sq);
    return { square: sq, type: p?.type, color: piece.color };
  }).filter((p) => Boolean(p.type));

  // Favourable exchange (e.g. rook for two minor pieces or equal trade with defenders)
  if (
    playedMove?.captured &&
    piece.type === 'r' &&
    PIECE_VALUES[playedMove.captured] === PIECE_VALUES['n'] &&
    directAttackers.length === 1 &&
    defenders.length > 0 &&
    PIECE_VALUES[directAttackers[0].type] === PIECE_VALUES['n']
  ) {
    return true;
  }

  // A piece with a direct attacker of lower value than itself isn't safe
  const hasLowerValueAttacker = directAttackers.some((att) =>
    (PIECE_VALUES[att.type] || 100) < (PIECE_VALUES[piece.type] || 100)
  );
  if (hasLowerValueAttacker) return false;

  // A piece that does not have more attackers than defenders is safe
  if (directAttackers.length <= defenders.length) {
    return true;
  }

  // A piece defended by any pawn is safe against equal/higher attackers
  if (defenders.some((def) => def.type === 'p')) {
    return true;
  }

  return false;
}

/**
 * Returns list of player's non-pawn pieces left unsafe / sacrificed
 */
export function getUnsafePieces(board, color, playedMove = null) {
  const capturedPieceValue = playedMove?.captured ? (PIECE_VALUES[playedMove.captured] || 0) : 0;
  const unsafe = [];

  for (let r = 1; r <= 8; r++) {
    for (const file of ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']) {
      const square = `${file}${r}`;
      const piece = board.get(square);
      if (
        piece &&
        piece.color === color &&
        piece.type !== 'p' && // Pawns are not considered piece sacrifices
        piece.type !== 'k' && // King cannot be sacrificed
        (PIECE_VALUES[piece.type] || 0) > capturedPieceValue &&
        !isPieceSafe(board, { square, type: piece.type, color }, playedMove)
      ) {
        unsafe.push({ square, type: piece.type, color });
      }
    }
  }

  return unsafe;
}

/**
 * Checks if a piece is trapped (WintrChess pieceTrapped.ts)
 */
export function isPieceTrapped(board, piece) {
  const standingSafe = isPieceSafe(board, piece);
  if (standingSafe) return false;

  const moves = board.moves({ square: piece.square, verbose: true });
  if (moves.length === 0) return true;

  return moves.every((move) => {
    try {
      const escapeBoard = new Chess(board.fen());
      const escapeMove = escapeBoard.move(move);
      if (!escapeMove) return true;
      return !isPieceSafe(escapeBoard, { square: escapeMove.to, type: piece.type, color: piece.color }, escapeMove);
    } catch {
      return true;
    }
  });
}

/**
 * Preliminary check for Critical and Brilliant moves
 */
export function isMoveCriticalCandidate({
  chessBefore,
  moverScore,
  isMoverMate,
  secondMoverScore = null,
  playedMove
}) {
  if (secondMoverScore !== null) {
    if (secondMoverScore >= 700) return false;
  } else if (!isMoverMate && moverScore >= 700) {
    return false;
  }

  // Moves in losing positions cannot be critical
  if (!isMoverMate && moverScore < 0) return false;
  if (isMoverMate && moverScore < 0) return false;

  // Disallow queen promotions as critical moves
  if (playedMove.promotion === 'q') return false;

  // Disallow moves that must be played anyway to escape check
  if (chessBefore.isCheck()) return false;

  return true;
}

/**
 * Brilliant move detector:
 * Identifies genuine material sacrifices that are objectively sound.
 * Requires:
 * 1. Piece sacrifice (minor piece, rook, queen) left attacked / undefended.
 * 2. Objectively sound: top engine choice or virtually zero point loss (<= 0.015).
 * 3. Results in a winning or decisive advantage for the mover (>= +150 cp or forced mate).
 * 4. Rejects blunders, trapped pieces, queen promotions, and escaping to safety.
 */
export function isBrilliantSacrifice({
  chessBefore,
  chessAfter,
  playedMove,
  isWhite,
  moverScore,
  isMoverMate,
  mateScore,
  pointLoss = 0,
  isTopChoice = false,
  secondBestLine = null
}) {
  // Must be top choice or virtually zero expected point loss
  if (!isTopChoice && pointLoss > 0.015) return false;

  // Must maintain a strong advantage or forced checkmate for the mover
  if (!isMoverMate && moverScore < 150) return false;
  if (isMoverMate && mateScore <= 0) return false;

  // Promotions and King moves cannot be brilliant sacrifices
  if (playedMove.promotion) return false;
  if (playedMove.piece === 'k') return false;

  // Cannot be a move played under check
  if (chessBefore.isCheck()) return false;

  const moverColor = isWhite ? 'w' : 'b';

  // Compare unsafe pieces before and after
  const unsafeBefore = getUnsafePieces(chessBefore, moverColor);
  const unsafeAfter = getUnsafePieces(chessAfter, moverColor, playedMove);

  // Must leave at least one non-pawn, non-king piece sacrificed/unsafe
  if (unsafeAfter.length === 0) return false;

  // Moving a piece to safety without check/mate is not a sacrifice
  if (unsafeAfter.length < unsafeBefore.length && !chessAfter.isCheck()) {
    return false;
  }

  // The move must actually offer a piece into sacrifice or uncover a new sacrifice:
  const movedPieceUnsafe = unsafeAfter.some((p) => p.square === playedMove.to);
  const newlyUnsafePieces = unsafeAfter.filter(
    (p) => !unsafeBefore.some((b) => b.square === p.square && b.type === p.type)
  );

  if (!movedPieceUnsafe && newlyUnsafePieces.length === 0) {
    return false;
  }

  // Reject if the moved piece was already trapped before the move
  const trappedBefore = unsafeBefore.filter((p) => isPieceTrapped(chessBefore, p));
  if (trappedBefore.some((p) => p.square === playedMove.from)) {
    return false;
  }

  // Reject if the move captured equal or higher material without leaving another piece unsafe
  if (playedMove.captured) {
    const capturedVal = PIECE_VALUES[playedMove.captured] || 0;
    const movedVal = PIECE_VALUES[playedMove.piece] || 0;
    if (capturedVal >= movedVal) {
      const otherUnsafe = unsafeAfter.filter((p) => p.square !== playedMove.to);
      if (otherUnsafe.length === 0) return false;
    }
  }

  return true;
}

export const considerBrilliantClassification = isBrilliantSacrifice;

/**
 * Great move detector:
 * Identifies "only moves" where all alternatives significantly drop evaluation.
 * Uses MultiPV evaluation gaps (second move point loss >= 0.12 or centipawn gap >= 120).
 * Filters out trivial recaptures, queen promotions, and blowouts (>= 600 cp).
 */
export function isGreatMove({
  chessBefore,
  chessAfter,
  playedMove,
  isWhite,
  moverScore,
  isMoverMate,
  mateScore,
  isTopChoice = false,
  secondBestLine = null,
  plyIndex = 0
}) {
  if (!isTopChoice) return false;
  if (chessAfter.isCheckmate()) return false;
  if (playedMove.promotion === 'q') return false;

  // Blowout positions are not "Great"
  if (!isMoverMate && moverScore >= 600) return false;
  if (isMoverMate && mateScore > 0 && mateScore <= 3) return false;

  // Cannot be a capture of free, undefended material
  if (playedMove.captured) {
    const oppColor = isWhite ? 'b' : 'w';
    const capturedPiece = { square: playedMove.to, type: playedMove.captured, color: oppColor };
    const wasSafe = isPieceSafe(chessBefore, capturedPiece);
    if (!wasSafe) return false;
  }

  // MultiPV gap verification:
  if (secondBestLine) {
    const sCp = secondBestLine.whiteCp ?? secondBestLine.cp ?? 0;
    const sMate = secondBestLine.mate ?? null;
    const moverColor = isWhite ? 'w' : 'b';

    const secondPointLoss = getExpectedPointsLoss(
      { type: isMoverMate ? 'mate' : 'centipawn', value: isMoverMate ? mateScore : moverScore },
      { type: sMate !== null ? 'mate' : 'centipawn', value: sMate !== null ? (sMate * (isWhite ? 1 : -1)) : (isWhite ? sCp : -sCp) },
      moverColor
    );

    const sMoverScore = sMate !== null
      ? (sMate * (isWhite ? 1 : -1) * 10000)
      : (isWhite ? sCp : -sCp);

    const cpGap = moverScore - sMoverScore;

    // Requirement: 2nd best move loses >= 0.12 expected points or >= 120 cp
    if (secondPointLoss >= 0.12 || cpGap >= 120) {
      return true;
    }
    return false;
  }

  // Fallback heuristic if no MultiPV available
  return plyIndex > 6 && moverScore >= -150 && moverScore <= 200 && playedMove.piece !== 'p' && playedMove.piece !== 'k';
}

export const considerCriticalClassification = isGreatMove;

/**
 * Point loss classifier using expected point losses or mate losses.
 * Incorporates Missed Win (MISS) when a decisive winning advantage or forced checkmate is lost.
 */
export function pointLossClassify({
  prevCp,
  currCp,
  prevMate,
  currMate,
  isWhite,
  playedSan,
  bestSan
}) {
  const moverSign = isWhite ? 1 : -1;
  const prevMoverScore = prevMate !== null ? (prevMate * moverSign * 10000) : (prevCp * moverSign);
  const currMoverScore = currMate !== null ? (currMate * moverSign * 10000) : (currCp * moverSign);
  const prevMoverMate = prevMate !== null ? prevMate * moverSign : null;
  const currMoverMate = currMate !== null ? currMate * moverSign : null;

  // 1. Mover had forced mate
  if (prevMoverMate !== null && prevMoverMate > 0) {
    // 1A. Maintained forced mate
    if (currMoverMate !== null && currMoverMate > 0) {
      const mateDelay = currMoverMate - prevMoverMate;
      if (mateDelay <= 0) {
        return { classification: Classification.BEST, explanation: `Best move (${playedSan}). Fastest checkmate path.` };
      } else if (mateDelay <= 2) {
        return { classification: Classification.EXCELLENT, explanation: `Excellent move (${playedSan}). Maintains forced mate in ${currMoverMate}.` };
      } else if (mateDelay <= 6) {
        return { classification: Classification.GOOD, explanation: `Good move (${playedSan}). Retains checkmate sequence in ${currMoverMate}.` };
      } else {
        return { classification: Classification.INACCURACY, explanation: `Inaccuracy (${playedSan}). Delays checkmate to M${currMoverMate}. Best was ${bestSan}.` };
      }
    }

    // 1B. Threw away forced mate
    if (currMoverMate !== null && currMoverMate < 0) {
      return { classification: Classification.BLUNDER, explanation: `Blunder (${playedSan})! Walked into checkmate in ${Math.abs(currMoverMate)}. Best was ${bestSan}.` };
    }
    // Resulted in centipawns: did mover miss the win?
    if (currMoverScore < 200) {
      return { classification: Classification.MISS, explanation: `Missed win (${playedSan}). Overlooked a direct forced checkmate sequence. Best was ${bestSan}.` };
    } else if (currMoverScore < 600) {
      return { classification: Classification.MISTAKE, explanation: `Mistake (${playedSan}). Let forced checkmate slip into an endgame. Best was ${bestSan}.` };
    } else {
      return { classification: Classification.EXCELLENT, explanation: `Excellent move (${playedSan}). Retains decisive advantage (+${(currMoverScore / 100).toFixed(1)}).` };
    }
  }

  // 2. Position was centipawns, now mate
  if (prevMate === null && currMate !== null) {
    if (currMoverMate > 0) {
      return { classification: Classification.BEST, explanation: `Best move (${playedSan})! Finds forced mate in ${currMoverMate}.` };
    } else if (currMoverMate >= -2) {
      return { classification: Classification.BLUNDER, explanation: `Blunder (${playedSan})! Allows checkmate in ${Math.abs(currMoverMate)}. Best was ${bestSan}.` };
    } else if (currMoverMate >= -5) {
      return { classification: Classification.BLUNDER, explanation: `Blunder (${playedSan})! Allows forced checkmate in ${Math.abs(currMoverMate)}. Best was ${bestSan}.` };
    } else {
      return { classification: Classification.MISTAKE, explanation: `Mistake (${playedSan}). Walked into forced checkmate sequence. Best was ${bestSan}.` };
    }
  }

  // 3. Expected point loss calculation (centipawn to centipawn, or opponent had mate)
  const pointLoss = getExpectedPointsLoss(
    { type: prevMate !== null ? 'mate' : 'centipawn', value: prevMate ?? prevCp },
    { type: currMate !== null ? 'mate' : 'centipawn', value: currMate ?? currCp },
    isWhite ? 'w' : 'b'
  );

  // Check for Missed Win: mover had decisive winning advantage (>= +250 cp), but threw it away (< +75 cp)
  if (prevMoverScore >= 250 && currMoverScore < 75 && pointLoss >= 0.15) {
    return {
      classification: Classification.MISS,
      explanation: `Missed win (${playedSan}). Lost winning advantage (+${(prevMoverScore / 100).toFixed(1)} to ${(currMoverScore / 100).toFixed(1)}). Best was ${bestSan}.`
    };
  }

  // Standard Expected Point Loss classification
  if (pointLoss < 0.010) {
    return { classification: Classification.BEST, explanation: `Best move (${playedSan}). Top engine recommendation.` };
  } else if (pointLoss < 0.045) {
    return { classification: Classification.EXCELLENT, explanation: `Excellent move (${playedSan}). Maintains the evaluation without compromise.` };
  } else if (pointLoss < 0.080) {
    return { classification: Classification.GOOD, explanation: `Good move (${playedSan}). Sound and playable continuation.` };
  } else if (pointLoss < 0.150) {
    return { classification: Classification.INACCURACY, explanation: `Inaccuracy (${playedSan}). Cedes some advantage (${(pointLoss * 100).toFixed(1)}% loss). Best was ${bestSan}.` };
  } else if (pointLoss < 0.250) {
    return { classification: Classification.MISTAKE, explanation: `Mistake (${playedSan}). Weakens the position considerably (${(pointLoss * 100).toFixed(1)}% loss). Best was ${bestSan}.` };
  } else {
    return { classification: Classification.BLUNDER, explanation: `Blunder (${playedSan})! Critical mistake shifting the advantage (${(pointLoss * 100).toFixed(1)}% loss). Best was ${bestSan}.` };
  }
}

/**
 * Classifies a move based on chess engine evaluations and objective tactical criteria
 */
export function classifyMove({
  movePlayed,
  bestMove,
  winChanceBest,
  winChancePlayed,
  scoreBest,
  scorePlayed,
  mateBest = null,
  matePlayed = null,
  secondBestLine = null,
  cpLoss = 0,
  isWhite,
  plyIndex,
  chessBefore
}) {
  const playedSan = movePlayed.san;
  const bestSan = bestMove?.san || playedSan;
  const playedUci = `${movePlayed.from}${movePlayed.to}${movePlayed.promotion || ''}`;
  const bestUci = bestMove ? `${bestMove.from}${bestMove.to}${bestMove.promotion || ''}` : null;
  const isTopChoice = playedSan === bestSan || (bestUci && playedUci === bestUci);
  const moverColor = isWhite ? 'w' : 'b';
  const moverSign = isWhite ? 1 : -1;

  // 1. Forced move (if 1 or 0 legal moves)
  if (chessBefore && chessBefore.moves().length <= 1) {
    return {
      classification: Classification.BEST,
      explanation: `Forced move (${playedSan}). The only legal move available.`
    };
  }

  // 2. Theoretical Opening Book Move (first 24 plies)
  if (plyIndex <= 24 && chessBefore) {
    const bookInfo = isOpeningBookMove(chessBefore, movePlayed, plyIndex);
    if (bookInfo) {
      return {
        classification: Classification.BOOK,
        explanation: `Book move (${playedSan}). ${bookInfo.eco ? bookInfo.eco + ' · ' : ''}${bookInfo.name}.`,
        eco: bookInfo.eco,
        openingName: bookInfo.name,
        isBook: true
      };
    }
  }

  // Simulate position after move for tactical / safety checks
  let chessAfter = null;
  if (chessBefore) {
    try {
      chessAfter = new Chess(chessBefore.fen());
      chessAfter.move(movePlayed);
    } catch {}
  }

  // 3. Short-circuit checkmate delivered as Best
  if (chessAfter?.isCheckmate()) {
    return {
      classification: Classification.BEST,
      explanation: `Best move (${playedSan})! Delivers checkmate.`
    };
  }

  const moverScore = scorePlayed * moverSign;
  const isMoverMate = matePlayed !== null;
  const mateScore = isMoverMate ? (matePlayed * moverSign) : null;

  const pointLoss = getExpectedPointsLoss(
    { type: mateBest !== null ? 'mate' : 'centipawn', value: mateBest ?? scoreBest },
    { type: matePlayed !== null ? 'mate' : 'centipawn', value: matePlayed ?? scorePlayed },
    moverColor
  );

  // 4. Brilliant Move Check (genuine sacrifice maintaining advantage)
  if (
    chessAfter &&
    isBrilliantSacrifice({
      chessBefore,
      chessAfter,
      playedMove: movePlayed,
      isWhite,
      moverScore,
      isMoverMate,
      mateScore,
      pointLoss,
      isTopChoice,
      secondBestLine
    })
  ) {
    return {
      classification: Classification.BRILLIANT,
      explanation: `Brilliant sacrifice (${playedSan})! Sacrifices material while maintaining a decisive advantage.`
    };
  }

  // 5. Great Move Check (critical "only move" based on candidate alternatives)
  if (
    isTopChoice &&
    chessAfter &&
    isGreatMove({
      chessBefore,
      chessAfter,
      playedMove: movePlayed,
      isWhite,
      moverScore,
      isMoverMate,
      mateScore,
      isTopChoice,
      secondBestLine,
      plyIndex
    })
  ) {
    return {
      classification: Classification.GREAT,
      explanation: `Great find (${playedSan})! A critical move to maintain the initiative.`
    };
  }

  // 6. Top choice short-circuits to BEST
  if (isTopChoice) {
    return {
      classification: Classification.BEST,
      explanation: `Best move (${playedSan}). Top engine recommendation.`
    };
  }

  // 7. Non-top choices: check for Missed Win or classify by expected point loss
  return pointLossClassify({
    prevCp: scoreBest,
    currCp: scorePlayed,
    prevMate: mateBest,
    currMate: matePlayed,
    isWhite,
    playedSan,
    bestSan
  });
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
    const chessBefore = new Chess(replay.fen());
    const played = replay.move(move);
    const bookInfo = index < 24 ? isOpeningBookMove(chessBefore, played, index + 1) : null;
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
      classification: bookInfo ? Classification.BOOK : null,
      isBook: !!bookInfo,
      eco: bookInfo?.eco || null,
      opening: bookInfo?.name || null
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
  multiPv = STOCKFISH_SEARCH.defaultMultiPv || 2
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
  const poolSize = 1;
  const safeHash = Math.min(32, Math.max(1, Number(hashMb) || 16));
  const engine = typeof Worker === 'function'
    ? new StockfishPool({ depth, threads: 1, hashMb: safeHash, multiPv, size: poolSize })
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
      } else {
        if (engine) {
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
        }
      return result;
    })();

    positionCache.set(fen, promise);
    return promise;
  };

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
      const bestNormCp = normalizeEvaluationToWhiteCp({ whiteCp: bestScore, mate: currentEval.mate });
      const playedNormCp = normalizeEvaluationToWhiteCp({ whiteCp: playedScore, mate: afterEval.mate });
      const bestWinChance = centipawnsToWinChance(bestNormCp * moverSign);
      const playedWinChance = centipawnsToWinChance(playedNormCp * moverSign);
      const winLoss = Math.max(0, bestWinChance - playedWinChance);
      const cpLoss = calculateCentipawnLoss(bestScore, playedScore, isWhite, currentEval.mate, afterEval.mate);
      const missedTactic = currentEval.mate !== null &&
        currentEval.mate * moverSign > 0 &&
        !(afterEval.mate !== null && afterEval.mate * moverSign > 0);

      const secondBestLine = currentEval.lines && currentEval.lines.length > 1 ? currentEval.lines[1] : null;

      const result = classifyMove({
        movePlayed: executed,
        bestMove,
        winChanceBest: bestWinChance,
        winChancePlayed: playedWinChance,
        scoreBest: bestScore,
        scorePlayed: playedScore,
        mateBest: currentEval.mate,
        matePlayed: afterEval.mate,
        secondBestLine,
        cpLoss,
        isWhite,
        plyIndex: i + 1,
        chessBefore
      });
      const { classification } = result;
      const isBookMove = classification === Classification.BOOK;
      const effectiveCpLoss = isBookMove ? 0 : cpLoss;
      const effectiveWinLoss = isBookMove ? 0 : winLoss;

      // Book moves do not penalize player ACPL
      if (!isBookMove) {
        if (isWhite) whiteCpLossSum += effectiveCpLoss;
        else blackCpLossSum += effectiveCpLoss;
      }

      const annotations = [];
      if (!isBookMove && missedTactic) annotations.push('A forced mate was available and is no longer maintained.');
      if (!isBookMove && hangingPieces.length) {
        annotations.push(`Leaves attacked, undefended piece(s) on ${hangingPieces.map((piece) => piece.square).join(', ')}.`);
      }
      const explanation = [result.explanation, ...annotations].join(' ');

      const pointLoss = getExpectedPointsLoss(
        { type: currentEval.mate !== null ? 'mate' : 'centipawn', value: currentEval.mate ?? bestScore },
        { type: afterEval.mate !== null ? 'mate' : 'centipawn', value: afterEval.mate ?? playedScore },
        isWhite ? 'w' : 'b'
      );
      const effectivePointLoss = isBookMove ? 0 : pointLoss;
      const moveAccuracy = isBookMove ? 100 : calculateMoveAccuracy(effectivePointLoss);

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
        isBook: isBookMove,
        eco: result.eco || null,
        opening: result.openingName || null,
        accuracy: moveAccuracy,
        cpLoss: Math.round(effectiveCpLoss),
        cpLossRaw: effectiveCpLoss,
        winLoss: effectiveWinLoss,
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
        critical: !isBookMove && (effectiveCpLoss >= 200 || currentEval.mate !== null || hangingPieces.length > 0),
        missedTactic: !isBookMove && missedTactic,
        hangingPieces: isBookMove ? [] : hangingPieces,
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

  // Calculate Overall Accuracies & ACPL (excluding book moves from ACPL denominator)
  const whiteMoves = analyzedPositions.filter(p => p.ply > 0 && p.isWhite);
  const blackMoves = analyzedPositions.filter(p => p.ply > 0 && !p.isWhite);
  const whiteNonBook = whiteMoves.filter(p => !p.isBook);
  const blackNonBook = blackMoves.filter(p => !p.isBook);

  const whiteAccuracy = whiteMoves.length > 0
    ? Math.round((whiteMoves.reduce((acc, m) => acc + m.accuracy, 0) / whiteMoves.length) * 10) / 10
    : 100;

  const blackAccuracy = blackMoves.length > 0
    ? Math.round((blackMoves.reduce((acc, m) => acc + m.accuracy, 0) / blackMoves.length) * 10) / 10
    : 100;

  const whiteAcpl = whiteNonBook.length > 0 ? Math.round(whiteCpLossSum / whiteNonBook.length) : 0;
  const blackAcpl = blackNonBook.length > 0 ? Math.round(blackCpLossSum / blackNonBook.length) : 0;

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

  // Identify the overall opening reached in the game (from the deepest theoretical book move)
  let gameOpening = null;
  for (let i = analyzedPositions.length - 1; i >= 1; i--) {
    const p = analyzedPositions[i];
    if (p.isBook && p.opening) {
      gameOpening = { eco: p.eco || preview.opening?.eco || null, name: p.opening };
      break;
    }
  }
  if (!gameOpening && preview.opening?.name) {
    gameOpening = preview.opening;
  }

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
    opening: gameOpening,
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
      version: engine?.engineVersion || (typeof Worker === 'function' ? 'Stockfish Lite (WASM)' : 'built-in deterministic minimax'),
      depth: engine ? engine.depth : 2,
      threads: 1,
      hashMb: safeHash,
      multiPv: multiPv
    },
    positions: analyzedPositions,
    totalPlies: history.length
  };
}
