import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import {
  Activity,
  FileText,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Sparkles,
  Plus,
  Cpu
} from 'lucide-react';
import {
  analyzePgnGame,
  Classification,
  CLASSIFICATION_META,
  centipawnsToWinChance
} from '../../services/gameAnalysisEngine.js';

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

export default function GameAnalysisView() {
  const [pgnInput, setPgnInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeSideTab, setActiveSideTab] = useState('report'); // 'report' | 'analysis'
  const [boardOrientation, setBoardOrientation] = useState('white'); // 'white' | 'black'
  const [currentPly, setCurrentPly] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playTimerRef = useRef(null);

  const startAnalysis = async (pgnText) => {
    if (!pgnText.trim()) return;
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisResult(null);
    setCurrentPly(0);
    setIsPlaying(false);
    setActiveSideTab('report');

    try {
      const result = await analyzePgnGame(pgnText, (prog) => {
        setAnalysisProgress(prog.percentage);
      });
      setAnalysisResult(result);
      setCurrentPly(0);
    } catch (err) {
      alert('Analysis Error: ' + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const currentPos = useMemo(() => {
    if (!analysisResult?.positions) return null;
    return analysisResult.positions[currentPly] || analysisResult.positions[0];
  }, [analysisResult, currentPly]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, []);

  // Auto-play moves
  useEffect(() => {
    if (isPlaying && analysisResult?.positions) {
      playTimerRef.current = setInterval(() => {
        setCurrentPly((prev) => {
          if (prev < analysisResult.positions.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 1200);
    } else {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    }
    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, analysisResult]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (!analysisResult) return;

      if (e.key === 'ArrowRight') {
        setCurrentPly(prev => Math.min(analysisResult.positions.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentPly(prev => Math.max(0, prev - 1));
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [analysisResult]);

  // Calculate Eval Bar visual height: 0% (White completely lost) to 100% (White completely winning)
  const evalBarPercent = useMemo(() => {
    if (!currentPos) return 50;
    const score = currentPos.score || 0;
    const winChance = centipawnsToWinChance(score);
    return Math.max(5, Math.min(95, winChance));
  }, [currentPos]);

  // Move classification badge on board square
  const customSquareStyles = useMemo(() => {
    if (!currentPos || !currentPos.to) return {};
    const meta = currentPos.classification ? CLASSIFICATION_META[currentPos.classification] : null;
    if (!meta) return {};

    return {
      [currentPos.to]: {
        backgroundColor: `${meta.dotColor}33`,
        boxShadow: `inset 0 0 10px ${meta.dotColor}88`
      }
    };
  }, [currentPos]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-amber-500/20 text-amber-400">
              <Activity size={16} />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
              Lichess Cloud & Stockfish Multi-PV
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Game Analysis & Accuracy
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Upload or paste any chess game PGN to review move accuracy, tactical classifications, and multi-line engine evaluations.
          </p>
        </div>

        {/* Highlighted New Analysis Button */}
        {analysisResult && (
          <button
            onClick={() => {
              setAnalysisResult(null);
              setIsPlaying(false);
            }}
            className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/25 ring-2 ring-amber-400/50 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0"
          >
            <Plus size={16} className="stroke-[3]" />
            <span>New Analysis</span>
          </button>
        )}
      </div>

      {/* PGN Ingestion Form (when no game is analyzed) */}
      {!analysisResult && !isAnalyzing && (
        <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-6 lg:p-8 space-y-6 shadow-2xl animate-fadeIn">
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Paste Game PGN (or load a sample match)
            </label>
            <textarea
              rows={5}
              placeholder="Paste PGN here (e.g. from Chess.com, Lichess, or tournament score)..."
              value={pgnInput}
              onChange={(e) => setPgnInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded-2xl p-4 text-xs font-mono focus:outline-none focus:border-amber-500/60 leading-relaxed"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-slate-500">Quick Samples:</span>
              <button
                onClick={() => {
                  setPgnInput(SAMPLE_GAMES.kasparov.pgn);
                  startAnalysis(SAMPLE_GAMES.kasparov.pgn);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-300 hover:border-amber-500/40 text-xs font-semibold transition-all"
              >
                Kasparov's Immortal (1999)
              </button>
              <button
                onClick={() => {
                  setPgnInput(SAMPLE_GAMES.opera.pgn);
                  startAnalysis(SAMPLE_GAMES.opera.pgn);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-sky-300 hover:border-sky-500/40 text-xs font-semibold transition-all"
              >
                Morphy Opera Game (1858)
              </button>
            </div>

            <button
              onClick={() => startAnalysis(pgnInput)}
              disabled={!pgnInput.trim()}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 disabled:opacity-40 transition-all"
            >
              <Sparkles size={16} />
              <span>Analyze Game</span>
            </button>
          </div>
        </div>
      )}

      {/* Progress Bar during Analysis */}
      {isAnalyzing && (
        <div className="bg-[#111728] border border-slate-800 rounded-3xl p-8 lg:p-12 text-center space-y-4 shadow-2xl animate-fadeIn">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto animate-pulse">
            <Activity size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Analyzing Game...</h2>
            <p className="text-xs text-slate-400 mt-1">
              Evaluating with Lichess Cloud & Stockfish APIs ({analysisProgress}%).
            </p>
          </div>
          <div className="w-full max-w-md mx-auto bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-300"
              style={{ width: `${analysisProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Unified Screen: Shared Board on Left + Vertical Side Bar on Right */}
      {analysisResult && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN: SHARED BOARD, EVAL BAR & PLAYBACK (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Board Console: Player Names, Flip Button, Eval Bar + Chessboard */}
              {(() => {
                const isWhiteBottom = boardOrientation === 'white';
                const topPlayer = isWhiteBottom ? {
                  name: analysisResult.headers.black,
                  elo: analysisResult.headers.blackElo,
                  accuracy: analysisResult.accuracies.black,
                  piece: '♚',
                  color: 'text-amber-400',
                  isWhite: false
                } : {
                  name: analysisResult.headers.white,
                  elo: analysisResult.headers.whiteElo,
                  accuracy: analysisResult.accuracies.white,
                  piece: '♔',
                  color: 'text-white',
                  isWhite: true
                };

                const bottomPlayer = isWhiteBottom ? {
                  name: analysisResult.headers.white,
                  elo: analysisResult.headers.whiteElo,
                  accuracy: analysisResult.accuracies.white,
                  piece: '♔',
                  color: 'text-white',
                  isWhite: true
                } : {
                  name: analysisResult.headers.black,
                  elo: analysisResult.headers.blackElo,
                  accuracy: analysisResult.accuracies.black,
                  piece: '♚',
                  color: 'text-amber-400',
                  isWhite: false
                };

                return (
                  <div className="bg-[#111728] border border-slate-800/80 rounded-3xl p-4 lg:p-5 shadow-2xl space-y-3">
                    
                    {/* Top Player Bar + Flip Board Button */}
                    <div className="flex items-center justify-between px-1">
                      <div className="flex items-center gap-2.5">
                        <span className={`text-xl font-bold ${topPlayer.color}`}>
                          {topPlayer.piece}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>{topPlayer.name}</span>
                            {topPlayer.elo && (
                              <span className="text-[10px] font-mono text-slate-500">({topPlayer.elo})</span>
                            )}
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold bg-slate-900 border border-slate-800 text-amber-400">
                          {topPlayer.accuracy}%
                        </span>
                      </div>

                      <button
                        onClick={() => setBoardOrientation(prev => prev === 'white' ? 'black' : 'white')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-all shadow-sm"
                        title="Flip board orientation"
                      >
                        <RotateCcw size={13} />
                        <span>Flip Board</span>
                      </button>
                    </div>

                    {/* Center: Eval Bar + Chessboard */}
                    <div className="flex items-center justify-center gap-3">
                      {/* Vertical Evaluation Bar */}
                      <div className="h-[430px] w-7 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between relative shadow-xl shrink-0">
                        {/* Top Portion */}
                        <div
                          className={`w-full transition-all duration-300 flex items-start justify-center pt-2 font-mono text-[9px] font-bold ${
                            isWhiteBottom ? 'bg-[#1e293b] text-slate-300' : 'bg-slate-100 text-slate-950'
                          }`}
                          style={{ height: `${isWhiteBottom ? (100 - evalBarPercent) : evalBarPercent}%` }}
                        >
                          {(isWhiteBottom ? evalBarPercent < 50 : evalBarPercent >= 50) && (
                            <span>{currentPos?.score < -9000 || currentPos?.score > 9000 ? 'M' : Math.abs(currentPos?.score / 100).toFixed(1)}</span>
                          )}
                        </div>

                        {/* Bottom Portion */}
                        <div
                          className={`w-full transition-all duration-300 flex items-end justify-center pb-2 font-mono text-[9px] font-bold ${
                            isWhiteBottom ? 'bg-slate-100 text-slate-950' : 'bg-[#1e293b] text-slate-300'
                          }`}
                          style={{ height: `${isWhiteBottom ? evalBarPercent : (100 - evalBarPercent)}%` }}
                        >
                          {(isWhiteBottom ? evalBarPercent >= 50 : evalBarPercent < 50) && (
                            <span>{currentPos?.score > 9000 || currentPos?.score < -9000 ? 'M' : Math.abs(currentPos?.score / 100).toFixed(1)}</span>
                          )}
                        </div>
                      </div>

                      {/* The Chessboard */}
                      <div className="w-full max-w-[430px] aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800/90 relative bg-slate-900">
                        <Chessboard
                          position={currentPos?.fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'}
                          boardOrientation={boardOrientation}
                          customDarkSquareStyle={{ backgroundColor: '#2a3b5c' }}
                          customLightSquareStyle={{ backgroundColor: '#8ea1c1' }}
                          customSquareStyles={customSquareStyles}
                          arePiecesDraggable={false}
                          animationDuration={200}
                        />
                      </div>
                    </div>

                    {/* Bottom Player Bar */}
                    <div className="flex items-center justify-between px-1 pt-1">
                      <div className="flex items-center gap-2.5">
                        <span className={`text-xl font-bold ${bottomPlayer.color}`}>
                          {bottomPlayer.piece}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>{bottomPlayer.name}</span>
                            {bottomPlayer.elo && (
                              <span className="text-[10px] font-mono text-slate-500">({bottomPlayer.elo})</span>
                            )}
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold bg-slate-900 border border-slate-800 text-amber-400">
                          {bottomPlayer.accuracy}%
                        </span>
                      </div>

                      <div className="text-[11px] font-mono text-slate-500">
                        {currentPos?.isWhite ? 'White to move' : 'Black to move'}
                      </div>
                    </div>

                  </div>
                );
              })()}

              {/* Playback Controls Console */}
              <div className="flex items-center justify-between gap-2 bg-[#111728] border border-slate-800/80 p-3 rounded-2xl shadow-xl">
                <button
                  onClick={() => setCurrentPly(0)}
                  disabled={currentPly === 0}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                  title="First Move"
                >
                  <ChevronsLeft size={16} />
                </button>

                <button
                  onClick={() => setCurrentPly(prev => Math.max(0, prev - 1))}
                  disabled={currentPly === 0}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                  title="Previous Move"
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  onClick={() => setIsPlaying(prev => !prev)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all shadow-md shadow-amber-500/10"
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} className="fill-current" />}
                  <span>{isPlaying ? 'Pause' : 'Autoplay'}</span>
                </button>

                <button
                  onClick={() => setCurrentPly(prev => Math.min(analysisResult.positions.length - 1, prev + 1))}
                  disabled={currentPly === analysisResult.positions.length - 1}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                  title="Next Move"
                >
                  <ChevronRight size={16} />
                </button>

                <button
                  onClick={() => setCurrentPly(analysisResult.positions.length - 1)}
                  disabled={currentPly === analysisResult.positions.length - 1}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                  title="Last Move"
                >
                  <ChevronsRight size={16} />
                </button>
              </div>

              {/* Evaluation Advantage Graph Timeline */}
              <div className="bg-[#111728] border border-slate-800/80 rounded-2xl p-4 shadow-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                    Evaluation Advantage Graph
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Ply #{currentPly} • {currentPos ? (currentPos.score / 100).toFixed(2) : '0.00'}
                  </span>
                </div>

                <div className="h-20 w-full flex items-center relative border border-slate-800/60 rounded-xl overflow-hidden bg-slate-950 p-1">
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-800 pointer-events-none" />

                  <div className="flex-1 flex items-center h-full">
                    {analysisResult.positions.map((pos, pIdx) => {
                      const winChance = centipawnsToWinChance(pos.score);
                      const heightPercent = Math.max(6, Math.abs(winChance - 50) * 1.8);
                      const isWhiteAdvantage = winChance >= 50;
                      const isCurrent = currentPly === pIdx;
                      const isBlunder = pos.classification === Classification.BLUNDER;
                      const isBrilliant = pos.classification === Classification.BRILLIANT;

                      return (
                        <button
                          key={pIdx}
                          onClick={() => setCurrentPly(pIdx)}
                          className="flex-1 h-full flex flex-col justify-center items-center group relative hover:bg-slate-850/40 focus:outline-none"
                          title={`Ply ${pIdx}: ${pos.san || 'Start'} (${(pos.score / 100).toFixed(2)})`}
                        >
                          <div className="w-full flex-1 flex flex-col justify-center items-center">
                            <div
                              className={`w-full max-w-[8px] rounded-sm transition-all duration-150 ${
                                isCurrent ? 'ring-2 ring-amber-400 z-10' : ''
                              } ${
                                isBlunder
                                  ? 'bg-rose-500'
                                  : isBrilliant
                                  ? 'bg-cyan-400'
                                  : isWhiteAdvantage
                                  ? 'bg-slate-300'
                                  : 'bg-slate-700'
                              }`}
                              style={{
                                height: `${heightPercent}%`,
                                transform: isWhiteAdvantage ? 'translateY(-50%)' : 'translateY(50%)'
                              }}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: VERTICAL BAR CONTAINING BOTH REPORT & ANALYSIS (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Tab Selection Header above the vertical bar */}
              <div className="bg-[#111728] border border-slate-800/80 p-1.5 rounded-2xl shadow-xl flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveSideTab('report')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeSideTab === 'report'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText size={15} />
                  <span>Report</span>
                </button>

                <button
                  onClick={() => setActiveSideTab('analysis')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeSideTab === 'analysis'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Activity size={15} />
                  <span>Analysis</span>
                </button>
              </div>

              {/* TAB CONTENT: REPORT */}
              {activeSideTab === 'report' && (
                <div className="space-y-4 animate-fadeIn">
                  
                  {/* Compact Player Accuracy Card */}
                  <div className="bg-[#111728] border border-slate-800/80 rounded-2xl p-4 shadow-xl space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800/70">
                      {/* White */}
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-white font-bold text-base">
                          ♔
                        </span>
                        <div>
                          <div className="text-xs font-bold text-white truncate max-w-[110px]">
                            {analysisResult.headers.white}
                          </div>
                          <div className="text-base font-black text-amber-400 font-mono leading-none mt-0.5">
                            {analysisResult.accuracies.white}%
                          </div>
                          <div className="text-[9px] font-mono text-slate-500">
                            {analysisResult.acpl?.white !== undefined ? `${analysisResult.acpl.white} ACPL` : 'White'}
                          </div>
                        </div>
                      </div>

                      {/* Result Pill */}
                      <div className="text-center font-mono px-3 py-1 rounded-xl bg-slate-900 border border-slate-800">
                        <div className="text-xs font-black text-white">{analysisResult.headers.result}</div>
                        <div className="text-[9px] text-slate-500">{analysisResult.totalPlies} Plies</div>
                      </div>

                      {/* Black */}
                      <div className="flex items-center gap-2.5 text-right justify-end">
                        <div>
                          <div className="text-xs font-bold text-white truncate max-w-[110px]">
                            {analysisResult.headers.black}
                          </div>
                          <div className="text-base font-black text-slate-200 font-mono leading-none mt-0.5">
                            {analysisResult.accuracies.black}%
                          </div>
                          <div className="text-[9px] font-mono text-slate-500">
                            {analysisResult.acpl?.black !== undefined ? `${analysisResult.acpl.black} ACPL` : 'Black'}
                          </div>
                        </div>
                        <span className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 font-bold text-base">
                          ♚
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>{analysisResult.headers.event}</span>
                      <span>{analysisResult.headers.date}</span>
                    </div>
                  </div>

                  {/* Vertical Single-Bar Move Classification Breakdown */}
                  <div className="bg-[#111728] border border-slate-800/80 rounded-2xl p-4 shadow-xl space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                        Classification Breakdown
                      </span>
                      <div className="flex items-center gap-4 text-xs font-mono font-bold text-slate-400">
                        <span>♔ White</span>
                        <span>Black ♚</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-0.5">
                      {[
                        Classification.BRILLIANT,
                        Classification.GREAT,
                        Classification.BEST,
                        Classification.BOOK,
                        Classification.INACCURACY,
                        Classification.MISTAKE,
                        Classification.MISS,
                        Classification.BLUNDER
                      ].map(type => {
                        const meta = CLASSIFICATION_META[type];
                        const whiteCount = analysisResult.breakdown.white[type] || 0;
                        const blackCount = analysisResult.breakdown.black[type] || 0;
                        const total = whiteCount + blackCount;
                        const whiteRatio = total > 0 ? (whiteCount / total) * 100 : 50;

                        return (
                          <div
                            key={type}
                            className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-2.5 font-mono text-xs hover:border-slate-700 transition-all"
                          >
                            {/* White count */}
                            <span className="w-7 text-center font-bold text-white text-xs shrink-0">
                              {whiteCount}
                            </span>

                            {/* Category badge */}
                            <div
                              className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg border text-[11px] shrink-0 min-w-[105px]"
                              style={{
                                borderColor: `${meta.dotColor}44`,
                                color: meta.dotColor,
                                backgroundColor: `${meta.dotColor}11`
                              }}
                            >
                              <span className="font-bold">{meta.symbol}</span>
                              <span className="font-sans font-semibold text-[10px]">{meta.label}</span>
                            </div>

                            {/* Horizontal comparison bar */}
                            <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-slate-950 border border-slate-800 flex mx-1">
                              <div
                                className="h-full bg-slate-200 transition-all duration-300"
                                style={{ width: `${total > 0 ? whiteRatio : 0}%` }}
                                title={`White: ${whiteCount}`}
                              />
                              <div
                                className="h-full bg-slate-600 transition-all duration-300"
                                style={{ width: `${total > 0 ? (100 - whiteRatio) : 0}%` }}
                                title={`Black: ${blackCount}`}
                              />
                            </div>

                            {/* Black count */}
                            <span className="w-7 text-center font-bold text-slate-300 text-xs shrink-0">
                              {blackCount}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB CONTENT: ANALYSIS (ENGINE PREFERENCES & MOVE HISTORY) */}
              {activeSideTab === 'analysis' && (
                <div className="space-y-4 animate-fadeIn">
                  
                  {/* Current Move Explanation Card */}
                  <div className="bg-[#111728] border border-slate-800/80 rounded-2xl p-4 shadow-xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {currentPos?.classification && (
                          <span className={`px-2 py-0.5 rounded-lg text-xs font-mono font-bold border flex items-center gap-1.5 ${CLASSIFICATION_META[currentPos.classification]?.badgeColor}`}>
                            <span>{CLASSIFICATION_META[currentPos.classification]?.symbol}</span>
                            <span>{CLASSIFICATION_META[currentPos.classification]?.label}</span>
                          </span>
                        )}
                        <span className="text-xs font-mono text-slate-400 font-bold">
                          {currentPos?.ply === 0 ? 'Start' : `Ply #${currentPos?.ply} (${currentPos?.san})`}
                        </span>
                      </div>

                      <span className="text-xs font-mono text-slate-400 font-bold">
                        Eval: <strong className="text-amber-400">{currentPos ? (currentPos.score / 100).toFixed(2) : '0.00'}</strong>
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {currentPos?.explanation}
                    </p>

                    {currentPos?.bestMove && currentPos?.san !== currentPos?.bestMove?.san && (
                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-500">Engine Best:</span>
                        <span className="text-emerald-400 font-bold">{currentPos.bestMove.san}</span>
                      </div>
                    )}
                  </div>

                  {/* Engine Preferences (Multi-PV Lines) */}
                  <div className="bg-[#111728] border border-slate-800/80 rounded-2xl p-4 shadow-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                        <Cpu size={14} className="text-amber-400" />
                        <span>Engine Preference Lines</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">
                        {currentPos?.lines && currentPos.lines.length > 0 ? `${currentPos.lines.length} Lines` : '1 Line'}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {currentPos?.lines && currentPos.lines.length > 0 ? (
                        currentPos.lines.map((line, idx) => {
                          const isMate = line.mate !== null && line.mate !== undefined;
                          const evalStr = isMate
                            ? `#${line.mate > 0 ? '+' : ''}${line.mate}`
                            : `${line.cp >= 0 ? '+' : ''}${(line.cp / 100).toFixed(2)}`;
                          const isLeading = line.cp > 40 || (isMate && line.mate > 0);
                          const isTrailing = line.cp < -40 || (isMate && line.mate < 0);

                          return (
                            <div
                              key={idx}
                              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/90 flex items-start gap-2.5 text-xs font-mono hover:border-slate-700 transition-all"
                            >
                              <span
                                className={`px-2 py-0.5 rounded font-bold text-[11px] shrink-0 ${
                                  isMate
                                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                    : isLeading
                                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                    : isTrailing
                                    ? 'bg-slate-800 text-slate-300 border border-slate-700'
                                    : 'bg-slate-800/80 text-slate-400 border border-slate-700/60'
                                }`}
                              >
                                {evalStr}
                              </span>

                              <div className="flex-1 min-w-0">
                                <span className="font-bold text-amber-300 mr-1.5">
                                  {line.bestMoveSan || line.bestMoveUci}
                                </span>
                                <span className="text-slate-400 text-[11px] leading-relaxed break-words">
                                  {line.continuationSan && line.continuationSan.length > 1
                                    ? line.continuationSan.slice(1).join(' ')
                                    : (line.movesText || '')}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                          <span>Top Engine Move:</span>
                          <strong className="text-emerald-400">{currentPos?.bestMove?.san || 'Theory / Book'}</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Moves History Sheet */}
                  <div className="bg-[#111728] border border-slate-800/80 rounded-2xl p-3.5 shadow-xl space-y-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-1">
                      Moves History
                    </div>

                    <div className="max-h-56 overflow-y-auto font-mono text-xs pr-1">
                      <div className="grid grid-cols-2 gap-1.5">
                        {(() => {
                          const rows = [];
                          for (let i = 1; i < analysisResult.positions.length; i += 2) {
                            const whitePly = analysisResult.positions[i];
                            const blackPly = analysisResult.positions[i + 1];
                            const moveNum = Math.floor(i / 2) + 1;

                            rows.push(
                              <div key={moveNum} className="col-span-2 flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-slate-900/60">
                                <span className="w-8 text-slate-600 font-bold">{moveNum}.</span>

                                {/* White Move */}
                                <button
                                  onClick={() => setCurrentPly(whitePly.ply)}
                                  className={`flex-1 flex items-center justify-between px-2 py-1 rounded text-left transition-all ${
                                    currentPly === whitePly.ply
                                      ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                                      : 'text-slate-300 hover:text-white'
                                  }`}
                                >
                                  <span>{whitePly.san}</span>
                                  {whitePly.classification && (
                                    <span className="text-[10px]" style={{ color: CLASSIFICATION_META[whitePly.classification]?.dotColor }}>
                                      {CLASSIFICATION_META[whitePly.classification]?.symbol}
                                    </span>
                                  )}
                                </button>

                                {/* Black Move */}
                                {blackPly ? (
                                  <button
                                    onClick={() => setCurrentPly(blackPly.ply)}
                                    className={`flex-1 flex items-center justify-between px-2 py-1 rounded text-left transition-all ${
                                      currentPly === blackPly.ply
                                        ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                                        : 'text-slate-300 hover:text-white'
                                    }`}
                                  >
                                    <span>{blackPly.san}</span>
                                    {blackPly.classification && (
                                      <span className="text-[10px]" style={{ color: CLASSIFICATION_META[blackPly.classification]?.dotColor }}>
                                        {CLASSIFICATION_META[blackPly.classification]?.symbol}
                                      </span>
                                    )}
                                  </button>
                                ) : (
                                  <span className="flex-1" />
                                )}
                              </div>
                            );
                          }
                          return rows;
                        })()}
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
