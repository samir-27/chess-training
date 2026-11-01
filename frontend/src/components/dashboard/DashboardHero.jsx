import React from 'react';
import { Sparkles, Target, Flame, Clock, Play } from 'lucide-react';

export default function DashboardHero({
  stats,
  formatDuration,
  onResumeClick
}) {
  return (
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
            onClick={onResumeClick}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 hover:brightness-110 transition-all group"
          >
            <Play size={20} className="fill-current group-hover:scale-110 transition-transform" />
            <span>Resume Woodpecker</span>
          </button>
        </div>
      </div>
    </div>
  );
}
