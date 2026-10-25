import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { storage } from '../services/storageService.js';
import { compareWoodpeckerCycles } from '../services/analyticsService.js';

describe('Woodpecker Cycle System', () => {
  test('Creates and manages a training cycle with target days and puzzle subset', () => {
    const cycle = storage.createCycle({
      courseId: 'course-woodpecker-method',
      name: 'Test Cycle 1',
      puzzleFilter: 'easy',
      targetDays: 14,
      targetDaily: 16,
      puzzleIds: ['1', '2', '3', '4', '5']
    });

    assert.ok(cycle.id.startsWith('cycle-'));
    assert.equal(cycle.name, 'Test Cycle 1');
    assert.equal(cycle.status, 'active');
    assert.equal(cycle.puzzleIds.length, 5);

    // Record an attempt within the cycle
    storage.recordCycleAttempt(cycle.id, '1', true, 4200);

    const active = storage.getActiveCycle();
    assert.equal(active.id, cycle.id);
    assert.equal(active.completedPuzzles['1'].isSolved, true);
    assert.equal(active.completedPuzzles['1'].durationMs, 4200);

    // Clean up
    storage.deleteCycle(cycle.id);
  });

  test('Marks cycle completed when all target puzzles are solved', () => {
    const cycle = storage.createCycle({
      courseId: 'course-woodpecker-method',
      name: 'Mini Cycle',
      puzzleFilter: 'custom',
      targetDays: 1,
      targetDaily: 2,
      puzzleIds: ['10', '11']
    });

    storage.recordCycleAttempt(cycle.id, '10', true, 3000);
    storage.recordCycleAttempt(cycle.id, '11', true, 3500);

    const cycles = storage.getAllCycles();
    const completed = cycles.find(c => c.id === cycle.id);
    assert.equal(completed.status, 'completed');
    assert.ok(completed.completedDate);

    // Clean up
    storage.deleteCycle(cycle.id);
  });

  test('Starts first cycle by default if no cycles exist', () => {
    storage.clearAllData();
    const active = storage.getActiveCycle();
    assert.ok(active, 'Should have an active cycle initialized by default');
    assert.equal(active.cycleNumber, 1);
    assert.ok(active.puzzleIds.length > 0);
  });

  test('Allows user to delete a cycle cleanly', () => {
    const cycle = storage.createCycle({
      courseId: 'course-woodpecker-method',
      name: 'To Delete',
      puzzleFilter: 'easy',
      targetDays: 7,
      targetDaily: 10,
      puzzleIds: ['1', '2']
    });

    const cycleId = cycle.id;
    assert.ok(storage.getAllCycles().some(c => c.id === cycleId));

    const deleted = storage.deleteCycle(cycleId);
    assert.equal(deleted, true);
    assert.ok(!storage.getAllCycles().some(c => c.id === cycleId));
  });
});
