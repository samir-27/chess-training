import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';

const ChessboardTrainer = () => {
  // Shuruat mein board ko full layout ('start') position denge
  const [position, setPosition] = useState('start');

  const onDrop = (sourceSquare, targetSquare) => {
    console.log(`Moved piece from ${sourceSquare} to ${targetSquare}`);
    
    // Abhi ke liye hum koi rule apply nahi kar rahe hain. 
    // Iska matlab aap koi bhi piece kahin bhi move kar sakte hain (Free play)!
    // Agar pieces stick ho jate hain, toh hamara setup 100% sahi hai.
    return true; 
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '20px' }}>
      <h2 style={{ color: '#fff' }}>Free Play Testing Board</h2>
      
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <Chessboard 
          position={position} 
          onPieceDrop={onDrop}
          boardWidth={500}
        />
      </div>
    </div>
  );
};

export default ChessboardTrainer;