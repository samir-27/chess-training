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
 * Converts woodpeckerPuzzles array into a unified 700-puzzle Course object
 */
export function migrateWoodpeckerData() {
  const masterChapter = createChapterTemplate({
    id: 'woodpecker-ch-master',
    title: 'Woodpecker Regimen (700 Puzzles)',
    description: '700 curated tactical positions. Solve all 700 puzzles in each cycle, aiming to halve your total time on every pass.',
    order: 1,
    lessons: []
  });

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
      title: p.title || `Exercise ${i + 1}: ${sideToMove === 'white' ? 'White' : 'Black'} to Move`,
      description: p.description || `${sideToMove === 'white' ? 'White' : 'Black'} to move. Find the best tactical continuation.`,
      hint: p.hint || 'Find the most forcing tactical continuation.',
      fen: startingFen,
      orientation: sideToMove,
      solution: validMoves.length > 0 ? validMoves : solution,
      solutionUci: validUci.length > 0 ? validUci : (p.solutionUci || []),
      alternateSolutions: [],
      moveComments: {},
      metadata: {
        puzzleIndex: i + 1,
        totalPuzzles: woodpeckerPuzzles.length,
        id: puzzleId,
        rating: p.rating,
        themes: p.themes,
        preMove: p.preMove,
        preMoveFen: p.preMoveFen,
        source: 'The Woodpecker Method',
        authors: 'Hans Tikkanen & Axel Smith'
      }
    });

    masterChapter.lessons.push(lesson);
  }

  const rawCourse = createCourseTemplate({
    id: WOODPECKER_COURSE_ID,
    title: 'The Woodpecker Method',
    description: '700 curated tactical puzzles for the Woodpecker Method. Retrain your tactical subconscious through repetitive cycles.',
    author: 'Hans Tikkanen & Axel Smith',
    category: CourseCategory.WOODPECKER,
    difficulty: 'All Levels',
    tags: ['tactics', 'woodpecker', 'repetition', 'speed', 'patterns'],
    sourceFormat: 'json',
    sourceFile: 'src/data/woodpeckerCourse.json',
    chapters: [masterChapter]
  });

  const normalized = validateAndNormalizeCourse(rawCourse);

  return {
    course: normalized,
    stats: {
      totalPuzzles: woodpeckerPuzzles.length,
      verifiedCount,
      fixedCount,
      chaptersCount: 1,
      totalCount: masterChapter.lessons.length
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
