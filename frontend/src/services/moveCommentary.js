export const COMMENTARY_RULES = Object.freeze({
  maxCandidates: 18,
  blunderCpLoss: 180,
  mistakeCpLoss: 90,
  inaccuracyCpLoss: 65,
  significantWinChanceLoss: 6
});

export function selectCommentaryCandidates(report) {
  const positions = report?.positions;
  if (!Array.isArray(positions)) return [];

  const candidates = positions.flatMap((position, index) => {
    if (index === 0 || !position?.uci || !position?.classification) return [];
    const cpLoss = Number(position.cpLossRaw ?? position.cpLoss ?? 0);
    const winLoss = Number(position.winLoss ?? 0);
    const severe = position.classification === 'blunder' &&
      cpLoss >= COMMENTARY_RULES.blunderCpLoss;
    const mistake = position.classification === 'mistake' &&
      cpLoss >= COMMENTARY_RULES.mistakeCpLoss;
    const inaccuracy = position.classification === 'inaccuracy' &&
      cpLoss >= COMMENTARY_RULES.inaccuracyCpLoss &&
      winLoss >= COMMENTARY_RULES.significantWinChanceLoss;
    const missedTactic = position.missedTactic === true;
    const verifiedHangingPiece = Array.isArray(position.hangingPieces) && position.hangingPieces.length > 0;
    const strongTacticalMove = ['brilliant', 'great'].includes(position.classification);
    const criticalDefense = position.inCheckBefore === true &&
      position.bestMove?.uci === position.uci;
    if (!(severe || mistake || inaccuracy || missedTactic || verifiedHangingPiece || strongTacticalMove || criticalDefense)) {
      return [];
    }

    const before = positions[index - 1];
    if (!before?.fen || !position.bestMove?.san) return [];
    const priority = severe ? 100 : mistake ? 80 : missedTactic ? 75 :
      verifiedHangingPiece ? 70 : inaccuracy ? 60 : criticalDefense ? 45 : 35;
    return [{
      id: `${position.ply}:${position.uci}`,
      ply: position.ply,
      moveNumber: position.moveNumber,
      side: position.isWhite ? 'White' : 'Black',
      classification: position.classification,
      fenBefore: before.fen,
      playedMove: { san: position.san, uci: position.uci },
      bestMove: position.bestMove,
      evaluationBefore: { whiteCentipawns: position.scoreBefore, mate: position.mateBefore ?? null },
      evaluationAfter: { whiteCentipawns: position.scoreAfter ?? position.score, mate: position.mate ?? null },
      cpLoss: position.cpLoss,
      winChanceLoss: position.winLoss,
      lines: (before.lines || []).slice(0, 3).map((line) => ({
        rank: line.rank || line.id,
        evaluation: line.cp,
        mate: line.mate ?? null,
        moves: (line.continuationSan || []).slice(0, 8)
      })),
      verifiedFindings: {
        missedWinningMate: missedTactic,
        hangingPieces: (position.hangingPieces || []).map(({ square, piece }) => ({ square, piece })),
        defendedCheck: criticalDefense
      },
      engine: {
        depth: position.depth ?? before.depth,
        nodes: position.nodes ?? before.nodes,
        name: report.engine?.name,
        version: report.engine?.version
      },
      priority
    }];
  });

  return candidates
    .sort((left, right) => right.priority - left.priority || left.ply - right.ply)
    .slice(0, COMMENTARY_RULES.maxCandidates)
    .sort((left, right) => left.ply - right.ply)
    .map((candidate) => {
      const result = { ...candidate };
      delete result.priority;
      return result;
    });
}

export function createCommentaryFallback(candidate) {
  if (candidate.verifiedFindings.hangingPieces.length) {
    const pieces = candidate.verifiedFindings.hangingPieces
      .map(({ piece }) => ({ q: 'queen', r: 'rook', b: 'bishop', n: 'knight', p: 'pawn' }[piece] || 'piece'));
    return `This move leaves an attacked ${[...new Set(pieces)].join(' and ')} undefended.`;
  }
  if (candidate.verifiedFindings.missedWinningMate) {
    return `A forced mate was available, but this move lets the opponent escape it.`;
  }
  if (Number.isFinite(candidate.cpLoss) && candidate.cpLoss >= COMMENTARY_RULES.mistakeCpLoss) {
    return `This move gives up about ${(candidate.cpLoss / 100).toFixed(1)} pawns of engine evaluation; ${candidate.bestMove.san} was stronger.`;
  }
  if (candidate.verifiedFindings.defendedCheck) {
    return `This accurate move meets the check with the engine's top choice.`;
  }
  return '';
}
