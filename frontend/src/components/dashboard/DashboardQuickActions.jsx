import React from 'react';
import { Zap, Activity, ArrowRight } from 'lucide-react';

export default function DashboardQuickActions({
  stats,
  solvedCyclePuzzles,
  totalCyclePuzzles,
  cyclePercent,
  onResumeClick,
  onNavigateAnalysis
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">Quick Actions</h2>
          <p className="text-xs text-slate-400">Directly resume training or analyze a game.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            onClick={onResumeClick}
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
              Paste any chess PGN or Chess.com game to review move-by-move accuracy, a Stockfish principal variation, and blunder classifications.
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
      </div>
    </div>
  );
}
