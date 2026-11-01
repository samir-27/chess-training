import React from 'react';
import { Trash2, TrendingDown, TrendingUp } from 'lucide-react';

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
        <span className="text-xs font-mono text-slate-500">{cycles.length} Cycles Logged</span>
      </div>

      {cycles.length === 0 ? (
        <div className="bg-[#111728] border border-slate-800/60 rounded-2xl p-6 text-center text-xs text-slate-500">
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
                className={`bg-[#111728] border rounded-2xl p-6 flex flex-col justify-between transition-all shadow-xl ${
                  isCurrent ? 'border-amber-500/50 ring-1 ring-amber-500/30' : 'border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                      Cycle {item.number}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
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

                  <h3 className="text-base font-bold text-white tracking-tight">{item.name}</h3>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/60 text-xs font-mono">
                    <div>
                      <div className="text-slate-500 text-[10px]">Solved</div>
                      <div className="text-white font-bold">{item.solvedCount} / {item.totalPuzzles}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px]">Accuracy</div>
                      <div className="text-amber-400 font-bold">{item.accuracy}%</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px]">Avg Time/Puzzle</div>
                      <div className="text-slate-300 font-bold">
                        {item.avgTimeMs > 0 ? `${(item.avgTimeMs / 1000).toFixed(1)}s` : '—'}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px]">Speed Change</div>
                      <div className="font-bold flex items-center gap-1">
                        {speedGained !== null ? (
                          speedGained > 0 ? (
                            <span className="text-emerald-400 flex items-center gap-0.5">
                              <TrendingDown size={12} /> {speedGained}% faster
                            </span>
                          ) : (
                            <span className="text-rose-400 flex items-center gap-0.5">
                              <TrendingUp size={12} /> {Math.abs(speedGained)}% slower
                            </span>
                          )
                        ) : (
                          <span className="text-slate-500">Baseline</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">
                    {new Date(item.startDate).toLocaleDateString()}
                  </span>

                  <div className="flex items-center gap-2">
                    {!isCurrent && (
                      <button
                        onClick={(e) => onSetActive(item.id, e)}
                        className="text-[11px] font-semibold text-slate-400 hover:text-amber-300 px-2 py-1 rounded-md bg-slate-900 border border-slate-800 cursor-pointer"
                      >
                        Activate
                      </button>
                    )}
                    <button
                      onClick={(e) => onDeleteCycle(item.id, e)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-rose-950/20 cursor-pointer"
                      title="Delete Cycle"
                    >
                      <Trash2 size={15} />
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
