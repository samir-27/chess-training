import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Activity,
  Plus,
  Sparkles
} from 'lucide-react';
import {
  analyzePgnGame,
  createAnalysisPreview
} from '../../services/gameAnalysisEngine.js';
import { STOCKFISH_SEARCH } from '../../services/stockfishEngine.js';
import { createCommentaryFallback, selectCommentaryCandidates } from '../../services/moveCommentary.js';
import {
  createAnalysis,
  deleteAnalysis,
  generateAnalysisCommentary,
  getApiHealth,
  listAnalyses,
  loadAnalysis,
  saveLocalCommentary,
  saveAnalysisResume
} from '../../services/analysisRepository.js';
import InteractiveAnalysisBoard from './InteractiveAnalysisBoard.jsx';

// Sample master games for immediate 1-click testing
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
  onAnalysisCreated,
  onNewAnalysis,
  onSelectAnalysis
}) {
  const [pgnInput, setPgnInput] = useState(initialPgn || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [currentPly, setCurrentPly] = useState(0);
  const [initialVariation, setInitialVariation] = useState(null);
  const [savedAnalyses, setSavedAnalyses] = useState([]);
  const [savedLoadError, setSavedLoadError] = useState('');
  const [persistenceMessage, setPersistenceMessage] = useState('');
  const [commentary, setCommentary] = useState([]);
  const [apiHealth, setApiHealth] = useState(null);
  const [isLoadingSaved, setIsLoadingSaved] = useState(() => Boolean(analysisId));

  const analysisAbortRef = useRef(null);
  const analysisRunRef = useRef(0);
  const lastInitialPgnRef = useRef(null);
  const resumeSaveTimerRef = useRef(null);
  const resumeSaveRunRef = useRef(0);

  const startAnalysis = useCallback(async (pgnText) => {
    if (!pgnText.trim()) return;
    setPgnInput(pgnText);
    analysisAbortRef.current?.abort();
    const controller = new AbortController();
    analysisAbortRef.current = controller;
    const runId = ++analysisRunRef.current;
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setCurrentPly(0);
    setInitialVariation(null);
    setCommentary([]);

    try {
      const preview = createAnalysisPreview(pgnText);
      setAnalysisResult(preview);

      const result = await analyzePgnGame(pgnText, (progress) => {
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

        // Pre-generate engine fallback commentary so commentary is immediately visible
        const fallbackCommentary = candidates.flatMap((candidate) => {
          const text = createCommentaryFallback(candidate);
          return text ? [{ id: candidate.id, ply: candidate.ply, text, source: 'verified-engine' }] : [];
        });
        setCommentary(fallbackCommentary);

        const headers = result.headers || {};
        const title = `${headers.white || 'White'} vs ${headers.black || 'Black'}${headers.date ? ` · ${headers.date}` : ''}`;
        
        try {
          const { analysis, persistenceMessage: message } = await createAnalysis({
            title,
            pgn: pgnText,
            report: result,
            selectedPly: 0
          });
          setPersistenceMessage(message);
          onAnalysisCreated?.(analysis.id);

          if (candidates.length) {
            generateAnalysisCommentary(analysis.id, pgnText, result)
              .then((entries) => {
                if (analysisRunRef.current !== runId) return;
                if (entries?.length) {
                  setCommentary(entries);
                  saveLocalCommentary(analysis.id, entries);
                }
              })
              .catch(() => {});
          }
        } catch {
          // Local analysis persistence fallback handled cleanly
        }
      }
    } catch (err) {
      if (err?.name !== 'AbortError' && analysisRunRef.current === runId) {
        setIsAnalyzing(false);
        setPersistenceMessage(err.message || 'Analysis failed.');
      }
    }
  }, [onAnalysisCreated]);

  // Load initial PGN or sample game on mount if empty
  useEffect(() => {
    if (initialPgn && initialPgn !== lastInitialPgnRef.current) {
      lastInitialPgnRef.current = initialPgn;
      startAnalysis(initialPgn);
    }
  }, [initialPgn, startAnalysis]);

  // Load saved analysis if analysisId in URL
  useEffect(() => {
    if (!analysisId) {
      setIsLoadingSaved(false);
      return undefined;
    }
    let active = true;
    setIsLoadingSaved(true);
    setSavedLoadError('');

    loadAnalysis(analysisId)
      .then((record) => {
        if (!active) return;
        setPgnInput(record.sourcePgn);
        setAnalysisResult(record.report);
        setCurrentPly(Math.max(0, Math.min(record.selectedPly || 0, (record.report?.positions?.length || 1) - 1)));
        setCommentary(record.commentary || []);
        setInitialVariation(record.variation || null);
        setIsLoadingSaved(false);
      })
      .catch((error) => {
        if (!active) return;
        setIsLoadingSaved(false);
        setSavedLoadError(error.message || 'Unable to load saved analysis.');
      });

    return () => { active = false; };
  }, [analysisId]);

  // API Health Check
  useEffect(() => {
    let active = true;
    getApiHealth()
      .then((health) => { if (active) setApiHealth(health); })
      .catch((error) => { if (active) setApiHealth({ api: { available: false }, error: error.message }); });
    listAnalyses()
      .then((list) => { if (active) setSavedAnalyses(list); })
      .catch(() => {});
    return () => { active = false; };
  }, [analysisId]);

  // Debounced resume saving
  const handleResumeChange = useCallback(({ selectedPly, currentFen, variation }) => {
    if (!analysisId) return;
    const saveRun = ++resumeSaveRunRef.current;
    clearTimeout(resumeSaveTimerRef.current);
    resumeSaveTimerRef.current = setTimeout(() => {
      saveAnalysisResume(analysisId, { selectedPly, currentFen, variation })
        .catch(() => {});
    }, 600);
  }, [analysisId]);

  const handleDeleteAnalysis = async (id) => {
    try {
      await deleteAnalysis(id);
      setSavedAnalyses((current) => current.filter((analysis) => analysis.id !== id));
      if (id === analysisId) onNewAnalysis?.();
    } catch {
      // Ignored
    }
  };

  return (
    <div className="w-full h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-hidden flex flex-col justify-center">
      
      {/* 1. Main View: Unified Single-Screen Analysis (matches screenshots) */}
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
            onNewAnalysis?.();
          }}
          engineEnabled={!isAnalyzing}
        />
      ) : (
        /* 2. PGN Ingestion Modal / Card (when no game is loaded) */
        <div className="max-w-3xl w-full mx-auto px-4 py-6 overflow-y-auto max-h-full">
          <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 lg:p-8 space-y-6 shadow-2xl animate-fade-in">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-blue-500/20 text-blue-400">
                  <Activity size={18} />
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
                  Game Analysis & AI Coach
                </span>
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                Import Chess Game
              </h1>
              <p className="text-xs text-slate-400">
                Paste any PGN from Chess.com, Lichess, or tournaments for instant move classification, evaluation graph, accuracy scores, and AI Coach commentary.
              </p>
            </div>

            {savedLoadError && (
              <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-200">
                {savedLoadError}
              </p>
            )}

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Game PGN
              </label>
              <textarea
                rows={5}
                placeholder="1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6..."
                value={pgnInput}
                onChange={(e) => setPgnInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 text-slate-200 rounded-2xl p-4 text-xs font-mono focus:outline-none focus:border-blue-500/60 leading-relaxed"
              />
            </div>

            {/* Quick Master Sample Games & Action Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-slate-500">Quick Samples:</span>
                <button
                  type="button"
                  onClick={() => {
                    setPgnInput(SAMPLE_GAMES.kasparov.pgn);
                    startAnalysis(SAMPLE_GAMES.kasparov.pgn);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-amber-300 hover:border-amber-400/50 text-xs font-semibold transition-all"
                >
                  Kasparov's Immortal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPgnInput(SAMPLE_GAMES.opera.pgn);
                    startAnalysis(SAMPLE_GAMES.opera.pgn);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-sky-300 hover:border-sky-400/50 text-xs font-semibold transition-all"
                >
                  Morphy Opera Game
                </button>
              </div>

              <button
                type="button"
                onClick={() => startAnalysis(pgnInput)}
                disabled={!pgnInput.trim()}
                className="flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 transition-all cursor-pointer"
              >
                <Sparkles size={16} />
                <span>Analyze Game</span>
              </button>
            </div>

            {/* Saved Analyses List */}
            {savedAnalyses.length > 0 && (
              <div className="border-t border-slate-800 pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span>Saved Analyses</span>
                  <span>{savedAnalyses.length}</span>
                </div>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {savedAnalyses.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
                      <button
                        type="button"
                        onClick={() => onSelectAnalysis?.(item.id)}
                        className="text-left flex-1 min-w-0"
                      >
                        <span className="text-xs font-bold text-slate-200 block truncate">{item.title || 'Game Analysis'}</span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {item.headers?.white || 'White'} vs {item.headers?.black || 'Black'}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteAnalysis(item.id)}
                        className="text-slate-500 hover:text-rose-400 text-xs p-1"
                        title="Delete"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
