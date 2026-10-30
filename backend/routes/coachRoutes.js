import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { validatePgn, validateReport } from '../services/validation.js';
import { generateMoveCommentary } from '../services/commentary.js';

const router = Router();

const commentaryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Automatic commentary rate limit reached. Try again later.' }
});

router.post('/commentary', commentaryLimiter, async (req, res, next) => {
  try {
    const { moves, headers } = validatePgn(req.body?.pgn);
    const initialFen = headers.SetUp === '1' && headers.FEN ? headers.FEN : undefined;
    const report = validateReport(req.body?.report, moves, initialFen);
    if (!report) return res.status(400).json({ error: 'A completed analysis report is required.' });
    const result = await generateMoveCommentary(report);
    return res.json({
      candidateCount: result.candidates.length,
      commentary: result.commentary
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
