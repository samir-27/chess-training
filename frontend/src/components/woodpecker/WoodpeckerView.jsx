import React, { useState, useEffect } from 'react';
import { Zap, Plus, BookOpen } from 'lucide-react';
import { storage } from '../../services/storageService.js';
import { compareWoodpeckerCycles } from '../../services/trainingStatsService.js';
import WoodpeckerActiveCard from './WoodpeckerActiveCard.jsx';
import WoodpeckerCycleHistory from './WoodpeckerCycleHistory.jsx';
import WoodpeckerGuideModal from './WoodpeckerGuideModal.jsx';
import WoodpeckerCreateModal from './WoodpeckerCreateModal.jsx';

export default function WoodpeckerView({ onStartTraining }) {
  const [cycles, setCycles] = useState(() => storage.getAllCycles());
  const [activeCycle, setActiveCycle] = useState(() => storage.getActiveCycle());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [targetDays, setTargetDays] = useState(28);

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

    const puzzleIds = course.chapters[0]?.lessons.map((l) => l.id) || [];
    const nextCycleNum = cycles.length + 1;

    storage.createCycle({
      courseId: course.id,
      name: `Cycle ${nextCycleNum}`,
      targetDays: Number(targetDays) || 28,
      puzzleIds
    });

    setShowCreateModal(false);
    refreshData();
  };

  const handleStartDefaultCycle = () => {
    storage.startDefaultCycle();
    refreshData();
  };

  const handleStartNextCycle = () => {
    storage.startNextCycle(activeCycle?.id);
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
    const nextId = activeCycle.puzzleIds.find((id) => !completedSet.has(String(id))) || activeCycle.puzzleIds[0];

    for (const ch of course.chapters) {
      const found = ch.lessons.find((l) => String(l.id) === String(nextId));
      if (found) {
        onStartTraining({ course, chapter: ch, lesson: found, cycleId: activeCycle.id });
        return;
      }
    }
  };

  const cycleComparisons = compareWoodpeckerCycles();
  const currentCycleNumber = activeCycle ? activeCycle.cycleNumber : (cycles.length > 0 ? cycles[cycles.length - 1].cycleNumber : 1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Zap size={15} />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              Tikkanen & Smith Method • 700 Puzzles
            </span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-300 font-bold border border-amber-500/30">
              Current Cycle: #{currentCycleNumber}
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Woodpecker Cycles
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Retrain your subconscious tactical pattern recognition across all 700 curated puzzles. Complete every puzzle in each cycle and aim to halve your time on each iteration.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-center">
          <button
            onClick={() => setShowGuideModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-surface border border-brand-border text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold active:scale-[0.98] transition-all shadow-sm cursor-pointer"
          >
            <BookOpen size={15} className="text-amber-400" />
            <span>How Woodpecker Works</span>
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>New Cycle</span>
          </button>
        </div>
      </div>

      {/* Active Cycle Card */}
      <WoodpeckerActiveCard
        activeCycle={activeCycle}
        onResumeActive={handleResumeActive}
        onDeleteCycle={handleDeleteCycle}
        onStartDefaultCycle={handleStartDefaultCycle}
        onStartNextCycle={handleStartNextCycle}
        onOpenCreateModal={() => setShowCreateModal(true)}
      />

      {/* Historical Cycles & Speed Halving Comparison */}
      <WoodpeckerCycleHistory
        cycles={cycles}
        cycleComparisons={cycleComparisons}
        activeCycleId={activeCycle?.id}
        onSetActive={handleSetActive}
        onDeleteCycle={handleDeleteCycle}
      />

      {/* About The Woodpecker Method Modal Dialog */}
      <WoodpeckerGuideModal
        isOpen={showGuideModal}
        onClose={() => setShowGuideModal(false)}
      />

      {/* Create Cycle Modal */}
      <WoodpeckerCreateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateCycle}
        cyclesCount={cycles.length}
        targetDays={targetDays}
        setTargetDays={setTargetDays}
      />
    </div>
  );
}
