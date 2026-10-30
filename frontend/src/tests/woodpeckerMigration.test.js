import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { migrateWoodpeckerData, courseToLegacyPuzzles } from '../services/woodpeckerMigration.js';
import { woodpeckerPuzzles } from '../data/woodpeckerPuzzles.js';
import { Chess } from 'chess.js';

describe('Woodpecker Method Migration & Integrity', () => {
  test('Preserves all 1,131 puzzles without deleting or mutating original data', () => {
    assert.equal(woodpeckerPuzzles.length, 1131, 'Original array length must remain 1131');
    const { course, stats } = migrateWoodpeckerData();

    assert.equal(stats.totalPuzzles, 1131);
    assert.equal(stats.verifiedCount, 1129);
    assert.equal(course.chapters.length, 3, 'Must create 3 authentic book chapters');
    assert.equal(course.chapters[0].lessons.length, 222, 'Easy chapter has 222 puzzles');
  });

  test('Preserves puzzle IDs, FENs, and solutions correctly', () => {
    const { course } = migrateWoodpeckerData();
    const firstLesson = course.chapters[0].lessons[0];

    assert.equal(firstLesson.id, '1');
    assert.equal(firstLesson.fen, woodpeckerPuzzles[0].fen);
    assert.deepEqual(firstLesson.solution, ['Rxh2+', 'Kxh2', 'Rh8+']);

    // Verify first puzzle check sequence
    const c = new Chess(firstLesson.fen);
    for (const m of firstLesson.solution) {
      assert.ok(c.move(m), `Move ${m} must be legal in chess.js`);
    }
  });

  test('Backward-compatibility adapter correctly converts course back to legacy array', () => {
    const { course } = migrateWoodpeckerData();
    const legacyArray = courseToLegacyPuzzles(course);

    assert.equal(legacyArray.length, 1131);
    assert.equal(legacyArray[0].id, 1);
    assert.equal(legacyArray[0].fen, woodpeckerPuzzles[0].fen);
    assert.deepEqual(legacyArray[0].solution, ['Rxh2+', 'Kxh2', 'Rh8+']);
  });
});
