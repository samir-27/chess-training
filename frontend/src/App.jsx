import { useState, useEffect } from 'react';
import AppShell from './components/layout/AppShell.jsx';
import DashboardView from './components/dashboard/DashboardView.jsx';
import TrainingWorkspace from './components/training/TrainingWorkspace.jsx';
import WoodpeckerView from './components/woodpecker/WoodpeckerView.jsx';
import AnalyticsView from './components/analytics/AnalyticsView.jsx';
import AboutAppView from './components/about/AboutAppView.jsx';
import SettingsView from './components/settings/SettingsView.jsx';
import GameAnalysisView from './components/analysis/GameAnalysisView.jsx';
import { storage } from './services/storageService.js';
import { getLastAnalysisId } from './services/analysisRepository.js';
import './App.css';

function getRoute(pathname) {
  if (pathname === '/') return { tab: 'dashboard', analysisId: null, notFound: false };
  if (pathname === '/analysis') return { tab: 'analysis', analysisId: null, notFound: false };
  const analysisMatch = pathname.match(/^\/analysis\/([a-z\d_-]{1,80})$/i);
  if (analysisMatch) return { tab: 'analysis', analysisId: analysisMatch[1], notFound: false };

  const routes = {
    '/woodpecker': 'woodpecker',
    '/analytics': 'analytics',
    '/about': 'about_app',
    '/settings': 'settings',
    '/training': 'training'
  };
  return routes[pathname]
    ? { tab: routes[pathname], analysisId: null, notFound: false }
    : { tab: 'not_found', analysisId: null, notFound: true };
}

const TAB_PATHS = {
  dashboard: '/',
  woodpecker: '/woodpecker',
  analysis: '/analysis',
  analytics: '/analytics',
  about_app: '/about',
  settings: '/settings',
  training: '/training'
};

export default function App() {
  const [route, setRoute] = useState(() => getRoute(window.location.pathname));
  const [trainingContext, setTrainingContext] = useState(() => {
    const course = storage.getCourseById('course-woodpecker-method');
    return course && course.chapters[0]?.lessons[0]
      ? {
          course,
          chapter: course.chapters[0],
          lesson: course.chapters[0].lessons[0],
          cycleId: null
        }
      : null;
  });
  const [lastAnalysisId, setLastAnalysisId] = useState(() => getLastAnalysisId());
  const activeTab = route.tab;

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getRoute(window.location.pathname));
      setLastAnalysisId(getLastAnalysisId());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToPath = (path, { replace = false } = {}) => {
    if (window.location.pathname !== path) {
      if (replace) window.history.replaceState({}, '', path);
      else window.history.pushState({}, '', path);
    }
    setRoute(getRoute(path));
  };

  const navigateToTab = (tab) => {
    if (tab === 'analysis' && lastAnalysisId) {
      navigateToPath(`/analysis/${lastAnalysisId}`);
      return;
    }
    navigateToPath(TAB_PATHS[tab] || '/');
  };

  // Launch training workspace with specific course/chapter/lesson
  const handleStartTraining = ({ course, chapter, lesson, cycleId = null }) => {
    setTrainingContext({
      course,
      chapter,
      lesson,
      cycleId
    });
    navigateToTab('training');
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
    <AppShell activeTab={activeTab} onTabChange={navigateToTab}>
      {activeTab === 'dashboard' && (
        <DashboardView
          onStartTraining={handleStartTraining}
          onNavigateWoodpecker={() => navigateToTab('woodpecker')}
          onNavigateAnalysis={() => navigateToTab('analysis')}
          onNavigateAnalytics={() => navigateToTab('analytics')}
        />
      )}

      {activeTab === 'woodpecker' && (
        <WoodpeckerView
          onStartTraining={handleStartTraining}
        />
      )}

      {activeTab === 'training' && (
        trainingContext ? <TrainingWorkspace
          course={trainingContext?.course}
          chapter={trainingContext?.chapter}
          lesson={trainingContext?.lesson}
          cycleId={trainingContext?.cycleId}
          onBack={() => navigateToTab('woodpecker')}
          onNext={handleNextLesson}
          onPrev={handlePrevLesson}
          hasNext={hasNext}
          hasPrev={hasPrev}
        /> : <WoodpeckerView onStartTraining={handleStartTraining} />
      )}

      {activeTab === 'analysis' && (
        <GameAnalysisView
          analysisId={route.analysisId}
          onAnalysisCreated={(analysisId) => {
            setLastAnalysisId(analysisId);
            navigateToPath(`/analysis/${analysisId}`);
          }}
          onNewAnalysis={() => navigateToPath('/analysis')}
          onSelectAnalysis={(analysisId) => navigateToPath(`/analysis/${analysisId}`)}
        />
      )}

      {activeTab === 'analytics' && (
        <AnalyticsView />
      )}

      {activeTab === 'about_app' && (
        <AboutAppView
          onNavigateWoodpecker={() => navigateToTab('woodpecker')}
          onNavigateAnalysis={() => navigateToTab('analysis')}
          onNavigateAnalytics={() => navigateToTab('analytics')}
        />
      )}

      {activeTab === 'settings' && (
        <SettingsView />
      )}

      {route.notFound && (
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold text-white">Page not found</h1>
          <p className="mt-2 text-sm text-slate-400">This Chess Wizards route does not exist.</p>
          <button
            type="button"
            onClick={() => navigateToPath('/')}
            className="mt-5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-sm font-bold"
          >
            Go to dashboard
          </button>
        </div>
      )}
    </AppShell>
  );
}
