import { createHash } from 'node:crypto';
import { Chess } from 'chess.js';
import GameHistory from '../models/GameHistory.js';

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
  const link = headers.Link || headers.link || headers.SiteUrl || headers.siteurl;
  if (link && typeof link === 'string') {
    const match = link.match(/chess\.com\/(?:game\/live|live\/game)\/(\d+)/i);
    if (match) return `chesscom:${match[1]}`;
  }

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
    if (!rawGame.pgn || typeof rawGame.pgn !== 'string') continue;
    try {
      const parsed = parsePgnGame(rawGame.pgn, 'chess.com');
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
 * Fetches games for a Chess.com player across archives, supporting custom limits and archive selection
 */
export async function fetchChessComRecentGames(username, limit = 20, specificArchive = null) {
  if (!username || typeof username !== 'string' || !username.trim()) {
    throw new Error('Chess.com username is required.');
  }

  const { archives } = await fetchChessComArchives(username.trim());
  if (archives.length === 0) {
    return { username: username.trim(), games: [], archives: [] };
  }

  const cleanUser = username.trim().toLowerCase();

  // Format available archive list with friendly labels (e.g. "October 2026")
  const archiveList = archives.map((url) => {
    const parts = url.split('/');
    const year = parts[parts.length - 2];
    const month = parts[parts.length - 1];
    const dateObj = new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, 1));
    const label = dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
    return { url, year, month, label };
  }).reverse();

  const targetArchives = specificArchive
    ? [specificArchive]
    : archiveList.map((a) => a.url);

  const rawGames = [];

  for (const archiveUrl of targetArchives) {
    try {
      const response = await fetch(archiveUrl, {
        headers: {
          'User-Agent': 'ChessWizards/1.0 (contact: support@chesswizards.app)',
          Accept: 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.games)) {
          // Newest games in the month first
          rawGames.push(...[...data.games].reverse());
        }
      }
    } catch {
      // Continue next archive if any fails
    }

    if (!specificArchive && rawGames.length >= limit) break;
  }

  const selected = specificArchive ? rawGames : rawGames.slice(0, limit);

  const formatted = selected.map((g, index) => {
    const isWhite = g.white?.username?.toLowerCase() === cleanUser;
    const opponent = isWhite ? g.black : g.white;
    const userSide = isWhite ? g.white : g.black;

    let userResult = 'draw';
    if (userSide?.result === 'win') {
      userResult = 'win';
    } else if (opponent?.result === 'win' || ['checkmated', 'resigned', 'timeout', 'abandoned'].includes(userSide?.result)) {
      userResult = 'loss';
    }

    const dateStr = g.end_time
      ? new Date(g.end_time * 1000).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
      : (g.pgn ? (g.pgn.match(/\[Date "([^"]+)"\]/)?.[1] || '') : '');

    return {
      id: g.url ? g.url.split('/').pop() : `chesscom-${index}-${g.end_time || Date.now()}`,
      url: g.url || '',
      white: {
        username: g.white?.username || 'White',
        rating: g.white?.rating || null
      },
      black: {
        username: g.black?.username || 'Black',
        rating: g.black?.rating || null
      },
      userColor: isWhite ? 'white' : 'black',
      opponent: {
        username: opponent?.username || 'Opponent',
        rating: opponent?.rating || null
      },
      userRating: userSide?.rating || null,
      userResult,
      timeClass: g.time_class || 'blitz',
      timeControl: g.time_control || '',
      date: dateStr,
      pgn: g.pgn || ''
    };
  });

  return {
    username: cleanUser,
    games: formatted,
    archives: archiveList
  };
}

/**
 * Fetches an exact Chess.com game by its live game ID or full URL
 */
export async function fetchChessComGameById(idOrUrl) {
  if (!idOrUrl || typeof idOrUrl !== 'string') {
    throw new Error('Game ID or URL is required.');
  }

  const match = idOrUrl.match(/(\d{6,20})/);
  if (!match) {
    throw new Error('Please enter a valid Chess.com game URL or numeric ID.');
  }
  const gameId = match[1];

  const cbRes = await fetch(`https://www.chess.com/callback/live/game/${gameId}`, {
    headers: { 'User-Agent': 'ChessWizards/1.0 (contact: support@chesswizards.app)' }
  }).catch((err) => {
    throw new Error(`Failed to reach Chess.com: ${err.message}`);
  });

  if (!cbRes.ok) {
    throw new Error(`Game ${gameId} not found on Chess.com (${cbRes.status}).`);
  }

  const cbData = await cbRes.json();
  const d = new Date(cbData.game.endTime * 1000);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const user = cbData.game.pgnHeaders?.White || cbData.players?.white?.username;

  if (!user) {
    throw new Error(`Could not determine player username for game ${gameId}.`);
  }

  const monthRes = await fetch(`https://api.chess.com/pub/player/${encodeURIComponent(user)}/games/${y}/${m}`, {
    headers: { 'User-Agent': 'ChessWizards/1.0 (contact: support@chesswizards.app)' }
  });

  if (!monthRes.ok) {
    throw new Error(`Could not fetch monthly archive for player ${user}.`);
  }

  const monthData = await monthRes.json();
  const found = (monthData.games || []).find((g) => g.url?.includes(gameId));

  if (!found?.pgn) {
    throw new Error(`Could not find PGN for game ${gameId} in archives.`);
  }

  return {
    id: gameId,
    url: found.url || `https://www.chess.com/game/live/${gameId}`,
    pgn: found.pgn,
    white: found.white,
    black: found.black,
    timeClass: found.time_class,
    timeControl: found.time_control
  };
}

/**
 * Saves games into GameHistory for a user, gracefully skipping duplicates
 */
export async function saveGamesForUser(userId, parsedGames, sourceOverride = null) {
  if (!userId) throw new Error('User ID is required.');
  if (!Array.isArray(parsedGames) || parsedGames.length === 0) {
    return { total: 0, imported: 0, duplicates: 0, skipped: 0, games: [] };
  }

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

  let insertedDocs = [];
  if (toInsert.length > 0) {
    insertedDocs = await GameHistory.insertMany(toInsert, { ordered: false });
  }

  return {
    total: parsedGames.length,
    imported: insertedDocs.length,
    duplicates,
    skipped: parsedGames.length - (insertedDocs.length + duplicates),
    games: insertedDocs
  };
}
