import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Flame,
  Trophy,
  Clock,
  Target,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { generateHeatmapGrid } from '../../services/analyticsService.js';

// Swatch colors matching high-contrast midnight chess theme
const INTENSITY_COLORS = [
  'bg-slate-900 border border-slate-800/80', // Level 0: Empty
  'bg-emerald-950 border border-emerald-900/60', // Level 1: 1-5
  'bg-emerald-700 border border-emerald-600', // Level 2: 6-15
  'bg-emerald-500 border border-emerald-400', // Level 3: 16-30
  'bg-emerald-300 border border-white shadow-sm shadow-emerald-400/50' // Level 4: 31+
];

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

export default function ActivityHeatmap() {
  const [selectedDay, setSelectedDay] = useState(null);
  const data = useMemo(() => generateHeatmapGrid(365), []);

  const { weeks, streaks, bestDay } = data;

  // Compute month headers positions
  const monthHeaders = useMemo(() => {
    const headers = [];
    let lastMonth = -1;

    weeks.forEach((week, wIdx) => {
      const firstValidDay = week.find(d => !d.isDisabled);
      if (firstValidDay && firstValidDay.month !== lastMonth) {
        lastMonth = firstValidDay.month;
        headers.push({ index: wIdx, name: MONTH_NAMES[lastMonth] });
      }
    });

    return headers;
  }, [weeks]);

  // Format millisecond duration into human-readable string
  const formatDuration = (ms) => {
    if (!ms || ms <= 0) return '0 min';
    const totalMinutes = Math.round(ms / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  return (
    <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-emerald-500/10 text-emerald-400">
              <Calendar size={16} />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              Training Discipline
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Daily Activity Heatmap
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real tactical exercises and Woodpecker repetitions logged over the last 365 days.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 self-start sm:self-center">
          <span>Less</span>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-slate-900 border border-slate-800" title="0 puzzles" />
            <span className="w-3 h-3 rounded-sm bg-emerald-950 border border-emerald-900" title="1-5 puzzles" />
            <span className="w-3 h-3 rounded-sm bg-emerald-700" title="6-15 puzzles" />
            <span className="w-3 h-3 rounded-sm bg-emerald-500" title="16-30 puzzles" />
            <span className="w-3 h-3 rounded-sm bg-emerald-300" title="31+ puzzles" />
          </div>
          <span>More</span>
        </div>
      </div>

      {/* The Contribution Heatmap Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-block min-w-[760px]">
          
          {/* Month Names Row */}
          <div className="flex text-[10px] font-mono text-slate-500 mb-1.5 pl-8 relative h-4">
            {monthHeaders.map(mh => (
              <span
                key={mh.index}
                className="absolute"
                style={{ left: `${mh.index * 14 + 32}px` }}
              >
                {mh.name}
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            
            {/* Weekday Labels (Mon, Wed, Fri) */}
            <div className="flex flex-col justify-between py-0.5 text-[9px] font-mono text-slate-500 pr-1 select-none">
              {DAY_LABELS.map((lbl, idx) => (
                <div key={idx} className="h-3 flex items-center leading-none">
                  {lbl}
                </div>
              ))}
            </div>

            {/* Weeks Columns */}
            <div className="flex gap-1">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {week.map((day, dIdx) => {
                    const isSelected = selectedDay && selectedDay.date === day.date;
                    const colorClass = INTENSITY_COLORS[day.intensity] || INTENSITY_COLORS[0];

                    return (
                      <button
                        key={dIdx}
                        onClick={() => setSelectedDay(day)}
                        disabled={day.isDisabled}
                        title={`${day.date}: ${day.solvedCount} solved`}
                        className={`w-3 h-3 rounded-sm transition-all focus:outline-none ${colorClass} ${
                          day.isDisabled ? 'opacity-20 cursor-default' : 'hover:ring-2 hover:ring-amber-400 cursor-pointer'
                        } ${isSelected ? 'ring-2 ring-amber-400 scale-125 z-10' : ''}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Selected Day Inspector Panel */}
      {selectedDay && (
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
          <div>
            <div className="text-xs font-mono text-amber-400 font-bold uppercase">
              {new Date(selectedDay.date + 'T00:00:00').toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="text-sm font-semibold text-white mt-0.5">
              {selectedDay.solvedCount > 0
                ? `${selectedDay.solvedCount} Puzzles Solved (${selectedDay.attemptsCount} attempts)`
                : 'No training activity recorded on this day.'}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">Time Trained</span>
              <span className="text-slate-200 font-bold">{formatDuration(selectedDay.totalDurationMs)}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Accuracy</span>
              <span className="text-emerald-400 font-bold">
                {selectedDay.attemptsCount > 0
                  ? `${Math.round((selectedDay.solvedCount / selectedDay.attemptsCount) * 100)}%`
                  : '—'}
              </span>
            </div>
            <button
              onClick={() => setSelectedDay(null)}
              className="text-slate-500 hover:text-slate-300 text-xs px-2 py-1"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Key Metric Summary Cards Below Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/60">
        
        <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800/60">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Flame size={14} className="text-amber-500" />
            <span>Current Streak</span>
          </div>
          <div className="text-xl lg:text-2xl font-bold text-white tracking-tight">
            {streaks.currentStreak} <span className="text-xs text-slate-500 font-normal">Days</span>
          </div>
        </div>

        <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800/60">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Trophy size={14} className="text-amber-400" />
            <span>Longest Streak</span>
          </div>
          <div className="text-xl lg:text-2xl font-bold text-white tracking-tight">
            {streaks.longestStreak} <span className="text-xs text-slate-500 font-normal">Days</span>
          </div>
        </div>

        <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800/60">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Calendar size={14} className="text-emerald-400" />
            <span>Active Days</span>
          </div>
          <div className="text-xl lg:text-2xl font-bold text-white tracking-tight">
            {streaks.totalActiveDays} <span className="text-xs text-slate-500 font-normal">Days</span>
          </div>
        </div>

        <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800/60">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Sparkles size={14} className="text-cyan-400" />
            <span>Best Day Record</span>
          </div>
          <div className="text-xl lg:text-2xl font-bold text-white tracking-tight">
            {bestDay ? `${bestDay.solved} Puzzles` : '—'}
          </div>
        </div>

      </div>

    </div>
  );
}
