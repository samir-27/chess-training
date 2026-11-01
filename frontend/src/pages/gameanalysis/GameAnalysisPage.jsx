import React from 'react';
import GameAnalysisView from '../../components/analysis/GameAnalysisView.jsx';

export default function GameAnalysisPage({
  analysisId = null,
  historyId = null,
  savedChessComUsername = '',
  onAnalysisCreated,
  onNewAnalysis,
  onSelectAnalysis
}) {
  return (
    <GameAnalysisView
      analysisId={analysisId}
      historyId={historyId}
      savedChessComUsername={savedChessComUsername}
      onAnalysisCreated={onAnalysisCreated}
      onNewAnalysis={onNewAnalysis}
      onSelectAnalysis={onSelectAnalysis}
    />
  );
}
