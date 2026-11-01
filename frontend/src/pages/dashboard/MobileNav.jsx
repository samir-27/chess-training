import React from 'react';
import { Menu, X } from 'lucide-react';
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
      <header className="flex md:hidden items-center justify-between px-4 py-3 bg-[#0F1424] border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white cursor-pointer"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <span className="font-bold text-white text-sm">CHESS WIZARDS</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
          <span>🔥 {stats.streaks.currentStreak}d</span>
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
          <div className="relative w-72 max-w-[85vw] bg-[#0F1424] p-5 flex flex-col justify-between h-full z-10 border-r border-slate-800">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-black text-white text-sm">CHESS WIZARDS</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white cursor-pointer"
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
