import React from 'react';
import DashboardView from '../../components/dashboard/DashboardView.jsx';

export default function HomePage({
  onStartTraining,
  onNavigateWoodpecker,
  onNavigateAnalysis
}) {
  return (
    <DashboardView
      onStartTraining={onStartTraining}
      onNavigateWoodpecker={onNavigateWoodpecker}
      onNavigateAnalysis={onNavigateAnalysis}
    />
  );
}
