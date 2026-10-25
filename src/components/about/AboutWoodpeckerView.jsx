import React from 'react';
import {
  Zap,
  BookOpen,
  RotateCw,
  Clock,
  Target,
  Brain,
  Trophy,
  Flame,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';

export default function AboutWoodpeckerView({ onStartCycle, onStartTraining }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#131c31] via-[#0f1526] to-[#0a0e19] border border-amber-500/30 rounded-3xl p-6 lg:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Zap size={14} />
            <span>The Science of Repetition</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            What is the Woodpecker Method?
          </h1>

          <p className="text-base text-slate-300 leading-relaxed">
            The Woodpecker Method is an intensive, repetition-based chess tactical training regimen developed by Swedish Grandmaster <strong className="text-white">Hans Tikkanen</strong> and Grandmaster <strong className="text-white">Axel Smith</strong>. By solving the same curated set of tactical puzzles repeatedly over shortening time intervals, you train your brain to recognize patterns <strong className="text-amber-400">instantly and subconsciously</strong>.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onStartCycle}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:brightness-110 transition-all"
            >
              <RotateCw size={18} />
              <span>Launch a Woodpecker Cycle</span>
            </button>
            <button
              onClick={onStartTraining}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 text-sm font-semibold transition-all"
            >
              <BookOpen size={18} />
              <span>Browse Exercises</span>
            </button>
          </div>
        </div>
      </div>

      {/* The Story & Grandmaster Norms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 lg:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Trophy size={20} />
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">The 3 GM Norms in 7 Weeks</h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            In spring 2010, International Master Hans Tikkanen had hit a plateau. Despite years of heavy calculation training, blunders in time trouble were costing him critical tournament games.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            He dedicated himself to this repetitive method, solving 1,000 exercises across multiple accelerated cycles. The following summer, Tikkanen achieved <strong className="text-amber-400">all 3 Grandmaster norms and surpassed 2500 within just 7 weeks</strong>, peaking at 2601 FIDE live rating. His co-author, GM Axel Smith, used it to complete his own final GM norm.
          </p>
        </div>

        <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 lg:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Brain size={20} />
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">The Core Philosophy: Automaticity</h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Grandmaster vision is not based on brute-forcing 20 moves deep in every position. Cognitive science shows that masters rely on <strong className="text-white">"chunks"</strong> and subconscious pattern recognition.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            By drilling tactical configurations until you can solve them in seconds, you liberate conscious working memory. When patterns flash into your intuition automatically, you avoid costly calculation fatigue and time pressure blunders.
          </p>
        </div>
      </div>

      {/* The 7-Cycle Program: Step-by-Step */}
      <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-xl space-y-6">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold mb-1">
            The Regimen
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            How to Train with the Woodpecker Method
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Pick a puzzle set (such as the 222 Easy Exercises or full set) and repeat it across 5 to 7 cycles, halving your target time each cycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-400">CYCLE 1</span>
              <span className="text-[10px] font-mono text-slate-500">~28 Days</span>
            </div>
            <h3 className="text-sm font-bold text-white">The Foundation Pass</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Solve all exercises in your chosen set. Calculate carefully. Do not guess moves. Record your solve time and mistakes.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-emerald-400">REST PERIOD</span>
              <span className="text-[10px] font-mono text-slate-500">1 to 7 Days</span>
            </div>
            <h3 className="text-sm font-bold text-white">Consolidation Break</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Take a full rest from tactics. Sleep and neural plasticity consolidate memories into long-term subconscious storage.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-400">CYCLE 2</span>
              <span className="text-[10px] font-mono text-slate-500">~14 Days</span>
            </div>
            <h3 className="text-sm font-bold text-white">Halve the Time</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Solve the exact same set in half the time (2 weeks). Notice how previously unfamiliar geometry now stands out immediately.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-400">CYCLE 3</span>
              <span className="text-[10px] font-mono text-slate-500">~7 Days</span>
            </div>
            <h3 className="text-sm font-bold text-white">Accelerate to One Week</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Repeat in 7 days. Your accuracy should rise above 90% and average solve speed should drop to a few seconds per puzzle.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-400">CYCLE 4</span>
              <span className="text-[10px] font-mono text-slate-500">~3 to 4 Days</span>
            </div>
            <h3 className="text-sm font-bold text-white">Rapid Fire</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete the set in 3–4 days. Tactical shots will trigger instantaneous recognition without conscious deliberation.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-400">CYCLE 5+</span>
              <span className="text-[10px] font-mono text-slate-500">1 to 2 Days</span>
            </div>
            <h3 className="text-sm font-bold text-white">Grandmaster Speed</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Solve the entire book in 24 to 48 hours. Axel Smith completed all 1,128 puzzles in 22 hours straight before securing his title!
            </p>
          </div>

        </div>
      </div>

      {/* The 3 Difficulty Sections */}
      <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-xl space-y-6">
        <h2 className="text-lg font-bold text-white tracking-tight">The 1,131 Woodpecker Exercises Included</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="text-amber-400 font-bold text-sm">1. Easy (Exercises 1–222)</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fundamental tactical themes: pins, forks, skewers, back-rank mates, deflectors, and simple double attacks. Essential for every player up to 2200.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="text-emerald-400 font-bold text-sm">2. Intermediate (Exercises 223–984)</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complex multi-move combinations, quiet defensive counters, and tactical continuations overlooked by world champions in classical play.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="text-cyan-400 font-bold text-sm">3. Advanced (Exercises 985–1128)</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deep, arduous calculation puzzles designed for titled players striving for the Grandmaster title and elite calculation stamina.
            </p>
          </div>
        </div>
      </div>

      {/* Golden Rules for Solving */}
      <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-xl space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <Sparkles size={18} className="text-amber-400" />
          <span>Golden Rules for Woodpecker Solvers</span>
        </h2>
        <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
            <span><strong className="text-white">Visualize the entire sequence before moving:</strong> Never play the first move on the board until you've verified the opponent's strongest defense in your mind.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
            <span><strong className="text-white">Beware of red herrings:</strong> In the Woodpecker Method, not all obvious-looking sacrifices work. Some positions require finding a calm consolidating move.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
            <span><strong className="text-white">Trust the repetition:</strong> If a puzzle feels impossible in Cycle 1, that is completely normal. In Cycle 2 and 3, your subconscious will identify it effortlessly.</span>
          </li>
        </ul>
      </div>

    </div>
  );
}
