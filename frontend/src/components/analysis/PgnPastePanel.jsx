import React from 'react';
import { Sparkles, Play } from 'lucide-react';

export default function PgnPastePanel({
  pgnInput,
  setPgnInput,
  sampleGames,
  onAnalyze
}) {
  return (
    <div className="space-y-4">
      <textarea
        rows={7}
        placeholder="Paste game PGN here (e.g. 1. e4 e5 2. Nf3 Nc6...)"
        value={pgnInput}
        onChange={(e) => setPgnInput(e.target.value)}
        className="w-full bg-brand-surface border border-brand-border text-slate-200 rounded-2xl p-4 text-xs font-mono focus:outline-none focus:border-amber-500 leading-relaxed placeholder-slate-500"
      />

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        {sampleGames && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Samples:</span>
            {sampleGames.kasparov && (
              <button
                type="button"
                onClick={() => onAnalyze(sampleGames.kasparov.pgn)}
                className="px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-amber-300 hover:border-amber-400 hover:text-amber-200 text-xs font-medium active:scale-[0.98] transition-all cursor-pointer"
              >
                Kasparov's Immortal
              </button>
            )}
            {sampleGames.opera && (
              <button
                type="button"
                onClick={() => onAnalyze(sampleGames.opera.pgn)}
                className="px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-sky-300 hover:border-sky-400 hover:text-sky-200 text-xs font-medium active:scale-[0.98] transition-all cursor-pointer"
              >
                Morphy Opera
              </button>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={() => onAnalyze(pgnInput)}
          disabled={!pgnInput.trim()}
          className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-[0.98] disabled:opacity-40 transition-all cursor-pointer sm:ml-auto"
        >
          <Sparkles size={15} />
          <span>Analyze PGN</span>
        </button>
      </div>
    </div>
  );
}
