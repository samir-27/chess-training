import { Chess } from 'chess.js';
import { woodpeckerPuzzles } from '../data/woodpeckerPuzzles.js';
import {
  createCourseTemplate,
  createChapterTemplate,
  createLessonTemplate,
  validateAndNormalizeCourse,
  LessonType,
  CourseCategory
} from './courseSchema.js';

export const WOODPECKER_COURSE_ID = 'course-woodpecker-method';

/**
 * Converts legacy woodpeckerPuzzles array into a unified Course object
 */
export function migrateWoodpeckerData() {
  const chapters = [
    createChapterTemplate({
      id: 'woodpecker-ch-easy',
      title: 'Easy Exercises (1–222)',
      description: 'Foundational tactical patterns. Solve these quickly to build instinctive pattern recognition.',
      order: 1,
      lessons: []
    }),
    createChapterTemplate({
      id: 'woodpecker-ch-intermediate',
      title: 'Intermediate Exercises (223–984)',
      description: 'Deep tactics, sacrifices, and multi-move forcing lines designed for GM-level sharpness.',
      order: 2,
      lessons: []
    }),
    createChapterTemplate({
      id: 'woodpecker-ch-advanced',
      title: 'Advanced Exercises (985–1128)',
      description: 'Extremely challenging calculation positions to test visualization at the highest level.',
      order: 3,
      lessons: []
    })
  ];

  let verifiedCount = 0;
  let fixedCount = 0;

  for (let i = 0; i < woodpeckerPuzzles.length; i++) {
    const p = woodpeckerPuzzles[i];
    const puzzleId = p.id;
    let fen = (p.fen || '').trim();
    const solution = Array.isArray(p.solution) ? p.solution.filter(s => s !== 'Z0') : [];
    const isHeaderCard = !fen || solution.length === 0;

    // Validate or fix FEN
    let startingFen = fen;
    let validMoves = [];
    let validUci = [];
    let sideToMove = 'white';

    if (isHeaderCard) {
      startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      fixedCount++;
    } else {
      try {
        const c = new Chess(startingFen);
        sideToMove = startingFen.split(' ')[1] === 'b' ? 'black' : 'white';

        for (const san of solution) {
          const executed = c.move(san);
          if (executed) {
            validMoves.push(executed.san);
            validUci.push(`${executed.from}${executed.to}${executed.promotion || ''}`);
          } else {
            break;
          }
        }
        verifiedCount++;
      } catch (err) {
        console.warn(`[Woodpecker Migration] FEN invalid for puzzle #${puzzleId}:`, err.message);
        startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        fixedCount++;
      }
    }

    const lesson = createLessonTemplate({
      id: String(puzzleId),
      type: isHeaderCard ? LessonType.STUDY : LessonType.PUZZLE,
      title: p.title || `Exercise ${puzzleId}`,
      description: p.description || '',
      hint: p.hint || '',
      fen: startingFen,
      orientation: sideToMove,
      solution: validMoves.length > 0 ? validMoves : solution,
      solutionUci: validUci,
      alternateSolutions: [],
      moveComments: {},
      metadata: {
        legacyId: puzzleId,
        source: 'The Woodpecker Method',
        authors: 'Hans Tikkanen & Axel Smith'
      }
    });

    // Assign to chapter based on puzzle ID / title
    if (puzzleId <= 222) {
      chapters[0].lessons.push(lesson);
    } else if (puzzleId <= 986) {
      chapters[1].lessons.push(lesson);
    } else {
      chapters[2].lessons.push(lesson);
    }
  }

  const rawCourse = createCourseTemplate({
    id: WOODPECKER_COURSE_ID,
    title: 'The Woodpecker Method',
    description: 'Axel Smith and Hans Tikkanen’s world-renowned tactical training regimen. Sharpen your tactical intuition through spaced, repeated cycles.',
    author: 'Hans Tikkanen & Axel Smith',
    category: CourseCategory.WOODPECKER,
    difficulty: 'All Levels',
    tags: ['tactics', 'woodpecker', 'repetition', 'speed', 'patterns'],
    sourceFormat: 'json',
    sourceFile: 'src/data/woodpeckerPuzzles.js',
    chapters
  });

  const normalized = validateAndNormalizeCourse(rawCourse);

  return {
    course: normalized,
    stats: {
      totalPuzzles: woodpeckerPuzzles.length,
      verifiedCount,
      fixedCount,
      chaptersCount: chapters.length,
      easyCount: chapters[0].lessons.length,
      intermediateCount: chapters[1].lessons.length,
      advancedCount: chapters[2].lessons.length
    }
  };
}

/**
 * Backward-compatibility adapter:
 * Allows any code expecting woodpeckerPuzzles array format to extract it from the course
 */
export function courseToLegacyPuzzles(course) {
  if (!course || !course.chapters) return [];
  const list = [];
  for (const ch of course.chapters) {
    for (const les of ch.lessons) {
      list.push({
        id: Number(les.id) || les.id,
        title: les.title,
        fen: les.fen,
        solution: les.solution,
        description: les.description,
        hint: les.hint
      });
    }
  }
  return list;
}
