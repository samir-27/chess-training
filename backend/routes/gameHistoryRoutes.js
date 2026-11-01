import { Router } from 'express';
import mongoose from 'mongoose';
import GameHistory from '../models/GameHistory.js';
import {
  splitPgnGames,
  parsePgnGame,
  fetchChessComArchives,
  fetchChessComMonthlyGames,
  fetchChessComRecentGames,
  saveGamesForUser
} from '../services/gameHistoryService.js';

const router = Router();

function asyncRoute(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

function getUserId(req) {
  return req.ownerId;
}

/**
 * Fetch 10 recent games for any Chess.com username (stateless, direct from Chess.com API)
 */
router.get('/chesscom/recent', asyncRoute(async (req, res) => {
  const { username } = req.query;
  if (typeof username !== 'string' || !username.trim()) {
    return res.status(400).json({ error: 'Chess.com username is required.' });
  }

  const result = await fetchChessComRecentGames(username.trim(), 10);
  res.json(result);
}));

/**
 * List saved games for the current user
 */
router.get('/', asyncRoute(async (req, res) => {
  const userId = getUserId(req);
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
  const skip = (page - 1) * limit;

  const { search, result, dateFrom, dateTo, sort = 'newest', source } = req.query;
  const query = { userId };

  if (typeof search === 'string' && search.trim()) {
    const term = search.trim();
    const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    query.$or = [{ 'game.white': regex }, { 'game.black': regex }];
  }

  if (typeof result === 'string' && result.trim() && result !== 'all') {
    if (result === 'white' || result === '1-0') query['game.result'] = '1-0';
    else if (result === 'black' || result === '0-1') query['game.result'] = '0-1';
    else if (result === 'draw' || result === '1/2-1/2') query['game.result'] = '1/2-1/2';
  }

  if (typeof source === 'string' && ['upload', 'paste', 'chess.com'].includes(source)) {
    query.source = source;
  }

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
 * Retrieve a single game by ID
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
 * Import games from raw PGN text
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
 * Update analysis accuracy on a game history entry
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

export default router;
