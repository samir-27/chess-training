import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import {
  ArrowLeft,
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Copy,
  Cpu,
  RotateCcw,
  Settings,
  Share2,
  Sparkles,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';
import { centipawnsToWinChance, Classification, CLASSIFICATION_META } from '../../services/gameAnalysisEngine.js';
import {
  createVariationAtPosition,
  createVariationWithLine,
  extractMovesFromLine,
  getVariationMoveList,
  getVariationOriginalPrefixLength,
  getVariationPosition,
  playVariationMove,
  resetVariationToStart,
  setVariationCursor
} from '../../services/analysisVariation.js';
import { STOCKFISH_SEARCH, StockfishEngine } from '../../services/stockfishEngine.js';
import { createCommentaryFallback } from '../../services/moveCommentary.js';
import { soundManager } from '../../services/audioService.js';
import { lookupBookPosition } from '../../services/openingBookService.js';

function uciToMove(uci) {
  return {
    from: uci.slice(0, 2),
    to: uci.slice(2, 4),
    ...(uci[4] ? { promotion: uci[4] } : {})
  };
}

function formatEvaluation(result) {
  if (!result) return '0.0';
  if (result.mate !== null && result.mate !== undefined) {
    return `${result.mate < 0 ? '-' : ''}M${Math.abs(result.mate)}`;
  }
  const cp = Number(result.whiteCp ?? result.score ?? 0);
  return `${cp >= 0 ? '+' : ''}${(cp / 100).toFixed(1)}`;
}

// Icon badges matching screenshot
function MoveClassificationIcon({ classification }) {
  switch (classification) {
    case Classification.BRILLIANT:
      return <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500 text-slate-950 font-black text-[11px] shadow">!!</span>;
    case Classification.GREAT:
    case 'critical':
      return <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-sky-500 text-slate-950 font-black text-[11px] shadow">!</span>;
    case Classification.BEST:
      return <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white font-black text-[12px] shadow leading-none">★</span>;
    case Classification.EXCELLENT:
      return <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[11px] shadow">👍</span>;
    case Classification.GOOD:
    case 'okay':
      return <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500/80 text-white font-bold text-[11px] shadow">✓</span>;
    case Classification.INACCURACY:
      return <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] shadow">?!</span>;
    case Classification.MISTAKE:
      return <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white font-black text-[11px] shadow">?</span>;
    case Classification.BLUNDER:
      return <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white font-black text-[10px] shadow">??</span>;
    case Classification.BOOK:
    case 'theory':
      return <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] shadow">📖</span>;
    default:
      return null;
  }
}

export default function InteractiveAnalysisBoard({
  analysisResult,
  currentPly,
  onSelectOriginalPly,
  initialVariation = null,
  onResumeChange,
  commentary = [],
  isAnalyzing = false,
  analysisProgress = 0,
  onNewAnalysis,
  engineEnabled = true
}) {
  const positions = analysisResult?.positions || [];
  const headers = analysisResult?.headers || {};
  const [activeSideTab, setActiveSideTab] = useState('report'); // 'report' | 'analysis'
  const [orientation, setOrientation] = useState('white');
  const [showSettings, setShowSettings] = useState(false);
  const [depth, setDepth] = useState(STOCKFISH_SEARCH.depth);
  const [showBestMoveArrow, setShowBestMoveArrow] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copyToast, setCopyToast] = useState('');
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [boardWidth, setBoardWidth] = useState(460);
  const [engineResult, setEngineResult] = useState(null);
  const [engineSearching, setEngineSearching] = useState(false);
  const [analysisCache, setAnalysisCache] = useState(() => new Map());
  const [frozenLine, setFrozenLine] = useState(null);

  const boardContainerRef = useRef(null);
  const engineRef = useRef(null);
  const searchIdRef = useRef(0);
  const moveListScrollRef = useRef(null);

  // Variation state for exploratory moves
  const [storedVariation, setVariation] = useState(() => {
    if (!initialVariation) return createVariationAtPosition(positions, currentPly);
    try {
      getVariationPosition(initialVariation);
      return initialVariation;
    } catch {
      return createVariationAtPosition(positions, currentPly);
    }
  });

  const variation = useMemo(
    () => (storedVariation && storedVariation.originalPly === currentPly)
      ? storedVariation
      : createVariationAtPosition(positions, currentPly),
    [storedVariation, currentPly, positions]
  );

  const updateVariation = useCallback((updater) => setVariation((current) => {
    const baseVariation = (current && current.originalPly === currentPly)
      ? current
      : createVariationAtPosition(positions, currentPly);
    return updater(baseVariation);
  }), [currentPly, positions]);

  // Dynamic board size to fit screen height exactly
  useEffect(() => {
    const updateSize = () => {
      if (!boardContainerRef.current) return;
      const containerW = boardContainerRef.current.clientWidth;
      const windowH = window.innerHeight;
      // Reserve space for navbar (~60px), player cards (~90px), margins
      const maxAvailableH = windowH - 180;
      const size = Math.max(280, Math.min(containerW, maxAvailableH, 560));
      setBoardWidth(size);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Stockfish worker lifecycle
  useEffect(() => {
    if (!engineEnabled) return undefined;
    let disposed = false;
    queueMicrotask(() => {
      if (disposed) return;
      try {
        engineRef.current = new StockfishEngine();
      } catch {
        engineRef.current = null;
      }
    });

    return () => {
      disposed = true;
      engineRef.current?.close();
      engineRef.current = null;
    };
  }, [engineEnabled]);

  const chess = useMemo(() => getVariationPosition(variation), [variation]);
  const fen = chess.fen();
  const moves = useMemo(() => getVariationMoveList(variation), [variation]);
  const originalPrefixLength = getVariationOriginalPrefixLength(variation);
  const isOriginalPosition = variation.cursor <= originalPrefixLength &&
    variation.originalMoves.slice(0, variation.cursor).join(' ') === variation.moves.slice(0, variation.cursor).join(' ');

  // Instant evaluation lookup: if on an original position or root, use cached report position immediately!
  const currentEvaluation = useMemo(() => {
    if (frozenLine && variation.cursor === frozenLine.rootPly) {
      return {
        source: 'frozen-line',
        whiteCp: frozenLine.evalCp,
        mate: frozenLine.evalMate,
        depth: frozenLine.depth,
        nodes: null,
        bestMoveUci: null,
        lines: []
      };
    }
    if (isOriginalPosition) {
      const origPos = positions[variation.cursor];
      if (origPos) {
        return {
          source: 'report',
          whiteCp: origPos.score,
          mate: origPos.mate,
          depth: origPos.depth || depth,
          nodes: origPos.nodes,
          bestMoveUci: origPos.bestMove?.uci || null,
          lines: origPos.lines || []
        };
      }
    }
    if (chess.isGameOver()) {
      if (chess.isCheckmate()) {
        const whiteSign = chess.turn() === 'w' ? -1 : 1;
        return {
          source: 'terminal',
          whiteCp: whiteSign * 10000,
          mate: whiteSign * 1,
          depth: 0,
          nodes: 0,
          bestMoveUci: null,
          lines: []
        };
      }
      return {
        source: 'terminal',
        whiteCp: 0,
        mate: null,
        depth: 0,
        nodes: 0,
        bestMoveUci: null,
        lines: []
      };
    }
    if (engineResult?.fen === fen) return engineResult;
    if (analysisCache.has(fen)) return analysisCache.get(fen);
    if (frozenLine) {
      return {
        source: 'frozen-line-interim',
        whiteCp: frozenLine.evalCp,
        mate: frozenLine.evalMate,
        depth: frozenLine.depth,
        nodes: null,
        bestMoveUci: null,
        lines: []
      };
    }
    return null;
  }, [frozenLine, isOriginalPosition, positions, variation.cursor, depth, chess, engineResult, fen, analysisCache]);

  // Evaluate exploratory or subline positions with Stockfish (keeps the eval bar responsive during subline review)
  useEffect(() => {
    const engine = engineRef.current;
    if (!engineEnabled || !engine || chess.isGameOver() || isOriginalPosition || analysisCache.has(fen)) {
      setEngineSearching(false);
      return undefined;
    }

    const searchId = ++searchIdRef.current;
    const controller = new AbortController();
    let active = true;
    engine.depth = depth;
    setEngineSearching(true);

    engine.analyze(fen, controller.signal, (partial) => {
      if (!active || searchId !== searchIdRef.current) return;
      setEngineResult(partial);
    }).then((result) => {
      if (!active || searchId !== searchIdRef.current) return;
      setAnalysisCache((prev) => new Map(prev).set(fen, result));
      setEngineResult(result);
      setEngineSearching(false);
    }).catch(() => {
      if (active && searchId === searchIdRef.current) setEngineSearching(false);
    });

    return () => {
      active = false;
      controller.abort();
    };
  }, [fen, engineEnabled, depth, chess, isOriginalPosition, analysisCache]);

  // Inform parent of resume state (guarded against duplicate renders)
  const lastResumePayloadKeyRef = useRef(null);
  useEffect(() => {
    const isBranch = variation.moves.length > originalPrefixLength;
    const key = `${currentPly}|${fen}|${isBranch ? `${variation.cursor}:${variation.moves.length}` : 'main'}`;
    if (lastResumePayloadKeyRef.current === key) return;
    lastResumePayloadKeyRef.current = key;
    onResumeChange?.({
      selectedPly: currentPly,
      currentFen: fen,
      variation: isBranch ? variation : null
    });
  }, [currentPly, fen, variation.cursor, variation.moves.length, originalPrefixLength, onResumeChange]);

  // Sound effects on move
  const playSoundEffect = useCallback((move) => {
    if (!soundEnabled) return;
    if (chess.isCheckmate()) soundManager.victory();
    else if (chess.isCheck()) soundManager.check();
    else if (move.captured) soundManager.capture();
    else soundManager.move();
  }, [soundEnabled, chess]);

  // User plays move on board (exploratory branching)
  const onPieceDrop = (sourceSquare, targetSquare) => {
    try {
      const legal = chess.moves({ square: sourceSquare, verbose: true })
        .find((m) => m.to === targetSquare);
      if (!legal) {
        if (soundEnabled) soundManager.illegal();
        return false;
      }
      const uci = `${sourceSquare}${targetSquare}${legal.promotion || ''}`;
      setFrozenLine(null);
      updateVariation((current) => playVariationMove(current, uci));
      playSoundEffect(legal);
      setSelectedSquare(null);
      return true;
    } catch {
      return false;
    }
  };

  // Jump to specific game ply
  const handleSelectPly = useCallback((ply) => {
    const targetPly = Math.max(0, Math.min(ply, positions.length - 1));
    onSelectOriginalPly(targetPly);
    setVariation(createVariationAtPosition(positions, targetPly));
    setFrozenLine(null);
  }, [positions, onSelectOriginalPly]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
      }
      if (event.key === 'ArrowLeft') {
        if (frozenLine) {
          if (variation.cursor > frozenLine.rootPly) {
            updateVariation((current) => setVariationCursor(current, current.cursor - 1));
          } else {
            handleSelectPly(Math.max(0, frozenLine.rootPly - 1));
          }
        } else if (!isOriginalPosition) {
          if (variation.cursor > 0) {
            updateVariation((current) => setVariationCursor(current, current.cursor - 1));
          }
        } else if (currentPly > 0) {
          handleSelectPly(currentPly - 1);
        }
      } else if (event.key === 'ArrowRight') {
        if (frozenLine || !isOriginalPosition) {
          if (variation.cursor < variation.moves.length) {
            updateVariation((current) => setVariationCursor(current, current.cursor + 1));
          }
        } else if (currentPly < positions.length - 1) {
          handleSelectPly(currentPly + 1);
        }
      } else if (event.key === 'Home') {
        if (frozenLine) {
          updateVariation((current) => setVariationCursor(current, frozenLine.rootPly));
        } else {
          handleSelectPly(0);
        }
      } else if (event.key === 'End') {
        if (frozenLine || !isOriginalPosition) {
          updateVariation((current) => setVariationCursor(current, variation.moves.length));
        } else {
          handleSelectPly(positions.length - 1);
        }
      } else if (event.key === 'f' || event.key === 'F') {
        setOrientation((o) => (o === 'white' ? 'black' : 'white'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [frozenLine, variation, isOriginalPosition, currentPly, positions.length, handleSelectPly, updateVariation]);

  // Player headers and elos
  const whiteName = headers.White || headers.white || 'White';
  const whiteElo = headers.WhiteElo || headers.whiteElo || '';
  const blackName = headers.Black || headers.black || 'Black';
  const blackElo = headers.BlackElo || headers.blackElo || '';

  const topPlayer = orientation === 'white'
    ? { name: blackName, elo: blackElo, color: 'b' }
    : { name: whiteName, elo: whiteElo, color: 'w' };
  const bottomPlayer = orientation === 'white'
    ? { name: whiteName, elo: whiteElo, color: 'w' }
    : { name: blackName, elo: blackElo, color: 'b' };

  // Eval Bar percentage (from White perspective)
  const evalNumber = currentEvaluation?.whiteCp ?? 0;
  const evalBarPercent = useMemo(() => {
    if (currentEvaluation?.mate !== null && currentEvaluation?.mate !== undefined) {
      return currentEvaluation.mate > 0 ? 100 : 0;
    }
    // Win chance curve clamped between 3% and 97%
    const win = centipawnsToWinChance(evalNumber);
    return Math.max(4, Math.min(96, win));
  }, [currentEvaluation, evalNumber]);

  // AI Coach Commentary for currently viewed position
  const activeCommentaryText = useMemo(() => {
    if (isAnalyzing) return `Analyzing game with local engine (${analysisProgress}%)...`;
    if (frozenLine) {
      const stepIdx = variation.cursor - frozenLine.rootPly;
      if (stepIdx <= 0) {
        return `Exploring engine line (${frozenLine.evalText}). At root position. Step forward with → to view recommended continuation.`;
      }
      return `Exploring engine line (${frozenLine.evalText}): Move ${stepIdx} of ${frozenLine.sanMoves.length}. Use ← / → to step through line or click 'Return to Game'.`;
    }
    if (variation.cursor === 0) return 'Starting position. Navigate through moves to see accuracy and engine lines.';

    // Check if Gemini or server commentary exists for this ply
    const existing = commentary.find((c) => c.ply === variation.cursor);
    if (existing?.text) return existing.text;

    // Check if verified fallback commentary exists
    const currentPos = positions[variation.cursor];
    if (currentPos) {
      const prevPos = positions[variation.cursor - 1];
      const fallback = createCommentaryFallback({
        ply: currentPos.ply,
        moveNumber: currentPos.moveNumber,
        isWhite: currentPos.isWhite,
        cpLoss: currentPos.cpLoss,
        bestMove: currentPos.bestMove || { san: 'N/A' },
        verifiedFindings: {
          missedWinningMate: currentPos.missedTactic,
          hangingPieces: currentPos.hangingPieces || [],
          defendedCheck: currentPos.inCheckBefore && currentPos.bestMove?.uci === currentPos.uci
        }
      });
      if (fallback) return fallback;

      // Descriptive standard commentary
      const cls = currentPos.classification;
      if (cls === Classification.BOOK) {
        return currentPos.explanation || `📖 Standard theoretical book move.`;
      }
      if (cls === Classification.BEST) return `★ Best move! Accurately plays the engine's top recommendation.`;
      if (cls === Classification.EXCELLENT) return `✓ Solid move, preserving the balanced evaluation.`;
      if (cls === Classification.BRILLIANT) return `Spectacular tactical move that maintains a decisive advantage!`;
      if (cls === Classification.BLUNDER) return `Critical blunder. Gives away significant advantage; ${currentPos.bestMove?.san || 'better move'} was stronger.`;
      if (cls === Classification.MISTAKE) return `Clear mistake that weakens the position.`;
      if (cls === Classification.INACCURACY) return `Inaccuracy that cedes minor advantage.`;
    }
    return 'Exploratory branch move. Stockfish is searching this line.';
  }, [isAnalyzing, analysisProgress, frozenLine, variation.cursor, commentary, positions]);

  // Current opening name based on theoretical book or position
  const currentOpeningName = useMemo(() => {
    const bookEntry = lookupBookPosition(fen);
    if (bookEntry && bookEntry.name && bookEntry.name !== 'Starting Position') {
      return `${bookEntry.eco} · ${bookEntry.name}`;
    }
    const currentPos = positions[variation.cursor];
    if (currentPos?.explanation && currentPos.classification === Classification.BOOK) {
      return currentPos.explanation.replace(/^Book move \([^)]+\)\.\s*/, '');
    }
    return null;
  }, [fen, positions, variation.cursor]);

  // Overall game opening
  const gameOpening = useMemo(() => {
    if (analysisResult?.opening?.name) {
      return analysisResult.opening;
    }
    for (let i = positions.length - 1; i >= 1; i--) {
      const pos = positions[i];
      if (pos.classification === Classification.BOOK || pos.isBook) {
        if (pos.eco && pos.opening) {
          return { eco: pos.eco, name: pos.opening };
        }
      }
    }
    return null;
  }, [analysisResult, positions]);

  const bookMovesCount = useMemo(() => {
    return positions.slice(1).filter((p) => p.classification === Classification.BOOK || p.isBook).length;
  }, [positions]);

  // Classification summary stats for Report tab
  const stats = useMemo(() => {
    const counts = {
      white: { brilliant: 0, critical: 0, best: 0, excellent: 0, good: 0, inaccuracy: 0, mistake: 0, blunder: 0, book: 0 },
      black: { brilliant: 0, critical: 0, best: 0, excellent: 0, good: 0, inaccuracy: 0, mistake: 0, blunder: 0, book: 0 }
    };
    positions.slice(1).forEach((p) => {
      const side = p.isWhite ? 'white' : 'black';
      const c = p.classification;
      if (c === Classification.BRILLIANT) counts[side].brilliant++;
      else if (c === Classification.GREAT) counts[side].critical++;
      else if (c === Classification.BEST) counts[side].best++;
      else if (c === Classification.EXCELLENT) counts[side].excellent++;
      else if (c === Classification.GOOD) counts[side].good++;
      else if (c === Classification.INACCURACY) counts[side].inaccuracy++;
      else if (c === Classification.MISTAKE) counts[side].mistake++;
      else if (c === Classification.BLUNDER || c === Classification.MISS) counts[side].blunder++;
      else if (c === Classification.BOOK) counts[side].book++;
    });
    return counts;
  }, [positions]);

  const whiteAccuracy = useMemo(() => {
    if (analysisResult?.accuracies?.white != null) {
      return Number(analysisResult.accuracies.white).toFixed(1);
    }
    if (analysisResult?.whiteAccuracy != null) {
      return Number(analysisResult.whiteAccuracy).toFixed(1);
    }
    const whitePositions = positions.filter((p) => p.ply > 0 && p.isWhite && p.accuracy != null);
    if (whitePositions.length > 0) {
      return (whitePositions.reduce((sum, p) => sum + p.accuracy, 0) / whitePositions.length).toFixed(1);
    }
    return '—';
  }, [analysisResult, positions]);

  const blackAccuracy = useMemo(() => {
    if (analysisResult?.accuracies?.black != null) {
      return Number(analysisResult.accuracies.black).toFixed(1);
    }
    if (analysisResult?.blackAccuracy != null) {
      return Number(analysisResult.blackAccuracy).toFixed(1);
    }
    const blackPositions = positions.filter((p) => p.ply > 0 && !p.isWhite && p.accuracy != null);
    if (blackPositions.length > 0) {
      return (blackPositions.reduce((sum, p) => sum + p.accuracy, 0) / blackPositions.length).toFixed(1);
    }
    return '—';
  }, [analysisResult, positions]);

  // Copy PGN/FEN to clipboard
  const handleShare = () => {
    const text = headers.FEN ? `${fen}` : analysisResult?.sourcePgn || fen;
    navigator.clipboard?.writeText(text);
    setCopyToast('Copied to clipboard!');
    setTimeout(() => setCopyToast(''), 2500);
  };

  // Last move square highlights
  const lastMoveHighlight = useMemo(() => {
    if (!variation.cursor || !variation.moves[variation.cursor - 1]) return {};
    const uci = variation.moves[variation.cursor - 1];
    const from = uci.slice(0, 2);
    const to = uci.slice(2, 4);
    return {
      [from]: { backgroundColor: 'rgba(250, 204, 21, 0.35)' },
      [to]: { backgroundColor: 'rgba(250, 204, 21, 0.45)' }
    };
  }, [variation]);

  // Interactive Graph calculations matching Image 2
  const maxPly = Math.max(1, positions.length - 1);
  const graphWidth = 380;
  const graphHeight = 84;
  const centerY = graphHeight / 2;

  const clampCp = (cp) => Math.max(-1000, Math.min(1000, cp || 0));
  const getGraphY = (pos) => {
    if (pos.mate !== null && pos.mate !== undefined) {
      return pos.mate > 0 ? 4 : graphHeight - 4;
    }
    const cp = clampCp(pos.score);
    // Positive cp (White advantage) is higher (smaller Y), negative is lower (larger Y)
    return centerY - (cp / 1000) * (centerY - 6);
  };

  // Build shaded area path matching Image 2
  const graphAreaPath = useMemo(() => {
    if (!positions.length) return '';
    const points = positions.map((p, i) => {
      const x = (i / maxPly) * graphWidth;
      const y = getGraphY(p);
      return { x, y };
    });
    let d = `M 0,${centerY} `;
    points.forEach((pt) => { d += `L ${pt.x.toFixed(1)},${pt.y.toFixed(1)} `; });
    d += `L ${graphWidth},${centerY} Z`;
    return d;
  }, [positions, maxPly]);

  const currentCursorX = (Math.max(0, Math.min(variation.cursor, maxPly)) / maxPly) * graphWidth;

  return (
    <div className="w-full h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-hidden flex flex-col justify-center px-2 sm:px-4 py-1 text-slate-100 select-none">
      
      {/* Toast Notification */}
      {copyToast && (
        <div className="fixed top-16 right-6 z-50 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold shadow-2xl animate-fade-in">
          {copyToast}
        </div>
      )}

      {/* Main Single-Screen Grid Container */}
      <div className="w-full h-full max-h-full grid grid-cols-1 lg:grid-cols-[1fr_390px] xl:grid-cols-[1fr_430px] gap-3 lg:gap-5 items-center overflow-hidden">
        
        {/* ================= LEFT COLUMN: CHESSBOARD ================= */}
        <div className="h-full flex flex-col justify-center items-center overflow-hidden">
          
          {/* Top Player (Opponent) */}
          <div className="w-full max-w-[560px] flex items-center justify-between px-3 py-1.5 mb-1 bg-slate-900/60 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-amber-400">
                {topPlayer.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="font-bold text-sm text-slate-200 truncate max-w-[200px]">
                {topPlayer.name}
              </span>
              {topPlayer.elo && (
                <span className="text-xs text-slate-400 font-mono">({topPlayer.elo})</span>
              )}
            </div>
            {chess.turn() === topPlayer.color && (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" title="To move" />
            )}
          </div>

          {/* Board Container + Eval Bar */}
          <div className="flex items-center justify-center gap-2" ref={boardContainerRef}>
            
            {/* Vertical Evaluation Bar */}
            <div
              className="w-5 shrink-0 rounded-lg bg-slate-950 border border-slate-700/80 overflow-hidden flex flex-col justify-end relative shadow-lg"
              style={{ height: boardWidth }}
            >
              {/* White area (bottom up or top down based on orientation) */}
              <div
                className="w-full bg-slate-100 transition-all duration-300"
                style={{ height: `${orientation === 'white' ? evalBarPercent : 100 - evalBarPercent}%` }}
              />
              <span className="absolute bottom-1 left-0 right-0 text-[10px] font-black text-center text-slate-950 mix-blend-difference font-mono">
                {formatEvaluation(currentEvaluation)}
              </span>
            </div>

            {/* Chessboard Area */}
            <div
              className="overflow-hidden rounded-xl border-2 border-slate-700/90 bg-[#b58863] shadow-2xl relative"
              style={{ width: boardWidth, height: boardWidth }}
            >
              <Chessboard
                position={fen}
                boardWidth={boardWidth}
                boardOrientation={orientation}
                arePiecesDraggable={engineEnabled && !chess.isGameOver()}
                autoPromoteToQueen={false}
                customDarkSquareStyle={{ backgroundColor: '#b58863' }}
                customLightSquareStyle={{ backgroundColor: '#f0d9b5' }}
                customSquareStyles={{ ...lastMoveHighlight }}
                customArrows={showBestMoveArrow && currentEvaluation?.bestMoveUci
                  ? [[currentEvaluation.bestMoveUci.slice(0, 2), currentEvaluation.bestMoveUci.slice(2, 4), '#10b981']]
                  : []}
                onPieceDrop={onPieceDrop}
                animationDuration={120}
              />
            </div>
          </div>

          {/* Bottom Player (Self) */}
          <div className="w-full max-w-[560px] flex items-center justify-between px-3 py-1.5 mt-1 bg-slate-900/60 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-sky-400">
                {bottomPlayer.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="font-bold text-sm text-slate-200 truncate max-w-[200px]">
                {bottomPlayer.name}
              </span>
              {bottomPlayer.elo && (
                <span className="text-xs text-slate-400 font-mono">({bottomPlayer.elo})</span>
              )}
            </div>
            {chess.turn() === bottomPlayer.color && (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" title="To move" />
            )}
          </div>
        </div>

        {/* ================= RIGHT COLUMN: ANALYSIS SIDEBAR ================= */}
        <div className="h-full max-h-full flex flex-col bg-[#111728] border border-slate-800/80 rounded-2xl p-3 shadow-2xl overflow-hidden">
          
          {/* Header Action: Blue "Game Analysis" Button */}
          <div className="w-full mb-2">
            <button
              type="button"
              onClick={onNewAnalysis}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-base tracking-wide shadow-lg shadow-blue-600/30 transition-all text-center"
            >
              Game Analysis
            </button>
          </div>

          {/* Quick Action Icons Row matching Screenshot */}
          <div className="flex items-center justify-between px-2 py-1 mb-2 bg-slate-900/60 rounded-xl border border-slate-800/80 text-slate-300">
            <button
              type="button"
              onClick={onNewAnalysis}
              className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="New Analysis / Load Game"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => setOrientation((o) => o === 'white' ? 'black' : 'white')}
              className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Flip Board"
            >
              <ArrowLeftRight size={18} />
            </button>
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Board Settings"
            >
              <Settings size={18} />
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Share / Copy PGN"
            >
              <Share2 size={18} />
            </button>
          </div>

          {/* Settings Popover */}
          {showSettings && (
            <div className="mb-2 p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-2 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-300">Analysis Settings</span>
                <button type="button" onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white">
                  <X size={14} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Best-move arrow</span>
                <button
                  type="button"
                  onClick={() => setShowBestMoveArrow(!showBestMoveArrow)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${showBestMoveArrow ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'}`}
                >
                  {showBestMoveArrow ? 'ON' : 'OFF'}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Sound effects</span>
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${soundEnabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'}`}
                >
                  {soundEnabled ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          )}

          {/* Two Main Tabs: Report | Analysis */}
          <div className="grid grid-cols-2 p-1 mb-2 bg-slate-950 rounded-xl border border-slate-800/80 text-xs font-bold text-center">
            <button
              type="button"
              onClick={() => setActiveSideTab('report')}
              className={`py-2 rounded-lg transition-all ${activeSideTab === 'report' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Report
            </button>
            <button
              type="button"
              onClick={() => setActiveSideTab('analysis')}
              className={`py-2 rounded-lg transition-all ${activeSideTab === 'analysis' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Analysis
            </button>
          </div>

          {/* AI Coach / Status Banner matching screenshot */}
          <div className="p-2.5 mb-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2 text-xs">
            {isAnalyzing ? (
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between text-amber-400 font-medium">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
                    <span>Analyzing moves (depth {depth})...</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-amber-300">{analysisProgress}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(4, analysisProgress)}%` }}
                  />
                </div>
                {variation.cursor > 0 && positions[variation.cursor]?.classification ? (
                  <p className="text-slate-300 text-[11px] pt-1 border-t border-slate-800/80 leading-relaxed">
                    <strong className="text-amber-400 font-mono">Move {Math.ceil(variation.cursor / 2)}:</strong> {activeCommentaryText}
                  </p>
                ) : (
                  <p className="text-slate-400 text-[10px]">
                    Evaluating positions in real time · Click any move to inspect
                  </p>
                )}
              </div>
            ) : (
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <Sparkles size={13} className="text-amber-400 shrink-0" />
                  <span className="font-bold text-slate-200 text-[11px] uppercase tracking-wide">
                    {variation.cursor > 0 ? `Move ${Math.ceil(variation.cursor / 2)}` : 'Game Coach'}
                  </span>
                  {positions[variation.cursor]?.classification && (
                    <span className="ml-auto">
                      <MoveClassificationIcon classification={positions[variation.cursor].classification} />
                    </span>
                  )}
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed break-words">
                  {activeCommentaryText}
                </p>
              </div>
            )}
          </div>

          {/* Middle Scrollable Section */}
          <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-slate-700">
            
            {/* ================= TAB 1: REPORT ================= */}
            {activeSideTab === 'report' && (
              <div className="space-y-3">
                
                {/* 1. Evaluation Graph matching Image 2 */}
                <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-2 overflow-hidden">
                  <div
                    className="w-full h-[84px] relative cursor-pointer"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const targetPly = Math.round((clickX / rect.width) * maxPly);
                      handleSelectPly(targetPly);
                    }}
                  >
                    <svg viewBox={`0 0 ${graphWidth} ${graphHeight}`} className="w-full h-full block">
                      {/* Dark background for Black */}
                      <rect x="0" y="0" width={graphWidth} height={graphHeight} fill="#1e293b" />
                      
                      {/* Center 0 Line */}
                      <line x1="0" y1={centerY} x2={graphWidth} y2={centerY} stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
                      
                      {/* Shaded Area for White Advantage */}
                      <path d={graphAreaPath} fill="#ffffff" fillOpacity="0.85" />
                      
                      {/* Critical Move Colored Dots: show only brilliant, critical, mistakes, and blunders */}
                      {positions.map((pos, idx) => {
                        const cls = pos.classification;
                        const isAllowed = cls === Classification.BRILLIANT ||
                          cls === Classification.GREAT ||
                          cls === Classification.MISTAKE ||
                          cls === Classification.BLUNDER ||
                          cls === Classification.MISS;
                        if (!cls || !isAllowed) return null;
                        const x = (idx / maxPly) * graphWidth;
                        const y = getGraphY(pos);
                        const dotColor = CLASSIFICATION_META[cls]?.dotColor || (cls === Classification.MISTAKE ? '#f97316' : '#ef4444');
                        return (
                          <circle
                            key={idx}
                            cx={x}
                            cy={y}
                            r="3.5"
                            fill={dotColor}
                            stroke="#0f172a"
                            strokeWidth="1.2"
                            className="cursor-pointer hover:r-5 transition-all"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectPly(idx);
                            }}
                          >
                            <title>{`Move ${Math.ceil(idx / 2)} (${pos.san}): ${CLASSIFICATION_META[cls]?.label || cls}`}</title>
                          </circle>
                        );
                      })}

                      {/* Current Ply Cursor Line */}
                      <line
                        x1={currentCursorX}
                        y1="0"
                        x2={currentCursorX}
                        y2={graphHeight}
                        stroke="#f59e0b"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>

                {/* 2. Accuracies Box matching Image 2 */}
                <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-2.5">
                  <div className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Accuracies
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-white text-slate-950 py-1.5 px-3 rounded-lg shadow flex flex-col items-center">
                      <span className="text-[10px] uppercase font-bold text-slate-600">White</span>
                      <span className="font-black text-lg leading-tight">
                        {whiteAccuracy === '—' ? '—' : `${whiteAccuracy}%`}
                      </span>
                    </div>
                    <div className="bg-slate-950 text-white py-1.5 px-3 rounded-lg border border-slate-800 shadow flex flex-col items-center">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Black</span>
                      <span className="font-black text-lg leading-tight">
                        {blackAccuracy === '—' ? '—' : `${blackAccuracy}%`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Classification Table matching Image 2 */}
                <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-2 text-xs">
                  <div className="grid grid-cols-[1fr_45px_30px_45px] gap-1 items-center pb-1.5 mb-1.5 border-b border-slate-800 text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center">
                    <span className="text-left pl-1">Category</span>
                    <span className="font-bold text-slate-200">White</span>
                    <span>Icon</span>
                    <span className="font-bold text-slate-200">Black</span>
                  </div>

                  <div className="space-y-1 text-slate-200">
                    {[
                      { key: 'brilliant', label: 'Brilliant', cls: Classification.BRILLIANT, color: 'text-cyan-400' },
                      { key: 'critical', label: 'Critical', cls: Classification.GREAT, color: 'text-sky-400' },
                      { key: 'best', label: 'Best', cls: Classification.BEST, color: 'text-emerald-400' },
                      { key: 'excellent', label: 'Excellent', cls: Classification.EXCELLENT, color: 'text-emerald-500' },
                      { key: 'good', label: 'Okay', cls: Classification.GOOD, color: 'text-slate-400' },
                      { key: 'inaccuracy', label: 'Inaccuracy', cls: Classification.INACCURACY, color: 'text-yellow-400' },
                      { key: 'mistake', label: 'Mistake', cls: Classification.MISTAKE, color: 'text-orange-400' },
                      { key: 'blunder', label: 'Blunder', cls: Classification.BLUNDER, color: 'text-red-400' },
                      { key: 'book', label: 'Theory', cls: Classification.BOOK, color: 'text-amber-500' }
                    ].map((row) => (
                      <div key={row.key} className="grid grid-cols-[1fr_45px_30px_45px] gap-1 items-center py-0.5 px-1 rounded hover:bg-slate-800/50 text-center">
                        <span className={`text-left font-bold ${row.color}`}>{row.label}</span>
                        <span className="font-mono text-xs">{stats.white[row.key]}</span>
                        <span className="flex justify-center"><MoveClassificationIcon classification={row.cls} /></span>
                        <span className="font-mono text-xs">{stats.black[row.key]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Game Opening Card (if available) */}
                {gameOpening && (
                  <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-base">📖</span>
                      <div>
                        <div className="font-bold text-amber-300">
                          {gameOpening.eco} · {gameOpening.name}
                        </div>
                        <div className="text-[10px] text-amber-200/70">
                          Opening Theory ({bookMovesCount} book {bookMovesCount === 1 ? 'move' : 'moves'})
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase tracking-wider">
                      Book
                    </span>
                  </div>
                )}

                {/* 5. Game Moves Review Table */}
                <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-2 text-xs space-y-1.5">
                  <div className="flex items-center justify-between px-1 pb-1 border-b border-slate-800 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <span>Game Moves Review</span>
                    <span className="font-mono text-[9px] lowercase text-slate-500">{positions.length - 1} moves</span>
                  </div>

                  <div className="max-h-56 overflow-y-auto pr-1 space-y-0.5 scrollbar-thin">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="text-[10px] text-slate-400 border-b border-slate-800/80 uppercase font-semibold">
                          <th className="py-1 px-1.5 w-14">Move</th>
                          <th className="py-1 px-1.5">Played Move</th>
                          <th className="py-1 px-1.5">Classification</th>
                          <th className="py-1 px-1.5 text-right">Evaluation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/40 font-mono text-[11px]">
                        {positions.slice(1).map((pos) => {
                          const isCurrent = isOriginalPosition && variation.cursor === pos.ply;
                          const isBook = pos.classification === Classification.BOOK || pos.isBook;
                          const moveLabel = pos.isWhite ? `${pos.moveNumber || Math.ceil(pos.ply / 2)}` : `${pos.moveNumber || Math.ceil(pos.ply / 2)}...`;
                          const evalText = isBook ? 'Theory' : formatEvaluation(pos);
                          const meta = CLASSIFICATION_META[pos.classification] || (isBook ? CLASSIFICATION_META[Classification.BOOK] : null);

                          return (
                            <tr
                              key={pos.ply}
                              onClick={() => handleSelectPly(pos.ply)}
                              className={`cursor-pointer transition-colors ${
                                isCurrent
                                  ? 'bg-amber-400/20 text-white font-bold'
                                  : 'hover:bg-slate-800/60 text-slate-300'
                              }`}
                            >
                              <td className="py-1 px-1.5 text-slate-400">{moveLabel}</td>
                              <td className="py-1 px-1.5 font-bold text-slate-100">{pos.san}</td>
                              <td className="py-1 px-1.5">
                                {isBook ? (
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                    <span>📖</span>
                                    <span>BOOK</span>
                                  </span>
                                ) : meta ? (
                                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold border ${meta.badgeColor}`}>
                                    <span>{meta.symbol}</span>
                                    <span>{meta.label}</span>
                                  </span>
                                ) : (
                                  <span className="text-slate-500 text-[10px]">—</span>
                                )}
                              </td>
                              <td className="py-1 px-1.5 text-right">
                                {isBook ? (
                                  <span className="text-amber-400 font-semibold font-sans text-[11px]">Theory</span>
                                ) : (
                                  <span className={Number(pos.score) > 50 ? 'text-emerald-400' : Number(pos.score) < -50 ? 'text-red-400' : 'text-slate-300'}>
                                    {evalText}
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 2: ANALYSIS ================= */}
            {activeSideTab === 'analysis' && (
              <div className="space-y-3">
                
                {/* 1. Engine Lines matching Image 1 OR Frozen Explored Line */}
                <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-2.5 space-y-2">
                  {frozenLine ? (
                    /* Active Frozen Subline Exploration Panel */
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold font-mono text-xs border border-sky-500/30">
                            {frozenLine.evalText}
                          </span>
                          <span className="text-xs font-bold text-slate-200">
                            Subline Exploration
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            handleSelectPly(frozenLine.rootPly);
                            setFrozenLine(null);
                          }}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 hover:text-amber-200 text-xs font-bold transition-all cursor-pointer shadow-sm"
                          title="Return to original game"
                        >
                          <RotateCcw size={12} />
                          <span>Return to Game</span>
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        <div className="text-[10px] text-slate-400 font-medium flex items-center justify-between">
                          <span>Steppable line moves:</span>
                          <span className="text-sky-400 font-mono">
                            {variation.cursor <= frozenLine.rootPly
                              ? 'At root position'
                              : `Move ${variation.cursor - frozenLine.rootPly} of ${frozenLine.sanMoves.length}`}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 p-2 rounded-lg bg-slate-950 border border-slate-800/90 font-mono text-xs max-h-36 overflow-y-auto">
                          <button
                            type="button"
                            onClick={() => updateVariation((c) => setVariationCursor(c, frozenLine.rootPly))}
                            className={`px-2 py-1 rounded text-[11px] transition-all cursor-pointer ${
                              variation.cursor === frozenLine.rootPly
                                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50 font-bold'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                            }`}
                            title="Position before line was played"
                          >
                            Root
                          </button>

                          {frozenLine.sanMoves.map((m, idx) => {
                            const targetCursor = frozenLine.rootPly + idx + 1;
                            const isActive = variation.cursor === targetCursor;
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => updateVariation((c) => setVariationCursor(c, targetCursor))}
                                className={`px-2 py-1 rounded text-[11px] transition-all cursor-pointer flex items-center gap-1 ${
                                  isActive
                                    ? 'bg-sky-500/25 text-sky-200 border border-sky-500/60 font-black shadow-sm ring-1 ring-sky-400/40'
                                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                }`}
                                title={`Jump to ${m.label}`}
                              >
                                <span>{m.label}</span>
                              </button>
                            );
                          })}
                        </div>
                        <p className="text-[10px] text-slate-400 text-center pt-0.5">
                          Use keyboard <strong className="text-sky-300">← / →</strong> or navigation buttons to step through this line.
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* Default Engine Lines (when not in a frozen subline) */
                    <>
                      {/* Active Opening Name Banner */}
                      {currentOpeningName && (
                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                          <span className="text-sm">📖</span>
                          <span className="truncate">{currentOpeningName}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                          <Cpu size={13} /> Depth: {depth}
                        </span>
                        <span>{engineSearching ? 'Searching...' : 'Stockfish 16'}</span>
                      </div>

                      {currentEvaluation?.lines?.length ? (
                        currentEvaluation.lines.slice(0, 3).map((line, idx) => {
                          const extracted = extractMovesFromLine(fen, line);
                          const displayMoves = extracted.san || line.movesText || line.continuationSan?.join(' ') || '...';

                          const handleExploreLine = (stepIndex = 0) => {
                            if (!extracted.moves.length) return;
                            const newVar = createVariationWithLine(variation, extracted.moves);
                            const targetCursor = variation.cursor + Math.min(stepIndex + 1, extracted.moves.length);
                            setVariation(setVariationCursor(newVar, targetCursor));
                            setFrozenLine({
                              rootPly: variation.cursor,
                              evalText: formatEvaluation(line),
                              evalCp: line.whiteCp ?? line.cp ?? 0,
                              evalMate: line.mate ?? null,
                              depth: line.depth || depth,
                              sanMoves: extracted.sanList,
                              uciMoves: extracted.moves
                            });
                          };

                          return (
                            <div
                              key={idx}
                              onClick={() => handleExploreLine(0)}
                              className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/90 hover:border-sky-500/60 hover:bg-slate-900/80 cursor-pointer transition-all space-y-1.5 text-xs group shadow-sm"
                              title="Click to freeze and explore this line"
                            >
                              <div className="flex items-center justify-between gap-1 font-mono">
                                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-sky-300 font-bold text-[11px] border border-slate-700/80">
                                  {formatEvaluation(line)}
                                </span>
                                <span className="text-[11px] text-sky-400 group-hover:text-sky-300 flex items-center gap-1 font-sans font-semibold">
                                  <span>Explore line</span>
                                  <span>→</span>
                                </span>
                              </div>

                              {extracted.sanList.length > 0 ? (
                                <div className="flex flex-wrap gap-1 font-mono text-[11px] leading-tight">
                                  {extracted.sanList.map((m, mIdx) => (
                                    <span
                                      key={mIdx}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleExploreLine(mIdx);
                                      }}
                                      className="px-1.5 py-0.5 rounded bg-slate-900/90 hover:bg-sky-500/30 hover:text-sky-200 text-slate-300 border border-slate-800 hover:border-sky-500/40 transition-colors"
                                      title={`Jump to ${m.label}`}
                                    >
                                      {m.label}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-slate-300 font-mono text-[11px] leading-tight break-words">
                                  {displayMoves}
                                </p>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-[11px] text-slate-500 py-2 text-center">
                          {engineSearching ? 'Stockfish calculating top engine lines...' : 'No legal continuation lines.'}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* 2. Move History with Variation Tree matching Image 1 */}
                <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-2.5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                    <span>Move History</span>
                    {variation.moves.length > originalPrefixLength && (
                      <button
                        type="button"
                        onClick={() => handleSelectPly(currentPly)}
                        className="text-amber-400 hover:text-amber-300 text-[10px] flex items-center gap-1"
                      >
                        <RotateCcw size={11} /> Return to game
                      </button>
                    )}
                  </div>

                  <div ref={moveListScrollRef} className="max-h-64 overflow-y-auto space-y-1 font-mono text-xs pr-1 scrollbar-thin">
                    {/* Render moves in pairs (White, Black) */}
                    {Array.from({ length: Math.ceil(positions.length / 2) }).map((_, moveIndex) => {
                      const whitePlyNum = moveIndex * 2 + 1;
                      const blackPlyNum = moveIndex * 2 + 2;
                      const whitePos = positions[whitePlyNum];
                      const blackPos = positions[blackPlyNum];
                      if (!whitePos) return null;

                      const isWhiteActive = variation.cursor === whitePlyNum && isOriginalPosition;
                      const isBlackActive = variation.cursor === blackPlyNum && isOriginalPosition;

                      return (
                        <div key={moveIndex} className="flex items-center gap-1 py-0.5 px-1.5 rounded hover:bg-slate-800/40 text-[11px]">
                          <span className="w-6 text-slate-500 shrink-0">{moveIndex + 1}.</span>
                          
                          {/* White Move */}
                          <button
                            type="button"
                            onClick={() => handleSelectPly(whitePlyNum)}
                            className={`flex-1 text-left px-1.5 py-0.5 rounded flex items-center justify-between gap-1 transition-colors ${
                              isWhiteActive
                                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50 font-bold'
                                : 'text-slate-200 hover:bg-slate-800'
                            }`}
                          >
                            <span>{whitePos.san}</span>
                            {whitePos.classification && <MoveClassificationIcon classification={whitePos.classification} />}
                          </button>

                          {/* Black Move */}
                          {blackPos ? (
                            <button
                              type="button"
                              onClick={() => handleSelectPly(blackPlyNum)}
                              className={`flex-1 text-left px-1.5 py-0.5 rounded flex items-center justify-between gap-1 transition-colors ${
                                isBlackActive
                                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50 font-bold'
                                  : 'text-slate-300 hover:bg-slate-800'
                              }`}
                            >
                              <span>{blackPos.san}</span>
                              {blackPos.classification && <MoveClassificationIcon classification={blackPos.classification} />}
                            </button>
                          ) : <div className="flex-1" />}
                        </div>
                      );
                    })}

                    {/* Exploratory Variation moves if user made branched moves */}
                    {variation.moves.length > originalPrefixLength && (
                      <div className="mt-2 pt-2 border-t border-slate-800 pl-3 space-y-1">
                        <span className="text-[10px] text-sky-400 font-bold block">Exploratory branch:</span>
                        {moves.slice(originalPrefixLength).map((move, idx) => {
                          const plyIndex = originalPrefixLength + idx + 1;
                          const isCurrent = variation.cursor === plyIndex;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => updateVariation((c) => setVariationCursor(c, plyIndex))}
                              className={`px-2 py-0.5 rounded text-[11px] block text-left ${
                                isCurrent ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold' : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {idx + 1}... {move.san}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ================= BOTTOM NAVIGATION CONTROLS ================= */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-center gap-4 text-slate-300">
            <button
              type="button"
              onClick={() => {
                if (frozenLine) {
                  updateVariation((current) => setVariationCursor(current, frozenLine.rootPly));
                } else {
                  handleSelectPly(0);
                }
              }}
              disabled={frozenLine ? variation.cursor <= frozenLine.rootPly : (isOriginalPosition ? currentPly === 0 : variation.cursor === 0)}
              className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="First move (Home)"
            >
              <ChevronsLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => {
                if (frozenLine) {
                  if (variation.cursor > frozenLine.rootPly) {
                    updateVariation((current) => setVariationCursor(current, current.cursor - 1));
                  } else {
                    handleSelectPly(Math.max(0, frozenLine.rootPly - 1));
                  }
                } else if (!isOriginalPosition && variation.cursor > 0) {
                  updateVariation((current) => setVariationCursor(current, current.cursor - 1));
                } else if (currentPly > 0) {
                  handleSelectPly(currentPly - 1);
                }
              }}
              disabled={frozenLine ? variation.cursor === 0 : (isOriginalPosition ? currentPly === 0 : variation.cursor === 0)}
              className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Previous move (Left arrow)"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => {
                if (frozenLine || !isOriginalPosition) {
                  if (variation.cursor < variation.moves.length) {
                    updateVariation((current) => setVariationCursor(current, current.cursor + 1));
                  }
                } else if (currentPly < positions.length - 1) {
                  handleSelectPly(currentPly + 1);
                }
              }}
              disabled={
                frozenLine || !isOriginalPosition
                  ? variation.cursor >= variation.moves.length
                  : currentPly >= positions.length - 1
              }
              className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Next move (Right arrow)"
            >
              <ChevronRight size={20} />
            </button>
            <button
              type="button"
              onClick={() => {
                if (frozenLine || !isOriginalPosition) {
                  updateVariation((current) => setVariationCursor(current, variation.moves.length));
                } else {
                  handleSelectPly(positions.length - 1);
                }
              }}
              disabled={
                frozenLine || !isOriginalPosition
                  ? variation.cursor >= variation.moves.length
                  : currentPly >= positions.length - 1
              }
              className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Last move (End)"
            >
              <ChevronsRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
