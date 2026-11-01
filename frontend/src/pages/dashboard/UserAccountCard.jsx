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
    <div className="mt-4 border-t border-slate-800 pt-3">
      {user ? (
        <>
          <div className="mb-2 truncate text-[11px] text-slate-400" title={user.email}>
            {user.email}
          </div>
          <button
            type="button"
            onClick={onLogout}
            disabled={isLoggingOut}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 disabled:opacity-60 cursor-pointer"
          >
            <LogOut size={14} /> {isLoggingOut ? 'Signing out...' : 'Log out'}
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={onOpenAccountModal}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-3 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 cursor-pointer"
        >
          <LogIn size={14} /> Sign in / Register
        </button>
      )}
      {authError && <p role="alert" className="mt-2 text-[10px] text-rose-300">{authError}</p>}
    </div>
  );
}
