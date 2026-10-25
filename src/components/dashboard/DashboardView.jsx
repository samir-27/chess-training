import React, { useState, useEffect, useMemo } from 'react';
import {
  Flame,
  Target,
  Trophy,
  Clock,
  Play,
  BookOpen,
  Zap,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Calendar,
  Layers,
  Award
} from 'lucide-react';
import { storage } from '../../services/storageService.js';
import { getOverallStats, getRecommendations } from '../../services/analyticsService.js';

export default function DashboardView({
  onSelectCourse,
  onStartTraining,
  onNavigateWoodpecker,
  onNavigateLibrary
}) {
  const [stats, setStats] = useState(() => getOverallStats());
  const [recommendations, setRecommendations] = useState(() => getRecommendations());
  const [courses, setCourses] = useState(() => storage.getAllCourses());
  const [allProgress, setAllProgress] = useState(() => storage.getAllProgress());

  const refreshDashboard = () => {
    setStats(getOverallStats());
    setRecommendations(getRecommendations());
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
          if (les) return { course, chapter: ch, lesson: les, cycleId: stats.activeCycle.id, label: stats.activeCycle.name };
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
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Hero Banner: What Should I Train Today? */}
      <div className="bg-gradient-to-br from-[#12192d] via-[#0e1424] to-[#0a0e19] border border-amber-500/30 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow flare */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Personalized Tactical Regimen</span>
            </div>

            <h1 className="text-2xl lg:text-4xl font-extrabold text-white tracking-tight">
              Ready to Sharpen Your Calculation?
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              {stats.activeCycle
                ? `You're currently in ${stats.activeCycle.name}. Keep up the momentum to halve your tactical response time.`
                : 'Solve daily tactical puzzles to build subconscious pattern recognition and reduce blunders in your practical games.'}
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

          {/* Primary Call-to-Action */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleResumeClick}
              disabled={!resumeTarget}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 hover:brightness-110 transition-all group disabled:opacity-50"
            >
              <Play size={20} className="fill-current group-hover:scale-110 transition-transform" />
              <span>Continue Training</span>
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
            <span>Accuracy</span>
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
            <span>Woodpecker</span>
            <Zap size={18} className="text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {stats.activeCycle ? `Cycle #${stats.activeCycle.cycleNumber}` : 'Ready'}
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-1">
            {stats.activeCycle ? `${Object.keys(stats.activeCycle.completedPuzzles || {}).length} solved` : 'Start a cycle'}
          </div>
        </div>

      </div>

      {/* Grid: Recommended Daily Action & Resume Position */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Smart Recommendations (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Recommended Daily Tasks
            </h2>
            <span className="text-xs font-mono text-slate-500">Deterministic Guidance</span>
          </div>

          <div className="space-y-3">
            {recommendations.length === 0 ? (
              <div className="bg-[#111728] border border-slate-800/80 rounded-2xl p-6 text-center text-xs text-slate-400">
                No incomplete tasks pending! Explore your course library to begin a new study module.
              </div>
            ) : (
              recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const course = storage.getCourseById(rec.courseId);
                    if (course) {
                      const ch = course.chapters.find(c => c.id === rec.chapterId) || course.chapters[0];
                      const les = ch?.lessons.find(l => l.id === rec.lessonId) || ch?.lessons[0];
                      if (les) onStartTraining({ course, chapter: ch, lesson: les });
                    }
                  }}
                  className="bg-[#111728] border border-slate-800/80 hover:border-slate-700 rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all hover:-translate-y-0.5 group shadow-lg"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 rounded-xl border ${
                      rec.type === 'woodpecker'
                        ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    }`}>
                      {rec.type === 'woodpecker' ? <Zap size={18} /> : <BookOpen size={18} />}
                    </div>

                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                        {rec.title}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{rec.subtitle}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 group-hover:text-white">
                    <span>Train</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Active Woodpecker Quick Card (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Woodpecker Status
            </h2>
            <button
              onClick={onNavigateWoodpecker}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300"
            >
              Manage Cycles
            </button>
          </div>

          <div className="bg-[#111728] border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
            {stats.activeCycle ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                    {stats.activeCycle.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                    Active
                  </span>
                </div>

                {(() => {
                  const solved = Object.values(stats.activeCycle.completedPuzzles || {}).filter(p => p.isSolved).length;
                  const total = stats.activeCycle.puzzleIds.length;
                  const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
                  return (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">Puzzles Solved</span>
                        <span className="text-white font-bold">{solved} / {total}</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })()}

                <button
                  onClick={onNavigateWoodpecker}
                  className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 text-xs font-semibold transition-all"
                >
                  View Cycle Details
                </button>
              </>
            ) : (
              <div className="text-center py-4 space-y-3">
                <Zap size={28} className="text-amber-400 mx-auto" />
                <div className="text-xs text-slate-400">
                  No active Woodpecker cycle. Launch Cycle 1 to track speed halving!
                </div>
                <button
                  onClick={onNavigateWoodpecker}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
                >
                  Configure Cycle
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Woodpecker Chapters Overview Strip */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Woodpecker Chapters</h2>
            <p className="text-xs text-slate-400">1,131 exercises organized by Grandmasters Axel Smith & Hans Tikkanen.</p>
          </div>
          <button
            onClick={onNavigateLibrary}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300"
          >
            Browse Chapters & Exercises
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {(() => {
            const woodpecker = storage.getCourseById('course-woodpecker-method') || courses[0];
            if (!woodpecker?.chapters) return null;

            return woodpecker.chapters.map(ch => {
              const prog = allProgress[woodpecker.id]?.completedLessons || {};
              const total = ch.lessons?.length || 0;
              const solved = ch.lessons.filter(l => prog[l.id]?.solved).length;
              const pct = total > 0 ? Math.round((solved / total) * 100) : 0;

              return (
                <div
                  key={ch.id}
                  onClick={() => {
                    const firstUnsolved = ch.lessons.find(l => !prog[l.id]?.solved) || ch.lessons[0];
                    if (firstUnsolved) {
                      onStartTraining({ course: woodpecker, chapter: ch, lesson: firstUnsolved });
                    }
                  }}
                  className="bg-[#111728] border border-slate-800/80 hover:border-slate-700 rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-0.5 group shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400 font-bold">
                        {ch.title.split(' ')[0]} Section
                      </span>
                      <span className="text-xs font-mono text-slate-500">{total} Puzzles</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                      {ch.title}
                    </h3>
                    <div className="text-xs text-slate-400 mt-1 mb-4 line-clamp-2">
                      {ch.description}
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-800/60">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-400">{solved} / {total} Complete</span>
                      <span className="text-amber-400 font-bold">{pct}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>

    </div>
  );
}
