import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  Award, 
  Zap, 
  Sliders, 
  Book, 
  Search, 
  Bell, 
  ChevronRight, 
  Trophy, 
  Target, 
  Flame,
  LayoutDashboard,
  User,
  Settings,
  HelpCircle
} from 'lucide-react';

export default function Dashboard() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Tactical Rating', value: '2,412', change: '+34 this week', icon: Trophy },
    { label: 'Daily Streak', value: '18 Days', change: 'Personal best: 42', icon: Flame },
    { label: 'Puzzles Solved', value: '1,840', change: '89% accuracy', icon: Target },
  ];

  const modules = [
    {
      id: 'openings',
      title: 'Mastering Openings',
      subtitle: 'Repertoire Building & Novelties',
      description: 'Deep dive into theoretical lines, custom move-trees, and engine-backed novelties for Black and White.',
      progress: 74,
      stat: '14/32 Lines Complete',
      tag: 'Theory',
      icon: BookOpen,
      color: 'from-amber-500/20 to-orange-500/20',
      borderColor: 'group-hover:border-amber-500/50',
    },
    {
      id: 'middlegame',
      title: 'Middlegame Courses',
      subtitle: 'Strategy & Pawn Structures',
      description: 'Understand typical pawn majorities, piece maneuvers, and plans based on structural imbalances.',
      progress: 45,
      stat: '8/18 Modules',
      tag: 'Strategy',
      icon: Layers,
      color: 'from-blue-500/20 to-indigo-500/20',
      borderColor: 'group-hover:border-blue-500/50',
    },
    {
      id: 'endgame',
      title: 'Endgame Manuals',
      subtitle: 'Theoretical & Practical Endings',
      description: 'Flawless execution of essential theoretical endgames alongside practical masterclasses on conversion.',
      progress: 90,
      stat: '27/30 Theoretical Positions',
      tag: 'Technique',
      icon: Award,
      color: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'group-hover:border-emerald-500/50',
    },
    {
      id: 'woodpecker',
      title: 'The Woodpecker Method',
      subtitle: 'De la Maza Tactical Regimen',
      description: 'Train your subconscious pattern recognition. Solve a large set of puzzles repeatedly, faster each cycle.',
      progress: 60,
      stat: 'Cycle 2 • 642/1000 Solved',
      tag: 'Regimen',
      icon: Zap,
      color: 'from-rose-500/20 to-pink-500/20',
      borderColor: 'group-hover:border-rose-500/50',
    },
    {
      id: 'puzzles',
      title: 'Advanced Puzzles',
      subtitle: 'Calculation & Visualization',
      description: 'Curated high-difficulty tactical configurations. Step out of your comfort zone and sharpen depth.',
      progress: 33,
      stat: 'Elite Tier • 120 XP to Next Rank',
      tag: 'Tactics',
      icon: Sliders,
      color: 'from-purple-500/20 to-fuchsia-500/20',
      borderColor: 'group-hover:border-purple-500/50',
    },
    {
      id: 'books',
      title: 'Interactive Library',
      subtitle: 'Literature & Engine Integration',
      description: 'Read legendary modern texts linked directly with an active, click-to-play responsive analysis board.',
      progress: 15,
      stat: '2 Books Active',
      tag: 'Literature',
      icon: Book,
      color: 'from-cyan-500/20 to-sky-500/20',
      borderColor: 'group-hover:border-cyan-500/50',
    },
  ];

  const filteredModules = modules.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#0F1424] border-r border-slate-800/60 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 px-2 mb-10">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/10">
              <span className="text-black font-black text-lg">♔</span>
            </div>
            <div>
              <span className="font-bold tracking-tight text-white block text-sm">GRANDMASTER</span>
              <span className="text-xs text-amber-500/90 font-mono tracking-widest uppercase -mt-1 block">OS v2.6</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500/10 text-amber-400 font-medium text-sm transition-all border border-amber-500/20">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 font-medium text-sm transition-all group">
              <User size={18} className="text-slate-500 group-hover:text-slate-300" />
              <span>My Repertoire</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 font-medium text-sm transition-all group">
              <Settings size={18} className="text-slate-500 group-hover:text-slate-300" />
              <span>Preferences</span>
            </button>
          </nav>
        </div>

        {/* User Session Mini Card */}
        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-300 text-sm">
            IM
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Ilya_Makarov</div>
            <div className="text-[10px] text-slate-500 font-mono">FIDE ID: 4129511</div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="flex-1 overflow-y-auto px-4 md:px-10 py-8">
        
        {/* HEADER */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">Academy Terminal</h1>
            <p className="text-xs md:text-sm text-slate-400">Curated masterclasses and algorithmic training environments.</p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search modules..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 bg-[#0F1424] border border-slate-800 text-slate-200 text-xs rounded-xl focus:outline-none focus:border-slate-700 placeholder-slate-500 transition-all"
              />
            </div>
            <button className="p-2.5 bg-[#0F1424] border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all relative">
              <Bell size={16} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* METRICS TOP-BAR */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-gradient-to-b from-[#111728] to-[#0F1424] border border-slate-800/60 p-5 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-white">
                  <Icon size={72} />
                </div>
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-white tracking-tight mb-1">{stat.value}</div>
                <div className="text-xs text-amber-500/90 font-mono">{stat.change}</div>
              </div>
            );
          })}
        </section>

        {/* CHESS TRAINING GRID TITLE */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase">Training Protocols</h2>
          <span className="text-xs text-slate-500 font-mono">{filteredModules.length} Modules Available</span>
        </div>

        {/* THE MODULES GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredModules.map((item) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={item.id}
                onClick={() => setSelectedCard(item)}
                className={`group bg-[#111728] border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden shadow-2xl hover:shadow-amber-500/[0.02] hover:-translate-y-0.5 ${item.borderColor}`}
              >
                {/* Subtle Ambient Background Flare */}
                <div className={`absolute -right-20 -top-20 w-40 h-40 rounded-full bg-gradient-to-br ${item.color} blur-3xl opacity-40 group-hover:opacity-70 transition-opacity pointer-events-none`} />

                <div>
                  {/* Top Line inside Card */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 group-hover:border-slate-700/60 text-slate-300 group-hover:text-amber-400 transition-colors">
                      <IconComponent size={20} />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest uppercase bg-slate-900 border border-slate-800/80 text-slate-400 px-2.5 py-1 rounded-md">
                      {item.tag}
                    </span>
                  </div>

                  {/* Descriptions */}
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors tracking-tight">{item.title}</h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5 mb-3">{item.subtitle}</p>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6 line-clamp-2">{item.description}</p>
                </div>

                {/* Progress Stack */}
                <div className="space-y-2 pt-4 border-t border-slate-800/60">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">{item.stat}</span>
                    <span className="text-white font-bold">{item.progress}%</span>
                  </div>
                  {/* Flat Luxury Ultra-Thin Progress Bar */}
                  <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

      </main>
    </div>
  );
}