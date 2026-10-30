const LOCAL_ANALYSES_KEY = 'chess_analysis_v2_records';
const SESSION_TOKEN_KEY = 'chess_analysis_v2_session';
const LAST_ANALYSIS_KEY = 'chess_analysis_v2_last_id';
const API_BASE = import.meta.env?.VITE_API_BASE_URL || '/api';

export class AnalysisApiError extends Error {
  constructor(message, status = null, code = 'request_failed') {
    super(message);
    this.name = 'AnalysisApiError';
    this.status = status;
    this.code = code;
  }
}

function readLocalAnalyses() {
  try {
    const stored = JSON.parse(localStorage.getItem(LOCAL_ANALYSES_KEY) || '{}');
    return stored && typeof stored === 'object' && !Array.isArray(stored) ? stored : {};
  } catch {
    return {};
  }
}

function writeLocalAnalysis(record) {
  const records = readLocalAnalyses();
  records[record.id] = { ...record, updatedAt: new Date().toISOString() };
  localStorage.setItem(LOCAL_ANALYSES_KEY, JSON.stringify(records));
  localStorage.setItem(LAST_ANALYSIS_KEY, record.id);
  return records[record.id];
}

function localId() {
  return globalThis.crypto?.randomUUID?.() || `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function classifyStatus(status) {
  if (status === 401) return 'authentication_required';
  if (status === 404) return 'analysis_not_found';
  if (status === 502) return 'backend_unavailable';
  if (status === 503) return 'database_unavailable';
  if (status === 429) return 'rate_limited';
  return 'analysis_request_failed';
}

async function ensureSessionToken() {
  const token = localStorage.getItem(SESSION_TOKEN_KEY);
  if (token) return token;
  const response = await fetch(`${API_BASE}/sessions`, { method: 'POST' }).catch(() => {
    throw new AnalysisApiError('The analysis backend is unavailable.', null, 'backend_unavailable');
  });
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new AnalysisApiError(
      data?.error || `Session creation failed (${response.status}).`,
      response.status,
      classifyStatus(response.status)
    );
  }
  const data = await response.json();
  if (typeof data?.token !== 'string') {
    throw new AnalysisApiError('The server did not create an anonymous session.', null, 'invalid_session_response');
  }
  localStorage.setItem(SESSION_TOKEN_KEY, data.token);
  return data.token;
}

async function request(path, { token, ...options } = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  }).catch(() => {
    throw new AnalysisApiError('The analysis backend is unavailable.', null, 'backend_unavailable');
  });
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new AnalysisApiError(
      data?.error || `Analysis request failed (${response.status}).`,
      response.status,
      classifyStatus(response.status)
    );
  }
  return response.status === 204 ? null : response.json();
}

function localSummaries() {
  return Object.values(readLocalAnalyses())
    .sort((left, right) => String(right.updatedAt).localeCompare(String(left.updatedAt)))
    .map(({ id, title, headers, selectedPly, updatedAt }) => ({
      id,
      title,
      headers,
      selectedPly,
      updatedAt,
      localOnly: true
    }));
}

export function getLastAnalysisId() {
  try {
    return localStorage.getItem(LAST_ANALYSIS_KEY) || null;
  } catch {
    return null;
  }
}

export async function listAnalyses() {
  const local = localSummaries();
  try {
    const token = await ensureSessionToken();
    const data = await request('/analyses', { token });
    const merged = new Map(data.analyses.map((analysis) => [analysis.id, { ...analysis, localOnly: false }]));
    local.forEach((analysis) => {
      if (!merged.has(analysis.id)) merged.set(analysis.id, analysis);
    });
    return [...merged.values()].sort((left, right) => String(right.updatedAt).localeCompare(String(left.updatedAt)));
  } catch {
    return local;
  }
}

export async function createAnalysis({ title, pgn, report, selectedPly = 0 }) {
  const localRecord = {
    id: localId(),
    title,
    sourcePgn: pgn,
    headers: report.headers,
    report,
    selectedPly,
    variation: null,
    commentary: [],
    localOnly: true
  };
  writeLocalAnalysis(localRecord);

  try {
    const token = await ensureSessionToken();
    const data = await request('/analyses', {
      token,
      method: 'POST',
      body: JSON.stringify({ title, pgn, report, selectedPly })
    });
    const saved = { ...data.analysis, variation: null, localOnly: false };
    const records = readLocalAnalyses();
    delete records[localRecord.id];
    localStorage.setItem(LOCAL_ANALYSES_KEY, JSON.stringify(records));
    writeLocalAnalysis(saved);
    return { analysis: saved, persistenceMessage: '' };
  } catch (error) {
    return {
      analysis: localRecord,
      persistenceMessage: `${error.message} This analysis is saved on this device only.`
    };
  }
}

export async function loadAnalysis(analysisId) {
  const cached = readLocalAnalyses()[analysisId];
  if (!/^[a-f\d]{24}$/i.test(analysisId) && cached) return cached;
  try {
    const token = await ensureSessionToken();
    const data = await request(`/analyses/${encodeURIComponent(analysisId)}`, { token });
    const record = {
      ...data.analysis,
      commentary: data.analysis.commentary || cached?.commentary || [],
      variation: data.variations.find((variation) => variation.branchId === 'active') || null,
      localOnly: false
    };
    writeLocalAnalysis(record);
    return record;
  } catch (error) {
    if (cached) return cached;
    throw error;
  }
}

export async function saveAnalysisResume(analysisId, { selectedPly, currentFen, variation }) {
  const record = readLocalAnalyses()[analysisId];
  if (!record) throw new Error('The analysis is not available in local storage.');
  writeLocalAnalysis({ ...record, selectedPly, currentFen, variation });
  if (!/^[a-f\d]{24}$/i.test(analysisId)) {
    return { remote: false, message: 'Resume state saved on this device only.' };
  }

  try {
    const token = await ensureSessionToken();
    await request(`/analyses/${encodeURIComponent(analysisId)}`, {
      token,
      method: 'PATCH',
      body: JSON.stringify({ selectedPly, currentFen })
    });
    if (variation) {
      await request(`/analyses/${encodeURIComponent(analysisId)}/variations`, {
        token,
        method: 'POST',
        body: JSON.stringify({ branchId: 'active', ...variation })
      });
    }
    return { remote: true, message: '' };
  } catch (error) {
    return { remote: false, message: `${error.message} Resume state is saved on this device.` };
  }
}

export function saveLocalCommentary(analysisId, commentary) {
  const record = readLocalAnalyses()[analysisId];
  if (!record) return;
  writeLocalAnalysis({ ...record, commentary: Array.isArray(commentary) ? commentary : [] });
}

export async function generateAnalysisCommentary(analysisId, pgn, report) {
  if (/^[a-f\d]{24}$/i.test(analysisId)) {
    try {
      const token = await ensureSessionToken();
      const data = await request(`/analyses/${encodeURIComponent(analysisId)}/commentary`, {
        token,
        method: 'POST',
        body: JSON.stringify({})
      });
      return data.commentary || [];
    } catch (error) {
      if (error.code !== 'database_unavailable' && error.code !== 'backend_unavailable') throw error;
    }
  }
  const data = await request('/coach/commentary', {
    method: 'POST',
    body: JSON.stringify({ pgn, report })
  });
  return data.commentary || [];
}

export async function deleteAnalysis(analysisId) {
  const records = readLocalAnalyses();
  delete records[analysisId];
  localStorage.setItem(LOCAL_ANALYSES_KEY, JSON.stringify(records));
  if (getLastAnalysisId() === analysisId) {
    const next = localSummaries()[0]?.id || '';
    localStorage.setItem(LAST_ANALYSIS_KEY, next);
  }
  if (!/^[a-f\d]{24}$/i.test(analysisId)) return;
  const token = await ensureSessionToken();
  await request(`/analyses/${encodeURIComponent(analysisId)}`, { token, method: 'DELETE' });
}

export async function getApiHealth() {
  const response = await fetch(`${API_BASE}/health`).catch(() => {
    throw new AnalysisApiError('The analysis backend is unavailable.', null, 'backend_unavailable');
  });
  if (!response.ok) {
    throw new AnalysisApiError(
      `The analysis health check failed (${response.status}).`,
      response.status,
      'backend_unavailable'
    );
  }
  return response.json();
}
