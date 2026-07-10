// src/WoodpeckerMethod.jsx
import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { woodpeckerPuzzles } from '../data/woodpeckerPuzzles';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WoodpeckerMethod = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPuzzle = woodpeckerPuzzles[currentIndex];

  const [game, setGame] = useState(new Chess(currentPuzzle.fen));
  const [moveIndex, setMoveIndex] = useState(0);
  const [displayHint, setDisplayHint] = useState("");
  const [showFullSolution, setShowFullSolution] = useState(false);

  useEffect(() => {
    setGame(new Chess(currentPuzzle.fen));
    setMoveIndex(0);
    setDisplayHint("");
    setShowFullSolution(false);
  }, [currentIndex, currentPuzzle.fen]);

  const safeInitEngine = (fenString) => {
    try {
      if (!fenString || typeof fenString !== 'string') {
        return new Chess();
      }
      return new Chess(fenString);
    } catch (e) {
      console.error("Format runtime error caught on FEN rendering:", e.message);
      return new Chess();
    }
  };

  const onDrop = (sourceSquare, targetSquare) => {
    if (showFullSolution) return false; // Lock board if auto-playing solution

    try {
      const gameCopy = new Chess(game.fen());
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move === null) return false;

      // Validate move notation with solution array tracking
      const expectedMove = currentPuzzle.solution[moveIndex];

      if (move.san === expectedMove || move.lan === expectedMove) {
        setGame(gameCopy);
        const nextMoveIndex = moveIndex + 1;

        // Auto-reply logic simulating defensive tactical lines
        if (nextMoveIndex < currentPuzzle.solution.length) {
          setMoveIndex(nextMoveIndex);
          setTimeout(() => {
            gameCopy.move(currentPuzzle.solution[nextMoveIndex]);
            setGame(new Chess(gameCopy.fen()));
            setMoveIndex(nextMoveIndex + 1);
          }, 500);
        } else {
          toast.success("🎉 Spectacular! Puzzle Solved Correctly.", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const handleNext = () => {
    if (currentIndex < woodpeckerPuzzles.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRevealSolution = () => {
    setShowFullSolution(true);
    const fullGameEngine = new Chess(currentPuzzle.fen);
    let step = 0;

    const interval = setInterval(() => {
      if (step < currentPuzzle.solution.length) {
        fullGameEngine.move(currentPuzzle.solution[step]);
        setGame(new Chess(fullGameEngine.fen()));
        step++;
        setMoveIndex(step);
      } else {
        clearInterval(interval);
      }
    }, 700);
  };

  return (
    <div className="woodpecker-container">
      <h2 className="woodpecker-title">
        🪵 Woodpecker Training Mode
      </h2>

      <h3 className="woodpecker-subtitle">
        {currentPuzzle.title}
      </h3>

      <p className="woodpecker-description">
        {currentPuzzle.description}
      </p>

      <div className="board-container">
        <Chessboard
          position={game.fen()}
          onPieceDrop={onDrop}
          boardWidth={450}
          boardOrientation={
            currentPuzzle.fen.split(" ")[1] === "b" ? "black" : "white"
          }
        />
      </div>

      <div className="button-group">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="btn btn-nav"
        >
          ⬅️ Prev
        </button>

        <button
          onClick={() => {
            setGame(new Chess(currentPuzzle.fen));
            setMoveIndex(0);
            setDisplayHint("");
            setShowFullSolution(false);
          }}
          className="btn btn-retry"
        >
          🔄 Retry
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === woodpeckerPuzzles.length - 1}
          className="btn btn-nav"
        >
          Next ➡️
        </button>
      </div>

      <div className="button-group">
        <button
          onClick={() => setDisplayHint(currentPuzzle.hint)}
          className="btn btn-hint"
        >
          💡 Get Hint
        </button>

        <button
          onClick={handleRevealSolution}
          className="btn btn-solution"
        >
          👁️ Reveal Solution
        </button>
      </div>

      {displayHint && (
        <div className="hint-box">
          <strong>Hint:</strong> {displayHint}
        </div>
      )}

      {showFullSolution && (
        <div className="solution-box">
          Showing step-by-step mainline sequence:
          <strong> {currentPuzzle.solution.join(" → ")}</strong>
        </div>
      )}
    </div>
  );
};


export default WoodpeckerMethod;