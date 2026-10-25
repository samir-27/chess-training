# Grandmaster OS — Interactive Chess Training Platform

A complete, interactive chess training platform built with React, Vite, Tailwind CSS, `chess.js`, and `react-chessboard`. It features the authentic **Woodpecker Method** training cycle regimen, a **Universal PGN-to-JSON Ingestion Pipeline**, a **GitHub-style 365-day Daily Activity Heatmap**, and a rich **Training Workspace**.

---

## 🚀 Key Features

1. **Universal PGN Course Ingestion Pipeline & CLI**:
   - Resilient parser supporting tournament games, Chessable MoveTrainer™ PGNs, opening repertoires, and multi-line studies.
   - Converts SAN into validated legal UCI move sequences using `chess.js`.
   - In-app drag-and-drop course importer with live pre-validation reports.
   - Command-line batch converter: `npm run import:pgn`.

2. **Dedicated Woodpecker Training-Cycle Engine**:
   - Full implementation of Axel Smith & Hans Tikkanen's Woodpecker Method.
   - Configurable cycle repetitions (Cycle 1, Cycle 2, ...).
   - Speed-halving calculations and historical cycle comparisons.
   - Ahead/behind schedule pace indicator.

3. **Interactive Chess Training Workspace**:
   - Interactive chessboard with drag-and-drop and touch/click controls.
   - Real-time opponent auto-reply on correct puzzle moves.
   - Step-by-step solution reveal & square-highlighted hints.
   - 5 board themes (Classic Wood, Midnight Cobalt, Tournament Emerald, Graphite Slate, Amber Coral).
   - Synthesized Web Audio API sound effects (move, capture, check, victory, soft bump) — 100% offline.
   - Full keyboard navigation (`[Space]` for hint, `[R]` for retry, `[F]` for flip, `[← / →]` for navigation).

4. **GitHub-Style 365-Day Daily Activity Heatmap**:
   - Real-time 52-week calendar grid derived from actual recorded puzzle attempts.
   - Weekday and month labels with 5 activity intensity tiers.
   - Interactive date inspector showing solved count, accuracy %, and time spent.
   - Streak tracker (current and longest consecutive days) and best training day record.

5. **Robust Progress & Persistence Architecture**:
   - Versioned local persistence with auto-migration (`SCHEMA_VERSION = 1`).
   - One-click JSON backup export and restore in Settings.
   - Automatic pre-seeding of the 1,131 Woodpecker Master puzzles.

---

## 🛠️ CLI Commands

```bash
# Start Vite development server
npm run dev

# Run unit tests
npm test

# Build for production
npm run build

# Convert any PGN file or folder of PGNs to Course JSON
npm run import:pgn -- ./path/to/course.pgn --title "My Opening Repertoire"

# Run Woodpecker Method data migration & validation check
npm run migrate:woodpecker
```

---

## 📋 Course JSON Schema (Version 1)

```json
{
  "schemaVersion": 1,
  "id": "course-woodpecker-method",
  "title": "The Woodpecker Method",
  "description": "Tactical training regimen by Axel Smith & Hans Tikkanen.",
  "author": "Hans Tikkanen & Axel Smith",
  "category": "Woodpecker Method",
  "difficulty": "All Levels",
  "tags": ["tactics", "woodpecker", "repetition"],
  "stats": {
    "totalChapters": 3,
    "totalLessons": 1131,
    "puzzleCount": 1129,
    "studyCount": 2
  },
  "chapters": [
    {
      "id": "woodpecker-ch-easy",
      "title": "Easy Exercises (1–222)",
      "order": 1,
      "lessons": [
        {
          "id": "1",
          "type": "puzzle",
          "title": "Exercise 1: Carl Hamppe - Wilhelm Steinitz",
          "fen": "r6r/1pp3k1/1b6/p2P1p2/P1N1pn2/2P2P2/2P2PPP/4RR1K b - - 0 1",
          "orientation": "black",
          "solution": ["Rxh2+", "Kxh2", "Rh8+"],
          "solutionUci": ["h8h2", "h1h2", "a8h8"],
          "hint": "Think about sacrificing material on h2 to open up the back-rank h-file.",
          "description": "Black to move. Find the famous forced checkmate sequence!"
        }
      ]
    }
  ]
}
```
