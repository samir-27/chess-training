import React, { useState, useEffect } from 'react';
import AppShell from './components/layout/AppShell.jsx';
import DashboardView from './components/dashboard/DashboardView.jsx';
import CourseLibraryView from './components/library/CourseLibraryView.jsx';
import TrainingWorkspace from './components/training/TrainingWorkspace.jsx';
import WoodpeckerView from './components/woodpecker/WoodpeckerView.jsx';
import AnalyticsView from './components/analytics/AnalyticsView.jsx';
import AboutWoodpeckerView from './components/about/AboutWoodpeckerView.jsx';
import SettingsView from './components/settings/SettingsView.jsx';
import { storage } from './services/storageService.js';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [trainingContext, setTrainingContext] = useState(null);

  // Initialize default training context on mount if none selected
  useEffect(() => {
    if (!trainingContext) {
      const course = storage.getCourseById('course-woodpecker-method');
      if (course && course.chapters[0]?.lessons[0]) {
        setTrainingContext({
          course,
          chapter: course.chapters[0],
          lesson: course.chapters[0].lessons[0],
          cycleId: null
        });
      }
    }
  }, []);

  // Launch training workspace with specific course/chapter/lesson
  const handleStartTraining = ({ course, chapter, lesson, cycleId = null }) => {
    setTrainingContext({
      course,
      chapter,
      lesson,
      cycleId
    });
    setActiveTab('training');
  };

  // Navigate to next lesson in chapter or cycle
  const handleNextLesson = () => {
    if (!trainingContext) return;
    const { course, chapter, lesson, cycleId } = trainingContext;

    // If within a Woodpecker cycle
    if (cycleId) {
      const cycle = storage.getAllCycles().find(c => c.id === cycleId);
      if (cycle && cycle.puzzleIds) {
        const curIdx = cycle.puzzleIds.findIndex(id => String(id) === String(lesson.id));
        if (curIdx >= 0 && curIdx < cycle.puzzleIds.length - 1) {
          const nextId = cycle.puzzleIds[curIdx + 1];
          for (const ch of course.chapters) {
            const nextL = ch.lessons.find(l => String(l.id) === String(nextId));
            if (nextL) {
              setTrainingContext({ course, chapter: ch, lesson: nextL, cycleId });
              return;
            }
          }
        }
      }
    }

    // Default chapter navigation
    const curIdx = chapter.lessons.findIndex(l => l.id === lesson.id);
    if (curIdx >= 0 && curIdx < chapter.lessons.length - 1) {
      setTrainingContext({
        course,
        chapter,
        lesson: chapter.lessons[curIdx + 1],
        cycleId
      });
      return;
    }

    // Next chapter
    const chIdx = course.chapters.findIndex(c => c.id === chapter.id);
    if (chIdx >= 0 && chIdx < course.chapters.length - 1) {
      const nextCh = course.chapters[chIdx + 1];
      if (nextCh.lessons[0]) {
        setTrainingContext({
          course,
          chapter: nextCh,
          lesson: nextCh.lessons[0],
          cycleId
        });
      }
    }
  };

  // Navigate to previous lesson
  const handlePrevLesson = () => {
    if (!trainingContext) return;
    const { course, chapter, lesson, cycleId } = trainingContext;

    const curIdx = chapter.lessons.findIndex(l => l.id === lesson.id);
    if (curIdx > 0) {
      setTrainingContext({
        course,
        chapter,
        lesson: chapter.lessons[curIdx - 1],
        cycleId
      });
      return;
    }

    // Previous chapter
    const chIdx = course.chapters.findIndex(c => c.id === chapter.id);
    if (chIdx > 0) {
      const prevCh = course.chapters[chIdx - 1];
      const lastLesson = prevCh.lessons[prevCh.lessons.length - 1];
      if (lastLesson) {
        setTrainingContext({
          course,
          chapter: prevCh,
          lesson: lastLesson,
          cycleId
        });
      }
    }
  };

  const hasNext = Boolean(trainingContext);
  const hasPrev = Boolean(trainingContext);

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'dashboard' && (
        <DashboardView
          onSelectCourse={(course) => {
            if (course.chapters[0]?.lessons[0]) {
              handleStartTraining({
                course,
                chapter: course.chapters[0],
                lesson: course.chapters[0].lessons[0]
              });
            }
          }}
          onStartTraining={handleStartTraining}
          onNavigateWoodpecker={() => setActiveTab('woodpecker')}
          onNavigateLibrary={() => setActiveTab('library')}
        />
      )}

      {activeTab === 'woodpecker' && (
        <WoodpeckerView
          onStartTraining={handleStartTraining}
        />
      )}

      {activeTab === 'training' && (
        <TrainingWorkspace
          course={trainingContext?.course}
          chapter={trainingContext?.chapter}
          lesson={trainingContext?.lesson}
          cycleId={trainingContext?.cycleId}
          onBack={() => setActiveTab('library')}
          onNext={handleNextLesson}
          onPrev={handlePrevLesson}
          hasNext={hasNext}
          hasPrev={hasPrev}
        />
      )}

      {activeTab === 'library' && (
        <CourseLibraryView
          onSelectLesson={handleStartTraining}
          onNavigateAbout={() => setActiveTab('about')}
        />
      )}

      {activeTab === 'analytics' && (
        <AnalyticsView />
      )}

      {activeTab === 'about' && (
        <AboutWoodpeckerView
          onStartCycle={() => setActiveTab('woodpecker')}
          onStartTraining={() => {
            const course = storage.getCourseById('course-woodpecker-method');
            if (course?.chapters[0]?.lessons[0]) {
              handleStartTraining({
                course,
                chapter: course.chapters[0],
                lesson: course.chapters[0].lessons[0]
              });
            }
          }}
        />
      )}

      {activeTab === 'settings' && (
        <SettingsView />
      )}
    </AppShell>
  );
}
