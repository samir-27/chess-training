import React from 'react';
import { Upload } from 'lucide-react';

export default function PgnUploadPanel({
  fileInputRef,
  onFileUpload
}) {
  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className="border-2 border-dashed border-slate-700/80 hover:border-blue-500/60 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-900/30 hover:bg-slate-900/60 group"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pgn,text/plain"
        onChange={onFileUpload}
        className="hidden"
      />
      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
        <Upload size={22} />
      </div>
      <p className="text-xs font-bold text-white mb-1">
        Click to select or drag and drop a .pgn file
      </p>
      <p className="text-[11px] text-slate-500">
        Supports any single or multi-game PGN export (Chess.com, Lichess, ChessBase)
      </p>
    </div>
  );
}
