import { Router } from 'express';
import mongoose from 'mongoose';
import GameHistory from '../models/GameHistory.js';
import {
  splitPgnGames,
  parsePgnGame,
  fetchChessComArchives,
  fetchChessComMonthlyGames,
  saveGamesForUser,
  selectRecentGames,
  MAX_TEMPORARY_GAMES
} from '../services/gameHistoryService.js';

const router = Router();

function asyncRoute(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

function getUserId(req) {
  return req.ownerId;
}

async function saveTemporaryGames(req, parsedGames, totalFound = parsedGames.length) {
  const existingGames = req.anonymousSession.temporaryGames || [];
  const existingIds = new Set(existingGames.map((game) => game.fingerprint));
  const importedIds = new Set();
  const combinedGames = [...existingGames];
  let duplicates = 0;

  parsedGames.forEach((game) => {
    if (existingIds.has(game.fingerprint)) {
      duplicates++;
      return;
    }
    existingIds.add(game.fingerprint);
    importedIds.add(game.fingerprint);
    combinedGames.push(game);
  });

  const recentGames = selectRecentGames(combinedGames);
  const recentIds = new Set(recentGames.map((game) => game.fingerprint));
  const imported = [...importedIds].filter((fingerprint) => recentIds.has(fingerprint)).length;

  req.anonymousSession.temporaryGames = recentGames;
  await req.anonymousSession.save();

  return {
    totalFound,
    imported,
    duplicates,
    skipped: Math.max(0, totalFound - imported - duplicates),
    games: recentGames.map((game) => ({
      id: game.fingerprint,
      game: game.game,
      source: 'chess.com',
      pgn: game.pgn,
      temporary: true
    }))
  };
}

/**
 * List games for the current user with search, filtering, sorting, and pagination
 */
router.get('/', asyncRoute(async (req, res) => {
  const userId = getUserId(req);
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
  const skip = (page - 1) * limit;

  const { search, result, dateFrom, dateTo, sort = 'newest', source } = req.query;

  const query = { userId };

  // Search by player name
  if (typeof search === 'string' && search.trim()) {
    const term = search.trim();
    const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    query.$or = [{ 'game.white': regex }, { 'game.black': regex }];
  }

  // Filter by result
  if (typeof result === 'string' && result.trim() && result !== 'all') {
    if (result === 'white' || result === '1-0') query['game.result'] = '1-0';
    else if (result === 'black' || result === '0-1') query['game.result'] = '0-1';
    else if (result === 'draw' || result === '1/2-1/2') query['game.result'] = '1/2-1/2';
  }

  // Filter by source
  if (typeof source === 'string' && ['upload', 'paste', 'chess.com'].includes(source)) {
    query.source = source;
  }

  // Filter by date range
  if (dateFrom || dateTo) {
    query['game.date'] = {};
    if (dateFrom) query['game.date'].$gte = String(dateFrom).trim();
    if (dateTo) query['game.date'].$lte = String(dateTo).trim();
  }

  const sortOption = sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };

  const [total, games] = await Promise.all([
    GameHistory.countDocuments(query),
    GameHistory.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .select('-__v')
  ]);

  res.json({
    games: games.map((g) => ({
      id: String(g._id),
      userId: String(g.userId),
      source: g.source,
      externalId: g.externalId,
      fingerprint: g.fingerprint,
      game: g.game,
      pgn: g.pgn,
      accuracy: g.accuracy,
      createdAt: g.createdAt,
      updatedAt: g.updatedAt
    })),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1
    }
  });
}));

/**
 * Summary statistics for the user's game history
 */
router.get('/stats', asyncRoute(async (req, res) => {
  const userId = getUserId(req);

  const total = await GameHistory.countDocuments({ userId });
  const analyzed = await GameHistory.countDocuments({
    userId,
    'accuracy.white': { $ne: null }
  });
  const whiteWins = await GameHistory.countDocuments({ userId, 'game.result': '1-0' });
  const blackWins = await GameHistory.countDocuments({ userId, 'game.result': '0-1' });
  const draws = await GameHistory.countDocuments({ userId, 'game.result': '1/2-1/2' });

  res.json({
    total,
    analyzed,
    whiteWins,
    blackWins,
    draws
  });
}));

router.get('/temporary', asyncRoute(async (req, res) => {
  const games = selectRecentGames(req.anonymousSession.temporaryGames || []);
  res.json({
    games: games.map((game) => ({
      id: game.fingerprint,
      game: game.game,
      source: 'chess.com',
      pgn: game.pgn,
      temporary: true
    }))
  });
}));

/**
 * Retrieve a single game by ID (used to start fresh analysis)
 */
router.get('/:id', asyncRoute(async (req, res) => {
  const userId = getUserId(req);
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid game ID format.' });
  }

  const game = await GameHistory.findOne({ _id: req.params.id, userId });
  if (!game) {
    return res.status(404).json({ error: 'Game not found in history.' });
  }

  res.json({
    game: {
      id: String(game._id),
      userId: String(game.userId),
      source: game.source,
      externalId: game.externalId,
      fingerprint: game.fingerprint,
      game: game.game,
      pgn: game.pgn,
      accuracy: game.accuracy,
      createdAt: game.createdAt,
      updatedAt: game.updatedAt
    }
  });
}));

/**
 * Import games from raw PGN text (uploaded file or pasted text)
 */
router.post('/import/pgn', asyncRoute(async (req, res) => {
  const userId = getUserId(req);
  const { pgn, source = 'paste' } = req.body || {};

  if (typeof pgn !== 'string' || !pgn.trim()) {
    return res.status(400).json({ error: 'PGN content is required.' });
  }

  const validSource = source === 'upload' ? 'upload' : 'paste';
  const gameStrings = splitPgnGames(pgn);

  if (gameStrings.length === 0) {
    return res.status(400).json({ error: 'No valid games found in PGN text.' });
  }

  const parsedGames = [];
  let skipped = 0;

  for (const gameStr of gameStrings) {
    try {
      const parsed = parsePgnGame(gameStr, validSource);
      parsedGames.push(parsed);
    } catch {
      skipped++;
    }
  }

  const result = await saveGamesForUser(userId, parsedGames, validSource);
  result.skipped += skipped;

  res.status(201).json({
    totalFound: gameStrings.length,
    imported: result.imported,
    duplicates: result.duplicates,
    skipped: result.skipped,
    games: result.games.map((g) => ({
      id: String(g._id),
      game: g.game,
      source: g.source,
      accuracy: g.accuracy
    }))
  });
}));

/**
 * Discover monthly archives for a Chess.com username
 */
router.get('/chesscom/archives', asyncRoute(async (req, res) => {
  const { username } = req.query;
  if (typeof username !== 'string' || !username.trim()) {
    return res.status(400).json({ error: 'Chess.com username is required.' });
  }

  const archivesData = await fetchChessComArchives(username.trim());
  res.json(archivesData);
}));

/**
 * Fetch and import games from a single Chess.com monthly archive URL
 */
router.post('/chesscom/archive', asyncRoute(async (req, res) => {
  const { archiveUrl } = req.body || {};

  if (typeof archiveUrl !== 'string' || !archiveUrl.trim()) {
    return res.status(400).json({ error: 'archiveUrl is required.' });
  }

  const parsedGames = await fetchChessComMonthlyGames(archiveUrl.trim());
  const result = await saveTemporaryGames(req, parsedGames);

  res.status(201).json({
    totalFound: parsedGames.length,
    imported: result.imported,
    duplicates: result.duplicates,
    skipped: result.skipped,
    games: result.games
  });
}));

/**
 * Batch import all or recent archives for a Chess.com username
 */
router.post('/import/chesscom', asyncRoute(async (req, res) => {
  const { username } = req.body || {};

  if (typeof username !== 'string' || !username.trim()) {
    return res.status(400).json({ error: 'Chess.com username is required.' });
  }

  const { archives } = await fetchChessComArchives(username.trim());
  if (archives.length === 0) {
    return res.json({ totalFound: 0, imported: 0, duplicates: 0, skipped: 0 });
  }

  const recentArchives = [...archives].reverse();
  const parsedGames = [];
  for (const [index, archiveUrl] of recentArchives.entries()) {
    parsedGames.push(...await fetchChessComMonthlyGames(archiveUrl));
    if (selectRecentGames(parsedGames).length >= MAX_TEMPORARY_GAMES) break;
    if (index < recentArchives.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
  }

  const result = await saveTemporaryGames(req, parsedGames);
  res.json(result);
}));

/**
 * Update analysis accuracy on a game history entry (only saves White & Black accuracy scores)
 */
router.patch('/:id/accuracy', asyncRoute(async (req, res) => {
  const userId = getUserId(req);
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid game ID.' });
  }

  const { accuracy } = req.body || {};
  if (!accuracy || typeof accuracy !== 'object') {
    return res.status(400).json({ error: 'Accuracy object with white and black scores is required.' });
  }

  const white = typeof accuracy.white === 'number' ? Math.max(0, Math.min(100, Math.round(accuracy.white * 10) / 10)) : null;
  const black = typeof accuracy.black === 'number' ? Math.max(0, Math.min(100, Math.round(accuracy.black * 10) / 10)) : null;

  const game = await GameHistory.findOneAndUpdate(
    { _id: req.params.id, userId },
    { $set: { accuracy: { white, black } } },
    { returnDocument: 'after' }
  );

  if (!game) {
    return res.status(404).json({ error: 'Game not found in history.' });
  }

  res.json({
    success: true,
    id: String(game._id),
    accuracy: game.accuracy
  });
}));

/**
 * Delete a single game from history
 */
router.delete('/:id', asyncRoute(async (req, res) => {
  const userId = getUserId(req);
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid game ID.' });
  }

  const result = await GameHistory.deleteOne({ _id: req.params.id, userId });
  if (result.deletedCount === 0) {
    return res.status(404).json({ error: 'Game not found.' });
  }

  res.status(204).end();
}));

/**
 * Bulk delete multiple games from history
 */
router.post('/bulk-delete', asyncRoute(async (req, res) => {
  const userId = getUserId(req);
  const { ids } = req.body || {};

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: 'Array of game IDs is required.' });
  }

  const validIds = ids.filter((id) => mongoose.Types.ObjectId.isValid(id));
  const result = await GameHistory.deleteMany({
    _id: { $in: validIds },
    userId
  });

  res.json({
    deletedCount: result.deletedCount
  });
}));

export default router;
