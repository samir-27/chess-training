import React from 'react';

export default function WoodpeckerCreateModal({
  isOpen,
  onClose,
  onSubmit,
  cycleName,
  setCycleName,
  cyclesCount,
  selectedPreset,
  setSelectedPreset,
  targetDays,
  setTargetDays
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0F1424] border border-slate-800 rounded-3xl max-w-lg w-full p-6 lg:p-8 shadow-2xl space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Configure New Woodpecker Cycle</h2>
          <p className="text-xs text-slate-400 mt-1">
            Select your puzzle collection and timeframe to begin the next iteration.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Cycle Name
            </label>
            <input
              type="text"
              placeholder={`Cycle ${cyclesCount + 1}`}
              value={cycleName}
              onChange={(e) => setCycleName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Puzzle Collection
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'easy', label: 'Easy (1–222)', desc: 'Fast pattern drilling' },
                { id: 'intermediate', label: 'Intermediate (764)', desc: 'Tactical sharpness' },
                { id: 'advanced', label: 'Advanced (145)', desc: 'High calculation' },
                { id: 'all', label: 'Full Set (1,128)', desc: 'Grandmaster regimen' },
              ].map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setSelectedPreset(preset.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedPreset === preset.id
                      ? 'bg-amber-500/10 border-amber-500 text-amber-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-white">{preset.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{preset.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Target Completion Window (Days)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="60"
                value={targetDays}
                onChange={(e) => setTargetDays(Number(e.target.value))}
                className="flex-1 accent-amber-500"
              />
              <span className="font-mono font-bold text-amber-400 text-sm w-16 text-right">
                {targetDays} Days
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Woodpecker recommendation: Cycle 1 = 28 days, Cycle 2 = 14 days, Cycle 3 = 7 days, Cycle 4 = 3 days, Cycle 5 = 1 day.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 cursor-pointer"
            >
              Start Cycle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
