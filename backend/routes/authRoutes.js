import { Router } from 'express';
import Analysis from '../models/Analysis.js';
import GameHistory from '../models/GameHistory.js';
import User from '../models/User.js';
import Variation from '../models/Variation.js';
import { hashPassword, verifyPassword } from '../services/authService.js';
import { createAnonymousSession, deleteSession, findAnonymousSession } from '../services/sessionToken.js';

const router = Router();

function asyncRoute(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

function publicUser(user) {
  return {
    id: String(user._id),
    email: user.email,
    chessComUsername: user.chessComUsername || ''
  };
}

function readBearerToken(req) {
  return req.get('authorization')?.match(/^Bearer\s+([A-Za-z0-9_-]+)$/i)?.[1] || null;
}

function validateCredentials({ email, password }) {
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || email.length > 254) {
    return 'A valid email address is required.';
  }
  if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
    return 'Password must be between 8 and 128 characters.';
  }
  return null;
}

function validateChessComUsername(username) {
  if (username == null || username === '') return '';
  if (typeof username !== 'string' || !/^[a-zA-Z0-9_-]{1,50}$/.test(username.trim())) {
    return null;
  }
  return username.trim().toLowerCase();
}

async function moveSessionDataToAccount(session, user) {
  await Promise.all([
    Analysis.updateMany({ sessionId: session._id }, { $set: { sessionId: user._id } }),
    Variation.updateMany({ sessionId: session._id }, { $set: { sessionId: user._id } }),
    GameHistory.updateMany({ userId: session._id }, { $set: { userId: user._id } })
  ]);
  session.userId = user._id;
  await session.save();
}

router.post('/register', asyncRoute(async (req, res) => {
  const { email, password, chessComUsername = '' } = req.body || {};
  const credentialError = validateCredentials({ email, password });
  if (credentialError) return res.status(400).json({ error: credentialError });

  const chessUsername = validateChessComUsername(chessComUsername);
  if (chessUsername === null) {
    return res.status(400).json({ error: 'Chess.com username may contain letters, numbers, underscores, or hyphens.' });
  }

  const existingToken = readBearerToken(req);
  const existingSession = existingToken ? await findAnonymousSession(existingToken) : null;
  if (existingToken && !existingSession) {
    return res.status(401).json({ error: 'The current session is invalid or expired.' });
  }

  let user;
  try {
    user = await User.create({
      email: email.trim().toLowerCase(),
      passwordHash: await hashPassword(password),
      chessComUsername: chessUsername
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }
    throw error;
  }

  let token;
  if (existingSession && !existingSession.userId) {
    await moveSessionDataToAccount(existingSession, user);
    token = existingToken;
  } else {
    ({ token } = await createAnonymousSession(user._id));
  }

  res.status(201).json({ token, user: publicUser(user) });
}));

router.post('/login', asyncRoute(async (req, res) => {
  const { email, password } = req.body || {};
  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    password.length < 8 ||
    password.length > 128
  ) {
    return res.status(400).json({ error: 'A valid email and password are required.' });
  }

  const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+passwordHash');
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Email or password is incorrect.' });
  }

  const existingToken = readBearerToken(req);
  const existingSession = existingToken ? await findAnonymousSession(existingToken) : null;
  if (existingToken && !existingSession) {
    return res.status(401).json({ error: 'The current session is invalid or expired.' });
  }

  let token;
  if (existingSession && !existingSession.userId) {
    await moveSessionDataToAccount(existingSession, user);
    token = existingToken;
  } else {
    ({ token } = await createAnonymousSession(user._id));
  }
  res.json({ token, user: publicUser(user) });
}));

router.get('/me', asyncRoute(async (req, res) => {
  const token = readBearerToken(req);
  if (!token) return res.json({ user: null });
  const session = await findAnonymousSession(token);
  if (!session) return res.status(401).json({ error: 'Session is invalid or expired.' });
  if (!session.userId) return res.json({ user: null });

  const user = await User.findById(session.userId);
  if (!user) return res.status(401).json({ error: 'Account no longer exists.' });
  res.json({ user: publicUser(user) });
}));

router.delete('/session', asyncRoute(async (req, res) => {
  const token = readBearerToken(req);
  if (!token) return res.status(401).json({ error: 'A session token is required.' });
  const session = await findAnonymousSession(token);
  if (!session) return res.status(401).json({ error: 'Session is invalid or expired.' });

  await deleteSession(session._id);
  res.status(204).end();
}));

export default router;
