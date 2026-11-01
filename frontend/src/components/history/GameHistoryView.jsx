import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  History,
  Upload,
  Search,
  Filter,
  Trash2,
  Play,
  RotateCcw,
  Calendar,
  CheckSquare,
  Square,
  ChevronLeft,
  ChevronRight,
  Globe,
  ClipboardPaste,
  FileText,
  AlertCircle,
  Trophy,
  Activity,
  Layers,
  Sparkles,
  RefreshCw,
  X
} from 'lucide-react';
import {
  listGameHistory,
  getGameHistoryStats,
  listTemporaryGames,
  deleteGame,
  bulkDeleteGames
} from '../../services/gameHistoryRepository.js';
import ImportGamesModal from './ImportGamesModal.jsx';

function ResultBadge({ result }) {
  if (result === '1-0') {
    return (
      <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" title="White won">
        1-0
      </span>
    );
  }
  if (result === '0-1') {
    return (
      <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-purple-500/15 text-purple-400 border border-purple-500/30" title="Black won">
        0-1
      </span>
    );
  }
  if (result === '1/2-1/2') {
    return (
      <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-slate-700/50 text-slate-300 border border-slate-600" title="Draw">
        ½-½
      </span>
    );
  }
  return (
    <span className="px-2 py-0.5 rounded font-mono text-xs bg-slate-800 text-slate-400 border border-slate-700" title="Ongoing or Unknown">
      {result || '*'}
    </span>
  );
}

function SourceBadge({ source }) {
  if (source === 'chess.com') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-950/70 text-emerald-400 border border-emerald-800/60" title="Imported from Chess.com">
        <Globe size={11} /> Chess.com
      </span>
    );
  }
  if (source === 'upload') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-blue-950/70 text-blue-400 border border-blue-800/60" title="Uploaded from PGN file">
        <Upload size={11} /> Upload
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-amber-950/70 text-amber-400 border border-amber-800/60" title="Pasted PGN">
      <ClipboardPaste size={11} /> Paste
    </span>
  );
}

function AccuracyBadge({ accuracy }) {
  const whiteAcc = accuracy?.white;
  const blackAcc = accuracy?.black;

  if (whiteAcc == null && blackAcc == null) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono text-slate-400 bg-slate-800/60 border border-slate-700/60">
        Not analyzed
      </span>
    );
  }

  const getScoreColor = (val) => {
    if (val == null) return 'text-slate-400 border-slate-700 bg-slate-800/50';
    if (val >= 85) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (val >= 70) return 'text-sky-400 border-sky-500/30 bg-sky-500/10';
    return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  };

  return (
    <div className="flex items-center gap-1.5 font-mono text-[11px]">
      <span className={`px-1.5 py-0.5 rounded border font-semibold ${getScoreColor(whiteAcc)}`} title={`White accuracy: ${whiteAcc ?? 'N/A'}%`}>
        W: {whiteAcc != null ? `${whiteAcc}%` : '-'}
      </span>
      <span className={`px-1.5 py-0.5 rounded border font-semibold ${getScoreColor(blackAcc)}`} title={`Black accuracy: ${blackAcc ?? 'N/A'}%`}>
        B: {blackAcc != null ? `${blackAcc}%` : '-'}
      </span>
    </div>
  );
}

export default function GameHistoryView({
  onAnalyzeGame,
  onNavigateHome,
  onNavigateAnalysis,
  savedChessComUsername = ''
}) {
  const [games, setGames] = useState([]);
  const [temporaryGames, setTemporaryGames] = useState([]);
  const [stats, setStats] = useState({ total: 0, analyzed: 0, whiteWins: 0, blackWins: 0, draws: 0 });
  const [pagination, setPagination] = useState({ page: 1, limit: 15, total: 0, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [resultFilter, setResultFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Multi-selection
  const [selectedIds, setSelectedIds] = useState(new Set());

  // Modals
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(null); // { type: 'single' | 'bulk', game?: object, count?: number }
  const [isDeleting, setIsDeleting] = useState(false);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSearch(searchTerm.trim());
      setPagination((p) => ({ ...p, page: 1 }));
    }, 350);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const [historyData, statsData, temporaryData] = await Promise.all([
        listGameHistory({
          page: pagination.page,
          limit: pagination.limit,
          search: activeSearch,
          result: resultFilter,
          source: sourceFilter,
          sort: sortOrder,
          dateFrom,
          dateTo
        }),
        getGameHistoryStats(),
        listTemporaryGames()
      ]);

      setGames(historyData.games || []);
      const savedFingerprints = new Set((historyData.games || []).map((game) => game.fingerprint));
      const uniqueTemporaryGames = temporaryData.filter((game) => !savedFingerprints.has(game.id));
      setTemporaryGames(uniqueTemporaryGames);
      setPagination(historyData.pagination || { page: 1, limit: 15, total: 0, totalPages: 1 });
      setStats({
        ...(statsData || { total: 0, analyzed: 0, whiteWins: 0, blackWins: 0, draws: 0 }),
        total: (statsData?.total || 0) + uniqueTemporaryGames.length,
        whiteWins: (statsData?.whiteWins || 0) + uniqueTemporaryGames.filter((game) => game.game?.result === '1-0').length,
        blackWins: (statsData?.blackWins || 0) + uniqueTemporaryGames.filter((game) => game.game?.result === '0-1').length,
        draws: (statsData?.draws || 0) + uniqueTemporaryGames.filter((game) => game.game?.result === '1/2-1/2').length
      });
      setSelectedIds(new Set());
    } catch (err) {
      setErrorMessage(err.message || 'Failed to load game history.');
    } finally {
      setIsLoading(false);
    }
  }, [pagination.page, pagination.limit, activeSearch, resultFilter, sourceFilter, sortOrder, dateFrom, dateTo]);

  const visibleTemporaryGames = useMemo(() => {
    const search = activeSearch.toLowerCase();
    return temporaryGames
      .filter((item) => {
        const result = item.game?.result;
        const matchesSearch = !search ||
          `${item.game?.white || ''} ${item.game?.black || ''}`.toLowerCase().includes(search);
        const matchesResult = resultFilter === 'all' ||
          (resultFilter === 'white' && result === '1-0') ||
          (resultFilter === 'black' && result === '0-1') ||
          (resultFilter === 'draw' && result === '1/2-1/2');
        const matchesSource = sourceFilter === 'all' || sourceFilter === 'chess.com';
        const date = String(item.game?.date || '').replaceAll('.', '-');
        const matchesFrom = !dateFrom || date >= dateFrom;
        const matchesTo = !dateTo || date <= dateTo;
        return matchesSearch && matchesResult && matchesSource && matchesFrom && matchesTo;
      })
      .sort((left, right) => {
        const order = String(left.game?.date || '').localeCompare(String(right.game?.date || ''));
        return sortOrder === 'oldest' ? order : -order;
      });
  }, [temporaryGames, activeSearch, resultFilter, sourceFilter, dateFrom, dateTo, sortOrder]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages || newPage === pagination.page) return;
    setPagination((p) => ({ ...p, page: newPage }));
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.size === games.length && games.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(games.map((g) => g.id)));
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Delete actions
  const handleConfirmDelete = async () => {
    if (!deleteDialog) return;
    setIsDeleting(true);
    try {
      if (deleteDialog.type === 'single' && deleteDialog.game?.id) {
        await deleteGame(deleteDialog.game.id);
      } else if (deleteDialog.type === 'bulk') {
        const idsArray = Array.from(selectedIds);
        await bulkDeleteGames(idsArray);
      }
      setDeleteDialog(null);
      await loadData();
    } catch (err) {
      setErrorMessage(err.message || 'Failed to delete game(s).');
    } finally {
      setIsDeleting(false);
    }
  };

  const hasActiveFilters = useMemo(() => {
    return Boolean(activeSearch || resultFilter !== 'all' || sourceFilter !== 'all' || dateFrom || dateTo || sortOrder !== 'newest');
  }, [activeSearch, resultFilter, sourceFilter, dateFrom, dateTo, sortOrder]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setActiveSearch('');
    setResultFilter('all');
    setSourceFilter('all');
    setSortOrder('newest');
    setDateFrom('');
    setDateTo('');
    setPagination((p) => ({ ...p, page: 1 }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
            <History size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              Game History
            </h1>
            <p className="text-xs text-slate-400">
              Browse, filter, and dynamically re-analyze your imported chess games.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-stretch sm:self-auto">
          {onNavigateAnalysis && (
            <button
              type="button"
              onClick={onNavigateAnalysis}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-800"
            >
              <Activity size={15} />
              <span>Game Analysis</span>
            </button>
          )}
          <button
            type="button"
            onClick={loadData}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-40"
            title="Refresh game list"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          </button>
          
          <button
            type="button"
            onClick={() => setIsImportModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Upload size={16} />
            <span>Import Games</span>
          </button>
        </div>
      </div>

      {/* Summary Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#0F1424] border border-slate-800/80 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Total Games</span>
            <Layers size={14} className="text-amber-400" />
          </div>
          <div className="text-xl font-black text-white font-mono">
            {stats.total}
          </div>
        </div>

        {visibleTemporaryGames.length > 0 && (
          <section className="overflow-hidden rounded-2xl border border-amber-500/25 bg-[#0F1424] shadow-xl">
            <div className="flex flex-col gap-1 border-b border-slate-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-bold text-white">Recent Chess.com games</h2>
                <p className="mt-1 text-[11px] text-slate-400">
                  {visibleTemporaryGames.length} game{visibleTemporaryGames.length === 1 ? '' : 's'} available for this session only. Logging out removes these imports.
                </p>
              </div>
              <span className="w-fit rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold text-amber-300">
                Temporary
              </span>
            </div>
            <div className="divide-y divide-slate-800/70">
              {visibleTemporaryGames.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-slate-800/30">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-white">
                      {item.game?.white || 'White'} vs {item.game?.black || 'Black'}
                    </p>
                    <p className="mt-1 truncate text-[10px] text-slate-400">
                      {item.game?.date || 'Date unknown'} · {item.game?.result || '*'}
                      {item.game?.opening ? ` · ${item.game.opening}` : ''}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onAnalyzeGame?.(item.id)}
                    className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-500"
                    title="Open in dynamic Stockfish analysis"
                  >
                    <Play size={12} className="fill-current" />
                    Analyze
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="p-3.5 rounded-2xl bg-[#0F1424] border border-slate-800/80 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Analyzed</span>
            <Activity size={14} className="text-sky-400" />
          </div>
          <div className="text-xl font-black text-sky-400 font-mono">
            {stats.analyzed} <span className="text-xs text-slate-500 font-normal">({stats.total > 0 ? Math.round((stats.analyzed / stats.total) * 100) : 0}%)</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0F1424] border border-slate-800/80 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>White Wins</span>
            <Trophy size={14} className="text-emerald-400" />
          </div>
          <div className="text-xl font-black text-emerald-400 font-mono">
            {stats.whiteWins}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0F1424] border border-slate-800/80 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Black Wins</span>
            <Trophy size={14} className="text-purple-400" />
          </div>
          <div className="text-xl font-black text-purple-400 font-mono">
            {stats.blackWins}
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-[#0F1424] border border-slate-800/80 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Draws</span>
            <span className="text-slate-400 font-bold text-xs">½</span>
          </div>
          <div className="text-xl font-black text-slate-300 font-mono">
            {stats.draws}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0F1424] border border-slate-800/80 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          
          {/* Player Search Input */}
          <div className="lg:col-span-4 relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search player name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-8 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs font-sans placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Result Filter */}
          <div className="lg:col-span-2">
            <select
              value={resultFilter}
              onChange={(e) => {
                setResultFilter(e.target.value);
                setPagination((p) => ({ ...p, page: 1 }));
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-amber-500/60 cursor-pointer"
            >
              <option value="all">All Results</option>
              <option value="white">1-0 (White won)</option>
              <option value="black">0-1 (Black won)</option>
              <option value="draw">½-½ (Draw)</option>
            </select>
          </div>

          {/* Source Filter */}
          <div className="lg:col-span-2">
            <select
              value={sourceFilter}
              onChange={(e) => {
                setSourceFilter(e.target.value);
                setPagination((p) => ({ ...p, page: 1 }));
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-amber-500/60 cursor-pointer"
            >
              <option value="all">All Sources</option>
              <option value="upload">Upload</option>
              <option value="paste">Paste</option>
              <option value="chess.com">Chess.com</option>
            </select>
          </div>

          {/* Sort Order */}
          <div className="lg:col-span-2">
            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setPagination((p) => ({ ...p, page: 1 }));
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-amber-500/60 cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          {/* Date Range Inputs */}
          <div className="lg:col-span-2 flex items-center gap-1.5">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
                setPagination((p) => ({ ...p, page: 1 }));
              }}
              className="w-1/2 px-2 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-300 text-[11px] focus:outline-none focus:border-amber-500/60"
              title="Date From"
            />
            <span className="text-slate-500 text-xs">–</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value);
                setPagination((p) => ({ ...p, page: 1 }));
              }}
              className="w-1/2 px-2 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-300 text-[11px] focus:outline-none focus:border-amber-500/60"
              title="Date To"
            />
          </div>

        </div>

        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-xs">
            <span className="text-slate-400">
              Filtered results: <strong className="text-white">{pagination.total}</strong> games
            </span>
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <X size={13} /> Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Bulk Action Bar (Visible when >= 1 item selected) */}
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs animate-fade-in">
          <div className="flex items-center gap-2 font-semibold">
            <CheckSquare size={16} className="text-amber-400" />
            <span>{selectedIds.size} {selectedIds.size === 1 ? 'game' : 'games'} selected</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedIds(new Set())}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs transition-colors"
            >
              Deselect All
            </button>
            <button
              type="button"
              onClick={() => setDeleteDialog({ type: 'bulk', count: selectedIds.size })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors shadow"
            >
              <Trash2 size={13} />
              <span>Delete Selected</span>
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Games Table */}
      <div className="rounded-2xl bg-[#0F1424] border border-slate-800/80 overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-3 text-slate-400">
            <RefreshCw size={24} className="animate-spin text-amber-500" />
            <p className="text-xs font-mono">Loading games from history...</p>
          </div>
        ) : games.length === 0 ? (
          <div className="py-20 px-6 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-400">
              <History size={28} />
            </div>
            {hasActiveFilters ? (
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white">No games match your filters</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Try adjusting your search query, result filter, or date range to see more games.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            ) : visibleTemporaryGames.length ? (
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white">No saved games match this view</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Your recent Chess.com imports are shown above and are temporary for this session. Upload or paste PGN to add games to your saved history.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">Your game history is empty</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Import games from your Chess.com account, upload a multi-game PGN file, or paste PGN text to start reviewing and analyzing your play.
                </p>
                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20"
                >
                  <Upload size={15} />
                  <span>Import Your First Game</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
            {games.map((item) => {
              const isSelected = selectedIds.has(item.id);
              const whiteName = item.game?.white || 'Unknown';
              const blackName = item.game?.black || 'Unknown';
              const opening = item.game?.opening;
              const eco = item.game?.eco;
              const date = item.game?.date || item.createdAt?.slice(0, 10);

              return (
                <article
                  key={item.id}
                  className={`rounded-2xl border p-4 transition-colors ${
                    isSelected
                      ? 'border-amber-500/50 bg-amber-500/5'
                      : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => handleToggleSelect(item.id)}
                      aria-label={isSelected ? 'Deselect game' : 'Select game'}
                      className="mt-0.5 shrink-0 text-slate-500 transition-colors hover:text-slate-200"
                    >
                      {isSelected ? (
                        <CheckSquare size={16} className="text-amber-400" />
                      ) : (
                        <Square size={16} />
                      )}
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 space-y-1">
                          <p className="truncate text-sm font-bold text-white">{whiteName}</p>
                          <p className="truncate text-sm font-semibold text-slate-300">{blackName}</p>
                        </div>
                        <ResultBadge result={item.game?.result} />
                      </div>

                      {opening && (
                        <p className="mt-3 truncate text-xs text-slate-300" title={opening}>
                          {eco && <span className="mr-1.5 font-mono font-bold text-amber-400">{eco}</span>}
                          {opening}
                        </p>
                      )}

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <SourceBadge source={item.source} />
                        {date && <span className="text-[10px] font-mono text-slate-500">{date}</span>}
                        <AccuracyBadge accuracy={item.accuracy} />
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-800 pt-3">
                        <span className="truncate text-[10px] text-slate-500">
                          {item.game?.whiteElo || item.game?.blackElo
                            ? `${item.game?.whiteElo || '?'} vs ${item.game?.blackElo || '?'} Elo`
                            : 'Game record'}
                        </span>
                        <div className="flex shrink-0 items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onAnalyzeGame?.(item.id)}
                            className="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-blue-500"
                            title="Open in dynamic Stockfish analysis"
                          >
                            <Play size={12} className="fill-current" />
                            Analyze
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteDialog({ type: 'single', game: item })}
                            aria-label="Delete game from history"
                            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-800 hover:text-rose-400"
                            title="Delete game from history"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination Bar */}
        {pagination.totalPages > 1 && (
          <div className="p-4 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">
              Showing <strong className="text-white">{(pagination.page - 1) * pagination.limit + 1}</strong> to{' '}
              <strong className="text-white">
                {Math.min(pagination.page * pagination.limit, pagination.total)}
              </strong>{' '}
              of <strong className="text-white">{pagination.total}</strong> games
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Previous page"
              >
                <ChevronLeft size={16} />
              </button>

              <span className="font-mono text-slate-300 px-2 font-semibold">
                Page {pagination.page} of {pagination.totalPages}
              </span>

              <button
                type="button"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Import Games Modal */}
      <ImportGamesModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        savedChessComUsername={savedChessComUsername}
        onNavigateAnalysis={onNavigateAnalysis}
        onImportSuccess={() => {
          loadData();
        }}
      />

      {/* Delete Confirmation Modal */}
      {deleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#0F1424] border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {deleteDialog.type === 'bulk' ? 'Delete Selected Games' : 'Delete Game'}
                </h3>
                <p className="text-xs text-slate-400">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {deleteDialog.type === 'bulk' ? (
                <>Are you sure you want to permanently remove <strong>{deleteDialog.count}</strong> selected games from your history?</>
              ) : (
                <>
                  Are you sure you want to delete the game between{' '}
                  <strong>{deleteDialog.game?.game?.white || 'White'}</strong> and{' '}
                  <strong>{deleteDialog.game?.game?.black || 'Black'}</strong>?
                </>
              )}
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteDialog(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
              >
                {isDeleting ? <RefreshCw size={14} className="animate-spin" /> : <Trash2 size={14} />}
                <span>{isDeleting ? 'Deleting...' : 'Delete Permanently'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
