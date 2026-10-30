import React, { useState } from 'react';
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  FolderOpen,
  ArrowRight,
  Terminal,
  Layers,
  Sparkles
} from 'lucide-react';
import { importPgnToCourse } from '../../services/pgnImporter.js';
import { storage } from '../../services/storageService.js';

export default function ImportView({ onImportComplete }) {
  const [dragOver, setDragOver] = useState(false);
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [courseAuthor, setCourseAuthor] = useState('');
  const [groupBy, setGroupBy] = useState('auto');
  const [defaultType, setDefaultType] = useState('auto');
  const [previewResult, setPreviewResult] = useState(null);
  const [importStatus, setImportStatus] = useState(null); // 'previewing' | 'imported' | 'error'

  const handleFile = (file) => {
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setFileContent(text);
      runPreview(text, file.name);
    };
    reader.readAsText(file);
  };

  const runPreview = (text, defaultName = '') => {
    const title = courseTitle.trim() || defaultName.replace(/\.pgn$/i, '') || 'Imported Course';
    const result = importPgnToCourse(text, {
      courseTitle: title,
      courseAuthor: courseAuthor.trim() || undefined,
      chapterGroupBy: groupBy,
      defaultType
    });

    setPreviewResult(result);
    setImportStatus('previewing');
    if (result.course?.title && !courseTitle) {
      setCourseTitle(result.course.title);
    }
    if (result.course?.author && !courseAuthor) {
      setCourseAuthor(result.course.author);
    }
  };

  const handleConfirmImport = () => {
    if (!previewResult?.course) return;
    const courseToSave = {
      ...previewResult.course,
      title: courseTitle.trim() || previewResult.course.title,
      author: courseAuthor.trim() || previewResult.course.author
    };

    storage.saveCourse(courseToSave);
    setImportStatus('imported');

    if (onImportComplete) {
      setTimeout(() => {
        onImportComplete(courseToSave);
      }, 1000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1 rounded bg-amber-500/10 text-amber-400">
            <Upload size={16} />
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
            Universal Ingestion Pipeline
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          Import Chess Courses
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Convert tournament PGNs, opening repertoires, and tactical masterclasses into unified interactive training courses.
        </p>
      </div>

      {/* Main Ingestion Box */}
      {importStatus === 'imported' ? (
        <div className="bg-[#111728] border-2 border-emerald-500/40 rounded-3xl p-8 text-center space-y-4 animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="text-xl font-bold text-white">Course Successfully Imported!</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            "{previewResult?.course?.title}" is now available in your Course Library with {previewResult?.report?.importedLessons} interactive exercises.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setImportStatus(null);
                setPreviewResult(null);
                setFileContent('');
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold mr-3"
            >
              Import Another Course
            </button>
            <button
              onClick={() => onImportComplete && onImportComplete(previewResult?.course)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110"
            >
              Open Course
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Dropzone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
            }}
            className={`border-2 border-dashed rounded-3xl p-8 lg:p-12 text-center transition-all cursor-pointer ${
              dragOver
                ? 'border-amber-400 bg-amber-500/5'
                : 'border-slate-800 bg-[#111728]/70 hover:border-slate-700'
            }`}
            onClick={() => document.getElementById('pgnFileInput').click()}
          >
            <input
              id="pgnFileInput"
              type="file"
              accept=".pgn,.txt"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />

            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 text-amber-400 flex items-center justify-center mx-auto mb-4">
              <Upload size={24} />
            </div>

            <h3 className="text-base font-bold text-white mb-1">
              Drag & Drop PGN file here, or click to browse
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Supports tactical puzzle collections, MoveTrainer™ exports, opening books, and annotated master games.
            </p>

            {fileName && (
              <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-amber-300 font-mono">
                <FileText size={14} />
                <span>{fileName}</span>
              </div>
            )}
          </div>

          {/* Import Configuration Settings */}
          <div className="bg-[#111728] border border-slate-800/80 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Course Title
              </label>
              <input
                type="text"
                placeholder="Course Title"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Course Author
              </label>
              <input
                type="text"
                placeholder="Grandmaster Author"
                value={courseAuthor}
                onChange={(e) => setCourseAuthor(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Chapter Grouping Strategy
              </label>
              <select
                value={groupBy}
                onChange={(e) => {
                  setGroupBy(e.target.value);
                  if (fileContent) runPreview(fileContent, fileName);
                }}
                className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="auto">Auto-Detect (Smart)</option>
                <option value="white">By White tag (Chessable Chapters)</option>
                <option value="event">By Event tag</option>
                <option value="single">Single Chapter</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Default Lesson Type
              </label>
              <select
                value={defaultType}
                onChange={(e) => {
                  setDefaultType(e.target.value);
                  if (fileContent) runPreview(fileContent, fileName);
                }}
                className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="auto">Auto-Classify (Puzzles / Repertoire / Games)</option>
                <option value="puzzle">Enforce Tactical Puzzle</option>
                <option value="repertoire">Opening Repertoire</option>
                <option value="game">Annotated Game</option>
              </select>
            </div>
          </div>

          {/* Parsed Preview Report */}
          {previewResult && (
            <div className="bg-[#111728] border border-slate-800/80 rounded-2xl p-6 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white">Ingestion Pre-Validation Report</h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Verified against standard chess rules using chess.js engine.
                  </div>
                </div>

                <button
                  onClick={handleConfirmImport}
                  disabled={!previewResult.success}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 disabled:opacity-40"
                >
                  <span>Confirm & Import</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-500 text-[10px]">Total Games</div>
                  <div className="text-white font-bold">{previewResult.report.totalPgnGames}</div>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-500 text-[10px]">Valid Lessons</div>
                  <div className="text-emerald-400 font-bold">{previewResult.report.importedLessons}</div>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-500 text-[10px]">Chapters Formed</div>
                  <div className="text-amber-400 font-bold">{previewResult.report.chapterCount}</div>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-500 text-[10px]">Skipped / Notes</div>
                  <div className="text-slate-400 font-bold">{previewResult.report.skippedGames}</div>
                </div>
              </div>

              {/* Warnings if any */}
              {previewResult.report.warnings?.length > 0 && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200">
                  <div className="font-bold mb-1 flex items-center gap-1.5 text-amber-400">
                    <AlertTriangle size={14} />
                    <span>Warnings ({previewResult.report.warnings.length}):</span>
                  </div>
                  <div className="max-h-24 overflow-y-auto space-y-1 font-mono text-[11px]">
                    {previewResult.report.warnings.slice(0, 4).map((w, i) => (
                      <div key={i}>• {w}</div>
                    ))}
                    {previewResult.report.warnings.length > 4 && (
                      <div className="text-slate-500">... and {previewResult.report.warnings.length - 4} more.</div>
                    )}
                  </div>
                </div>
              )}

              {/* Preview Lessons Sample */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Sample Detected Lessons
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {previewResult.course?.chapters?.[0]?.lessons?.slice(0, 4).map((les, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 truncate">
                      <div className="font-bold text-white truncate">{les.title}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">
                        {les.solution.join(' ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* Developer CLI Guide */}
      <div className="bg-[#111728] border border-slate-800/80 rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="text-amber-400" />
          <h3 className="text-sm font-bold text-white">Developer CLI Batch Import</h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          For large PGN folders or automated build pipelines, you can run the command-line importer directly in your terminal:
        </p>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-amber-300">
          npm run import:pgn -- ./path-to-courses/ --out ./src/data/courses
        </div>
      </div>

    </div>
  );
}
