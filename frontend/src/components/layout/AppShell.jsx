import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Zap,
  Swords,
  BookOpen,
  BarChart3,
  HelpCircle,
  Settings,
  Flame,
  Activity,
  Menu,
  X
} from 'lucide-react';
import { storage } from '../../services/storageService.js';
import { getOverallStats } from '../../services/analyticsService.js';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'woodpecker', label: 'Woodpecker Method', icon: Zap },
  { id: 'analysis', label: 'Game Analysis', icon: Activity },
  { id: 'analytics', label: 'Analytics & Heatmap', icon: BarChart3 },
  { id: 'about_app', label: 'About the App', icon: HelpCircle },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AppShell({
  activeTab,
  onTabChange,
  children
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState(() => getOverallStats());

  useEffect(() => {
    return storage.subscribe(() => setStats(getOverallStats()));
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* DESKTOP SIDEBAR */}
      <aside className="w-64 bg-[#0F1424] border-r border-slate-800/80 p-5 flex flex-col justify-between hidden md:flex shrink-0">
        <div>
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 px-2 mb-8">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <span className="text-black font-black text-xl">🧙‍♂️</span>
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-white block text-sm">
                CHESS WIZARDS
              </span>
              <span className="text-[10px] text-amber-500 font-mono tracking-widest uppercase -mt-0.5 block">
                TACTICS & ANALYSIS
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-xs transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-sm shadow-amber-500/5 font-bold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 border border-transparent'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-amber-400' : 'text-slate-500'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Training Mini Card */}
        <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold font-mono">
              <Flame size={15} className="text-amber-500" />
              <span>{stats.streaks.currentStreak} Day Streak</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              {stats.today.solved}/{stats.today.goal} today
            </span>
          </div>

          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.today.percent}%` }}
            />
          </div>
        </div>
      </aside>

      {/* MOBILE DRAWER MODAL */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex md:hidden">
          <div className="w-72 bg-[#0F1424] border-r border-slate-800 h-full p-6 flex flex-col justify-between animate-slideIn">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-xl bg-amber-500 flex items-center justify-center text-black font-black">
                    🧙‍♂️
                  </div>
                  <span className="font-bold text-white text-sm">CHESS WIZARDS</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="space-y-1.5">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onTabChange(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-xs transition-all ${
                        isActive
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold'
                          : 'text-slate-400 hover:text-slate-100'
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono">
              <div className="text-amber-400 font-bold">Streak: {stats.streaks.currentStreak} Days</div>
              <div className="text-slate-500 text-[10px] mt-0.5">{stats.overall.totalSolved} total solved</div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Mobile Header Bar */}
        <header className="flex md:hidden items-center justify-between px-4 py-3 bg-[#0F1424] border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl bg-slate-900 text-slate-300"
            >
              <Menu size={20} />
            </button>
            <span className="font-bold text-white text-sm">CHESS WIZARDS</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
              <Flame size={14} className="text-amber-500" />
              <span>{stats.streaks.currentStreak}D</span>
            </span>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}
