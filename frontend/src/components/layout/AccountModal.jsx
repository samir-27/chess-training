import { useState } from 'react';
import { AlertCircle, X, Shield, LogIn, UserPlus } from 'lucide-react';
import { loginAccount, registerAccount } from '../../services/authService.js';

export default function AccountModal({ isOpen, onClose, onAuthenticated }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [chessComUsername, setChessComUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);
    try {
      const user = mode === 'register'
        ? await registerAccount({ email, password, chessComUsername })
        : await loginAccount({ email, password });
      onAuthenticated(user);
      onClose();
    } catch (error) {
      setErrorMessage(error.message || 'Unable to authenticate.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fadeIn">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="account-modal-title"
        className="w-full max-w-md rounded-3xl border border-brand-border glass-panel p-6 sm:p-7 shadow-2xl relative"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 id="account-modal-title" className="text-xl font-bold text-white tracking-tight">
              {mode === 'register' ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Your saved analyses and preferences stay with your account.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent hover:border-brand-border transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-slate-300">Email</span>
            <input
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-brand-border bg-brand-surface px-4 py-3 text-xs text-white outline-none focus:border-amber-500 transition-colors"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-slate-300">Password</span>
            <input
              type="password"
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
              required
              minLength={8}
              maxLength={128}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-brand-border bg-brand-surface px-4 py-3 text-xs text-white outline-none focus:border-amber-500 transition-colors"
            />
            {mode === 'register' && (
              <span className="block text-xs text-slate-400">Use at least 8 characters.</span>
            )}
          </label>

          {mode === 'register' && (
            <label className="block space-y-1.5">
              <span className="text-xs font-semibold text-slate-300">
                Chess.com username <span className="font-normal text-slate-400">(optional)</span>
              </span>
              <input
                type="text"
                autoComplete="off"
                maxLength={50}
                value={chessComUsername}
                onChange={(event) => setChessComUsername(event.target.value)}
                placeholder="Your public Chess.com username"
                className="w-full rounded-xl border border-brand-border bg-brand-surface px-4 py-3 text-xs text-white outline-none focus:border-amber-500 transition-colors"
              />
              <span className="block text-xs text-slate-400">
                Used only to prefill the recent-games importer. No Chess.com password needed.
              </span>
            </label>
          )}

          {errorMessage && (
            <p role="alert" className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-200">
              <AlertCircle size={15} className="shrink-0" />
              <span>{errorMessage}</span>
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? 'Please wait...' : mode === 'register' ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-slate-400">
          {mode === 'register' ? 'Already have an account?' : 'New to Chess Wizards?'}{' '}
          <button
            type="button"
            onClick={() => switchMode(mode === 'register' ? 'login' : 'register')}
            className="font-semibold text-amber-400 hover:text-amber-300 cursor-pointer transition-colors"
          >
            {mode === 'register' ? 'Sign in' : 'Create an account'}
          </button>
        </p>
      </section>
    </div>
  );
}
