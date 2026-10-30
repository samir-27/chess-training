import { createHash } from 'node:crypto';
import process from 'node:process';
import { Buffer } from 'node:buffer';
import { createCommentaryFallback, selectCommentaryCandidates } from '../../frontend/src/services/moveCommentary.js';

const PROMPT_VERSION = 'move-commentary-v1';
const MAX_CACHE_SIZE = 2000;
const cache = new Map();
const MAX_RESPONSE_BYTES = 24_000;

function cacheKey(candidate, model) {
  return createHash('sha256')
    .update(`${PROMPT_VERSION}\n${model}\n${JSON.stringify(candidate)}`)
    .digest('hex');
}

function parseGeminiCommentary(text, candidates) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('Gemini returned malformed commentary JSON.');
  }
  if (!parsed || !Array.isArray(parsed.commentary)) {
    throw new Error('Gemini commentary response has an invalid schema.');
  }

  const allowed = new Map(candidates.map((candidate) => [candidate.id, candidate]));
  const seen = new Set();
  return parsed.commentary.flatMap((entry) => {
    if (!entry || typeof entry.id !== 'string' || typeof entry.text !== 'string' || seen.has(entry.id)) {
      throw new Error('Gemini commentary response contains an invalid entry.');
    }
    const candidate = allowed.get(entry.id);
    const text = entry.text.trim();
    if (!candidate || !text || text.length > 180 || /[\r\n]/.test(text)) {
      throw new Error('Gemini commentary response contains an unsupported explanation.');
    }
    seen.add(entry.id);
    return [{
      id: candidate.id,
      ply: candidate.ply,
      cacheKey: cacheKey(candidate, process.env.GEMINI_MODEL),
      text
    }];
  });
}

async function requestGemini(candidates, model, apiKey) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      signal: AbortSignal.timeout(25_000),
      body: JSON.stringify({
        system_instruction: {
          parts: [{
            text: `You are a friendly chess teacher for beginner and intermediate players. Explain what the actually played move did, in one concise sentence of at most 180 characters. Use only supplied engine evidence and verified findings; do not invent tactics, material losses, threats, moves, scores, or principal variations. If the reason is unclear, omit that entry. Be respectful, specific, varied, and avoid unexplained jargon. Return JSON only in the shape {"commentary":[{"id":"exact supplied id","text":"one sentence"}]}.`
          }]
        },
        contents: [{
          role: 'user',
          parts: [{
            text: JSON.stringify({
              promptVersion: PROMPT_VERSION,
              instruction: 'Return commentary only for the supplied move IDs. Do not modify IDs or repeat engine facts as if independently verified.',
              moves: candidates
            })
          }]
        }],
        generationConfig: {
          temperature: 0.25,
          responseMimeType: 'application/json'
        }
      })
    }
  );
  if (!response.ok) {
    if (response.status === 429) {
      const error = new Error('Gemini rate limit or quota reached.');
      error.status = 429;
      throw error;
    }
    const error = new Error(`Gemini request failed (${response.status}).`);
    error.status = 502;
    throw error;
  }
  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text)
    .filter((part) => typeof part === 'string')
    .join('')
    .trim();
  if (!text || Buffer.byteLength(text, 'utf8') > MAX_RESPONSE_BYTES) {
    throw new Error('Gemini returned an empty or oversized commentary response.');
  }
  return text;
}

export async function generateMoveCommentary(report, { existing = [] } = {}) {
  const candidates = selectCommentaryCandidates(report);
  if (!candidates.length) return { candidates: [], commentary: [] };
  const model = process.env.GEMINI_MODEL;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!model || !apiKey) {
    const error = new Error('Automatic AI commentary is not configured on the server.');
    error.status = 503;
    throw error;
  }

  const existingByKey = new Map(existing.map((item) => [item.cacheKey, item]));
  const commentary = [];
  const pending = [];
  for (const candidate of candidates) {
    const key = cacheKey(candidate, model);
    const saved = existingByKey.get(key) || cache.get(key);
    if (saved) commentary.push({ id: candidate.id, ply: candidate.ply, cacheKey: key, text: saved.text });
    else pending.push(candidate);
  }
  if (!pending.length) return { candidates, commentary };

  let responseText;
  try {
    responseText = await requestGemini(
      pending,
      model,
      apiKey
    );
  } catch (error) {
    if (error?.name === 'TimeoutError' || error?.name === 'AbortError') {
      error.status = 504;
      error.message = 'Gemini commentary request timed out.';
    }
    throw error;
  }

  const generated = parseGeminiCommentary(responseText, pending);
  for (const item of generated) {
    if (cache.size >= MAX_CACHE_SIZE) cache.delete(cache.keys().next().value);
    cache.set(item.cacheKey, item);
  }
  commentary.push(...generated);
  commentary.sort((left, right) => left.ply - right.ply);
  return { candidates, commentary };
}

export { createCommentaryFallback };
