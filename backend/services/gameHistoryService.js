import { createHash } from 'node:crypto';
import { Chess } from 'chess.js';
import GameHistory from '../models/GameHistory.js';

export const MAX_TEMPORARY_GAMES = 10;

function getGameTimestamp(game) {
  const timestamp = Number(game.timestamp);
  if (Number.isFinite(timestamp) && timestamp > 0) return timestamp;
  const parsedDate = Date.parse(String(game.game?.date || '').replace(/\./g, '-'));
  return Number.isFinite(parsedDate) ? parsedDate / 1000 : 0;
}

export function selectRecentGames(games, limit = MAX_TEMPORARY_GAMES) {
  const uniqueGames = new Map();
  games.forEach((game, index) => {
    if (game?.fingerprint) uniqueGames.set(game.fingerprint, { game, index });
  });

  return [...uniqueGames.values()]
    .sort((left, right) => getGameTimestamp(right.game) - getGameTimestamp(left.game) || right.index - left.index)
    .slice(0, Math.min(MAX_TEMPORARY_GAMES, Math.max(0, limit)))
    .map(({ game }) => game);
}

export function cleanPgnText(rawText) {
  if (!rawText) return '';
  return rawText
    .replace(/^\uFEFF/, '') // Strip UTF-8 BOM
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');
}

/**
 * Splits a full PGN text stream into individual game strings safely
 */
export function splitPgnGames(pgnText) {
  const text = cleanPgnText(pgnText);
  if (!text.trim()) return [];

  const lines = text.split('\n');
  const games = [];
  let currentLines = [];
  let inHeader = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const isTag = trimmed.startsWith('[');

    // If tag encountered after move/content section, game boundary detected
    if (isTag && !inHeader && currentLines.some((l) => l.trim().length > 0)) {
      const fullGame = currentLines.join('\n').trim();
      if (fullGame.length > 0) {
        games.push(fullGame);
        currentLines = [];
      }
    }

    if (isTag) {
      inHeader = true;
    } else if (trimmed.length > 0) {
      inHeader = false;
    }

    currentLines.push(line);
  }

  if (currentLines.length > 0) {
    const fullGame = currentLines.join('\n').trim();
    if (fullGame.length > 0) {
      games.push(fullGame);
    }
  }

  return games;
}

/**
 * Computes a deterministic fingerprint for a game to prevent duplicate imports
 */
export function computeGameFingerprint(pgn, headers = {}, movesString = '') {
  // If game has a unique Chess.com Link or URL, use it
  const link = headers.Link || headers.link || headers.SiteUrl || headers.siteurl;
  if (link && typeof link === 'string') {
    const match = link.match(/chess\.com\/(?:game\/live|live\/game)\/(\d+)/i);
    if (match) return `chesscom:${match[1]}`;
  }

  // Fallback to normalized moves + players + date hash
  const normWhite = (headers.White || headers.white || 'white').trim().toLowerCase();
  const normBlack = (headers.Black || headers.black || 'black').trim().toLowerCase();
  const normDate = (headers.Date || headers.date || headers.UTCDate || '').trim().replace(/[.?/]/g, '-');
  const normMoves = (movesString || '').trim().replace(/\s+/g, ' ');

  const hashInput = `${normWhite}|${normBlack}|${normDate}|${normMoves}`;
  return `pgn:${createHash('sha256').update(hashInput).digest('hex').slice(0, 32)}`;
}

/**
 * Parses and validates an individual PGN string, extracting standard metadata
 */
export function parsePgnGame(pgnText, defaultSource = 'paste') {
  if (!pgnText || typeof pgnText !== 'string' || !pgnText.trim()) {
    throw new Error('PGN text is empty or invalid.');
  }

  const cleaned = cleanPgnText(pgnText).trim();
  const chess = new Chess();
  try {
    chess.loadPgn(cleaned);
  } catch (err) {
    throw new Error(`Invalid PGN notation: ${err.message}`);
  }

  const moves = chess.history();
  if (moves.length === 0) {
    throw new Error('PGN does not contain any legal moves.');
  }

  const headers = chess.header();
  const movesString = moves.join(' ');

  const white = (headers.White || 'White').trim();
  const black = (headers.Black || 'Black').trim();
  const whiteElo = Number.isInteger(parseInt(headers.WhiteElo, 10)) ? parseInt(headers.WhiteElo, 10) : null;
  const blackElo = Number.isInteger(parseInt(headers.BlackElo, 10)) ? parseInt(headers.BlackElo, 10) : null;
  const result = headers.Result || '*';
  const date = headers.Date || headers.UTCDate || '';
  const timeControl = headers.TimeControl || '';
  const opening = headers.Opening || headers.Variation || '';
  const eco = headers.ECO || '';

  const externalId = headers.Link || headers.link || null;
  const fingerprint = computeGameFingerprint(cleaned, headers, movesString);

  let source = defaultSource;
  if (headers.Site?.includes('Chess.com') || externalId?.includes('chess.com')) {
    source = 'chess.com';
  }

  return {
    pgn: cleaned,
    fingerprint,
    externalId,
    source,
    game: {
      white,
      black,
      whiteElo,
      blackElo,
      result,
      date,
      timeControl,
      opening,
      eco
    }
  };
}

/**
 * Fetches all available monthly archive URLs for a Chess.com player
 */
export async function fetchChessComArchives(username) {
  if (!username || typeof username !== 'string' || !username.trim()) {
    throw new Error('Chess.com username is required.');
  }
  const cleanUsername = username.trim().toLowerCase();
  const url = `https://api.chess.com/pub/player/${encodeURIComponent(cleanUsername)}/games/archives`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'ChessWizards/1.0 (contact: support@chesswizards.app)',
      Accept: 'application/json'
    }
  }).catch((err) => {
    throw new Error(`Failed to connect to Chess.com: ${err.message}`);
  });

  if (response.status === 404) {
    throw new Error(`Chess.com user "${username}" was not found.`);
  }

  if (response.status === 429) {
    throw new Error('Chess.com API rate limit reached. Please wait a few seconds and try again.');
  }

  if (!response.ok) {
    throw new Error(`Chess.com API responded with status ${response.status}.`);
  }

  const data = await response.json();
  const archives = Array.isArray(data.archives) ? data.archives : [];
  return { username: cleanUsername, archives };
}

/**
 * Fetches games from a specific Chess.com monthly archive URL and parses them
 */
export async function fetchChessComMonthlyGames(archiveUrl) {
  if (!archiveUrl || typeof archiveUrl !== 'string') {
    throw new Error('Chess.com archive URL is required.');
  }

  const response = await fetch(archiveUrl, {
    headers: {
      'User-Agent': 'ChessWizards/1.0 (contact: support@chesswizards.app)',
      Accept: 'application/json'
    }
  }).catch((err) => {
    throw new Error(`Failed to fetch Chess.com archive: ${err.message}`);
  });

  if (response.status === 429) {
    throw new Error('Chess.com rate limit reached. Please retry shortly.');
  }

  if (!response.ok) {
    throw new Error(`Chess.com archive request failed with status ${response.status}.`);
  }

  const data = await response.json();
  const gamesList = Array.isArray(data.games) ? data.games : [];
  const parsedGames = [];

  for (const rawGame of gamesList) {
    // Only import standard chess games that have PGN
    if (!rawGame.pgn || typeof rawGame.pgn !== 'string') continue;
    try {
      const parsed = parsePgnGame(rawGame.pgn, 'chess.com');
      // If Chess.com URL is available, ensure externalId is set
      if (rawGame.url) {
        parsed.externalId = rawGame.url;
        const match = rawGame.url.match(/chess\.com\/(?:game\/live|live\/game)\/(\d+)/i);
        if (match) parsed.fingerprint = `chesscom:${match[1]}`;
      }
      if (Number.isFinite(rawGame.end_time)) parsed.timestamp = rawGame.end_time;
      parsedGames.push(parsed);
    } catch {
      // Skip malformed individual games gracefully
    }
  }

  return parsedGames;
}

/**
 * Batch saves games into GameHistory for a user, gracefully skipping duplicates
 */
export async function saveGamesForUser(userId, parsedGames, sourceOverride = null) {
  if (!userId) throw new Error('User ID is required.');
  if (!Array.isArray(parsedGames) || parsedGames.length === 0) {
    return { total: 0, imported: 0, duplicates: 0, skipped: 0, games: [] };
  }

  // Find existing fingerprints for this user to avoid duplicates
  const fingerprints = parsedGames.map((g) => g.fingerprint);
  const existingDocs = await GameHistory.find({
    userId,
    fingerprint: { $in: fingerprints }
  }).select('fingerprint');

  const existingSet = new Set(existingDocs.map((d) => d.fingerprint));

  const toInsert = [];
  let duplicates = 0;

  for (const item of parsedGames) {
    if (existingSet.has(item.fingerprint)) {
      duplicates++;
      continue;
    }
    existingSet.add(item.fingerprint);
    toInsert.push({
      userId,
      source: sourceOverride || item.source || 'paste',
      externalId: item.externalId || null,
      fingerprint: item.fingerprint,
      game: item.game,
      pgn: item.pgn,
      accuracy: null
    });
  }

  let imported = 0;
  let insertedDocs = [];
  if (toInsert.length > 0) {
    insertedDocs = await GameHistory.insertMany(toInsert, { ordered: false });
    imported = insertedDocs.length;
  }

  return {
    total: parsedGames.length,
    imported,
    duplicates,
    skipped: parsedGames.length - (imported + duplicates),
    games: insertedDocs
  };
}
