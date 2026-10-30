import { Chess } from 'chess.js';

/**
 * Theoretical Opening Book Service
 * Maps normalized chess position FENs to ECO codes, opening names, and main theoretical moves.
 * Covers all fundamental chess opening repertoires (A00 - E99).
 */

// Normalized FEN key (piece placement, turn, castling rights, en passant target)
export function getOpeningFenKey(fen) {
  if (!fen) return '';
  const parts = fen.trim().split(/\s+/);
  return `${parts[0]} ${parts[1]} ${parts[2]} ${parts[3] || '-'}`;
}

// Master Theoretical Book Positions Database
const OPENING_BOOK = new Map();

function registerBook(fen, eco, name, bookMoves = []) {
  const key = getOpeningFenKey(fen);
  OPENING_BOOK.set(key, { eco, name, bookMoves });
}

// 1. Initial Starting Position
registerBook(
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -',
  'A00',
  'Starting Position',
  ['e4', 'd4', 'c4', 'Nf3', 'g3', 'b3', 'f4', 'Nc3']
);

// 2. King's Pawn (1. e4)
registerBook(
  'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq -',
  'B00',
  "King's Pawn Opening",
  ['e5', 'c5', 'e6', 'c6', 'd5', 'd6', 'g6', 'Nf6']
);

// 1... e5 Open Game
registerBook(
  'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq -',
  'C20',
  "Open Game",
  ['Nf3', 'Nc3', 'Bc4', 'f4', 'd4', 'c3']
);
// 2. Nf3
registerBook(
  'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq -',
  'C40',
  "King's Knight Opening",
  ['Nc6', 'Nf6', 'd6']
);
// 2... Nc6
registerBook(
  'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq -',
  'C44',
  "King's Knight: Normal Variation",
  ['Bb5', 'Bc4', 'd4', 'Nc3', 'c3']
);
// Ruy Lopez (3. Bb5)
registerBook(
  'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq -',
  'C60',
  'Ruy Lopez (Spanish Opening)',
  ['a6', 'Nf6', 'd6', 'f5', 'Bc5', 'Nd4', 'g6']
);
// Ruy Lopez: Morphy Defense (3... a6)
registerBook(
  'r1bqkbnr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq -',
  'C68',
  'Ruy Lopez: Morphy Defense',
  ['Ba4', 'Bxc6']
);
// 4. Ba4 Nf6
registerBook(
  'r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R w KQkq -',
  'C78',
  'Ruy Lopez: Closed / Open preparations',
  ['O-O', 'd3', 'Qe2', 'Nc3']
);
// 5. O-O Be7
registerBook(
  'r1bqk2r/1pppbppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1 w kq -',
  'C84',
  'Ruy Lopez: Closed Defense',
  ['Re1', 'd3', 'Qe2']
);
// 6. Re1 b5 7. Bb3 d6 8. c3 O-O
registerBook(
  'r1bq1rk1/2ppbppp/p1n2n2/1p2p3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - -',
  'C92',
  'Ruy Lopez: Main Line',
  ['h3', 'd3', 'd4']
);

// Italian Game (3. Bc4)
registerBook(
  'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq -',
  'C50',
  'Italian Game',
  ['Bc5', 'Nf6', 'Be7']
);
// Giuoco Piano (3... Bc5)
registerBook(
  'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq -',
  'C53',
  'Italian Game: Giuoco Piano',
  ['c3', 'd3', 'O-O', 'b4', 'Nc3']
);
// Two Knights Defense (3... Nf6)
registerBook(
  'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq -',
  'C55',
  'Two Knights Defense',
  ['Ng5', 'd3', 'd4', 'Nc3']
);

// Scotch Game (3. d4)
registerBook(
  'r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq -',
  'C45',
  'Scotch Game',
  ['exd4']
);
registerBook(
  'r1bqkbnr/pppp1ppp/2n5/8/3pP3/5N2/PPP2PPP/RNBQKB1R w KQkq -',
  'C45',
  'Scotch Game: Accepted',
  ['Nxd4', 'Bc4', 'c3']
);

// Petrov Defense (2... Nf6)
registerBook(
  'r1bqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq -',
  'C42',
  "Petrov's Defense",
  ['Nxe5', 'd4', 'Nc3']
);

// Philidor Defense (2... d6)
registerBook(
  'r1bqkbnr/ppp2ppp/2np4/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq -',
  'C41',
  'Philidor Defense',
  ['d4', 'Bc4', 'Nc3']
);

// King's Gambit (2. f4)
registerBook(
  'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq -',
  'C30',
  "King's Gambit",
  ['exf4', 'd5', 'Bc5', 'Nf6']
);

// 3. Sicilian Defense (1. e4 c5)
registerBook(
  'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq -',
  'B20',
  'Sicilian Defense',
  ['Nf3', 'Nc3', 'c3', 'd4', 'f4', 'g3', 'b3']
);
// 2. Nf3 d6
registerBook(
  'rnbqkbnr/pp2pppp/3p4/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq -',
  'B50',
  'Sicilian Defense: Modern Line',
  ['d4', 'Bb5+', 'c3', 'Nc3']
);
// 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3
registerBook(
  'rnbqkb1r/pp2pppp/3p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R b KQkq -',
  'B80',
  'Sicilian Defense: Open Classical',
  ['a6', 'g6', 'e6', 'Nc6']
);
// Sicilian: Najdorf (5... a6)
registerBook(
  'rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq -',
  'B90',
  'Sicilian Defense: Najdorf Variation',
  ['Be3', 'Bg5', 'Bc4', 'Be2', 'f4', 'h3', 'g3', 'a4']
);
// Sicilian: Dragon (5... g6)
registerBook(
  'rnbqkb1r/pp2pp1p/3p1np1/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq -',
  'B70',
  'Sicilian Defense: Dragon Variation',
  ['Be3', 'Bc4', 'f3', 'Be2', 'g3']
);
// Sicilian: Scheveningen (5... e6)
registerBook(
  'rnbqkb1r/pp3ppp/3ppn2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq -',
  'B80',
  'Sicilian Defense: Scheveningen Variation',
  ['Be2', 'Be3', 'g4', 'f4']
);
// Sicilian: Classical (5... Nc6)
registerBook(
  'r1bqkb1r/pp2pppp/2np1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq -',
  'B56',
  'Sicilian Defense: Classical Variation',
  ['Bg5', 'Bc4', 'Be2', 'Be3']
);
// Sicilian: 2... Nc6
registerBook(
  'r1bqkbnr/pp1ppppp/2n5/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq -',
  'B30',
  'Sicilian Defense: Old Sicilian',
  ['d4', 'Bb5', 'Nc3', 'c3']
);
// Sicilian: 2... e6
registerBook(
  'rnbqkbnr/pp1p1ppp/4p3/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq -',
  'B40',
  'Sicilian Defense: French Variation',
  ['d4', 'c3', 'Nc3', 'g3']
);
// Sicilian: Alapin (2. c3)
registerBook(
  'rnbqkbnr/pp1ppppp/8/2p5/4P3/2P5/PP1P1PPP/RNBQKBNR b KQkq -',
  'B22',
  'Sicilian Defense: Alapin Variation',
  ['d5', 'Nf6', 'e6', 'd6']
);

// 4. French Defense (1. e4 e6)
registerBook(
  'rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq -',
  'C00',
  'French Defense',
  ['d4', 'd3', 'Nf3', 'Qe2']
);
registerBook(
  'rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq -',
  'C01',
  'French Defense: Normal Line',
  ['Nc3', 'Nd2', 'e5', 'exd5']
);
// French: Advance (3. e5)
registerBook(
  'rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq -',
  'C02',
  'French Defense: Advance Variation',
  ['c5', 'Bd7', 'Ne7']
);
// French: Winawer / Classical (3. Nc3)
registerBook(
  'rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq -',
  'C10',
  'French Defense: Paulsen Variation',
  ['Nf6', 'Bb4', 'dxe4', 'c5']
);
// French: Tarrasch (3. Nd2)
registerBook(
  'rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPPN1PPP/R1BQKBNR b KQkq -',
  'C03',
  'French Defense: Tarrasch Variation',
  ['c5', 'Nf6', 'Be7', 'dxe4']
);

// 5. Caro-Kann Defense (1. e4 c6)
registerBook(
  'rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq -',
  'B10',
  'Caro-Kann Defense',
  ['d4', 'Nc3', 'c4', 'Nf3']
);
registerBook(
  'rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq -',
  'B12',
  'Caro-Kann Defense: Main Line',
  ['Nc3', 'Nd2', 'e5', 'exd5']
);
// Caro-Kann: Classical (3. Nc3 dxe4 4. Nxe4)
registerBook(
  'rnbqkbnr/pp2pppp/2p5/8/3PN3/8/PPP2PPP/R1BQKBNR b KQkq -',
  'B18',
  'Caro-Kann Defense: Classical / Tartakower',
  ['Bf5', 'Nd7', 'Nf6']
);
// Caro-Kann: Advance (3. e5)
registerBook(
  'rnbqkbnr/pp2pppp/2p5/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq -',
  'B12',
  'Caro-Kann Defense: Advance Variation',
  ['Bf5', 'c5']
);

// 6. Scandinavian Defense (1. e4 d5)
registerBook(
  'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq -',
  'B01',
  'Scandinavian Defense',
  ['exd5', 'Nf3']
);
registerBook(
  'rnbqkbnr/ppp1pppp/8/3P4/8/8/PPPP1PPP/RNBQKBNR b KQkq -',
  'B01',
  'Scandinavian: Accepted',
  ['Qxd5', 'Nf6']
);

// 7. Pirc & Modern Defenses (1. e4 d6 / 1. e4 g6)
registerBook(
  'rnbqkbnr/ppp1pppp/3p4/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq -',
  'B07',
  'Pirc Defense',
  ['d4', 'Nf3', 'Nc3']
);
registerBook(
  'rnbqkb1r/ppp1pppp/3p1n2/8/3PP3/8/PPP2PPP/RNBQKBNR w KQkq -',
  'B07',
  'Pirc Defense: Classical Line',
  ['Nc3', 'Bd3', 'f3', 'Be3', 'f4']
);
registerBook(
  'rnbqkbnr/pppppp1p/6p1/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq -',
  'B06',
  'Modern Defense',
  ['d4', 'Nc3', 'Nf3', 'c4']
);

// 8. Alekhine Defense (1. e4 Nf6)
registerBook(
  'rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq -',
  'B02',
  "Alekhine's Defense",
  ['e5', 'Nc3', 'd3']
);

// 9. Queen's Pawn Game (1. d4)
registerBook(
  'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq -',
  'A40',
  "Queen's Pawn Opening",
  ['d5', 'Nf6', 'e6', 'f5', 'g6', 'c5']
);

// 1... d5 (2. c4)
registerBook(
  'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq -',
  'D00',
  "Queen's Pawn Game",
  ['c4', 'Nf3', 'Bf4', 'Bg5', 'e3']
);
// Queen's Gambit (2. c4)
registerBook(
  'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq -',
  'D06',
  "Queen's Gambit",
  ['e6', 'c6', 'dxc4', 'Nc6', 'e5', 'Nf6']
);
// Queen's Gambit Declined (2... e6)
registerBook(
  'rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq -',
  'D30',
  "Queen's Gambit Declined",
  ['Nc3', 'Nf3', 'cxd5', 'g3']
);
// 3. Nc3 Nf6
registerBook(
  'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq -',
  'D35',
  "QGD: Modern Classical Line",
  ['Bg5', 'Nf3', 'cxd5', 'e3']
);
// Slav Defense (2... c6)
registerBook(
  'rnbqkbnr/pp2pppp/2p5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq -',
  'D10',
  'Slav Defense',
  ['Nf3', 'Nc3', 'cxd5', 'e3']
);
registerBook(
  'rnbqkb1r/pp2pppp/2p2n2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq -',
  'D15',
  'Slav Defense: Main Line',
  ['Nf3', 'e3', 'cxd5']
);
// Queen's Gambit Accepted (2... dxc4)
registerBook(
  'rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq -',
  'D20',
  "Queen's Gambit Accepted",
  ['Nf3', 'e3', 'e4']
);

// London System (2. Bf4 or 2. Nf3 & 3. Bf4)
registerBook(
  'rnbqkbnr/ppp1pppp/8/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR b KQkq -',
  'D00',
  'London System',
  ['Nf6', 'c5', 'e6', 'Bf5']
);
registerBook(
  'rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq -',
  'D02',
  "Queen's Pawn: London / Colle setup",
  ['Bf4', 'g3', 'e3', 'c4', 'Bg5']
);

// Indian Defenses (1. d4 Nf6)
registerBook(
  'rnbqkb1r/pppppppp/5n2/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq -',
  'A45',
  'Indian Defense',
  ['c4', 'Nf3', 'Bg5', 'g3', 'Nc3']
);
registerBook(
  'rnbqkb1r/pppppppp/5n2/8/2PP4/8/PP2PPPP/RNBQKBNR b KQkq -',
  'E00',
  'Indian Defense: Main Setup',
  ['e6', 'g6', 'c5', 'e5', 'd5']
);
// Nimzo-Indian / Queen's Indian / Catalan (2... e6)
registerBook(
  'rnbqkb1r/pppp1ppp/4pn2/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq -',
  'E00',
  'Indian Defense: East Indian',
  ['Nc3', 'Nf3', 'g3', 'a3']
);
// Nimzo-Indian (3. Nc3 Bb4)
registerBook(
  'rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR w KQkq -',
  'E20',
  'Nimzo-Indian Defense',
  ['e3', 'Qc2', 'Nf3', 'a3', 'f3']
);
// King's Indian & Grünfeld (2... g6)
registerBook(
  'rnbqkb1r/pppppp1p/5np1/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq -',
  'E60',
  "King's Indian / Grünfeld setup",
  ['Nc3', 'Nf3', 'g3']
);
// King's Indian Defense (3. Nc3 Bg7 4. e4 d6)
registerBook(
  'rnbq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N5/PP2BPPP/R1BQK1NR w KQ -',
  'E91',
  "King's Indian Defense: Classical Variation",
  ['Nf3', 'Be3', 'f3', 'Bg5', 'h3']
);
// Grünfeld Defense (3. Nc3 d5)
registerBook(
  'rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq -',
  'D80',
  'Grünfeld Defense',
  ['cxd5', 'Nf3', 'Bf4', 'Bg5', 'Qb3']
);

// Benoni Defense (2... c5 3. d5)
registerBook(
  'rnbqkb1r/pp1ppppp/5n2/2pP4/2P5/8/PP2PPPP/RNBQKBNR b KQkq -',
  'A56',
  'Benoni Defense',
  ['e6', 'b5', 'd6', 'g6']
);
// Dutch Defense (1. d4 f5)
registerBook(
  'rnbqkbnr/ppppp1pp/8/5p2/3P4/8/PPP1PPPP/RNBQKBNR w KQkq -',
  'A80',
  'Dutch Defense',
  ['c4', 'Nf3', 'g3', 'Nc3', 'Bg5']
);

// 10. English Opening (1. c4)
registerBook(
  'rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq -',
  'A10',
  'English Opening',
  ['e5', 'c5', 'Nf6', 'e6', 'c6', 'g6', 'f5']
);
registerBook(
  'rnbqkbnr/pppp1ppp/8/4p3/2P5/8/PP1PPPPP/RNBQKBNR w KQkq -',
  'A20',
  'English Opening: King\'s English Variation',
  ['Nc3', 'Nf3', 'g3', 'd3']
);

// 11. Réti Opening (1. Nf3)
registerBook(
  'rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq -',
  'A04',
  'Réti Opening / Zukertort',
  ['d5', 'Nf6', 'c5', 'g6', 'd6', 'e6', 'f5']
);

function registerSequence(eco, name, movesStr) {
  try {
    const chess = new Chess();
    const tokens = movesStr.trim().split(/\s+/).filter(Boolean);
    for (let i = 0; i < tokens.length; i++) {
      const moveSan = tokens[i];
      const fenBefore = chess.fen();
      const key = getOpeningFenKey(fenBefore);
      const existing = OPENING_BOOK.get(key) || { eco, name, bookMoves: [] };
      if (!existing.bookMoves.includes(moveSan)) {
        existing.bookMoves.push(moveSan);
      }
      if (i > 0 && (!existing.name || existing.name === 'Starting Position')) {
        existing.eco = eco;
        existing.name = name;
      }
      OPENING_BOOK.set(key, existing);
      const executed = chess.move(moveSan);
      if (!executed) break;
    }
    const finalFen = chess.fen();
    const finalKey = getOpeningFenKey(finalFen);
    const existing = OPENING_BOOK.get(finalKey) || { eco, name, bookMoves: [] };
    existing.eco = eco;
    existing.name = name;
    OPENING_BOOK.set(finalKey, existing);
  } catch {}
}

const CANONICAL_OPENING_SEQUENCES = [
  // Open Games (1. e4 e5)
  ['C20', "King's Pawn Game", 'e4 e5'],
  ['C40', "King's Knight Opening", 'e4 e5 Nf3'],
  ['C41', "Philidor Defense", 'e4 e5 Nf3 d6'],
  ['C41', "Philidor: Exchange", 'e4 e5 Nf3 d6 d4 exd4 Nxd4'],
  ['C42', "Petrov's Defense", 'e4 e5 Nf3 Nf6'],
  ['C42', "Petrov: Classical", 'e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 d4 d5'],
  ['C44', "Scotch Opening", 'e4 e5 Nf3 Nc6 d4'],
  ['C45', "Scotch Game", 'e4 e5 Nf3 Nc6 d4 exd4 Nxd4'],
  ['C45', "Scotch: Mieses Variation", 'e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nxc6 bxc6'],
  ['C45', "Scotch: Classical", 'e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5 Be3 Qf6 c3 Nge7'],
  ['C46', "Three Knights Game", 'e4 e5 Nf3 Nc6 Nc3'],
  ['C47', "Four Knights Game", 'e4 e5 Nf3 Nc6 Nc3 Nf6'],
  ['C48', "Four Knights: Spanish Variation", 'e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5'],
  ['C49', "Four Knights: Double Spanish", 'e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5 Bb4 O-O O-O d3 d6'],
  ['C50', "Italian Game", 'e4 e5 Nf3 Nc6 Bc4'],
  ['C50', "Italian: Hungarian Defense", 'e4 e5 Nf3 Nc6 Bc4 Be7'],
  ['C51', "Evans Gambit", 'e4 e5 Nf3 Nc6 Bc4 Bc5 b4'],
  ['C52', "Evans Gambit Accepted", 'e4 e5 Nf3 Nc6 Bc4 Bc5 b4 Bxb4 c3 Ba5 d4 exd4'],
  ['C53', "Giuoco Piano", 'e4 e5 Nf3 Nc6 Bc4 Bc5 c3'],
  ['C54', "Giuoco Piano: Main Line", 'e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4 exd4 cxd4 Bb4+ Nc3'],
  ['C50', "Giuoco Pianissimo", 'e4 e5 Nf3 Nc6 Bc4 Bc5 d3 Nf6'],
  ['C55', "Two Knights Defense", 'e4 e5 Nf3 Nc6 Bc4 Nf6'],
  ['C56', "Two Knights: Modern", 'e4 e5 Nf3 Nc6 Bc4 Nf6 d4 exd4 O-O'],
  ['C57', "Two Knights: Fried Liver Attack", 'e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Nxd5 Nxf7'],
  ['C58', "Two Knights: Polerio Defense", 'e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Na5 Bb5+ c6 dxc6 bxc6'],
  ['C60', "Ruy Lopez", 'e4 e5 Nf3 Nc6 Bb5'],
  ['C61', "Ruy Lopez: Bird Defense", 'e4 e5 Nf3 Nc6 Bb5 Nd4'],
  ['C63', "Ruy Lopez: Schliemann Defense", 'e4 e5 Nf3 Nc6 Bb5 f5'],
  ['C65', "Ruy Lopez: Berlin Defense", 'e4 e5 Nf3 Nc6 Bb5 Nf6'],
  ['C67', "Ruy Lopez: Berlin Wall", 'e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Nxe4 d4 Nd6 Bxc6 dxc6 dxe5 Nf5 Qxd8+ Kxd8'],
  ['C68', "Ruy Lopez: Exchange Variation", 'e4 e5 Nf3 Nc6 Bb5 a6 Bxc6'],
  ['C69', "Ruy Lopez: Exchange, Gligoric", 'e4 e5 Nf3 Nc6 Bb5 a6 Bxc6 dxc6 O-O f6 d4 exd4'],
  ['C70', "Ruy Lopez: Morphy Defense", 'e4 e5 Nf3 Nc6 Bb5 a6 Ba4'],
  ['C77', "Ruy Lopez: Modern Steinitz", 'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O d6'],
  ['C78', "Ruy Lopez: Archangelsk Defense", 'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O b5 Bb3 Bb7'],
  ['C80', "Ruy Lopez: Open Variation", 'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4'],
  ['C84', "Ruy Lopez: Closed Variation", 'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7'],
  ['C88', "Ruy Lopez: Closed", 'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O'],
  ['C92', "Ruy Lopez: Zaitsev Variation", 'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O h3 Bb7 d4'],
  ['C89', "Ruy Lopez: Marshall Attack", 'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O c3 d5'],
  ['C30', "King's Gambit", 'e4 e5 f4'],
  ['C33', "King's Gambit Accepted", 'e4 e5 f4 exf4'],
  ['C34', "King's Gambit Accepted: Modern", 'e4 e5 f4 exf4 Nf3 d6'],
  ['C31', "King's Gambit Declined: Falkbeer", 'e4 e5 f4 d5'],
  ['C21', "Danish Gambit", 'e4 e5 d4 exd4 c3'],
  ['C23', "Bishop's Opening", 'e4 e5 Bc4'],
  ['C25', "Vienna Game", 'e4 e5 Nc3'],
  ['C26', "Vienna: Falkbeer Variation", 'e4 e5 Nc3 Nf6'],

  // Sicilian Defense (1. e4 c5)
  ['B20', "Sicilian Defense", 'e4 c5'],
  ['B21', "Sicilian: Smith-Morra Gambit", 'e4 c5 d4 cxd4 c3'],
  ['B22', "Sicilian: Alapin Variation", 'e4 c5 c3'],
  ['B22', "Sicilian: Alapin, 2... d5", 'e4 c5 c3 d5 exd5 Qxd5 d4 Nf6 Nf3'],
  ['B22', "Sicilian: Alapin, 2... Nf6", 'e4 c5 c3 Nf6 e5 Nd5 d4 cxd4'],
  ['B23', "Sicilian: Closed", 'e4 c5 Nc3'],
  ['B24', "Sicilian: Closed Main Line", 'e4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 d3 d6'],
  ['B27', "Sicilian: Hungarian Variation", 'e4 c5 Nf3 g6'],
  ['B30', "Sicilian: Old Sicilian", 'e4 c5 Nf3 Nc6'],
  ['B31', "Sicilian: Rossolimo Attack", 'e4 c5 Nf3 Nc6 Bb5'],
  ['B32', "Sicilian: Open", 'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4'],
  ['B33', "Sicilian: Sveshnikov Variation", 'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 e5'],
  ['B33', "Sicilian: Sveshnikov Main Line", 'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 e5 Ndb5 d6 Bg5 a6 Na3 b5 Nd5 Be7 Bxf6 Bxf6 c3'],
  ['B34', "Sicilian: Accelerated Dragon", 'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6'],
  ['B36', "Sicilian: Accelerated Dragon, Maroczy Bind", 'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 c4 Bg7 Be3 Nf6 Nc3'],
  ['B40', "Sicilian: French Variation", 'e4 c5 Nf3 e6'],
  ['B41', "Sicilian: Kan Variation", 'e4 c5 Nf3 e6 d4 cxd4 Nxd4 a6'],
  ['B44', "Sicilian: Taimanov Variation", 'e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6'],
  ['B45', "Sicilian: Taimanov Main Line", 'e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be2 Nge7'],
  ['B50', "Sicilian: Modern Line", 'e4 c5 Nf3 d6'],
  ['B51', "Sicilian: Moscow Variation", 'e4 c5 Nf3 d6 Bb5+'],
  ['B52', "Sicilian: Moscow, 3... Bd7", 'e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Qxd7'],
  ['B53', "Sicilian: Chekhover Variation", 'e4 c5 Nf3 d6 d4 cxd4 Qxd4'],
  ['B54', "Sicilian: Open", 'e4 c5 Nf3 d6 d4 cxd4 Nxd4'],
  ['B56', "Sicilian: Classical", 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6'],
  ['B60', "Sicilian: Richter-Rauzer Attack", 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5'],
  ['B70', "Sicilian: Dragon", 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6'],
  ['B75', "Sicilian: Dragon, Yugoslav Attack", 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 O-O Qd2 Nc6 Bc4'],
  ['B80', "Sicilian: Scheveningen", 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 e6'],
  ['B85', "Sicilian: Scheveningen, Classical", 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 e6 Be2 Be7 O-O O-O f4 Nc6'],
  ['B90', "Sicilian: Najdorf", 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6'],
  ['B92', "Sicilian: Najdorf, Opocensky Variation", 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2'],
  ['B95', "Sicilian: Najdorf, Classical 6. Bg5", 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5'],
  ['B96', "Sicilian: Najdorf, 6. Bg5 e6", 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4'],
  ['B90', "Sicilian: Najdorf, English Attack", 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e5 Nb3 Be6 f3'],

  // French Defense (1. e4 e6)
  ['C00', "French Defense", 'e4 e6'],
  ['C01', "French: Exchange Variation", 'e4 e6 d4 d5 exd5 exd5'],
  ['C02', "French: Advance Variation", 'e4 e6 d4 d5 e5'],
  ['C02', "French: Advance Main Line", 'e4 e6 d4 d5 e5 c5 c3 Nc6 Nf3 Qb6'],
  ['C03', "French: Tarrasch Variation", 'e4 e6 d4 d5 Nd2'],
  ['C05', "French: Tarrasch, Closed", 'e4 e6 d4 d5 Nd2 Nf6 e5 Nfd7 Bd3 c5 c3 Nc6 Ne2'],
  ['C07', "French: Tarrasch, Open", 'e4 e6 d4 d5 Nd2 c5 exd5 Qxd5 Ngf3 cxd4 Bc4 Qd6'],
  ['C10', "French: Rubinstein Variation", 'e4 e6 d4 d5 Nc3 dxe4 Nxe4'],
  ['C11', "French: Steinitz Variation", 'e4 e6 d4 d5 Nc3 Nf6 e5 Nfd7 f4 c5 Nf3 Nc6 Be3'],
  ['C15', "French: Winawer Variation", 'e4 e6 d4 d5 Nc3 Bb4'],
  ['C18', "French: Winawer Advance", 'e4 e6 d4 d5 Nc3 Bb4 e5 c5 a3 Bxc3+ bxc3 Ne7 Qg4'],

  // Caro-Kann Defense (1. e4 c6)
  ['B10', "Caro-Kann Defense", 'e4 c6'],
  ['B12', "Caro-Kann: Advance Variation", 'e4 c6 d4 d5 e5'],
  ['B12', "Caro-Kann: Advance, Short Variation", 'e4 c6 d4 d5 e5 Bf5 Nf3 e6 Be2 c5 Be3'],
  ['B13', "Caro-Kann: Exchange Variation", 'e4 c6 d4 d5 exd5 cxd5'],
  ['B13', "Caro-Kann: Panov Attack", 'e4 c6 d4 d5 exd5 cxd5 c4 Nf6 Nc3'],
  ['B15', "Caro-Kann: Classical Variation", 'e4 c6 d4 d5 Nc3 dxe4 Nxe4'],
  ['B17', "Caro-Kann: Steinitz Variation", 'e4 c6 d4 d5 Nc3 dxe4 Nxe4 Nd7'],
  ['B18', "Caro-Kann: Classical, Capablanca", 'e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6 Nf3 Nd7'],

  // Other 1. e4 Openings
  ['B01', "Scandinavian Defense", 'e4 d5'],
  ['B01', "Scandinavian: Main Line", 'e4 d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6 Nf3'],
  ['B01', "Scandinavian: Modern 2... Nf6", 'e4 d5 exd5 Nf6 d4 Nxd5 Nf3'],
  ['B02', "Alekhine's Defense", 'e4 Nf6'],
  ['B03', "Alekhine: Four Pawns Attack", 'e4 Nf6 e5 Nd5 d4 d6 c4 Nb6 f4'],
  ['B04', "Alekhine: Modern Variation", 'e4 Nf6 e5 Nd5 d4 d6 Nf3 g6'],
  ['B06', "Modern Defense", 'e4 g6'],
  ['B07', "Pirc Defense", 'e4 d6 d4 Nf6 Nc3 g6'],
  ['B08', "Pirc: Classical Line", 'e4 d6 d4 Nf6 Nc3 g6 Nf3 Bg7 Be2 O-O O-O'],

  // Queen's Pawn Games (1. d4)
  ['D00', "Queen's Pawn Game", 'd4 d5'],
  ['D02', "London System", 'd4 d5 Nf3 Nf6 Bf4'],
  ['D02', "London System: 1... Nf6", 'd4 Nf6 Bf4 d5 e3 c5 c3 Nc6 Nd2'],
  ['D00', "Blackmar-Diemer Gambit", 'd4 d5 e4 dxe4 Nc3 Nf6 f3'],
  ['D06', "Queen's Gambit", 'd4 d5 c4'],
  ['D20', "Queen's Gambit Accepted", 'd4 d5 c4 dxc4'],
  ['D27', "QGA: Classical Variation", 'd4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 O-O a6'],
  ['D10', "Slav Defense", 'd4 d5 c4 c6'],
  ['D11', "Slav: Modern 3. Nf3", 'd4 d5 c4 c6 Nf3 Nf6 e3 Bf5'],
  ['D15', "Slav Defense: Main Line", 'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5'],
  ['D30', "Queen's Gambit Declined", 'd4 d5 c4 e6'],
  ['D35', "QGD: Exchange Variation", 'd4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 c6 e3'],
  ['D37', "QGD: Classical Variation", 'd4 d5 c4 e6 Nc3 Nf6 Nf3 Be7 Bf4 O-O e3'],
  ['D43', "Semi-Slav Defense", 'd4 d5 c4 c6 Nf3 Nf6 Nc3 e6'],
  ['D45', "Semi-Slav: Meran Variation", 'd4 d5 c4 c6 Nf3 Nf6 Nc3 e6 e3 Nbd7 Bd3 dxc4 Bxc4 b5 Bd3'],
  ['D44', "Semi-Slav: Botvinnik Variation", 'd4 d5 c4 c6 Nf3 Nf6 Nc3 e6 Bg5 dxc4 e4 b5 e5 h6 Bh4 g5'],
  ['D50', "QGD: 4. Bg5", 'd4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3'],
  ['D80', "Grünfeld Defense", 'd4 Nf6 c4 g6 Nc3 d5'],
  ['D85', "Grünfeld: Exchange Variation", 'd4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Nf3 c5'],
  ['D97', "Grünfeld: Russian Variation", 'd4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4'],

  // Indian Defenses (1. d4 Nf6)
  ['A45', "Indian Defense", 'd4 Nf6'],
  ['A46', "Torre Attack", 'd4 Nf6 Nf3 e6 Bg5'],
  ['E00', "Catalan Opening", 'd4 Nf6 c4 e6 g3'],
  ['E06', "Catalan: Closed", 'd4 Nf6 c4 e6 g3 d5 Bg2 Be7 Nf3 O-O O-O c6'],
  ['E04', "Catalan: Open", 'd4 Nf6 c4 e6 g3 d5 Bg2 dxc4 Nf3'],
  ['E10', "Blumenfeld Gambit", 'd4 Nf6 c4 e6 Nf3 c5 d5 b5'],
  ['E12', "Queen's Indian Defense", 'd4 Nf6 c4 e6 Nf3 b6'],
  ['E15', "Queen's Indian: Main Line", 'd4 Nf6 c4 e6 Nf3 b6 g3 Ba6 b3 Bb4+ Bd2 Be7 Bg2 c6'],
  ['E20', "Nimzo-Indian Defense", 'd4 Nf6 c4 e6 Nc3 Bb4'],
  ['E32', "Nimzo-Indian: Classical Variation", 'd4 Nf6 c4 e6 Nc3 Bb4 Qc2 O-O a3 Bxc3+ Qxc3'],
  ['E40', "Nimzo-Indian: Rubinstein", 'd4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3'],
  ['E60', "King's Indian Defense", 'd4 Nf6 c4 g6'],
  ['E61', "King's Indian: Modern Line", 'd4 Nf6 c4 g6 Nc3 Bg7'],
  ['E70', "King's Indian: Classical", 'd4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5'],
  ['E97', "King's Indian: Mar del Plata", 'd4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 O-O Nc6 d5 Ne7'],
  ['A57', "Benko Gambit", 'd4 Nf6 c4 c5 d5 b5'],
  ['A60', "Benoni Defense", 'd4 Nf6 c4 c5 d5 e6'],
  ['A70', "Modern Benoni", 'd4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 e4 g6 Nf3 Bg7'],
  ['A80', "Dutch Defense", 'd4 f5'],
  ['A85', "Dutch: Leningrad Variation", 'd4 f5 c4 Nf6 Nc3 g6 Nf3 Bg7 g3 O-O Bg2 d6'],

  // Flank Openings (1. c4, 1. Nf3, etc.)
  ['A10', "English Opening", 'c4'],
  ['A15', "English: Anglo-Indian", 'c4 Nf6'],
  ['A20', "English: King's English", 'c4 e5'],
  ['A25', "English: Reversed Sicilian", 'c4 e5 Nc3 Nc6 g3 g6 Bg2 Bg7'],
  ['A30', "English: Symmetrical", 'c4 c5'],
  ['A34', "English: Four Knights Symmetrical", 'c4 c5 Nc3 Nc6 Nf3 Nf6 g3 d5 cxd5 Nxd5'],
  ['A04', "Réti Opening", 'Nf3'],
  ['A09', "Réti Gambit", 'Nf3 d5 c4'],
  ['A00', "Nimzowitsch-Larsen Attack", 'b3'],
  ['A00', "Grob Opening", 'g4'],
  ['B00', "King's Fianchetto Opening", 'g3']
];

for (const [eco, name, moves] of CANONICAL_OPENING_SEQUENCES) {
  registerSequence(eco, name, moves);
}

/**
 * Checks whether a position is a recognized opening position.
 */
export function lookupBookPosition(fen) {
  if (!fen) return null;
  const key = getOpeningFenKey(fen);
  return OPENING_BOOK.get(key) || null;
}

/**
 * Checks whether a played move in a position is a recognized book move.
 * @param {Chess} chessBefore - chess.js instance right before the move
 * @param {object} movePlayed - move object returned by chess.move() or chess.moves({verbose: true})
 * @param {number} plyIndex - 1-based ply index
 * @returns {object|null} - Book classification info or null
 */
export function isOpeningBookMove(chessBefore, movePlayed, plyIndex) {
  if (!chessBefore || !movePlayed) return null;
  // Opening book theoretical moves occur in the first 24 plies (12 moves)
  if (plyIndex > 24) return null;

  const fen = chessBefore.fen();
  const bookEntry = lookupBookPosition(fen);
  if (!bookEntry) return null;

  const san = typeof movePlayed === 'string' ? movePlayed : (movePlayed.san || '');
  const uci = typeof movePlayed === 'object'
    ? `${movePlayed.from || ''}${movePlayed.to || ''}${movePlayed.promotion || ''}`
    : '';

  const isCandidate = bookEntry.bookMoves.some((bm) => {
    if (bm === san || bm.toLowerCase() === san.toLowerCase()) return true;
    if (uci && bm.toLowerCase() === uci.toLowerCase()) return true;
    return false;
  });

  if (isCandidate) {
    let eco = bookEntry.eco;
    let name = bookEntry.name;
    try {
      const nextChess = new Chess(fen);
      const executed = nextChess.move(movePlayed);
      if (executed) {
        const nextBook = lookupBookPosition(nextChess.fen());
        if (nextBook && nextBook.name && nextBook.name !== 'Starting Position') {
          eco = nextBook.eco;
          name = nextBook.name;
        }
      }
    } catch {}

    return {
      isBook: true,
      eco,
      name,
      bookMoves: bookEntry.bookMoves
    };
  }

  return null;
}
