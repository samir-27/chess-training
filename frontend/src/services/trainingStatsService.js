/**
 * Training Statistics & Progress Engine
 * Calculates user training streaks, daily Woodpecker goal completion, and cycle comparisons.
 */

import { storage } from './storageService.js';

/**
 * Format Date object to YYYY-MM-DD in local time
 */
export function formatDateKey(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Groups all attempts by calendar day (YYYY-MM-DD)
 */
export function getDailyActivityMap(attempts = null) {
  const list = attempts || storage.getAllAttempts();
  const map = new Map();

  for (const att of list) {
    if (!att.timestamp) continue;
    const dateKey = formatDateKey(att.timestamp);

    if (!map.has(dateKey)) {
      map.set(dateKey, {
        date: dateKey,
        attemptsCount: 0,
        solvedCount: 0,
        mistakesCount: 0,
        totalDurationMs: 0,
        hintsUsed: 0
      });
    }

    const day = map.get(dateKey);
    day.attemptsCount++;
    if (att.isSolved) {
      day.solvedCount++;
    } else {
      day.mistakesCount++;
    }
    day.totalDurationMs += (att.durationMs || 0);
    day.hintsUsed += (att.hintsUsed || 0);
  }

  return map;
}

/**
 * Calculates current and longest training streak from attempts
 */
export function calculateStreaks(dailyMap) {
  const activeDates = Array.from(dailyMap.keys())
    .filter(d => (dailyMap.get(d).solvedCount || 0) > 0)
    .sort();

  if (activeDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0, totalActiveDays: 0 };
  }

  const todayKey = formatDateKey(new Date());
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = formatDateKey(yesterday);

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let prevDate = null;

  for (let i = 0; i < activeDates.length; i++) {
    const curDate = new Date(activeDates[i] + 'T00:00:00');
    if (prevDate) {
      const diffDays = Math.round((curDate - prevDate) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        tempStreak++;
      } else if (diffDays > 1) {
        tempStreak = 1;
      }
    } else {
      tempStreak = 1;
    }
    if (tempStreak > longestStreak) longestStreak = tempStreak;
    prevDate = curDate;
  }

  const hasTrainedToday = activeDates.includes(todayKey);
  const hasTrainedYesterday = activeDates.includes(yesterdayKey);

  if (hasTrainedToday || hasTrainedYesterday) {
    let checkDate = new Date();
    if (!hasTrainedToday) {
      checkDate.setDate(checkDate.getDate() - 1);
    }

    while (true) {
      const key = formatDateKey(checkDate);
      if (activeDates.includes(key)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
  }

  return {
    currentStreak,
    longestStreak,
    totalActiveDays: activeDates.length
  };
}

/**
 * Comprehensive dashboard & progress metrics
 */
export function getOverallStats() {
  const attempts = storage.getAllAttempts();
  const dailyMap = getDailyActivityMap(attempts);
  const streaks = calculateStreaks(dailyMap);
  const settings = storage.getSettings();

  const todayKey = formatDateKey(new Date());
  const todayData = dailyMap.get(todayKey) || { solvedCount: 0, attemptsCount: 0, totalDurationMs: 0 };

  const totalAttempts = attempts.length;
  const totalSolved = attempts.filter(a => a.isSolved).length;
  const accuracy = totalAttempts > 0 ? Math.round((totalSolved / totalAttempts) * 100) : 100;
  const totalTimeMs = attempts.reduce((acc, cur) => acc + (cur.durationMs || 0), 0);
  const avgSolveTimeMs = totalSolved > 0
    ? Math.round(attempts.filter(a => a.isSolved).reduce((acc, c) => acc + c.durationMs, 0) / totalSolved)
    : 0;

  const courses = storage.getAllCourses();
  const cycles = storage.getAllCycles();
  const activeCycle = cycles.find(c => c.status === 'active') || null;

  const dailyGoal = settings.dailyGoal || 20;
  const dailyPercent = Math.min(100, Math.round((todayData.solvedCount / dailyGoal) * 100));

  return {
    today: {
      solved: todayData.solvedCount,
      attempts: todayData.attemptsCount,
      timeMs: todayData.totalDurationMs,
      goal: dailyGoal,
      percent: dailyPercent
    },
    overall: {
      totalSolved,
      totalAttempts,
      accuracy,
      totalTimeMs,
      avgSolveTimeMs,
      activeCoursesCount: courses.length,
      activeCyclesCount: cycles.filter(c => c.status === 'active').length
    },
    streaks,
    activeCycle
  };
}

/**
 * Computes Woodpecker cycle improvement comparison
 */
export function compareWoodpeckerCycles() {
  const cycles = storage.getAllCycles().sort((a, b) => a.cycleNumber - b.cycleNumber);
  return cycles.map(c => {
    const puzzles = Object.values(c.completedPuzzles || {});
    const solved = puzzles.filter(p => p.isSolved).length;
    const total = c.puzzleIds?.length || puzzles.length || 0;
    const accuracy = puzzles.length > 0 ? Math.round((solved / puzzles.length) * 100) : 0;
    const avgTimeMs = solved > 0 ? Math.round((c.totalTimeMs || 0) / solved) : 0;

    return {
      id: c.id,
      number: c.cycleNumber,
      name: c.name,
      status: c.status,
      totalPuzzles: total,
      solvedCount: solved,
      accuracy,
      totalTimeMs: c.totalTimeMs || 0,
      avgTimeMs,
      targetDays: c.targetDays,
      startDate: c.startDate,
      completedDate: c.completedDate
    };
  });
}
