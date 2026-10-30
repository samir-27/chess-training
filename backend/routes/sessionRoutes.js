import { Router } from 'express';
import { createAnonymousSession } from '../services/sessionToken.js';

const router = Router();

router.post('/', async (_req, res, next) => {
  try {
    const { token, session } = await createAnonymousSession();
    res.status(201).json({
      token,
      expiresAt: session.expiresAt
    });
  } catch (error) {
    next(error);
  }
});

export default router;
