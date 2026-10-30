import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  TrendingUp,
  Target,
  Clock,
  Flame,
  Trophy,
  Award,
  Zap,
  Calendar,
  AlertOctagon,
  CheckCircle2
} from 'lucide-react';
import {
  getOverallStats,
  getAccuracyTrend,
  compareWoodpeckerCycles
} from '../../services/analyticsService.js';
import ActivityHeatmap from '../heatmap/ActivityHeatmap.jsx';

export default function AnalyticsView() {
  const [timeRange, setTimeRange] = useState(30); // 7 | 30 | 90

  const stats = useMemo(() => getOverallStats(), []);
  const trend = useMemo(() => getAccuracyTrend(timeRange), [timeRange]);
  const cycleComparisons = useMemo(() => compareWoodpeckerCycles(), []);

  const formatDuration = (ms) => {
    if (!ms || ms <= 0) return '0 min';
    const totalMinutes = Math.round(ms / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1 rounded bg-amber-500/10 text-amber-400">
            <BarChart3 size={16} />
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
            Grandmaster Analytics
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          Performance & Progress
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Measurable calculation metrics, solving speed acceleration, and training consistency derived from your actual chess sessions.
        </p>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-[#111728] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Accuracy Rate</span>
            <Target size={16} className="text-amber-400" />
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
            {stats.overall.accuracy}%
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-1">
            {stats.overall.totalSolved} / {stats.overall.totalAttempts} Solved
          </div>
        </div>

        <div className="bg-[#111728] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Avg Solve Speed</span>
            <Clock size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
            {stats.overall.avgSolveTimeMs > 0
              ? `${(stats.overall.avgSolveTimeMs / 1000).toFixed(1)}s`
              : '—'}
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-1">
            Per puzzle average
          </div>
        </div>

        <div className="bg-[#111728] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Total Time Trained</span>
            <Calendar size={16} className="text-cyan-400" />
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
            {formatDuration(stats.overall.totalTimeMs)}
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-1">
            Total active practice
          </div>
        </div>

        <div className="bg-[#111728] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Training Streak</span>
            <Flame size={16} className="text-amber-500" />
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
            {stats.streaks.currentStreak} <span className="text-xs text-slate-500 font-normal">Days</span>
          </div>
          <div className="text-[11px] text-amber-500/80 font-mono mt-1">
            Best: {stats.streaks.longestStreak} days
          </div>
        </div>

      </div>

      {/* GitHub-style Heatmap Section */}
      <ActivityHeatmap />

      {/* Accuracy & Volume Trends */}
      <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Solving Volume & Consistency
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Daily exercises solved over the selected timeframe.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs font-mono">
            {[7, 30, 90].map(days => (
              <button
                key={days}
                onClick={() => setTimeRange(days)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  timeRange === days
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {days}D
              </button>
            ))}
          </div>
        </div>

        {/* Clean SVG Trend Chart */}
        <div className="h-44 w-full flex items-end gap-1.5 pt-6 pb-2 border-b border-slate-800/60 overflow-x-auto">
          {trend.map((d, i) => {
            const maxVal = Math.max(5, ...trend.map(t => t.solved));
            const barHeightPct = Math.max(8, Math.round((d.solved / maxVal) * 100));

            return (
              <div key={i} className="flex-1 min-w-[12px] flex flex-col items-center gap-1 group relative">
                {/* Tooltip on hover */}
                <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center bg-slate-950 border border-slate-800 text-[10px] font-mono p-1.5 rounded-lg shadow-xl z-20 pointer-events-none whitespace-nowrap">
                  <span className="text-slate-400">{d.date}</span>
                  <span className="text-amber-400 font-bold">{d.solved} Solved</span>
                  {d.accuracy !== null && <span className="text-emerald-400">{d.accuracy}% Acc</span>}
                </div>

                <div className="w-full bg-slate-900 h-32 rounded-t-sm flex items-end overflow-hidden">
                  <div
                    className={`w-full rounded-t-sm transition-all duration-300 ${
                      d.solved > 0
                        ? 'bg-gradient-to-t from-amber-500/80 to-amber-300 group-hover:brightness-125'
                        : 'bg-slate-850'
                    }`}
                    style={{ height: `${d.solved > 0 ? barHeightPct : 4}%` }}
                  />
                </div>
                
                {/* Every Nth label */}
                {(i % Math.ceil(trend.length / 7) === 0 || i === trend.length - 1) && (
                  <span className="text-[9px] font-mono text-slate-500 mt-1 select-none">
                    {d.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Woodpecker Cycle Performance Comparison */}
      {cycleComparisons.length > 0 && (
        <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-4">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-amber-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              Woodpecker Speed Halving Progression
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Compare average solve time and accuracy across successive Woodpecker cycles.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Cycle</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Puzzles</th>
                  <th className="py-3 px-4">Accuracy</th>
                  <th className="py-3 px-4">Avg Time / Puzzle</th>
                  <th className="py-3 px-4">Total Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {cycleComparisons.map(c => (
                  <tr key={c.id} className="hover:bg-slate-900/40">
                    <td className="py-3 px-4 font-bold text-white">{c.name}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase ${
                        c.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{c.solvedCount} / {c.totalPuzzles}</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">{c.accuracy}%</td>
                    <td className="py-3 px-4 text-amber-400 font-bold">
                      {c.avgTimeMs > 0 ? `${(c.avgTimeMs / 1000).toFixed(1)}s` : '—'}
                    </td>
                    <td className="py-3 px-4 text-slate-400">{formatDuration(c.totalTimeMs)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
