import React from 'react';
import AboutAppView from '../../components/about/AboutAppView.jsx';

export default function AboutPage({
  onNavigateWoodpecker,
  onNavigateAnalysis
}) {
  return (
    <AboutAppView
      onNavigateWoodpecker={onNavigateWoodpecker}
      onNavigateAnalysis={onNavigateAnalysis}
    />
  );
}
