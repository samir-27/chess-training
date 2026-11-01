import React from 'react';
import WoodpeckerView from '../../components/woodpecker/WoodpeckerView.jsx';
import TrainingWorkspace from '../../components/training/TrainingWorkspace.jsx';

export default function WoodpeckerPage({
  isTraining = false,
  trainingContext = null,
  onStartTraining,
  onBack,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false
}) {
  if (isTraining && trainingContext) {
    return (
      <TrainingWorkspace
        course={trainingContext?.course}
        chapter={trainingContext?.chapter}
        lesson={trainingContext?.lesson}
        cycleId={trainingContext?.cycleId}
        onBack={onBack}
        onNext={onNext}
        onPrev={onPrev}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />
    );
  }

  return (
    <WoodpeckerView
      onStartTraining={onStartTraining}
    />
  );
}
