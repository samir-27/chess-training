import React from 'react';
import {
  Globe,
  User,
  Search,
  Loader2,
  Play,
  Link as LinkIcon
} from 'lucide-react';

export default function ChessComImportPanel({
  chessComSubMode,
  setChessComSubMode,
  usernameInput,
  setUsernameInput,
  archives,
  selectedArchive,
  onArchiveChange,
  isFetchingGames,
  onFetchGames,
  filterFormat,
  setFilterFormat,
  opponentSearch,
  setOpponentSearch,
  games,
  filteredGames,
  onSelectGame,
  onLoadMore,
  gameUrlInput,
  setGameUrlInput,
  onLoadByUrl
}) {
  return (
    <div className="space-y-4">
      {/* Sub-mode selector */}
      <div className="flex items-center justify-between border-b border-brand-border pb-3">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-brand-border">
          <button
            type="button"
            onClick={() => setChessComSubMode('user')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              chessComSubMode === 'user'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Browse by Username
          </button>
          <button
            type="button"
            onClick={() => setChessComSubMode('url')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              chessComSubMode === 'url'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Paste Game Link / ID
          </button>
        </div>
        <span className="text-xs font-mono text-slate-500 hidden sm:inline">
          No database pollution
        </span>
      </div>

      {/* Sub-mode A: Search Username with Archive Selector */}
      {chessComSubMode === 'user' && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onFetchGames(usernameInput, 20, selectedArchive);
            }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
          >
            {/* Username input */}
            <div className="relative flex-1">
              <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Chess.com username (e.g. supreme_assassin)..."
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-brand-surface border border-brand-border text-white text-xs font-sans placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* Month / Archive dropdown */}
            {archives.length > 0 && (
              <div className="sm:w-44">
                <select
                  value={selectedArchive}
                  onChange={(e) => onArchiveChange(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-brand-surface border border-brand-border text-white text-xs focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="">All Recent Games</option>
                  {archives.slice(0, 12).map((a) => (
                    <option key={a.url} value={a.url}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={isFetchingGames || !usernameInput.trim()}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-[0.98] disabled:opacity-40 transition-all shrink-0 cursor-pointer"
            >
              {isFetchingGames ? <Loader2 size={14} className="animate-spin" /> : <Globe size={14} />}
              <span>{isFetchingGames ? 'Fetching...' : 'Fetch Games'}</span>
            </button>
          </form>

          {/* Filter & Opponent Search Bar */}
          {games.length > 0 && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none">
                {['all', 'blitz', 'rapid', 'bullet', 'daily'].map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setFilterFormat(fmt)}
                    className={`px-3 py-1.5 rounded-lg capitalize transition-all font-medium cursor-pointer ${
                      filterFormat === fmt
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                        : 'bg-brand-surface text-slate-400 hover:text-white border border-brand-border hover:border-slate-700'
                    }`}
                  >
                    {fmt === 'all' ? 'All' : fmt}
                  </button>
                ))}
              </div>

              <div className="relative sm:w-52">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter opponent..."
                  value={opponentSearch}
                  onChange={(e) => setOpponentSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-white text-xs focus:outline-none focus:border-amber-500 placeholder-slate-500"
                />
              </div>
            </div>
          )}

          {/* Games List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-400 font-bold px-1">
              <span>
                {games.length > 0
                  ? `Showing ${filteredGames.length} of ${games.length} games for ${usernameInput}`
                  : `Games for ${usernameInput}`}
              </span>
            </div>

            {isFetchingGames ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-2.5 text-slate-400 glass-card rounded-2xl border border-brand-border">
                <Loader2 size={24} className="animate-spin text-amber-400" />
                <p className="text-xs font-mono">Fetching games from Chess.com archives...</p>
              </div>
            ) : filteredGames.length === 0 ? (
              <div className="py-10 text-center text-xs text-slate-400 glass-card rounded-2xl border border-brand-border">
                {games.length === 0
                  ? 'Enter a Chess.com username and click "Fetch Games" to select any game.'
                  : 'No games match your opponent / format filter.'}
              </div>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
                {filteredGames.map((game, idx) => {
                  const isWin = game.userResult === 'win';
                  const isLoss = game.userResult === 'loss';

                  return (
                    <div
                      key={game.id || idx}
                      onClick={() => onSelectGame(game.pgn)}
                      className="glass-card flex items-center justify-between gap-3 p-3 rounded-2xl border border-brand-border hover:border-amber-500/50 hover:bg-slate-850 cursor-pointer transition-all duration-200 group shadow-sm active:scale-[0.99]"
                      title="Click to analyze this game"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Color & Result Badge */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`w-3.5 h-3.5 rounded-full border ${
                              game.userColor === 'white'
                                ? 'bg-white border-slate-300'
                                : 'bg-slate-950 border-slate-700'
                            }`}
                            title={`Played as ${game.userColor}`}
                          />
                          <span
                            className={`px-2 py-0.5 rounded-md text-xs font-bold font-mono tracking-wide ${
                              isWin
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : isLoss
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                : 'bg-slate-800 text-slate-300 border border-slate-700'
                            }`}
                          >
                            {isWin ? 'WIN' : isLoss ? 'LOSS' : 'DRAW'}
                          </span>
                        </div>

                        {/* Opponent & Meta */}
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                            vs {game.opponent?.username || 'Opponent'}
                            {game.opponent?.rating && (
                              <span className="text-xs font-mono text-slate-400 ml-1.5 font-normal">
                                ({game.opponent.rating})
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-0.5">
                            <span className="capitalize">{game.timeClass || game.timeControl}</span>
                            {game.date && <span>• {game.date}</span>}
                          </div>
                        </div>
                      </div>

                      {/* Analyze Action */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectGame(game.pgn);
                        }}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 shadow shadow-amber-500/20 transition-all group-hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <Play size={11} className="fill-current" />
                        <span>Analyze</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Load More Button */}
            {!selectedArchive && games.length >= 20 && !isFetchingGames && (
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={onLoadMore}
                  className="px-5 py-2 rounded-xl bg-brand-surface hover:bg-slate-800 border border-brand-border hover:border-slate-700 text-amber-400 hover:text-amber-300 text-xs font-semibold active:scale-[0.98] transition-all cursor-pointer"
                >
                  Load More Games (+20)
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Sub-mode B: Direct Chess.com Game Link / ID Input */}
      {chessComSubMode === 'url' && (
        <form onSubmit={onLoadByUrl} className="space-y-3.5 pt-2">
          <div className="relative">
            <LinkIcon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Paste Chess.com game link or ID (e.g. chess.com/game/live/185961891956)..."
              value={gameUrlInput}
              onChange={(e) => setGameUrlInput(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-brand-surface border border-brand-border text-white text-xs font-sans placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-slate-400">
              Works with any public live chess game link
            </span>

            <button
              type="submit"
              disabled={isFetchingGames || !gameUrlInput.trim()}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-[0.98] disabled:opacity-40 transition-all cursor-pointer"
            >
              {isFetchingGames ? <Loader2 size={14} className="animate-spin" /> : <Play size={12} className="fill-current" />}
              <span>Load & Analyze Game</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
