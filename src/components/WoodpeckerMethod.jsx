// src/WoodpeckerMethod.jsx
import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { woodpeckerPuzzles } from '../data/woodpeckerPuzzles';

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
    if (showFullSolution) return false;

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
          alert("🎉 Spectacular! Puzzle Solved Correctly.");
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', color: '#fff', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ margin: 0, color: '#f39c12' }}>🪵 Woodpecker Training Mode</h2>
      <h3 style={{ margin: '5px 0' }}>{currentPuzzle.title}</h3>
      <p style={{ color: '#aaa', fontSize: '14px', maxWidth: '450px', textAlign: 'center', margin: '0 0 10px 0' }}>
        {currentPuzzle.description}
      </p>

      {/* Chessboard Card Container */}
      <div style={{ width: '100%', maxWidth: '450px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', borderRadius: '8px', overflow: 'hidden' }}>
        <Chessboard 
          position={game.fen()} 
          onPieceDrop={onDrop}
          boardWidth={450}
          boardOrientation={currentPuzzle.fen.split(' ')[1] === 'b' ? 'black' : 'white'}
        />
      </div>

      {/* Interactive Navigation Panel */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button onClick={handlePrevious} disabled={currentIndex === 0} style={btnStyle('#34495e', currentIndex === 0)}>
          ⬅️ Prev
        </button>
        <button onClick={() => { setGame(new Chess(currentPuzzle.fen)); setMoveIndex(0); setDisplayHint(""); setShowFullSolution(false); }} style={btnStyle('#e74c3c')}>
          🔄 Retry
        </button>
        <button onClick={handleNext} disabled={currentIndex === woodpeckerPuzzles.length - 1} style={btnStyle('#34495e', currentIndex === woodpeckerPuzzles.length - 1)}>
          Next ➡️
        </button>
      </div>

      {/* Tactical Helper Panel */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
        <button onClick={() => setDisplayHint(currentPuzzle.hint)} style={btnStyle('#9b59b6')}>
          💡 Get Hint
        </button>
        <button onClick={handleRevealSolution} style={btnStyle('#27ae60')}>
          👁️ Reveal Solution
        </button>
      </div>

      {/* Display messages contextually */}
      {displayHint && (
        <div style={{ padding: '10px', backgroundColor: '#2c3e50', borderRadius: '5px', maxWidth: '450px', textAlign: 'center', borderLeft: '4px solid #9b59b6' }}>
          <strong>Hint:</strong> {displayHint}
        </div>
      )}

      {showFullSolution && (
        <div style={{ padding: '10px', backgroundColor: '#1e272c', borderRadius: '5px', color: '#2ecc71', fontSize: '14px' }}>
          Showing step-by-step mainline sequence: <strong>{currentPuzzle.solution.join(' -> ')}</strong>
        </div>
      )}
    </div>
  );
};

// Reusable micro UI button styles
const btnStyle = (color, disabled = false) => ({
  padding: '10px 18px',
  backgroundColor: disabled ? '#7f8c8d' : color,
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: disabled ? 'not-allowed' : 'pointer',
  fontWeight: 'bold',
  fontSize: '14px',
  transition: 'background-color 0.2s'
});

export default WoodpeckerMethod;