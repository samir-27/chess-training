/**
 * Centralized, versioned LocalStorage persistence service
 * Manages courses, user progress, puzzle attempts, Woodpecker cycles, settings, and achievements.
 */

import woodpeckerCourseData from '../data/woodpeckerCourse.json' with { type: 'json' };
import { soundManager } from './audioService.js';

const STORAGE_PREFIX = 'chess_trainer_v1_';
const KEYS = {
  COURSES: `${STORAGE_PREFIX}courses`,
  PROGRESS: `${STORAGE_PREFIX}progress`,
  ATTEMPTS: `${STORAGE_PREFIX}attempts`,
  CYCLES: `${STORAGE_PREFIX}woodpecker_cycles`,
  SETTINGS: `${STORAGE_PREFIX}settings`,
  ACHIEVEMENTS: `${STORAGE_PREFIX}achievements`
};

export const DEFAULT_SETTINGS = {
  dailyGoal: 20,
  soundEnabled: true,
  soundVolume: 0.6,
  boardTheme: 'classic-wood', // 'classic-wood' | 'midnight-blue' | 'emerald' | 'slate' | 'coral'
  pieceTheme: 'standard',
  autoAdvance: true,
  autoAdvanceDelay: 1000,
  showCoordinates: true,
  celebrationAnimations: true,
  hapticFeedback: false
};

class StorageService {
  constructor() {
    this.memoryStorage = new Map();
    this.listeners = new Set();
    this.ensureInitialized();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(cb => {
      try { cb(); } catch (e) { console.error('Storage listener error:', e); }
    });
  }

  getJson(key, defaultValue = null) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(key);
        if (!raw) return defaultValue;
        return JSON.parse(raw);
      } else {
        if (!this.memoryStorage.has(key)) return defaultValue;
        return JSON.parse(this.memoryStorage.get(key));
      }
    } catch (e) {
      console.warn(`Error reading key ${key} from storage:`, e);
      return defaultValue;
    }
  }

  setJson(key, value) {
    try {
      const serialized = JSON.stringify(value);
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, serialized);
      } else {
        this.memoryStorage.set(key, serialized);
      }
      this.notify();
    } catch (e) {
      console.error(`Error saving key ${key} to storage:`, e);
    }
  }

  ensureInitialized() {

    // Initialize Settings if not present
    if (!this.getJson(KEYS.SETTINGS)) {
      this.setJson(KEYS.SETTINGS, DEFAULT_SETTINGS);
    }
    const currentSettings = this.getSettings();
    soundManager.setSettings(currentSettings.soundEnabled, currentSettings.soundVolume);

    // Initialize Courses with Woodpecker Master Course if empty
    const courses = this.getJson(KEYS.COURSES, {});
    if (!courses[woodpeckerCourseData.id]) {
      courses[woodpeckerCourseData.id] = woodpeckerCourseData;
      this.setJson(KEYS.COURSES, courses);
    }

    // Start First Woodpecker Cycle by default if no cycles exist
    const cycles = this.getJson(KEYS.CYCLES, []);
    if (cycles.length === 0 && woodpeckerCourseData?.chapters?.[0]) {
      const easyPuzzles = woodpeckerCourseData.chapters[0].lessons.map(l => l.id);
      const defaultCycle = {
        id: `cycle-1-default`,
        cycleNumber: 1,
        courseId: woodpeckerCourseData.id,
        name: 'Cycle 1: Easy Exercises (1–222)',
        puzzleFilter: 'easy',
        targetDays: 28,
        targetDaily: Math.ceil(easyPuzzles.length / 28),
        puzzleIds: easyPuzzles,
        status: 'active',
        startDate: new Date().toISOString(),
        completedDate: null,
        completedPuzzles: {},
        totalTimeMs: 0
      };
      this.setJson(KEYS.CYCLES, [defaultCycle]);
    }
  }

  // --- SETTINGS ---
  getSettings() {
    return { ...DEFAULT_SETTINGS, ...(this.getJson(KEYS.SETTINGS, {}) || {}) };
  }

  updateSettings(partial) {
    const updated = { ...this.getSettings(), ...partial };
    this.setJson(KEYS.SETTINGS, updated);
    soundManager.setSettings(updated.soundEnabled, updated.soundVolume);
    return updated;
  }

  // --- COURSES ---
  getAllCourses() {
    const map = this.getJson(KEYS.COURSES, {});
    return Object.values(map);
  }

  getCourseById(courseId) {
    const map = this.getJson(KEYS.COURSES, {});
    return map[courseId] || null;
  }

  saveCourse(course) {
    if (!course || !course.id) return null;
    const map = this.getJson(KEYS.COURSES, {});
    map[course.id] = course;
    this.setJson(KEYS.COURSES, map);
    return course;
  }

  deleteCourse(courseId) {
    const map = this.getJson(KEYS.COURSES, {});
    if (map[courseId]) {
      delete map[courseId];
      this.setJson(KEYS.COURSES, map);
      return true;
    }
    return false;
  }

  // --- PROGRESS ---
  getAllProgress() {
    return this.getJson(KEYS.PROGRESS, {}) || {};
  }

  getCourseProgress(courseId) {
    const all = this.getAllProgress();
    return all[courseId] || {
      completedLessons: {},
      lastLessonId: null,
      currentChapterId: null,
      updatedAt: null
    };
  }

  /**
   * Records a puzzle attempt and updates overall course progress
   */
  recordAttempt({
    courseId,
    chapterId,
    lessonId,
    isSolved,
    durationMs = 0,
    mistakesCount = 0,
    hintsUsed = 0,
    cycleId = null
  }) {
    const timestamp = new Date().toISOString();
    const attemptId = `att-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

    // 1. Record Attempt Record
    const attempt = {
      id: attemptId,
      courseId,
      chapterId,
      lessonId,
      isSolved: Boolean(isSolved),
      durationMs: Math.max(0, durationMs),
      mistakesCount: Math.max(0, mistakesCount),
      hintsUsed: Math.max(0, hintsUsed),
      cycleId,
      timestamp
    };

    const attempts = this.getJson(KEYS.ATTEMPTS, []);
    attempts.push(attempt);
    // Keep last 10,000 attempts for performant storage
    if (attempts.length > 10000) {
      attempts.splice(0, attempts.length - 10000);
    }
    this.setJson(KEYS.ATTEMPTS, attempts);

    // 2. Update Course Progress
    const allProgress = this.getAllProgress();
    if (!allProgress[courseId]) {
      allProgress[courseId] = {
        completedLessons: {},
        lastLessonId: null,
        currentChapterId: null,
        updatedAt: null
      };
    }

    const cProg = allProgress[courseId];
    cProg.lastLessonId = lessonId;
    cProg.currentChapterId = chapterId;
    cProg.updatedAt = timestamp;

    const prevLes = cProg.completedLessons[lessonId] || {
      solved: false,
      attemptsCount: 0,
      bestTimeMs: null,
      lastTrained: null
    };

    prevLes.attemptsCount += 1;
    prevLes.lastTrained = timestamp;
    if (isSolved) {
      prevLes.solved = true;
      if (!prevLes.bestTimeMs || durationMs < prevLes.bestTimeMs) {
        prevLes.bestTimeMs = durationMs;
      }
    }
    cProg.completedLessons[lessonId] = prevLes;
    this.setJson(KEYS.PROGRESS, allProgress);

    // 3. Update Woodpecker Cycle if attempt belongs to an active cycle
    if (cycleId) {
      this.recordCycleAttempt(cycleId, lessonId, isSolved, durationMs);
    }

    return attempt;
  }

  // --- WOODPECKER CYCLES ---
  getAllCycles() {
    return this.getJson(KEYS.CYCLES, []) || [];
  }

  getActiveCycle() {
    const cycles = this.getAllCycles();
    return cycles.find(c => c.status === 'active') || null;
  }

  createCycle({
    courseId = woodpeckerCourseData.id,
    name = 'Woodpecker Cycle 1',
    puzzleFilter = 'all', // 'all' | 'easy' | 'intermediate' | 'advanced' | 'custom'
    targetDays = 28,
    targetDaily = 40,
    puzzleIds = []
  }) {
    const cycles = this.getAllCycles();

    // Mark any current active cycle as paused
    cycles.forEach(c => {
      if (c.status === 'active') c.status = 'paused';
    });

    const cycleNumber = cycles.length + 1;
    const newCycle = {
      id: `cycle-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      cycleNumber,
      courseId,
      name: name || `Cycle ${cycleNumber}`,
      puzzleFilter,
      targetDays: Number(targetDays) || 28,
      targetDaily: Number(targetDaily) || 40,
      puzzleIds: Array.isArray(puzzleIds) ? puzzleIds : [],
      status: 'active',
      startDate: new Date().toISOString(),
      completedDate: null,
      completedPuzzles: {}, // map: { [puzzleId]: { isSolved, durationMs, timestamp } }
      totalTimeMs: 0
    };

    cycles.push(newCycle);
    this.setJson(KEYS.CYCLES, cycles);
    return newCycle;
  }

  recordCycleAttempt(cycleId, puzzleId, isSolved, durationMs) {
    const cycles = this.getAllCycles();
    const cycle = cycles.find(c => c.id === cycleId);
    if (!cycle) return;

    if (!cycle.completedPuzzles) cycle.completedPuzzles = {};
    cycle.completedPuzzles[puzzleId] = {
      isSolved: Boolean(isSolved),
      durationMs,
      timestamp: new Date().toISOString()
    };
    cycle.totalTimeMs = (cycle.totalTimeMs || 0) + durationMs;

    // Check if cycle is complete
    const totalRequired = cycle.puzzleIds.length;
    const solvedCount = Object.values(cycle.completedPuzzles).filter(p => p.isSolved).length;
    if (totalRequired > 0 && solvedCount >= totalRequired) {
      cycle.status = 'completed';
      cycle.completedDate = new Date().toISOString();
    }

    this.setJson(KEYS.CYCLES, cycles);
  }

  updateCycleStatus(cycleId, status) {
    const cycles = this.getAllCycles();
    const cycle = cycles.find(c => c.id === cycleId);
    if (!cycle) return null;
    cycle.status = status;
    if (status === 'completed' && !cycle.completedDate) {
      cycle.completedDate = new Date().toISOString();
    }
    this.setJson(KEYS.CYCLES, cycles);
    return cycle;
  }

  deleteCycle(cycleId) {
    let cycles = this.getAllCycles();
    const cycleToDelete = cycles.find(c => c.id === cycleId);
    cycles = cycles.filter(c => c.id !== cycleId);

    // If active cycle was deleted and there are remaining cycles, activate the latest one
    if (cycleToDelete?.status === 'active' && cycles.length > 0) {
      cycles[cycles.length - 1].status = 'active';
    }

    this.setJson(KEYS.CYCLES, cycles);
    return true;
  }

  startDefaultCycle() {
    if (woodpeckerCourseData?.chapters?.[0]) {
      const easyPuzzles = woodpeckerCourseData.chapters[0].lessons.map(l => l.id);
      return this.createCycle({
        courseId: woodpeckerCourseData.id,
        name: 'Cycle 1: Easy Exercises (1–222)',
        puzzleFilter: 'easy',
        targetDays: 28,
        targetDaily: Math.ceil(easyPuzzles.length / 28),
        puzzleIds: easyPuzzles
      });
    }
    return null;
  }

  // --- RAW ATTEMPTS ---
  getAllAttempts() {
    return this.getJson(KEYS.ATTEMPTS, []) || [];
  }

  // --- ACHIEVEMENTS ---
  getUnlockedAchievements() {
    return this.getJson(KEYS.ACHIEVEMENTS, []) || [];
  }

  unlockAchievement(id) {
    const list = this.getUnlockedAchievements();
    if (!list.some(a => a.id === id)) {
      list.push({ id, unlockedAt: new Date().toISOString() });
      this.setJson(KEYS.ACHIEVEMENTS, list);
      return true;
    }
    return false;
  }

  // --- BACKUP & RESTORE ---
  exportBackup() {
    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      courses: this.getJson(KEYS.COURSES, {}),
      progress: this.getJson(KEYS.PROGRESS, {}),
      attempts: this.getJson(KEYS.ATTEMPTS, []),
      cycles: this.getJson(KEYS.CYCLES, []),
      settings: this.getJson(KEYS.SETTINGS, DEFAULT_SETTINGS),
      achievements: this.getJson(KEYS.ACHIEVEMENTS, [])
    };
  }

  restoreBackup(backupData) {
    if (!backupData || typeof backupData !== 'object') {
      throw new Error('Invalid backup data format');
    }
    if (backupData.courses) this.setJson(KEYS.COURSES, backupData.courses);
    if (backupData.progress) this.setJson(KEYS.PROGRESS, backupData.progress);
    if (backupData.attempts) this.setJson(KEYS.ATTEMPTS, backupData.attempts);
    if (backupData.cycles) this.setJson(KEYS.CYCLES, backupData.cycles);
    if (backupData.settings) this.setJson(KEYS.SETTINGS, backupData.settings);
    if (backupData.achievements) this.setJson(KEYS.ACHIEVEMENTS, backupData.achievements);
    return true;
  }

  clearAllData() {
    this.memoryStorage.clear();
    if (typeof window !== 'undefined' && window.localStorage) {
      Object.values(KEYS).forEach(k => localStorage.removeItem(k));
    }
    this.ensureInitialized();
  }
}

export const storage = new StorageService();
