import React from 'react';
import { LogIn, LogOut } from 'lucide-react';

export default function UserAccountCard({
  user,
  onOpenAccountModal,
  onLogout,
  isLoggingOut,
  authError
}) {
  return (
    <div className="mt-3 border-t border-slate-800/80 pt-3">
      {user ? (
        <>
          <div className="mb-2 truncate text-xs font-mono text-slate-400" title={user.email}>
            {user.email}
          </div>
          <button
            type="button"
            onClick={onLogout}
            disabled={isLoggingOut}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700/80 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-60 transition-colors cursor-pointer"
          >
            <LogOut size={14} /> {isLoggingOut ? 'Signing out...' : 'Log out'}
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={onOpenAccountModal}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-3 py-2 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20 hover:brightness-110 transition-all cursor-pointer"
        >
          <LogIn size={14} /> Sign in / Register
        </button>
      )}
      {authError && <p role="alert" className="mt-2 text-xs text-rose-400">{authError}</p>}
    </div>
  );
}
