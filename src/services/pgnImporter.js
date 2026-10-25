import { parseGames } from '@mliebelt/pgn-parser';
import { Chess } from 'chess.js';
import {
  createCourseTemplate,
  createChapterTemplate,
  createLessonTemplate,
  validateAndNormalizeCourse,
  LessonType,
  CourseCategory
} from './courseSchema.js';

/**
 * Normalizes text input, removing BOM and carriage returns
 */
function cleanPgnText(rawText) {
  if (!rawText) return '';
  return rawText
    .replace(/^\uFEFF/, '') // Strip UTF-8 BOM
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');
}

/**
 * Splits a full PGN text stream into individual game strings safely
 */
export function splitPgnGames(pgnText) {
  const text = cleanPgnText(pgnText);
  const lines = text.split('\n');
  const games = [];
  let currentLines = [];
  let inHeader = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const isTag = trimmed.startsWith('[');

    // If tag encountered after move/content section, game boundary detected
    if (isTag && !inHeader && currentLines.some(l => l.trim().length > 0)) {
      const fullGame = currentLines.join('\n').trim();
      if (fullGame.length > 0) {
        games.push(fullGame);
        currentLines = [];
      }
    }

    if (isTag) {
      inHeader = true;
    } else if (trimmed.length > 0) {
      inHeader = false;
    }

    currentLines.push(line);
  }

  if (currentLines.length > 0) {
    const fullGame = currentLines.join('\n').trim();
    if (fullGame.length > 0) {
      games.push(fullGame);
    }
  }

  return games;
}

/**
 * Sanitizes common PGN malformations (e.g. unescaped brackets or backslashes in tag values)
 */
function sanitizePgnGameString(gameStr) {
  return gameStr.replace(/\[([A-Za-z0-9_]+)\s+"([^"]*)"\]/g, (match, tag, val) => {
    // Replace problematic backslash escapes like MoveTrainer\[\]
    const cleaned = val.replace(/\\\[/g, '[').replace(/\\\]/g, ']');
    return `[${tag} "${cleaned}"]`;
  });
}

/**
 * Extracts comments from a parsed move
 */
function extractMoveComment(move) {
  if (!move) return '';
  const parts = [];
  if (move.commentMove && typeof move.commentMove === 'string') {
    parts.push(move.commentMove.trim());
  }
  if (move.commentDiag) {
    if (typeof move.commentDiag === 'string') parts.push(move.commentDiag.trim());
    else if (move.commentDiag.comment) parts.push(String(move.commentDiag.comment).trim());
  }
  if (move.commentAfter) {
    parts.push(String(move.commentAfter).trim());
  }
  return parts.filter(Boolean).join(' ');
}

/**
 * Validates a move sequence on a Chess instance and returns validated SAN & UCI arrays
 */
function validateMoves(startingFen, parsedMoves) {
  const chess = startingFen ? new Chess(startingFen) : new Chess();
  const validSan = [];
  const validUci = [];
  const moveComments = {};
  const alternateSolutions = [];

  for (let i = 0; i < parsedMoves.length; i++) {
    const rawMove = parsedMoves[i];
    const san = rawMove?.notation?.notation;
    if (!san) continue;

    // Skip pseudo moves like Z0
    if (san === 'Z0' || san === 'none') continue;

    try {
      const executed = chess.move(san);
      if (!executed) break;

      validSan.push(executed.san);
      const uci = `${executed.from}${executed.to}${executed.promotion || ''}`;
      validUci.push(uci);

      const comment = extractMoveComment(rawMove);
      if (comment) {
        moveComments[i] = comment;
      }

      // Check variations for alternate solutions
      if (Array.isArray(rawMove.variations) && rawMove.variations.length > 0) {
        for (const variation of rawMove.variations) {
          if (Array.isArray(variation) && variation.length > 0) {
            try {
              const varChess = new Chess(executed.before);
              const altSan = [];
              for (const varMove of variation) {
                const vSan = varMove?.notation?.notation;
                if (!vSan) break;
                const vExec = varChess.move(vSan);
                if (!vExec) break;
                altSan.push(vExec.san);
              }
              if (altSan.length > 0) {
                alternateSolutions.push(altSan);
              }
            } catch {
              // Ignore invalid variation branches
            }
          }
        }
      }
    } catch {
      // Illegal move encountered in PGN, stop mainline parsing here
      break;
    }
  }

  return {
    validSan,
    validUci,
    moveComments,
    alternateSolutions,
    finalFen: chess.fen(),
    isCheckmate: chess.isCheckmate()
  };
}

/**
 * Imports and converts a single PGN or multiple PGNs into Universal Course JSON
 * 
 * @param {string} pgnContent - Raw PGN string
 * @param {object} options - Import options:
 *   - courseTitle: optional title override
 *   - courseAuthor: optional author override
 *   - category: optional category
 *   - difficulty: optional difficulty
 *   - chapterGroupBy: 'auto' | 'white' | 'event' | 'file' | 'single'
 *   - defaultType: 'auto' | 'puzzle' | 'repertoire' | 'study' | 'game'
 */
export function importPgnToCourse(pgnContent, options = {}) {
  const warnings = [];
  const errors = [];
  const chunks = splitPgnGames(pgnContent);

  if (chunks.length === 0) {
    return {
      success: false,
      course: null,
      report: {
        totalPgnGames: 0,
        importedLessons: 0,
        skippedGames: 0,
        warnings: ['No PGN games detected in content'],
        errors: ['Empty or invalid PGN']
      }
    };
  }

  const parsedGames = [];
  let skippedGames = 0;

  for (let i = 0; i < chunks.length; i++) {
    const rawChunk = chunks[i];
    const sanitized = sanitizePgnGameString(rawChunk);

    try {
      const result = parseGames(sanitized);
      if (Array.isArray(result) && result.length > 0) {
        parsedGames.push(result[0]);
      } else {
        skippedGames++;
        warnings.push(`Game #${i + 1} did not parse into valid game.`);
      }
    } catch (parseErr) {
      skippedGames++;
      warnings.push(`Game #${i + 1} parse error: ${parseErr.message}`);
    }
  }

  if (parsedGames.length === 0) {
    return {
      success: false,
      course: null,
      report: {
        totalPgnGames: chunks.length,
        importedLessons: 0,
        skippedGames,
        warnings,
        errors: ['Failed to parse any games from PGN input.']
      }
    };
  }

  // Derive Course Metadata from headers
  const firstGame = parsedGames[0];
  const tags = firstGame.tags || {};
  const derivedTitle = options.courseTitle || tags.Event || (tags.White ? `${tags.White} Course` : 'Imported Chess Course');
  const derivedAuthor = options.courseAuthor || tags.Annotator || tags.Site || 'Unknown Author';

  // Determine chapter grouping strategy
  const groupBy = options.chapterGroupBy || 'auto';
  let chaptersMap = new Map();

  const isChessableStyle = parsedGames.some(g => {
    const w = g.tags?.White || '';
    return /^\d+\)/.test(w) || w.toLowerCase().includes('exercise') || w.toLowerCase().includes('chapter');
  });

  const effectiveGroupBy = groupBy === 'auto'
    ? (isChessableStyle ? 'white' : (tags.Event && tags.Event !== '?' ? 'event' : 'single'))
    : groupBy;

  let lessonIndex = 0;

  for (let i = 0; i < parsedGames.length; i++) {
    const game = parsedGames[i];
    const gTags = game.tags || {};

    // Determine starting FEN
    let startingFen = null;
    if (gTags.FEN) {
      startingFen = gTags.FEN.trim();
    }

    // Validate starting FEN
    let chessInitOk = false;
    try {
      const c = startingFen ? new Chess(startingFen) : new Chess();
      startingFen = c.fen();
      chessInitOk = true;
    } catch {
      warnings.push(`Game #${i + 1} has invalid FEN "${gTags.FEN}", skipped.`);
      skippedGames++;
      continue;
    }

    if (!chessInitOk) continue;

    // Validate moves
    const { validSan, validUci, moveComments, alternateSolutions } = validateMoves(startingFen, game.moves || []);

    // Check if game has actual moves or is purely informational note
    const isInfoOnly = validSan.length === 0;
    if (isInfoOnly && !gTags.FEN) {
      // Pure informational text without position
      // Check if there's header text or game comments to preserve as description
      skippedGames++;
      warnings.push(`Game #${i + 1} ("${gTags.Black || gTags.Event || 'Untitled'}") has no playable moves; skipped.`);
      continue;
    }

    lessonIndex++;

    // Lesson title: prefer Black tag (in Chessable format) or White vs Black or Event
    let lessonTitle = '';
    if (gTags.Black && gTags.Black !== '?') {
      lessonTitle = gTags.Black;
    } else if (gTags.White && gTags.White !== '?' && gTags.Black && gTags.Black !== '?') {
      lessonTitle = `${gTags.White} vs. ${gTags.Black}`;
    } else if (gTags.Event && gTags.Event !== '?') {
      lessonTitle = `${gTags.Event} #${gTags.Round || lessonIndex}`;
    } else {
      lessonTitle = `Position ${lessonIndex}`;
    }

    // Determine lesson type
    let lessonType = LessonType.PUZZLE;
    if (options.defaultType && options.defaultType !== 'auto') {
      lessonType = options.defaultType;
    } else if (!gTags.FEN && validSan.length > 15) {
      lessonType = LessonType.GAME;
    } else if (gTags.Opening || (gTags.ECO && validSan.length <= 15)) {
      lessonType = LessonType.REPERTOIRE;
    }

    // Lesson orientation: side to move
    const sideToMove = startingFen.split(' ')[1] === 'b' ? 'black' : 'white';

    // Game comments: initial game description
    let description = '';
    if (game.gameComment && typeof game.gameComment === 'string') {
      description = game.gameComment.trim();
    } else if (game.gameComment?.comment) {
      description = String(game.gameComment.comment).trim();
    }

    // Generate stable lesson ID
    const stableId = `les-${lessonIndex}-${(gTags.ECO || 'pos').toLowerCase()}-${Math.abs(hashString(startingFen)) % 100000}`;

    const lesson = createLessonTemplate({
      id: stableId,
      type: lessonType,
      title: lessonTitle,
      description,
      hint: '',
      fen: startingFen,
      orientation: sideToMove,
      solution: validSan,
      solutionUci: validUci,
      alternateSolutions,
      moveComments,
      metadata: {
        event: gTags.Event || '',
        site: gTags.Site || '',
        date: typeof gTags.Date === 'object' ? gTags.Date?.value : (gTags.Date || ''),
        round: gTags.Round || '',
        white: gTags.White || '',
        black: gTags.Black || '',
        result: gTags.Result || '*',
        eco: gTags.ECO || '',
        opening: gTags.Opening || '',
        fenSetup: Boolean(gTags.FEN)
      }
    });

    // Determine Chapter grouping key
    let chapterKey = 'Chapter 1';
    if (effectiveGroupBy === 'white' && gTags.White && gTags.White !== '?') {
      chapterKey = gTags.White;
    } else if (effectiveGroupBy === 'event' && gTags.Event && gTags.Event !== '?') {
      chapterKey = gTags.Event;
    } else if (effectiveGroupBy === 'single') {
      chapterKey = 'Main Exercises';
    }

    if (!chaptersMap.has(chapterKey)) {
      chaptersMap.set(chapterKey, []);
    }
    chaptersMap.get(chapterKey).push(lesson);
  }

  // Build Chapters Array
  const chapters = [];
  let chapOrder = 0;
  for (const [title, lessons] of chaptersMap.entries()) {
    chapOrder++;
    chapters.push(createChapterTemplate({
      id: `chapter-${chapOrder}`,
      title,
      order: chapOrder,
      lessons
    }));
  }

  // Determine course category
  let category = options.category || CourseCategory.TACTICS;
  if (!options.category) {
    if (derivedTitle.toLowerCase().includes('woodpecker')) category = CourseCategory.WOODPECKER;
    else if (derivedTitle.toLowerCase().includes('opening') || derivedTitle.toLowerCase().includes('repertoire')) category = CourseCategory.OPENING;
    else if (derivedTitle.toLowerCase().includes('endgame')) category = CourseCategory.ENDGAME;
    else if (derivedTitle.toLowerCase().includes('strategy')) category = CourseCategory.MIDDLEGAME;
  }

  const courseId = `course-${slugify(derivedTitle)}-${Date.now().toString(36)}`;

  const rawCourse = createCourseTemplate({
    id: courseId,
    title: derivedTitle,
    description: tags.Event && tags.Site ? `${tags.Event} (${tags.Site})` : 'Imported chess course from PGN',
    author: derivedAuthor,
    category,
    difficulty: options.difficulty || 'All Levels',
    tags: [category.toLowerCase(), 'pgn', 'training'],
    sourceFormat: 'pgn',
    chapters
  });

  const normalizedCourse = validateAndNormalizeCourse(rawCourse);

  return {
    success: normalizedCourse.stats.totalLessons > 0,
    course: normalizedCourse,
    report: {
      totalPgnGames: chunks.length,
      importedLessons: normalizedCourse.stats.totalLessons,
      skippedGames,
      chapterCount: normalizedCourse.chapters.length,
      warnings,
      errors
    }
  };
}

/**
 * Quick DJB2-like string hash for deterministic IDs
 */
function hashString(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

/**
 * Creates URL-friendly slug
 */
function slugify(text) {
  return String(text || 'course')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .slice(0, 40);
}
