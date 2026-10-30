/**
 * Universal Course Schema definition & validation utilities
 * Schema Version: 1
 */

export const SCHEMA_VERSION = 1;

/**
 * Valid lesson types
 */
export const LessonType = {
  PUZZLE: 'puzzle',
  REPERTOIRE: 'repertoire',
  STRATEGY: 'strategy',
  ENDGAME: 'endgame',
  GAME: 'game',
  STUDY: 'study'
};

/**
 * Valid course categories
 */
export const CourseCategory = {
  TACTICS: 'Tactics',
  OPENING: 'Opening Repertoire',
  MIDDLEGAME: 'Middlegame Strategy',
  ENDGAME: 'Endgame',
  GAMES: 'Annotated Games',
  WOODPECKER: 'Woodpecker Method',
  GENERAL: 'General Training'
};

/**
 * Creates a clean default course structure
 */
export function createCourseTemplate(overrides = {}) {
  const id = overrides.id || `course-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  return {
    schemaVersion: SCHEMA_VERSION,
    id,
    title: overrides.title || 'Untitled Course',
    description: overrides.description || '',
    author: overrides.author || 'Unknown Author',
    category: overrides.category || CourseCategory.TACTICS,
    difficulty: overrides.difficulty || 'All Levels', // 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'
    tags: Array.isArray(overrides.tags) ? overrides.tags : ['chess'],
    sourceFormat: overrides.sourceFormat || 'pgn',
    sourceFile: overrides.sourceFile || '',
    coverImage: overrides.coverImage || '',
    createdDate: overrides.createdDate || new Date().toISOString(),
    updatedDate: overrides.updatedDate || new Date().toISOString(),
    stats: {
      totalChapters: 0,
      totalLessons: 0,
      puzzleCount: 0,
      studyCount: 0
    },
    chapters: overrides.chapters || []
  };
}

/**
 * Creates a clean chapter structure
 */
export function createChapterTemplate(overrides = {}) {
  const id = overrides.id || `ch-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  return {
    id,
    title: overrides.title || 'Chapter 1',
    description: overrides.description || '',
    order: overrides.order || 0,
    lessons: overrides.lessons || []
  };
}

/**
 * Creates a clean lesson / puzzle structure
 */
export function createLessonTemplate(overrides = {}) {
  const id = overrides.id || `les-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  return {
    id,
    type: overrides.type || LessonType.PUZZLE,
    title: overrides.title || 'Exercise',
    description: overrides.description || '',
    hint: overrides.hint || '',
    fen: overrides.fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    orientation: overrides.orientation || (overrides.fen && overrides.fen.split(' ')[1] === 'b' ? 'black' : 'white'),
    solution: Array.isArray(overrides.solution) ? overrides.solution : [], // Array of SAN moves
    solutionUci: Array.isArray(overrides.solutionUci) ? overrides.solutionUci : [], // Array of UCI moves (e.g. ['e2e4'])
    alternateSolutions: Array.isArray(overrides.alternateSolutions) ? overrides.alternateSolutions : [], // Alternative valid branches
    moveComments: overrides.moveComments || {}, // Map of move index / SAN -> explanatory comment
    movesTree: overrides.movesTree || null, // Full variation tree for annotated games & repertoires
    metadata: {
      event: overrides.metadata?.event || '',
      site: overrides.metadata?.site || '',
      date: overrides.metadata?.date || '',
      round: overrides.metadata?.round || '',
      white: overrides.metadata?.white || '',
      black: overrides.metadata?.black || '',
      result: overrides.metadata?.result || '*',
      eco: overrides.metadata?.eco || '',
      opening: overrides.metadata?.opening || '',
      fenSetup: Boolean(overrides.metadata?.fenSetup),
      ...overrides.metadata
    }
  };
}

/**
 * Validates course object structure and recalculates stats
 */
export function validateAndNormalizeCourse(course) {
  if (!course || typeof course !== 'object') {
    throw new Error('Course must be a valid object');
  }

  const normalized = {
    ...createCourseTemplate(),
    ...course,
    schemaVersion: SCHEMA_VERSION,
    id: String(course.id || `course-${Date.now()}`),
    title: String(course.title || 'Untitled Course').trim(),
    chapters: []
  };

  let totalLessons = 0;
  let puzzleCount = 0;
  let studyCount = 0;

  const rawChapters = Array.isArray(course.chapters) ? course.chapters : [];

  normalized.chapters = rawChapters.map((chap, cIdx) => {
    const rawLessons = Array.isArray(chap.lessons) ? chap.lessons : [];
    const normalizedLessons = rawLessons.map((les, lIdx) => {
      const normLesson = {
        ...createLessonTemplate(),
        ...les,
        id: les.id !== undefined && les.id !== null ? String(les.id) : `les-${cIdx + 1}-${lIdx + 1}`,
        title: les.title || `Position ${lIdx + 1}`,
        fen: (les.fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1').trim(),
        solution: Array.isArray(les.solution) ? les.solution.map(s => String(s).trim()) : []
      };

      // Set orientation from FEN if not explicit
      if (!normLesson.orientation) {
        normLesson.orientation = normLesson.fen.split(' ')[1] === 'b' ? 'black' : 'white';
      }

      totalLessons++;
      if (normLesson.type === LessonType.PUZZLE) {
        puzzleCount++;
      } else {
        studyCount++;
      }

      return normLesson;
    });

    return {
      ...createChapterTemplate(),
      ...chap,
      id: chap.id ? String(chap.id) : `chapter-${cIdx + 1}`,
      title: chap.title || `Chapter ${cIdx + 1}`,
      order: chap.order !== undefined ? chap.order : cIdx,
      lessons: normalizedLessons
    };
  });

  normalized.stats = {
    totalChapters: normalized.chapters.length,
    totalLessons,
    puzzleCount,
    studyCount
  };

  return normalized;
}
