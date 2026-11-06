import React from 'react';
import { BookOpen, X, Sparkles, Trophy, Brain, Clock, ShieldCheck } from 'lucide-react';

export default function WoodpeckerGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="glass-panel border border-brand-border rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 lg:p-6 border-b border-brand-border bg-brand-surface shrink-0">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <BookOpen size={20} />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">How the Woodpecker Method Works</h2>
              <p className="text-xs text-slate-400">The science of spaced repetition by GM Hans Tikkanen & GM Axel Smith</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-brand-border text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
            title="Close guide"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 lg:p-8 overflow-y-auto space-y-6 scrollbar-thin">
          {/* Method Hero Banner */}
          <div className="glass-card border border-amber-500/30 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

            <div className="space-y-3 max-w-3xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider">
                <Sparkles size={14} />
                <span>The Science of Spaced Repetition</span>
              </div>

              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                What is the Woodpecker Method?
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                The Woodpecker Method is an intensive, repetition-based chess tactical training regimen developed by Swedish Grandmaster <strong className="text-white">Hans Tikkanen</strong> and Grandmaster <strong className="text-white">Axel Smith</strong>. By solving the same curated set of tactical puzzles repeatedly over shortening time intervals, you train your brain to recognize tactical motifs <strong className="text-amber-400">instantly and subconsciously</strong>.
              </p>
            </div>
          </div>

          {/* The Story & Automaticity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card border border-brand-border rounded-3xl p-6 shadow-xl space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Trophy size={18} />
                </div>
                <h4 className="text-base font-bold text-white tracking-tight">The 3 GM Norms in 7 Weeks</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                In spring 2010, International Master Hans Tikkanen had hit a competitive plateau. Despite years of heavy calculation training, blunders in time pressure were costing him critical tournament games.
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                He committed to this repetitive method, solving 1,000 exercises across accelerated cycles. The following summer, Tikkanen achieved <strong className="text-amber-400">all 3 Grandmaster norms and surpassed 2500 within just 7 weeks</strong>, peaking at 2601 FIDE live rating. His co-author, GM Axel Smith, used it to complete his own final GM norm.
              </p>
            </div>

            <div className="glass-card border border-brand-border rounded-3xl p-6 shadow-xl space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Brain size={18} />
                </div>
                <h4 className="text-base font-bold text-white tracking-tight">The Core Philosophy: Automaticity</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Grandmaster vision is not based on brute-forcing 20 moves deep in every position. Cognitive science proves that masters rely on subconscious "chunks" and rapid tactical pattern recognition.
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                By drilling tactical motifs until you can solve them in seconds, you liberate conscious working memory. When patterns flash into your intuition automatically, you eliminate calculation fatigue and practical time trouble.
              </p>
            </div>
          </div>

          {/* The 7-Cycle Halving Schedule */}
          <div className="glass-card border border-brand-border rounded-3xl p-6 shadow-xl space-y-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold mb-1">
                Program Roadmap
              </div>
              <h4 className="text-base font-bold text-white tracking-tight">
                The 7-Cycle Time-Halving Schedule
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Master all 700 curated puzzles and halve your target time on every cycle pass.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-brand-surface/80 border border-brand-border space-y-2">
                <div className="flex justify-between items-center text-amber-400 font-bold">
                  <span>CYCLE 1</span>
                  <span className="text-xs text-slate-400">~28 Days</span>
                </div>
                <div className="font-sans font-bold text-white text-xs">The Foundation Pass</div>
                <div className="font-sans text-xs text-slate-400 leading-relaxed">
                  Solve every puzzle with careful calculation. Do not guess moves.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-brand-surface/80 border border-brand-border space-y-2">
                <div className="flex justify-between items-center text-sky-400 font-bold">
                  <span>CYCLE 2</span>
                  <span className="text-xs text-slate-400">~14 Days</span>
                </div>
                <div className="font-sans font-bold text-white text-xs">The Consolidation</div>
                <div className="font-sans text-xs text-slate-400 leading-relaxed">
                  Target 50% faster completion. Motifs start becoming familiar.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-brand-surface/80 border border-brand-border space-y-2">
                <div className="flex justify-between items-center text-emerald-400 font-bold">
                  <span>CYCLE 3</span>
                  <span className="text-xs text-slate-400">~7 Days</span>
                </div>
                <div className="font-sans font-bold text-white text-xs">The Acceleration</div>
                <div className="font-sans text-xs text-slate-400 leading-relaxed">
                  Solve the entire batch within one week. Speed improves significantly.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-brand-surface/80 border border-brand-border space-y-2">
                <div className="flex justify-between items-center text-rose-400 font-bold">
                  <span>CYCLE 4–7</span>
                  <span className="text-xs text-slate-400">1–3 Days</span>
                </div>
                <div className="font-sans font-bold text-white text-xs">Total Mastery</div>
                <div className="font-sans text-xs text-slate-400 leading-relaxed">
                  Solve the entire collection in a single sitting or weekend with 95%+ accuracy.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 lg:p-6 border-t border-brand-border bg-brand-surface flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400">
            Source: <em className="text-slate-300">The Woodpecker Method</em>, Quality Chess (2018)
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:bg-amber-400 active:scale-[0.98] transition-all cursor-pointer"
          >
            Got it, Let's Train
          </button>
        </div>
      </div>
    </div>
  );
}
