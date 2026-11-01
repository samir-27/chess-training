import { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="account-modal-title"
        className="w-full max-w-md rounded-3xl border border-slate-800 bg-[#0F1424] p-6 shadow-2xl"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 id="account-modal-title" className="text-xl font-bold text-white">
              {mode === 'register' ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Your saved analyses stay with your account.
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white">
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
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-amber-500"
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
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-amber-500"
            />
            {mode === 'register' && (
              <span className="block text-[11px] text-slate-500">Use at least 8 characters.</span>
            )}
          </label>

          {mode === 'register' && (
            <label className="block space-y-1.5">
              <span className="text-xs font-semibold text-slate-300">
                Chess.com username <span className="font-normal text-slate-500">(optional)</span>
              </span>
              <input
                type="text"
                autoComplete="off"
                maxLength={50}
                value={chessComUsername}
                onChange={(event) => setChessComUsername(event.target.value)}
                placeholder="Your public Chess.com username"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-amber-500"
              />
              <span className="block text-[11px] text-slate-500">
                Used only to prefill the recent-games importer. No Chess.com password is needed.
              </span>
            </label>
          )}

          {errorMessage && (
            <p role="alert" className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-200">
              <AlertCircle size={15} /> {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-slate-950 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Please wait...' : mode === 'register' ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-slate-400">
          {mode === 'register' ? 'Already have an account?' : 'New to Chess Wizards?'}{' '}
          <button
            type="button"
            onClick={() => switchMode(mode === 'register' ? 'login' : 'register')}
            className="font-semibold text-amber-400 hover:text-amber-300"
          >
            {mode === 'register' ? 'Sign in' : 'Create an account'}
          </button>
        </p>
      </section>
    </div>
  );
}
