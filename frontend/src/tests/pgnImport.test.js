import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { splitPgnGames, importPgnToCourse } from '../services/pgnImporter.js';
import { validateAndNormalizeCourse, createCourseTemplate } from '../services/courseSchema.js';

describe('Universal PGN Importer Pipeline', () => {
  test('Correctly splits multiple games in single PGN text', () => {
    const raw = `
[Event "Game 1"]
[White "Player A"]
[Black "Player B"]
1. e4 e5 2. Nf3 *

[Event "Game 2"]
[White "Player C"]
[Black "Player D"]
1. d4 d5 2. c4 *
`;
    const chunks = splitPgnGames(raw);
    assert.equal(chunks.length, 2, 'Should detect exactly 2 games');
    assert.match(chunks[0], /Game 1/);
    assert.match(chunks[1], /Game 2/);
  });

  test('Sanitizes escaped brackets in headers like MoveTrainer\\[\\]', () => {
    const raw = `
[Event "Chapter 1"]
[White "MoveTrainer\\[\\] Author"]
[Black "Exercise 1"]
[FEN "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3"]
[SetUp "1"]

1. Bb5 a6 2. Ba4 *
`;
    const result = importPgnToCourse(raw, { courseTitle: 'Escaped Header Test' });
    assert.equal(result.success, true);
    assert.equal(result.course.stats.totalLessons, 1);
    assert.equal(result.course.chapters[0].lessons[0].solution[0], 'Bb5');
  });

  test('Validates FEN, turns, and legality with chess.js', () => {
    const pgn = `
[Event "Tactics Test"]
[White "Puzzle Chapter"]
[Black "Famous Steinitz Mate"]
[FEN "r6r/1pp3k1/1b6/p2P1p2/P1N1pn2/2P2P2/2P2PPP/4RR1K b - - 0 1"]
[SetUp "1"]

1... Rxh2+ 2. Kxh2 Rh8# *
`;
    const result = importPgnToCourse(pgn);
    assert.equal(result.success, true);
    const lesson = result.course.chapters[0].lessons[0];
    assert.equal(lesson.orientation, 'black', 'Orientation should be black from FEN');
    assert.deepEqual(lesson.solution, ['Rxh2+', 'Kxh2', 'Rh8+']);
    assert.deepEqual(lesson.solutionUci, ['h8h2', 'h1h2', 'a8h8']);
  });

  test('Handles non-standard starting FEN and preserves side lines', () => {
    const pgn = `
[Event "Variation Test"]
[White "Repertoire"]
[Black "Sicilian Defense"]
[FEN "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2"]
[SetUp "1"]

1. Nf3 (1. c3 d5 2. exd5 Qxd5) 1... d6 2. d4 cxd4 *
`;
    const result = importPgnToCourse(pgn);
    assert.equal(result.success, true);
    const lesson = result.course.chapters[0].lessons[0];
    assert.equal(lesson.solution[0], 'Nf3');
    assert.ok(lesson.alternateSolutions.length > 0, 'Should extract variation branch');
    assert.equal(lesson.alternateSolutions[0][0], 'c3');
  });

  test('Gracefully handles and skips malformed PGN without crashing', () => {
    const malformed = `
[Event "Malformed Game"]
[FEN "invalid-fen-string"]
1. IllegalMove99 *

[Event "Valid Game"]
[FEN "8/8/8/8/8/4k3/4p3/4K3 w - - 0 1"]
[SetUp "1"]
1. Kd1 *
`;
    const result = importPgnToCourse(malformed);
    assert.ok(result.report.warnings.length > 0, 'Should record warnings for malformed games');
    assert.equal(result.report.skippedGames, 1, 'Should skip the invalid game');
  });

  test('Schema validator normalizes course structure and calculates stats', () => {
    const rawCourse = createCourseTemplate({
      title: 'Validation Test',
      chapters: [
        {
          title: 'Ch 1',
          lessons: [
            { id: '1', title: 'L1', fen: '8/8/8/8/8/4k3/4p3/4K3 w - - 0 1', solution: ['Kd1'] }
          ]
        }
      ]
    });

    const normalized = validateAndNormalizeCourse(rawCourse);
    assert.equal(normalized.schemaVersion, 1);
    assert.equal(normalized.stats.totalChapters, 1);
    assert.equal(normalized.stats.totalLessons, 1);
    assert.equal(normalized.stats.puzzleCount, 1);
  });
});
