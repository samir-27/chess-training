import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  formatDateKey,
  getIntensityLevel,
  getDailyActivityMap,
  calculateStreaks
} from '../services/analyticsService.js';

describe('Analytics & Heatmap Calculations', () => {
  test('Correctly determines contribution heatmap intensity levels', () => {
    assert.equal(getIntensityLevel(0), 0);
    assert.equal(getIntensityLevel(3), 1);
    assert.equal(getIntensityLevel(10), 2);
    assert.equal(getIntensityLevel(20), 3);
    assert.equal(getIntensityLevel(35), 4);
  });

  test('Calculates consecutive training streak across days', () => {
    const today = new Date();
    const d1 = new Date(); d1.setDate(today.getDate() - 2);
    const d2 = new Date(); d2.setDate(today.getDate() - 1);
    const d3 = new Date(); // today

    const dailyMap = new Map();
    dailyMap.set(formatDateKey(d1), { solvedCount: 5 });
    dailyMap.set(formatDateKey(d2), { solvedCount: 12 });
    dailyMap.set(formatDateKey(d3), { solvedCount: 8 });

    const streaks = calculateStreaks(dailyMap);
    assert.equal(streaks.currentStreak, 3, 'Current streak should be 3 days');
    assert.equal(streaks.longestStreak, 3);
    assert.equal(streaks.totalActiveDays, 3);
  });

  test('Handles gaps and broken streaks properly', () => {
    const today = new Date();
    const dOld = new Date(); dOld.setDate(today.getDate() - 10);
    const dToday = new Date();

    const dailyMap = new Map();
    dailyMap.set(formatDateKey(dOld), { solvedCount: 10 });
    dailyMap.set(formatDateKey(dToday), { solvedCount: 5 });

    const streaks = calculateStreaks(dailyMap);
    assert.equal(streaks.currentStreak, 1, 'Current streak should reset to 1 after gap');
    assert.equal(streaks.totalActiveDays, 2);
  });

  test('Groups attempts accurately by date without duplicate counting', () => {
    const sampleAttempts = [
      { id: '1', timestamp: '2026-10-20T10:00:00.000Z', isSolved: true, durationMs: 4000, mistakesCount: 0 },
      { id: '2', timestamp: '2026-10-20T10:05:00.000Z', isSolved: false, durationMs: 7000, mistakesCount: 2 },
      { id: '3', timestamp: '2026-10-20T10:10:00.000Z', isSolved: true, durationMs: 3000, mistakesCount: 0 }
    ];

    const map = getDailyActivityMap(sampleAttempts);
    const day = Array.from(map.values())[0];

    assert.equal(day.attemptsCount, 3);
    assert.equal(day.solvedCount, 2);
    assert.equal(day.mistakesCount, 2);
    assert.equal(day.totalDurationMs, 14000);
  });
});
