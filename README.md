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

6. **Deterministic Game Review**:
   - Game reviews use the bundled local Stockfish UCI worker at depth 16, one thread, and 16 MB hash. Full-game reports use one principal variation per position; the interactive board searches up to three MultiPV lines.
   - The search settings are centralized in `src/services/stockfishEngine.js`; the single-thread fixed-depth budget favors reproducibility and responsiveness over peak playing strength. MultiPV is clamped to the engine's advertised limits.
   - FEN scores and mate scores are normalized to White's perspective. The reported centipawn loss, move classification, and accuracy score are separate values.
   - Accuracy is an app-defined heuristic based on the loss in estimated win probability; it is not a claim of Chess.com parity.
   - Lichess Cloud Evaluation is optional and separate. Its cached response is never used to replace local Stockfish review scores.

7. **Interactive Game Analysis**:
   - Exactly one interactive board for the imported game and its explored variations.
   - Includes move navigation, undo/redo, promotion choice, board orientation, FEN copy, legal-move highlights, and optional best-move arrows.
   - Runs the bundled Stockfish worker against the exact explored FEN, with configurable depth, evaluation, and up to three clickable principal variations.
   - A synchronized evaluation line chart navigates original positions and explored variations; mate or missing evaluations are shown as gaps.
   - Saved PGN reports and resume positions are available at stable `/analysis/:id` URLs, with browser back/forward support.
   - Filtered, automatic Gemini commentary explains critical played moves from engine evidence; verified engine-only notes remain available when Gemini is not configured.

## Analysis API and automatic Gemini commentary

Copy `.env.example` to `.env` and configure `MONGODB_URI` (pre-configured to `mongodb://127.0.0.1:27017/chess-training`). Set `GEMINI_API_KEY` and `GEMINI_MODEL` to enable automatic move commentary. These values are read only by the Express server and must never use a `VITE_` prefix. Do not commit `.env`.

Start the app in development with a single command (which runs both the backend Express server and the Vite frontend concurrently):

```bash
npm run dev
```

Or run them individually:
```bash
npm run server   # starts Express API on http://127.0.0.1:3001
npm run client   # starts Vite frontend on http://localhost:5173
```

Vite proxies `/api` requests to the local Express server. For production, build the frontend with `npm run build`, then run `npm start`; Express serves `dist` and falls back to the SPA entry point for app routes. `HOST` defaults to loopback. Set `CORS_ORIGIN` only when the frontend is hosted on a separate origin.

Analysis data is associated with a random anonymous bearer token stored in the browser. The server stores only a hash of the token and filters database access by its session. When MongoDB is unavailable, reports and resume state fall back to `localStorage` on that device; this is not cross-device backup. Clearing site storage also loses access to any remotely stored anonymous data because the bearer token cannot be recovered.
## Stockfish deployment assets

Vite serves files in `public/` at the site base path, so keep `stockfish.js`, `stockfish.wasm`, and `stockfish.wasm.js` together in `public/` when deploying. The application resolves the worker using Vite's `BASE_URL`; configure that value to the deployed site prefix if the app is hosted below the domain root. The worker and WASM files must be served from the same origin with their original filenames.

---

## 🛠️ CLI Commands

```bash
# Start Vite development server
npm run dev

# Start the Express API (in a separate terminal)
npm run server

# Start the production server after `npm run build`
npm start

# Run unit tests
npm test

# Build for production
npm run build

# Convert any PGN file or folder of PGNs to Course JSON
npm run import:pgn -- ./path/to/course.pgn --title "My Opening Repertoire"

# Run Woodpecker Method data migration & validation check
npm run migrate:woodpecker
```

The browser review reports the selected engine version, search depth, thread count, and hash size. In environments without Web Workers (including the Node test runner), the review uses the deterministic depth-2 local minimax fallback; those evaluations are intentionally identified as fallback results and are not comparable to Stockfish strength.

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
