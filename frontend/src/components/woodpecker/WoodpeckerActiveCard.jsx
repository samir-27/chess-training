import React from 'react';
import { Zap, Play, Trash2, Plus, CheckCircle2, RotateCw, Calendar, Target } from 'lucide-react';

export default function WoodpeckerActiveCard({
  activeCycle,
  onResumeActive,
  onDeleteCycle,
  onStartDefaultCycle,
  onStartNextCycle,
  onOpenCreateModal
}) {
  if (!activeCycle) {
    return (
      <div className="glass-card rounded-3xl p-8 lg:p-10 text-center space-y-5 relative overflow-hidden border border-brand-border">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/5">
          <Zap size={30} />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-xl font-bold text-white tracking-tight">No Active Training Cycle</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Start your first cycle to systematically train all 700 tactical positions and measure your speed halving progress!
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onStartDefaultCycle}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Zap size={16} />
            <span>Start Cycle 1</span>
          </button>
          <button
            onClick={onOpenCreateModal}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-surface-card border border-brand-border text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold active:scale-[0.98] transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Configure Custom Window</span>
          </button>
        </div>
      </div>
    );
  }

  const total = activeCycle.puzzleIds?.length || 700;
  const solved = Object.values(activeCycle.completedPuzzles || {}).filter((p) => p.isSolved).length;
  const isComplete = solved >= total || activeCycle.status === 'completed';
  const pct = total > 0 ? Math.min(100, Math.round((solved / total) * 100)) : 0;
  const remaining = Math.max(0, total - solved);

  return (
    <div className="glass-panel border-2 border-amber-500/40 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
      {/* Background radiant ambient glow */}
      <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div className="space-y-4 max-w-xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Cycle {activeCycle.cycleNumber}
            </h2>
            <span
              className={`text-xs font-mono px-3 py-1 rounded-full uppercase font-bold tracking-wide ${
                isComplete
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              {isComplete ? 'Completed' : 'Active'}
            </span>
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <Calendar size={13} className="text-slate-500" />
              Started {new Date(activeCycle.startDate).toLocaleDateString()}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {isComplete
              ? `Incredible achievement! You have solved all ${total} puzzles in this cycle.`
              : `Target: Complete all ${total} puzzles in ${activeCycle.targetDays} days (~${activeCycle.targetDaily || Math.ceil(total / activeCycle.targetDays)} puzzles/day).`}
          </p>

          {/* Progress Bar & Numerical Metrics */}
          <div className="space-y-2.5 pt-1">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">{solved} / {total} Solved</span>
                {!isComplete && (
                  <span className="text-slate-400 font-normal">({remaining} remaining)</span>
                )}
              </div>
              <span className={`font-bold ${isComplete ? 'text-emerald-400' : 'text-amber-400'}`}>
                {pct}% Completed
              </span>
            </div>
            <div className="w-full bg-slate-900/90 h-3 rounded-full overflow-hidden border border-brand-border">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isComplete
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                    : 'bg-gradient-to-r from-amber-500 to-amber-400'
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Actions for Active Cycle */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {isComplete ? (
            <button
              onClick={onStartNextCycle}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 hover:brightness-110 active:scale-[0.98] transition-all group cursor-pointer"
            >
              <RotateCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
              <span>Start Cycle #{activeCycle.cycleNumber + 1} (Halve Time)</span>
            </button>
          ) : (
            <button
              onClick={onResumeActive}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-[0.98] transition-all group cursor-pointer"
            >
              <Play size={18} className="fill-current group-hover:scale-110 transition-transform" />
              <span>Continue Training</span>
            </button>
          )}

          <button
            onClick={() => onDeleteCycle(activeCycle.id)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 text-rose-300 hover:bg-rose-900/30 text-xs font-semibold active:scale-[0.98] transition-all cursor-pointer"
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
