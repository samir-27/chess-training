import { Chess } from 'chess.js';
import { Buffer } from 'node:buffer';

export const MAX_PGN_LENGTH = 1_000_000;
export const MAX_MOVES = 20_000;
export const MAX_REPORT_BYTES = 2_500_000;
export const MAX_VARIATIONS = 100;

export function validatePgn(pgn) {
  if (typeof pgn !== 'string' || !pgn.trim()) {
    throw new Error('PGN is required.');
  }
  if (pgn.length > MAX_PGN_LENGTH) throw new Error('PGN exceeds the 1 MB size limit.');

  const chess = new Chess();
  chess.loadPgn(pgn);
  const moves = chess.history({ verbose: true });
  if (moves.length > MAX_MOVES) throw new Error('PGN contains too many moves.');
  return { chess, moves, headers: chess.header() };
}

export function validateFen(fen) {
  if (typeof fen !== 'string' || fen.length > 120) throw new Error('A valid FEN is required.');
  try {
    const chess = new Chess(fen);
    if (chess.fen() !== fen.trim()) throw new Error('Invalid FEN.');
    return chess;
  } catch {
    throw new Error('Invalid FEN.');
  }
}

export function validateReport(report, moves, initialFen) {
  if (report === null || report === undefined) return null;
  if (!report || typeof report !== 'object' || Array.isArray(report)) {
    throw new Error('Report must be a JSON object.');
  }
  if (!Array.isArray(moves) || !Array.isArray(report.positions) || report.positions.length !== moves.length + 1) {
    throw new Error('Report positions do not match the validated PGN move count.');
  }
  if (report.positions.length > MAX_MOVES + 1) throw new Error('Report contains too many positions.');
  const replay = new Chess(initialFen);
  for (const [index, position] of report.positions.entries()) {
    if (!position || typeof position !== 'object' || !Number.isInteger(position.ply) || position.ply !== index) {
      throw new Error('Report contains an invalid position sequence.');
    }
    if (validateFen(position.fen).fen() !== replay.fen()) {
      throw new Error('Report positions do not match the validated PGN line.');
    }
    if (position.score !== null && position.score !== undefined && !Number.isFinite(position.score)) {
      throw new Error('Report contains an invalid evaluation value.');
    }
    if (position.mate !== null && position.mate !== undefined && !Number.isFinite(position.mate)) {
      throw new Error('Report contains an invalid mate value.');
    }
    if (index < moves.length) replay.move(moves[index]);
  }
  if (Buffer.byteLength(JSON.stringify(report), 'utf8') > MAX_REPORT_BYTES) {
    throw new Error('Analysis report exceeds the storage size limit.');
  }

  return report;
}

export function validateVariation({ rootFen, originalPly, moves, cursor }) {
  if (!Array.isArray(moves) || moves.length > MAX_MOVES) {
    throw new Error('Variation move sequence is invalid or too long.');
  }
  if (!Number.isInteger(originalPly) || originalPly < 0 || originalPly > MAX_MOVES) {
    throw new Error('Variation starting ply is invalid.');
  }
  if (!Number.isInteger(cursor) || cursor < 0 || cursor > moves.length) {
    throw new Error('Variation cursor is invalid.');
  }
  const chess = validateFen(rootFen);
  for (const uci of moves) {
    if (typeof uci !== 'string' || !/^[a-h][1-8][a-h][1-8][qrbn]?$/.test(uci)) {
      throw new Error('Variation contains an invalid UCI move.');
    }
    const move = chess.moves({ verbose: true }).find((candidate) =>
      `${candidate.from}${candidate.to}${candidate.promotion || ''}` === uci
    );
    if (!move) throw new Error('Variation contains an illegal move.');
    chess.move({ from: move.from, to: move.to, ...(move.promotion ? { promotion: move.promotion } : {}) });
  }
}

export function validateResumeState({ selectedPly, currentFen }) {
  if (!Number.isInteger(selectedPly) || selectedPly < 0 || selectedPly > MAX_MOVES) {
    throw new Error('Selected ply is invalid.');
  }
  validateFen(currentFen);
}
