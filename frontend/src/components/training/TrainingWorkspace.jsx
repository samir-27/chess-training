import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import {
  Lightbulb,
  Eye,
  RotateCcw,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Volume1,
  Flag,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowLeft
} from 'lucide-react';
import { soundManager } from '../../services/audioService.js';
import { storage } from '../../services/storageService.js';
import { evaluateAchievements } from '../../services/achievementService.js';

// Board visual theme palettes
const BOARD_THEMES = {
  'classic-wood': {
    name: 'Classic Wood',
    customDarkSquareStyle: { backgroundColor: '#b58863' },
    customLightSquareStyle: { backgroundColor: '#f0d9b5' }
  },
  'midnight-blue': {
    name: 'Midnight Cobalt',
    customDarkSquareStyle: { backgroundColor: '#2a3b5c' },
    customLightSquareStyle: { backgroundColor: '#8ea1c1' }
  },
  'emerald': {
    name: 'Tournament Emerald',
    customDarkSquareStyle: { backgroundColor: '#4b7355' },
    customLightSquareStyle: { backgroundColor: '#eae9d2' }
  },
  'slate': {
    name: 'Graphite Slate',
    customDarkSquareStyle: { backgroundColor: '#334155' },
    customLightSquareStyle: { backgroundColor: '#94a3b8' }
  },
  'coral': {
    name: 'Amber Coral',
    customDarkSquareStyle: { backgroundColor: '#b45309' },
    customLightSquareStyle: { backgroundColor: '#fde68a' }
  }
};

export default function TrainingWorkspace({
  course,
  chapter,
  lesson,
  cycleId = null,
  onBack = null,
  onNext = null,
  onPrev = null,
  hasNext = true,
  hasPrev = true
}) {
  const [settings, setSettings] = useState(() => storage.getSettings());
  const [game, setGame] = useState(() => initGame(lesson?.fen));
  const [moveIndex, setMoveIndex] = useState(0);
  const [displayHint, setDisplayHint] = useState('');
  const [highlightSquares, setHighlightSquares] = useState({});
  const [isRevealing, setIsRevealing] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error' | 'info', message: string }
  const [mistakesCount, setMistakesCount] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [boardOrientation, setBoardOrientation] = useState(() => getOrientation(lesson));
  const [selectedTheme, setSelectedTheme] = useState(() => settings.boardTheme || 'classic-wood');

  const startTimeRef = useRef(Date.now());
  const moveTimerRef = useRef(null);

  // Sync board with lesson changes
  useEffect(() => {
    const freshGame = initGame(lesson?.fen);
    setGame(freshGame);
    setMoveIndex(0);
    setDisplayHint('');

    // Highlight opponent's setup move if present
    if (lesson?.metadata?.preMove && lesson.metadata.preMove.length >= 4) {
      const fromSq = lesson.metadata.preMove.slice(0, 2);
      const toSq = lesson.metadata.preMove.slice(2, 4);
      setHighlightSquares({
        [fromSq]: { backgroundColor: 'rgba(234, 179, 8, 0.35)' },
        [toSq]: { backgroundColor: 'rgba(234, 179, 8, 0.55)' }
      });
    } else {
      setHighlightSquares({});
    }

    setIsRevealing(false);
    setIsSolved(false);
    setFeedback(null);
    setMistakesCount(0);
    setHintsUsed(0);
    setBoardOrientation(getOrientation(lesson));
    startTimeRef.current = Date.now();

    if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
  }, [lesson?.id, lesson?.fen]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
    };
  }, []);

  function getOrientation(currentLesson) {
    if (!currentLesson?.fen) return 'white';
    return currentLesson.fen.split(' ')[1] === 'b' ? 'black' : 'white';
  }

  function initGame(fen) {
    try {
      if (!fen || typeof fen !== 'string') return new Chess();
      return new Chess(fen);
    } catch {
      return new Chess();
    }
  }

  // Handle puzzle completion
  const handlePuzzleSolved = useCallback(() => {
    setIsSolved(true);
    setFeedback({ type: 'success', message: 'Magnificent! Tactical line completed.' });
    soundManager.playSuccess();

    const durationMs = Date.now() - startTimeRef.current;

    // Record attempt to storage
    const attempt = storage.recordAttempt({
      courseId: course?.id || 'woodpecker-course',
      chapterId: chapter?.id || 'chapter-1',
      lessonId: lesson?.id,
      isSolved: true,
      durationMs,
      mistakesCount,
      hintsUsed,
      cycleId
    });

    evaluateAchievements(attempt);

    // Auto-advance if enabled
    if (settings.autoAdvance && onNext && hasNext) {
      moveTimerRef.current = setTimeout(() => {
        onNext();
      }, settings.autoAdvanceDelay || 1200);
    }
  }, [course?.id, chapter?.id, lesson?.id, mistakesCount, hintsUsed, cycleId, settings, onNext, hasNext]);

  // Handle user piece drop
  const onDrop = (sourceSquare, targetSquare) => {
    if (isSolved || isRevealing) return false;

    try {
      const gameCopy = new Chess(game.fen());

      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      });

      if (!move) return false;

      const solution = lesson.solution || [];
      const expectedMove = solution[moveIndex];

      // Match SAN or LAN/UCI, being resilient to trailing '+' or '#' check/mate symbols
      const cleanSan = move.san.replace(/[+#]$/, '');
      const cleanExpected = (expectedMove || '').replace(/[+#]$/, '');
      const isMatch =
        move.san === expectedMove ||
        cleanSan === cleanExpected ||
        move.lan === expectedMove ||
        `${sourceSquare}${targetSquare}` === expectedMove;

      if (isMatch) {
        setGame(gameCopy);
        setFeedback(null);
        setHighlightSquares({});

        if (move.captured) soundManager.playCapture();
        else if (gameCopy.inCheck()) soundManager.playCheck();
        else soundManager.playMove();

        const nextMoveIndex = moveIndex + 1;

        if (nextMoveIndex < solution.length) {
          setMoveIndex(nextMoveIndex);

          // Opponent auto-reply
          moveTimerRef.current = setTimeout(() => {
            try {
              const oppMoveSan = solution[nextMoveIndex];
              let oppExec = null;
              try {
                oppExec = gameCopy.move(oppMoveSan);
              } catch {
                if (typeof oppMoveSan === 'string' && oppMoveSan.length >= 4) {
                  oppExec = gameCopy.move({
                    from: oppMoveSan.slice(0, 2),
                    to: oppMoveSan.slice(2, 4),
                    promotion: oppMoveSan[4] || 'q'
                  });
                }
              }

              if (oppExec) {
                setGame(new Chess(gameCopy.fen()));
                setHighlightSquares({
                  [oppExec.from]: { backgroundColor: 'rgba(234, 179, 8, 0.35)' },
                  [oppExec.to]: { backgroundColor: 'rgba(234, 179, 8, 0.55)' }
                });
                if (oppExec.captured) soundManager.playCapture();
                else if (gameCopy.inCheck()) soundManager.playCheck();
                else soundManager.playMove();

                const afterOppIndex = nextMoveIndex + 1;
                setMoveIndex(afterOppIndex);

                if (afterOppIndex >= solution.length) {
                  handlePuzzleSolved();
                }
              } else {
                handlePuzzleSolved();
              }
            } catch {
              handlePuzzleSolved();
            }
          }, 600);
        } else {
          handlePuzzleSolved();
        }

        return true;
      } else {
        // Incorrect move
        soundManager.playError();
        setMistakesCount(prev => prev + 1);
        setFeedback({
          type: 'error',
          message: 'Incorrect continuation. Consider king safety and piece vulnerability!'
        });
        return false;
      }
    } catch {
      return false;
    }
  };

  // Reveal solution step-by-step
  const handleRevealSolution = () => {
    if (isRevealing || isSolved) return;
    setIsRevealing(true);
    setFeedback({ type: 'info', message: 'Revealing step-by-step solution sequence...' });

    const solution = lesson.solution || [];
    const replayEngine = new Chess(lesson.fen);
    let step = 0;

    const interval = setInterval(() => {
      if (step < solution.length) {
        try {
          replayEngine.move(solution[step]);
          setGame(new Chess(replayEngine.fen()));
          soundManager.playMove();
          step++;
          setMoveIndex(step);
        } catch {
          clearInterval(interval);
          setIsRevealing(false);
        }
      } else {
        clearInterval(interval);
        setIsRevealing(false);
        setIsSolved(true);
        soundManager.playSuccess();
        // Record as solved via reveal
        storage.recordAttempt({
          courseId: course?.id,
          chapterId: chapter?.id,
          lessonId: lesson?.id,
          isSolved: false,
          durationMs: Date.now() - startTimeRef.current,
          mistakesCount: mistakesCount + 1,
          hintsUsed: hintsUsed + 1,
          cycleId
        });
      }
    }, 700);
  };

  // Provide hint with board highlight
  const handleGetHint = () => {
    setHintsUsed(prev => prev + 1);
    const solution = lesson.solution || [];
    const currentExpected = solution[moveIndex];

    if (currentExpected) {
      // Find source piece square for the hint
      try {
        const testEngine = new Chess(game.fen());
        const moveObj = testEngine.move(currentExpected);
        if (moveObj) {
          setHighlightSquares({
            [moveObj.from]: { backgroundColor: 'rgba(234, 179, 8, 0.45)' },
            [moveObj.to]: { backgroundColor: 'rgba(234, 179, 8, 0.3)' }
          });
        }
      } catch {
        // Fallback
      }
    }

    if (lesson.hint) {
      setDisplayHint(lesson.hint);
    } else {
      setDisplayHint(`Focus on active pieces and checks! Look at move #${Math.floor(moveIndex / 2) + 1}.`);
    }
  };

  // Reset board
  const handleReset = () => {
    if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
    setGame(initGame(lesson?.fen));
    setMoveIndex(0);
    setDisplayHint('');
    setHighlightSquares({});
    setIsRevealing(false);
    setIsSolved(false);
    setFeedback(null);
  };

  // Toggle orientation
  const handleFlip = () => {
    setBoardOrientation(prev => (prev === 'white' ? 'black' : 'white'));
  };

  // Toggle sound
  const handleToggleSound = () => {
    const updated = storage.updateSettings({ soundEnabled: !settings.soundEnabled });
    setSettings(updated);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' && onNext && hasNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && onPrev && hasPrev) {
        onPrev();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        handleGetHint();
      } else if (e.key === 'r' || e.key === 'R') {
        handleReset();
      } else if (e.key === 'f' || e.key === 'F') {
        handleFlip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, hasNext, hasPrev, game, lesson]);

  const activeTheme = BOARD_THEMES[selectedTheme] || BOARD_THEMES['classic-wood'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 lg:py-6 animate-fadeIn">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-brand-border">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2.5 rounded-xl bg-brand-surface border border-brand-border hover:border-slate-700 text-slate-300 hover:text-white active:scale-[0.98] transition-all cursor-pointer"
              title="Return to Course"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                {course?.title || 'Woodpecker Method'}
              </span>
              <span className="text-xs text-slate-600">•</span>
              <span className="text-xs text-amber-300 font-mono font-bold">
                {lesson?.metadata?.puzzleIndex ? `Puzzle ${lesson.metadata.puzzleIndex} / 700` : (chapter?.title || 'Woodpecker')}
              </span>
              {lesson?.metadata?.rating && (
                <>
                  <span className="text-xs text-slate-600">•</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-brand-border font-semibold">
                    ★ {lesson.metadata.rating}
                  </span>
                </>
              )}
            </div>
            <h1 className="text-lg lg:text-xl font-bold text-white tracking-tight mt-0.5">
              {lesson?.title || 'Tactical Position'}
            </h1>
          </div>
        </div>

        {/* Quick Toolbar */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer active:scale-[0.98] ${
              settings.soundEnabled
                ? 'bg-slate-900 border-amber-500/40 text-amber-400 hover:border-amber-400'
                : 'bg-slate-900/50 border-brand-border text-slate-500 hover:text-slate-300'
            }`}
            title={settings.soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
          >
            {settings.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Theme Selector */}
          <select
            value={selectedTheme}
            onChange={(e) => {
              setSelectedTheme(e.target.value);
              storage.updateSettings({ boardTheme: e.target.value });
            }}
            className="bg-brand-surface border border-brand-border text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            {Object.entries(BOARD_THEMES).map(([key, item]) => (
              <option key={key} value={key}>{item.name}</option>
            ))}
          </select>

          {/* Orientation Toggle */}
          <button
            onClick={handleFlip}
            className="p-2.5 rounded-xl bg-brand-surface border border-brand-border text-slate-300 hover:text-white hover:border-slate-700 active:scale-[0.98] transition-all cursor-pointer"
            title="Flip Board [F]"
          >
            <RotateCw size={16} />
          </button>
        </div>
      </div>

      {/* Main Training Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: The Chessboard */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-center">
          {/* Turn Indicator outside the board */}
          <div className="w-full max-w-[540px] flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-brand-surface border border-brand-border text-xs font-mono shadow-sm">
              <span className={`w-2.5 h-2.5 rounded-full ${game.turn() === 'w' ? 'bg-amber-100 ring-2 ring-amber-400' : 'bg-slate-950 ring-2 ring-slate-400'}`} />
              <span className="text-slate-200 font-bold uppercase tracking-wide">
                {game.turn() === 'w' ? 'White to Move' : 'Black to Move'}
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Flip [F] • Hint [Space]
            </span>
          </div>

          <div className="w-full max-w-[540px] aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800/90 ring-1 ring-white/10 relative bg-slate-950">
            <Chessboard
              position={game.fen()}
              onPieceDrop={onDrop}
              boardOrientation={boardOrientation}
              customDarkSquareStyle={activeTheme.customDarkSquareStyle}
              customLightSquareStyle={activeTheme.customLightSquareStyle}
              customSquareStyles={highlightSquares}
              animationDuration={250}
              arePiecesDraggable={!isSolved && !isRevealing}
            />
          </div>
        </div>

        {/* Right: Controls, Feedback & Move Log */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
          
          {/* Notification / Feedback Banner */}
          {feedback && (
            <div
              className={`p-4 rounded-2xl border flex items-start gap-3 transition-all animate-fadeIn ${
                feedback.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                  : feedback.type === 'error'
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                  : 'bg-sky-500/10 border-sky-500/30 text-sky-200'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={18} />
              ) : feedback.type === 'error' ? (
                <AlertCircle className="text-rose-400 shrink-0 mt-0.5" size={18} />
              ) : (
                <HelpCircle className="text-sky-400 shrink-0 mt-0.5" size={18} />
              )}
              <div className="text-xs font-medium leading-relaxed">{feedback.message}</div>
            </div>
          )}

          {/* Description & Objective Card */}
          <div className="glass-card rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Objective
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              {lesson?.description || `${boardOrientation === 'white' ? 'White' : 'Black'} to move. Find the best tactical continuation!`}
            </p>

            {/* Move Statistics */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-brand-border">
              <div className="bg-brand-surface/60 p-3 rounded-xl border border-brand-border/60">
                <div className="text-xs font-mono text-slate-400 uppercase">Mistakes</div>
                <div className={`text-base font-bold mt-0.5 ${mistakesCount > 0 ? 'text-rose-400' : 'text-slate-200'}`}>
                  {mistakesCount}
                </div>
              </div>
              <div className="bg-brand-surface/60 p-3 rounded-xl border border-brand-border/60">
                <div className="text-xs font-mono text-slate-400 uppercase">Hints Used</div>
                <div className="text-base font-bold text-amber-400 mt-0.5">{hintsUsed}</div>
              </div>
            </div>
          </div>

          {/* Unified Controls Card */}
          <div className="glass-card rounded-2xl p-5 shadow-xl space-y-3">
            
            {/* Next Exercise Button (Appears upon solving) */}
            {isSolved && (
              <button
                onClick={onNext}
                disabled={!hasNext}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-[0.98] transition-all animate-fadeIn cursor-pointer"
              >
                <span>Next Exercise</span>
                <ChevronRight size={16} />
              </button>
            )}

            {/* Tactical Assistance Tools */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleGetHint}
                disabled={isSolved || isRevealing}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-brand-surface border border-amber-500/30 text-amber-300 hover:bg-amber-500/10 font-medium text-xs transition-all disabled:opacity-40 cursor-pointer active:scale-[0.98]"
              >
                <Lightbulb size={14} />
                <span>Hint</span>
              </button>

              <button
                onClick={handleRevealSolution}
                disabled={isSolved || isRevealing}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-brand-surface border border-brand-border text-slate-300 hover:text-white hover:border-slate-700 font-medium text-xs transition-all disabled:opacity-40 cursor-pointer active:scale-[0.98]"
              >
                <Eye size={14} />
                <span>Solution</span>
              </button>

              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-brand-surface border border-brand-border text-slate-400 hover:text-slate-200 text-xs transition-all cursor-pointer active:scale-[0.98]"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            </div>

            {/* Display Hint Box */}
            {displayHint && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/25 rounded-xl text-xs text-amber-200 leading-relaxed animate-fadeIn">
                <span className="font-bold text-amber-400 mr-1.5">Hint:</span>
                {displayHint}
              </div>
            )}
          </div>

          {/* Keyboard Shortcuts Helper */}
          <div className="text-xs text-slate-400 font-mono text-center flex items-center justify-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-brand-border text-slate-300">[Space] Hint</span>
            <span>•</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-brand-border text-slate-300">[R] Reset</span>
            <span>•</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-brand-border text-slate-300">[F] Flip</span>
            <span>•</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-brand-border text-slate-300">[← / →]</span>
          </div>

        </div>

      </div>
    </div>
  );
}
