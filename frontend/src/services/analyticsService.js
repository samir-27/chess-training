/**
 * Analytics and Heatmap calculation engine
 * Calculates daily training streaks, GitHub-style 365-day activity heatmaps,
 * accuracy trends, solve times, and Woodpecker cycle improvements from real attempts.
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
 * Determines intensity level (0 to 4) based on puzzles solved
 */
export function getIntensityLevel(solvedCount) {
  if (!solvedCount || solvedCount <= 0) return 0;
  if (solvedCount <= 5) return 1;
  if (solvedCount <= 15) return 2;
  if (solvedCount <= 30) return 3;
  return 4;
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

    const dayData = map.get(dateKey);
    dayData.attemptsCount += 1;
    if (att.isSolved) dayData.solvedCount += 1;
    dayData.mistakesCount += (att.mistakesCount || 0);
    dayData.totalDurationMs += (att.durationMs || 0);
    dayData.hintsUsed += (att.hintsUsed || 0);
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

  // Calculate longest streak
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

  // Calculate current streak
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
 * Generates full 52-week / 365-day heatmap grid data
 */
export function generateHeatmapGrid(days = 365) {
  const dailyMap = getDailyActivityMap();
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - (days - 1));

  // Align start to the nearest preceding Sunday
  const startDayOfWeek = startDate.getDay(); // 0 = Sun, 1 = Mon ...
  const alignedStart = new Date(startDate);
  alignedStart.setDate(alignedStart.getDate() - startDayOfWeek);

  const weeks = [];
  let currentWeek = [];
  const cur = new Date(alignedStart);

  while (cur <= endDate || currentWeek.length > 0) {
    const dateKey = formatDateKey(cur);
    const dayStats = dailyMap.get(dateKey) || {
      date: dateKey,
      attemptsCount: 0,
      solvedCount: 0,
      totalDurationMs: 0
    };

    const isFuture = cur > endDate;
    const isPastRange = cur < startDate;

    currentWeek.push({
      date: dateKey,
      dayOfWeek: cur.getDay(),
      month: cur.getMonth(),
      solvedCount: isFuture || isPastRange ? 0 : dayStats.solvedCount,
      attemptsCount: isFuture || isPastRange ? 0 : dayStats.attemptsCount,
      totalDurationMs: isFuture || isPastRange ? 0 : dayStats.totalDurationMs,
      intensity: isFuture || isPastRange ? 0 : getIntensityLevel(dayStats.solvedCount),
      isCurrentMonth: cur.getMonth() === endDate.getMonth(),
      isDisabled: isFuture || isPastRange
    });

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    cur.setDate(cur.getDate() + 1);
    if (cur > endDate && currentWeek.length === 0) break;
  }

  // Find best day
  let bestDay = null;
  let maxSolved = 0;
  for (const [date, data] of dailyMap.entries()) {
    if (data.solvedCount > maxSolved) {
      maxSolved = data.solvedCount;
      bestDay = { date, solved: data.solvedCount, durationMs: data.totalDurationMs };
    }
  }

  const streaks = calculateStreaks(dailyMap);

  return {
    weeks,
    totalWeeks: weeks.length,
    startDate: formatDateKey(startDate),
    endDate: formatDateKey(endDate),
    streaks,
    bestDay
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

  // Daily goal progress
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
 * Accuracy trend across given number of days (7, 30, 90)
 */
export function getAccuracyTrend(days = 30) {
  const attempts = storage.getAllAttempts();
  const dailyMap = getDailyActivityMap(attempts);
  const data = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = formatDateKey(d);
    const day = dailyMap.get(key);

    const solved = day ? day.solvedCount : 0;
    const attempted = day ? day.attemptsCount : 0;
    const acc = attempted > 0 ? Math.round((solved / attempted) * 100) : (solved > 0 ? 100 : null);

    data.push({
      date: key,
      label: `${d.getMonth() + 1}/${d.getDate()}`,
      solved,
      attempted,
      accuracy: acc
    });
  }

  return data;
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

/**
 * Returns deterministic recommendations for the user:
 * 1. Incomplete lessons in active courses
 * 2. Unfinished cycle puzzles
 * 3. Review queue: recent failed attempts
 */
export function getRecommendations() {
  const courses = storage.getAllCourses();
  const allProgress = storage.getAllProgress();
  const attempts = storage.getAllAttempts();
  const activeCycle = storage.getActiveCycle();

  const recommendations = [];

  // Check active Woodpecker cycle
  if (activeCycle) {
    const completedIds = new Set(Object.keys(activeCycle.completedPuzzles || {}));
    const nextUnsolved = (activeCycle.puzzleIds || []).find(id => !completedIds.has(String(id)));
    if (nextUnsolved) {
      recommendations.push({
        type: 'woodpecker',
        title: `Continue ${activeCycle.name}`,
        subtitle: `Puzzle #${nextUnsolved}`,
        courseId: activeCycle.courseId,
        lessonId: String(nextUnsolved),
        priority: 1
      });
    }
  }

  // Check unfinished lessons in Woodpecker chapters
  for (const course of courses) {
    const prog = allProgress[course.id]?.completedLessons || {};
    for (const ch of course.chapters) {
      for (const les of ch.lessons) {
        if (!prog[les.id]?.solved) {
          recommendations.push({
            type: 'course',
            title: `Resume ${course.title}`,
            subtitle: `${ch.title} • ${les.title}`,
            courseId: course.id,
            chapterId: ch.id,
            lessonId: les.id,
            priority: 3
          });
          break;
        }
      }
      if (recommendations.some(r => r.courseId === course.id && r.type === 'course')) break;
    }
  }

  return recommendations;
}
