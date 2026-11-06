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
import ChessComImportPanel from './ChessComImportPanel.jsx';
import PgnPastePanel from './PgnPastePanel.jsx';
import PgnUploadPanel from './PgnUploadPanel.jsx';

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
        multiPv: STOCKFISH_SEARCH.defaultMultiPv || 2
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
          <div className="glass-panel border border-brand-border rounded-3xl p-5 sm:p-7 space-y-4 shadow-2xl animate-fadeIn">
            
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0 shadow-md">
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
            <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-2xl border border-brand-border text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('chesscom')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'chesscom'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Globe size={14} />
                <span>Chess.com Games</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('paste')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'paste'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <ClipboardPaste size={14} />
                <span>Paste PGN</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'upload'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Upload size={14} />
                <span>Upload .pgn</span>
              </button>
            </div>

            {/* TAB 1: CHESS.COM GAMES SELECTOR */}
            {activeTab === 'chesscom' && (
              <ChessComImportPanel
                chessComSubMode={chessComSubMode}
                setChessComSubMode={setChessComSubMode}
                usernameInput={usernameInput}
                setUsernameInput={setUsernameInput}
                archives={archives}
                selectedArchive={selectedArchive}
                onArchiveChange={handleArchiveChange}
                isFetchingGames={isFetchingGames}
                onFetchGames={handleFetchGames}
                filterFormat={filterFormat}
                setFilterFormat={setFilterFormat}
                opponentSearch={opponentSearch}
                setOpponentSearch={setOpponentSearch}
                games={games}
                filteredGames={filteredGames}
                onSelectGame={startAnalysis}
                onLoadMore={handleLoadMore}
                gameUrlInput={gameUrlInput}
                setGameUrlInput={setGameUrlInput}
                onLoadByUrl={handleLoadByUrl}
              />
            )}

            {/* TAB 2: PASTE PGN */}
            {activeTab === 'paste' && (
              <PgnPastePanel
                pgnInput={pgnInput}
                setPgnInput={setPgnInput}
                sampleGames={SAMPLE_GAMES}
                onAnalyze={startAnalysis}
              />
            )}

            {/* TAB 3: UPLOAD .PGN FILE */}
            {activeTab === 'upload' && (
              <PgnUploadPanel
                fileInputRef={fileInputRef}
                onFileUpload={handleFileUpload}
              />
            )}

          </div>
        </div>
      )}

    </div>
  );
}
