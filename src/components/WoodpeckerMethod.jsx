import React, { useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

const woodpeckerPuzzles = [
  {
    id: 1,
    title: "Exercise 1: Carl Hamppe - Wilhelm Steinitz",
    fen: "r6r/1pp3k1/1b6/p2P1p2/P1N1pn2/2P2PP1/2P2PP1/4RR1K b - - 0 1",
    solution: ["Rxh2+", "Kxh2", "Rh8#"],
    description: "Black to move. Find the forced checkmate sequence!"
  },
  {
    id: 2,
    title: "Exercise 2: Wilhelm Steinitz - J. Wilson",
    fen: "rnb3kr/ppp4p/3b3B/3Pp2n/2BP4/3K1Rp1/PPP3q1/RN1Q4 w - - 0 1",
    solution: ["Rf8+", "Bxf8", "d6+", "Be6", "Bxe6#"],
    description: "White to move. Hunt the enemy king down!"
  },
  {
    id: 3,
    title: "Exercise 3: Wilhelm Steinitz - Serafino Dubois",
    fen: "r2q1rk1/pppb1ppp/3b3B/4p1P1/4Pn2/2N1B2P/PPPQBP2/2KR3R w - - 0 1",
    solution: ["Bxf4", "exf4", "e5"],
    description: "White to move. Take advantage of the pinned piece on d6!"
  }
];

const WoodpeckerMethod = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPuzzle = woodpeckerPuzzles[currentIndex];

  const [game, setGame] = useState(new Chess(currentPuzzle.fen));
  const [moveIndex, setMoveIndex] = useState(0);

  const onDrop = (sourceSquare, targetSquare) => {
    try {
      const gameCopy = new Chess(game.fen());
      
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      });

      if (move === null) return false;

      const correctMoveSAN = currentPuzzle.solution[moveIndex];
      
      if (move.san === correctMoveSAN || move.lan === correctMoveSAN) {
        setGame(gameCopy);
        
        const nextMoveIndex = moveIndex + 1;
        if (nextMoveIndex < currentPuzzle.solution.length) {
          setTimeout(() => {
            gameCopy.move(currentPuzzle.solution[nextMoveIndex]);
            setGame(new Chess(gameCopy.fen()));
            setMoveIndex(nextMoveIndex + 1);
          }, 600);
        } else {
          alert("🎉 Excellent! Puzzle Solved Successfully.");
        }
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const nextPuzzle = () => {
    if (currentIndex < woodpeckerPuzzles.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setGame(new Chess(woodpeckerPuzzles[nextIdx].fen));
      setMoveIndex(0);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', color: '#fff', padding: '20px' }}>
      <h2>🪵 Woodpecker Method Trainer</h2>
      <h3>{currentPuzzle.title}</h3>
      <p style={{ color: '#aaa', fontStyle: 'italic' }}>{currentPuzzle.description}</p>

      <div style={{ width: '100%', maxWidth: '450px' }}>
        <Chessboard 
          position={game.fen()} 
          onPieceDrop={onDrop}
          boardWidth={450}
          boardOrientation={currentPuzzle.fen.split(' ')[1] === 'b' ? 'black' : 'white'}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => { setGame(new Chess(currentPuzzle.fen)); setMoveIndex(0); }}
          style={{ padding: '8px 16px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Retry
        </button>
        <button 
          onClick={nextPuzzle}
          disabled={currentIndex === woodpeckerPuzzles.length - 1}
          style={{ padding: '8px 16px', backgroundColor: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Next Exercise ➡️
        </button>
      </div>
    </div>
  );
};

export default WoodpeckerMethod;