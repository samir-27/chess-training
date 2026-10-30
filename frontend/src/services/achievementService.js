/**
 * Achievement Badges & Milestones Service
 */

import { storage } from './storageService.js';
import { getOverallStats } from './analyticsService.js';

export const ACHIEVEMENTS = [
  {
    id: 'first_blood',
    title: 'First Tactical Strike',
    description: 'Solve your very first chess puzzle correctly.',
    icon: 'Sword',
    tier: 'bronze'
  },
  {
    id: 'streak_3',
    title: 'Three-Day Momentum',
    description: 'Maintain a 3-day consecutive training streak.',
    icon: 'Flame',
    tier: 'bronze'
  },
  {
    id: 'streak_7',
    title: 'Week of Fire',
    description: 'Maintain an uninterrupted 7-day training streak.',
    icon: 'Flame',
    tier: 'silver'
  },
  {
    id: 'streak_30',
    title: 'Grandmaster Discipline',
    description: 'Maintain a 30-day training streak.',
    icon: 'Crown',
    tier: 'gold'
  },
  {
    id: 'century_club',
    title: 'Century Club',
    description: 'Successfully solve 100 tactical puzzles.',
    icon: 'Trophy',
    tier: 'bronze'
  },
  {
    id: 'half_k',
    title: 'Tactical Dynamo',
    description: 'Successfully solve 500 tactical puzzles.',
    icon: 'Award',
    tier: 'silver'
  },
  {
    id: 'woodpecker_starter',
    title: 'Woodpecker Initiate',
    description: 'Solve 25 puzzles in Woodpecker Training mode.',
    icon: 'Zap',
    tier: 'bronze'
  },
  {
    id: 'speed_demon',
    title: 'Lightning Reflexes',
    description: 'Solve a puzzle in under 5 seconds with zero mistakes.',
    icon: 'Zap',
    tier: 'silver'
  },
  {
    id: 'cycle_completed',
    title: 'Cycle Master',
    description: 'Complete an entire Woodpecker training cycle.',
    icon: 'RotateCw',
    tier: 'gold'
  }
];

/**
 * Checks for new achievements after an attempt
 * Returns array of newly unlocked achievement objects
 */
export function evaluateAchievements(latestAttempt = null) {
  const stats = getOverallStats();
  const unlocked = new Set(storage.getUnlockedAchievements().map(a => a.id));
  const newlyUnlocked = [];

  function check(id, condition) {
    if (!unlocked.has(id) && condition) {
      if (storage.unlockAchievement(id)) {
        const item = ACHIEVEMENTS.find(a => a.id === id);
        if (item) newlyUnlocked.push(item);
      }
    }
  }

  // 1. First puzzle
  check('first_blood', stats.overall.totalSolved >= 1);

  // 2. Streaks
  check('streak_3', stats.streaks.currentStreak >= 3);
  check('streak_7', stats.streaks.currentStreak >= 7);
  check('streak_30', stats.streaks.currentStreak >= 30);

  // 3. Total counts
  check('century_club', stats.overall.totalSolved >= 100);
  check('half_k', stats.overall.totalSolved >= 500);

  // 4. Woodpecker starter
  const cycles = storage.getAllCycles();
  const woodpeckerSolved = cycles.reduce((acc, c) => {
    return acc + Object.values(c.completedPuzzles || {}).filter(p => p.isSolved).length;
  }, 0);
  check('woodpecker_starter', woodpeckerSolved >= 25);

  // 5. Speed demon
  if (latestAttempt && latestAttempt.isSolved && latestAttempt.durationMs < 5000 && latestAttempt.mistakesCount === 0) {
    check('speed_demon', true);
  }

  // 6. Cycle completed
  check('cycle_completed', cycles.some(c => c.status === 'completed'));

  return newlyUnlocked;
}
