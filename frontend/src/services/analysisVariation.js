import { Chess } from 'chess.js';

function uciToMove(uci) {
  if (typeof uci !== 'string' || !/^[a-h][1-8][a-h][1-8][qrbn]?$/.test(uci)) {
    throw new Error(`Invalid UCI move: ${uci}`);
  }

  return {
    from: uci.slice(0, 2),
    to: uci.slice(2, 4),
    ...(uci[4] ? { promotion: uci[4] } : {})
  };
}

function replayMoves(rootFen, moves, count = moves.length) {
  const chess = new Chess(rootFen);
  const played = [];

  for (const uci of moves.slice(0, count)) {
    const move = chess.move(uciToMove(uci));
    if (!move) throw new Error(`Illegal move ${uci} in analysis history.`);
    played.push(move);
  }

  return { chess, played };
}

export function createVariationAtPosition(positions, ply = 0) {
  if (!Array.isArray(positions) || positions.length === 0 || !positions[0]?.fen) {
    throw new Error('The original game has no starting position.');
  }

  const selectedPly = Math.max(0, Math.min(Number(ply) || 0, positions.length - 1));
  const originalMoves = positions.slice(1, selectedPly + 1).map((position) => position.uci);
  replayMoves(positions[0].fen, originalMoves);

  return {
    rootFen: positions[0].fen,
    originalPly: selectedPly,
    originalMoves,
    moves: originalMoves,
    cursor: originalMoves.length
  };
}

export function getVariationPosition(variation) {
  return replayMoves(variation.rootFen, variation.moves, variation.cursor).chess;
}

export function getVariationMoveList(variation) {
  const chess = new Chess(variation.rootFen);
  return variation.moves.map((uci) => {
    const color = chess.turn();
    const moveNumber = Number(chess.fen().split(' ')[5]);
    const move = chess.move(uciToMove(uci));
    if (!move) throw new Error(`Illegal move ${uci} in analysis history.`);
    return { uci, san: move.san, color, moveNumber };
  });
}

export function playVariationMove(variation, moveInput) {
  const chess = getVariationPosition(variation);
  const isLegal = chess.moves({ verbose: true }).some((move) =>
    move.from === moveInput.from &&
    move.to === moveInput.to &&
    (move.promotion || undefined) === (moveInput.promotion || undefined)
  );
  if (!isLegal) return null;

  const move = chess.move(moveInput);

  const uci = `${move.from}${move.to}${move.promotion || ''}`;
  const moves = [...variation.moves.slice(0, variation.cursor), uci];
  return { ...variation, moves, cursor: moves.length };
}

export function createVariationWithLine(variation, uciMoves) {
  if (!Array.isArray(uciMoves) || !uciMoves.length) return variation;
  const moves = variation.moves.slice(0, variation.cursor);
  const chess = replayMoves(variation.rootFen, moves).chess;
  for (const uci of uciMoves) {
    let moveInput;
    try {
      moveInput = uciToMove(uci);
    } catch {
      return variation;
    }
    const legalMove = chess.moves({ verbose: true }).find((move) =>
      move.from === moveInput.from &&
      move.to === moveInput.to &&
      (move.promotion || undefined) === (moveInput.promotion || undefined)
    );
    if (!legalMove) return variation;
    chess.move(moveInput);
    moves.push(uci);
  }
  return { ...variation, moves, cursor: variation.cursor };
}

export function setVariationCursor(variation, cursor) {
  const nextCursor = Number(cursor);
  if (!Number.isInteger(nextCursor) || nextCursor < 0 || nextCursor > variation.moves.length) {
    return variation;
  }
  return { ...variation, cursor: nextCursor };
}

export function resetVariationToStart(variation) {
  return {
    ...variation,
    originalPly: 0,
    originalMoves: [],
    moves: [],
    cursor: 0
  };
}

export function getVariationOriginalPrefixLength(variation) {
  let index = 0;
  while (
    index < variation.moves.length &&
    index < variation.originalMoves.length &&
    variation.moves[index] === variation.originalMoves[index]
  ) {
    index++;
  }
  return index;
}
