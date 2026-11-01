import React from 'react';
import { Flame } from 'lucide-react';
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

        {/* Vertical Navigation Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-xs transition-all duration-200 cursor-pointer ${
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

        {/* Daily Mini Progress Bar */}
        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
          <div
            className="bg-amber-500 h-full rounded-full transition-all duration-300"
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
