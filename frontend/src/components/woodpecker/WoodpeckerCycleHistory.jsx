import React from 'react';
import { Trash2, TrendingDown, TrendingUp, Calendar, Zap, CheckCircle2 } from 'lucide-react';

export default function WoodpeckerCycleHistory({
  cycles,
  cycleComparisons,
  activeCycleId,
  onSetActive,
  onDeleteCycle
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">Cycle History & Progress</h2>
          <p className="text-xs text-slate-400">Track how your average time per puzzle drops across cycles.</p>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-brand-border">
          {cycles.length} Cycles Logged
        </span>
      </div>

      {cycles.length === 0 ? (
        <div className="glass-card rounded-2xl p-8 text-center text-xs text-slate-400">
          Your historical Woodpecker cycles and speed comparisons will be recorded here.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cycleComparisons.map((item, idx) => {
            const prevItem = idx > 0 ? cycleComparisons[idx - 1] : null;
            const speedGained =
              prevItem && prevItem.avgTimeMs > 0 && item.avgTimeMs > 0
                ? Math.round(((prevItem.avgTimeMs - item.avgTimeMs) / prevItem.avgTimeMs) * 100)
                : null;

            const isCurrent = activeCycleId === item.id;

            return (
              <div
                key={item.id}
                className={`glass-card rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 ${
                  isCurrent
                    ? 'border-amber-500/60 ring-1 ring-amber-500/30 glow-amber'
                    : 'border-brand-border hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                      <Zap size={16} className={isCurrent ? 'text-amber-400' : 'text-slate-400'} />
                      <span>Cycle {item.number}</span>
                    </h3>
                    <span
                      className={`text-xs font-mono px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wide ${
                        item.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : isCurrent
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-slate-400">
                    700 Puzzles • Target: {item.targetDays || 28} Days
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-brand-border text-xs font-mono">
                    <div className="bg-brand-surface/60 p-2.5 rounded-xl border border-brand-border/60">
                      <div className="text-slate-400 text-xs">Solved</div>
                      <div className="text-white font-bold text-sm mt-0.5">{item.solvedCount} / {item.totalPuzzles}</div>
                    </div>
                    <div className="bg-brand-surface/60 p-2.5 rounded-xl border border-brand-border/60">
                      <div className="text-slate-400 text-xs">Accuracy</div>
                      <div className="text-amber-400 font-bold text-sm mt-0.5">{item.accuracy}%</div>
                    </div>
                    <div className="bg-brand-surface/60 p-2.5 rounded-xl border border-brand-border/60">
                      <div className="text-slate-400 text-xs">Avg Time</div>
                      <div className="text-slate-200 font-bold text-sm mt-0.5">
                        {item.avgTimeMs > 0 ? `${(item.avgTimeMs / 1000).toFixed(1)}s` : '—'}
                      </div>
                    </div>
                    <div className="bg-brand-surface/60 p-2.5 rounded-xl border border-brand-border/60">
                      <div className="text-slate-400 text-xs">Speed Change</div>
                      <div className="font-bold text-xs mt-0.5 flex items-center gap-1">
                        {speedGained !== null ? (
                          speedGained > 0 ? (
                            <span className="text-emerald-400 flex items-center gap-0.5">
                              <TrendingDown size={13} /> {speedGained}% faster
                            </span>
                          ) : (
                            <span className="text-rose-400 flex items-center gap-0.5">
                              <TrendingUp size={13} /> {Math.abs(speedGained)}% slower
                            </span>
                          )
                        ) : (
                          <span className="text-slate-400">Baseline</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-brand-border flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-xs flex items-center gap-1">
                    <Calendar size={13} className="text-slate-500" />
                    {new Date(item.startDate).toLocaleDateString()}
                  </span>

                  <div className="flex items-center gap-2">
                    {!isCurrent && (
                      <button
                        onClick={(e) => onSetActive(item.id, e)}
                        className="text-xs font-semibold text-slate-300 hover:text-amber-300 px-3 py-1.5 rounded-lg bg-slate-900 border border-brand-border hover:border-slate-700 active:scale-[0.98] transition-all cursor-pointer"
                      >
                        Activate
                      </button>
                    )}
                    <button
                      onClick={(e) => onDeleteCycle(item.id, e)}
                      className="text-slate-400 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-rose-950/20 active:scale-[0.98] cursor-pointer"
                      title="Delete Cycle"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
