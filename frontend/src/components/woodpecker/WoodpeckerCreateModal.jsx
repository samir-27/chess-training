import React from 'react';
import { Layers, X } from 'lucide-react';

export default function WoodpeckerCreateModal({
  isOpen,
  onClose,
  onSubmit,
  cyclesCount,
  targetDays,
  setTargetDays
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="glass-panel border border-brand-border rounded-3xl max-w-lg w-full p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Start Cycle {cyclesCount + 1}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Every cycle trains the complete unified 700-puzzle corpus to build subconscious tactical automaticity.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-brand-border text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Unified 700 Puzzles Set Info Banner */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-slate-300 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-1.5">
                <Layers size={15} />
                <span>Woodpecker Puzzle Set</span>
              </span>
              <span className="text-xs font-mono font-bold text-amber-300 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30">
                Fixed 700 Puzzles
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              In accordance with the Woodpecker Method, all users solve the unified 700-puzzle set in every cycle. You cannot switch difficulty tiers—instead, your pattern recognition and solving speed improve with each repetition pass.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Target Completion Window (Days)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="60"
                value={targetDays}
                onChange={(e) => setTargetDays(Number(e.target.value))}
                className="flex-1 accent-amber-500 cursor-pointer"
              />
              <span className="font-mono font-bold text-amber-400 text-sm w-16 text-right">
                {targetDays} Days
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Woodpecker recommendation: Cycle 1 = 28 days, Cycle 2 = 14 days, Cycle 3 = 7 days, Cycle 4 = 3 days, Cycle 5 = 1 day.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-brand-border">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-semibold active:scale-[0.98] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
            >
              Start Cycle {cyclesCount + 1}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
