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
  CheckCircle2
} from 'lucide-react';
import { storage } from '../../services/storageService.js';
import { soundManager } from '../../services/audioService.js';

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
    a.download = `chess-trainer-backup-${new Date().toISOString().slice(0, 10)}.json`;
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
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1 rounded bg-amber-500/10 text-amber-400">
            <Settings size={16} />
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
            Preferences & Architecture
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          Application Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Customize board visual styling, sound feedback, daily training targets, and data backups.
        </p>
      </div>

      {saveToast && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 size={16} />
          <span>Settings saved successfully.</span>
        </div>
      )}

      {/* Board & Audio Settings Card */}
      <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-xl space-y-6">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <Palette size={18} className="text-amber-400" />
          <span>Board & Audio Appearance</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Default Board Palette
            </label>
            <select
              value={settings.boardTheme}
              onChange={(e) => update({ boardTheme: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500"
            >
              <option value="classic-wood">Classic Wood (Mahogany & Cream)</option>
              <option value="midnight-blue">Midnight Cobalt (Navy & Slate)</option>
              <option value="emerald">Tournament Emerald (Green & Sand)</option>
              <option value="slate">Graphite Slate (Charcoal & Ash)</option>
              <option value="coral">Amber Coral (Amber & Ivory)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Sound Effects Volume
            </label>
            <div className="flex items-center gap-3">
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
                className="flex-1 accent-amber-500"
              />
              <span className="text-xs font-mono text-amber-400 font-bold w-12 text-right">
                {Math.round(settings.soundVolume * 100)}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800/60">
          <div>
            <div className="text-sm font-semibold text-white">Audio Synthesis</div>
            <div className="text-xs text-slate-400">Play realistic board move and capture audio effects.</div>
          </div>
          <button
            onClick={() => update({ soundEnabled: !settings.soundEnabled })}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              settings.soundEnabled
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400'
            }`}
          >
            {settings.soundEnabled ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800/60">
          <div>
            <div className="text-sm font-semibold text-white">Auto-Advance on Solve</div>
            <div className="text-xs text-slate-400">Automatically progress to the next puzzle upon solving.</div>
          </div>
          <button
            onClick={() => update({ autoAdvance: !settings.autoAdvance })}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              settings.autoAdvance
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400'
            }`}
          >
            {settings.autoAdvance ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      </div>

      {/* Training Target */}
      <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-xl space-y-6">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <Target size={18} className="text-amber-400" />
          <span>Daily Training Target</span>
        </h2>

        <div className="flex items-center gap-4">
          <input
            type="range"
            min="5"
            max="100"
            step="5"
            value={settings.dailyGoal}
            onChange={(e) => update({ dailyGoal: Number(e.target.value) })}
            className="flex-1 accent-amber-500"
          />
          <span className="font-mono text-amber-400 font-bold text-sm w-28 text-right">
            {settings.dailyGoal} Puzzles / Day
          </span>
        </div>
      </div>

      {/* Data Backup & Persistence Card */}
      <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-xl space-y-6">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <ShieldCheck size={18} className="text-emerald-400" />
          <span>Data Storage & Portability</span>
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Your training sessions, Woodpecker cycles, and imported courses are stored locally in your browser. Export backups regularly to preserve your records across devices.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportBackup}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 text-xs font-semibold transition-all"
          >
            <Download size={16} className="text-amber-400" />
            <span>Download JSON Backup</span>
          </button>

          <label className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 text-xs font-semibold transition-all cursor-pointer">
            <Upload size={16} className="text-cyan-400" />
            <span>Restore Backup</span>
            <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
          </label>

          <button
            onClick={handleResetData}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-950/30 border border-rose-900/60 text-rose-300 hover:bg-rose-900/40 text-xs font-semibold transition-all ml-auto"
          >
            <RotateCcw size={16} />
            <span>Reset All Progress</span>
          </button>
        </div>
      </div>

    </div>
  );
}
