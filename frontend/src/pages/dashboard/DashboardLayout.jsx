import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Zap,
  Activity,
  Settings,
  HelpCircle
} from 'lucide-react';
import { storage } from '../../services/storageService.js';
import { getOverallStats } from '../../services/trainingStatsService.js';
import { getLastAnalysisId } from '../../services/analysisRepository.js';
import { getCurrentUser, logoutAccount } from '../../services/authService.js';
import AccountModal from '../../components/layout/AccountModal.jsx';
import SidebarNav from './SidebarNav.jsx';
import MobileNav from './MobileNav.jsx';

// Pages
import HomePage from '../home/HomePage.jsx';
import WoodpeckerPage from '../woodpecker/WoodpeckerPage.jsx';
import GameAnalysisPage from '../gameanalysis/GameAnalysisPage.jsx';
import SettingPage from '../setting/SettingPage.jsx';
import AboutPage from '../about/AboutPage.jsx';

export const NAV_ITEMS = [
  { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'woodpecker', label: 'Woodpecker Method', icon: Zap },
  { id: 'gameanalysis', label: 'Game Analysis', icon: Activity },
  { id: 'about_app', label: 'About the App', icon: HelpCircle },
  { id: 'setting', label: 'Settings', icon: Settings },
];

function getRoute(urlOrPath) {
  let pathname = '/';
  let search = '';
  if (typeof urlOrPath === 'string') {
    const qIdx = urlOrPath.indexOf('?');
    if (qIdx >= 0) {
      pathname = urlOrPath.slice(0, qIdx);
      search = urlOrPath.slice(qIdx);
    } else {
      pathname = urlOrPath;
    }
  } else if (urlOrPath && typeof urlOrPath === 'object') {
    pathname = urlOrPath.pathname || '/';
    search = urlOrPath.search || '';
  }

  const searchParams = new URLSearchParams(search);
  const historyId = searchParams.get('historyId') || null;

  if (pathname === '/' || pathname === '/dashboard') {
    return { tab: 'home', analysisId: null, historyId: null, notFound: false };
  }
  if (pathname === '/analysis' || pathname === '/history' || pathname === '/gameanalysis') {
    return { tab: 'gameanalysis', analysisId: null, historyId, notFound: false };
  }

  const analysisMatch = pathname.match(/^\/analysis\/([a-z\d_-]{1,80})$/i);
  if (analysisMatch) {
    return { tab: 'gameanalysis', analysisId: analysisMatch[1], historyId, notFound: false };
  }

  const routes = {
    '/home': 'home',
    '/woodpecker': 'woodpecker',
    '/about': 'about_app',
    '/settings': 'setting',
    '/setting': 'setting',
    '/training': 'training'
  };

  return routes[pathname]
    ? { tab: routes[pathname], analysisId: null, historyId: null, notFound: false }
    : { tab: 'not_found', analysisId: null, historyId: null, notFound: true };
}

const TAB_PATHS = {
  home: '/',
  dashboard: '/',
  woodpecker: '/woodpecker',
  gameanalysis: '/analysis',
  analysis: '/analysis',
  about_app: '/about',
  about: '/about',
  setting: '/settings',
  settings: '/settings',
  training: '/training'
};

export default function DashboardLayout() {
  const [route, setRoute] = useState(() => getRoute(window.location.pathname + window.location.search));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [stats, setStats] = useState(() => getOverallStats());

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
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState('');
  const activeTab = route.tab;

  useEffect(() => {
    return storage.subscribe(() => setStats(getOverallStats()));
  }, []);

  useEffect(() => {
    let active = true;
    getCurrentUser()
      .then((currentUser) => {
        if (active) {
          setUser(currentUser);
          if (!currentUser) setLastAnalysisId(getLastAnalysisId());
        }
      })
      .catch((error) => {
        if (active) setAuthError(error.message || 'Unable to verify your account.');
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getRoute(window.location.pathname + window.location.search));
      setLastAnalysisId(getLastAnalysisId());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToPath = (path, { replace = false } = {}) => {
    const currentFull = window.location.pathname + window.location.search;
    if (currentFull !== path) {
      if (replace) window.history.replaceState({}, '', path);
      else window.history.pushState({}, '', path);
    }
    setRoute(getRoute(path));
  };

  const navigateToTab = (tab) => {
    if ((tab === 'gameanalysis' || tab === 'analysis') && lastAnalysisId) {
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

  // Stepper: navigate to next lesson in chapter or cycle
  const handleNextLesson = () => {
    if (!trainingContext) return;
    const { course, chapter, lesson, cycleId } = trainingContext;

    if (cycleId) {
      const cycle = storage.getAllCycles().find((c) => c.id === cycleId);
      if (cycle && cycle.puzzleIds) {
        const curIdx = cycle.puzzleIds.findIndex((id) => String(id) === String(lesson.id));
        if (curIdx >= 0 && curIdx < cycle.puzzleIds.length - 1) {
          const nextId = cycle.puzzleIds[curIdx + 1];
          for (const ch of course.chapters) {
            const nextL = ch.lessons.find((l) => String(l.id) === String(nextId));
            if (nextL) {
              setTrainingContext({ course, chapter: ch, lesson: nextL, cycleId });
              return;
            }
          }
        }
      }
    }

    const curIdx = chapter.lessons.findIndex((l) => l.id === lesson.id);
    if (curIdx >= 0 && curIdx < chapter.lessons.length - 1) {
      setTrainingContext({
        course,
        chapter,
        lesson: chapter.lessons[curIdx + 1],
        cycleId
      });
      return;
    }

    const chIdx = course.chapters.findIndex((c) => c.id === chapter.id);
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

  // Stepper: navigate to previous lesson
  const handlePrevLesson = () => {
    if (!trainingContext) return;
    const { course, chapter, lesson, cycleId } = trainingContext;

    const curIdx = chapter.lessons.findIndex((l) => l.id === lesson.id);
    if (curIdx > 0) {
      setTrainingContext({
        course,
        chapter,
        lesson: chapter.lessons[curIdx - 1],
        cycleId
      });
      return;
    }

    const chIdx = course.chapters.findIndex((c) => c.id === chapter.id);
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

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutAccount();
      setUser(null);
      setAuthError('');
      setLastAnalysisId(getLastAnalysisId());
      navigateToPath('/');
    } catch (error) {
      setAuthError(error.message || 'Unable to log out.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleAuthenticated = (authenticatedUser) => {
    setUser(authenticatedUser);
    setAuthError('');
    setLastAnalysisId(getLastAnalysisId());
    setAccountModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Desktop Vertical Navbar */}
      <SidebarNav
        navItems={NAV_ITEMS}
        activeTab={activeTab === 'training' ? 'woodpecker' : activeTab}
        onTabChange={navigateToTab}
        stats={stats}
        user={user}
        onOpenAccountModal={() => setAccountModalOpen(true)}
        onLogout={handleLogout}
        isLoggingOut={isLoggingOut}
        authError={authError}
      />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header & Drawer */}
        <MobileNav
          isOpen={mobileMenuOpen}
          setIsOpen={setMobileMenuOpen}
          navItems={NAV_ITEMS}
          activeTab={activeTab === 'training' ? 'woodpecker' : activeTab}
          onTabChange={navigateToTab}
          stats={stats}
          user={user}
          onOpenAccountModal={() => setAccountModalOpen(true)}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
          authError={authError}
        />

        {/* Dynamic Pages Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin">
          {activeTab === 'home' && (
            <HomePage
              onStartTraining={handleStartTraining}
              onNavigateWoodpecker={() => navigateToTab('woodpecker')}
              onNavigateAnalysis={() => navigateToTab('gameanalysis')}
            />
          )}

          {activeTab === 'woodpecker' && (
            <WoodpeckerPage
              isTraining={false}
              onStartTraining={handleStartTraining}
            />
          )}

          {activeTab === 'training' && (
            <WoodpeckerPage
              isTraining={true}
              trainingContext={trainingContext}
              onStartTraining={handleStartTraining}
              onBack={() => navigateToTab('woodpecker')}
              onNext={handleNextLesson}
              onPrev={handlePrevLesson}
              hasNext={hasNext}
              hasPrev={hasPrev}
            />
          )}

          {activeTab === 'gameanalysis' && (
            <GameAnalysisPage
              analysisId={route.analysisId}
              historyId={route.historyId}
              savedChessComUsername={user?.chessComUsername || ''}
              onAnalysisCreated={(analysisId) => {
                setLastAnalysisId(analysisId);
                navigateToPath(`/analysis/${analysisId}`);
              }}
              onNewAnalysis={() => navigateToPath('/analysis')}
              onSelectAnalysis={(analysisId) => navigateToPath(`/analysis/${analysisId}`)}
            />
          )}

          {activeTab === 'setting' && (
            <SettingPage />
          )}

          {activeTab === 'about_app' && (
            <AboutPage
              onNavigateWoodpecker={() => navigateToTab('woodpecker')}
              onNavigateAnalysis={() => navigateToTab('gameanalysis')}
            />
          )}

          {route.notFound && (
            <div className="max-w-3xl mx-auto px-6 py-20 text-center">
              <h1 className="text-2xl font-bold text-white">Page not found</h1>
              <p className="mt-2 text-sm text-slate-400">This Chess Wizards route does not exist.</p>
              <button
                type="button"
                onClick={() => navigateToPath('/')}
                className="mt-5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-sm font-bold cursor-pointer"
              >
                Go to dashboard
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Account Login/Register Modal */}
      <AccountModal
        isOpen={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
        onAuthenticated={handleAuthenticated}
      />
    </div>
  );
}
