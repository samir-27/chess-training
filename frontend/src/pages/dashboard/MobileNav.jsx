import React from 'react';
import { Menu, X, Flame, Wand2 } from 'lucide-react';
import UserAccountCard from './UserAccountCard.jsx';

export default function MobileNav({
  isOpen,
  setIsOpen,
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
    <>
      {/* Mobile Top Header Bar */}
      <header className="flex md:hidden items-center justify-between px-4 py-3 glass-panel border-b border-slate-800/80 shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center">
              <Wand2 size={15} className="text-slate-950 font-bold" />
            </div>
            <span className="font-extrabold text-white text-sm tracking-tight">CHESS WIZARDS</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400 font-bold">
          <Flame size={14} className="text-amber-500" />
          <span>{stats.streaks.currentStreak}d</span>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden animate-fadeIn">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-72 max-w-[85vw] bg-[#0D1424] p-5 flex flex-col justify-between h-full z-10 border-r border-slate-800/90 shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center">
                    <Wand2 size={16} className="text-slate-950 font-bold" />
                  </div>
                  <span className="font-extrabold text-white text-sm">CHESS WIZARDS</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onTabChange(item.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-xs transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 font-bold'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                      }`}
                    >
                      <Icon size={18} className={isActive ? 'text-amber-400' : 'text-slate-500'} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs font-mono space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Flame size={14} /> Streak: {stats.streaks.currentStreak} Days
                </span>
                <span className="text-slate-400">{stats.overall.totalSolved} solved</span>
              </div>
              <UserAccountCard
                user={user}
                onOpenAccountModal={onOpenAccountModal}
                onLogout={onLogout}
                isLoggingOut={isLoggingOut}
                authError={authError}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
