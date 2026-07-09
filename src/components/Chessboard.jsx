import React, { useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

const ChessboardTrainer = () => {

  const [game, setGame] = useState(new Chess());
  
  const [gameFen, setGameFen] = useState(game.fen());

  const onDrop = (sourceSquare, targetSquare) => {
    try {
      const gameCopy = new Chess(game.fen());

      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move === null) return false;

      setGame(gameCopy);
      setGameFen(gameCopy.fen());
      
      console.log(`Legal Move Executed: ${move.san}`);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleReset = () => {
    const newGame = new Chess();
    setGame(newGame);
    setGameFen(newGame.fen());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '20px' }}>
      <h2 style={{ color: '#fff', fontFamily: 'sans-serif' }}>MERN Chess Trainer: Step 1 Complete!</h2>
      
      <div style={{ width: '100%', maxWidth: '500px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
        <Chessboard 
          position={gameFen} // Ab yeh gameFen state se connect hai, static 'start' nahi hai!
          onPieceDrop={onDrop}
          boardWidth={500}
        />
      </div>

      <button 
        onClick={handleReset} 
        style={{ 
          padding: '10px 20px', 
          cursor: 'pointer', 
          backgroundColor: '#e74c3c', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '4px', 
          fontWeight: 'bold',
          fontSize: '16px'
        }}
      >
        Reset Game
      </button>
    </div>
  );
};

export default ChessboardTrainer;