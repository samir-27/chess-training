import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import Analysis from '../models/Analysis.js';
import Variation from '../models/Variation.js';
import { generateMoveCommentary } from '../services/commentary.js';
import { MAX_VARIATIONS, validatePgn, validateReport, validateResumeState, validateVariation } from '../services/validation.js';

const router = Router();

function asyncRoute(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

function serializeAnalysis(analysis) {
  return {
    id: String(analysis._id),
    title: analysis.title,
    sourcePgn: analysis.sourcePgn,
    headers: analysis.headers,
    report: analysis.report,
    commentary: analysis.commentary || [],
    selectedPly: analysis.selectedPly,
    schemaVersion: analysis.schemaVersion,
    createdAt: analysis.createdAt,
    updatedAt: analysis.updatedAt
  };
}

router.post('/', asyncRoute(async (req, res) => {
  const { pgn, title, report = null, selectedPly = 0 } = req.body || {};
  const { moves, headers } = validatePgn(pgn);
  if (!Number.isInteger(selectedPly) || selectedPly < 0 || selectedPly > moves.length) {
    return res.status(400).json({ error: 'Selected ply is outside the game.' });
  }
  const initialFen = headers.SetUp === '1' && headers.FEN ? headers.FEN : undefined;
  const safeReport = validateReport(report, moves, initialFen);
  const analysis = await Analysis.create({
    sessionId: req.anonymousSession._id,
    title: typeof title === 'string' && title.trim() ? title.trim().slice(0, 160) : 'Untitled analysis',
    sourcePgn: pgn,
    headers,
    report: safeReport,
    selectedPly
  });
  res.status(201).json({ analysis: serializeAnalysis(analysis) });
}));

router.get('/', asyncRoute(async (req, res) => {
  const analyses = await Analysis.find({ sessionId: req.anonymousSession._id })
    .sort({ updatedAt: -1 })
    .limit(100)
    .select('title headers selectedPly schemaVersion createdAt updatedAt');
  res.json({
    analyses: analyses.map((analysis) => ({
      id: String(analysis._id),
      title: analysis.title,
      headers: analysis.headers,
      selectedPly: analysis.selectedPly,
      schemaVersion: analysis.schemaVersion,
      createdAt: analysis.createdAt,
      updatedAt: analysis.updatedAt
    }))
  });
}));

router.get('/:analysisId', asyncRoute(async (req, res) => {
  const analysis = await Analysis.findOne({
    _id: req.params.analysisId,
    sessionId: req.anonymousSession._id
  });
  if (!analysis) return res.status(404).json({ error: 'Analysis not found.' });
  const variations = await Variation.find({
    analysisId: analysis._id,
    sessionId: req.anonymousSession._id
  }).sort({ updatedAt: -1 }).limit(MAX_VARIATIONS);
  res.json({
    analysis: serializeAnalysis(analysis),
    variations: variations.map((variation) => ({
      branchId: variation.branchId,
      rootFen: variation.rootFen,
      originalPly: variation.originalPly,
      moves: variation.moves,
      cursor: variation.cursor,
      updatedAt: variation.updatedAt
    }))
  });
}));

router.post('/:analysisId/commentary', asyncRoute(async (req, res) => {
  const analysis = await Analysis.findOne({
    _id: req.params.analysisId,
    sessionId: req.anonymousSession._id
  });
  if (!analysis) return res.status(404).json({ error: 'Analysis not found.' });
  if (!analysis.report) return res.status(409).json({ error: 'The analysis report is not available for commentary.' });
  const { candidates, commentary } = await generateMoveCommentary(analysis.report, {
    existing: analysis.commentary || []
  });
  if (commentary.length) {
    const updatedByKey = new Map((analysis.commentary || []).map((item) => [item.cacheKey, item]));
    commentary.forEach((item) => updatedByKey.set(item.cacheKey, item));
    analysis.commentary = [...updatedByKey.values()];
    await analysis.save();
  }
  res.json({ candidates: candidates.length, commentary });
}));

router.patch('/:analysisId', asyncRoute(async (req, res) => {
  const { selectedPly, currentFen } = req.body || {};
  validateResumeState({ selectedPly, currentFen });
  const analysis = await Analysis.findOneAndUpdate(
    { _id: req.params.analysisId, sessionId: req.anonymousSession._id },
    { $set: { selectedPly } },
    { new: true, runValidators: true }
  );
  if (!analysis) return res.status(404).json({ error: 'Analysis not found.' });
  res.json({ analysis: serializeAnalysis(analysis) });
}));

router.delete('/:analysisId', asyncRoute(async (req, res) => {
  const analysis = await Analysis.findOneAndDelete({
    _id: req.params.analysisId,
    sessionId: req.anonymousSession._id
  });
  if (!analysis) return res.status(404).json({ error: 'Analysis not found.' });
  await Variation.deleteMany({ analysisId: analysis._id, sessionId: req.anonymousSession._id });
  res.status(204).end();
}));

router.get('/:analysisId/variations', asyncRoute(async (req, res) => {
  const analysisExists = await Analysis.exists({
    _id: req.params.analysisId,
    sessionId: req.anonymousSession._id
  });
  if (!analysisExists) return res.status(404).json({ error: 'Analysis not found.' });
  const variations = await Variation.find({
    analysisId: req.params.analysisId,
    sessionId: req.anonymousSession._id
  }).sort({ updatedAt: -1 }).limit(MAX_VARIATIONS);
  res.json({
    variations: variations.map((variation) => ({
      branchId: variation.branchId,
      rootFen: variation.rootFen,
      originalPly: variation.originalPly,
      moves: variation.moves,
      cursor: variation.cursor
    }))
  });
}));

router.post('/:analysisId/variations', asyncRoute(async (req, res) => {
  const { branchId = randomUUID(), rootFen, originalPly, moves, cursor } = req.body || {};
  if (typeof branchId !== 'string' || branchId.length > 80) {
    return res.status(400).json({ error: 'Variation branch identifier is invalid.' });
  }
  validateVariation({ rootFen, originalPly, moves, cursor });
  const analysis = await Analysis.findOne({
    _id: req.params.analysisId,
    sessionId: req.anonymousSession._id
  });
  if (!analysis) return res.status(404).json({ error: 'Analysis not found.' });
  if (analysis.report?.positions) {
    const positions = analysis.report.positions;
    const originalMoves = positions.slice(1, originalPly + 1).map((position) => position.uci);
    if (
      rootFen !== positions[0]?.fen ||
      originalMoves.length !== originalPly ||
      originalMoves.some((uci, index) => moves[index] !== uci)
    ) {
      return res.status(400).json({ error: 'Variation does not match its original game position.' });
    }
  }
  const existingCount = await Variation.countDocuments({
    analysisId: analysis._id,
    sessionId: req.anonymousSession._id
  });
  const existing = await Variation.findOne({
    analysisId: analysis._id,
    sessionId: req.anonymousSession._id,
    branchId
  });
  if (!existing && existingCount >= MAX_VARIATIONS) {
    return res.status(409).json({ error: 'This analysis already has the maximum number of saved variations.' });
  }
  const variation = await Variation.findOneAndUpdate(
    { analysisId: analysis._id, sessionId: req.anonymousSession._id, branchId },
    { $set: { rootFen, originalPly, moves, cursor } },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );
  res.status(existing ? 200 : 201).json({
    variation: {
      branchId: variation.branchId,
      rootFen: variation.rootFen,
      originalPly: variation.originalPly,
      moves: variation.moves,
      cursor: variation.cursor
    }
  });
}));

export default router;
