import { useState, useRef } from 'react';
import {
  X,
  Upload,
  ClipboardPaste,
  Globe,
  FileText,
  AlertCircle,
  CheckCircle2,
  Loader2,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import {
  importPgnGames,
  importRecentChessComGames
} from '../../services/gameHistoryRepository.js';
import { splitPgnGames } from '../../services/pgnImporter.js';

export default function ImportGamesModal({
  isOpen,
  onClose,
  onImportSuccess,
  onNavigateAnalysis,
  savedChessComUsername = ''
}) {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'paste' | 'chesscom'

  // Upload tab state
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadPgnText, setUploadPgnText] = useState('');
  const [uploadGameCount, setUploadGameCount] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  // Paste tab state
  const [pastedPgn, setPastedPasted] = useState('');
  const [isPasting, setIsPasting] = useState(false);
  const [pasteError, setPasteError] = useState('');

  // Chess.com tab state
  const [chessComUsername, setChessComUsername] = useState(savedChessComUsername);
  const [isImportingChessCom, setIsImportingChessCom] = useState(false);
  const [chessComProgress, setChessComProgress] = useState(null); // { current, total, imported, duplicates, status }
  const [chessComError, setChessComError] = useState('');

  // Success summary state
  const [importSummary, setImportSummary] = useState(null);

  if (!isOpen) return null;

  const resetAll = () => {
    setSelectedFile(null);
    setUploadPgnText('');
    setUploadGameCount(0);
    setUploadError('');
    setPastedPasted('');
    setPasteError('');
    setChessComError('');
    setChessComProgress(null);
    setImportSummary(null);
  };

  const handleClose = () => {
    resetAll();
    onClose();
  };

  // --- 1. UPLOAD PGN HANDLERS ---
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.pgn') && !file.name.endsWith('.txt')) {
      setUploadError('Please select a valid .pgn or .txt chess file.');
      return;
    }

    setUploadError('');
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setUploadPgnText(content);
        const count = splitPgnGames(content).length;
        setUploadGameCount(count);
      }
    };
    reader.onerror = () => setUploadError('Failed to read the selected file.');
    reader.readAsText(file);
  };

  const handleUploadSubmit = async () => {
    if (!uploadPgnText.trim()) {
      setUploadError('No PGN content found in file.');
      return;
    }

    setIsUploading(true);
    setUploadError('');
    try {
      const res = await importPgnGames(uploadPgnText, 'upload');
      setImportSummary({
        source: 'Upload',
        totalFound: res.totalFound,
        imported: res.imported,
        duplicates: res.duplicates,
        skipped: res.skipped
      });
      onImportSuccess?.();
    } catch (err) {
      setUploadError(err.message || 'Failed to import games from file.');
    } finally {
      setIsUploading(false);
    }
  };

  // --- 2. PASTE PGN HANDLERS ---
  const handlePasteSubmit = async () => {
    if (!pastedPgn.trim()) {
      setPasteError('Please paste your PGN game text.');
      return;
    }

    setIsPasting(true);
    setPasteError('');
    try {
      const res = await importPgnGames(pastedPgn, 'paste');
      setImportSummary({
        source: 'Paste',
        totalFound: res.totalFound,
        imported: res.imported,
        duplicates: res.duplicates,
        skipped: res.skipped
      });
      onImportSuccess?.();
    } catch (err) {
      setPasteError(err.message || 'Failed to import pasted PGN.');
    } finally {
      setIsPasting(false);
    }
  };

  // --- 3. CHESS.COM HANDLERS ---
  const handleChessComSubmit = async () => {
    if (!chessComUsername.trim()) {
      setChessComError('Please enter a Chess.com username.');
      return;
    }

    setIsImportingChessCom(true);
    setChessComError('');
    setChessComProgress({ status: 'Fetching the ten most recent games...' });

    try {
      const res = await importRecentChessComGames(chessComUsername.trim());

      setImportSummary({
        source: 'Chess.com',
        username: chessComUsername,
        totalFound: res.totalFound || 0,
        imported: res.imported || 0,
        duplicates: res.duplicates || 0,
        skipped: res.skipped || 0
      });
      onImportSuccess?.();
    } catch (err) {
      setChessComError(err.message || 'Failed to import games from Chess.com.');
    } finally {
      setIsImportingChessCom(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0F1424] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Import Games to History</h2>
              <p className="text-xs text-slate-400">Add chess games to your lightweight game library</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          {/* Success summary view */}
          {importSummary ? (
            <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Import Complete!</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Imported from <span className="font-semibold text-amber-400">{importSummary.source}</span>
                  {importSummary.username ? ` (@${importSummary.username})` : ''}
                </p>
                {importSummary.source === 'Chess.com' && (
                  <p className="text-xs text-slate-400">
                    These games are temporary and will be removed when you log out. Your saved analyses remain in your account.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                <div className="text-center">
                  <div className="text-2xl font-black text-emerald-400">{importSummary.imported}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Imported</div>
                </div>
                <div className="text-center border-x border-slate-800">
                  <div className="text-2xl font-black text-amber-400">{importSummary.duplicates}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Duplicates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-slate-300">{importSummary.totalFound}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Total Found</div>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={resetAll}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-sm font-semibold text-slate-200 transition-colors"
                >
                  Import More Games
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (importSummary.source === 'Chess.com') {
                      handleClose();
                      onNavigateAnalysis?.();
                    } else {
                      handleClose();
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
                >
                  {importSummary.source === 'Chess.com' ? 'Analyze Recent Games' : 'View Game History'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Tab Selector */}
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-900/90 border border-slate-800/80 rounded-2xl mb-6">
                <button
                  type="button"
                  onClick={() => { setActiveTab('upload'); resetAll(); }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'upload'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  Upload PGN
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('paste'); resetAll(); }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'paste'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <ClipboardPaste className="w-4 h-4" />
                  Paste PGN
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('chesscom'); resetAll(); }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'chesscom'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  Chess.com
                </button>
              </div>

              {/* TAB 1: UPLOAD PGN */}
              {activeTab === 'upload' && (
                <div className="space-y-4">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-700/80 hover:border-amber-500/60 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-slate-900/30 hover:bg-slate-900/50 group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pgn,.txt"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {selectedFile ? selectedFile.name : 'Click to select a .pgn file'}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {selectedFile
                        ? `${(selectedFile.size / 1024).toFixed(1)} KB · ${uploadGameCount} game(s) detected`
                        : 'Supports single or multiple games in one PGN file'}
                    </p>
                  </div>

                  {uploadError && (
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{uploadError}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={!selectedFile || isUploading}
                    onClick={handleUploadSubmit}
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:pointer-events-none text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Importing {uploadGameCount} Games...
                      </>
                    ) : (
                      `Import ${uploadGameCount ? `${uploadGameCount} Games` : 'File'}`
                    )}
                  </button>
                </div>
              )}

              {/* TAB 2: PASTE PGN */}
              {activeTab === 'paste' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Paste PGN Text
                    </label>
                    <textarea
                      rows={7}
                      value={pastedPgn}
                      onChange={(e) => setPastedPasted(e.target.value)}
                      placeholder={'[Event "Live Chess"]\n[White "Player1"]\n[Black "Player2"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3...'}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 font-mono text-xs focus:outline-none focus:border-amber-500/50 resize-none transition-colors"
                    />
                  </div>

                  {pasteError && (
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{pasteError}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={!pastedPgn.trim() || isPasting}
                    onClick={handlePasteSubmit}
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:pointer-events-none text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    {isPasting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Validating & Importing...
                      </>
                    ) : (
                      'Import Pasted Games'
                    )}
                  </button>
                </div>
              )}

              {/* TAB 3: CHESS.COM IMPORT */}
              {activeTab === 'chesscom' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Chess.com Username
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={chessComUsername}
                        onChange={(e) => setChessComUsername(e.target.value)}
                        placeholder="e.g. Supreme_Assassin, hikaru, magnuscarlsen"
                        disabled={isImportingChessCom}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Fetches at most the ten most recent games from the official Chess.com Published Data API. Games stay available for this session only. No Chess.com password is required.
                  </p>

                  {chessComProgress && (
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span className="font-semibold flex items-center gap-1.5">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                          {chessComProgress.status}
                        </span>
                      </div>
                    </div>
                  )}

                  {chessComError && (
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{chessComError}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={!chessComUsername.trim() || isImportingChessCom}
                    onClick={handleChessComSubmit}
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:pointer-events-none text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    {isImportingChessCom ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Fetching recent games...
                      </>
                    ) : (
                      'Fetch Recent 10 Games'
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
