import React from 'react';
import { Flame, Target, Trophy, Zap } from 'lucide-react';

export default function DashboardStatsGrid({
  stats,
  solvedCyclePuzzles,
  totalCyclePuzzles,
  cyclePercent
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* 1. Streak */}
      <div className="glass-card rounded-2xl p-5 shadow-xl space-y-2">
        <div className="flex items-center justify-between text-slate-400 text-xs">
          <span className="font-medium">Daily Streak</span>
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Flame size={16} />
          </span>
        </div>
        <div className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          {stats.streaks.currentStreak} <span className="text-xs text-slate-400 font-normal">Days</span>
        </div>
        <div className="text-xs text-amber-400/90 font-mono">
          Personal best: {stats.streaks.longestStreak} days
        </div>
      </div>

      {/* 2. Daily Goal */}
      <div className="glass-card rounded-2xl p-5 shadow-xl space-y-2">
        <div className="flex items-center justify-between text-slate-400 text-xs">
          <span className="font-medium">Daily Goal</span>
          <span className="p-2 rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/20">
            <Target size={16} />
          </span>
        </div>
        <div className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          {stats.today.percent}%
        </div>
        <div className="text-xs text-slate-400 font-mono">
          {stats.today.solved} of {stats.today.goal} solved
        </div>
      </div>

      {/* 3. Accuracy */}
      <div className="glass-card rounded-2xl p-5 shadow-xl space-y-2">
        <div className="flex items-center justify-between text-slate-400 text-xs">
          <span className="font-medium">Solving Accuracy</span>
          <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Trophy size={16} />
          </span>
        </div>
        <div className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          {stats.overall.accuracy}%
        </div>
        <div className="text-xs text-slate-400 font-mono">
          {stats.overall.totalSolved} total solved
        </div>
      </div>

      {/* 4. Current Cycle */}
      <div className="glass-card rounded-2xl p-5 shadow-xl space-y-2">
        <div className="flex items-center justify-between text-slate-400 text-xs">
          <span className="font-medium">Woodpecker Cycle</span>
          <span className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Zap size={16} />
          </span>
        </div>
        <div className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          {stats.activeCycle ? `Cycle #${stats.activeCycle.cycleNumber}` : 'Ready'}
        </div>
        <div className="text-xs text-slate-400 font-mono">
          {stats.activeCycle ? `${solvedCyclePuzzles} / ${totalCyclePuzzles} (${cyclePercent}%)` : 'Ready to start'}
        </div>
      </div>
    </div>
  );
}
