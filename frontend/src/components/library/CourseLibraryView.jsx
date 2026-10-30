import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Play,
  CheckCircle2,
  Clock,
  ChevronRight,
  ArrowLeft,
  Award,
  Zap,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { storage } from '../../services/storageService.js';

export default function CourseLibraryView({ onSelectLesson, onNavigateAbout }) {
  const [courses, setCourses] = useState(() => storage.getAllCourses());
  const [allProgress, setAllProgress] = useState(() => storage.getAllProgress());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState(null);

  const refreshCourses = () => {
    setCourses(storage.getAllCourses());
    setAllProgress(storage.getAllProgress());
  };

  useEffect(() => {
    return storage.subscribe(refreshCourses);
  }, []);

  const woodpeckerCourse = useMemo(() => {
    return storage.getCourseById('course-woodpecker-method') || courses[0];
  }, [courses]);

  function getChapterCompletion(courseId, chapter) {
    const prog = allProgress[courseId]?.completedLessons || {};
    const total = chapter.lessons?.length || 0;
    if (total === 0) return { solved: 0, total: 0, percent: 0 };
    const solved = chapter.lessons.filter(l => prog[l.id]?.solved).length;
    return {
      solved,
      total,
      percent: Math.round((solved / total) * 100)
    };
  }

  const handleStartChapter = (chapter) => {
    const prog = allProgress[woodpeckerCourse.id]?.completedLessons || {};
    // Find next unsolved lesson in chapter or start first
    for (const les of chapter.lessons) {
      if (!prog[les.id]?.solved) {
        onSelectLesson({ course: woodpeckerCourse, chapter, lesson: les });
        return;
      }
    }
    if (chapter.lessons[0]) {
      onSelectLesson({ course: woodpeckerCourse, chapter, lesson: chapter.lessons[0] });
    }
  };

  const filteredChapters = useMemo(() => {
    if (!woodpeckerCourse?.chapters) return [];
    if (!searchQuery.trim()) return woodpeckerCourse.chapters;
    return woodpeckerCourse.chapters.map(ch => ({
      ...ch,
      lessons: ch.lessons.filter(l => 
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(l.id).includes(searchQuery)
      )
    })).filter(ch => ch.lessons.length > 0);
  }, [woodpeckerCourse, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#12192d] via-[#0e1424] to-[#0a0e19] border border-amber-500/30 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider">
              <Zap size={14} />
              <span>Woodpecker Exercise Library</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              1,131 Authentic Exercises
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Curated by GM Axel Smith & GM Hans Tikkanen. Grouped into three progressive difficulty tiers designed to build automatic tactical pattern vision.
            </p>
          </div>

          <button
            onClick={onNavigateAbout}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 border border-amber-500/40 text-amber-300 hover:bg-amber-500/10 transition-all text-xs font-bold self-start sm:self-center shadow-lg"
          >
            <HelpCircle size={16} />
            <span>How Woodpecker Works</span>
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center justify-between gap-3 bg-[#111728] border border-slate-800/80 p-3 rounded-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search exercises by title or puzzle number (e.g. 'Hamppe', '22')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl focus:outline-none focus:border-amber-500 placeholder-slate-500"
          />
        </div>
      </div>

      {/* Chapters List */}
      <div className="space-y-4">
        {filteredChapters.map((ch, cIdx) => {
          const chStats = getChapterCompletion(woodpeckerCourse?.id, ch);
          const isExpanded = selectedChapter?.id === ch.id;

          return (
            <div
              key={ch.id}
              className="bg-[#111728] border border-slate-800/80 rounded-2xl overflow-hidden transition-all shadow-xl"
            >
              <div
                onClick={() => setSelectedChapter(isExpanded ? null : ch)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-850/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                    {cIdx + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>{ch.title}</span>
                    </h3>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {ch.lessons?.length || 0} exercises • {chStats.solved} completed ({chStats.percent}%)
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-36 hidden sm:block">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span>Completed</span>
                      <span className="text-amber-400 font-bold">{chStats.percent}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${chStats.percent}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartChapter(ch);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-amber-500/50 text-xs font-semibold"
                  >
                    <Play size={14} className="fill-current text-amber-400" />
                    <span>Train</span>
                  </button>

                  <ChevronRight
                    size={18}
                    className={`text-slate-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                  />
                </div>
              </div>

              {/* Expanded Exercises Grid */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-800/60 bg-slate-950/40 space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-96 overflow-y-auto pr-1">
                    {ch.lessons.map((les, lIdx) => {
                      const isSolved = allProgress[woodpeckerCourse.id]?.completedLessons?.[les.id]?.solved;

                      return (
                        <button
                          key={les.id}
                          onClick={() => onSelectLesson({ course: woodpeckerCourse, chapter: ch, lesson: les })}
                          className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all group ${
                            isSolved
                              ? 'bg-slate-900/60 border-emerald-500/30 text-emerald-300'
                              : 'bg-slate-900 border-slate-800/80 text-slate-300 hover:border-amber-500/50 hover:text-white'
                          }`}
                        >
                          <div className="truncate pr-2">
                            <div className="text-xs font-semibold truncate group-hover:text-amber-400 transition-colors">
                              {les.title || `Exercise #${les.id}`}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                              {les.orientation === 'black' ? 'Black to Move' : 'White to Move'}
                            </div>
                          </div>

                          {isSolved ? (
                            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                          ) : (
                            <Play size={14} className="text-slate-500 group-hover:text-amber-400 shrink-0 fill-current opacity-60" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
