import React from 'react';
import { Zap, Play, Trash2, Plus } from 'lucide-react';

export default function WoodpeckerActiveCard({
  activeCycle,
  onResumeActive,
  onDeleteCycle,
  onStartDefaultCycle,
  onOpenCreateModal
}) {
  if (!activeCycle) {
    return (
      <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-8 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
          <Zap size={28} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">No Active Cycle</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
            Start your first cycle to systematically train tactical positions and measure your speed improvement!
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={onStartDefaultCycle}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all cursor-pointer"
          >
            <Zap size={16} />
            <span>Start Cycle 1 (Easy 1–222)</span>
          </button>
          <button
            onClick={onOpenCreateModal}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <Plus size={16} />
            <span>Custom Cycle</span>
          </button>
        </div>
      </div>
    );
  }

  const solved = Object.values(activeCycle.completedPuzzles || {}).filter((p) => p.isSolved).length;
  const total = activeCycle.puzzleIds.length;
  const pct = total > 0 ? Math.round((solved / total) * 100) : 0;

  return (
    <div className="bg-gradient-to-br from-[#12192c] to-[#0d1322] border-2 border-amber-500/40 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div className="space-y-4 max-w-xl">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-wider font-semibold">
              Active Cycle #{activeCycle.cycleNumber}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Started {new Date(activeCycle.startDate).toLocaleDateString()}
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{activeCycle.name}</h2>
            <p className="text-xs text-slate-400 mt-1">
              Target: Complete {activeCycle.puzzleIds.length} puzzles in {activeCycle.targetDays} days (~{activeCycle.targetDaily} puzzles/day).
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold">{solved} / {total} Solved</span>
              <span className="text-amber-400 font-bold">{pct}% Completed</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Actions for Active Cycle */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onResumeActive}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:brightness-110 transition-all group cursor-pointer"
          >
            <Play size={18} className="fill-current group-hover:scale-110 transition-transform" />
            <span>Continue Training</span>
          </button>

          <button
            onClick={() => onDeleteCycle(activeCycle.id)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 text-rose-300 hover:bg-rose-900/30 text-xs font-semibold transition-all cursor-pointer"
            title="Delete this cycle"
          >
            <Trash2 size={16} />
            <span>Delete Cycle</span>
          </button>
        </div>
      </div>
    </div>
  );
}
