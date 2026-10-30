import { createHash, randomBytes } from 'node:crypto';
import AnonymousSession from '../models/AnonymousSession.js';

const SESSION_TTL_MS = 365 * 24 * 60 * 60 * 1000;

export function hashSessionToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

export async function createAnonymousSession() {
  const token = randomBytes(32).toString('base64url');
  const session = await AnonymousSession.create({
    tokenHash: hashSessionToken(token),
    expiresAt: new Date(Date.now() + SESSION_TTL_MS)
  });
  return { token, session };
}

export async function findAnonymousSession(token) {
  if (typeof token !== 'string' || token.length < 40 || token.length > 100) return null;
  return AnonymousSession.findOne({
    tokenHash: hashSessionToken(token),
    expiresAt: { $gt: new Date() }
  });
}
