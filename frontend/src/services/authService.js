const API_BASE = import.meta.env?.VITE_API_BASE_URL || '/api';
const SESSION_TOKEN_KEY = 'chess_analysis_v2_session';
const LOCAL_ANALYSES_KEY = 'chess_analysis_v2_records';
const LAST_ANALYSIS_KEY = 'chess_analysis_v2_last_id';

export class AuthApiError extends Error {
  constructor(message, status = null) {
    super(message);
    this.name = 'AuthApiError';
    this.status = status;
  }
}

function storedToken() {
  return globalThis.localStorage?.getItem(SESSION_TOKEN_KEY) || null;
}

function clearCachedAnalyses() {
  globalThis.localStorage?.removeItem(LOCAL_ANALYSES_KEY);
  globalThis.localStorage?.removeItem(LAST_ANALYSIS_KEY);
}

async function ensureSessionToken() {
  const token = storedToken();
  if (token) return token;

  const response = await fetch(`${API_BASE}/sessions`, { method: 'POST' }).catch(() => {
    throw new AuthApiError('The backend server is unavailable.');
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || typeof data?.token !== 'string') {
    throw new AuthApiError(data?.error || 'Unable to start a session.', response.status);
  }
  globalThis.localStorage?.setItem(SESSION_TOKEN_KEY, data.token);
  return data.token;
}

async function postCredentials(path, credentials, includeCurrentSession, clearLocalCache) {
  const token = includeCurrentSession ? await ensureSessionToken() : null;
  const response = await fetch(`${API_BASE}/auth/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(credentials)
  }).catch(() => {
    throw new AuthApiError('The backend server is unavailable.');
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || typeof data?.token !== 'string' || !data.user) {
    throw new AuthApiError(data?.error || 'Authentication failed.', response.status);
  }

  globalThis.localStorage?.setItem(SESSION_TOKEN_KEY, data.token);
  if (clearLocalCache) clearCachedAnalyses();
  return data.user;
}

export function registerAccount({ email, password, chessComUsername = '' }) {
  return postCredentials('register', { email, password, chessComUsername }, true, false);
}

export function loginAccount({ email, password }) {
  return postCredentials('login', { email, password }, true, true);
}

export async function getCurrentUser() {
  const token = storedToken();
  if (!token) return null;

  const response = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  }).catch(() => {
    throw new AuthApiError('Unable to verify the current session.');
  });
  const data = await response.json().catch(() => null);
  if (response.status === 401) {
    globalThis.localStorage?.removeItem(SESSION_TOKEN_KEY);
    clearCachedAnalyses();
    return null;
  }
  if (!response.ok) {
    throw new AuthApiError(data?.error || 'Unable to verify the current session.', response.status);
  }
  return data?.user || null;
}

export async function logoutAccount() {
  const token = storedToken();
  if (token) {
    const response = await fetch(`${API_BASE}/auth/session`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    }).catch(() => {
      throw new AuthApiError('Unable to reach the server. You are still signed in.');
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new AuthApiError(data?.error || 'Unable to sign out.', response.status);
    }
  }
  globalThis.localStorage?.removeItem(SESSION_TOKEN_KEY);
  clearCachedAnalyses();
}
