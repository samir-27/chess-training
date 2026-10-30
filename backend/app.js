import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import mongoose from 'mongoose';
import analysisRoutes from './routes/analysisRoutes.js';
import coachRoutes from './routes/coachRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import { findAnonymousSession } from './services/sessionToken.js';

const serverDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.dirname(serverDirectory);

function asyncRoute(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

function requireDatabase(_req, res, next) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'MongoDB persistence is unavailable.' });
  }
  return next();
}

function requireSession(req, res, next) {
  const token = req.get('authorization')?.match(/^Bearer ([A-Za-z0-9_-]+)$/)?.[1];
  if (!token) return res.status(401).json({ error: 'An anonymous session token is required.' });

  return asyncRoute(async () => {
    const session = await findAnonymousSession(token);
    if (!session) return res.status(401).json({ error: 'Anonymous session is invalid or expired.' });
    req.anonymousSession = session;
    return next();
  })(req, res, next);
}

export function createApp() {
  const app = express();
  const allowedOrigin = process.env.CORS_ORIGIN;

  app.disable('x-powered-by');
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'wasm-unsafe-eval'"],
        workerSrc: ["'self'", 'blob:'],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        frameAncestors: ["'none'"]
      }
    }
  }));
  if (allowedOrigin) {
    const origins = new Set(allowedOrigin.split(',').map((origin) => origin.trim()).filter(Boolean));
    app.use(cors({
      origin(origin, callback) {
        callback(null, !origin || origins.has(origin));
      },
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
  }
  app.use(express.json({ limit: '4mb', strict: true }));

  const sessionLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: 'Anonymous session creation is rate limited.' }
  });
  const analysisWriteLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 1000,
    standardHeaders: 'draft-8',
    legacyHeaders: false
  });

  app.get('/api/health', (_req, res) => {
    const databaseState = ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown';
    const databaseConnected = mongoose.connection.readyState === 1;
    res.json({
      status: 'available',
      api: { available: true },
      database: {
        configured: Boolean(process.env.MONGODB_URI),
        connected: databaseConnected,
        state: databaseState
      },
      persistence: databaseConnected ? 'mongodb' : 'local-only',
      coach: {
        configured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_MODEL),
        modelConfigured: Boolean(process.env.GEMINI_MODEL)
      }
    });
  });
  app.use('/api/sessions', requireDatabase, sessionLimiter, sessionRoutes);
  app.use('/api/analyses', requireDatabase, requireSession, analysisWriteLimiter, analysisRoutes);
  app.use('/api/coach', coachRoutes);

  const distDirectory = fs.existsSync(path.join(projectDirectory, 'frontend', 'dist'))
    ? path.join(projectDirectory, 'frontend', 'dist')
    : path.join(projectDirectory, 'dist');
  app.use(express.static(distDirectory, { index: false }));
  app.get(/.*/, (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    return res.sendFile(path.join(distDirectory, 'index.html'), (error) => {
      if (error) next(error);
    });
  });

  app.use((req, res) => res.status(404).json({ error: 'Not found.' }));
  app.use((error, _req, res, _next) => {
    if (res.headersSent) return _next(error);
    if (Number.isInteger(error?.status) && error.status >= 400 && error.status < 600) {
      return res.status(error.status).json({ error: error.message || 'The request could not be completed.' });
    }
    if (error?.type === 'entity.too.large') {
      return res.status(413).json({ error: 'Request body exceeds the allowed size.' });
    }
    if (error?.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'Request body is not valid JSON.' });
    }
    if (error?.name === 'ValidationError' || error?.name === 'CastError' || error instanceof SyntaxError) {
      return res.status(400).json({ error: 'Request data is invalid.' });
    }
    if (error instanceof Error && /PGN|FEN|Report|Variation|Selected ply|Question|UCI move/.test(error.message)) {
      return res.status(400).json({ error: error.message });
    }
    console.error('API request failed:', error instanceof Error ? error.message : 'Unknown error');
    return res.status(500).json({ error: 'An unexpected server error occurred.' });
  });

  return app;
}

export { requireSession, requireDatabase };
