import React from 'react';
import { Upload } from 'lucide-react';

export default function PgnUploadPanel({
  fileInputRef,
  onFileUpload
}) {
  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className="border-2 border-dashed border-brand-border hover:border-amber-500/60 rounded-3xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-brand-surface/40 hover:bg-brand-surface group"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pgn,text/plain"
        onChange={onFileUpload}
        className="hidden"
      />
      <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
        <Upload size={24} />
      </div>
      <p className="text-sm font-bold text-white mb-1.5">
        Click to select or drag and drop a .pgn file
      </p>
      <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
        Supports any single or multi-game PGN export from Chess.com, Lichess, or ChessBase
      </p>
    </div>
  );
}
