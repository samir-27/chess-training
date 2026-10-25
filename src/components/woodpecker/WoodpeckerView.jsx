import React, { useState, useEffect } from 'react';
import {
  Zap,
  Play,
  RotateCw,
  Clock,
  Target,
  Trophy,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  BarChart3,
  Check,
  BookOpen,
  Brain,
  Sparkles,
  X
} from 'lucide-react';
import { storage } from '../../services/storageService.js';
import { compareWoodpeckerCycles } from '../../services/analyticsService.js';

export default function WoodpeckerView({ onStartTraining }) {
  const [cycles, setCycles] = useState(() => storage.getAllCycles());
  const [activeCycle, setActiveCycle] = useState(() => storage.getActiveCycle());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('easy'); // 'easy' | 'all' | 'intermediate' | 'advanced'
  const [targetDays, setTargetDays] = useState(14);
  const [cycleName, setCycleName] = useState('');

  const refreshData = () => {
    setCycles(storage.getAllCycles());
    setActiveCycle(storage.getActiveCycle());
  };

  useEffect(() => {
    return storage.subscribe(refreshData);
  }, []);

  const handleCreateCycle = (e) => {
    e.preventDefault();
    const course = storage.getCourseById('course-woodpecker-method');
    if (!course) return;

    let puzzleIds = [];
    if (selectedPreset === 'easy') {
      puzzleIds = course.chapters[0]?.lessons.map(l => l.id) || [];
    } else if (selectedPreset === 'intermediate') {
      puzzleIds = course.chapters[1]?.lessons.map(l => l.id) || [];
    } else if (selectedPreset === 'advanced') {
      puzzleIds = course.chapters[2]?.lessons.map(l => l.id) || [];
    } else {
      puzzleIds = course.chapters.flatMap(ch => ch.lessons.map(l => l.id));
    }

    const nextCycleNum = cycles.length + 1;
    const name = cycleName.trim() || `Cycle ${nextCycleNum} (${selectedPreset.toUpperCase()})`;

    storage.createCycle({
      courseId: course.id,
      name,
      puzzleFilter: selectedPreset,
      targetDays: Number(targetDays) || 14,
      targetDaily: Math.ceil(puzzleIds.length / (Number(targetDays) || 14)),
      puzzleIds
    });

    setShowCreateModal(false);
    setCycleName('');
    refreshData();
  };

  const handleStartDefaultCycle = () => {
    storage.startDefaultCycle();
    refreshData();
  };

  const handleDeleteCycle = (cycleId, e) => {
    if (e) e.stopPropagation();
    if (confirm('Are you sure you want to delete this Woodpecker cycle? Your historical puzzle attempts will be preserved.')) {
      storage.deleteCycle(cycleId);
      refreshData();
    }
  };

  const handleSetActive = (cycleId, e) => {
    if (e) e.stopPropagation();
    storage.updateCycleStatus(cycleId, 'active');
    refreshData();
  };

  const handleResumeActive = () => {
    if (!activeCycle) return;
    const course = storage.getCourseById(activeCycle.courseId);
    if (!course) return;

    const completedSet = new Set(Object.keys(activeCycle.completedPuzzles || {}));
    const nextId = activeCycle.puzzleIds.find(id => !completedSet.has(String(id))) || activeCycle.puzzleIds[0];

    for (const ch of course.chapters) {
      const found = ch.lessons.find(l => String(l.id) === String(nextId));
      if (found) {
        onStartTraining({ course, chapter: ch, lesson: found, cycleId: activeCycle.id });
        return;
      }
    }
  };

  const cycleComparisons = compareWoodpeckerCycles();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-amber-500/20 text-amber-400">
              <Zap size={16} />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
              Tikkanen & Smith Method
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Woodpecker Cycles
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Retrain your subconscious tactical pattern recognition. Aim to halve your solving time on each successive cycle.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-center">
          <button
            onClick={() => setShowGuideModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold transition-all shadow-sm"
          >
            <BookOpen size={15} className="text-amber-400" />
            <span>How Woodpecker Works</span>
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all"
          >
            <Plus size={16} />
            <span>New Cycle</span>
          </button>
        </div>
      </div>

      {/* Active Cycle Card */}
      {activeCycle ? (
        <div className="bg-gradient-to-br from-[#12192c] to-[#0d1322] border-2 border-amber-500/40 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-wider font-semibold">
                  Active Cycle #{activeCycle.cycleNumber}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Started {new Date(activeCycle.startDate).toLocaleDateString()}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">{activeCycle.name}</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Target: Complete {activeCycle.puzzleIds.length} puzzles in {activeCycle.targetDays} days (~{activeCycle.targetDaily} puzzles/day).
                </p>
              </div>

              {/* Progress Bar */}
              {(() => {
                const solved = Object.values(activeCycle.completedPuzzles || {}).filter(p => p.isSolved).length;
                const total = activeCycle.puzzleIds.length;
                const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
                return (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300 font-bold">{solved} / {total} Solved</span>
                      <span className="text-amber-400 font-bold">{pct}% Completed</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Actions for Active Cycle */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleResumeActive}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:brightness-110 transition-all group"
              >
                <Play size={18} className="fill-current group-hover:scale-110 transition-transform" />
                <span>Continue Training</span>
              </button>

              <button
                onClick={() => handleDeleteCycle(activeCycle.id)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 text-rose-300 hover:bg-rose-900/30 text-xs font-semibold transition-all"
                title="Delete this cycle"
              >
                <Trash2 size={16} />
                <span>Delete Cycle</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <Zap size={28} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">No Active Cycle</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
              Start your first cycle to systematically train tactical positions and measure your speed improvement!
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleStartDefaultCycle}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all"
            >
              <Zap size={16} />
              <span>Start Cycle 1 (Easy 1–222)</span>
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
            >
              <Plus size={16} />
              <span>Custom Cycle</span>
            </button>
          </div>
        </div>
      )}

      {/* Historical Cycles & Speed Halving Comparison */}
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
              const speedGained = prevItem && prevItem.avgTimeMs > 0 && item.avgTimeMs > 0
                ? Math.round(((prevItem.avgTimeMs - item.avgTimeMs) / prevItem.avgTimeMs) * 100)
                : null;

              const isCurrent = activeCycle?.id === item.id;

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
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                        item.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : isCurrent
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
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
                          onClick={(e) => handleSetActive(item.id, e)}
                          className="text-[11px] font-semibold text-slate-400 hover:text-amber-300 px-2 py-1 rounded-md bg-slate-900 border border-slate-800"
                        >
                          Activate
                        </button>
                      )}
                      <button
                        onClick={(e) => handleDeleteCycle(item.id, e)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-rose-950/20"
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

      {/* About The Woodpecker Method Modal Dialog (Shown only when user clicks How Woodpecker Works) */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#0F1424] border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 lg:p-6 border-b border-slate-800/80 bg-[#111728] shrink-0">
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
                onClick={() => setShowGuideModal(false)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Close guide"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 lg:p-8 overflow-y-auto space-y-6">
              
              {/* Method Hero Banner */}
              <div className="bg-gradient-to-br from-[#12192d] via-[#0e1424] to-[#0a0e19] border border-amber-500/30 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
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
                <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
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

                <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
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
              <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-4">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold mb-1">
                    Program Roadmap
                  </div>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    The 7-Cycle Time-Halving Schedule
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Select your puzzle set (such as Easy 222 or the full master corpus) and halve your target time on every cycle pass.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-amber-400 font-bold">
                      <span>CYCLE 1</span>
                      <span className="text-[10px] text-slate-500">~28 Days</span>
                    </div>
                    <div className="font-sans font-bold text-white text-xs">The Foundation Pass</div>
                    <div className="font-sans text-[11px] text-slate-400">
                      Solve every puzzle with careful calculation. Do not guess moves.
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-sky-400 font-bold">
                      <span>CYCLE 2</span>
                      <span className="text-[10px] text-slate-500">~14 Days</span>
                    </div>
                    <div className="font-sans font-bold text-white text-xs">Speed Halving</div>
                    <div className="font-sans text-[11px] text-slate-400">
                      Re-solve the exact same puzzles in half the time. Recognizing motifs faster.
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-emerald-400 font-bold">
                      <span>CYCLE 3</span>
                      <span className="text-[10px] text-slate-500">~7 Days</span>
                    </div>
                    <div className="font-sans font-bold text-white text-xs">Pattern Consolidation</div>
                    <div className="font-sans text-[11px] text-slate-400">
                      Subconscious triggers begin clicking into place instantly.
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-rose-400 font-bold">
                      <span>CYCLE 4–7</span>
                      <span className="text-[10px] text-slate-500">1–3 Days</span>
                    </div>
                    <div className="font-sans font-bold text-white text-xs">Grandmaster Reflexes</div>
                    <div className="font-sans text-[11px] text-slate-400">
                      Solving the entire set in 24–48 hours with near 100% accuracy.
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 border-t border-slate-800 bg-[#111728] flex items-center justify-end shrink-0">
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 hover:brightness-110 transition-all"
              >
                Got It, Back to Cycles
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Create Cycle Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F1424] border border-slate-800 rounded-3xl max-w-lg w-full p-6 lg:p-8 shadow-2xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Configure New Woodpecker Cycle</h2>
              <p className="text-xs text-slate-400 mt-1">
                Select your puzzle collection and timeframe to begin the next iteration.
              </p>
            </div>

            <form onSubmit={handleCreateCycle} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Cycle Name
                </label>
                <input
                  type="text"
                  placeholder={`Cycle ${cycles.length + 1}`}
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
                  ].map(preset => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedPreset(preset.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
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
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110"
                >
                  Start Cycle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
