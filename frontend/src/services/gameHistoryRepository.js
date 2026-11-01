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
 * Fetch paginated game history with search, filters, and sort options
 */
export async function listGameHistory({
  page = 1,
  limit = 20,
  search = '',
  result = 'all',
  dateFrom = '',
  dateTo = '',
  sort = 'newest',
  source = 'all'
} = {}) {
  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('limit', String(limit));
  if (search) params.set('search', search);
  if (result && result !== 'all') params.set('result', result);
  if (dateFrom) params.set('dateFrom', dateFrom);
  if (dateTo) params.set('dateTo', dateTo);
  if (sort) params.set('sort', sort);
  if (source && source !== 'all') params.set('source', source);

  return request(`/history?${params.toString()}`);
}

/**
 * Fetch summary statistics for the user's game history
 */
export async function getGameHistoryStats() {
  return request('/history/stats');
}

/**
 * Retrieve a single game by ID (including original PGN)
 */
export async function getGameById(id) {
  if (!id) throw new GameHistoryApiError('Game ID is required.');
  if (!/^[a-f\d]{24}$/i.test(id)) {
    const temporaryGame = (await listTemporaryGames()).find((game) => game.id === id);
    if (temporaryGame) return temporaryGame;
    throw new GameHistoryApiError('Temporary game is not available in this session.', 404, 'game_not_found');
  }
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
 * Discover monthly archives for a Chess.com player
 */
export async function getChessComArchives(username) {
  if (!username || typeof username !== 'string' || !username.trim()) {
    throw new GameHistoryApiError('Username is required.');
  }

  const params = new URLSearchParams({ username: username.trim() });
  return request(`/history/chesscom/archives?${params.toString()}`);
}

/**
 * Import games from a single Chess.com monthly archive URL
 */
export async function importChessComArchive(archiveUrl) {
  if (!archiveUrl) throw new GameHistoryApiError('Archive URL is required.');
  return request('/history/chesscom/archive', {
    method: 'POST',
    body: JSON.stringify({ archiveUrl })
  });
}

/**
 * Batch import all/recent archives for a Chess.com player
 */
export async function importChessComBatch(username, limitMonths = 12) {
  if (!username) throw new GameHistoryApiError('Username is required.');
  return request('/history/import/chesscom', {
    method: 'POST',
    body: JSON.stringify({ username: username.trim(), limitMonths })
  });
}

export async function importRecentChessComGames(username) {
  if (!username || typeof username !== 'string' || !username.trim()) {
    throw new GameHistoryApiError('Username is required.');
  }
  return request('/history/import/chesscom', {
    method: 'POST',
    body: JSON.stringify({ username: username.trim() })
  });
}

export async function listTemporaryGames() {
  const data = await request('/history/temporary');
  return data.games || [];
}

/**
 * Update analysis accuracy on a game record (only saves White & Black accuracy numbers)
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

/**
 * Bulk delete multiple games from history
 */
export async function bulkDeleteGames(gameIds) {
  if (!Array.isArray(gameIds) || gameIds.length === 0) {
    throw new GameHistoryApiError('Array of game IDs is required.');
  }

  return request('/history/bulk-delete', {
    method: 'POST',
    body: JSON.stringify({ ids: gameIds })
  });
}
