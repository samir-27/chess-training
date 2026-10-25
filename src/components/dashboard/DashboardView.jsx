import React, { useState, useEffect, useMemo } from 'react';
import {
  Flame,
  Target,
  Trophy,
  Clock,
  Play,
  Zap,
  Activity,
  BarChart3,
  ArrowRight,
  Sparkles,
  Calendar
} from 'lucide-react';
import { storage } from '../../services/storageService.js';
import { getOverallStats } from '../../services/analyticsService.js';

export default function DashboardView({
  onStartTraining,
  onNavigateWoodpecker,
  onNavigateAnalysis,
  onNavigateAnalytics
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
      <div className="bg-gradient-to-br from-[#12192d] via-[#0e1424] to-[#0a0e19] border border-amber-500/30 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Chess Wizards Hub</span>
            </div>

            <h1 className="text-2xl lg:text-4xl font-extrabold text-white tracking-tight">
              Ready to Sharpen Your Calculation?
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              {stats.activeCycle
                ? `You're currently in ${stats.activeCycle.name}. Keep solving to halve your tactical response time.`
                : 'Accelerate your pattern recognition with the Woodpecker Method, analyze your games, and track consistency.'}
            </p>

            {/* Quick Today Progress Strip */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <Target size={15} className="text-amber-400" />
                <span>Today: <strong className="text-white">{stats.today.solved} / {stats.today.goal}</strong> Solved</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-2 text-slate-300">
                <Flame size={15} className="text-amber-500" />
                <span>Streak: <strong className="text-amber-400">{stats.streaks.currentStreak} Days</strong></span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock size={15} className="text-emerald-400" />
                <span>Trained: <strong className="text-white">{formatDuration(stats.today.timeMs)}</strong></span>
              </div>
            </div>
          </div>

          {/* Direct Resume Action */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleResumeClick}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 hover:brightness-110 transition-all group"
            >
              <Play size={20} className="fill-current group-hover:scale-110 transition-transform" />
              <span>Resume Woodpecker</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#111728] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Daily Streak</span>
            <Flame size={18} className="text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {stats.streaks.currentStreak} <span className="text-xs text-slate-500 font-normal">Days</span>
          </div>
          <div className="text-[11px] text-amber-500/80 font-mono mt-1">
            Personal best: {stats.streaks.longestStreak}
          </div>
        </div>

        <div className="bg-[#111728] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Daily Goal</span>
            <Target size={18} className="text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {stats.today.percent}%
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-1">
            {stats.today.solved} of {stats.today.goal} solved
          </div>
        </div>

        <div className="bg-[#111728] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Solving Accuracy</span>
            <Trophy size={18} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {stats.overall.accuracy}%
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-1">
            {stats.overall.totalSolved} total solved
          </div>
        </div>

        <div className="bg-[#111728] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Woodpecker Cycle</span>
            <Zap size={18} className="text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {stats.activeCycle ? `Cycle #${stats.activeCycle.cycleNumber}` : 'Ready'}
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-1">
            {stats.activeCycle ? `${solvedCyclePuzzles} / ${totalCyclePuzzles} (${cyclePercent}%)` : 'Ready to start'}
          </div>
        </div>
      </div>

      {/* Primary 3 Direct Action Hub: Woodpecker | Game Analysis | Analytics */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Quick Actions</h2>
            <p className="text-xs text-slate-400">Directly resume training, analyze a game, or review statistics.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Action 1: Resume Woodpecker Method */}
          <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-amber-500/40 transition-all space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <Zap size={24} />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">The Woodpecker Method</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {stats.activeCycle
                  ? `Active: ${stats.activeCycle.name} • ${solvedCyclePuzzles}/${totalCyclePuzzles} puzzles solved (${cyclePercent}%).`
                  : 'Spaced repetition tactical mastery. Halve your solving time with every cycle iteration to build subconscious reflexes.'}
              </p>
            </div>

            <button
              onClick={handleResumeClick}
              className="flex items-center justify-between w-full px-4 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all"
            >
              <span>{stats.activeCycle ? 'Resume Active Cycle' : 'Start Woodpecker Cycle'}</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Action 2: Game Analysis */}
          <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-sky-500/40 transition-all space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                <Activity size={24} />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">Game Analysis & Review</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Paste any chess PGN to review move-by-move accuracy, multi-PV engine candidate lines, and blunder classification powered by Lichess Cloud API.
              </p>
            </div>

            <button
              onClick={onNavigateAnalysis}
              className="flex items-center justify-between w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-sky-300 hover:text-white hover:border-sky-500/40 font-bold text-xs transition-all"
            >
              <span>Analyze Game PGN</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Action 3: Analytics & Heatmap */}
          <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-emerald-500/40 transition-all space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">Analytics & Heatmap</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Inspect your GitHub-style activity contribution calendar, training streaks, accuracy progression curves, and tactical volume history.
              </p>
            </div>

            <button
              onClick={onNavigateAnalytics}
              className="flex items-center justify-between w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-emerald-300 hover:text-white hover:border-emerald-500/40 font-bold text-xs transition-all"
            >
              <span>View Analytics & Streaks</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
