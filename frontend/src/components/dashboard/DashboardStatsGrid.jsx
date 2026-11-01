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
  );
}
