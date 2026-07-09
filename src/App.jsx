import React from 'react';
import ChessboardTrainer from './components/Chessboard.jsx';

function App() {
  return (
    <div style={{ 
      backgroundColor: '#1a1a1a', 
      color: '#fff', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <ChessboardTrainer />
    </div>
  );
}

export default App;