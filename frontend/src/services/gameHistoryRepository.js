const API_BASE = import.meta.env?.VITE_API_BASE_URL || '/api';
const SESSION_TOKEN_KEY = 'chess_analysis_v2_session';

export class GameHistoryApiError extends Error {
  constructor(message, status = null, code = 'request_failed') {
    super(message);
    this.name = 'GameHistoryApiError';
    this.status = status;
    this.code = code;
  }
}

async function ensureSessionToken() {
  const token = localStorage.getItem(SESSION_TOKEN_KEY);
  if (token) return token;

  const response = await fetch(`${API_BASE}/sessions`, { method: 'POST' }).catch(() => {
    throw new GameHistoryApiError('The backend server is unavailable.', null, 'backend_unavailable');
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new GameHistoryApiError(
      data?.error || `Session creation failed (${response.status}).`,
      response.status
    );
  }

  const data = await response.json();
  if (typeof data?.token !== 'string') {
    throw new GameHistoryApiError('Invalid session response from server.', null, 'invalid_session');
  }

  localStorage.setItem(SESSION_TOKEN_KEY, data.token);
  return data.token;
}

async function request(path, options = {}) {
  const token = await ensureSessionToken();
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      Authorization: `Bearer ${token}`,
      ...options.headers
    }
  }).catch((err) => {
    throw new GameHistoryApiError(`Network request failed: ${err.message}`, null, 'network_error');
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new GameHistoryApiError(
      data?.error || `Request failed with status ${response.status}`,
      response.status
    );
  }

  return response.status === 204 ? null : response.json();
}

/**
 * Helper to format raw Chess.com game into our standard display object
 */
function formatChessComGame(g, cleanUser, index) {
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
    white: { username: g.white?.username || 'White', rating: g.white?.rating || null },
    black: { username: g.black?.username || 'Black', rating: g.black?.rating || null },
    userColor: isWhite ? 'white' : 'black',
    opponent: { username: opponent?.username || 'Opponent', rating: opponent?.rating || null },
    userRating: userSide?.rating || null,
    userResult,
    timeClass: g.time_class || 'blitz',
    timeControl: g.time_control || '',
    date: dateStr,
    pgn: g.pgn || ''
  };
}

/**
 * Fetch games for any Chess.com username (supports limit, archive selection, and robust multi-archive scanning)
 */
export async function getChessComRecentGames(username, { limit = 20, archive = null } = {}) {
  if (!username || typeof username !== 'string' || !username.trim()) {
    throw new GameHistoryApiError('Chess.com username is required.');
  }

  const cleanUser = username.trim().toLowerCase();

  // Try public backend API endpoint first
  try {
    const params = new URLSearchParams();
    if (limit) params.set('limit', String(limit));
    if (archive) params.set('archive', String(archive));
    const res = await fetch(`${API_BASE}/chesscom/user/${encodeURIComponent(cleanUser)}/games?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      return {
        username: data.username || cleanUser,
        games: data.games || [],
        archives: data.archives || []
      };
    }
  } catch {
    // Fall back to direct browser fetch
  }

  // Direct client-side browser fetch fallback
  try {
    const archivesRes = await fetch(`https://api.chess.com/pub/player/${encodeURIComponent(cleanUser)}/games/archives`);
    if (archivesRes.status === 404) {
      throw new GameHistoryApiError(`Chess.com player "${username}" was not found.`, 404);
    }
    if (!archivesRes.ok) {
      throw new GameHistoryApiError(`Chess.com API error (${archivesRes.status}).`);
    }

    const archivesData = await archivesRes.json();
    const archives = Array.isArray(archivesData.archives) ? archivesData.archives : [];
    if (archives.length === 0) {
      return { username: cleanUser, games: [], archives: [] };
    }

    const archiveList = archives.map((url) => {
      const parts = url.split('/');
      const year = parts[parts.length - 2];
      const month = parts[parts.length - 1];
      const dateObj = new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, 1));
      const label = dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
      return { url, year, month, label };
    }).reverse();

    const targetArchives = archive
      ? [archive]
      : archiveList.map((a) => a.url);

    const rawGames = [];

    for (const archiveUrl of targetArchives) {
      try {
        const monthRes = await fetch(archiveUrl);
        if (monthRes.ok) {
          const monthData = await monthRes.json();
          if (Array.isArray(monthData.games)) {
            // Newest games in the month first
            rawGames.push(...[...monthData.games].reverse());
          }
        }
      } catch {
        // Continue
      }
      if (!archive && rawGames.length >= limit) break;
    }

    const selected = archive ? rawGames : rawGames.slice(0, limit);
    const games = selected.map((g, idx) => formatChessComGame(g, cleanUser, idx));

    return {
      username: cleanUser,
      games,
      archives: archiveList
    };
  } catch (err) {
    if (err instanceof GameHistoryApiError) throw err;
    throw new GameHistoryApiError(`Could not fetch games from Chess.com: ${err.message}`);
  }
}

/**
 * Fetch an exact Chess.com game by its live game URL or numeric ID
 */
export async function getChessComGameById(idOrUrl) {
  if (!idOrUrl || typeof idOrUrl !== 'string' || !idOrUrl.trim()) {
    throw new GameHistoryApiError('Game URL or ID is required.');
  }

  // Try backend proxy first
  try {
    const params = new URLSearchParams({ url: idOrUrl.trim() });
    const res = await fetch(`${API_BASE}/chesscom/game?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      if (data?.pgn) return data;
    }
  } catch {
    // Fall back to direct fetch
  }

  // Client-side direct resolution
  const match = idOrUrl.match(/(\d{6,20})/);
  if (!match) {
    throw new GameHistoryApiError('Please enter a valid Chess.com game URL or numeric ID.');
  }
  const gameId = match[1];

  const cbRes = await fetch(`https://www.chess.com/callback/live/game/${gameId}`).catch((err) => {
    throw new GameHistoryApiError(`Failed to reach Chess.com: ${err.message}`);
  });

  if (!cbRes.ok) {
    throw new GameHistoryApiError(`Game ${gameId} not found on Chess.com (${cbRes.status}).`);
  }

  const cbData = await cbRes.json();
  const d = new Date(cbData.game.endTime * 1000);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const user = cbData.game.pgnHeaders?.White || cbData.players?.white?.username;

  if (!user) {
    throw new GameHistoryApiError(`Could not determine player username for game ${gameId}.`);
  }

  const monthRes = await fetch(`https://api.chess.com/pub/player/${encodeURIComponent(user)}/games/${y}/${m}`);
  if (!monthRes.ok) {
    throw new GameHistoryApiError(`Could not fetch monthly archive for player ${user}.`);
  }

  const monthData = await monthRes.json();
  const found = (monthData.games || []).find((g) => g.url?.includes(gameId));

  if (!found?.pgn) {
    throw new GameHistoryApiError(`Could not retrieve PGN for game ${gameId}.`);
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
 * Retrieve a single game by ID (including original PGN)
 */
export async function getGameById(id) {
  if (!id) throw new GameHistoryApiError('Game ID is required.');
  const data = await request(`/history/${id}`);
  return data.game;
}

/**
 * Import games from raw PGN string (upload or paste)
 */
export async function importPgnGames(pgnText, source = 'paste') {
  if (!pgnText || typeof pgnText !== 'string' || !pgnText.trim()) {
    throw new GameHistoryApiError('PGN text cannot be empty.');
  }

  return request('/history/import/pgn', {
    method: 'POST',
    body: JSON.stringify({ pgn: pgnText, source })
  });
}

/**
 * Update analysis accuracy on a game record
 */
export async function updateGameAccuracy(gameId, accuracy) {
  if (!gameId) throw new GameHistoryApiError('Game ID is required.');
  return request(`/history/${gameId}/accuracy`, {
    method: 'PATCH',
    body: JSON.stringify({ accuracy })
  });
}

/**
 * Delete a single game from history
 */
export async function deleteGame(gameId) {
  if (!gameId) throw new GameHistoryApiError('Game ID is required.');
  return request(`/history/${gameId}`, {
    method: 'DELETE'
  });
}
