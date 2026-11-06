import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('Woodpecker 700 Puzzles Suite', async (t) => {
  const coursePath = path.resolve(__dirname, '../frontend/src/data/woodpeckerCourse.json');
  const course = JSON.parse(fs.readFileSync(coursePath, 'utf8'));

  await t.test('Course metadata and structure contains exactly 700 puzzles in 1 chapter', () => {
    assert.equal(course.stats.totalChapters, 1);
    assert.equal(course.stats.totalLessons, 700);
    assert.equal(course.stats.puzzleCount, 700);
    assert.equal(course.chapters.length, 1);
    assert.equal(course.chapters[0].lessons.length, 700);
  });

  await t.test('First and last puzzle IDs match user provided JSON', () => {
    const first = course.chapters[0].lessons[0];
    const last = course.chapters[0].lessons[699];

    assert.equal(first.id, '0000H');
    assert.equal(first.metadata.id, '0000H');
    assert.equal(first.metadata.puzzleIndex, 1);
    assert.equal(first.metadata.totalPuzzles, 700);
    assert.deepEqual(first.solution, ['Qg2#']);

    assert.equal(last.id, '00Oyf');
    assert.equal(last.metadata.id, '00Oyf');
    assert.equal(last.metadata.puzzleIndex, 700);
    assert.equal(last.metadata.totalPuzzles, 700);
    assert.equal(last.metadata.rating, 2696);
  });

  await t.test('StorageService initializes cycle with all 700 puzzles and tracks cycles', async () => {
    const { storage } = await import('../frontend/src/services/storageService.js');
    
    // Clear storage for test
    storage.memoryStorage.clear();
    storage.ensureInitialized();

    const cycles = storage.getAllCycles();
    assert.equal(cycles.length, 1);

    const activeCycle = storage.getActiveCycle();
    assert.ok(activeCycle);
    assert.equal(activeCycle.cycleNumber, 1);
    assert.equal(activeCycle.puzzleIds.length, 700);
    assert.equal(activeCycle.status, 'active');

    // Record attempts
    storage.recordCycleAttempt(activeCycle.id, '0000H', true, 3500);
    const updated = storage.getActiveCycle();
    assert.equal(updated.completedPuzzles['0000H'].isSolved, true);
    assert.equal(updated.totalTimeMs, 3500);

    // Start Next Cycle
    const cycle2 = storage.startNextCycle(activeCycle.id);
    assert.equal(cycle2.cycleNumber, 2);
    assert.equal(cycle2.puzzleIds.length, 700);
    assert.equal(cycle2.status, 'active');
    assert.equal(cycle2.targetDays, 14); // Halved from 28 to 14
    
    // Verify previous cycle is marked completed
    const prev = storage.getAllCycles().find(c => c.id === activeCycle.id);
    assert.equal(prev.status, 'completed');
  });
});
