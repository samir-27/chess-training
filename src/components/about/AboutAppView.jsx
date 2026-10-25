import React from 'react';
import {
  Sparkles,
  Zap,
  Activity,
  BarChart3,
  ShieldCheck,
  Cpu,
  RotateCw,
  Trophy,
  Flame,
  CheckCircle2,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export default function AboutAppView({ onNavigateWoodpecker, onNavigateAnalysis, onNavigateAnalytics }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10 animate-fadeIn">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#131c31] via-[#0f1526] to-[#0a0e19] border border-amber-500/30 rounded-3xl p-6 lg:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Chess Wizards Platform</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            About <span className="text-amber-400">Chess Wizards</span>
          </h1>

          <p className="text-base text-slate-300 leading-relaxed">
            <strong className="text-white">Chess Wizards</strong> is an all-in-one chess training and game review platform designed to sharpen your tactical intuition and elevate your understanding of every move. Built entirely for your browser with zero latency, zero mandatory accounts, and maximum privacy.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onNavigateWoodpecker}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:brightness-110 transition-all"
            >
              <Zap size={18} />
              <span>Train Woodpecker Method</span>
            </button>
            <button
              onClick={onNavigateAnalysis}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 text-sm font-semibold transition-all"
            >
              <Activity size={18} />
              <span>Analyze Game PGN</span>
            </button>
          </div>
        </div>
      </div>

      {/* Core Feature Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pillar 1: Woodpecker Method */}
        <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">The Woodpecker Method</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Systematic spaced-repetition tactical training created by GM Hans Tikkanen and GM Axel Smith. Solve all 1,131 curated master puzzles in cycles, halving the time with every iteration to build unconscious tactical reflexes.
            </p>
          </div>
          <button
            onClick={onNavigateWoodpecker}
            className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 pt-2"
          >
            <span>Explore Cycles</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Pillar 2: Game Analysis */}
        <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
              <Activity size={24} />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Grandmaster Game Analysis</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload or paste any chess PGN for instant move-by-move evaluations powered by the public Lichess Cloud Evaluation API (depth 30–70) and Stockfish Multi-PV (2–3 engine lines per move). Detect blunders, brilliant sacrifices, and accurate centipawn loss.
            </p>
          </div>
          <button
            onClick={onNavigateAnalysis}
            className="flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 pt-2"
          >
            <span>Review a Game</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Pillar 3: Analytics & Heatmap */}
        <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Analytics & Heatmap</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stay disciplined with a GitHub-style activity contribution calendar, consecutive training day streaks, solving accuracy trends, and cycle-over-cycle speed progression statistics.
            </p>
          </div>
          <button
            onClick={onNavigateAnalytics}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 pt-2"
          >
            <span>View Progress</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>

      {/* Why Choose Chess Wizards */}
      <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-xl space-y-6">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Trophy size={20} className="text-amber-400" />
          <span>Why Chess Wizards?</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <ShieldCheck size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">100% Client-Side Privacy</h4>
              <p className="text-xs text-slate-400 mt-1">
                Your PGN games, training attempts, and cycle stats are stored strictly inside your browser's local storage. No trackers, no accounts, and no data uploaded to external servers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <Cpu size={20} className="text-sky-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">Lichess Cloud & Multi-PV Analysis</h4>
              <p className="text-xs text-slate-400 mt-1">
                Deep master evaluations backed by Lichess's public database of pre-computed Stockfish positions at depths up to 70 with 2–3 engine continuation lines for every position.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <Flame size={20} className="text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">Authentic Move Classifications</h4>
              <p className="text-xs text-slate-400 mt-1">
                Rigorous chess.com and Lichess style criteria for Brilliant sacrifices (!!), Great moves (!), Best moves, Book theory, Inaccuracies, Mistakes, and Blunders.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">Official 1,131 Woodpecker Corpus</h4>
              <p className="text-xs text-slate-400 mt-1">
                All 1,131 exercises from the original Woodpecker Method book categorized into Easy, Intermediate, and Advanced sections with instant move validation.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
