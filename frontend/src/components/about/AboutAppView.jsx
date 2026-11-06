import React from 'react';
import {
  Sparkles,
  Zap,
  Activity,
  ShieldCheck,
  Cpu,
  RotateCw,
  Trophy,
  Flame,
  CheckCircle2,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export default function AboutAppView({ onNavigateWoodpecker, onNavigateAnalysis }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 lg:py-8 space-y-10 animate-fadeIn">
      
      {/* Hero Header */}
      <div className="glass-panel border border-amber-500/30 rounded-3xl p-6 lg:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Chess Wizards Platform</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            About <span className="text-amber-400">Chess Wizards</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            <strong className="text-white">Chess Wizards</strong> is an all-in-one chess tactical training and game analysis platform designed to sharpen subconscious pattern recognition and provide deep, grandmaster-grade game reviews. Built entirely for your browser with zero latency, zero mandatory accounts, and maximum privacy.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onNavigateWoodpecker}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Zap size={18} />
              <span>Train Woodpecker Method</span>
            </button>
            <button
              onClick={onNavigateAnalysis}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-surface border border-brand-border text-slate-200 hover:text-white hover:border-slate-700 text-sm font-semibold active:scale-[0.98] transition-all cursor-pointer"
            >
              <Activity size={18} />
              <span>Analyze Game PGN</span>
            </button>
          </div>
        </div>
      </div>

      {/* Core Feature Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Pillar 1: Woodpecker Method */}
        <div className="glass-card border border-brand-border rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">The Woodpecker Method</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Systematic spaced-repetition tactical training created by GM Hans Tikkanen and GM Axel Smith. Solve all 700 curated master puzzles in cycles, halving the target duration with every iteration to build unconscious tactical reflexes.
            </p>
          </div>
          <button
            onClick={onNavigateWoodpecker}
            className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 pt-2 cursor-pointer transition-colors"
          >
            <span>Explore Cycles</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Pillar 2: Game Analysis */}
        <div className="glass-card border border-brand-border rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
              <Activity size={24} />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Grandmaster Game Analysis</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Import games directly from Chess.com or upload any PGN for move-by-move evaluation with the bundled local Stockfish engine. Review evaluation graphs, principal variations, centipawn loss, and authentic move classifications directly in your browser.
            </p>
          </div>
          <button
            onClick={onNavigateAnalysis}
            className="flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 pt-2 cursor-pointer transition-colors"
          >
            <span>Review a Game</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>

      {/* Why Choose Chess Wizards */}
      <div className="glass-panel border border-brand-border rounded-3xl p-6 lg:p-8 shadow-xl space-y-6">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Trophy size={20} className="text-amber-400" />
          <span>Why Chess Wizards?</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-brand-surface/60 border border-brand-border">
            <ShieldCheck size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">100% Client-Side Privacy</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Your PGN games, training attempts, and cycle stats are stored strictly inside your browser's local storage. No trackers, no accounts required, and no data uploaded to external servers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-brand-surface/60 border border-brand-border">
            <Cpu size={20} className="text-sky-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">Local Stockfish Game Review</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Reproducible, single-thread Stockfish searches at a fixed depth. Each position is evaluated independently with the engine's transposition table reset, and scores are normalized to White's perspective.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-brand-surface/60 border border-brand-border">
            <Flame size={20} className="text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">Authentic Move Classifications</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Rigorous chess.com and Lichess style criteria for Brilliant sacrifices (!!), Great moves (!), Best moves, Book theory, Inaccuracies, Mistakes, and Blunders.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-brand-surface/60 border border-brand-border">
            <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">Curated 700 Woodpecker Corpus</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                All 700 curated tactical exercises for the Woodpecker Method training regimen with instant move validation and multi-cycle speed tracking.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
