import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Activity,
  Sparkles,
  Globe,
  ClipboardPaste,
  Upload,
  Play,
  Loader2,
  Calendar,
  Clock,
  User,
  AlertCircle,
  Search,
  Filter,
  Link as LinkIcon,
  ChevronDown
} from 'lucide-react';
import {
  analyzePgnGame,
  createAnalysisPreview
} from '../../services/gameAnalysisEngine.js';
import { STOCKFISH_SEARCH } from '../../services/stockfishEngine.js';
import { createCommentaryFallback, selectCommentaryCandidates } from '../../services/moveCommentary.js';
import {
  createAnalysis,
  generateAnalysisCommentary,
  loadAnalysis,
  saveLocalCommentary,
  saveAnalysisResume
} from '../../services/analysisRepository.js';
import {
  getChessComRecentGames,
  getChessComGameById,
  getGameById,
  updateGameAccuracy
} from '../../services/gameHistoryRepository.js';
import InteractiveAnalysisBoard from './InteractiveAnalysisBoard.jsx';

// Quick master sample games for testing
const SAMPLE_GAMES = {
  kasparov: {
    title: 'Kasparov vs. Topalov (1999)',
    subtitle: 'The "Immortal Game" — brilliant Rook sacrifice & King hunt',
    pgn: `[Event "Hoogovens Group A"]
[Site "Wijk aan Zee NED"]
[Date "1999.01.20"]
[Round "4"]
[White "Kasparov, Garry"]
[Black "Topalov, Veselin"]
[Result "1-0"]
[WhiteElo "2812"]
[BlackElo "2700"]

1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Be3 Bg7 5. Qd2 c6 6. f3 b5 7. Nge2 Nbd7 8. Bh6 Bxh6 9. Qxh6 Bb7 10. a3 e5 11. O-O-O Qe7 12. Kb1 a6 13. Nc1 O-O-O 14. Nb3 exd4 15. Rxd4 c5 16. Rd1 Nb6 17. g3 Kb8 18. Na5 Ba8 19. Bh3 d5 20. Qf4+ Ka7 21. Rhe1 d4 22. Nd5 Nbxd5 23. exd5 Qd6 24. Rxd4 cxd4 25. Re7+ Kb6 26. Qxd4+ Kxa5 27. b4+ Ka4 28. Qc3 Qxd5 29. Ra7 Bb7 30. Rxb7 Qc4 31. Qxf6 Kxa3 32. Qxa6+ Kxb4 33. c3+ Kxc3 34. Qa1+ Kd2 35. Qb2+ Kd1 36. Bf1 Rd2 37. Rd7 Rxd7 38. Bxc4 bxc4 39. Qxh8 Rd3 40. Qa8 c3 41. Qa4+ Ke1 42. f4 f5 43. Kc1 Rd2 44. Qa7 1-0`
  },
  opera: {
    title: 'Paul Morphy vs. Duke of Brunswick (1858)',
    subtitle: 'The famous "Opera Game" — rapid development & Queen sacrifice',
    pgn: `[Event "Paris Opera"]
[Site "Paris FRA"]
[Date "1858.10.21"]
[White "Morphy, Paul"]
[Black "Duke of Brunswick and Count Isouard"]
[Result "1-0"]

1. e4 e5 2. Nf3 d6 3. d4 Bg4 4. dxe5 Bxf3 5. Qxf3 dxe5 6. Bc4 Nf6 7. Qb3 Qe7 8. Nc3 c6 9. Bg5 b5 10. Nxb5 cxb5 11. Bxb5+ Nbd7 12. O-O-O Rd8 13. Rxd7 Rxd7 14. Rd1 Qe6 15. Bxd7+ Nxd7 16. Qb8+ Nxb8 17. Rd8# 1-0`
  }
};

export default function GameAnalysisView({
  initialPgn = '',
  analysisId = null,
  historyId = null,
  savedChessComUsername = '',
  onAnalysisCreated,
  onNewAnalysis,
  onSelectAnalysis
}) {
  // Mode: 'chesscom' | 'paste' | 'upload'
  const [activeTab, setActiveTab] = useState('chesscom');

  // Chess.com mode sub-tab: 'user' | 'url'
  const [chessComSubMode, setChessComSubMode] = useState('user'); // 'user' | 'url'
  const [usernameInput, setUsernameInput] = useState(savedChessComUsername || 'supreme_assassin');
  const [gameUrlInput, setGameUrlInput] = useState('');

  // Chess.com games state
  const [games, setGames] = useState([]);
  const [archives, setArchives] = useState([]);
  const [selectedArchive, setSelectedArchive] = useState('');
  const [gameLimit, setGameLimit] = useState(20);
  const [isFetchingGames, setIsFetchingGames] = useState(false);
  const [fetchError, setFetchError] = useState('');

  // Filters for fetched games
  const [filterFormat, setFilterFormat] = useState('all'); // 'all' | 'rapid' | 'blitz' | 'bullet' | 'daily'
  const [opponentSearch, setOpponentSearch] = useState('');

  // Paste / Upload state
  const [pgnInput, setPgnInput] = useState(initialPgn || '');
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  // Analysis engine state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [currentPly, setCurrentPly] = useState(0);
  const [initialVariation, setInitialVariation] = useState(null);
  const [commentary, setCommentary] = useState([]);
  const [loadError, setLoadError] = useState('');
  const [activeHistoryId, setActiveHistoryId] = useState(historyId || null);

  const analysisAbortRef = useRef(null);
  const analysisRunRef = useRef(0);
  const lastInitialPgnRef = useRef(null);
  const resumeSaveTimerRef = useRef(null);
  const lastSavedResumeKeyRef = useRef(null);

  // 1. Fetch Games from Chess.com by Username & Archive
  const handleFetchGames = useCallback(async (targetUsername, limitToFetch = gameLimit, archiveToFetch = selectedArchive) => {
    const userToFetch = (targetUsername || usernameInput || '').trim();
    if (!userToFetch) {
      setFetchError('Please enter a Chess.com username.');
      return;
    }

    setIsFetchingGames(true);
    setFetchError('');
    try {
      const data = await getChessComRecentGames(userToFetch, {
        limit: limitToFetch,
        archive: archiveToFetch || null
      });
      setGames(data.games || []);
      setArchives(data.archives || []);
      if (!data.games || data.games.length === 0) {
        setFetchError(`No public games found for "${userToFetch}" in the selected timeframe.`);
      }
    } catch (err) {
      setFetchError(err.message || 'Could not fetch games from Chess.com.');
    } finally {
      setIsFetchingGames(false);
    }
  }, [usernameInput, gameLimit, selectedArchive]);

  // Auto-fetch on initial mount
  useEffect(() => {
    if (!analysisResult && !initialPgn && !analysisId && !historyId) {
      handleFetchGames(usernameInput, 20);
    }
  }, []);

  // When selected archive dropdown changes
  const handleArchiveChange = (newArchiveUrl) => {
    setSelectedArchive(newArchiveUrl);
    handleFetchGames(usernameInput, 50, newArchiveUrl);
  };

  // Load more games
  const handleLoadMore = () => {
    const nextLimit = gameLimit + 20;
    setGameLimit(nextLimit);
    handleFetchGames(usernameInput, nextLimit, selectedArchive);
  };

  // 2. Fetch Single Game by Direct Chess.com URL or ID
  const handleLoadByUrl = async (e) => {
    e?.preventDefault();
    if (!gameUrlInput.trim()) {
      setFetchError('Please paste a Chess.com game URL or ID.');
      return;
    }

    setIsFetchingGames(true);
    setFetchError('');
    try {
      const gameData = await getChessComGameById(gameUrlInput.trim());
      if (gameData?.pgn) {
        startAnalysis(gameData.pgn);
      } else {
        setFetchError('Could not retrieve PGN for this game URL.');
      }
    } catch (err) {
      setFetchError(err.message || 'Could not load game from Chess.com.');
    } finally {
      setIsFetchingGames(false);
    }
  };

  // 3. Start Stockfish Analysis
  const startAnalysis = useCallback(async (pgnText, forHistoryId = null) => {
    if (!pgnText || !pgnText.trim()) return;
    const cleanPgn = pgnText.trim();
    setPgnInput(cleanPgn);

    analysisAbortRef.current?.abort();
    const controller = new AbortController();
    analysisAbortRef.current = controller;
    const runId = ++analysisRunRef.current;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setCurrentPly(0);
    setInitialVariation(null);
    setCommentary([]);
    setLoadError('');

    try {
      const preview = createAnalysisPreview(cleanPgn);
      setAnalysisResult(preview);

      const result = await analyzePgnGame(cleanPgn, (progress) => {
        if (analysisRunRef.current !== runId) return;
        const pct = typeof progress === 'number' ? progress : progress?.percentage ?? 0;
        setAnalysisProgress(pct);
        if (progress?.report) {
          setAnalysisResult(progress.report);
        }
      }, {
        signal: controller.signal,
        depth: STOCKFISH_SEARCH.depth,
        threads: STOCKFISH_SEARCH.threads,
        hashMb: STOCKFISH_SEARCH.hashMb,
        multiPv: 1
      });

      if (analysisRunRef.current === runId) {
        setAnalysisResult(result);
        setIsAnalyzing(false);
        setCurrentPly(0);

        const candidates = selectCommentaryCandidates(result);
        const fallbackCommentary = candidates.flatMap((candidate) => {
          const text = createCommentaryFallback(candidate);
          return text ? [{ id: candidate.id, ply: candidate.ply, text, source: 'verified-engine' }] : [];
        });
        setCommentary(fallbackCommentary);

        const whiteAcc = typeof result.accuracy?.white === 'number'
          ? result.accuracy.white
          : (typeof result.whiteAccuracy === 'number' ? result.whiteAccuracy : 0);
        const blackAcc = typeof result.accuracy?.black === 'number'
          ? result.accuracy.black
          : (typeof result.blackAccuracy === 'number' ? result.blackAccuracy : 0);

        const targetId = forHistoryId || activeHistoryId;
        if (targetId) {
          updateGameAccuracy(targetId, {
            white: Math.round(whiteAcc * 10) / 10,
            black: Math.round(blackAcc * 10) / 10
          }).catch(() => {});
        }

        if (analysisId) {
          const headers = result.headers || {};
          const title = `${headers.white || 'White'} vs ${headers.black || 'Black'}${headers.date ? ` · ${headers.date}` : ''}`;
          createAnalysis({ title, pgn: cleanPgn, report: result, selectedPly: 0 })
            .then(({ analysis }) => onAnalysisCreated?.(analysis.id))
            .catch(() => {});
        }

        if (candidates.length) {
          generateAnalysisCommentary(analysisId, cleanPgn, result)
            .then((entries) => {
              if (analysisRunRef.current !== runId) return;
              if (entries?.length) {
                setCommentary(entries);
                if (analysisId) saveLocalCommentary(analysisId, entries);
              }
            })
            .catch(() => {});
        }
      }
    } catch (err) {
      if (err?.name !== 'AbortError' && analysisRunRef.current === runId) {
        setIsAnalyzing(false);
        setLoadError(err.message || 'Analysis failed.');
      }
    }
  }, [activeHistoryId, analysisId, onAnalysisCreated]);

  // Load game from history if historyId in URL
  useEffect(() => {
    setActiveHistoryId(historyId || null);
    if (!historyId) return;

    let active = true;
    getGameById(historyId)
      .then((game) => {
        if (!active) return;
        if (game?.pgn) {
          startAnalysis(game.pgn, historyId);
        } else {
          setLoadError('No PGN moves found for this game.');
        }
      })
      .catch((err) => {
        if (!active) return;
        setLoadError(err.message || 'Unable to load game from history.');
      });

    return () => { active = false; };
  }, [historyId, startAnalysis]);

  // Load legacy analysis if analysisId in URL
  useEffect(() => {
    if (!analysisId) return;
    let active = true;
    loadAnalysis(analysisId)
      .then((record) => {
        if (!active) return;
        setPgnInput(record.sourcePgn);
        setAnalysisResult(record.report);
        setCurrentPly(record.selectedPly || 0);
        setCommentary(record.commentary || []);
        setInitialVariation(record.variation || null);
      })
      .catch((err) => {
        if (!active) return;
        setLoadError(err.message || 'Unable to load saved analysis.');
      });
    return () => { active = false; };
  }, [analysisId]);

  // Debounced resume saving (legacy only)
  const handleResumeChange = useCallback(({ selectedPly, currentFen, variation }) => {
    if (!analysisId) return;
    const key = `${selectedPly}:${currentFen}:${variation?.cursor || 0}:${variation?.moves?.length || 0}`;
    if (lastSavedResumeKeyRef.current === key) return;
    clearTimeout(resumeSaveTimerRef.current);
    resumeSaveTimerRef.current = setTimeout(() => {
      lastSavedResumeKeyRef.current = key;
      saveAnalysisResume(analysisId, { selectedPly, currentFen, variation }).catch(() => {});
    }, 1500);
  }, [analysisId]);

  // Upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string' && content.trim()) {
        startAnalysis(content);
      } else {
        setUploadError('The selected file is empty.');
      }
    };
    reader.onerror = () => setUploadError('Failed to read file.');
    reader.readAsText(file);
  };

  // Filtered games
  const filteredGames = useMemo(() => {
    return games.filter((g) => {
      if (filterFormat !== 'all' && g.timeClass !== filterFormat) return false;
      if (opponentSearch.trim()) {
        const query = opponentSearch.trim().toLowerCase();
        const oppName = (g.opponent?.username || '').toLowerCase();
        if (!oppName.includes(query)) return false;
      }
      return true;
    });
  }, [games, filterFormat, opponentSearch]);

  return (
    <div className="w-full h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-hidden flex flex-col justify-center">
      
      {/* 1. Main View: Interactive Analysis Board */}
      {analysisResult ? (
        <InteractiveAnalysisBoard
          analysisResult={analysisResult}
          currentPly={currentPly}
          onSelectOriginalPly={setCurrentPly}
          initialVariation={initialVariation}
          onResumeChange={handleResumeChange}
          commentary={commentary}
          isAnalyzing={isAnalyzing}
          analysisProgress={analysisProgress}
          onNewAnalysis={() => {
            setAnalysisResult(null);
            setPgnInput('');
            setActiveHistoryId(null);
            onNewAnalysis?.();
          }}
          engineEnabled={!isAnalyzing}
        />
      ) : (
        /* 2. Minimalist Single-Screen Game Selection */
        <div className="max-w-3xl w-full mx-auto px-4 py-6 overflow-y-auto max-h-full">
          <div className="bg-[#101524] border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-4 shadow-2xl animate-fade-in">
            
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <Activity size={20} />
              </div>
              <div>
                <h1 className="text-xl font-black text-white tracking-tight">
                  Game Analysis
                </h1>
                <p className="text-xs text-slate-400">
                  Select any game from Chess.com or paste PGN for instant Stockfish evaluation & move review.
                </p>
              </div>
            </div>

            {/* Error alerts */}
            {(loadError || fetchError || uploadError) && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                <span>{loadError || fetchError || uploadError}</span>
              </div>
            )}

            {/* Main Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('chesscom')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl transition-all ${
                  activeTab === 'chesscom'
                    ? 'bg-blue-600 text-white shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Globe size={14} />
                <span>Chess.com Games</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('paste')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl transition-all ${
                  activeTab === 'paste'
                    ? 'bg-blue-600 text-white shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ClipboardPaste size={14} />
                <span>Paste PGN</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl transition-all ${
                  activeTab === 'upload'
                    ? 'bg-blue-600 text-white shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Upload size={14} />
                <span>Upload .pgn</span>
              </button>
            </div>

            {/* TAB 1: CHESS.COM GAMES SELECTOR */}
            {activeTab === 'chesscom' && (
              <div className="space-y-3.5">
                
                {/* Sub-modes: By Username VS Direct URL/ID */}
                <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setChessComSubMode('user')}
                      className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                        chessComSubMode === 'user'
                          ? 'bg-slate-800 text-blue-400 font-bold border border-blue-500/30'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Browse by Username
                    </button>
                    <button
                      type="button"
                      onClick={() => setChessComSubMode('url')}
                      className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                        chessComSubMode === 'url'
                          ? 'bg-slate-800 text-blue-400 font-bold border border-blue-500/30'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Paste Game Link / ID
                    </button>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                    No database pollution
                  </span>
                </div>

                {/* Sub-mode A: Search Username with Archive Selector */}
                {chessComSubMode === 'user' && (
                  <>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleFetchGames(usernameInput, 20, selectedArchive);
                      }}
                      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                    >
                      {/* Username input */}
                      <div className="relative flex-1">
                        <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          placeholder="Chess.com username (e.g. supreme_assassin)..."
                          value={usernameInput}
                          onChange={(e) => setUsernameInput(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs font-sans placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      {/* Month / Archive dropdown */}
                      {archives.length > 0 && (
                        <div className="sm:w-44">
                          <select
                            value={selectedArchive}
                            onChange={(e) => handleArchiveChange(e.target.value)}
                            className="w-full px-2.5 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
                          >
                            <option value="">All Recent Games</option>
                            {archives.slice(0, 12).map((a) => (
                              <option key={a.url} value={a.url}>
                                {a.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isFetchingGames || !usernameInput.trim()}
                        className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md disabled:opacity-40 transition-colors shrink-0 cursor-pointer"
                      >
                        {isFetchingGames ? <Loader2 size={14} className="animate-spin" /> : <Globe size={14} />}
                        <span>{isFetchingGames ? 'Fetching...' : 'Fetch Games'}</span>
                      </button>
                    </form>

                    {/* Filter & Opponent Search Bar */}
                    {games.length > 0 && (
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-1 overflow-x-auto text-[11px]">
                          {['all', 'blitz', 'rapid', 'bullet', 'daily'].map((fmt) => (
                            <button
                              key={fmt}
                              type="button"
                              onClick={() => setFilterFormat(fmt)}
                              className={`px-2.5 py-1 rounded-lg capitalize transition-colors font-medium ${
                                filterFormat === fmt
                                  ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50 font-bold'
                                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                              }`}
                            >
                              {fmt === 'all' ? 'All' : fmt}
                            </button>
                          ))}
                        </div>

                        <div className="relative sm:w-48">
                          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input
                            type="text"
                            placeholder="Filter opponent..."
                            value={opponentSearch}
                            onChange={(e) => setOpponentSearch(e.target.value)}
                            className="w-full pl-7 pr-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-white text-[11px] focus:outline-none focus:border-blue-500 placeholder-slate-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* Games List */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold px-1">
                        <span>
                          {games.length > 0
                            ? `Showing ${filteredGames.length} of ${games.length} games for ${usernameInput}`
                            : `Games for ${usernameInput}`}
                        </span>
                      </div>

                      {isFetchingGames ? (
                        <div className="py-12 flex flex-col items-center justify-center space-y-2 text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800/80">
                          <Loader2 size={22} className="animate-spin text-blue-500" />
                          <p className="text-xs font-mono">Fetching games from Chess.com archives...</p>
                        </div>
                      ) : filteredGames.length === 0 ? (
                        <div className="py-8 text-center text-xs text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800/80">
                          {games.length === 0
                            ? 'Enter a Chess.com username and click "Fetch Games" to select any game.'
                            : 'No games match your opponent / format filter.'}
                        </div>
                      ) : (
                        <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
                          {filteredGames.map((game, idx) => {
                            const isWin = game.userResult === 'win';
                            const isLoss = game.userResult === 'loss';

                            return (
                              <div
                                key={game.id || idx}
                                onClick={() => startAnalysis(game.pgn)}
                                className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-blue-500/60 hover:bg-slate-800/60 cursor-pointer transition-all group shadow-sm"
                                title="Click to analyze this game"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  {/* Color & Result Badge */}
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <span
                                      className={`w-3 h-3 rounded-full border ${
                                        game.userColor === 'white'
                                          ? 'bg-white border-slate-300'
                                          : 'bg-slate-950 border-slate-700'
                                      }`}
                                      title={`Played as ${game.userColor}`}
                                    />
                                    <span
                                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                                        isWin
                                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                          : isLoss
                                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                          : 'bg-slate-700 text-slate-300'
                                      }`}
                                    >
                                      {isWin ? 'WIN' : isLoss ? 'LOSS' : 'DRAW'}
                                    </span>
                                  </div>

                                  {/* Opponent & Meta */}
                                  <div className="min-w-0">
                                    <div className="text-xs font-bold text-white truncate group-hover:text-blue-300 transition-colors">
                                      vs {game.opponent?.username || 'Opponent'}
                                      {game.opponent?.rating && (
                                        <span className="text-[10px] font-mono text-slate-500 ml-1 font-normal">
                                          ({game.opponent.rating})
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                                      <span className="capitalize">{game.timeClass || game.timeControl}</span>
                                      {game.date && <span>• {game.date}</span>}
                                    </div>
                                  </div>
                                </div>

                                {/* Analyze Action */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    startAnalysis(game.pgn);
                                  }}
                                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white font-bold text-[11px] shrink-0 shadow transition-all group-hover:scale-105"
                                >
                                  <Play size={10} className="fill-current" />
                                  <span>Analyze</span>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Load More Button */}
                      {!selectedArchive && games.length >= 20 && !isFetchingGames && (
                        <div className="pt-2 text-center">
                          <button
                            type="button"
                            onClick={handleLoadMore}
                            className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-blue-400 hover:text-blue-300 text-xs font-semibold transition-colors"
                          >
                            Load More Games (+20)
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Sub-mode B: Direct Chess.com Game Link / ID Input */}
                {chessComSubMode === 'url' && (
                  <form onSubmit={handleLoadByUrl} className="space-y-3 pt-2">
                    <div className="relative">
                      <LinkIcon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Paste Chess.com game link or ID (e.g. chess.com/game/live/185961891956)..."
                        value={gameUrlInput}
                        onChange={(e) => setGameUrlInput(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs font-sans placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">
                        Works with any public live chess game link
                      </span>

                      <button
                        type="submit"
                        disabled={isFetchingGames || !gameUrlInput.trim()}
                        className="flex items-center gap-1.5 px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md disabled:opacity-40 transition-colors cursor-pointer"
                      >
                        {isFetchingGames ? <Loader2 size={14} className="animate-spin" /> : <Play size={12} className="fill-current" />}
                        <span>Load & Analyze Game</span>
                      </button>
                    </div>
                  </form>
                )}

              </div>
            )}

            {/* TAB 2: PASTE PGN */}
            {activeTab === 'paste' && (
              <div className="space-y-3">
                <textarea
                  rows={6}
                  placeholder="Paste game PGN here (e.g. 1. e4 e5 2. Nf3 Nc6...)"
                  value={pgnInput}
                  onChange={(e) => setPgnInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 text-slate-200 rounded-2xl p-3.5 text-xs font-mono focus:outline-none focus:border-blue-500 leading-relaxed"
                />

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-mono text-slate-500">Samples:</span>
                    <button
                      type="button"
                      onClick={() => startAnalysis(SAMPLE_GAMES.kasparov.pgn)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-amber-300 hover:border-amber-400 text-xs font-medium transition-all"
                    >
                      Kasparov's Immortal
                    </button>
                    <button
                      type="button"
                      onClick={() => startAnalysis(SAMPLE_GAMES.opera.pgn)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-sky-300 hover:border-sky-400 text-xs font-medium transition-all"
                    >
                      Morphy Opera
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => startAnalysis(pgnInput)}
                    disabled={!pgnInput.trim()}
                    className="flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 disabled:opacity-40 transition-all cursor-pointer"
                  >
                    <Sparkles size={14} />
                    <span>Analyze PGN</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: UPLOAD .PGN FILE */}
            {activeTab === 'upload' && (
              <div className="space-y-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".pgn,.txt"
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 hover:border-blue-500/70 bg-slate-900/50 hover:bg-slate-900/80 rounded-2xl p-8 text-center cursor-pointer transition-all space-y-2 group"
                >
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Upload size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      Click to choose or drag a .pgn file here
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Supports standard .pgn and .txt files
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
