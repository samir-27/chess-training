import React from 'react';
import { Flame, Wand2 } from 'lucide-react';
import UserAccountCard from './UserAccountCard.jsx';

export default function SidebarNav({
  navItems,
  activeTab,
  onTabChange,
  stats,
  user,
  onOpenAccountModal,
  onLogout,
  isLoggingOut,
  authError
}) {
  return (
    <aside className="w-64 glass-panel border-r border-slate-800/80 p-5 flex flex-col justify-between hidden md:flex shrink-0 z-20">
      <div>
        {/* Logo & Brand */}
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/25 ring-1 ring-amber-400/40">
            <Wand2 size={20} className="text-slate-950 font-bold" />
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-white block text-sm">
              CHESS WIZARDS
            </span>
            <span className="text-xs text-amber-400/90 font-mono tracking-wider uppercase font-semibold block">
              Tactics & Analysis
            </span>
          </div>
        </div>

        {/* Vertical Navigation Links */}
        <nav className="space-y-1.5" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-xs transition-all duration-200 cursor-pointer relative ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/10 font-bold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                {isActive && (
                  <span className="absolute left-1 top-2 bottom-2 w-1 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
                )}
                <Icon size={18} className={isActive ? 'text-amber-400' : 'text-slate-400'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Training Mini Card */}
      <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800/90 space-y-2.5 shadow-lg">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <Flame size={15} className="text-amber-500" />
            <span>{stats.streaks.currentStreak} Day Streak</span>
          </div>
          <span className="text-slate-400 font-medium">
            {stats.today.solved}/{stats.today.goal} today
          </span>
        </div>

        {/* Daily Mini Progress Bar */}
        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-300"
            style={{ width: `${stats.today.percent}%` }}
          />
        </div>

        {/* Account controls */}
        <UserAccountCard
          user={user}
          onOpenAccountModal={onOpenAccountModal}
          onLogout={onLogout}
          isLoggingOut={isLoggingOut}
          authError={authError}
        />
      </div>
    </aside>
  );
}
