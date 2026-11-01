import React, { useState, useEffect, useMemo } from 'react';
import { storage } from '../../services/storageService.js';
import { getOverallStats } from '../../services/trainingStatsService.js';
import DashboardHero from './DashboardHero.jsx';
import DashboardStatsGrid from './DashboardStatsGrid.jsx';
import DashboardQuickActions from './DashboardQuickActions.jsx';

export default function DashboardView({
  onStartTraining,
  onNavigateWoodpecker,
  onNavigateAnalysis
}) {
  const [stats, setStats] = useState(() => getOverallStats());
  const [courses, setCourses] = useState(() => storage.getAllCourses());
  const [allProgress, setAllProgress] = useState(() => storage.getAllProgress());

  const refreshDashboard = () => {
    setStats(getOverallStats());
    setCourses(storage.getAllCourses());
    setAllProgress(storage.getAllProgress());
  };

  useEffect(() => {
    return storage.subscribe(refreshDashboard);
  }, []);

  const formatDuration = (ms) => {
    if (!ms || ms <= 0) return '0 min';
    const totalMinutes = Math.round(ms / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  // Find most recent or resume-ready lesson
  const resumeTarget = useMemo(() => {
    if (stats.activeCycle) {
      const course = storage.getCourseById(stats.activeCycle.courseId);
      if (course) {
        const completedSet = new Set(Object.keys(stats.activeCycle.completedPuzzles || {}));
        const nextId = stats.activeCycle.puzzleIds.find(id => !completedSet.has(String(id))) || stats.activeCycle.puzzleIds[0];
        for (const ch of course.chapters) {
          const les = ch.lessons.find(l => String(l.id) === String(nextId));
          if (les) {
            return { course, chapter: ch, lesson: les, cycleId: stats.activeCycle.id, label: stats.activeCycle.name };
          }
        }
      }
    }

    // Default to first course
    const woodpecker = storage.getCourseById('course-woodpecker-method') || courses[0];
    if (woodpecker && woodpecker.chapters[0]?.lessons[0]) {
      const prog = allProgress[woodpecker.id];
      for (const ch of woodpecker.chapters) {
        for (const les of ch.lessons) {
          if (!prog?.completedLessons?.[les.id]?.solved) {
            return { course: woodpecker, chapter: ch, lesson: les, label: 'The Woodpecker Method' };
          }
        }
      }
      return { course: woodpecker, chapter: woodpecker.chapters[0], lesson: woodpecker.chapters[0].lessons[0], label: woodpecker.title };
    }

    return null;
  }, [stats.activeCycle, courses, allProgress]);

  const handleResumeClick = () => {
    if (resumeTarget) {
      onStartTraining(resumeTarget);
    } else {
      onNavigateWoodpecker();
    }
  };

  const solvedCyclePuzzles = stats.activeCycle
    ? Object.values(stats.activeCycle.completedPuzzles || {}).filter(p => p.isSolved).length
    : 0;
  const totalCyclePuzzles = stats.activeCycle?.puzzleIds?.length || 0;
  const cyclePercent = totalCyclePuzzles > 0 ? Math.round((solvedCyclePuzzles / totalCyclePuzzles) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Top Hero Banner */}
      <DashboardHero
        stats={stats}
        formatDuration={formatDuration}
        onResumeClick={handleResumeClick}
      />

      {/* KPI Stats Bar */}
      <DashboardStatsGrid
        stats={stats}
        solvedCyclePuzzles={solvedCyclePuzzles}
        totalCyclePuzzles={totalCyclePuzzles}
        cyclePercent={cyclePercent}
      />

      {/* Primary 2 Direct Action Hub: Woodpecker | Game Analysis */}
      <DashboardQuickActions
        stats={stats}
        solvedCyclePuzzles={solvedCyclePuzzles}
        totalCyclePuzzles={totalCyclePuzzles}
        cyclePercent={cyclePercent}
        onResumeClick={handleResumeClick}
        onNavigateAnalysis={onNavigateAnalysis}
      />
    </div>
  );
}
