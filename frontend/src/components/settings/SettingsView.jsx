import React, { useState } from 'react';
import {
  Settings,
  Volume2,
  VolumeX,
  Palette,
  Target,
  Sparkles,
  Download,
  Upload,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Check
} from 'lucide-react';
import { storage } from '../../services/storageService.js';
import { soundManager } from '../../services/audioService.js';

const THEME_OPTIONS = [
  { id: 'classic-wood', name: 'Classic Wood', dark: '#b58863', light: '#f0d9b5' },
  { id: 'midnight-blue', name: 'Midnight Cobalt', dark: '#2a3b5c', light: '#8ea1c1' },
  { id: 'emerald', name: 'Tournament Emerald', dark: '#4b7355', light: '#eae9d2' },
  { id: 'slate', name: 'Graphite Slate', dark: '#334155', light: '#94a3b8' },
  { id: 'coral', name: 'Amber Coral', dark: '#b45309', light: '#fde68a' }
];

export default function SettingsView() {
  const [settings, setSettings] = useState(() => storage.getSettings());
  const [saveToast, setSaveToast] = useState(false);

  const update = (partial) => {
    const updated = storage.updateSettings(partial);
    setSettings(updated);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleExportBackup = () => {
    const data = storage.exportBackup();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chess-wizards-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target.result);
        storage.restoreBackup(json);
        setSettings(storage.getSettings());
        alert('Data successfully restored!');
      } catch (err) {
        alert('Invalid backup JSON file: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (confirm('Warning: This will reset all your attempts, streak, and custom settings. Proceed?')) {
      storage.clearAllData();
      setSettings(storage.getSettings());
      alert('Data reset to default.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 lg:py-8 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="p-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Settings size={15} />
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
            Preferences & Architecture
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          Application Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Customize board visual styling, sound feedback, daily training targets, and data backups.
        </p>
      </div>

      {saveToast && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-300 text-xs flex items-center gap-2.5 animate-fadeIn shadow-lg">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span className="font-semibold">Settings saved successfully.</span>
        </div>
      )}

      {/* Board & Audio Settings Card */}
      <div className="glass-panel border border-brand-border rounded-3xl p-6 lg:p-8 shadow-xl space-y-6">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2.5">
          <Palette size={18} className="text-amber-400" />
          <span>Board Palette & Themes</span>
        </h2>

        {/* Visual Board Theme Picker */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {THEME_OPTIONS.map((theme) => {
            const isSelected = settings.boardTheme === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => update({ boardTheme: theme.id })}
                className={`glass-card p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col items-center gap-2.5 ${
                  isSelected
                    ? 'border-amber-500/70 ring-1 ring-amber-500/30 glow-amber'
                    : 'border-brand-border hover:border-slate-700'
                }`}
              >
                {/* 2x2 Mini Board Swatch Preview */}
                <div className="w-12 h-12 rounded-xl overflow-hidden grid grid-cols-2 grid-rows-2 shadow-inner border border-white/10 shrink-0">
                  <div style={{ backgroundColor: theme.light }} />
                  <div style={{ backgroundColor: theme.dark }} />
                  <div style={{ backgroundColor: theme.dark }} />
                  <div style={{ backgroundColor: theme.light }} />
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold text-white leading-tight">{theme.name}</div>
                  {isSelected && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 font-semibold mt-1">
                      <Check size={11} className="stroke-[3]" /> Active
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Audio Volume & Toggles */}
        <div className="pt-4 border-t border-brand-border space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                Sound Effects Volume
              </label>
              <span className="text-xs font-mono text-amber-400 font-bold">
                {Math.round(settings.soundVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.soundVolume}
              onChange={(e) => {
                const vol = parseFloat(e.target.value);
                update({ soundVolume: vol });
                soundManager.playMove();
              }}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div>
              <div className="text-sm font-semibold text-white">Audio Synthesis</div>
              <div className="text-xs text-slate-400">Play realistic board move and capture audio effects.</div>
            </div>
            <button
              onClick={() => update({ soundEnabled: !settings.soundEnabled })}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-[0.98] ${
                settings.soundEnabled
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-brand-surface border border-brand-border text-slate-400 hover:text-white'
              }`}
            >
              {settings.soundEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div>
              <div className="text-sm font-semibold text-white">Auto-Advance on Solve</div>
              <div className="text-xs text-slate-400">Automatically progress to the next puzzle upon solving.</div>
            </div>
            <button
              onClick={() => update({ autoAdvance: !settings.autoAdvance })}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-[0.98] ${
                settings.autoAdvance
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-brand-surface border border-brand-border text-slate-400 hover:text-white'
              }`}
            >
              {settings.autoAdvance ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>
      </div>

      {/* Daily Training Target */}
      <div className="glass-panel border border-brand-border rounded-3xl p-6 lg:p-8 shadow-xl space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2.5">
          <Target size={18} className="text-amber-400" />
          <span>Daily Training Target</span>
        </h2>

        <div className="flex items-center gap-4 pt-1">
          <input
            type="range"
            min="5"
            max="100"
            step="5"
            value={settings.dailyGoal}
            onChange={(e) => update({ dailyGoal: Number(e.target.value) })}
            className="flex-1 accent-amber-500 cursor-pointer"
          />
          <span className="font-mono text-amber-400 font-bold text-sm w-32 text-right">
            {settings.dailyGoal} Puzzles / Day
          </span>
        </div>
      </div>

      {/* Data Backup & Persistence Card */}
      <div className="glass-panel border border-brand-border rounded-3xl p-6 lg:p-8 shadow-xl space-y-5">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2.5">
          <ShieldCheck size={18} className="text-emerald-400" />
          <span>Data Storage & Portability</span>
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Your training sessions, Woodpecker cycles, and game reviews are stored securely inside your browser's local storage. Export backups regularly to preserve your records or migrate between devices.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportBackup}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-surface border border-brand-border text-slate-200 hover:text-white hover:border-slate-700 text-xs font-semibold active:scale-[0.98] transition-all cursor-pointer"
          >
            <Download size={16} className="text-amber-400" />
            <span>Download JSON Backup</span>
          </button>

          <label className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-surface border border-brand-border text-slate-200 hover:text-white hover:border-slate-700 text-xs font-semibold active:scale-[0.98] transition-all cursor-pointer">
            <Upload size={16} className="text-cyan-400" />
            <span>Restore Backup</span>
            <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
          </label>

          <button
            onClick={handleResetData}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-950/20 border border-rose-900/40 text-rose-300 hover:bg-rose-900/30 text-xs font-semibold active:scale-[0.98] transition-all cursor-pointer sm:ml-auto"
          >
            <RotateCcw size={16} />
            <span>Reset All Progress</span>
          </button>
        </div>
      </div>

    </div>
  );
}
