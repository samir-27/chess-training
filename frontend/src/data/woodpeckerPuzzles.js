export const woodpeckerPuzzles = [
  {
    "id": "0000H",
    "puzzleIndex": 1,
    "title": "Exercise 1: Black to Move",
    "fen": "r4rk1/pp3ppp/8/2bqp2Q/3N4/P2Bn2P/1PPN1P2/R1B2RK1 b - - 0 15",
    "solution": [
      "Qg2#"
    ],
    "solutionUci": [
      "d5g2"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1032,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "d1h5",
    "preMoveFen": "r4rk1/pp3ppp/8/2bqp2b/3N4/P2Bn2P/1PPN1P2/R1BQ1RK1 w - - 1 15"
  },
  {
    "id": "0008Q",
    "puzzleIndex": 2,
    "title": "Exercise 2: Black to Move",
    "fen": "8/5R2/1p2P3/p4r2/P6p/1P3Pk1/4K3/8 b - - 2 64",
    "solution": [
      "Re5+",
      "Kf1",
      "Rxe6"
    ],
    "solutionUci": [
      "f5e5",
      "e2f1",
      "e5e6"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, Rook Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1392,
    "themes": "advantage endgame rookEndgame short",
    "preMove": "e7f7",
    "preMoveFen": "8/4R3/1p2P3/p4r2/P6p/1P3Pk1/4K3/8 w - - 1 64"
  },
  {
    "id": "0009B",
    "puzzleIndex": 3,
    "title": "Exercise 3: White to Move",
    "fen": "r2qr1k1/b1p2ppp/p5n1/P1p1p3/4P1n1/B2P2Pb/3NBP1P/RN1QR1K1 w - - 0 17",
    "solution": [
      "Bxg4",
      "Bxg4",
      "Qxg4"
    ],
    "solutionUci": [
      "e2g4",
      "h3g4",
      "d1g4"
    ],
    "description": "White to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1061,
    "themes": "advantage middlegame short",
    "preMove": "b6c5",
    "preMoveFen": "r2qr1k1/b1p2ppp/pp4n1/P1P1p3/4P1n1/B2P2Pb/3NBP1P/RN1QR1K1 b - - 1 16"
  },
  {
    "id": "000Zo",
    "puzzleIndex": 4,
    "title": "Exercise 4: Black to Move",
    "fen": "4r3/1k6/pp3P2/1b5p/3R1p2/P1R2P2/1P4PP/6K1 b - - 0 35",
    "solution": [
      "Re1+",
      "Kf2",
      "Rf1#"
    ],
    "solutionUci": [
      "e8e1",
      "g1f2",
      "e1f1"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 2, Opera Mate, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1363,
    "themes": "endgame mate mateIn2 operaMate short",
    "preMove": "e5f6",
    "preMoveFen": "4r3/1k6/pp3r2/1b2P2p/3R1p2/P1R2P2/1P4PP/6K1 w - - 0 35"
  },
  {
    "id": "000hf",
    "puzzleIndex": 5,
    "title": "Exercise 5: White to Move",
    "fen": "r1bq3r/pp1nbkp1/2p1p2p/8/2BP4/1PN3P1/P3QP1P/3R1RK1 w - - 0 20",
    "solution": [
      "Qxe6+",
      "Kf8",
      "Qf7#"
    ],
    "solutionUci": [
      "e2e6",
      "f7f8",
      "e6f7"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 2, Middlegame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1395,
    "themes": "mate mateIn2 middlegame short",
    "preMove": "e8f7",
    "preMoveFen": "r1bqk2r/pp1nbNp1/2p1p2p/8/2BP4/1PN3P1/P3QP1P/3R1RK1 b kq - 0 19"
  },
  {
    "id": "000lC",
    "puzzleIndex": 6,
    "title": "Exercise 6: Black to Move",
    "fen": "3r3r/pQNk1ppp/1qnR1n2/1B6/8/8/PPP3PP/5R1K b - - 0 19",
    "solution": [
      "Kxd6",
      "Qxb6",
      "axb6"
    ],
    "solutionUci": [
      "d7d6",
      "b7b6",
      "a7b6"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Hanging Piece, Middlegame, Short Tactic",
    "hint": "Look for undefended or hanging material!",
    "rating": 1325,
    "themes": "advantage hangingPiece middlegame short",
    "preMove": "d1d6",
    "preMoveFen": "3r3r/pQNk1ppp/1qnb1n2/1B6/8/8/PPP3PP/3R1R1K w - - 5 19"
  },
  {
    "id": "000o3",
    "puzzleIndex": 7,
    "title": "Exercise 7: White to Move",
    "fen": "8/2p5/3k2p1/1p1P1p2/1P3P2/3K2Pp/7P/8 w - - 2 44",
    "solution": [
      "Kd4",
      "g5",
      "fxg5"
    ],
    "solutionUci": [
      "d3d4",
      "g6g5",
      "f4g5"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Pawn Endgame, Short Tactic, Zugzwang",
    "hint": "Place the opponent in zugzwang where any move loses!",
    "rating": 959,
    "themes": "crushing endgame pawnEndgame short zugzwang",
    "preMove": "e7d6",
    "preMoveFen": "8/2p1k3/6p1/1p1P1p2/1P3P2/3K2Pp/7P/8 b - - 1 43"
  },
  {
    "id": "000pA",
    "puzzleIndex": 8,
    "title": "Exercise 8: Black to Move",
    "fen": "5rk1/5pp1/7p/3p4/1KpPn3/4PPP1/1P2N1P1/r4R1R b - - 0 24",
    "solution": [
      "Rb8#"
    ],
    "solutionUci": [
      "f8b8"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1008,
    "themes": "endgame mate mateIn1 oneMove",
    "preMove": "b3b4",
    "preMoveFen": "5rk1/5pp1/7p/3p4/1ppPn3/1K2PPP1/1P2N1P1/r4R1R w - - 0 24"
  },
  {
    "id": "000rO",
    "puzzleIndex": 9,
    "title": "Exercise 9: Black to Move",
    "fen": "3R4/8/8/KB2b3/1p6/1P2k3/3p4/8 b - - 0 58",
    "solution": [
      "Bc7+",
      "Kxb4",
      "Bxd8"
    ],
    "solutionUci": [
      "e5c7",
      "a5b4",
      "c7d8"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Fork, Master, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1110,
    "themes": "crushing endgame fork master short",
    "preMove": "a6a5",
    "preMoveFen": "3R4/8/K7/pB2b3/1p6/1P2k3/3p4/8 w - - 4 58"
  },
  {
    "id": "000rZ",
    "puzzleIndex": 10,
    "title": "Exercise 10: Black to Move",
    "fen": "2kr1b1r/p1p2pp1/2pqN3/7p/6n1/2NPB3/PPP2PPP/R2Q1RK1 b - - 0 13",
    "solution": [
      "Qxh2#"
    ],
    "solutionUci": [
      "d6h2"
    ],
    "description": "Black to move. Themes: KingsideAttack, Checkmate, Mate in 1, One-Move Tactic, Opening",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 638,
    "themes": "kingsideAttack mate mateIn1 oneMove opening",
    "preMove": "d4e6",
    "preMoveFen": "2kr1b1r/p1p2pp1/2pqb3/7p/3N2n1/2NPB3/PPP2PPP/R2Q1RK1 w - - 2 13"
  },
  {
    "id": "001Fg",
    "puzzleIndex": 11,
    "title": "Exercise 11: Black to Move",
    "fen": "5r1k/pQR3pp/5rp1/3B4/q2n4/7P/P4PP1/5RK1 b - - 4 30",
    "solution": [
      "Ne2+",
      "Kh2",
      "Qf4+",
      "Kh1",
      "Ng3+",
      "fxg3",
      "Qxf1+"
    ],
    "solutionUci": [
      "d4e2",
      "g1h2",
      "a4f4",
      "h2h1",
      "e2g3",
      "f2g3",
      "f4f1"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Middlegame, Deep Calculation",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1244,
    "themes": "advantage middlegame veryLong",
    "preMove": "c8c7",
    "preMoveFen": "2R2r1k/pQ4pp/5rp1/3B4/q2n4/7P/P4PP1/5RK1 w - - 3 30"
  },
  {
    "id": "001Wz",
    "puzzleIndex": 12,
    "title": "Exercise 12: White to Move",
    "fen": "6k1/5ppp/r1p5/p1n1rP2/8/2P2N1P/2P3P1/3R2K1 w - - 0 22",
    "solution": [
      "Rd8+",
      "Re8",
      "Rxe8#"
    ],
    "solutionUci": [
      "d1d8",
      "e5e8",
      "d8e8"
    ],
    "description": "White to move. Themes: Back-Rank Mate, Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1118,
    "themes": "backRankMate endgame mate mateIn2 short",
    "preMove": "e8e5",
    "preMoveFen": "4r1k1/5ppp/r1p5/p1n1RP2/8/2P2N1P/2P3P1/3R2K1 b - - 0 21"
  },
  {
    "id": "001om",
    "puzzleIndex": 13,
    "title": "Exercise 13: Black to Move",
    "fen": "5r1k/pp4pp/5p2/1BbQp1r1/7K/7P/1PP3P1/3R3R b - - 3 26",
    "solution": [
      "Bf2+",
      "g3",
      "Bxg3#"
    ],
    "solutionUci": [
      "c5f2",
      "g2g3",
      "f2g3"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 2, Middlegame, MorphysMate, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1016,
    "themes": "mate mateIn2 middlegame morphysMate short",
    "preMove": "g4h4",
    "preMoveFen": "5r1k/pp4pp/5p2/1BbQp1r1/6K1/7P/1PP3P1/3R3R w - - 2 26"
  },
  {
    "id": "001pC",
    "puzzleIndex": 14,
    "title": "Exercise 14: Black to Move",
    "fen": "r4rk1/pp3ppp/3b4/2p1pPB1/7N/2PP3n/PP4PP/R2Q2RK b - - 0 18",
    "solution": [
      "Nf2#"
    ],
    "solutionUci": [
      "h3f2"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic, Smothered Mate",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 800,
    "themes": "mate mateIn1 middlegame oneMove smotheredMate",
    "preMove": "f1g1",
    "preMoveFen": "r4rk1/pp3ppp/3b4/2p1pPB1/7N/2PP3n/PP4PP/R2Q1RqK w - - 5 18"
  },
  {
    "id": "001w5",
    "puzzleIndex": 15,
    "title": "Exercise 15: White to Move",
    "fen": "1rb3k1/q4rP1/4p2p/3p3p/3P1P2/2P5/2QK3P/3R2R1 w - - 1 30",
    "solution": [
      "Qh7+",
      "Kxh7",
      "g8=Q#"
    ],
    "solutionUci": [
      "c2h7",
      "g8h7",
      "g7g8q"
    ],
    "description": "White to move. Themes: AdvancedPawn, Attraction Sacrifice, Checkmate, Mate in 2, Middlegame, Promotion, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1034,
    "themes": "advancedPawn attraction mate mateIn2 middlegame promotion short",
    "preMove": "f8f7",
    "preMoveFen": "1rb2rk1/q5P1/4p2p/3p3p/3P1P2/2P5/2QK3P/3R2R1 b - - 0 29"
  },
  {
    "id": "001wR",
    "puzzleIndex": 16,
    "title": "Exercise 16: White to Move",
    "fen": "6nr/p4p1p/k1p5/1p6/1QN5/2P1P3/4KPqP/8 w - - 0 27",
    "solution": [
      "Qa5+",
      "Kb7",
      "Nd6+",
      "Kb8",
      "Qd8#"
    ],
    "solutionUci": [
      "b4a5",
      "a6b7",
      "c4d6",
      "b7b8",
      "a5d8"
    ],
    "description": "White to move. Themes: Endgame, Long Tactic, Checkmate, Mate in 3",
    "hint": "Calculate a forcing checkmate combination!",
    "rating": 1170,
    "themes": "endgame long mate mateIn3",
    "preMove": "b7b5",
    "preMoveFen": "6nr/pp3p1p/k1p5/8/1QN5/2P1P3/4KPqP/8 b - - 5 26"
  },
  {
    "id": "001wb",
    "puzzleIndex": 17,
    "title": "Exercise 17: Black to Move",
    "fen": "r3k2r/pb1p1ppp/1b4q1/1Q2P3/8/2NP1PP1/PP4P1/R1B2R1K b kq - 0 17",
    "solution": [
      "Qh5#"
    ],
    "solutionUci": [
      "g6h5"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1259,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "h2g3",
    "preMoveFen": "r3k2r/pb1p1ppp/1b4q1/1Q2P3/8/2NP1Pn1/PP4PP/R1B2R1K w kq - 1 17"
  },
  {
    "id": "001wr",
    "puzzleIndex": 18,
    "title": "Exercise 18: Black to Move",
    "fen": "r4rk1/p3ppbp/Pp1q1np1/3PpbB1/2B5/2N2P2/1PPQ2PP/3RR1K1 b - - 0 18",
    "solution": [
      "Qc5+",
      "Kh1",
      "Qxc4"
    ],
    "solutionUci": [
      "d6c5",
      "g1h1",
      "c5c4"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Fork, Master, MasterVsMaster, Middlegame, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 977,
    "themes": "advantage fork master masterVsMaster middlegame short",
    "preMove": "f2f3",
    "preMoveFen": "r4rk1/p3ppbp/Pp1q1np1/3PpbB1/2B5/2N5/1PPQ1PPP/3RR1K1 w - - 4 18"
  },
  {
    "id": "001xl",
    "puzzleIndex": 19,
    "title": "Exercise 19: White to Move",
    "fen": "8/4R3/p4kpp/3B4/5q2/8/5P1P/6K1 w - - 6 41",
    "solution": [
      "Rf7+",
      "Ke5",
      "Rxf4"
    ],
    "solutionUci": [
      "e7f7",
      "f6e5",
      "f7f4"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Master, MasterVsMaster, Short Tactic, Skewer, SuperGM",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1289,
    "themes": "advantage endgame master masterVsMaster short skewer superGM",
    "preMove": "g7f6",
    "preMoveFen": "8/4R1k1/p5pp/3B4/5q2/8/5P1P/6K1 b - - 5 40"
  },
  {
    "id": "002HE",
    "puzzleIndex": 20,
    "title": "Exercise 20: Black to Move",
    "fen": "1qr2rk1/1p1p1ppp/pB2p1n1/7n/2P1P3/1Q2NP1P/PP2BKPb/3R1R2 b - - 2 20",
    "solution": [
      "Qg3#"
    ],
    "solutionUci": [
      "b8g3"
    ],
    "description": "Black to move. Themes: Master, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1119,
    "themes": "master mate mateIn1 middlegame oneMove",
    "preMove": "g1f2",
    "preMoveFen": "1qr2rk1/1p1p1ppp/pB2p1n1/7n/2P1P3/1Q2NP1P/PP2B1Pb/3R1RK1 w - - 1 20"
  },
  {
    "id": "002Mm",
    "puzzleIndex": 21,
    "title": "Exercise 21: White to Move",
    "fen": "rn1qrk2/ppp3pQ/3p1pP1/3Pp3/2P1P3/8/PP3PP1/R1B1K3 w Q - 3 17",
    "solution": [
      "Qh8+",
      "Ke7",
      "Qxg7#"
    ],
    "solutionUci": [
      "h7h8",
      "f8e7",
      "h8g7"
    ],
    "description": "White to move. Themes: Deflection, Checkmate, Mate in 2, Middlegame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 915,
    "themes": "deflection mate mateIn2 middlegame short",
    "preMove": "g8f8",
    "preMoveFen": "rn1qr1k1/ppp3pQ/3p1pP1/3Pp3/2P1P3/8/PP3PP1/R1B1K3 b Q - 2 16"
  },
  {
    "id": "002O7",
    "puzzleIndex": 22,
    "title": "Exercise 22: White to Move",
    "fen": "r3qrk1/2p2pp1/p2bpn1p/2ppN3/3P1Pb1/1PP1P1B1/P2N2PP/R2Q1RK1 w - - 1 15",
    "solution": [
      "Nxg4",
      "Nxg4",
      "Qxg4"
    ],
    "solutionUci": [
      "e5g4",
      "f6g4",
      "d1g4"
    ],
    "description": "White to move. Themes: Crushing Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1008,
    "themes": "crushing middlegame short",
    "preMove": "f5g4",
    "preMoveFen": "r3qrk1/2p2pp1/p2bpn1p/2ppNb2/3P1P2/1PP1P1B1/P2N2PP/R2Q1RK1 b - - 0 14"
  },
  {
    "id": "002Q2",
    "puzzleIndex": 23,
    "title": "Exercise 23: Black to Move",
    "fen": "7k/p4R1p/3p3B/2pN1n2/2PbB1b1/3P2P1/P3r3/5R1K b - - 0 28",
    "solution": [
      "Nxg3#"
    ],
    "solutionUci": [
      "f5g3"
    ],
    "description": "Black to move. Themes: CornerMate, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 985,
    "themes": "cornerMate mate mateIn1 middlegame oneMove",
    "preMove": "f4h6",
    "preMoveFen": "7k/p4R1p/3p3r/2pN1n2/2PbBBb1/3P2P1/P3r3/5R1K w - - 1 28"
  },
  {
    "id": "002X3",
    "puzzleIndex": 24,
    "title": "Exercise 24: White to Move",
    "fen": "6k1/2q2p1p/4pPp1/4P3/p1pP1P2/r1P5/6QP/4B1K1 w - - 0 34",
    "solution": [
      "Qa8+",
      "Qb8",
      "Qxb8#"
    ],
    "solutionUci": [
      "g2a8",
      "c7b8",
      "a8b8"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 936,
    "themes": "endgame mate mateIn2 short",
    "preMove": "b3a3",
    "preMoveFen": "6k1/2q2p1p/4pPp1/4P3/p1pP1P2/RrP5/6QP/4B1K1 b - - 0 33"
  },
  {
    "id": "002bK",
    "puzzleIndex": 25,
    "title": "Exercise 25: White to Move",
    "fen": "8/7p/4k3/pb1p1pPB/1n1P3P/N1p1P3/4K3/8 w - - 2 43",
    "solution": [
      "Nxb5",
      "c2",
      "Kd2"
    ],
    "solutionUci": [
      "a3b5",
      "c3c2",
      "e2d2"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Hanging Piece, Short Tactic",
    "hint": "Look for undefended or hanging material!",
    "rating": 1080,
    "themes": "advantage endgame hangingPiece short",
    "preMove": "c6b5",
    "preMoveFen": "8/7p/2b1k3/p2p1pPB/1n1P3P/N1p1P3/4K3/8 b - - 1 42"
  },
  {
    "id": "002p5",
    "puzzleIndex": 26,
    "title": "Exercise 26: White to Move",
    "fen": "r1bqr1k1/pp1nbpp1/2p5/3n2P1/2BP4/P7/1PQNNPP1/R3K2R w KQ - 1 14",
    "solution": [
      "Qh7+",
      "Kf8",
      "Qh8#"
    ],
    "solutionUci": [
      "c2h7",
      "g8f8",
      "h7h8"
    ],
    "description": "White to move. Themes: KingsideAttack, Checkmate, Mate in 2, Middlegame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 908,
    "themes": "kingsideAttack mate mateIn2 middlegame short",
    "preMove": "f6d5",
    "preMoveFen": "r1bqr1k1/pp1nbpp1/2p2n2/6P1/2BP4/P7/1PQNNPP1/R3K2R b KQ - 0 13"
  },
  {
    "id": "0039T",
    "puzzleIndex": 27,
    "title": "Exercise 27: Black to Move",
    "fen": "1r5r/p3kp2/4p2p/4P3/R4Pp1/6P1/P1P4P/4K2R b K - 2 25",
    "solution": [
      "Rb1+",
      "Kf2",
      "Rxh1",
      "Rxa7+",
      "Kf8"
    ],
    "solutionUci": [
      "b8b1",
      "e1f2",
      "b1h1",
      "a4a7",
      "e7f8"
    ],
    "description": "Black to move. Themes: Crushing Advantage, DefensiveMove, Endgame, Long Tactic, Rook Endgame, Skewer",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1111,
    "themes": "crushing defensiveMove endgame long rookEndgame skewer",
    "preMove": "d4a4",
    "preMoveFen": "1r5r/p3kp2/4p2p/4P3/3R1Pp1/6P1/P1P4P/4K2R w K - 1 25"
  },
  {
    "id": "003AX",
    "puzzleIndex": 28,
    "title": "Exercise 28: White to Move",
    "fen": "2r2rk1/5ppp/bq2p3/p2pP1N1/Pb1p2P1/1P2P2P/2QN4/2R1K2R w K - 0 19",
    "solution": [
      "Qxh7#"
    ],
    "solutionUci": [
      "c2h7"
    ],
    "description": "White to move. Themes: KingsideAttack, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1055,
    "themes": "kingsideAttack mate mateIn1 middlegame oneMove",
    "preMove": "c5d4",
    "preMoveFen": "2r2rk1/5ppp/bq2p3/p1ppP1N1/Pb1P2P1/1P2P2P/2QN4/2R1K2R b K - 1 18"
  },
  {
    "id": "003Jb",
    "puzzleIndex": 29,
    "title": "Exercise 29: Black to Move",
    "fen": "6k1/Q2bqr1p/2rpp1pR/p7/Pp2P3/1B3P2/1PP3P1/2KR4 b - - 7 22",
    "solution": [
      "Qg5+",
      "Kb1",
      "Qxh6"
    ],
    "solutionUci": [
      "e7g5",
      "c1b1",
      "g5h6"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Fork, Master, Middlegame, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 993,
    "themes": "advantage fork master middlegame short",
    "preMove": "d4a7",
    "preMoveFen": "6k1/3bqr1p/2rpp1pR/p7/Pp1QP3/1B3P2/1PP3P1/2KR4 w - - 6 22"
  },
  {
    "id": "003YF",
    "puzzleIndex": 30,
    "title": "Exercise 30: Black to Move",
    "fen": "r4rk1/1pp2ppp/p2p4/2bPp3/2P1PB1q/P1N2B2/1P3P2/R2QK1R1 b Q - 0 15",
    "solution": [
      "Qxf2#"
    ],
    "solutionUci": [
      "h4f2"
    ],
    "description": "Black to move. Themes: AttackingF2F7, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1061,
    "themes": "attackingF2F7 mate mateIn1 middlegame oneMove",
    "preMove": "c1f4",
    "preMoveFen": "r4rk1/1pp2ppp/p2p4/2bPp3/2P1Pn1q/P1N2B2/1P3P2/R1BQK1R1 w Q - 1 15"
  },
  {
    "id": "003eP",
    "puzzleIndex": 31,
    "title": "Exercise 31: White to Move",
    "fen": "6k1/r1b1q3/2p3p1/2Pp4/1P2p1n1/2B1P3/NQ6/2K4R w - - 2 37",
    "solution": [
      "Rh8+",
      "Kf7",
      "Rh7+",
      "Ke8",
      "Rxe7+"
    ],
    "solutionUci": [
      "h1h8",
      "g8f7",
      "h8h7",
      "f7e8",
      "h7e7"
    ],
    "description": "White to move. Themes: Crushing Advantage, ExposedKing, Long Tactic, Middlegame, Skewer",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1189,
    "themes": "crushing exposedKing long middlegame skewer",
    "preMove": "h7g8",
    "preMoveFen": "8/r1b1q2k/2p3p1/2Pp4/1P2p1n1/2B1P3/NQ6/2K4R b - - 1 36"
  },
  {
    "id": "003jH",
    "puzzleIndex": 32,
    "title": "Exercise 32: Black to Move",
    "fen": "rn3rk1/p5pp/3N4/4np1q/5Q2/1P6/PB1P1KP1/2R4R b - - 1 25",
    "solution": [
      "Nd3+",
      "Ke3",
      "Nxf4",
      "Rxh5",
      "Nxh5"
    ],
    "solutionUci": [
      "e5d3",
      "f2e3",
      "d3f4",
      "h1h5",
      "f4h5"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Fork, Long Tactic, Middlegame",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1137,
    "themes": "crushing fork long middlegame",
    "preMove": "f3f2",
    "preMoveFen": "rn3rk1/p5pp/3N4/4np1q/5Q2/1P3K2/PB1P2P1/2R4R w - - 0 25"
  },
  {
    "id": "003jb",
    "puzzleIndex": 33,
    "title": "Exercise 33: White to Move",
    "fen": "r3kb1r/p4ppp/b3p3/2pq4/3Q4/4BN2/PPP2PPP/R3K2R w KQkq - 0 12",
    "solution": [
      "Qa4+",
      "Bb5",
      "Qxb5+"
    ],
    "solutionUci": [
      "d4a4",
      "a6b5",
      "a4b5"
    ],
    "description": "White to move. Themes: Crushing Advantage, Fork, Master, Middlegame, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 982,
    "themes": "crushing fork master middlegame short",
    "preMove": "c6c5",
    "preMoveFen": "r3kb1r/p4ppp/b1p1p3/3q4/3Q4/4BN2/PPP2PPP/R3K2R b KQkq - 0 11"
  },
  {
    "id": "003jv",
    "puzzleIndex": 34,
    "title": "Exercise 34: Black to Move",
    "fen": "7R/1p2k2p/p2n2p1/4K3/8/6P1/P6P/8 b - - 11 37",
    "solution": [
      "Nf7+",
      "Ke4",
      "Nxh8"
    ],
    "solutionUci": [
      "d6f7",
      "e5e4",
      "f7h8"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1001,
    "themes": "crushing endgame fork short",
    "preMove": "b8h8",
    "preMoveFen": "1R6/1p2k2p/p2n2p1/4K3/8/6P1/P6P/8 w - - 10 37"
  },
  {
    "id": "003mh",
    "puzzleIndex": 35,
    "title": "Exercise 35: White to Move",
    "fen": "4rk1r/1pp2p2/p2p3p/3N4/3P2q1/8/PPP5/1K2Q1NR w - - 2 24",
    "solution": [
      "Qxe8+",
      "Kxe8",
      "Nf6+",
      "Ke7",
      "Nxg4"
    ],
    "solutionUci": [
      "e1e8",
      "f8e8",
      "d5f6",
      "e8e7",
      "f6g4"
    ],
    "description": "White to move. Themes: Decisive Advantage, Attraction Sacrifice, Fork, Long Tactic, Middlegame, Tactical Sacrifice",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1329,
    "themes": "advantage attraction fork long middlegame sacrifice",
    "preMove": "a8e8",
    "preMoveFen": "r4k1r/1pp2p2/p2p3p/3N4/3P2q1/8/PPP5/1K2Q1NR b - - 1 23"
  },
  {
    "id": "003o0",
    "puzzleIndex": 36,
    "title": "Exercise 36: Black to Move",
    "fen": "r1bqk2r/pp1nbppp/3p4/1B1p4/3P1B2/5N2/PPP2PPP/R2QK2R b KQkq - 3 9",
    "solution": [
      "Qa5+",
      "Qd2",
      "Qxb5"
    ],
    "solutionUci": [
      "d8a5",
      "d1d2",
      "a5b5"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Fork, Master, Opening, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1020,
    "themes": "advantage fork master opening short",
    "preMove": "g1f3",
    "preMoveFen": "r1bqk2r/pp1nbppp/3p4/1B1p4/3P1B2/8/PPP2PPP/R2QK1NR w KQkq - 2 9"
  },
  {
    "id": "003r5",
    "puzzleIndex": 37,
    "title": "Exercise 37: Black to Move",
    "fen": "r2qr1k1/ppp2ppp/4P3/8/1nP2Q2/2N2N1P/PP3KP1/R4R2 b - - 0 15",
    "solution": [
      "Nd3+",
      "Kg1",
      "Nxf4"
    ],
    "solutionUci": [
      "b4d3",
      "f2g1",
      "d3f4"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Fork, Middlegame, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1112,
    "themes": "crushing fork middlegame short",
    "preMove": "d5e6",
    "preMoveFen": "r2qr1k1/ppp2ppp/4b3/3P4/1nP2Q2/2N2N1P/PP3KP1/R4R2 w - - 1 15"
  },
  {
    "id": "0040n",
    "puzzleIndex": 38,
    "title": "Exercise 38: Black to Move",
    "fen": "r7/p2k1pp1/p1p1pn2/3p4/3P4/P3PQp1/1PP2P1R/2K5 b - - 0 20",
    "solution": [
      "gxh2",
      "Qh3",
      "Ng4"
    ],
    "solutionUci": [
      "g3h2",
      "f3h3",
      "f6g4"
    ],
    "description": "Black to move. Themes: AdvancedPawn, Decisive Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1270,
    "themes": "advancedPawn advantage endgame short",
    "preMove": "h1h2",
    "preMoveFen": "r7/p2k1pp1/p1p1pn2/3p4/3P4/P3PQp1/1PP2P1q/2K4R w - - 0 20"
  },
  {
    "id": "0048h",
    "puzzleIndex": 39,
    "title": "Exercise 39: Black to Move",
    "fen": "4r3/p5k1/2R4p/2Pp4/1P1pr1P1/P6P/8/3R3K b - - 0 35",
    "solution": [
      "Re1+",
      "Rxe1",
      "Rxe1+",
      "Kg2",
      "d3"
    ],
    "solutionUci": [
      "e4e1",
      "d1e1",
      "e8e1",
      "h1g2",
      "d4d3"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, ExposedKing, Long Tactic, Rook Endgame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1173,
    "themes": "crushing endgame exposedKing long rookEndgame",
    "preMove": "f6c6",
    "preMoveFen": "4r3/p5k1/2p2R1p/2Pp4/1P1pr1P1/P6P/8/3R3K w - - 1 35"
  },
  {
    "id": "004JD",
    "puzzleIndex": 40,
    "title": "Exercise 40: Black to Move",
    "fen": "3r4/R7/2p5/p1P2p2/1p4k1/nP2K3/P3NP2/8 b - - 4 41",
    "solution": [
      "Nc2#"
    ],
    "solutionUci": [
      "a3c2"
    ],
    "description": "Black to move. Themes: CornerMate, Endgame, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1307,
    "themes": "cornerMate endgame mate mateIn1 oneMove",
    "preMove": "d2e3",
    "preMoveFen": "3r4/R7/2p5/p1P2p2/1p4k1/nP6/P2KNP2/8 w - - 3 41"
  },
  {
    "id": "004LZ",
    "puzzleIndex": 41,
    "title": "Exercise 41: Black to Move",
    "fen": "8/7R/5p2/p7/7P/2p5/3k2N1/1K6 b - - 0 48",
    "solution": [
      "c2+",
      "Ka2",
      "c1=Q",
      "Rd7+",
      "Ke2"
    ],
    "solutionUci": [
      "c3c2",
      "b1a2",
      "c2c1q",
      "h7d7",
      "d2e2"
    ],
    "description": "Black to move. Themes: AdvancedPawn, Crushing Advantage, DefensiveMove, Deflection, Endgame, Long Tactic, Promotion",
    "hint": "Deflect the key defender away from its crucial post!",
    "rating": 1208,
    "themes": "advancedPawn crushing defensiveMove deflection endgame long promotion",
    "preMove": "e1g2",
    "preMoveFen": "8/7R/5p2/p7/7P/2p5/3k2r1/1K2N3 w - - 3 48"
  },
  {
    "id": "004Lu",
    "puzzleIndex": 42,
    "title": "Exercise 42: White to Move",
    "fen": "8/p1p1k2p/4P3/2PP1p1P/1r3r2/5B2/P3RK2/8 w - - 4 39",
    "solution": [
      "d6+",
      "cxd6",
      "cxd6+",
      "Kxd6",
      "e7"
    ],
    "solutionUci": [
      "d5d6",
      "c7d6",
      "c5d6",
      "e7d6",
      "e6e7"
    ],
    "description": "White to move. Themes: AdvancedPawn, Decisive Advantage, Endgame, ExposedKing, Long Tactic, Master",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1231,
    "themes": "advancedPawn advantage endgame exposedKing long master",
    "preMove": "f6e7",
    "preMoveFen": "8/p1p4p/4Pk2/2PP1p1P/1r3r2/5B2/P3RK2/8 b - - 3 38"
  },
  {
    "id": "004WZ",
    "puzzleIndex": 43,
    "title": "Exercise 43: Black to Move",
    "fen": "r6k/1b3pp1/p1q1pn1p/2p5/P1B5/1PN4Q/2P1RP1P/R5K1 b - - 0 26",
    "solution": [
      "Qh1#"
    ],
    "solutionUci": [
      "c6h1"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 866,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "f1g1",
    "preMoveFen": "r6k/1b3pp1/p1q1pn1p/2p5/P1B5/1PN4Q/2P1RP1P/R4Kr1 w - - 2 26"
  },
  {
    "id": "004X6",
    "puzzleIndex": 44,
    "title": "Exercise 44: Black to Move",
    "fen": "1r4k1/p4ppp/2Q5/3pq3/8/P6P/2PR1PP1/1R4K1 b - - 0 26",
    "solution": [
      "Rxb1+",
      "Rd1",
      "Rxd1#"
    ],
    "solutionUci": [
      "b8b1",
      "d2d1",
      "b1d1"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1152,
    "themes": "endgame mate mateIn2 short",
    "preMove": "a1b1",
    "preMoveFen": "1r4k1/p4ppp/2Q5/3pq3/8/P6P/2PR1PP1/Rr4K1 w - - 1 26"
  },
  {
    "id": "004mT",
    "puzzleIndex": 45,
    "title": "Exercise 45: White to Move",
    "fen": "5Q2/8/1bk1p1p1/5p2/3p4/5qPK/7P/8 w - - 2 52",
    "solution": [
      "Qa8+",
      "Kd6",
      "Qxf3"
    ],
    "solutionUci": [
      "f8a8",
      "c6d6",
      "a8f3"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Short Tactic, Skewer",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1291,
    "themes": "advantage endgame short skewer",
    "preMove": "d6c6",
    "preMoveFen": "5Q2/8/1b1kp1p1/5p2/3p4/5qPK/7P/8 b - - 1 51"
  },
  {
    "id": "004nd",
    "puzzleIndex": 46,
    "title": "Exercise 46: White to Move",
    "fen": "3q2k1/3r4/pp3p1Q/2b1n3/P3N3/2P5/1P4PP/R6K w - - 1 25",
    "solution": [
      "Nxf6+",
      "Qxf6",
      "Qxf6"
    ],
    "solutionUci": [
      "e4f6",
      "d8f6",
      "h6f6"
    ],
    "description": "White to move. Themes: Crushing Advantage, Fork, Middlegame, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 898,
    "themes": "crushing fork middlegame short",
    "preMove": "c7d7",
    "preMoveFen": "3q2k1/2r5/pp3p1Q/2b1n3/P3N3/2P5/1P4PP/R6K b - - 0 24"
  },
  {
    "id": "004u0",
    "puzzleIndex": 47,
    "title": "Exercise 47: White to Move",
    "fen": "4r1k1/ppq3pp/2p2p2/4r3/4p1Q1/P5RP/1P3PP1/3R2K1 w - - 4 35",
    "solution": [
      "Rd7",
      "Qxd7",
      "Qxd7"
    ],
    "solutionUci": [
      "d1d7",
      "c7d7",
      "g4d7"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1342,
    "themes": "advantage endgame short",
    "preMove": "e6e8",
    "preMoveFen": "6k1/ppq3pp/2p1rp2/4r3/4p1Q1/P5RP/1P3PP1/3R2K1 b - - 3 34"
  },
  {
    "id": "004yJ",
    "puzzleIndex": 48,
    "title": "Exercise 48: Black to Move",
    "fen": "r4rk1/1bp2ppp/p1q1pn2/2P1N3/8/3B4/P1P1QPPP/R4RK1 b - - 1 16",
    "solution": [
      "Qxg2#"
    ],
    "solutionUci": [
      "c6g2"
    ],
    "description": "Black to move. Themes: KingsideAttack, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 658,
    "themes": "kingsideAttack mate mateIn1 middlegame oneMove",
    "preMove": "f3e5",
    "preMoveFen": "r4rk1/1bp2ppp/p1q1pn2/2P5/8/3B1N2/P1P1QPPP/R4RK1 w - - 0 16"
  },
  {
    "id": "0050w",
    "puzzleIndex": 49,
    "title": "Exercise 49: White to Move",
    "fen": "5rk1/1p2p2p/p2p4/2pPb2R/2P1P3/1P1BKPrR/8/8 w - - 5 31",
    "solution": [
      "Rxg3+",
      "Bxg3",
      "Rg5+",
      "Kf7",
      "Rxg3"
    ],
    "solutionUci": [
      "h3g3",
      "e5g3",
      "h5g5",
      "g8f7",
      "g5g3"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Fork, Long Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1120,
    "themes": "crushing endgame fork long",
    "preMove": "g7g3",
    "preMoveFen": "5rk1/1p2p1rp/p2p4/2pPb2R/2P1P3/1P1BKP1R/8/8 b - - 4 30"
  },
  {
    "id": "005Ep",
    "puzzleIndex": 50,
    "title": "Exercise 50: White to Move",
    "fen": "5kr1/ppR3p1/3R3p/1n6/1r6/8/1P3PPP/2K5 w - - 5 32",
    "solution": [
      "Rd8#"
    ],
    "solutionUci": [
      "d6d8"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 712,
    "themes": "endgame mate mateIn1 oneMove",
    "preMove": "d4b5",
    "preMoveFen": "5kr1/ppR3p1/3R3p/8/1r1n4/8/1P3PPP/2K5 b - - 4 31"
  },
  {
    "id": "005N7",
    "puzzleIndex": 51,
    "title": "Exercise 51: White to Move",
    "fen": "r6k/2q3pp/8/2p5/R1np4/7P/2PB1PP1/6K1 w - - 0 33",
    "solution": [
      "Rxa8+",
      "Qb8",
      "Rxb8#"
    ],
    "solutionUci": [
      "a4a8",
      "c7b8",
      "a8b8"
    ],
    "description": "White to move. Themes: Back-Rank Mate, Endgame, Hanging Piece, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 683,
    "themes": "backRankMate endgame hangingPiece mate mateIn2 short",
    "preMove": "e5c4",
    "preMoveFen": "r6k/2q3pp/8/2p1n3/R1Qp4/7P/2PB1PP1/6K1 b - - 0 32"
  },
  {
    "id": "005nD",
    "puzzleIndex": 52,
    "title": "Exercise 52: White to Move",
    "fen": "3rk2r/2qn2p1/p1Q1p3/3n3p/8/8/PP4PP/5R1K w k - 0 24",
    "solution": [
      "Qxe6+",
      "Ne7",
      "Qf7#"
    ],
    "solutionUci": [
      "c6e6",
      "d5e7",
      "e6f7"
    ],
    "description": "White to move. Themes: Fork, Checkmate, Mate in 2, Middlegame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1151,
    "themes": "fork mate mateIn2 middlegame short",
    "preMove": "f7e6",
    "preMoveFen": "3rk2r/2qn1pp1/p1Q1R3/3n3p/8/8/PP4PP/5R1K b k - 0 23"
  },
  {
    "id": "005wJ",
    "puzzleIndex": 53,
    "title": "Exercise 53: Black to Move",
    "fen": "r3kb1r/ppqN1ppp/4pn2/1Q3b2/3P4/8/PP2PPPP/RNB1KB1R b KQkq - 0 9",
    "solution": [
      "Qxc1#"
    ],
    "solutionUci": [
      "c7c1"
    ],
    "description": "Black to move. Themes: Hanging Piece, Checkmate, Mate in 1, One-Move Tactic, Opening",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1364,
    "themes": "hangingPiece mate mateIn1 oneMove opening",
    "preMove": "e5d7",
    "preMoveFen": "r3kb1r/ppqn1ppp/4pn2/1Q2Nb2/3P4/8/PP2PPPP/RNB1KB1R w KQkq - 4 9"
  },
  {
    "id": "005x9",
    "puzzleIndex": 54,
    "title": "Exercise 54: Black to Move",
    "fen": "r1b1kb1Q/ppp4p/6pB/3P4/2pn4/8/PPP1qPPP/RNK4R b q - 3 13",
    "solution": [
      "Qxc2#"
    ],
    "solutionUci": [
      "e2c2"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic, QueensideAttack",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 826,
    "themes": "mate mateIn1 middlegame oneMove queensideAttack",
    "preMove": "d1c1",
    "preMoveFen": "r1b1kb1Q/ppp4p/6pB/3P4/2pn4/8/PPP1qPPP/RN1K3R w q - 2 13"
  },
  {
    "id": "00656",
    "puzzleIndex": 55,
    "title": "Exercise 55: Black to Move",
    "fen": "7r/ppp2kp1/2nb1pp1/3p3r/3P2P1/2PQB3/PP3PP1/R3R1K1 b - - 0 18",
    "solution": [
      "Rh1#"
    ],
    "solutionUci": [
      "h5h1"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 665,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "h3g4",
    "preMoveFen": "7r/ppp2kp1/2nb1pp1/3p3r/3P2q1/2PQB2P/PP3PP1/R3R1K1 w - - 0 18"
  },
  {
    "id": "006HV",
    "puzzleIndex": 56,
    "title": "Exercise 56: Black to Move",
    "fen": "1r6/5k2/2Q1pNp1/p5Pp/1p2P2P/2P4R/KP3P2/3q4 b - - 0 31",
    "solution": [
      "b3+",
      "Ka3",
      "Qa1#"
    ],
    "solutionUci": [
      "b4b3",
      "a2a3",
      "d1a1"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1112,
    "themes": "endgame mate mateIn2 short",
    "preMove": "c4c6",
    "preMoveFen": "1r6/5k2/2p1pNp1/p5Pp/1pQ1P2P/2P4R/KP3P2/3q4 w - - 4 31"
  },
  {
    "id": "006OI",
    "puzzleIndex": 57,
    "title": "Exercise 57: Black to Move",
    "fen": "6R1/p7/5k2/P7/6KP/8/8/5r2 b - - 6 53",
    "solution": [
      "Rg1+",
      "Kf4",
      "Rxg8"
    ],
    "solutionUci": [
      "f1g1",
      "g4f4",
      "g1g8"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Rook Endgame, Short Tactic, Skewer",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 843,
    "themes": "crushing endgame rookEndgame short skewer",
    "preMove": "g5g8",
    "preMoveFen": "8/p7/5k2/P5R1/6KP/8/8/5r2 w - - 5 53"
  },
  {
    "id": "006cZ",
    "puzzleIndex": 58,
    "title": "Exercise 58: White to Move",
    "fen": "3r1r1k/1p4p1/p1p3Qp/2q5/8/3n1N1P/PP1R2P1/5R1K w - - 8 29",
    "solution": [
      "Rxd3",
      "Rxd3",
      "Qxd3"
    ],
    "solutionUci": [
      "d2d3",
      "d8d3",
      "g6d3"
    ],
    "description": "White to move. Themes: Decisive Advantage, Master, MasterVsMaster, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1374,
    "themes": "advantage master masterVsMaster middlegame short",
    "preMove": "g8h8",
    "preMoveFen": "3r1rk1/1p4p1/p1p3Qp/2q5/8/3n1N1P/PP1R2P1/5R1K b - - 7 28"
  },
  {
    "id": "006yP",
    "puzzleIndex": 59,
    "title": "Exercise 59: White to Move",
    "fen": "6R1/8/Kpk1p3/1p1pP3/6P1/PPr5/8/8 w - - 0 41",
    "solution": [
      "Rc8+",
      "Kd7",
      "Rxc3"
    ],
    "solutionUci": [
      "g8c8",
      "c6d7",
      "c8c3"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Master, Rook Endgame, Short Tactic, Skewer",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 819,
    "themes": "crushing endgame master rookEndgame short skewer",
    "preMove": "e3c3",
    "preMoveFen": "6R1/8/Kpk1p3/1p1pP3/6P1/PPP1r3/8/8 b - - 3 40"
  },
  {
    "id": "0071K",
    "puzzleIndex": 60,
    "title": "Exercise 60: Black to Move",
    "fen": "3N1r2/R7/kp6/p2pPp1Q/2pP2P1/2q5/2P5/2K5 b - - 1 38",
    "solution": [
      "Kxa7",
      "Qh7+",
      "Ka6"
    ],
    "solutionUci": [
      "a6a7",
      "h5h7",
      "a7a6"
    ],
    "description": "Black to move. Themes: Crushing Advantage, DefensiveMove, Endgame, Hanging Piece, Short Tactic",
    "hint": "Look for undefended or hanging material!",
    "rating": 1162,
    "themes": "crushing defensiveMove endgame hangingPiece short",
    "preMove": "g7a7",
    "preMoveFen": "3N1r2/6R1/kp6/p2pPp1Q/2pP2P1/2q5/2P5/2K5 w - - 0 38"
  },
  {
    "id": "00761",
    "puzzleIndex": 61,
    "title": "Exercise 61: White to Move",
    "fen": "3r2k1/1b4bR/p2P2p1/3p2N1/2p5/2P2N2/PP6/2K5 w - - 0 29",
    "solution": [
      "Rxg7+",
      "Kxg7",
      "Ne6+",
      "Kg8",
      "Nxd8"
    ],
    "solutionUci": [
      "h7g7",
      "g8g7",
      "g5e6",
      "g7g8",
      "e6d8"
    ],
    "description": "White to move. Themes: Attraction Sacrifice, Crushing Advantage, Endgame, ExposedKing, Fork, Long Tactic, Tactical Sacrifice",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1379,
    "themes": "attraction crushing endgame exposedKing fork long sacrifice",
    "preMove": "f7g6",
    "preMoveFen": "3r2k1/1b3pbR/p2P2P1/3p2N1/2p5/2P2N2/PP6/2K5 b - - 0 28"
  },
  {
    "id": "007AH",
    "puzzleIndex": 62,
    "title": "Exercise 62: Black to Move",
    "fen": "3r1n2/1bp1bkpp/p1q2n2/1p6/3P4/P1N3B1/1PP1QPPP/R3R1K1 b - - 6 18",
    "solution": [
      "Qxg2#"
    ],
    "solutionUci": [
      "c6g2"
    ],
    "description": "Black to move. Themes: KingsideAttack, Master, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 675,
    "themes": "kingsideAttack master mate mateIn1 middlegame oneMove",
    "preMove": "d1e2",
    "preMoveFen": "3r1n2/1bp1bkpp/p1q2n2/1p6/3P4/P1N3B1/1PP2PPP/R2QR1K1 w - - 5 18"
  },
  {
    "id": "007QU",
    "puzzleIndex": 63,
    "title": "Exercise 63: White to Move",
    "fen": "2rq1rk1/1b5p/p3p3/1p1pBpp1/2nP2N1/1RP1PP2/P1Q3PP/3R2K1 w - - 0 23",
    "solution": [
      "Nh6#"
    ],
    "solutionUci": [
      "g4h6"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1144,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "f7f5",
    "preMoveFen": "2rq1rk1/1b3p1p/p3p3/1p1pB1p1/2nP2N1/1RP1PP2/P1Q3PP/3R2K1 b - - 1 22"
  },
  {
    "id": "007Rn",
    "puzzleIndex": 64,
    "title": "Exercise 64: Black to Move",
    "fen": "4r1k1/p4p1p/1p6/6B1/3P2n1/P4Q2/1P4P1/7K b - - 0 34",
    "solution": [
      "Re1+",
      "Qf1",
      "Rxf1#"
    ],
    "solutionUci": [
      "e8e1",
      "f3f1",
      "e1f1"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 990,
    "themes": "endgame mate mateIn2 short",
    "preMove": "d2g5",
    "preMoveFen": "4r1k1/p4p1p/1p6/6q1/3P2n1/P4Q2/1P1B2P1/7K w - - 0 34"
  },
  {
    "id": "007bH",
    "puzzleIndex": 65,
    "title": "Exercise 65: White to Move",
    "fen": "r2q1rk1/2p3pn/2pbp2p/p2p1p2/P4PQ1/1P1PP3/1BPN2PP/4RR1K w - - 0 16",
    "solution": [
      "Qxg7#"
    ],
    "solutionUci": [
      "g4g7"
    ],
    "description": "White to move. Themes: KingsideAttack, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 963,
    "themes": "kingsideAttack mate mateIn1 middlegame oneMove",
    "preMove": "f7f5",
    "preMoveFen": "r2q1rk1/2p2ppn/2pbp2p/p2p4/P4PQ1/1P1PP3/1BPN2PP/4RR1K b - - 4 15"
  },
  {
    "id": "007eS",
    "puzzleIndex": 66,
    "title": "Exercise 66: Black to Move",
    "fen": "6k1/p4p2/1p5p/4r3/P3B3/1P2KP2/2P3PP/8 b - - 1 29",
    "solution": [
      "f5",
      "g4",
      "fxe4"
    ],
    "solutionUci": [
      "f7f5",
      "g2g4",
      "f5e4"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1164,
    "themes": "advantage endgame short",
    "preMove": "d2e3",
    "preMoveFen": "6k1/p4p2/1p5p/4r3/P3B3/1P3P2/2PK2PP/8 w - - 0 29"
  },
  {
    "id": "007hv",
    "puzzleIndex": 67,
    "title": "Exercise 67: Black to Move",
    "fen": "6k1/5p1p/1p4p1/p1bN1p2/2Pq1P2/1PQ4P/1P4P1/7K b - - 2 32",
    "solution": [
      "Qg1#"
    ],
    "solutionUci": [
      "d4g1"
    ],
    "description": "Black to move. Themes: Endgame, Master, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1069,
    "themes": "endgame master mate mateIn1 oneMove",
    "preMove": "d2c3",
    "preMoveFen": "6k1/5p1p/1p4p1/p1bN1p2/2Pq1P2/1P5P/1P1Q2P1/7K w - - 1 32"
  },
  {
    "id": "007mr",
    "puzzleIndex": 68,
    "title": "Exercise 68: Black to Move",
    "fen": "5k2/p2r3p/1p4pP/3r1q2/4R3/2P5/PP3PQ1/K3R3 b - - 0 33",
    "solution": [
      "Rd1+",
      "Rxd1",
      "Rxd1#"
    ],
    "solutionUci": [
      "d5d1",
      "e1d1",
      "d7d1"
    ],
    "description": "Black to move. Themes: Back-Rank Mate, Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 628,
    "themes": "backRankMate endgame mate mateIn2 short",
    "preMove": "d4e4",
    "preMoveFen": "5k2/p2r3p/1p4pP/3r1q2/3Rp3/2P5/PP3PQ1/K3R3 w - - 0 33"
  },
  {
    "id": "007tv",
    "puzzleIndex": 69,
    "title": "Exercise 69: White to Move",
    "fen": "r3k1nr/1pp2ppp/1pnp4/4p1q1/2B1P3/3P1Q1P/PPP2PP1/R4RK1 w kq - 0 12",
    "solution": [
      "Qxf7+",
      "Kd8",
      "Qf8+",
      "Kd7",
      "Qxa8"
    ],
    "solutionUci": [
      "f3f7",
      "e8d8",
      "f7f8",
      "d8d7",
      "f8a8"
    ],
    "description": "White to move. Themes: Decisive Advantage, AttackingF2F7, Long Tactic, Middlegame, Skewer",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1116,
    "themes": "advantage attackingF2F7 long middlegame skewer",
    "preMove": "g6g5",
    "preMoveFen": "r3k1nr/1pp2ppp/1pnp2q1/4p1B1/2B1P3/3P1Q1P/PPP2PP1/R4RK1 b kq - 0 11"
  },
  {
    "id": "0082f",
    "puzzleIndex": 70,
    "title": "Exercise 70: White to Move",
    "fen": "r4rk1/2q2ppp/3pp3/4Pb1N/1p6/1p4Q1/PPP3PP/1K1RR3 w - - 0 22",
    "solution": [
      "Qxg7#"
    ],
    "solutionUci": [
      "g3g7"
    ],
    "description": "White to move. Themes: KingsideAttack, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 864,
    "themes": "kingsideAttack mate mateIn1 middlegame oneMove",
    "preMove": "a4b3",
    "preMoveFen": "r4rk1/2q2ppp/3pp3/4Pb1N/pp6/1B4Q1/PPP3PP/1K1RR3 b - - 0 21"
  },
  {
    "id": "0088O",
    "puzzleIndex": 71,
    "title": "Exercise 71: White to Move",
    "fen": "7Q/2p5/1p2prp1/p4k1p/q4p1P/8/6RK/8 w - - 0 38",
    "solution": [
      "Rg5+",
      "Ke4",
      "Qxf6"
    ],
    "solutionUci": [
      "g2g5",
      "f5e4",
      "h8f6"
    ],
    "description": "White to move. Themes: Crushing Advantage, Deflection, Endgame, Short Tactic",
    "hint": "Deflect the key defender away from its crucial post!",
    "rating": 1118,
    "themes": "crushing deflection endgame short",
    "preMove": "d1a4",
    "preMoveFen": "7Q/2p5/1p2prp1/p4k1p/P4p1P/8/6RK/3q4 b - - 2 37"
  },
  {
    "id": "008GK",
    "puzzleIndex": 72,
    "title": "Exercise 72: White to Move",
    "fen": "1k6/ppp3p1/8/1P5p/8/P3n2P/2P1r1P1/B2rNRK1 w - - 5 32",
    "solution": [
      "Rf8+",
      "Rd8",
      "Rxd8#"
    ],
    "solutionUci": [
      "f1f8",
      "d1d8",
      "f8d8"
    ],
    "description": "White to move. Themes: Back-Rank Mate, Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 651,
    "themes": "backRankMate endgame mate mateIn2 short",
    "preMove": "d8d1",
    "preMoveFen": "1k1r4/ppp3p1/8/1P5p/8/P3n2P/2P1r1P1/B3NRK1 b - - 4 31"
  },
  {
    "id": "008P4",
    "puzzleIndex": 73,
    "title": "Exercise 73: Black to Move",
    "fen": "8/4k3/1p1p4/rP2p1p1/P2nP1P1/3B4/3K4/R7 b - - 1 35",
    "solution": [
      "Nb3+",
      "Kc3",
      "Nxa1"
    ],
    "solutionUci": [
      "d4b3",
      "d2c3",
      "b3a1"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 699,
    "themes": "crushing endgame fork short",
    "preMove": "e3d2",
    "preMoveFen": "8/4k3/1p1p4/rP2p1p1/P2nP1P1/3BK3/8/R7 w - - 0 35"
  },
  {
    "id": "008Y3",
    "puzzleIndex": 74,
    "title": "Exercise 74: White to Move",
    "fen": "r5k1/1p1r1pp1/p3pnp1/2qN4/8/1Q5P/PP3PP1/3RR1K1 w - - 0 25",
    "solution": [
      "Nxf6+",
      "gxf6",
      "Rxd7"
    ],
    "solutionUci": [
      "d5f6",
      "g7f6",
      "d1d7"
    ],
    "description": "White to move. Themes: Decisive Advantage, Discovered Attack, KingsideAttack, Master, Middlegame, Short Tactic",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 1110,
    "themes": "advantage discoveredAttack kingsideAttack master middlegame short",
    "preMove": "e7c5",
    "preMoveFen": "r5k1/1p1rqpp1/p3pnp1/2PN4/8/1Q5P/PP3PP1/3RR1K1 b - - 0 24"
  },
  {
    "id": "008cl",
    "puzzleIndex": 75,
    "title": "Exercise 75: Black to Move",
    "fen": "r3k2r/ppp2p1p/2n1pp2/7q/2PN2P1/2BP2b1/PP2B1P1/R2Q1RK1 b kq - 0 16",
    "solution": [
      "Qh2#"
    ],
    "solutionUci": [
      "h5h2"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 858,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "f3g4",
    "preMoveFen": "r3k2r/ppp2p1p/2n1pp2/7q/2PN2b1/2BP1Pb1/PP2B1P1/R2Q1RK1 w kq - 1 16"
  },
  {
    "id": "008rw",
    "puzzleIndex": 76,
    "title": "Exercise 76: White to Move",
    "fen": "rn2kb1r/pp2pp1p/2p2np1/4q3/8/2N4Q/PPPPBPPP/R1B1K2R w KQkq - 0 9",
    "solution": [
      "Qc8#"
    ],
    "solutionUci": [
      "h3c8"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 1, One-Move Tactic, Opening",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 926,
    "themes": "mate mateIn1 oneMove opening",
    "preMove": "g7g6",
    "preMoveFen": "rn2kb1r/pp2pppp/2p2n2/4q3/8/2N4Q/PPPPBPPP/R1B1K2R b KQkq - 2 8"
  },
  {
    "id": "008tL",
    "puzzleIndex": 77,
    "title": "Exercise 77: Black to Move",
    "fen": "8/7k/R6p/3p4/5r2/2P1p2P/P5P1/6K1 b - - 0 40",
    "solution": [
      "e2",
      "Re6",
      "Rf1+"
    ],
    "solutionUci": [
      "e3e2",
      "a6e6",
      "f4f1"
    ],
    "description": "Black to move. Themes: AdvancedPawn, Crushing Advantage, Endgame, Master, Rook Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1105,
    "themes": "advancedPawn crushing endgame master rookEndgame short",
    "preMove": "b6a6",
    "preMoveFen": "8/7k/pR5p/3p4/5r2/2P1p2P/P5P1/6K1 w - - 0 40"
  },
  {
    "id": "0092z",
    "puzzleIndex": 78,
    "title": "Exercise 78: White to Move",
    "fen": "2r3k1/3R1ppp/p1q5/2p2Q2/P7/7P/5PP1/6K1 w - - 4 27",
    "solution": [
      "Qxf7+",
      "Kh8",
      "Qxg7#"
    ],
    "solutionUci": [
      "f5f7",
      "g8h8",
      "f7g7"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 991,
    "themes": "endgame mate mateIn2 short",
    "preMove": "c7c6",
    "preMoveFen": "2r3k1/2qR1ppp/p7/2p2Q2/P7/7P/5PP1/6K1 b - - 3 26"
  },
  {
    "id": "009FP",
    "puzzleIndex": 79,
    "title": "Exercise 79: White to Move",
    "fen": "r1b1k1nr/ppp2pbp/3p1qp1/4p3/2BnP3/N2P2QP/PPP2PP1/R1B1K2R w KQkq - 0 10",
    "solution": [
      "Bg5",
      "Qxg5",
      "Qxg5"
    ],
    "solutionUci": [
      "c1g5",
      "f6g5",
      "g3g5"
    ],
    "description": "White to move. Themes: Decisive Advantage, Opening, Short Tactic, Trapped Piece",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1235,
    "themes": "advantage opening short trappedPiece",
    "preMove": "e6e5",
    "preMoveFen": "r1b1k1nr/ppp2pbp/3ppqp1/8/2BnP3/N2P2QP/PPP2PP1/R1B1K2R b KQkq - 4 9"
  },
  {
    "id": "009IO",
    "puzzleIndex": 80,
    "title": "Exercise 80: White to Move",
    "fen": "3r4/4kp1r/p2Np1p1/3bP3/P2n4/8/1P3RPP/5RK1 w - - 5 26",
    "solution": [
      "Rxf7+",
      "Rxf7",
      "Rxf7#"
    ],
    "solutionUci": [
      "f2f7",
      "h7f7",
      "f1f7"
    ],
    "description": "White to move. Themes: Hook Mate, Checkmate, Mate in 2, Middlegame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1178,
    "themes": "hookMate mate mateIn2 middlegame short",
    "preMove": "e8e7",
    "preMoveFen": "3rk3/5p1r/p2Np1p1/3bP3/P2n4/8/1P3RPP/5RK1 b - - 4 25"
  },
  {
    "id": "009J1",
    "puzzleIndex": 81,
    "title": "Exercise 81: White to Move",
    "fen": "rn3k1r/pp2bp1p/2p1pNp1/6B1/5P2/7P/PPP4P/2K1RR2 w - - 4 18",
    "solution": [
      "Bh6#"
    ],
    "solutionUci": [
      "g5h6"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1288,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "e8f8",
    "preMoveFen": "rn2k2r/pp2bp1p/2p1pNp1/6B1/5P2/7P/PPP4P/2K1RR2 b - - 3 17"
  },
  {
    "id": "009Os",
    "puzzleIndex": 82,
    "title": "Exercise 82: Black to Move",
    "fen": "r2b2k1/1p3q1p/p2p4/3P2p1/2P1PR1r/6Q1/P2B3P/2R4K b - - 2 29",
    "solution": [
      "Rxf4",
      "Bxf4",
      "Qxf4",
      "Qxf4",
      "gxf4"
    ],
    "solutionUci": [
      "h4f4",
      "d2f4",
      "f7f4",
      "g3f4",
      "g5f4"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1390,
    "themes": "crushing long middlegame",
    "preMove": "g4g3",
    "preMoveFen": "r2b2k1/1p3q1p/p2p4/3P2p1/2P1PRQr/8/P2B3P/2R4K w - - 1 29"
  },
  {
    "id": "009Wc",
    "puzzleIndex": 83,
    "title": "Exercise 83: Black to Move",
    "fen": "1r3rk1/1pqN1pbp/p1p1pnp1/2N5/3P4/1QP5/PP3PPP/3RR1K1 b - - 3 19",
    "solution": [
      "Nxd7",
      "Nxd7",
      "Qxd7"
    ],
    "solutionUci": [
      "f6d7",
      "c5d7",
      "c7d7"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1157,
    "themes": "crushing middlegame short",
    "preMove": "e5d7",
    "preMoveFen": "1r3rk1/1pq2pbp/p1p1pnp1/2N1N3/3P4/1QP5/PP3PPP/3RR1K1 w - - 2 19"
  },
  {
    "id": "009bR",
    "puzzleIndex": 84,
    "title": "Exercise 84: White to Move",
    "fen": "4r2k/3q3r/1p4pQ/p1pP4/2P4P/1N4p1/PP3RK1/8 w - - 2 38",
    "solution": [
      "Rf8+",
      "Rxf8",
      "Qxf8#"
    ],
    "solutionUci": [
      "f2f8",
      "e8f8",
      "h6f8"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1024,
    "themes": "endgame mate mateIn2 short",
    "preMove": "g7h7",
    "preMoveFen": "4r2k/3q2r1/1p4pQ/p1pP4/2P4P/1N4p1/PP3RK1/8 b - - 1 37"
  },
  {
    "id": "009eX",
    "puzzleIndex": 85,
    "title": "Exercise 85: Black to Move",
    "fen": "2r3k1/7p/6q1/p1Np4/Qp2pr2/P4P2/1PR2P1K/6R1 b - - 1 36",
    "solution": [
      "Rh4#"
    ],
    "solutionUci": [
      "f4h4"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 909,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "f1g1",
    "preMoveFen": "2r3k1/7p/6q1/p1Np4/Qp2pr2/P4P2/1PR2P1K/5R2 w - - 0 36"
  },
  {
    "id": "009f8",
    "puzzleIndex": 86,
    "title": "Exercise 86: White to Move",
    "fen": "8/1p4p1/pb2pp1p/3n1k2/3P4/P3BN1P/1P2KPP1/8 w - - 1 27",
    "solution": [
      "Nh4+",
      "Ke4",
      "f3#"
    ],
    "solutionUci": [
      "f3h4",
      "f5e4",
      "f2f3"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1149,
    "themes": "endgame mate mateIn2 short",
    "preMove": "g6f5",
    "preMoveFen": "8/1p4p1/pb2ppkp/3n4/3P4/P3BN1P/1P2KPP1/8 b - - 0 26"
  },
  {
    "id": "009fH",
    "puzzleIndex": 87,
    "title": "Exercise 87: Black to Move",
    "fen": "rn2kb1r/pQ2pppp/2p2n2/8/3q2b1/8/PPP2PPP/RNB1KBNR b KQkq - 0 7",
    "solution": [
      "Qd1#"
    ],
    "solutionUci": [
      "d4d1"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 1, One-Move Tactic, Opening",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 750,
    "themes": "mate mateIn1 oneMove opening",
    "preMove": "b3b7",
    "preMoveFen": "rn2kb1r/pp2pppp/2p2n2/8/3q2b1/1Q6/PPP2PPP/RNB1KBNR w KQkq - 0 7"
  },
  {
    "id": "009lk",
    "puzzleIndex": 88,
    "title": "Exercise 88: Black to Move",
    "fen": "1R6/6pk/2p4p/3bP2r/5B1P/2P1RqP1/P4P1Q/6K1 b - - 3 40",
    "solution": [
      "Qd1+",
      "Re1",
      "Qxe1#"
    ],
    "solutionUci": [
      "f3d1",
      "e3e1",
      "d1e1"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 2, Middlegame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 915,
    "themes": "mate mateIn2 middlegame short",
    "preMove": "e1e3",
    "preMoveFen": "1R6/6pk/2p4p/3bP2r/5B1P/2P2qP1/P4P1Q/4R1K1 w - - 2 40"
  },
  {
    "id": "009oc",
    "puzzleIndex": 89,
    "title": "Exercise 89: White to Move",
    "fen": "5Q2/pbp3np/1p1pq1pk/1P6/P6P/6K1/8/8 w - - 0 33",
    "solution": [
      "Qf4+",
      "g5",
      "Qxg5#"
    ],
    "solutionUci": [
      "f8f4",
      "g6g5",
      "f4g5"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1193,
    "themes": "endgame mate mateIn2 short",
    "preMove": "e4e6",
    "preMoveFen": "5Q2/pbp3np/1p1pB1pk/1P6/P3q2P/6K1/8/8 b - - 1 32"
  },
  {
    "id": "009tE",
    "puzzleIndex": 90,
    "title": "Exercise 90: White to Move",
    "fen": "6k1/6pp/p1N5/1pP2bp1/5P2/8/PPP5/3K4 w - - 0 29",
    "solution": [
      "Ne7+",
      "Kf7",
      "Nxf5"
    ],
    "solutionUci": [
      "c6e7",
      "g8f7",
      "e7f5"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 624,
    "themes": "crushing endgame fork short",
    "preMove": "f6g5",
    "preMoveFen": "6k1/6pp/p1N2p2/1pP2bP1/5P2/8/PPP5/3K4 b - - 1 28"
  },
  {
    "id": "009uB",
    "puzzleIndex": 91,
    "title": "Exercise 91: White to Move",
    "fen": "3br1kr/7p/4p1pQ/P5P1/1B5P/P6q/5R2/6K1 w - - 2 36",
    "solution": [
      "Rf8+",
      "Rxf8",
      "Qxf8#"
    ],
    "solutionUci": [
      "f2f8",
      "e8f8",
      "h6f8"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 2, Middlegame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1145,
    "themes": "mate mateIn2 middlegame short",
    "preMove": "f7g8",
    "preMoveFen": "3br2r/5k1p/4p1pQ/P5P1/1B5P/P6q/5R2/6K1 b - - 1 35"
  },
  {
    "id": "009wR",
    "puzzleIndex": 92,
    "title": "Exercise 92: Black to Move",
    "fen": "1R2R3/p7/1p1k3p/1Pb5/P5p1/6P1/5r1P/7K b - - 7 41",
    "solution": [
      "Rf1+",
      "Kg2",
      "Rg1#"
    ],
    "solutionUci": [
      "f2f1",
      "h1g2",
      "f1g1"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 2, Opera Mate, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1250,
    "themes": "endgame mate mateIn2 operaMate short",
    "preMove": "g2h1",
    "preMoveFen": "1R2R3/p7/1p1k3p/1Pb5/P5p1/6P1/5rKP/8 w - - 6 41"
  },
  {
    "id": "00A5v",
    "puzzleIndex": 93,
    "title": "Exercise 93: Black to Move",
    "fen": "4r1k1/pp1qr1p1/7p/2pPR3/2P2p2/1P3P2/P2Q2PP/4R1K1 b - - 4 33",
    "solution": [
      "Rxe5",
      "Rxe5",
      "Rxe5"
    ],
    "solutionUci": [
      "e7e5",
      "e1e5",
      "e8e5"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 876,
    "themes": "crushing endgame short",
    "preMove": "c3d2",
    "preMoveFen": "4r1k1/pp1qr1p1/7p/2pPR3/2P2p2/1PQ2P2/P5PP/4R1K1 w - - 3 33"
  },
  {
    "id": "00A9Q",
    "puzzleIndex": 94,
    "title": "Exercise 94: Black to Move",
    "fen": "2rq1rk1/1p3p1p/p1pn2p1/P1Np4/1P1PnP2/4P3/5PBP/R1Q3RK b - - 3 22",
    "solution": [
      "Nxf2#"
    ],
    "solutionUci": [
      "e4f2"
    ],
    "description": "Black to move. Themes: KingsideAttack, Master, Checkmate, Mate in 1, Middlegame, One-Move Tactic, Smothered Mate",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 669,
    "themes": "kingsideAttack master mate mateIn1 middlegame oneMove smotheredMate",
    "preMove": "d3c5",
    "preMoveFen": "2rq1rk1/1p3p1p/p1pn2p1/P2p4/1P1PnP2/3NP3/5PBP/R1Q3RK w - - 2 22"
  },
  {
    "id": "00AB1",
    "puzzleIndex": 95,
    "title": "Exercise 95: White to Move",
    "fen": "8/7Q/3p1kp1/1p6/2b5/2q4P/5PPK/8 w - - 0 37",
    "solution": [
      "Qh8+",
      "Ke6",
      "Qxc3"
    ],
    "solutionUci": [
      "h7h8",
      "f6e6",
      "h8c3"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Short Tactic, Skewer",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1133,
    "themes": "crushing endgame short skewer",
    "preMove": "e1c3",
    "preMoveFen": "8/7Q/3p1kp1/1p6/2b5/2P4P/5PPK/4q3 b - - 8 36"
  },
  {
    "id": "00AGs",
    "puzzleIndex": 96,
    "title": "Exercise 96: White to Move",
    "fen": "rn5Q/4kp2/2p1p1r1/1q4p1/8/8/4NPPP/3R1K1R w - - 6 24",
    "solution": [
      "Qd8#"
    ],
    "solutionUci": [
      "h8d8"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 898,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "e8e7",
    "preMoveFen": "rn2k2Q/5p2/2p1p1r1/1q4p1/8/8/4NPPP/3R1K1R b q - 5 23"
  },
  {
    "id": "00AHY",
    "puzzleIndex": 97,
    "title": "Exercise 97: Black to Move",
    "fen": "r6k/3NR1p1/4n2p/5b1P/p7/6R1/8/6K1 b - - 0 43",
    "solution": [
      "a3",
      "Rxa3",
      "Rxa3",
      "Re8+",
      "Kh7"
    ],
    "solutionUci": [
      "a4a3",
      "g3a3",
      "a8a3",
      "e7e8",
      "h8h7"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, Long Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1356,
    "themes": "advantage endgame long",
    "preMove": "h4h5",
    "preMoveFen": "r6k/3NR1p1/4n2p/5b2/p6P/6R1/8/6K1 w - - 2 43"
  },
  {
    "id": "00AOH",
    "puzzleIndex": 98,
    "title": "Exercise 98: Black to Move",
    "fen": "6k1/8/1R2p1pp/4P3/p1N2P2/6PK/7P/1r6 b - - 0 48",
    "solution": [
      "Rxb6",
      "Nxb6",
      "a3",
      "Nd7",
      "a2"
    ],
    "solutionUci": [
      "b1b6",
      "c4b6",
      "a4a3",
      "b6d7",
      "a3a2"
    ],
    "description": "Black to move. Themes: AdvancedPawn, Decisive Advantage, Endgame, Long Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 866,
    "themes": "advancedPawn advantage endgame long",
    "preMove": "b7b6",
    "preMoveFen": "6k1/1R6/1p2p1pp/4P3/p1N2P2/6PK/7P/1r6 w - - 0 48"
  },
  {
    "id": "00Aae",
    "puzzleIndex": 99,
    "title": "Exercise 99: White to Move",
    "fen": "1R6/1P6/4pkp1/5p2/3P4/3KP2p/8/1r6 w - - 0 44",
    "solution": [
      "Rf8+",
      "Ke7",
      "b8=Q",
      "Rxb8",
      "Rxb8"
    ],
    "solutionUci": [
      "b8f8",
      "f6e7",
      "b7b8q",
      "b1b8",
      "f8b8"
    ],
    "description": "White to move. Themes: AdvancedPawn, Clearance Sacrifice, Crushing Advantage, Endgame, Long Tactic, Promotion, Rook Endgame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 971,
    "themes": "advancedPawn clearance crushing endgame long promotion rookEndgame",
    "preMove": "h4h3",
    "preMoveFen": "1R6/1P6/4pkp1/5p2/3P3p/3KP3/8/1r6 b - - 0 43"
  },
  {
    "id": "00Aas",
    "puzzleIndex": 100,
    "title": "Exercise 100: Black to Move",
    "fen": "3r1rk1/1p2q1pp/5p2/8/1P1n4/6Q1/PPBB1PPP/R4RK1 b - - 0 20",
    "solution": [
      "Ne2+",
      "Kh1",
      "Nxg3+",
      "fxg3",
      "Rxd2"
    ],
    "solutionUci": [
      "d4e2",
      "g1h1",
      "e2g3",
      "f2g3",
      "d8d2"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Fork, Long Tactic, Middlegame",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1145,
    "themes": "crushing fork long middlegame",
    "preMove": "d1c2",
    "preMoveFen": "3r1rk1/1p2q1pp/5p2/8/1P1n4/6Q1/PPbB1PPP/R2B1RK1 w - - 9 20"
  },
  {
    "id": "00AbP",
    "puzzleIndex": 101,
    "title": "Exercise 101: White to Move",
    "fen": "6k1/pp3pp1/2p5/7b/4r2P/2P2N2/PP4K1/3R4 w - - 0 25",
    "solution": [
      "Rd8+",
      "Kh7",
      "Ng5+"
    ],
    "solutionUci": [
      "d1d8",
      "g8h7",
      "f3g5"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 804,
    "themes": "crushing endgame short",
    "preMove": "e8e4",
    "preMoveFen": "4r1k1/pp3pp1/2p5/7b/4P2P/2P2N2/PP4K1/3R4 b - - 0 24"
  },
  {
    "id": "00AdI",
    "puzzleIndex": 102,
    "title": "Exercise 102: Black to Move",
    "fen": "3r4/4kp1p/1PQ1p1p1/p3b3/1p2P2P/1P5K/6P1/8 b - - 2 36",
    "solution": [
      "Rd3+",
      "g3",
      "Rxg3+",
      "Kh2",
      "Rc3+"
    ],
    "solutionUci": [
      "d8d3",
      "g2g3",
      "d3g3",
      "h3h2",
      "g3c3"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Discovered Attack, DiscoveredCheck, Endgame, Long Tactic, Master",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 1284,
    "themes": "crushing discoveredAttack discoveredCheck endgame long master",
    "preMove": "h2h3",
    "preMoveFen": "3r4/4kp1p/1PQ1p1p1/p3b3/1p2P2P/1P6/6PK/8 w - - 1 36"
  },
  {
    "id": "00Af3",
    "puzzleIndex": 103,
    "title": "Exercise 103: White to Move",
    "fen": "8/8/2B2p1p/P4Pp1/3p2P1/1b1Pb1kP/8/4K3 w - - 1 51",
    "solution": [
      "a6",
      "Bc4",
      "a7"
    ],
    "solutionUci": [
      "a5a6",
      "b3c4",
      "a6a7"
    ],
    "description": "White to move. Themes: AdvancedPawn, Bishop Endgame, Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1172,
    "themes": "advancedPawn bishopEndgame crushing endgame short",
    "preMove": "f4g3",
    "preMoveFen": "8/8/2B2p1p/P4Pp1/3p1kP1/1b1Pb2P/8/4K3 b - - 0 50"
  },
  {
    "id": "00AfZ",
    "puzzleIndex": 104,
    "title": "Exercise 104: White to Move",
    "fen": "2r3kq/Q7/8/1brpN3/5Pp1/4P1P1/6K1/1B6 w - - 0 44",
    "solution": [
      "Qf7#"
    ],
    "solutionUci": [
      "a7f7"
    ],
    "description": "White to move. Themes: Master, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 972,
    "themes": "master mate mateIn1 middlegame oneMove",
    "preMove": "f6h8",
    "preMoveFen": "2r3kR/Q7/5q2/1brpN3/5Pp1/4P1P1/6K1/1B6 b - - 2 43"
  },
  {
    "id": "00AhO",
    "puzzleIndex": 105,
    "title": "Exercise 105: Black to Move",
    "fen": "Q1b2rk1/2q2p1p/1p2pbp1/pP6/2P5/P2B1N2/5PPP/3R1RK1 b - - 0 20",
    "solution": [
      "Bb7",
      "Qa7",
      "Ra8",
      "Qxa8+",
      "Bxa8"
    ],
    "solutionUci": [
      "c8b7",
      "a8a7",
      "f8a8",
      "a7a8",
      "b7a8"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Clearance Sacrifice, Long Tactic, Master, Middlegame, Trapped Piece",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1258,
    "themes": "advantage clearance long master middlegame trappedPiece",
    "preMove": "e4a8",
    "preMoveFen": "r1b2rk1/2q2p1p/1p2pbp1/pP6/2P1Q3/P2B1N2/5PPP/3R1RK1 w - - 0 20"
  },
  {
    "id": "00Ahb",
    "puzzleIndex": 106,
    "title": "Exercise 106: White to Move",
    "fen": "1k5r/pp1r1ppp/4p2n/1Nb2q2/2Pp4/6P1/PP3P1P/R1BQR1K1 w - - 3 15",
    "solution": [
      "Bf4+",
      "Qxf4",
      "gxf4"
    ],
    "solutionUci": [
      "c1f4",
      "f5f4",
      "g3f4"
    ],
    "description": "White to move. Themes: Crushing Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1123,
    "themes": "crushing middlegame short",
    "preMove": "g8h6",
    "preMoveFen": "1k4nr/pp1r1ppp/4p3/1Nb2q2/2Pp4/6P1/PP3P1P/R1BQR1K1 b - - 2 14"
  },
  {
    "id": "00AoZ",
    "puzzleIndex": 107,
    "title": "Exercise 107: White to Move",
    "fen": "8/1R6/p1pk4/2q3bp/1QP5/P7/KP6/3r4 w - - 3 45",
    "solution": [
      "Rd7+",
      "Kxd7",
      "Qxc5"
    ],
    "solutionUci": [
      "b7d7",
      "d6d7",
      "b4c5"
    ],
    "description": "White to move. Themes: Decisive Advantage, Deflection, Endgame, Short Tactic",
    "hint": "Deflect the key defender away from its crucial post!",
    "rating": 1088,
    "themes": "advantage deflection endgame short",
    "preMove": "g1c5",
    "preMoveFen": "8/1R6/p1pk4/6bp/1QP5/P7/KP6/3r2q1 b - - 2 44"
  },
  {
    "id": "00Au2",
    "puzzleIndex": 108,
    "title": "Exercise 108: White to Move",
    "fen": "r5r1/pp1k1p2/2p5/3pQ3/3P4/2NB4/PPP2q2/1K6 w - - 2 29",
    "solution": [
      "Bf5+",
      "Qxf5",
      "Qxf5+"
    ],
    "solutionUci": [
      "d3f5",
      "f2f5",
      "e5f5"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 987,
    "themes": "advantage endgame short",
    "preMove": "e7d7",
    "preMoveFen": "r5r1/pp2kp2/2p5/3pQ3/3P4/2NB4/PPP2q2/1K6 b - - 1 28"
  },
  {
    "id": "00B8m",
    "puzzleIndex": 109,
    "title": "Exercise 109: Black to Move",
    "fen": "3b4/3P4/pp2Pk2/5Q2/P6p/8/8/7K b - - 0 43",
    "solution": [
      "Kxf5",
      "e7",
      "Bxe7",
      "d8=Q",
      "Bxd8"
    ],
    "solutionUci": [
      "f6f5",
      "e6e7",
      "d8e7",
      "d7d8q",
      "e7d8"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Hanging Piece, Long Tactic",
    "hint": "Look for undefended or hanging material!",
    "rating": 1275,
    "themes": "crushing endgame hangingPiece long",
    "preMove": "d3f5",
    "preMoveFen": "3b4/3P4/pp2Pk2/5r2/P6p/3Q4/8/7K w - - 1 43"
  },
  {
    "id": "00BCa",
    "puzzleIndex": 110,
    "title": "Exercise 110: White to Move",
    "fen": "1r6/p2kp1P1/3p4/2pP4/2P2B2/1N6/p4PK1/8 w - - 0 42",
    "solution": [
      "Nxc5+",
      "dxc5",
      "Bxb8",
      "a1=Q",
      "g8=Q"
    ],
    "solutionUci": [
      "b3c5",
      "d6c5",
      "f4b8",
      "a2a1q",
      "g7g8q"
    ],
    "description": "White to move. Themes: AdvancedPawn, Crushing Advantage, Endgame, Long Tactic, Master, Promotion",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1390,
    "themes": "advancedPawn crushing endgame long master promotion",
    "preMove": "a3a2",
    "preMoveFen": "1r6/p2kp1P1/3p4/2pP4/2P2B2/pN6/5PK1/8 b - - 1 41"
  },
  {
    "id": "00BJm",
    "puzzleIndex": 111,
    "title": "Exercise 111: White to Move",
    "fen": "r4rk1/1Q2bppp/p1N1p3/1p1q4/2pP1n2/2P5/PP3PPP/R4RK1 w - - 2 19",
    "solution": [
      "Nxe7+",
      "Kh8",
      "Nxd5"
    ],
    "solutionUci": [
      "c6e7",
      "g8h8",
      "e7d5"
    ],
    "description": "White to move. Themes: Decisive Advantage, Fork, Hanging Piece, Middlegame, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1002,
    "themes": "advantage fork hangingPiece middlegame short",
    "preMove": "d8d5",
    "preMoveFen": "r2q1rk1/1Q2bppp/p1N1p3/1p6/2pP1n2/2P5/PP3PPP/R4RK1 b - - 1 18"
  },
  {
    "id": "00BNd",
    "puzzleIndex": 112,
    "title": "Exercise 112: White to Move",
    "fen": "1rr3k1/4ppbp/3p1np1/1b1N4/P2BP3/5P2/P2R2PP/R5K1 w - - 0 22",
    "solution": [
      "Nxe7+",
      "Kf8",
      "Nxc8"
    ],
    "solutionUci": [
      "d5e7",
      "g8f8",
      "e7c8"
    ],
    "description": "White to move. Themes: Decisive Advantage, Fork, Middlegame, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1051,
    "themes": "advantage fork middlegame short",
    "preMove": "d7b5",
    "preMoveFen": "1rr3k1/3bppbp/3p1np1/1B1N4/P2BP3/5P2/P2R2PP/R5K1 b - - 0 21"
  },
  {
    "id": "00BQD",
    "puzzleIndex": 113,
    "title": "Exercise 113: Black to Move",
    "fen": "4r3/3R1pkp/6p1/1P6/1b6/5B2/1P1R1PPP/6K1 b - - 0 36",
    "solution": [
      "Re1#"
    ],
    "solutionUci": [
      "e8e1"
    ],
    "description": "Black to move. Themes: Back-Rank Mate, Endgame, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 739,
    "themes": "backRankMate endgame mate mateIn1 oneMove",
    "preMove": "d1d2",
    "preMoveFen": "4r3/3R1pkp/6p1/1P6/1b6/5B2/1P1p1PPP/3R2K1 w - - 0 36"
  },
  {
    "id": "00BSo",
    "puzzleIndex": 114,
    "title": "Exercise 114: Black to Move",
    "fen": "2r3k1/4R1pp/p1p2p2/2N5/2P5/1Pb4P/P4PP1/6K1 b - - 0 25",
    "solution": [
      "Bb4",
      "Ra7",
      "Bxc5"
    ],
    "solutionUci": [
      "c3b4",
      "e7a7",
      "b4c5"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1263,
    "themes": "advantage endgame short",
    "preMove": "d3c5",
    "preMoveFen": "2r3k1/4R1pp/p1p2p2/2p5/2P5/1PbN3P/P4PP1/6K1 w - - 0 25"
  },
  {
    "id": "00Bg4",
    "puzzleIndex": 115,
    "title": "Exercise 115: White to Move",
    "fen": "3r2k1/1q3ppp/p3p3/Qp1r4/7P/P4P2/1PP3P1/1K1R3R w - - 0 22",
    "solution": [
      "Qxd8+",
      "Rxd8",
      "Rxd8#"
    ],
    "solutionUci": [
      "a5d8",
      "d5d8",
      "d1d8"
    ],
    "description": "White to move. Themes: Back-Rank Mate, Endgame, Checkmate, Mate in 2, Short Tactic, XRayAttack",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1370,
    "themes": "backRankMate endgame mate mateIn2 short xRayAttack",
    "preMove": "d6d5",
    "preMoveFen": "3r2k1/1q3ppp/p2rp3/Qp1B4/7P/P4P2/1PP3P1/1K1R3R b - - 0 21"
  },
  {
    "id": "00Bm8",
    "puzzleIndex": 116,
    "title": "Exercise 116: Black to Move",
    "fen": "8/6kp/4b1q1/1p6/1PpPN2Q/2P1P3/r5P1/5RK1 b - - 0 34",
    "solution": [
      "Qxg2#"
    ],
    "solutionUci": [
      "g6g2"
    ],
    "description": "Black to move. Themes: Endgame, Master, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1087,
    "themes": "endgame master mate mateIn1 oneMove",
    "preMove": "d2e4",
    "preMoveFen": "8/6kp/4b1q1/1p6/1PpPp2Q/2P1P3/r2N2P1/5RK1 w - - 7 34"
  },
  {
    "id": "00Bn4",
    "puzzleIndex": 117,
    "title": "Exercise 117: White to Move",
    "fen": "1k6/pp6/4nNp1/P3r2p/3p4/7P/3R1PPK/8 w - - 1 41",
    "solution": [
      "Nd7+",
      "Kc7",
      "Nxe5"
    ],
    "solutionUci": [
      "f6d7",
      "b8c7",
      "d7e5"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 689,
    "themes": "crushing endgame fork short",
    "preMove": "e4e5",
    "preMoveFen": "1k6/pp6/4nNp1/P6p/3pr3/7P/3R1PPK/8 b - - 0 40"
  },
  {
    "id": "00Bot",
    "puzzleIndex": 118,
    "title": "Exercise 118: White to Move",
    "fen": "8/5p2/p3kr2/8/8/R1P5/4P3/4K3 w - - 0 53",
    "solution": [
      "Rxa6+",
      "Ke5",
      "Rxf6"
    ],
    "solutionUci": [
      "a3a6",
      "e6e5",
      "a6f6"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Rook Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 810,
    "themes": "crushing endgame rookEndgame short",
    "preMove": "f4f6",
    "preMoveFen": "8/5p2/p3kP2/8/5r2/R1P5/4P3/4K3 b - - 2 52"
  },
  {
    "id": "00Bp0",
    "puzzleIndex": 119,
    "title": "Exercise 119: White to Move",
    "fen": "1r2kr2/pp3p1p/2b1p3/4N3/2P1n3/1N1B4/P3KP1P/6R1 w - - 5 22",
    "solution": [
      "Nxc6",
      "bxc6",
      "Bxe4"
    ],
    "solutionUci": [
      "e5c6",
      "b7c6",
      "d3e4"
    ],
    "description": "White to move. Themes: Decisive Advantage, CapturingDefender, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1240,
    "themes": "advantage capturingDefender middlegame short",
    "preMove": "f6e4",
    "preMoveFen": "1r2kr2/pp3p1p/2b1pn2/4N3/2P5/1N1B4/P3KP1P/6R1 b - - 4 21"
  },
  {
    "id": "00BrZ",
    "puzzleIndex": 120,
    "title": "Exercise 120: Black to Move",
    "fen": "r6r/pp2kb2/3p1p2/1N1Pp3/3bP3/P2B2P1/1P1Q2PP/7K b - - 7 28",
    "solution": [
      "Rxh2+",
      "Kxh2",
      "Rh8+",
      "Qh6",
      "Rxh6#"
    ],
    "solutionUci": [
      "h8h2",
      "h1h2",
      "a8h8",
      "d2h6",
      "h8h6"
    ],
    "description": "Black to move. Themes: Attraction Sacrifice, KingsideAttack, Long Tactic, Checkmate, Mate in 3, Middlegame, PillsburysMate, Tactical Sacrifice",
    "hint": "Calculate a forcing checkmate combination!",
    "rating": 1380,
    "themes": "attraction kingsideAttack long mate mateIn3 middlegame pillsburysMate sacrifice",
    "preMove": "h6d2",
    "preMoveFen": "r6r/pp2kb2/3p1p1Q/1N1Pp3/3bP3/P2B2P1/1P4PP/7K w - - 6 28"
  },
  {
    "id": "00Bul",
    "puzzleIndex": 121,
    "title": "Exercise 121: White to Move",
    "fen": "rnbqk2r/pp3ppp/5n2/4N3/2p5/2P5/P1PPQPPP/R1B1K2R w KQkq - 0 9",
    "solution": [
      "Nc6+",
      "Be6",
      "Nxd8"
    ],
    "solutionUci": [
      "e5c6",
      "c8e6",
      "c6d8"
    ],
    "description": "White to move. Themes: Decisive Advantage, Discovered Attack, DiscoveredCheck, Opening, Short Tactic",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 1271,
    "themes": "advantage discoveredAttack discoveredCheck opening short",
    "preMove": "d5c4",
    "preMoveFen": "rnbqk2r/pp3ppp/5n2/3pN3/2B5/2P5/P1PPQPPP/R1B1K2R b KQkq - 1 8"
  },
  {
    "id": "00C8Y",
    "puzzleIndex": 122,
    "title": "Exercise 122: Black to Move",
    "fen": "rnb2rk1/pp3p1p/3p2Pb/4p1q1/3pQ3/5N2/PPP1PPP1/RN2KB1R b KQ - 2 12",
    "solution": [
      "Qc1#"
    ],
    "solutionUci": [
      "g5c1"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 930,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "g1f3",
    "preMoveFen": "rnb2rk1/pp3p1p/3p2Pb/4p1q1/3pQ3/8/PPP1PPP1/RN2KBNR w KQ - 1 12"
  },
  {
    "id": "00CG5",
    "puzzleIndex": 123,
    "title": "Exercise 123: White to Move",
    "fen": "r1b1qrk1/1pp3pp/3ppb2/p5N1/2Pn4/6P1/PPQ2PBP/R1B2RK1 w - - 0 13",
    "solution": [
      "Qxh7#"
    ],
    "solutionUci": [
      "c2h7"
    ],
    "description": "White to move. Themes: KingsideAttack, Checkmate, Mate in 1, One-Move Tactic, Opening",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 774,
    "themes": "kingsideAttack mate mateIn1 oneMove opening",
    "preMove": "e7f6",
    "preMoveFen": "r1b1qrk1/1pp1b1pp/3ppN2/p5N1/2Pn4/6P1/PPQ2PBP/R1B2RK1 b - - 0 12"
  },
  {
    "id": "00CYP",
    "puzzleIndex": 124,
    "title": "Exercise 124: White to Move",
    "fen": "3r1k1r/p1p2pp1/1p6/2pQ1b2/2Pn1P2/8/PP1P1KBq/R1B1R3 w - - 4 26",
    "solution": [
      "Qxd8#"
    ],
    "solutionUci": [
      "d5d8"
    ],
    "description": "White to move. Themes: Hanging Piece, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 739,
    "themes": "hangingPiece mate mateIn1 middlegame oneMove",
    "preMove": "e8f8",
    "preMoveFen": "3rk2r/p1p2pp1/1p6/2pQ1b2/2Pn1P2/8/PP1P1KBq/R1B1R3 b - - 3 25"
  },
  {
    "id": "00CiZ",
    "puzzleIndex": 125,
    "title": "Exercise 125: Black to Move",
    "fen": "5r1k/6b1/3p3p/1P1q2pQ/r5P1/3p1N1P/3R2P1/3R3K b - - 3 34",
    "solution": [
      "Rxf3",
      "gxf3",
      "Qxf3+"
    ],
    "solutionUci": [
      "f8f3",
      "g2f3",
      "d5f3"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1360,
    "themes": "crushing middlegame short",
    "preMove": "e1d1",
    "preMoveFen": "5r1k/6b1/3p3p/1P1q2pQ/r5P1/3p1N1P/3R2P1/4R2K w - - 2 34"
  },
  {
    "id": "00CpR",
    "puzzleIndex": 126,
    "title": "Exercise 126: White to Move",
    "fen": "6k1/B7/2p2pK1/3nr2p/8/1Q3PP1/P6r/8 w - - 1 32",
    "solution": [
      "Qb8+",
      "Re8",
      "Qxe8#"
    ],
    "solutionUci": [
      "b3b8",
      "e5e8",
      "b8e8"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 629,
    "themes": "endgame mate mateIn2 short",
    "preMove": "e8e5",
    "preMoveFen": "4r1k1/B7/2p2pK1/3n3p/8/1Q3PP1/P6r/8 b - - 0 31"
  },
  {
    "id": "00CtS",
    "puzzleIndex": 127,
    "title": "Exercise 127: White to Move",
    "fen": "Q7/5qk1/p2p4/b1p1pr2/P7/6P1/4KP1R/8 w - - 4 39",
    "solution": [
      "Qh8+",
      "Kg6",
      "Qh6#"
    ],
    "solutionUci": [
      "a8h8",
      "g7g6",
      "h8h6"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic, SwallowstailMate",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 987,
    "themes": "endgame mate mateIn2 short swallowstailMate",
    "preMove": "g8g7",
    "preMoveFen": "Q5k1/5q2/p2p4/b1p1pr2/P7/6P1/4KP1R/8 b - - 3 38"
  },
  {
    "id": "00DAs",
    "puzzleIndex": 128,
    "title": "Exercise 128: White to Move",
    "fen": "r6r/ppp1n1p1/3bBk1p/4nP2/3p4/8/PPPN1P1P/R1B1K2R w KQ - 2 16",
    "solution": [
      "Ne4#"
    ],
    "solutionUci": [
      "d2e4"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 692,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "g8e7",
    "preMoveFen": "r5nr/ppp3p1/3bBk1p/4nP2/3p4/8/PPPN1P1P/R1B1K2R b KQ - 1 15"
  },
  {
    "id": "00DBP",
    "puzzleIndex": 129,
    "title": "Exercise 129: White to Move",
    "fen": "5kr1/pp1b1p2/4p2p/2KpP2B/5P2/P5R1/7P/8 w - - 5 35",
    "solution": [
      "Rxg8+",
      "Kxg8",
      "Kd6"
    ],
    "solutionUci": [
      "g3g8",
      "f8g8",
      "c5d6"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Master, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1317,
    "themes": "advantage endgame master short",
    "preMove": "h8g8",
    "preMoveFen": "5k1r/pp1b1p2/4p2p/2KpP2B/5P2/P5R1/7P/8 b - - 4 34"
  },
  {
    "id": "00DBg",
    "puzzleIndex": 130,
    "title": "Exercise 130: Black to Move",
    "fen": "rn2kbnr/pp6/2p2p2/4P3/4P1pq/2N3N1/PPPB1KB1/R2Q1R2 b kq - 2 17",
    "solution": [
      "Bc5+",
      "Be3",
      "Bxe3+",
      "Kxe3",
      "Qxg3+"
    ],
    "solutionUci": [
      "f8c5",
      "d2e3",
      "c5e3",
      "f2e3",
      "h4g3"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Attraction Sacrifice, ExposedKing, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1071,
    "themes": "advantage attraction exposedKing long middlegame",
    "preMove": "g1f2",
    "preMoveFen": "rn2kbnr/pp6/2p2p2/4P3/4P1pq/2N3N1/PPPB2B1/R2Q1RK1 w kq - 1 17"
  },
  {
    "id": "00DEc",
    "puzzleIndex": 131,
    "title": "Exercise 131: Black to Move",
    "fen": "8/p5pk/1p3b1p/3r3P/6P1/3nBN2/P4PK1/3R4 b - - 4 30",
    "solution": [
      "Nf4+",
      "Bxf4",
      "Rxd1"
    ],
    "solutionUci": [
      "d3f4",
      "e3f4",
      "d5d1"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Discovered Attack, Endgame, Short Tactic",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 1091,
    "themes": "crushing discoveredAttack endgame short",
    "preMove": "e1d1",
    "preMoveFen": "8/p5pk/1p3b1p/3r3P/6P1/3nBN2/P4PK1/4R3 w - - 3 30"
  },
  {
    "id": "00DPI",
    "puzzleIndex": 132,
    "title": "Exercise 132: White to Move",
    "fen": "3r2k1/1B3p1p/6p1/3N4/3p2r1/8/5KP1/3R4 w - - 0 36",
    "solution": [
      "Nf6+",
      "Kg7",
      "Nxg4"
    ],
    "solutionUci": [
      "d5f6",
      "g8g7",
      "f6g4"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 960,
    "themes": "advantage endgame fork short",
    "preMove": "g3g4",
    "preMoveFen": "3r2k1/1B3p1p/6p1/3N4/3p2P1/6r1/5KP1/3R4 b - - 5 35"
  },
  {
    "id": "00DPQ",
    "puzzleIndex": 133,
    "title": "Exercise 133: Black to Move",
    "fen": "2k4r/pp3pp1/4pn2/2np2p1/8/1B1P1Pq1/PPPN3R/R2Q3K b - - 7 20",
    "solution": [
      "Qxh2#"
    ],
    "solutionUci": [
      "g3h2"
    ],
    "description": "Black to move. Themes: KingsideAttack, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 765,
    "themes": "kingsideAttack mate mateIn1 middlegame oneMove",
    "preMove": "f2h2",
    "preMoveFen": "2k4r/pp3pp1/4pn2/2np2p1/8/1B1P1Pq1/PPPN1R2/R2Q3K w - - 6 20"
  },
  {
    "id": "00DWo",
    "puzzleIndex": 134,
    "title": "Exercise 134: Black to Move",
    "fen": "b4b1r/3k1ppp/p2p4/1p2p3/3Pq3/N3B3/PP3PPP/R2Q1RK1 b - - 0 16",
    "solution": [
      "Qxg2#"
    ],
    "solutionUci": [
      "e4g2"
    ],
    "description": "Black to move. Themes: KingsideAttack, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1060,
    "themes": "kingsideAttack mate mateIn1 middlegame oneMove",
    "preMove": "c3d4",
    "preMoveFen": "b4b1r/3k1ppp/p2p4/1p2p3/3nq3/N1P1B3/PP3PPP/R2Q1RK1 w - - 1 16"
  },
  {
    "id": "00Dib",
    "puzzleIndex": 135,
    "title": "Exercise 135: White to Move",
    "fen": "7k/8/4PKR1/3r4/6Pb/8/8/8 w - - 3 47",
    "solution": [
      "g5",
      "Bxg5+",
      "Rxg5",
      "Rxg5",
      "Kxg5"
    ],
    "solutionUci": [
      "g4g5",
      "h4g5",
      "g6g5",
      "d5g5",
      "f6g5"
    ],
    "description": "White to move. Themes: Endgame, Master",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1346,
    "themes": "endgame master",
    "preMove": "g3h4",
    "preMoveFen": "7k/8/4PKR1/3r4/6P1/6b1/8/8 b - - 2 46"
  },
  {
    "id": "00E29",
    "puzzleIndex": 136,
    "title": "Exercise 136: White to Move",
    "fen": "r1b2rk1/4bppp/p1n5/3q4/Pp6/3B1N2/1B3PPP/R2Q1RK1 w - - 0 18",
    "solution": [
      "Bxh7+",
      "Kxh7",
      "Qxd5"
    ],
    "solutionUci": [
      "d3h7",
      "g8h7",
      "d1d5"
    ],
    "description": "White to move. Themes: Crushing Advantage, Discovered Attack, KingsideAttack, Middlegame, Short Tactic",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 997,
    "themes": "crushing discoveredAttack kingsideAttack middlegame short",
    "preMove": "d8d5",
    "preMoveFen": "r1bq1rk1/4bppp/p1n5/3P4/Pp6/3B1N2/1B3PPP/R2Q1RK1 b - - 0 17"
  },
  {
    "id": "00EBZ",
    "puzzleIndex": 137,
    "title": "Exercise 137: Black to Move",
    "fen": "3rr1k1/p4pp1/1pp4p/3pPQ2/1P3P2/2P2RqP/P2R2P1/6K1 b - - 2 24",
    "solution": [
      "Qe1+",
      "Kh2",
      "Qxd2"
    ],
    "solutionUci": [
      "g3e1",
      "g1h2",
      "e1d2"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 818,
    "themes": "crushing endgame fork short",
    "preMove": "f1f3",
    "preMoveFen": "3rr1k1/p4pp1/1pp4p/3pPQ2/1P3P2/2P3qP/P2R2P1/5RK1 w - - 1 24"
  },
  {
    "id": "00EDa",
    "puzzleIndex": 138,
    "title": "Exercise 138: Black to Move",
    "fen": "r1bk3r/ppp1np1p/3P2pP/1N4q1/2BP1n2/8/PPP3P1/R1BQ2KR b - - 0 14",
    "solution": [
      "Qxg2#"
    ],
    "solutionUci": [
      "g5g2"
    ],
    "description": "Black to move. Themes: KingsideAttack, Checkmate, Mate in 1, One-Move Tactic, Opening",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 794,
    "themes": "kingsideAttack mate mateIn1 oneMove opening",
    "preMove": "e5d6",
    "preMoveFen": "r1bk3r/ppp1np1p/3p2pP/1N2P1q1/2BP1n2/8/PPP3P1/R1BQ2KR w - - 1 14"
  },
  {
    "id": "00EH9",
    "puzzleIndex": 139,
    "title": "Exercise 139: Black to Move",
    "fen": "3r2k1/R7/2p5/8/1BP5/1P4p1/P5P1/6K1 b - - 0 29",
    "solution": [
      "Rd1+",
      "Be1",
      "Rxe1#"
    ],
    "solutionUci": [
      "d8d1",
      "b4e1",
      "d1e1"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 752,
    "themes": "endgame mate mateIn2 short",
    "preMove": "e7a7",
    "preMoveFen": "3r2k1/p3R3/2p5/8/1BP5/1P4p1/P5P1/6K1 w - - 0 29"
  },
  {
    "id": "00ERL",
    "puzzleIndex": 140,
    "title": "Exercise 140: White to Move",
    "fen": "4r1k1/2Q4p/pp6/2p2n2/P2P1P1q/2P4P/2PB2b1/4R1K1 w - - 0 30",
    "solution": [
      "Rxe8#"
    ],
    "solutionUci": [
      "e1e8"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 794,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "b8e8",
    "preMoveFen": "1r2R1k1/2Q4p/pp6/2p2n2/P2P1P1q/2P4P/2PB2b1/4R1K1 b - - 0 29"
  },
  {
    "id": "00EWi",
    "puzzleIndex": 141,
    "title": "Exercise 141: Black to Move",
    "fen": "8/8/5pkp/1RP5/1P3PKP/r7/8/8 b - - 0 48",
    "solution": [
      "f5#"
    ],
    "solutionUci": [
      "f6f5"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 1, One-Move Tactic, Rook Endgame",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 850,
    "themes": "endgame mate mateIn1 oneMove rookEndgame",
    "preMove": "b6b5",
    "preMoveFen": "8/8/1R3pkp/1pP5/1P3PKP/r7/8/8 w - - 2 48"
  },
  {
    "id": "00EXM",
    "puzzleIndex": 142,
    "title": "Exercise 142: White to Move",
    "fen": "r1n3k1/3R1ppp/2p5/5P2/8/1P2r3/P7/5RK1 w - - 0 34",
    "solution": [
      "Rd8+",
      "Re8",
      "Rxe8#"
    ],
    "solutionUci": [
      "d7d8",
      "e3e8",
      "d8e8"
    ],
    "description": "White to move. Themes: Back-Rank Mate, Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 614,
    "themes": "backRankMate endgame mate mateIn2 short",
    "preMove": "e8e3",
    "preMoveFen": "r1n1r1k1/3R1ppp/2p5/5P2/8/1P2B3/P7/5RK1 b - - 6 33"
  },
  {
    "id": "00Ea3",
    "puzzleIndex": 143,
    "title": "Exercise 143: White to Move",
    "fen": "3r4/p5k1/1p1qpr1p/1Q1pn1p1/3P1pP1/1PP5/P5PP/4RRK1 w - - 0 30",
    "solution": [
      "dxe5",
      "Qc5+",
      "Qxc5",
      "bxc5",
      "exf6+"
    ],
    "solutionUci": [
      "d4e5",
      "d6c5",
      "b5c5",
      "b6c5",
      "e5f6"
    ],
    "description": "White to move. Themes: Crushing Advantage, Fork, Long Tactic, Middlegame",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1315,
    "themes": "crushing fork long middlegame",
    "preMove": "g6e5",
    "preMoveFen": "3r4/p5k1/1p1qprnp/1Q1pN1p1/3P1pP1/1PP5/P5PP/4RRK1 b - - 3 29"
  },
  {
    "id": "00Ec4",
    "puzzleIndex": 144,
    "title": "Exercise 144: White to Move",
    "fen": "3q1r1k/p1r3pp/8/1p1BpPb1/2Pp2Q1/P2P2R1/6PP/R5K1 w - - 4 26",
    "solution": [
      "Qxg5",
      "Qxg5",
      "Rxg5"
    ],
    "solutionUci": [
      "g4g5",
      "d8g5",
      "g3g5"
    ],
    "description": "White to move. Themes: Crushing Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 823,
    "themes": "crushing middlegame short",
    "preMove": "c8c7",
    "preMoveFen": "2rq1r1k/p5pp/8/1p1BpPb1/2Pp2Q1/P2P2R1/6PP/R5K1 b - - 3 25"
  },
  {
    "id": "00EdH",
    "puzzleIndex": 145,
    "title": "Exercise 145: Black to Move",
    "fen": "r4rk1/pb3ppp/1p2p3/3q4/3N4/2P4P/PPQ2PP1/R4RK1 b - - 2 18",
    "solution": [
      "Qxg2#"
    ],
    "solutionUci": [
      "d5g2"
    ],
    "description": "Black to move. Themes: KingsideAttack, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 633,
    "themes": "kingsideAttack mate mateIn1 middlegame oneMove",
    "preMove": "d3c2",
    "preMoveFen": "r4rk1/pb3ppp/1p2p3/3q4/3N4/2PQ3P/PP3PP1/R4RK1 w - - 1 18"
  },
  {
    "id": "00Elq",
    "puzzleIndex": 146,
    "title": "Exercise 146: White to Move",
    "fen": "rn3q1r/4pk2/2pp1npp/p5Q1/1p1PPNP1/5P2/PPP5/R4KNR w - - 0 18",
    "solution": [
      "Qxg6#"
    ],
    "solutionUci": [
      "g5g6"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 759,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "h7h6",
    "preMoveFen": "rn3q1r/4pk1p/2pp1np1/p5Q1/1p1PPNP1/5P2/PPP5/R4KNR b - - 0 17"
  },
  {
    "id": "00Enl",
    "puzzleIndex": 147,
    "title": "Exercise 147: Black to Move",
    "fen": "2kr4/1pp5/p1b4R/2PpP3/3B2p1/2P1Q1Pp/PPq4P/5RK1 b - - 0 27",
    "solution": [
      "Qg2#"
    ],
    "solutionUci": [
      "c2g2"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 831,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "f6h6",
    "preMoveFen": "2kr4/1pp5/p1b2R1n/2PpP3/3B2p1/2P1Q1Pp/PPq4P/5RK1 w - - 3 27"
  },
  {
    "id": "00Er4",
    "puzzleIndex": 148,
    "title": "Exercise 148: Black to Move",
    "fen": "r3k2r/p1bN2pp/2p1Rp2/3p3b/3P1q2/2N4P/PPPQ1PP1/R5K1 b kq - 0 16",
    "solution": [
      "Kxd7",
      "Qxf4",
      "Bxf4"
    ],
    "solutionUci": [
      "e8d7",
      "d2f4",
      "c7f4"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Hanging Piece, Middlegame, Short Tactic",
    "hint": "Look for undefended or hanging material!",
    "rating": 1200,
    "themes": "crushing hangingPiece middlegame short",
    "preMove": "e1e6",
    "preMoveFen": "r3k2r/p1bN2pp/2p1pp2/3p3b/3P1q2/2N4P/PPPQ1PP1/R3R1K1 w kq - 0 16"
  },
  {
    "id": "00Evs",
    "puzzleIndex": 149,
    "title": "Exercise 149: White to Move",
    "fen": "5qk1/pQ3p2/7p/b2N1bp1/P3r3/5K2/7P/R4B2 w - - 0 25",
    "solution": [
      "Nf6+",
      "Kh8",
      "Nxe4"
    ],
    "solutionUci": [
      "d5f6",
      "g8h8",
      "f6e4"
    ],
    "description": "White to move. Themes: Decisive Advantage, Fork, Middlegame, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1057,
    "themes": "advantage fork middlegame short",
    "preMove": "g7g5",
    "preMoveFen": "5qk1/pQ3pp1/7p/b2N1b2/P3r3/5K2/7P/R4B2 b - - 1 24"
  },
  {
    "id": "00F1l",
    "puzzleIndex": 150,
    "title": "Exercise 150: White to Move",
    "fen": "8/2k1b3/5p2/RBpK1Pp1/P2p2P1/1p1P4/2r5/8 w - - 0 46",
    "solution": [
      "Ra7+",
      "Kb8",
      "Rxe7"
    ],
    "solutionUci": [
      "a5a7",
      "c7b8",
      "a7e7"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Master, Short Tactic, Skewer",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 836,
    "themes": "crushing endgame master short skewer",
    "preMove": "b4b3",
    "preMoveFen": "8/2k1b3/5p2/RBpK1Pp1/Pp1p2P1/3P4/2r5/8 b - - 2 45"
  },
  {
    "id": "00F3S",
    "puzzleIndex": 151,
    "title": "Exercise 151: White to Move",
    "fen": "3r1rk1/5ppp/p7/1p1P4/2Ppq3/P6Q/B4PPP/2R3K1 w - - 0 30",
    "solution": [
      "Bb1",
      "Qxb1",
      "Rxb1"
    ],
    "solutionUci": [
      "a2b1",
      "e4b1",
      "c1b1"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1329,
    "themes": "crushing endgame short",
    "preMove": "g6e4",
    "preMoveFen": "3r1rk1/5ppp/p5q1/1p1P4/2PpP3/P6Q/B4PPP/2R3K1 b - - 0 29"
  },
  {
    "id": "00F6y",
    "puzzleIndex": 152,
    "title": "Exercise 152: White to Move",
    "fen": "2k3r1/pppb1prp/1q6/8/Q7/2P1R1P1/P4P1P/4R1K1 w - - 4 24",
    "solution": [
      "Re8+",
      "Bxe8",
      "Rxe8+",
      "Rxe8",
      "Qxe8#"
    ],
    "solutionUci": [
      "e3e8",
      "d7e8",
      "e1e8",
      "g8e8",
      "a4e8"
    ],
    "description": "White to move. Themes: Long Tactic, Checkmate, Mate in 3, Middlegame, QueensideAttack, Tactical Sacrifice",
    "hint": "Calculate a forcing checkmate combination!",
    "rating": 937,
    "themes": "long mate mateIn3 middlegame queensideAttack sacrifice",
    "preMove": "e6d7",
    "preMoveFen": "2k3r1/ppp2prp/1q2b3/8/Q7/2P1R1P1/P4P1P/4R1K1 b - - 3 23"
  },
  {
    "id": "00FH6",
    "puzzleIndex": 153,
    "title": "Exercise 153: Black to Move",
    "fen": "r6r/1q2bpk1/7p/p1p1pPpn/Pp2P1nP/1P1B1N2/1BP3P1/3RR1QK b - - 8 30",
    "solution": [
      "Ng3#"
    ],
    "solutionUci": [
      "h5g3"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1004,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "c1b2",
    "preMoveFen": "r6r/1q2bpk1/7p/p1p1pPpn/Pp2P1nP/1P1B1N2/2P3P1/2BRR1QK w - - 7 30"
  },
  {
    "id": "00FON",
    "puzzleIndex": 154,
    "title": "Exercise 154: Black to Move",
    "fen": "1k6/8/8/6p1/1pp4P/p4PP1/N1P5/7K b - - 0 38",
    "solution": [
      "b3",
      "cxb3",
      "cxb3"
    ],
    "solutionUci": [
      "b4b3",
      "c2b3",
      "c4b3"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Knight Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 934,
    "themes": "crushing endgame knightEndgame short",
    "preMove": "h2h4",
    "preMoveFen": "1k6/8/8/6p1/1pp5/p4PP1/N1P4P/7K w - - 0 38"
  },
  {
    "id": "00FaB",
    "puzzleIndex": 155,
    "title": "Exercise 155: Black to Move",
    "fen": "2k2bn1/ppp2Nrp/2b1p3/3q2BQ/8/2N5/PP3PPP/R4RK1 b - - 6 18",
    "solution": [
      "Qxg2#"
    ],
    "solutionUci": [
      "d5g2"
    ],
    "description": "Black to move. Themes: KingsideAttack, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 668,
    "themes": "kingsideAttack mate mateIn1 middlegame oneMove",
    "preMove": "b1c3",
    "preMoveFen": "2k2bn1/ppp2Nrp/2b1p3/3q2BQ/8/8/PP3PPP/RN3RK1 w - - 5 18"
  },
  {
    "id": "00Flp",
    "puzzleIndex": 156,
    "title": "Exercise 156: White to Move",
    "fen": "r2q1rk1/ppp2ppp/2n5/3p2N1/3P4/1B5P/P1Q2PP1/R1B2bK1 w - - 0 17",
    "solution": [
      "Qxh7#"
    ],
    "solutionUci": [
      "c2h7"
    ],
    "description": "White to move. Themes: KingsideAttack, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 640,
    "themes": "kingsideAttack mate mateIn1 middlegame oneMove",
    "preMove": "e2f1",
    "preMoveFen": "r2q1rk1/ppp2ppp/2n5/3p2N1/3P4/1B5P/P1Q1bPP1/R1B2RK1 b - - 2 16"
  },
  {
    "id": "00Foc",
    "puzzleIndex": 157,
    "title": "Exercise 157: White to Move",
    "fen": "r1b1r2k/p1p2p1p/2q1N3/7p/8/b1NPB3/PP3P1P/R3K1R1 w Q - 2 19",
    "solution": [
      "Bd4+",
      "f6",
      "Bxf6#"
    ],
    "solutionUci": [
      "e3d4",
      "f7f6",
      "d4f6"
    ],
    "description": "White to move. Themes: KingsideAttack, Checkmate, Mate in 2, Middlegame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1054,
    "themes": "kingsideAttack mate mateIn2 middlegame short",
    "preMove": "g8h8",
    "preMoveFen": "r1b1r1k1/p1p2p1p/2q1N3/7p/8/b1NPB3/PP3P1P/R3K1R1 b Q - 1 18"
  },
  {
    "id": "00G7g",
    "puzzleIndex": 158,
    "title": "Exercise 158: White to Move",
    "fen": "3r1rk1/p4pp1/b1p4p/8/BPP5/P2P3P/2Q3P1/qNB4K w - - 0 28",
    "solution": [
      "Bb2",
      "Qxb2",
      "Qxb2"
    ],
    "solutionUci": [
      "c1b2",
      "a1b2",
      "c2b2"
    ],
    "description": "White to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1312,
    "themes": "advantage middlegame short",
    "preMove": "d4a1",
    "preMoveFen": "3r1rk1/p4pp1/b1p4p/8/BPPq4/P2P3P/2Q3P1/RNB4K b - - 2 27"
  },
  {
    "id": "00G81",
    "puzzleIndex": 159,
    "title": "Exercise 159: Black to Move",
    "fen": "3r4/5k2/p4Pp1/2K3Pp/2R5/P7/8/8 b - - 0 51",
    "solution": [
      "Rc8+",
      "Kd4",
      "Rxc4+",
      "Kxc4",
      "h4"
    ],
    "solutionUci": [
      "d8c8",
      "c5d4",
      "c8c4",
      "d4c4",
      "h5h4"
    ],
    "description": "Black to move. Themes: Crushing Advantage, DefensiveMove, Endgame, Long Tactic, Rook Endgame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1268,
    "themes": "crushing defensiveMove endgame long rookEndgame",
    "preMove": "d5c5",
    "preMoveFen": "3r4/5k2/p4Pp1/2pK2Pp/2R5/P7/8/8 w - - 7 51"
  },
  {
    "id": "00GAf",
    "puzzleIndex": 160,
    "title": "Exercise 160: White to Move",
    "fen": "r5k1/5pp1/1p1rb1qp/3pR3/p1pP4/P1P3Q1/5PPN/4R1K1 w - - 2 31",
    "solution": [
      "Qxg6",
      "fxg6",
      "Rxe6",
      "Rxe6",
      "Rxe6"
    ],
    "solutionUci": [
      "g3g6",
      "f7g6",
      "e5e6",
      "d6e6",
      "e1e6"
    ],
    "description": "White to move. Themes: Crushing Advantage, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1327,
    "themes": "crushing long middlegame",
    "preMove": "h5g6",
    "preMoveFen": "r5k1/5pp1/1p1rb2p/3pR2q/p1pP4/P1P3Q1/5PPN/4R1K1 b - - 1 30"
  },
  {
    "id": "00GBX",
    "puzzleIndex": 161,
    "title": "Exercise 161: White to Move",
    "fen": "r6k/pp2n1pp/2nN4/4p1r1/1PB5/2P4b/P3Nb1P/R2R3K w - - 0 23",
    "solution": [
      "Nf7+",
      "Kg8",
      "Nxg5+"
    ],
    "solutionUci": [
      "d6f7",
      "h8g8",
      "f7g5"
    ],
    "description": "White to move. Themes: Decisive Advantage, Discovered Attack, DiscoveredCheck, Fork, Middlegame, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 838,
    "themes": "advantage discoveredAttack discoveredCheck fork middlegame short",
    "preMove": "h5g5",
    "preMoveFen": "r6k/pp2n1pp/2nN4/4p1Br/1PB5/2P4b/P3Nb1P/R2R3K b - - 1 22"
  },
  {
    "id": "00GY4",
    "puzzleIndex": 162,
    "title": "Exercise 162: White to Move",
    "fen": "3k2r1/pR5R/3r4/4p3/7q/3Pn1PP/PP5K/8 w - - 0 28",
    "solution": [
      "Rb8#"
    ],
    "solutionUci": [
      "b7b8"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1215,
    "themes": "endgame mate mateIn1 oneMove",
    "preMove": "g5h4",
    "preMoveFen": "3k2r1/pR5R/3r4/4p1q1/7Q/3Pn1PP/PP5K/8 b - - 0 27"
  },
  {
    "id": "00Gt0",
    "puzzleIndex": 163,
    "title": "Exercise 163: Black to Move",
    "fen": "R7/4k3/5p2/3p2p1/4b2p/2K1PP1P/6P1/8 b - - 0 47",
    "solution": [
      "d4+",
      "Kxd4",
      "Bxa8"
    ],
    "solutionUci": [
      "d5d4",
      "c3d4",
      "e4a8"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Discovered Attack, Endgame, Master, Short Tactic",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 1052,
    "themes": "crushing discoveredAttack endgame master short",
    "preMove": "f2f3",
    "preMoveFen": "R7/4k3/5p2/3p2p1/4b2p/2K1P2P/5PP1/8 w - - 2 47"
  },
  {
    "id": "00GuD",
    "puzzleIndex": 164,
    "title": "Exercise 164: White to Move",
    "fen": "1n5k/6p1/p2q1rPp/1ppB4/8/3P4/PPP1rPQ1/2K4R w - - 0 26",
    "solution": [
      "Rxh6+",
      "gxh6",
      "g7+",
      "Kh7",
      "g8=Q#"
    ],
    "solutionUci": [
      "h1h6",
      "g7h6",
      "g6g7",
      "h8h7",
      "g7g8q"
    ],
    "description": "White to move. Themes: AdvancedPawn, KingsideAttack, Long Tactic, Checkmate, Mate in 3, Middlegame, Promotion, Tactical Sacrifice",
    "hint": "Calculate a forcing checkmate combination!",
    "rating": 1109,
    "themes": "advancedPawn kingsideAttack long mate mateIn3 middlegame promotion sacrifice",
    "preMove": "e7e2",
    "preMoveFen": "1n5k/4r1p1/p2q1rPp/1ppB4/8/3P4/PPP1RPQ1/2K4R b - - 4 25"
  },
  {
    "id": "00Gv1",
    "puzzleIndex": 165,
    "title": "Exercise 165: Black to Move",
    "fen": "3R4/1pp1r1kp/4r1p1/p1P5/5Q2/P4PPq/1P5P/3R2K1 b - - 3 32",
    "solution": [
      "Re1+",
      "Rxe1",
      "Rxe1+",
      "Kf2",
      "Qf1#"
    ],
    "solutionUci": [
      "e6e1",
      "d1e1",
      "e7e1",
      "g1f2",
      "h3f1"
    ],
    "description": "Black to move. Themes: Endgame, Long Tactic, Checkmate, Mate in 3",
    "hint": "Calculate a forcing checkmate combination!",
    "rating": 989,
    "themes": "endgame long mate mateIn3",
    "preMove": "d2d8",
    "preMoveFen": "8/1pp1r1kp/4r1p1/p1P5/5Q2/P4PPq/1P1R3P/3R2K1 w - - 2 32"
  },
  {
    "id": "00Gvp",
    "puzzleIndex": 166,
    "title": "Exercise 166: Black to Move",
    "fen": "8/2kn1p2/8/3P4/R7/2PKN3/1r6/8 b - - 14 70",
    "solution": [
      "Nc5+",
      "Kd4",
      "Nxa4"
    ],
    "solutionUci": [
      "d7c5",
      "d3d4",
      "c5a4"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 851,
    "themes": "advantage endgame fork short",
    "preMove": "e2d3",
    "preMoveFen": "8/2kn1p2/8/3P4/R7/2P1N3/1r2K3/8 w - - 13 70"
  },
  {
    "id": "00Gvr",
    "puzzleIndex": 167,
    "title": "Exercise 167: White to Move",
    "fen": "8/1b4p1/1k3pPp/4K2P/4PP2/8/8/8 w - - 0 47",
    "solution": [
      "Ke6",
      "Bxe4",
      "Kf7"
    ],
    "solutionUci": [
      "e5e6",
      "b7e4",
      "e6f7"
    ],
    "description": "White to move. Themes: Decisive Advantage, Bishop Endgame, DefensiveMove, Endgame, Master, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1224,
    "themes": "advantage bishopEndgame defensiveMove endgame master short",
    "preMove": "f7f6",
    "preMoveFen": "8/1b3pp1/1k4Pp/4K2P/4PP2/8/8/8 b - - 0 46"
  },
  {
    "id": "00GyL",
    "puzzleIndex": 168,
    "title": "Exercise 168: White to Move",
    "fen": "8/1p6/p2q3p/5rk1/1PpNQ1n1/P1P5/6K1/8 w - - 0 41",
    "solution": [
      "Qxf5+",
      "Kh4",
      "Nf3#"
    ],
    "solutionUci": [
      "e4f5",
      "g5h4",
      "d4f3"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1113,
    "themes": "endgame mate mateIn2 short",
    "preMove": "f8f5",
    "preMoveFen": "5r2/1p6/p2q3p/5Rk1/1PpNQ1n1/P1P5/6K1/8 b - - 0 40"
  },
  {
    "id": "00H1C",
    "puzzleIndex": 169,
    "title": "Exercise 169: White to Move",
    "fen": "r3r3/1kpR1qpp/p1n2p2/Qp2P2P/1N6/4Pb2/PPP3P1/2K2R2 w - - 1 23",
    "solution": [
      "Qxc7#"
    ],
    "solutionUci": [
      "a5c7"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic, SwallowstailMate",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1239,
    "themes": "mate mateIn1 middlegame oneMove swallowstailMate",
    "preMove": "e7c6",
    "preMoveFen": "r3r3/1kpRnqpp/p4p2/Qp2P2P/1N6/4Pb2/PPP3P1/2K2R2 b - - 0 22"
  },
  {
    "id": "00H8a",
    "puzzleIndex": 170,
    "title": "Exercise 170: White to Move",
    "fen": "5bk1/2R4p/6p1/8/4NP1P/3bP1K1/r7/8 w - - 3 46",
    "solution": [
      "Nf6+",
      "Kh8",
      "Rxh7#"
    ],
    "solutionUci": [
      "e4f6",
      "g8h8",
      "c7h7"
    ],
    "description": "White to move. Themes: Arabian Mate, Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 782,
    "themes": "arabianMate endgame mate mateIn2 short",
    "preMove": "c4d3",
    "preMoveFen": "5bk1/2R4p/6p1/8/2b1NP1P/4P1K1/r7/8 b - - 2 45"
  },
  {
    "id": "00H9n",
    "puzzleIndex": 171,
    "title": "Exercise 171: Black to Move",
    "fen": "7k/6p1/8/4p3/Pp1Q4/1P3b1q/6P1/5RK1 b - - 0 45",
    "solution": [
      "Qxg2#"
    ],
    "solutionUci": [
      "h3g2"
    ],
    "description": "Black to move. Themes: Endgame, Master, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 860,
    "themes": "endgame master mate mateIn1 oneMove",
    "preMove": "d2d4",
    "preMoveFen": "7k/6p1/8/4p3/Pp1b4/1P3b1q/3Q2P1/5RK1 w - - 0 45"
  },
  {
    "id": "00HEh",
    "puzzleIndex": 172,
    "title": "Exercise 172: White to Move",
    "fen": "3r2k1/pp3ppp/2p3b1/2n3P1/2B2q1P/5N2/PPP1QP2/4R1K1 w - - 0 24",
    "solution": [
      "Qe8+",
      "Rxe8",
      "Rxe8#"
    ],
    "solutionUci": [
      "e2e8",
      "d8e8",
      "e1e8"
    ],
    "description": "White to move. Themes: KingsideAttack, Checkmate, Mate in 2, Middlegame, Tactical Sacrifice, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 812,
    "themes": "kingsideAttack mate mateIn2 middlegame sacrifice short",
    "preMove": "f8d8",
    "preMoveFen": "3R1rk1/pp3ppp/2p3b1/2n3P1/2B2q1P/5N2/PPP1QP2/4R1K1 b - - 0 23"
  },
  {
    "id": "00HEx",
    "puzzleIndex": 173,
    "title": "Exercise 173: Black to Move",
    "fen": "R7/5pk1/4pn1p/8/3NP3/5P2/6PP/2rB2K1 b - - 0 31",
    "solution": [
      "Rxd1+",
      "Kf2",
      "Rxd4"
    ],
    "solutionUci": [
      "c1d1",
      "g1f2",
      "d1d4"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Fork, Hanging Piece, Master, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 907,
    "themes": "crushing endgame fork hangingPiece master short",
    "preMove": "a6a8",
    "preMoveFen": "b7/5pk1/R3pn1p/8/3NP3/5P2/6PP/2rB2K1 w - - 1 31"
  },
  {
    "id": "00HHN",
    "puzzleIndex": 174,
    "title": "Exercise 174: Black to Move",
    "fen": "4r2k/p4R1p/1p6/2p5/2P5/1P4R1/r5PP/2K5 b - - 1 32",
    "solution": [
      "Re1#"
    ],
    "solutionUci": [
      "e8e1"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 1, One-Move Tactic, Rook Endgame",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 887,
    "themes": "endgame mate mateIn1 oneMove rookEndgame",
    "preMove": "f6f7",
    "preMoveFen": "4r2k/p6p/1p3R2/2p5/2P5/1P4R1/r5PP/2K5 w - - 0 32"
  },
  {
    "id": "00HIV",
    "puzzleIndex": 175,
    "title": "Exercise 175: White to Move",
    "fen": "8/8/1p1k1n2/4p2p/1PP2pp1/3K4/3N1PPP/8 w - - 0 38",
    "solution": [
      "Ne4+",
      "Nxe4",
      "Kxe4"
    ],
    "solutionUci": [
      "d2e4",
      "f6e4",
      "d3e4"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Knight Endgame, Master, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 837,
    "themes": "crushing endgame knightEndgame master short",
    "preMove": "h6h5",
    "preMoveFen": "8/8/1p1k1n1p/4p3/1PP2pp1/3K4/3N1PPP/8 b - - 3 37"
  },
  {
    "id": "00HLP",
    "puzzleIndex": 176,
    "title": "Exercise 176: Black to Move",
    "fen": "r4rk1/3nqpp1/4p2p/1p2P3/2pn1Q2/P6N/1P3PPP/1B1R1RK1 b - - 1 24",
    "solution": [
      "Ne2+",
      "Kh1",
      "Nxf4"
    ],
    "solutionUci": [
      "d4e2",
      "g1h1",
      "e2f4"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Fork, Middlegame, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 812,
    "themes": "crushing fork middlegame short",
    "preMove": "d3b1",
    "preMoveFen": "r4rk1/3nqpp1/4p2p/1p2P3/2pn1Q2/P2B3N/1P3PPP/3R1RK1 w - - 0 24"
  },
  {
    "id": "00HPz",
    "puzzleIndex": 177,
    "title": "Exercise 177: Black to Move",
    "fen": "6r1/7p/2pk1p2/P2p4/P2KbP2/2N1P3/5R1P/8 b - - 2 35",
    "solution": [
      "c5#"
    ],
    "solutionUci": [
      "c6c5"
    ],
    "description": "Black to move. Themes: Endgame, Master, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 810,
    "themes": "endgame master mate mateIn1 oneMove",
    "preMove": "e2c3",
    "preMoveFen": "6r1/7p/2pk1p2/P2p4/P2KbP2/4P3/4NR1P/8 w - - 1 35"
  },
  {
    "id": "00HXr",
    "puzzleIndex": 178,
    "title": "Exercise 178: White to Move",
    "fen": "2k4r/Q1p2pp1/5n2/3rNq2/4p3/6pb/PPP1BP1P/R3R1K1 w - - 0 23",
    "solution": [
      "Qa8#"
    ],
    "solutionUci": [
      "a7a8"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1386,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "h4g3",
    "preMoveFen": "2k4r/Q1p2pp1/5n2/3rNq2/4p2p/6Pb/PPP1BP1P/R3R1K1 b - - 1 22"
  },
  {
    "id": "00HZa",
    "puzzleIndex": 179,
    "title": "Exercise 179: White to Move",
    "fen": "6k1/6pp/1p6/p1n5/4q3/1P2pN2/P4PPP/3Q2K1 w - - 0 29",
    "solution": [
      "Qd8+",
      "Kf7",
      "Ng5+",
      "Kg6",
      "Nxe4"
    ],
    "solutionUci": [
      "d1d8",
      "g8f7",
      "f3g5",
      "f7g6",
      "g5e4"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Fork, Long Tactic, Master",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 959,
    "themes": "crushing endgame fork long master",
    "preMove": "f4e3",
    "preMoveFen": "6k1/6pp/1p6/p1n5/4qp2/1P2PN2/P4PPP/3Q2K1 b - - 0 28"
  },
  {
    "id": "00HeG",
    "puzzleIndex": 180,
    "title": "Exercise 180: Black to Move",
    "fen": "8/1p5k/p3p1q1/3pP3/2p3PQ/2P5/PP6/2K5 b - - 4 33",
    "solution": [
      "Qh6+",
      "Qxh6+",
      "Kxh6"
    ],
    "solutionUci": [
      "g6h6",
      "h4h6",
      "h7h6"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Master, Queen Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 851,
    "themes": "crushing endgame master queenEndgame short",
    "preMove": "f6h4",
    "preMoveFen": "8/1p5k/p3pQq1/3pP3/2p3P1/2P5/PP6/2K5 w - - 3 33"
  },
  {
    "id": "00Hfa",
    "puzzleIndex": 181,
    "title": "Exercise 181: White to Move",
    "fen": "6k1/5ppp/5Bq1/8/p3R3/P6P/5rB1/R5K1 w - - 0 30",
    "solution": [
      "Re8#"
    ],
    "solutionUci": [
      "e4e8"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 643,
    "themes": "endgame mate mateIn1 oneMove",
    "preMove": "c2f2",
    "preMoveFen": "6k1/5ppp/5Bq1/8/p3R3/P6P/2r2QB1/R5K1 b - - 0 29"
  },
  {
    "id": "00Hk4",
    "puzzleIndex": 182,
    "title": "Exercise 182: Black to Move",
    "fen": "5rk1/p4ppp/4p3/1Q6/1P1BN1b1/8/Pq3PPP/2R1KB1R b K - 0 18",
    "solution": [
      "Qxc1#"
    ],
    "solutionUci": [
      "b2c1"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 821,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "a1c1",
    "preMoveFen": "5rk1/p4ppp/4p3/1Q6/1P1BN1b1/8/Pq3PPP/R1r1KB1R w KQ - 2 18"
  },
  {
    "id": "00HnR",
    "puzzleIndex": 183,
    "title": "Exercise 183: Black to Move",
    "fen": "q5kr/p4p2/4b1p1/4B2p/5n2/2P5/P1Q2PPP/3R1RK1 b - - 0 21",
    "solution": [
      "Qxg2#"
    ],
    "solutionUci": [
      "a8g2"
    ],
    "description": "Black to move. Themes: Master, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 769,
    "themes": "master mate mateIn1 middlegame oneMove",
    "preMove": "d6e5",
    "preMoveFen": "q5kr/p4p2/3Bb1p1/4p2p/5n2/2P5/P1Q2PPP/3R1RK1 w - - 4 21"
  },
  {
    "id": "00Htd",
    "puzzleIndex": 184,
    "title": "Exercise 184: Black to Move",
    "fen": "rnbqk2r/1p3ppp/p4b2/2PQ4/8/2N2N2/PP2PPPP/R3KB1R b KQkq - 0 9",
    "solution": [
      "Bxc3+",
      "bxc3",
      "Qxd5"
    ],
    "solutionUci": [
      "f6c3",
      "b2c3",
      "d8d5"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Zwischenzug, Opening, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 944,
    "themes": "crushing intermezzo opening short",
    "preMove": "d1d5",
    "preMoveFen": "rnbqk2r/1p3ppp/p4b2/2Pp4/8/2N2N2/PP2PPPP/R2QKB1R w KQkq - 0 9"
  },
  {
    "id": "00Hut",
    "puzzleIndex": 185,
    "title": "Exercise 185: Black to Move",
    "fen": "r4rk1/4p1bp/3p2p1/q1pP1P2/4QP2/4B3/1pK4P/1B1R3R b - - 1 22",
    "solution": [
      "Qc3#"
    ],
    "solutionUci": [
      "a5c3"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1189,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "c1c2",
    "preMoveFen": "r4rk1/4p1bp/3p2p1/q1pP1P2/4QP2/4B3/1p5P/1BKR3R w - - 0 22"
  },
  {
    "id": "00Hxb",
    "puzzleIndex": 186,
    "title": "Exercise 186: White to Move",
    "fen": "1rb2k2/p4ppp/2B5/2pr1NP1/2P5/P7/7P/4R1K1 w - - 0 28",
    "solution": [
      "Re8#"
    ],
    "solutionUci": [
      "e1e8"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 1, One-Move Tactic, Opera Mate",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1125,
    "themes": "endgame mate mateIn1 oneMove operaMate",
    "preMove": "d8d5",
    "preMoveFen": "1rbr1k2/p4ppp/2B5/2pR1NP1/2P5/P7/7P/4R1K1 b - - 0 27"
  },
  {
    "id": "00HzH",
    "puzzleIndex": 187,
    "title": "Exercise 187: White to Move",
    "fen": "5rk1/p2q2p1/1p2p1Np/3p3P/3Pb1P1/2P5/PP3R2/6K1 w - - 0 34",
    "solution": [
      "Rxf8+",
      "Kh7",
      "Rh8#"
    ],
    "solutionUci": [
      "f2f8",
      "g8h7",
      "f8h8"
    ],
    "description": "White to move. Themes: Endgame, Hook Mate, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 762,
    "themes": "endgame hookMate mate mateIn2 short",
    "preMove": "c8f8",
    "preMoveFen": "2r2Qk1/p2q2p1/1p2p1Np/3p3P/3Pb1P1/2P5/PP3R2/6K1 b - - 4 33"
  },
  {
    "id": "00HzR",
    "puzzleIndex": 188,
    "title": "Exercise 188: Black to Move",
    "fen": "8/8/p2k4/1pp5/7P/1PKP1RP1/7r/8 b - - 1 46",
    "solution": [
      "b4+",
      "Kc4",
      "Rc2#"
    ],
    "solutionUci": [
      "b5b4",
      "c3c4",
      "h2c2"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 2, Rook Endgame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 940,
    "themes": "endgame mate mateIn2 rookEndgame short",
    "preMove": "c4c3",
    "preMoveFen": "8/8/p2k4/1pp5/2K4P/1P1P1RP1/7r/8 w - - 0 46"
  },
  {
    "id": "00I8g",
    "puzzleIndex": 189,
    "title": "Exercise 189: Black to Move",
    "fen": "4rk2/3Rnrp1/8/4Q1P1/8/6K1/8/8 b - - 0 50",
    "solution": [
      "Nf5+",
      "Qxf5",
      "Rxf5"
    ],
    "solutionUci": [
      "e7f5",
      "e5f5",
      "f7f5"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 887,
    "themes": "crushing endgame short",
    "preMove": "h4g5",
    "preMoveFen": "4rk2/3Rnrp1/8/4Q1p1/7P/6K1/8/8 w - - 0 50"
  },
  {
    "id": "00ICz",
    "puzzleIndex": 190,
    "title": "Exercise 190: White to Move",
    "fen": "2k3r1/1p1q3p/1p2p3/1NbpQr2/P1p2P2/6P1/6KP/R4R2 w - - 1 32",
    "solution": [
      "Na7+",
      "Kd8",
      "Qb8+",
      "Ke7",
      "Qxg8"
    ],
    "solutionUci": [
      "b5a7",
      "c8d8",
      "e5b8",
      "d8e7",
      "b8g8"
    ],
    "description": "White to move. Themes: Crushing Advantage, Long Tactic, Middlegame, Skewer",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1161,
    "themes": "crushing long middlegame skewer",
    "preMove": "f8f5",
    "preMoveFen": "2k2rr1/1p1q3p/1p2p3/1NbpQ3/P1p2P2/6P1/6KP/R4R2 b - - 0 31"
  },
  {
    "id": "00IEW",
    "puzzleIndex": 191,
    "title": "Exercise 191: White to Move",
    "fen": "2r3k1/6p1/R6p/3P1N2/8/3K4/5b2/8 w - - 6 58",
    "solution": [
      "Ne7+",
      "Kf7",
      "Nxc8"
    ],
    "solutionUci": [
      "f5e7",
      "g8f7",
      "e7c8"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 843,
    "themes": "crushing endgame fork short",
    "preMove": "c2c8",
    "preMoveFen": "6k1/6p1/R6p/3P1N2/8/3K4/2r2b2/8 b - - 5 57"
  },
  {
    "id": "00IF1",
    "puzzleIndex": 192,
    "title": "Exercise 192: White to Move",
    "fen": "1k6/p1p5/P2p4/3P4/1PK2r1p/4P3/8/4B3 w - - 0 58",
    "solution": [
      "exf4",
      "h3",
      "Bg3"
    ],
    "solutionUci": [
      "e3f4",
      "h4h3",
      "e1g3"
    ],
    "description": "White to move. Themes: Crushing Advantage, DefensiveMove, Endgame, Hanging Piece, Short Tactic",
    "hint": "Look for undefended or hanging material!",
    "rating": 1274,
    "themes": "crushing defensiveMove endgame hangingPiece short",
    "preMove": "f2f4",
    "preMoveFen": "1k6/p1p5/P2p4/3P4/1PK2N1p/4P3/5r2/4B3 b - - 12 57"
  },
  {
    "id": "00ISm",
    "puzzleIndex": 193,
    "title": "Exercise 193: White to Move",
    "fen": "5r2/5p1k/2ppq1p1/4p1b1/4N2P/3P4/1P1R1P2/4K1R1 w - - 0 30",
    "solution": [
      "Nxg5+",
      "Kh6",
      "Nxe6"
    ],
    "solutionUci": [
      "e4g5",
      "h7h6",
      "g5e6"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 907,
    "themes": "crushing endgame fork short",
    "preMove": "e7g5",
    "preMoveFen": "5r2/4bp1k/2ppq1p1/4p1Q1/4N2P/3P4/1P1R1P2/4K1R1 b - - 0 29"
  },
  {
    "id": "00ITc",
    "puzzleIndex": 194,
    "title": "Exercise 194: White to Move",
    "fen": "3r1rk1/5pp1/7p/8/b2Qp1n1/1P6/PB1q1PP1/R5K1 w - - 0 26",
    "solution": [
      "Qxg7#"
    ],
    "solutionUci": [
      "d4g7"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 921,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "d7a4",
    "preMoveFen": "3r1rk1/3b1pp1/7p/8/N2Qp1n1/1P6/PB1q1PP1/R5K1 b - - 1 25"
  },
  {
    "id": "00IaZ",
    "puzzleIndex": 195,
    "title": "Exercise 195: White to Move",
    "fen": "4R3/4R3/1k1K2p1/1P6/1P6/2rp3r/8/8 w - - 4 46",
    "solution": [
      "Rb8#"
    ],
    "solutionUci": [
      "e8b8"
    ],
    "description": "White to move. Themes: Endgame, Master, Checkmate, Mate in 1, One-Move Tactic, Rook Endgame",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 923,
    "themes": "endgame master mate mateIn1 oneMove rookEndgame",
    "preMove": "b7b6",
    "preMoveFen": "4R3/1k2R3/3K2p1/1P6/1P6/2rp3r/8/8 b - - 3 45"
  },
  {
    "id": "00J1Y",
    "puzzleIndex": 196,
    "title": "Exercise 196: White to Move",
    "fen": "1q3r2/p5k1/1p2pbpp/2p5/2P1p3/2P2PQP/PP3P2/6RK w - - 0 30",
    "solution": [
      "Qxg6+",
      "Kh8",
      "Qxh6#"
    ],
    "solutionUci": [
      "g3g6",
      "g7h8",
      "g6h6"
    ],
    "description": "White to move. Themes: Deflection, Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1099,
    "themes": "deflection endgame mate mateIn2 short",
    "preMove": "f5e4",
    "preMoveFen": "1q3r2/p5k1/1p2pbpp/2p2p2/2P1N3/2P2PQP/PP3P2/6RK b - - 2 29"
  },
  {
    "id": "00J9b",
    "puzzleIndex": 197,
    "title": "Exercise 197: White to Move",
    "fen": "4k2r/4bppp/5n2/4N3/3P4/2P3P1/rp1KQP1P/1q6 w k - 0 22",
    "solution": [
      "Qb5+",
      "Kf8",
      "Qb8+",
      "Ne8",
      "Nd7+",
      "Kg8",
      "Qxe8+",
      "Bf8",
      "Qxf8#"
    ],
    "solutionUci": [
      "e2b5",
      "e8f8",
      "b5b8",
      "f6e8",
      "e5d7",
      "f8g8",
      "b8e8",
      "e7f8",
      "e8f8"
    ],
    "description": "White to move. Themes: Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1331,
    "themes": "middlegame",
    "preMove": "h1b1",
    "preMoveFen": "4k2r/4bppp/5n2/4N3/3P4/2P3P1/rp1KQP1P/1R5q b k - 1 21"
  },
  {
    "id": "00JAo",
    "puzzleIndex": 198,
    "title": "Exercise 198: White to Move",
    "fen": "8/5r2/7k/6pp/7P/5PK1/R7/8 w - - 0 59",
    "solution": [
      "Ra6+",
      "Kg7",
      "hxg5"
    ],
    "solutionUci": [
      "a2a6",
      "h6g7",
      "h4g5"
    ],
    "description": "White to move. Themes: Crushing Advantage, Deflection, Endgame, Master, Rook Endgame, Short Tactic",
    "hint": "Deflect the key defender away from its crucial post!",
    "rating": 1167,
    "themes": "crushing deflection endgame master rookEndgame short",
    "preMove": "g6g5",
    "preMoveFen": "8/5r2/6pk/7p/7P/5PK1/R7/8 b - - 2 58"
  },
  {
    "id": "00JO7",
    "puzzleIndex": 199,
    "title": "Exercise 199: White to Move",
    "fen": "5rk1/pp4pR/4p1r1/2qp4/8/2P4Q/PP3RPP/6K1 w - - 1 23",
    "solution": [
      "Rh8#"
    ],
    "solutionUci": [
      "h7h8"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 986,
    "themes": "endgame mate mateIn1 oneMove",
    "preMove": "c7c5",
    "preMoveFen": "5rk1/ppq3pR/4p1r1/3p4/8/2P4Q/PP3RPP/6K1 b - - 0 22"
  },
  {
    "id": "00JaW",
    "puzzleIndex": 200,
    "title": "Exercise 200: White to Move",
    "fen": "8/8/rk5p/3R2p1/4p1P1/4P3/3K4/8 w - - 0 49",
    "solution": [
      "Rd6+",
      "Ka5",
      "Rxa6+",
      "Kxa6",
      "Kc3",
      "Kb7",
      "Kd4"
    ],
    "solutionUci": [
      "d5d6",
      "b6a5",
      "d6a6",
      "a5a6",
      "d2c3",
      "a6b7",
      "c3d4"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, ExposedKing, Rook Endgame, Deep Calculation",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1080,
    "themes": "crushing endgame exposedKing rookEndgame veryLong",
    "preMove": "a7a6",
    "preMoveFen": "8/r7/Pk5p/3R2p1/4p1P1/4P3/3K4/8 b - - 0 48"
  },
  {
    "id": "00JfN",
    "puzzleIndex": 201,
    "title": "Exercise 201: White to Move",
    "fen": "r6r/1bpnk3/1p1pB3/pP1P4/P3PQP1/2b2N1q/2P2P2/R3R1K1 w - - 0 25",
    "solution": [
      "Qf7+",
      "Kd8",
      "Qxd7#"
    ],
    "solutionUci": [
      "f4f7",
      "e7d8",
      "f7d7"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 2, Middlegame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 949,
    "themes": "mate mateIn2 middlegame short",
    "preMove": "h5h3",
    "preMoveFen": "r6r/1bpnk3/1p1pB3/pP1P3q/P3PQP1/2b2N1P/2P2P2/R3R1K1 b - - 0 24"
  },
  {
    "id": "00K0G",
    "puzzleIndex": 202,
    "title": "Exercise 202: White to Move",
    "fen": "8/8/8/2Pk4/pK4p1/3N4/4bP2/8 w - - 8 60",
    "solution": [
      "Nf4+",
      "Kc6",
      "Nxe2"
    ],
    "solutionUci": [
      "d3f4",
      "d5c6",
      "f4e2"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Fork, Master, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 777,
    "themes": "crushing endgame fork master short",
    "preMove": "d1e2",
    "preMoveFen": "8/8/8/2Pk4/pK4p1/3N4/5P2/3b4 b - - 7 59"
  },
  {
    "id": "00K8j",
    "puzzleIndex": 203,
    "title": "Exercise 203: Black to Move",
    "fen": "r2q2kr/p1B2pp1/4b2p/n1Qn4/8/4P3/PP3PPP/2KR1BNR b - - 2 14",
    "solution": [
      "Qxc7",
      "Qxc7",
      "Nxc7"
    ],
    "solutionUci": [
      "d8c7",
      "c5c7",
      "d5c7"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Opening, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1380,
    "themes": "advantage opening short",
    "preMove": "f4c7",
    "preMoveFen": "r2q2kr/p4pp1/4b2p/n1Qn4/5B2/4P3/PP3PPP/2KR1BNR w - - 1 14"
  },
  {
    "id": "00KAq",
    "puzzleIndex": 204,
    "title": "Exercise 204: Black to Move",
    "fen": "5rr1/3pk1q1/p3p3/1pP4p/1P1R1p2/2P2QP1/1P3P1P/5RK1 b - - 2 26",
    "solution": [
      "fxg3",
      "Rxd7+",
      "Kxd7",
      "Qb7+",
      "Ke8"
    ],
    "solutionUci": [
      "f4g3",
      "d4d7",
      "e7d7",
      "f3b7",
      "d7e8"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, Long Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1304,
    "themes": "advantage endgame long",
    "preMove": "d6d4",
    "preMoveFen": "5rr1/3pk1q1/p2Rp3/1pP4p/1P3p2/2P2QP1/1P3P1P/5RK1 w - - 1 26"
  },
  {
    "id": "00KMV",
    "puzzleIndex": 205,
    "title": "Exercise 205: White to Move",
    "fen": "1r3k2/1p1q1p2/p2p2p1/2pP2bp/2P1n1n1/1PQ3P1/P3N1K1/3N1R1R w - - 0 29",
    "solution": [
      "Qh8+",
      "Ke7",
      "Qxb8"
    ],
    "solutionUci": [
      "c3h8",
      "f8e7",
      "h8b8"
    ],
    "description": "White to move. Themes: Crushing Advantage, Middlegame, Short Tactic, Skewer",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 922,
    "themes": "crushing middlegame short skewer",
    "preMove": "f6e4",
    "preMoveFen": "1r3k2/1p1q1p2/p2p1np1/2pP2bp/2P1P1n1/1PQ3P1/P3N1K1/3N1R1R b - - 11 28"
  },
  {
    "id": "00KO5",
    "puzzleIndex": 206,
    "title": "Exercise 206: White to Move",
    "fen": "2r2rk1/3p1ppp/p3p3/1p6/6P1/3Q4/PP5q/1K2RR2 w - - 0 23",
    "solution": [
      "Rh1",
      "Qc2+",
      "Qxc2",
      "Rxc2",
      "Kxc2"
    ],
    "solutionUci": [
      "f1h1",
      "h2c2",
      "d3c2",
      "c8c2",
      "b1c2"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Long Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1323,
    "themes": "advantage endgame long",
    "preMove": "e5h2",
    "preMoveFen": "2r2rk1/3p1ppp/p3p3/1p2q3/6P1/3Q4/PP5P/1K2RR2 b - - 0 22"
  },
  {
    "id": "00KOz",
    "puzzleIndex": 207,
    "title": "Exercise 207: White to Move",
    "fen": "8/r4k2/7R/3n1PK1/8/8/8/8 w - - 4 57",
    "solution": [
      "Rh7+",
      "Kf8",
      "Rxa7"
    ],
    "solutionUci": [
      "h6h7",
      "f7f8",
      "h7a7"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Master, Short Tactic, Skewer",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 960,
    "themes": "crushing endgame master short skewer",
    "preMove": "b4d5",
    "preMoveFen": "8/r4k2/7R/5PK1/1n6/8/8/8 b - - 3 56"
  },
  {
    "id": "00KRo",
    "puzzleIndex": 208,
    "title": "Exercise 208: White to Move",
    "fen": "4r3/pp1b2pp/8/2pPkpK1/2P1p2P/2P3P1/P3R3/2B5 w - - 3 27",
    "solution": [
      "Bf4#"
    ],
    "solutionUci": [
      "c1f4"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 906,
    "themes": "endgame mate mateIn1 oneMove",
    "preMove": "d6e5",
    "preMoveFen": "4r3/pp1b2pp/3k4/2pP1pK1/2P1p2P/2P3P1/P3R3/2B5 b - - 2 26"
  },
  {
    "id": "00KVO",
    "puzzleIndex": 209,
    "title": "Exercise 209: Black to Move",
    "fen": "4r3/R5p1/4r2p/3k1n2/3p4/P5B1/1P4PP/4R1K1 b - - 0 28",
    "solution": [
      "Rxe1+",
      "Bxe1",
      "Rxe1+"
    ],
    "solutionUci": [
      "e6e1",
      "g3e1",
      "e8e1"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 834,
    "themes": "crushing endgame short",
    "preMove": "c7a7",
    "preMoveFen": "4r3/p1R3p1/4r2p/3k1n2/3p4/P5B1/1P4PP/4R1K1 w - - 2 28"
  },
  {
    "id": "00KYE",
    "puzzleIndex": 210,
    "title": "Exercise 210: Black to Move",
    "fen": "r1b2k1r/pp4p1/2pq2p1/3p4/3Q4/1N6/PPP2PPP/R4RK1 b - - 0 17",
    "solution": [
      "Qxh2#"
    ],
    "solutionUci": [
      "d6h2"
    ],
    "description": "Black to move. Themes: KingsideAttack, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 894,
    "themes": "kingsideAttack mate mateIn1 middlegame oneMove",
    "preMove": "d1d4",
    "preMoveFen": "r1b2k1r/pp4p1/2pq2p1/3p4/3p4/1N6/PPP2PPP/R2Q1RK1 w - - 0 17"
  },
  {
    "id": "00KYU",
    "puzzleIndex": 211,
    "title": "Exercise 211: White to Move",
    "fen": "3r1k2/p2n3p/1p2Bpp1/2r2N2/4q3/6QP/P5P1/5R1K w - - 2 41",
    "solution": [
      "Qd6+",
      "Ke8",
      "Qe7#"
    ],
    "solutionUci": [
      "g3d6",
      "f8e8",
      "d6e7"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 2, Middlegame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1272,
    "themes": "mate mateIn2 middlegame short",
    "preMove": "g7f8",
    "preMoveFen": "3r4/p2n2kp/1p2Bpp1/2r2N2/4q3/6QP/P5P1/5R1K b - - 1 40"
  },
  {
    "id": "00Keu",
    "puzzleIndex": 212,
    "title": "Exercise 212: White to Move",
    "fen": "R7/1p3kp1/2pK3p/3p1PP1/3r2nP/8/1P6/8 w - - 0 40",
    "solution": [
      "g6+",
      "Kf6",
      "Rf8#"
    ],
    "solutionUci": [
      "g5g6",
      "f7f6",
      "a8f8"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 882,
    "themes": "endgame mate mateIn2 short",
    "preMove": "b4d4",
    "preMoveFen": "R7/1p3kp1/2pK3p/3p1PP1/1r1B2nP/8/1P6/8 b - - 2 39"
  },
  {
    "id": "00KgR",
    "puzzleIndex": 213,
    "title": "Exercise 213: White to Move",
    "fen": "7k/1pq3p1/2p2r1p/3pPQ2/1p1P4/7P/1rB4K/5R2 w - - 0 36",
    "solution": [
      "Qh7#"
    ],
    "solutionUci": [
      "f5h7"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 782,
    "themes": "endgame mate mateIn1 oneMove",
    "preMove": "f8f6",
    "preMoveFen": "5r1k/1pq3p1/2p2P1p/3pPQ2/1p1P4/7P/1rB4K/5R2 b - - 1 35"
  },
  {
    "id": "00KhM",
    "puzzleIndex": 214,
    "title": "Exercise 214: White to Move",
    "fen": "5rk1/5ppp/1r6/3Qp3/2B1P3/2q3P1/3R1PKP/8 w - - 0 28",
    "solution": [
      "Qxf7+",
      "Rxf7",
      "Rd8#"
    ],
    "solutionUci": [
      "d5f7",
      "f8f7",
      "d2d8"
    ],
    "description": "White to move. Themes: Clearance Sacrifice, Endgame, Checkmate, Mate in 2, Pin, Tactical Sacrifice, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1331,
    "themes": "clearance endgame mate mateIn2 pin sacrifice short",
    "preMove": "b1b6",
    "preMoveFen": "5rk1/5ppp/1R6/3Qp3/2B1P3/2q3P1/3R1PKP/1r6 b - - 0 27"
  },
  {
    "id": "00Kyy",
    "puzzleIndex": 215,
    "title": "Exercise 215: Black to Move",
    "fen": "Q7/8/8/5k2/8/5pr1/5r2/R6K b - - 0 50",
    "solution": [
      "Rh3+",
      "Kg1",
      "Rg2+",
      "Kf1",
      "Rh1#"
    ],
    "solutionUci": [
      "g3h3",
      "h1g1",
      "f2g2",
      "g1f1",
      "h3h1"
    ],
    "description": "Black to move. Themes: Endgame, ExposedKing, Long Tactic, Master, Checkmate, Mate in 3, Queen & Rook Endgame",
    "hint": "Calculate a forcing checkmate combination!",
    "rating": 1242,
    "themes": "endgame exposedKing long master mate mateIn3 queenRookEndgame",
    "preMove": "a7a8q",
    "preMoveFen": "8/P7/8/5k2/8/5pr1/5r2/R6K w - - 0 50"
  },
  {
    "id": "00L4x",
    "puzzleIndex": 216,
    "title": "Exercise 216: White to Move",
    "fen": "1r4k1/4Pp1p/p5pb/2q5/p2n4/P2Q2B1/r2N1PPP/3KR2R w - - 1 28",
    "solution": [
      "e8=Q+",
      "Rxe8",
      "Rxe8+"
    ],
    "solutionUci": [
      "e7e8q",
      "b8e8",
      "e1e8"
    ],
    "description": "White to move. Themes: AdvancedPawn, Crushing Advantage, KingsideAttack, Middlegame, Promotion, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1226,
    "themes": "advancedPawn crushing kingsideAttack middlegame promotion short",
    "preMove": "g7h6",
    "preMoveFen": "1r4k1/4Ppbp/p5p1/2q5/p2n4/P2Q2B1/r2N1PPP/3KR2R b - - 0 27"
  },
  {
    "id": "00L76",
    "puzzleIndex": 217,
    "title": "Exercise 217: White to Move",
    "fen": "5rk1/5p2/4p1p1/7R/2P5/2n2N2/5r2/2K4R w - - 0 38",
    "solution": [
      "Rh8+",
      "Kg7",
      "R1h7+",
      "Kf6",
      "Rxf8"
    ],
    "solutionUci": [
      "h5h8",
      "g8g7",
      "h1h7",
      "g7f6",
      "h8f8"
    ],
    "description": "White to move. Themes: Crushing Advantage, Deflection, Endgame, Long Tactic",
    "hint": "Deflect the key defender away from its crucial post!",
    "rating": 1078,
    "themes": "crushing deflection endgame long",
    "preMove": "g7g6",
    "preMoveFen": "5rk1/5pp1/4p3/7R/2P5/2n2N2/5r2/2K4R b - - 2 37"
  },
  {
    "id": "00L84",
    "puzzleIndex": 218,
    "title": "Exercise 218: Black to Move",
    "fen": "6k1/5pp1/7p/2p5/2P5/1Rrp2PP/P4P2/5K2 b - - 1 37",
    "solution": [
      "Rc1+",
      "Kg2",
      "d2"
    ],
    "solutionUci": [
      "c3c1",
      "f1g2",
      "d3d2"
    ],
    "description": "Black to move. Themes: AdvancedPawn, Crushing Advantage, Endgame, Master, Rook Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1152,
    "themes": "advancedPawn crushing endgame master rookEndgame short",
    "preMove": "b2b3",
    "preMoveFen": "6k1/5pp1/7p/2p5/2P5/2rp2PP/PR3P2/5K2 w - - 0 37"
  },
  {
    "id": "00LI0",
    "puzzleIndex": 219,
    "title": "Exercise 219: Black to Move",
    "fen": "r2qk2r/pp1n1ppp/4pn2/3N2B1/1b1P4/4QN1P/PPb1BPP1/R4RK1 b kq - 0 12",
    "solution": [
      "Nxd5",
      "Bxd8",
      "Nxe3"
    ],
    "solutionUci": [
      "f6d5",
      "g5d8",
      "d5e3"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Hanging Piece, Middlegame, Short Tactic",
    "hint": "Look for undefended or hanging material!",
    "rating": 1289,
    "themes": "crushing hangingPiece middlegame short",
    "preMove": "c3d5",
    "preMoveFen": "r2qk2r/pp1n1ppp/4pn2/3p2B1/1b1P4/2N1QN1P/PPb1BPP1/R4RK1 w kq - 0 12"
  },
  {
    "id": "00LNB",
    "puzzleIndex": 220,
    "title": "Exercise 220: White to Move",
    "fen": "kr6/1pR4p/p4R2/n7/P3p3/3rB3/6PP/6K1 w - - 1 39",
    "solution": [
      "Rxa6+",
      "bxa6",
      "Ra7#"
    ],
    "solutionUci": [
      "f6a6",
      "b7a6",
      "c7a7"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 2, Opera Mate, Tactical Sacrifice, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1115,
    "themes": "endgame mate mateIn2 operaMate sacrifice short",
    "preMove": "d5d3",
    "preMoveFen": "kr6/1pR4p/p4R2/n2r4/P3p3/4B3/6PP/6K1 b - - 0 38"
  },
  {
    "id": "00LPw",
    "puzzleIndex": 221,
    "title": "Exercise 221: White to Move",
    "fen": "1rb4r/pp1nb1pp/6k1/3np3/2q1P3/2N2Q2/PPP2PPP/R1B1K2R w KQ - 0 13",
    "solution": [
      "Qf5#"
    ],
    "solutionUci": [
      "f3f5"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1148,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "f6d5",
    "preMoveFen": "1rb4r/pp1nb1pp/5nk1/3Np3/2q1P3/2N2Q2/PPP2PPP/R1B1K2R b KQ - 4 12"
  },
  {
    "id": "00LUZ",
    "puzzleIndex": 222,
    "title": "Exercise 222: Black to Move",
    "fen": "rnb1k1nr/1ppp1ppp/8/p1bPp3/4P2q/2PB1N2/PP3PPP/RNBQK2R b KQkq - 4 6",
    "solution": [
      "Qxf2#"
    ],
    "solutionUci": [
      "h4f2"
    ],
    "description": "Black to move. Themes: AttackingF2F7, Checkmate, Mate in 1, One-Move Tactic, Opening",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 683,
    "themes": "attackingF2F7 mate mateIn1 oneMove opening",
    "preMove": "g1f3",
    "preMoveFen": "rnb1k1nr/1ppp1ppp/8/p1bPp3/4P2q/2PB4/PP3PPP/RNBQK1NR w KQkq - 3 6"
  },
  {
    "id": "00LWX",
    "puzzleIndex": 223,
    "title": "Exercise 223: Black to Move",
    "fen": "2r4k/5p2/4pNp1/6Pp/qQ5P/7r/2P5/1RKN4 b - - 3 37",
    "solution": [
      "Rxc2#"
    ],
    "solutionUci": [
      "c8c2"
    ],
    "description": "Black to move. Themes: EpauletteMate, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 821,
    "themes": "epauletteMate mate mateIn1 middlegame oneMove",
    "preMove": "d2b4",
    "preMoveFen": "2r4k/5p2/4pNp1/6Pp/q6P/7r/2PQ4/1RKN4 w - - 2 37"
  },
  {
    "id": "00LWa",
    "puzzleIndex": 224,
    "title": "Exercise 224: Black to Move",
    "fen": "2r3k1/5ppp/2P5/8/5P2/P5Pn/6BP/R5RK b - - 0 32",
    "solution": [
      "Nf2#"
    ],
    "solutionUci": [
      "h3f2"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 1, One-Move Tactic, Smothered Mate",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 867,
    "themes": "endgame mate mateIn1 oneMove smotheredMate",
    "preMove": "e1g1",
    "preMoveFen": "2r3k1/5ppp/2P5/8/5P2/P5Pn/6BP/R3R1qK w - - 6 32"
  },
  {
    "id": "00Lh9",
    "puzzleIndex": 225,
    "title": "Exercise 225: Black to Move",
    "fen": "4r3/7P/1p4Q1/1b4B1/1k4n1/8/1P2n1P1/4R2K b - - 3 41",
    "solution": [
      "Ng3+",
      "Kg1",
      "Rxe1#"
    ],
    "solutionUci": [
      "e2g3",
      "h1g1",
      "e8e1"
    ],
    "description": "Black to move. Themes: Discovered Attack, Checkmate, Mate in 2, Middlegame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1316,
    "themes": "discoveredAttack mate mateIn2 middlegame short",
    "preMove": "h2h1",
    "preMoveFen": "4r3/7P/1p4Q1/1b4B1/1k4n1/8/1P2n1PK/4R3 w - - 2 41"
  },
  {
    "id": "00Lnf",
    "puzzleIndex": 226,
    "title": "Exercise 226: White to Move",
    "fen": "r4knb/1bpp4/p1n1p2q/1p4NQ/3PP3/2N5/PPP2PP1/2KR1B2 w - - 4 16",
    "solution": [
      "Qf7#"
    ],
    "solutionUci": [
      "h5f7"
    ],
    "description": "White to move. Themes: Master, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 987,
    "themes": "master mate mateIn1 middlegame oneMove",
    "preMove": "f6h6",
    "preMoveFen": "r4knb/1bpp4/p1n1pq2/1p4NQ/3PP3/2N5/PPP2PP1/2KR1B2 b - - 3 15"
  },
  {
    "id": "00Lvv",
    "puzzleIndex": 227,
    "title": "Exercise 227: White to Move",
    "fen": "2k2br1/1pprn3/p4p2/4p2Q/4P2P/2N1q3/PP4PK/3R4 w - - 0 23",
    "solution": [
      "Qe8+",
      "Rd8",
      "Rxd8#"
    ],
    "solutionUci": [
      "h5e8",
      "d7d8",
      "d1d8"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 2, Middlegame, QueensideAttack, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 650,
    "themes": "mate mateIn2 middlegame queensideAttack short",
    "preMove": "d3e3",
    "preMoveFen": "2k2br1/1pprn3/p4p2/4p2Q/4P2P/2NqB3/PP4PK/3R4 b - - 1 22"
  },
  {
    "id": "00M92",
    "puzzleIndex": 228,
    "title": "Exercise 228: White to Move",
    "fen": "3q1r1k/p3r1pp/1p1b1p2/2p5/3pR2N/1QPn2P1/PP1B1P1P/R5K1 w - - 0 22",
    "solution": [
      "Ng6+",
      "hxg6",
      "Rh4#"
    ],
    "solutionUci": [
      "h4g6",
      "h7g6",
      "e4h4"
    ],
    "description": "White to move. Themes: Clearance Sacrifice, KingsideAttack, Checkmate, Mate in 2, Middlegame, Tactical Sacrifice, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1010,
    "themes": "clearance kingsideAttack mate mateIn2 middlegame sacrifice short",
    "preMove": "e5d3",
    "preMoveFen": "3q1r1k/p3r1pp/1p1b1p2/2p1n3/3pR2N/1QPP2P1/PP1B1P1P/R5K1 b - - 3 21"
  },
  {
    "id": "00MFe",
    "puzzleIndex": 229,
    "title": "Exercise 229: White to Move",
    "fen": "7k/p5pp/2r2q2/2p4Q/8/8/P5PP/3r1R1K w - - 0 30",
    "solution": [
      "Qe8+",
      "Qf8",
      "Qxf8#"
    ],
    "solutionUci": [
      "h5e8",
      "f6f8",
      "e8f8"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1238,
    "themes": "endgame mate mateIn2 short",
    "preMove": "d8d1",
    "preMoveFen": "3r3k/p5pp/2r2q2/2p4Q/8/8/P5PP/3R1R1K b - - 5 29"
  },
  {
    "id": "00MGA",
    "puzzleIndex": 230,
    "title": "Exercise 230: Black to Move",
    "fen": "r3r1k1/6b1/p2Nn2p/1P1Qp3/6nq/2P3P1/1PB2P2/R1B1R1K1 b - - 0 30",
    "solution": [
      "Qh2+",
      "Kf1",
      "Qxf2#"
    ],
    "solutionUci": [
      "h4h2",
      "g1f1",
      "h2f2"
    ],
    "description": "Black to move. Themes: KingsideAttack, Checkmate, Mate in 2, Middlegame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 915,
    "themes": "kingsideAttack mate mateIn2 middlegame short",
    "preMove": "g2g3",
    "preMoveFen": "r3r1k1/6b1/p2Nn2p/1P1Qp3/6nq/2P5/1PB2PP1/R1B1R1K1 w - - 1 30"
  },
  {
    "id": "00MS3",
    "puzzleIndex": 231,
    "title": "Exercise 231: White to Move",
    "fen": "rn1qr1k1/1p3ppp/2p2b2/p2p4/3P4/2N2N2/PPP1QPPP/2KRR3 w - - 0 13",
    "solution": [
      "Qxe8+",
      "Qxe8",
      "Rxe8#"
    ],
    "solutionUci": [
      "e2e8",
      "d8e8",
      "e1e8"
    ],
    "description": "White to move. Themes: Back-Rank Mate, Checkmate, Mate in 2, Middlegame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 807,
    "themes": "backRankMate mate mateIn2 middlegame short",
    "preMove": "e7f6",
    "preMoveFen": "rn1qr1k1/1p2bppp/2p2B2/p2p4/3P4/2N2N2/PPP1QPPP/2KRR3 b - - 0 12"
  },
  {
    "id": "00MTG",
    "puzzleIndex": 232,
    "title": "Exercise 232: White to Move",
    "fen": "4r1k1/2p1qpp1/3p4/1p1P2PQ/1P6/3R3P/2PBrb2/5RK1 w - - 7 27",
    "solution": [
      "Rxf2",
      "Rxf2",
      "Kxf2"
    ],
    "solutionUci": [
      "f1f2",
      "e2f2",
      "g1f2"
    ],
    "description": "White to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 725,
    "themes": "advantage middlegame short",
    "preMove": "h4f2",
    "preMoveFen": "4r1k1/2p1qpp1/3p4/1p1P2PQ/1P5b/3R3P/2PBr3/5RK1 b - - 6 26"
  },
  {
    "id": "00MTn",
    "puzzleIndex": 233,
    "title": "Exercise 233: Black to Move",
    "fen": "2rqk2r/3n4/1p2p3/p3N2R/Q1PP2p1/P2BP3/3K1Pb1/R7 b k - 0 22",
    "solution": [
      "Rxh5",
      "Bg6+",
      "Ke7",
      "Qxd7+",
      "Qxd7"
    ],
    "solutionUci": [
      "h8h5",
      "d3g6",
      "e8e7",
      "a4d7",
      "d8d7"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Hanging Piece, Long Tactic, Middlegame",
    "hint": "Look for undefended or hanging material!",
    "rating": 1335,
    "themes": "advantage hangingPiece long middlegame",
    "preMove": "h1h5",
    "preMoveFen": "2rqk2r/3n4/1p2p3/p3N2p/Q1PP2p1/P2BP3/3K1Pb1/R6R w k - 0 22"
  },
  {
    "id": "00MWz",
    "puzzleIndex": 234,
    "title": "Exercise 234: White to Move",
    "fen": "8/8/2B5/4pK2/3k1pPp/7P/8/6n1 w - - 4 58",
    "solution": [
      "g5",
      "Ne2",
      "g6"
    ],
    "solutionUci": [
      "g4g5",
      "g1e2",
      "g5g6"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Quiet Move, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 905,
    "themes": "crushing endgame quietMove short",
    "preMove": "f3g1",
    "preMoveFen": "8/8/2B5/4pK2/3k1pPp/5n1P/8/8 b - - 3 57"
  },
  {
    "id": "00MYL",
    "puzzleIndex": 235,
    "title": "Exercise 235: White to Move",
    "fen": "1R6/5Q2/p1kb1p2/2r1p3/3n4/P6P/5PP1/4qBK1 w - - 2 41",
    "solution": [
      "Qb7#"
    ],
    "solutionUci": [
      "f7b7"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1121,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "d7c6",
    "preMoveFen": "1R6/3k1Q2/p2b1p2/2r1p3/3n4/P6P/5PP1/4qBK1 b - - 1 40"
  },
  {
    "id": "00MeO",
    "puzzleIndex": 236,
    "title": "Exercise 236: White to Move",
    "fen": "r3kb1r/1p2np2/p1p4p/4Pbp1/3PN3/8/PPP3PP/R1B2RK1 w kq - 0 16",
    "solution": [
      "Nd6+",
      "Kd7",
      "Nxf5"
    ],
    "solutionUci": [
      "e4d6",
      "e8d7",
      "d6f5"
    ],
    "description": "White to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1327,
    "themes": "advantage middlegame short",
    "preMove": "c8f5",
    "preMoveFen": "r1b1kb1r/1p2np2/p1p4p/4PPp1/3PN3/8/PPP3PP/R1B2RK1 b kq - 0 15"
  },
  {
    "id": "00Mgf",
    "puzzleIndex": 237,
    "title": "Exercise 237: White to Move",
    "fen": "2RQ4/p4pp1/4p1kp/8/6PP/4qPK1/1r6/8 w - - 0 36",
    "solution": [
      "h5+",
      "Kh7",
      "Qg8#"
    ],
    "solutionUci": [
      "h4h5",
      "g6h7",
      "d8g8"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1124,
    "themes": "endgame mate mateIn2 short",
    "preMove": "a3e3",
    "preMoveFen": "2RQ4/p4pp1/4p1kp/8/6PP/q3PPK1/1r6/8 b - - 0 35"
  },
  {
    "id": "00Mj0",
    "puzzleIndex": 238,
    "title": "Exercise 238: Black to Move",
    "fen": "5R2/8/1p1p2p1/1P4k1/2P1P3/5KP1/8/6r1 b - - 18 55",
    "solution": [
      "Rf1+",
      "Ke3",
      "Rxf8"
    ],
    "solutionUci": [
      "g1f1",
      "f3e3",
      "f1f8"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Rook Endgame, Short Tactic, Skewer",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 852,
    "themes": "crushing endgame rookEndgame short skewer",
    "preMove": "f4f8",
    "preMoveFen": "8/8/1p1p2p1/1P4k1/2P1PR2/5KP1/8/6r1 w - - 17 55"
  },
  {
    "id": "00Mke",
    "puzzleIndex": 239,
    "title": "Exercise 239: Black to Move",
    "fen": "6k1/p2P1p2/8/6pp/P2Q4/5qPP/r4P1K/3R4 b - - 0 42",
    "solution": [
      "Rxf2+",
      "Qxf2",
      "Qxf2+",
      "Kh1",
      "Qf3+"
    ],
    "solutionUci": [
      "a2f2",
      "d4f2",
      "f3f2",
      "h2h1",
      "f2f3"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Long Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1190,
    "themes": "crushing endgame long",
    "preMove": "d6d7",
    "preMoveFen": "6k1/p4p2/3P4/6pp/P2Q4/5qPP/r4P1K/3R4 w - - 1 42"
  },
  {
    "id": "00N3B",
    "puzzleIndex": 240,
    "title": "Exercise 240: White to Move",
    "fen": "r4rk1/1bb2ppp/p1n1p3/4P3/Np1q4/1B2NP2/1P4PP/2RQ1RK1 w - - 0 21",
    "solution": [
      "Qxd4",
      "Nxd4",
      "Rxc7",
      "Nxb3",
      "Rxb7"
    ],
    "solutionUci": [
      "d1d4",
      "c6d4",
      "c1c7",
      "d4b3",
      "c7b7"
    ],
    "description": "White to move. Themes: Crushing Advantage, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1155,
    "themes": "crushing long middlegame",
    "preMove": "d8d4",
    "preMoveFen": "r2q1rk1/1bb2ppp/p1n1p3/4P3/Np1P4/1B2NP2/1P4PP/2RQ1RK1 b - - 0 20"
  },
  {
    "id": "00NAM",
    "puzzleIndex": 241,
    "title": "Exercise 241: White to Move",
    "fen": "r5k1/pp3ppp/8/3p4/2qP4/4R2P/2P1QPPK/8 w - - 2 22",
    "solution": [
      "Re8+",
      "Rxe8",
      "Qxe8#"
    ],
    "solutionUci": [
      "e3e8",
      "a8e8",
      "e2e8"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 698,
    "themes": "endgame mate mateIn2 short",
    "preMove": "a2c4",
    "preMoveFen": "r5k1/pp3ppp/8/3p4/3P4/4R2P/q1P1QPPK/8 b - - 1 21"
  },
  {
    "id": "00NUS",
    "puzzleIndex": 242,
    "title": "Exercise 242: Black to Move",
    "fen": "4rk2/pbp2pp1/1p1N4/3P1q2/QPBP4/1KP2P2/P5r1/R3R3 b - - 0 25",
    "solution": [
      "Qc2+",
      "Ka3",
      "Qb2#"
    ],
    "solutionUci": [
      "f5c2",
      "b3a3",
      "c2b2"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 2, Middlegame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1180,
    "themes": "mate mateIn2 middlegame short",
    "preMove": "e4d6",
    "preMoveFen": "4rk2/pbp2pp1/1p1b4/3P1q2/QPBPN3/1KP2P2/P5r1/R3R3 w - - 0 25"
  },
  {
    "id": "00Nej",
    "puzzleIndex": 243,
    "title": "Exercise 243: White to Move",
    "fen": "6k1/1p3pp1/pB2q2p/2P1b3/1P6/6QP/4r1P1/3R3K w - - 5 34",
    "solution": [
      "Rd8+",
      "Kh7",
      "Qd3+",
      "Qg6",
      "Qxe2"
    ],
    "solutionUci": [
      "d1d8",
      "g8h7",
      "g3d3",
      "e6g6",
      "d3e2"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Fork, Long Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1007,
    "themes": "crushing endgame fork long",
    "preMove": "f6e5",
    "preMoveFen": "6k1/1p3pp1/pB2qb1p/2P5/1P6/6QP/4r1P1/3R3K b - - 4 33"
  },
  {
    "id": "00NiV",
    "puzzleIndex": 244,
    "title": "Exercise 244: White to Move",
    "fen": "rn2qrk1/ppp2N2/3pPpp1/3n4/6b1/8/P1QN1PPP/R4RK1 w - - 0 19",
    "solution": [
      "Qxg6#"
    ],
    "solutionUci": [
      "c2g6"
    ],
    "description": "White to move. Themes: KingsideAttack, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 695,
    "themes": "kingsideAttack mate mateIn1 middlegame oneMove",
    "preMove": "h7g6",
    "preMoveFen": "rn2qrk1/ppp2N1p/3pPpB1/3n4/6b1/8/P1QN1PPP/R4RK1 b - - 0 18"
  },
  {
    "id": "00Nj4",
    "puzzleIndex": 245,
    "title": "Exercise 245: White to Move",
    "fen": "rn4k1/2Rr1ppp/p3p3/2p5/3N4/1P2PKP1/PB3P1P/8 w - - 0 24",
    "solution": [
      "Rc8+",
      "Rd8",
      "Rxd8#"
    ],
    "solutionUci": [
      "c7c8",
      "d7d8",
      "c8d8"
    ],
    "description": "White to move. Themes: Back-Rank Mate, Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 956,
    "themes": "backRankMate endgame mate mateIn2 short",
    "preMove": "b6c5",
    "preMoveFen": "rn4k1/2Rr1ppp/pp2p3/2R5/3N4/1P2PKP1/PB3P1P/8 b - - 0 23"
  },
  {
    "id": "00O2z",
    "puzzleIndex": 246,
    "title": "Exercise 246: Black to Move",
    "fen": "r6r/2pk1ppp/p1np4/1pbBpN1q/4P1b1/5NK1/PPPP1PR1/R1BQ4 b - - 13 18",
    "solution": [
      "Qh3#"
    ],
    "solutionUci": [
      "h5h3"
    ],
    "description": "Black to move. Themes: EpauletteMate, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 742,
    "themes": "epauletteMate mate mateIn1 middlegame oneMove",
    "preMove": "h2g3",
    "preMoveFen": "r6r/2pk1ppp/p1np4/1pbBpN1q/4P1b1/5N2/PPPP1PRK/R1BQ4 w - - 12 18"
  },
  {
    "id": "00O37",
    "puzzleIndex": 247,
    "title": "Exercise 247: White to Move",
    "fen": "r1q1r1k1/1p3pp1/n1p4p/p2pp2P/P3P3/2P2P2/1P1QBb2/R1BK3R w - - 0 24",
    "solution": [
      "Bxa6",
      "bxa6",
      "Qxf2"
    ],
    "solutionUci": [
      "e2a6",
      "b7a6",
      "d2f2"
    ],
    "description": "White to move. Themes: Decisive Advantage, Discovered Attack, Middlegame, Short Tactic",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 1300,
    "themes": "advantage discoveredAttack middlegame short",
    "preMove": "c5f2",
    "preMoveFen": "r1q1r1k1/1p3pp1/n1p4p/p1bpp2P/P3P3/2P2P2/1P1QBP2/R1BK3R b - - 3 23"
  },
  {
    "id": "00O3h",
    "puzzleIndex": 248,
    "title": "Exercise 248: White to Move",
    "fen": "5k2/R3Rp2/6p1/1p5p/1P1r3K/2n5/7P/8 w - - 8 44",
    "solution": [
      "Kg5",
      "Ne4+",
      "Kh6"
    ],
    "solutionUci": [
      "h4g5",
      "c3e4",
      "g5h6"
    ],
    "description": "White to move. Themes: Crushing Advantage, DefensiveMove, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1149,
    "themes": "crushing defensiveMove endgame short",
    "preMove": "d3d4",
    "preMoveFen": "5k2/R3Rp2/6p1/1p5p/1P5K/2nr4/7P/8 b - - 7 43"
  },
  {
    "id": "00O9a",
    "puzzleIndex": 249,
    "title": "Exercise 249: Black to Move",
    "fen": "1k3r2/q5r1/2Qp3p/3Bp3/2N1P1p1/P7/1PP2PPP/R5K1 b - - 13 35",
    "solution": [
      "Qxf2+",
      "Kh1",
      "Qf1+",
      "Rxf1",
      "Rxf1#"
    ],
    "solutionUci": [
      "a7f2",
      "g1h1",
      "f2f1",
      "a1f1",
      "f8f1"
    ],
    "description": "Black to move. Themes: Back-Rank Mate, Long Tactic, Checkmate, Mate in 3, Middlegame, Tactical Sacrifice",
    "hint": "Calculate a forcing checkmate combination!",
    "rating": 925,
    "themes": "backRankMate long mate mateIn3 middlegame sacrifice",
    "preMove": "a5c4",
    "preMoveFen": "1k3r2/q5r1/2Qp3p/N2Bp3/4P1p1/P7/1PP2PPP/R5K1 w - - 12 35"
  },
  {
    "id": "00O9q",
    "puzzleIndex": 250,
    "title": "Exercise 250: White to Move",
    "fen": "5r2/5p2/4nP1k/4N1p1/8/6P1/6K1/R7 w - - 2 79",
    "solution": [
      "Rh1#"
    ],
    "solutionUci": [
      "a1h1"
    ],
    "description": "White to move. Themes: Endgame, Master, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1264,
    "themes": "endgame master mate mateIn1 oneMove",
    "preMove": "h7h6",
    "preMoveFen": "5r2/5p1k/4nP2/4N1p1/8/6P1/6K1/R7 b - - 1 78"
  },
  {
    "id": "00OCQ",
    "puzzleIndex": 251,
    "title": "Exercise 251: Black to Move",
    "fen": "1rr3k1/5p1p/p5pQ/4p3/4q3/B1P1P3/PP1R1PPP/2KR4 b - - 0 27",
    "solution": [
      "Rxc3+",
      "bxc3",
      "Rb1#"
    ],
    "solutionUci": [
      "c8c3",
      "b2c3",
      "b8b1"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 2, Middlegame, QueensideAttack, Tactical Sacrifice, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1187,
    "themes": "mate mateIn2 middlegame queensideAttack sacrifice short",
    "preMove": "c2c3",
    "preMoveFen": "1rr3k1/5p1p/p5pQ/4p3/4q3/B3P3/PPPR1PPP/2KR4 w - - 6 27"
  },
  {
    "id": "00OOp",
    "puzzleIndex": 252,
    "title": "Exercise 252: Black to Move",
    "fen": "5rk1/1bR3q1/pQ6/8/6P1/4R3/P7/6K1 b - - 0 28",
    "solution": [
      "Qxg4+",
      "Rg3",
      "Qxg3#"
    ],
    "solutionUci": [
      "g7g4",
      "e3g3",
      "g4g3"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1053,
    "themes": "endgame mate mateIn2 short",
    "preMove": "h3g4",
    "preMoveFen": "5rk1/1bR3q1/pQ6/8/6r1/4R2P/P7/6K1 w - - 0 28"
  },
  {
    "id": "00OPk",
    "puzzleIndex": 253,
    "title": "Exercise 253: White to Move",
    "fen": "6rk/7p/R2N3P/3r4/1P5K/P7/8/8 w - - 5 51",
    "solution": [
      "Nf7#"
    ],
    "solutionUci": [
      "d6f7"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 806,
    "themes": "endgame mate mateIn1 oneMove",
    "preMove": "b5d5",
    "preMoveFen": "6rk/7p/R2N3P/1r6/1P5K/P7/8/8 b - - 4 50"
  },
  {
    "id": "00OXc",
    "puzzleIndex": 254,
    "title": "Exercise 254: White to Move",
    "fen": "8/5K1p/1p5k/6p1/3brp2/5R2/8/8 w - - 0 51",
    "solution": [
      "Rh3#"
    ],
    "solutionUci": [
      "f3h3"
    ],
    "description": "White to move. Themes: Endgame, Master, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 841,
    "themes": "endgame master mate mateIn1 oneMove",
    "preMove": "g6g5",
    "preMoveFen": "8/5K1p/1p4pk/8/3brp2/5R2/8/8 b - - 5 50"
  },
  {
    "id": "00Oim",
    "puzzleIndex": 255,
    "title": "Exercise 255: Black to Move",
    "fen": "1r3rk1/q5pp/2R5/3P4/2Q5/1p2NpPb/1P3P1P/3R2K1 b - - 1 32",
    "solution": [
      "Qxe3",
      "fxe3",
      "f2+"
    ],
    "solutionUci": [
      "a7e3",
      "f2e3",
      "f3f2"
    ],
    "description": "Black to move. Themes: AdvancedPawn, Decisive Advantage, Middlegame, Tactical Sacrifice, Short Tactic",
    "hint": "Look for a tactical sacrifice that decisively alters the position!",
    "rating": 1236,
    "themes": "advancedPawn advantage middlegame sacrifice short",
    "preMove": "c1c4",
    "preMoveFen": "1r3rk1/q5pp/2R5/3P4/8/1p2NpPb/1P3P1P/2QR2K1 w - - 0 32"
  },
  {
    "id": "00Oqz",
    "puzzleIndex": 256,
    "title": "Exercise 256: Black to Move",
    "fen": "5r2/7r/2kpqBRP/p1p1p2Q/P3P3/2PP4/5P1K/8 b - - 1 40",
    "solution": [
      "Rxf6",
      "Rxf6",
      "Qxf6"
    ],
    "solutionUci": [
      "f8f6",
      "g6f6",
      "e6f6"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Master, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 904,
    "themes": "crushing endgame master short",
    "preMove": "g1g6",
    "preMoveFen": "5r2/7r/2kpqB1P/p1p1p2Q/P3P3/2PP4/5P1K/6R1 w - - 0 40"
  },
  {
    "id": "00OxK",
    "puzzleIndex": 257,
    "title": "Exercise 257: Black to Move",
    "fen": "3r2k1/1p3p2/p1n2P2/2P3P1/1PR1p3/P2pP3/3B4/6K1 b - - 1 33",
    "solution": [
      "Ne5",
      "Rxe4",
      "Nf3+",
      "Kf2",
      "Nxd2"
    ],
    "solutionUci": [
      "c6e5",
      "c4e4",
      "e5f3",
      "g1f2",
      "f3d2"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, ExposedKing, Fork, Long Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1149,
    "themes": "advantage endgame exposedKing fork long",
    "preMove": "c1c4",
    "preMoveFen": "3r2k1/1p3p2/p1n2P2/2P3P1/1P2p3/P2pP3/3B4/2R3K1 w - - 0 33"
  },
  {
    "id": "00Ozz",
    "puzzleIndex": 258,
    "title": "Exercise 258: White to Move",
    "fen": "3kr3/3n1B1p/2pP4/p1n5/Ppp5/8/1P3PPP/4R1K1 w - - 0 33",
    "solution": [
      "Rxe8#"
    ],
    "solutionUci": [
      "e1e8"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 1, One-Move Tactic, Opera Mate",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 865,
    "themes": "endgame mate mateIn1 oneMove operaMate",
    "preMove": "f8e8",
    "preMoveFen": "3kRr2/3n1B1p/2pP4/p1n5/Ppp5/8/1P3PPP/4R1K1 b - - 8 32"
  },
  {
    "id": "00P6j",
    "puzzleIndex": 259,
    "title": "Exercise 259: White to Move",
    "fen": "r2n2k1/1bq2rpp/1p6/3P4/p3Q3/B3P3/PP3PPP/3R2K1 w - - 0 21",
    "solution": [
      "Qe8+",
      "Rf8",
      "Qxf8#"
    ],
    "solutionUci": [
      "e4e8",
      "f7f8",
      "e8f8"
    ],
    "description": "White to move. Themes: KingsideAttack, Checkmate, Mate in 2, Middlegame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1325,
    "themes": "kingsideAttack mate mateIn2 middlegame short",
    "preMove": "d7c7",
    "preMoveFen": "r2n2k1/1bRq1rpp/1p6/3P4/p3Q3/B3P3/PP3PPP/3R2K1 b - - 0 20"
  },
  {
    "id": "00PGi",
    "puzzleIndex": 260,
    "title": "Exercise 260: White to Move",
    "fen": "3r1q1k/p1pb2pp/1pnp4/6N1/5B2/1Q4P1/PP4PP/4R2K w - - 0 25",
    "solution": [
      "Nf7+",
      "Qxf7",
      "Qxf7"
    ],
    "solutionUci": [
      "g5f7",
      "f8f7",
      "b3f7"
    ],
    "description": "White to move. Themes: Crushing Advantage, Fork, Middlegame, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1081,
    "themes": "crushing fork middlegame short",
    "preMove": "b7b6",
    "preMoveFen": "3r1q1k/pppb2pp/2np4/6N1/5B2/1Q4P1/PP4PP/4R2K b - - 11 24"
  },
  {
    "id": "00PHg",
    "puzzleIndex": 261,
    "title": "Exercise 261: White to Move",
    "fen": "R7/P4p2/7p/q3k1n1/5R2/7P/5PK1/8 w - - 3 47",
    "solution": [
      "Re8+",
      "Kxf4",
      "a8=Q",
      "Qxa8+",
      "Rxa8"
    ],
    "solutionUci": [
      "a8e8",
      "e5f4",
      "a7a8q",
      "a5a8",
      "e8a8"
    ],
    "description": "White to move. Themes: AdvancedPawn, Decisive Advantage, Clearance Sacrifice, Endgame, Long Tactic, Promotion",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1350,
    "themes": "advancedPawn advantage clearance endgame long promotion",
    "preMove": "f6e5",
    "preMoveFen": "R7/P4p2/5k1p/q5n1/5R2/7P/5PK1/8 b - - 2 46"
  },
  {
    "id": "00PZo",
    "puzzleIndex": 262,
    "title": "Exercise 262: Black to Move",
    "fen": "7r/8/3b4/3p1P2/6R1/2kN4/4KP2/8 b - - 0 67",
    "solution": [
      "Re8+",
      "Kf3",
      "Kxd3"
    ],
    "solutionUci": [
      "h8e8",
      "e2f3",
      "c3d3"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Deflection, Endgame, Short Tactic",
    "hint": "Deflect the key defender away from its crucial post!",
    "rating": 1166,
    "themes": "advantage deflection endgame short",
    "preMove": "f4f5",
    "preMoveFen": "7r/8/3b4/3p4/5PR1/2kN4/4KP2/8 w - - 1 67"
  },
  {
    "id": "00Pc8",
    "puzzleIndex": 263,
    "title": "Exercise 263: White to Move",
    "fen": "r1b2r2/pp1n2k1/2p3pp/4Np2/2BP4/8/PP4PP/2KRR3 w - - 1 19",
    "solution": [
      "Nxd7",
      "Bxd7",
      "Re7+",
      "Kf6",
      "Rxd7"
    ],
    "solutionUci": [
      "e5d7",
      "c8d7",
      "e1e7",
      "g7f6",
      "e7d7"
    ],
    "description": "White to move. Themes: Decisive Advantage, Clearance Sacrifice, Fork, Long Tactic, Middlegame",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1044,
    "themes": "advantage clearance fork long middlegame",
    "preMove": "b8d7",
    "preMoveFen": "rnb2r2/pp4k1/2p3pp/4Np2/2BP4/8/PP4PP/2KRR3 b - - 0 18"
  },
  {
    "id": "00PrK",
    "puzzleIndex": 264,
    "title": "Exercise 264: White to Move",
    "fen": "8/7R/r3k3/4p2p/3b2p1/3K4/8/5R2 w - - 0 56",
    "solution": [
      "Rh6+",
      "Kd5",
      "Rxa6"
    ],
    "solutionUci": [
      "h7h6",
      "e6d5",
      "h6a6"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Short Tactic, Skewer",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 968,
    "themes": "crushing endgame short skewer",
    "preMove": "a8a6",
    "preMoveFen": "r7/7R/P3k3/4p2p/3b2p1/3K4/8/5R2 b - - 7 55"
  },
  {
    "id": "00Pw1",
    "puzzleIndex": 265,
    "title": "Exercise 265: White to Move",
    "fen": "5r1k/2p3Rp/3p4/p2Pn3/1p2B3/1P6/PKP1r2P/6R1 w - - 2 29",
    "solution": [
      "Rxh7#"
    ],
    "solutionUci": [
      "g7h7"
    ],
    "description": "White to move. Themes: Endgame, Master, Checkmate, Mate in 1, One-Move Tactic, Opera Mate",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1064,
    "themes": "endgame master mate mateIn1 oneMove operaMate",
    "preMove": "f2e2",
    "preMoveFen": "5r1k/2p3Rp/3p4/p2Pn3/1p2B3/1P6/PKP2r1P/6R1 b - - 1 28"
  },
  {
    "id": "00Q4m",
    "puzzleIndex": 266,
    "title": "Exercise 266: Black to Move",
    "fen": "5r2/1b3k2/1q4p1/p3Pp1p/2pn1P1P/4Q1P1/P5BK/R1R5 b - - 3 34",
    "solution": [
      "Nf3+",
      "Qxf3",
      "Bxf3"
    ],
    "solutionUci": [
      "d4f3",
      "e3f3",
      "b7f3"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1115,
    "themes": "advantage middlegame short",
    "preMove": "f1g2",
    "preMoveFen": "5r2/1b3k2/1q4p1/p3Pp1p/2pn1P1P/4Q1P1/P6K/R1R2B2 w - - 2 34"
  },
  {
    "id": "00QBx",
    "puzzleIndex": 267,
    "title": "Exercise 267: Black to Move",
    "fen": "rn1qk2r/pb3ppp/5n2/2b5/8/2N1p1P1/PP1PPPNP/R1BQKB1R b KQkq - 1 9",
    "solution": [
      "exf2#"
    ],
    "solutionUci": [
      "e3f2"
    ],
    "description": "Black to move. Themes: AdvancedPawn, AttackingF2F7, Checkmate, Mate in 1, One-Move Tactic, Opening",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1152,
    "themes": "advancedPawn attackingF2F7 mate mateIn1 oneMove opening",
    "preMove": "h4g2",
    "preMoveFen": "rn1qk2r/pb3ppp/5n2/2b5/7N/2N1p1P1/PP1PPP1P/R1BQKB1R w KQkq - 0 9"
  },
  {
    "id": "00QCD",
    "puzzleIndex": 268,
    "title": "Exercise 268: White to Move",
    "fen": "3r1rk1/1q3ppp/4pb2/8/1P1N4/4P1P1/3B1PBP/R5K1 w - - 0 24",
    "solution": [
      "Bxb7",
      "Bxd4",
      "exd4"
    ],
    "solutionUci": [
      "g2b7",
      "f6d4",
      "e3d4"
    ],
    "description": "White to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1041,
    "themes": "advantage middlegame short",
    "preMove": "b6b7",
    "preMoveFen": "3r1rk1/1Q3ppp/1q2pb2/8/1P1N4/4P1P1/3B1PBP/R5K1 b - - 0 23"
  },
  {
    "id": "00QHM",
    "puzzleIndex": 269,
    "title": "Exercise 269: White to Move",
    "fen": "6k1/pp3rpp/4Nb2/4p3/1r6/6PK/PP5P/2R5 w - - 0 29",
    "solution": [
      "Rc8+",
      "Bd8",
      "Rxd8+",
      "Rf8",
      "Rxf8#"
    ],
    "solutionUci": [
      "c1c8",
      "f6d8",
      "c8d8",
      "f7f8",
      "d8f8"
    ],
    "description": "White to move. Themes: Endgame, Long Tactic, Checkmate, Mate in 3",
    "hint": "Calculate a forcing checkmate combination!",
    "rating": 904,
    "themes": "endgame long mate mateIn3",
    "preMove": "d4b4",
    "preMoveFen": "6k1/pp3rpp/4Nb2/4p3/1B1r4/6PK/PP5P/2R5 b - - 0 28"
  },
  {
    "id": "00QOa",
    "puzzleIndex": 270,
    "title": "Exercise 270: Black to Move",
    "fen": "6rk/1pR3p1/6Bp/2b4P/8/pP3PK1/P1P5/8 b - - 0 32",
    "solution": [
      "Bd6+",
      "f4",
      "Bxc7"
    ],
    "solutionUci": [
      "c5d6",
      "f3f4",
      "d6c7"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 829,
    "themes": "crushing endgame fork short",
    "preMove": "e7c7",
    "preMoveFen": "6rk/1pp1R1p1/6Bp/2b4P/8/pP3PK1/P1P5/8 w - - 5 32"
  },
  {
    "id": "00QW1",
    "puzzleIndex": 271,
    "title": "Exercise 271: Black to Move",
    "fen": "8/3r1ppp/4p3/k3P3/pR2R2P/2P5/3r1PP1/2K5 b - - 5 31",
    "solution": [
      "Rd1+",
      "Kb2",
      "R7d2+",
      "Ka3",
      "Ra1#"
    ],
    "solutionUci": [
      "d2d1",
      "c1b2",
      "d7d2",
      "b2a3",
      "d1a1"
    ],
    "description": "Black to move. Themes: Endgame, ExposedKing, Long Tactic, Checkmate, Mate in 3, Rook Endgame",
    "hint": "Calculate a forcing checkmate combination!",
    "rating": 974,
    "themes": "endgame exposedKing long mate mateIn3 rookEndgame",
    "preMove": "c2c1",
    "preMoveFen": "8/3r1ppp/4p3/k3P3/pR2R2P/2P5/2Kr1PP1/8 w - - 4 31"
  },
  {
    "id": "00QY3",
    "puzzleIndex": 272,
    "title": "Exercise 272: Black to Move",
    "fen": "2k3r1/pp5p/4p3/2p2p2/2P5/P4P1q/1PQ1R2R/7K b - - 0 32",
    "solution": [
      "Qf1#"
    ],
    "solutionUci": [
      "h3f1"
    ],
    "description": "Black to move. Themes: Endgame, Master, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1048,
    "themes": "endgame master mate mateIn1 oneMove",
    "preMove": "f2h2",
    "preMoveFen": "2k3r1/pp5p/4p3/2p2p2/2P5/P4P1q/1PQ1RR1b/7K w - - 0 32"
  },
  {
    "id": "00QZ3",
    "puzzleIndex": 273,
    "title": "Exercise 273: White to Move",
    "fen": "r1bq1k1r/ppppn1pp/2n5/b5N1/4P3/B1P5/P4PPP/RN1QK2R w KQ - 2 10",
    "solution": [
      "Qf3+",
      "Ke8",
      "Qf7#"
    ],
    "solutionUci": [
      "d1f3",
      "f8e8",
      "f3f7"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 2, Opening, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1231,
    "themes": "mate mateIn2 opening short",
    "preMove": "f7f8",
    "preMoveFen": "r1bq3r/ppppnkpp/2n5/b5N1/4P3/B1P5/P4PPP/RN1QK2R b KQ - 1 9"
  },
  {
    "id": "00QkV",
    "puzzleIndex": 274,
    "title": "Exercise 274: White to Move",
    "fen": "5k1r/p3R1bp/3N1pp1/4nbB1/2P5/3rP3/q4PPP/3Q1RK1 w - - 0 17",
    "solution": [
      "Re8#"
    ],
    "solutionUci": [
      "e7e8"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1132,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "f7f6",
    "preMoveFen": "5k1r/p3Rpbp/3N2p1/4nbB1/2P5/3rP3/q4PPP/3Q1RK1 b - - 2 16"
  },
  {
    "id": "00Qo8",
    "puzzleIndex": 275,
    "title": "Exercise 275: White to Move",
    "fen": "8/8/RP4p1/3r1pkp/P1n1p3/6P1/6P1/4K3 w - - 0 50",
    "solution": [
      "b7",
      "Rd8",
      "Ra8"
    ],
    "solutionUci": [
      "b6b7",
      "d5d8",
      "a6a8"
    ],
    "description": "White to move. Themes: Endgame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1037,
    "themes": "endgame",
    "preMove": "b5d5",
    "preMoveFen": "8/8/RP4p1/1r1N1pkp/P1n1p3/6P1/6P1/4K3 b - - 0 49"
  },
  {
    "id": "00Qpu",
    "puzzleIndex": 276,
    "title": "Exercise 276: White to Move",
    "fen": "3r1b1r/2pn4/1p1p3p/2kP2qn/Q3P3/4pp2/1P4PP/4R1K1 w - - 0 27",
    "solution": [
      "Rc1#"
    ],
    "solutionUci": [
      "e1c1"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1289,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "f4e3",
    "preMoveFen": "3r1b1r/2pn4/1p1p3p/2kP2qn/Q3Pp2/4Bp2/1P4PP/4R1K1 b - - 3 26"
  },
  {
    "id": "00R0l",
    "puzzleIndex": 277,
    "title": "Exercise 277: White to Move",
    "fen": "rnbqkb1r/pp3p1p/6pn/P1ppp3/8/3P1P2/1PP1P1P1/RNBQKBNR w KQkq - 0 8",
    "solution": [
      "Bxh6",
      "Bxh6",
      "Rxh6"
    ],
    "solutionUci": [
      "c1h6",
      "f8h6",
      "h1h6"
    ],
    "description": "White to move. Themes: Decisive Advantage, Opening, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1244,
    "themes": "advantage opening short",
    "preMove": "g4h6",
    "preMoveFen": "rnbqkb1r/pp3p1p/6pP/P1ppp3/6n1/3P1P2/1PP1P1P1/RNBQKBNR b KQkq - 0 7"
  },
  {
    "id": "00R2A",
    "puzzleIndex": 278,
    "title": "Exercise 278: Black to Move",
    "fen": "2kr1b1R/p5p1/8/3P1p2/2P5/4B3/PP1K1P2/8 b - - 0 25",
    "solution": [
      "Bb4+",
      "Kd3",
      "Rxh8"
    ],
    "solutionUci": [
      "f8b4",
      "d2d3",
      "d8h8"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Discovered Attack, Endgame, Short Tactic",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 909,
    "themes": "crushing discoveredAttack endgame short",
    "preMove": "c2c4",
    "preMoveFen": "2kr1b1R/p5p1/8/3P1p2/8/4B3/PPPK1P2/8 w - - 1 25"
  },
  {
    "id": "00R9D",
    "puzzleIndex": 279,
    "title": "Exercise 279: Black to Move",
    "fen": "8/1k6/1pn5/8/Pp2R1p1/4P3/5PK1/8 b - - 1 51",
    "solution": [
      "b3",
      "Rxg4",
      "b2"
    ],
    "solutionUci": [
      "b4b3",
      "e4g4",
      "b3b2"
    ],
    "description": "Black to move. Themes: AdvancedPawn, Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1098,
    "themes": "advancedPawn crushing endgame short",
    "preMove": "e6e4",
    "preMoveFen": "8/1k6/1pn1R3/8/Pp4p1/4P3/5PK1/8 w - - 0 51"
  },
  {
    "id": "00RFz",
    "puzzleIndex": 280,
    "title": "Exercise 280: White to Move",
    "fen": "r1b2rk1/3p1pqp/p1n1p1p1/1p1n2B1/4N3/3B1Q2/P1P2PPP/R3R1K1 w - - 2 18",
    "solution": [
      "Nf6+",
      "Nxf6",
      "Bxf6"
    ],
    "solutionUci": [
      "e4f6",
      "d5f6",
      "g5f6"
    ],
    "description": "White to move. Themes: Decisive Advantage, KingsideAttack, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1101,
    "themes": "advantage kingsideAttack middlegame short",
    "preMove": "e5g7",
    "preMoveFen": "r1b2rk1/3p1p1p/p1n1p1p1/1p1nq1B1/4N3/3B1Q2/P1P2PPP/R3R1K1 b - - 1 17"
  },
  {
    "id": "00ROK",
    "puzzleIndex": 281,
    "title": "Exercise 281: White to Move",
    "fen": "8/p1p2k2/1r2rp2/3p1Q2/2qP2R1/2P4P/6PK/4q3 w - - 0 34",
    "solution": [
      "Qh7+",
      "Kf8",
      "Rg8#"
    ],
    "solutionUci": [
      "f5h7",
      "f7f8",
      "g4g8"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1346,
    "themes": "endgame mate mateIn2 short",
    "preMove": "f8f7",
    "preMoveFen": "5k2/p1p2R2/1r2rp2/3p1Q2/2qP2R1/2P4P/6PK/4q3 b - - 0 33"
  },
  {
    "id": "00RXz",
    "puzzleIndex": 282,
    "title": "Exercise 282: White to Move",
    "fen": "1k1r4/pp1b4/2p1qp1p/6p1/8/1Q4P1/PP3PBP/3R2K1 w - - 1 28",
    "solution": [
      "Qxe6",
      "Bxe6",
      "Rxd8+"
    ],
    "solutionUci": [
      "b3e6",
      "d7e6",
      "d1d8"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, QueensideAttack, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1214,
    "themes": "advantage endgame queensideAttack short",
    "preMove": "d6e6",
    "preMoveFen": "1k1r4/pp1b4/2pq1p1p/6p1/8/1Q4P1/PP3PBP/3R2K1 b - - 0 27"
  },
  {
    "id": "00RYH",
    "puzzleIndex": 283,
    "title": "Exercise 283: White to Move",
    "fen": "1k5r/ppp1R2p/r4p2/5Q2/3p4/2qP4/2P2PPP/2K1R3 w - - 6 27",
    "solution": [
      "Re8+",
      "Rxe8",
      "Rxe8#"
    ],
    "solutionUci": [
      "e7e8",
      "h8e8",
      "e1e8"
    ],
    "description": "White to move. Themes: Back-Rank Mate, Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1029,
    "themes": "backRankMate endgame mate mateIn2 short",
    "preMove": "d6a6",
    "preMoveFen": "1k5r/ppp1R2p/3r1p2/5Q2/3p4/2qP4/2P2PPP/2K1R3 b - - 5 26"
  },
  {
    "id": "00Rcs",
    "puzzleIndex": 284,
    "title": "Exercise 284: Black to Move",
    "fen": "3k4/ppp2p1r/4p2P/5n2/3PK1N1/2P5/P1P3P1/7R b - - 0 30",
    "solution": [
      "Ng3+",
      "Kf4",
      "Nxh1"
    ],
    "solutionUci": [
      "f5g3",
      "e4f4",
      "g3h1"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 881,
    "themes": "crushing endgame fork short",
    "preMove": "f3e4",
    "preMoveFen": "3k4/ppp2p1r/4p2P/5n2/3Pp1N1/2P2K2/P1P3P1/7R w - - 0 30"
  },
  {
    "id": "00RiT",
    "puzzleIndex": 285,
    "title": "Exercise 285: White to Move",
    "fen": "8/pp1k1p2/4p3/2ppPr1r/7P/2P2pP1/P1P5/2K1RR2 w - - 0 23",
    "solution": [
      "g4",
      "Rxe5",
      "gxh5"
    ],
    "solutionUci": [
      "g3g4",
      "f5e5",
      "g4h5"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Fork, Rook Endgame, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1095,
    "themes": "advantage endgame fork rookEndgame short",
    "preMove": "g4f3",
    "preMoveFen": "8/pp1k1p2/4p3/2ppPr1r/5PpP/2P3P1/P1P5/2K1RR2 b - f3 0 22"
  },
  {
    "id": "00Rk3",
    "puzzleIndex": 286,
    "title": "Exercise 286: Black to Move",
    "fen": "8/1p2rppk/5q1p/Q4R2/2P5/PP5P/5PP1/5K2 b - - 0 32",
    "solution": [
      "Qa1+",
      "Qe1",
      "Rxe1#"
    ],
    "solutionUci": [
      "f6a1",
      "a5e1",
      "e7e1"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 991,
    "themes": "endgame mate mateIn2 short",
    "preMove": "g1f1",
    "preMoveFen": "8/1p2rppk/5q1p/Q4R2/2P5/PP5P/5PP1/5rK1 w - - 0 32"
  },
  {
    "id": "00Rlv",
    "puzzleIndex": 287,
    "title": "Exercise 287: White to Move",
    "fen": "3rk1nr/p1q3pp/1pb1p3/2b2p2/8/N1BQ1P2/PPP3PP/2KR3R w k - 4 15",
    "solution": [
      "Qxd8+",
      "Qxd8",
      "Rxd8+"
    ],
    "solutionUci": [
      "d3d8",
      "c7d8",
      "d1d8"
    ],
    "description": "White to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 612,
    "themes": "advantage middlegame short",
    "preMove": "a8d8",
    "preMoveFen": "r3k1nr/p1q3pp/1pb1p3/2b2p2/8/N1BQ1P2/PPP3PP/2KR3R b kq - 3 14"
  },
  {
    "id": "00RoG",
    "puzzleIndex": 288,
    "title": "Exercise 288: Black to Move",
    "fen": "2kr2nr/pp2nppp/2pp4/2b2PP1/4NPq1/3B1R1P/PPP5/R2QB2K b - - 0 18",
    "solution": [
      "Qg1#"
    ],
    "solutionUci": [
      "g4g1"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 1, One-Move Tactic, Opening",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1001,
    "themes": "mate mateIn1 oneMove opening",
    "preMove": "h2h3",
    "preMoveFen": "2kr2nr/pp2nppp/2pp4/2b2PP1/4NPq1/3B1R2/PPP4P/R2QB2K w - - 5 18"
  },
  {
    "id": "00Ru6",
    "puzzleIndex": 289,
    "title": "Exercise 289: White to Move",
    "fen": "3r1r1k/p6p/1p4pP/2p5/2PbBQ2/2q5/P1P1K3/5R2 w - - 1 35",
    "solution": [
      "Qxf8+",
      "Rxf8",
      "Rxf8#"
    ],
    "solutionUci": [
      "f4f8",
      "d8f8",
      "f1f8"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 2, Middlegame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 974,
    "themes": "mate mateIn2 middlegame short",
    "preMove": "g7h8",
    "preMoveFen": "3r1r2/p5kp/1p4pP/2p5/2PbBQ2/2q5/P1P1K3/5R2 b - - 0 34"
  },
  {
    "id": "00S5q",
    "puzzleIndex": 290,
    "title": "Exercise 290: White to Move",
    "fen": "r4rk1/pbp1n1pp/1p1p4/3Pp1N1/2B4P/2PQ4/PP4q1/R2K3R w - - 0 18",
    "solution": [
      "Qxh7#"
    ],
    "solutionUci": [
      "d3h7"
    ],
    "description": "White to move. Themes: KingsideAttack, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 857,
    "themes": "kingsideAttack mate mateIn1 middlegame oneMove",
    "preMove": "f2g2",
    "preMoveFen": "r4rk1/pbp1n1pp/1p1p4/3Pp1N1/2B4P/2PQ4/PP3qP1/R2K3R b - - 1 17"
  },
  {
    "id": "00SIE",
    "puzzleIndex": 291,
    "title": "Exercise 291: White to Move",
    "fen": "2k3nr/ppp2ppp/2n5/8/8/1Q2P3/q4rPP/1R2KB1R w K - 0 16",
    "solution": [
      "Qxb7+",
      "Kd7",
      "Rd1+"
    ],
    "solutionUci": [
      "b3b7",
      "c8d7",
      "b1d1"
    ],
    "description": "White to move. Themes: Crushing Advantage, Fork, Middlegame, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1188,
    "themes": "crushing fork middlegame short",
    "preMove": "d2f2",
    "preMoveFen": "2k3nr/ppp2ppp/2n5/8/8/1Q2P3/q2r1PPP/1R2KB1R b K - 1 15"
  },
  {
    "id": "00SLR",
    "puzzleIndex": 292,
    "title": "Exercise 292: Black to Move",
    "fen": "rnbqk1nr/ppppbppp/4p3/8/5PP1/5N2/PPPPP2P/RNBQKB1R b KQkq - 0 3",
    "solution": [
      "Bh4+",
      "Nxh4",
      "Qxh4#"
    ],
    "solutionUci": [
      "e7h4",
      "f3h4",
      "d8h4"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 2, Opening, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 677,
    "themes": "mate mateIn2 opening short",
    "preMove": "g2g4",
    "preMoveFen": "rnbqk1nr/ppppbppp/4p3/8/5P2/5N2/PPPPP1PP/RNBQKB1R w KQkq - 2 3"
  },
  {
    "id": "00SMl",
    "puzzleIndex": 293,
    "title": "Exercise 293: White to Move",
    "fen": "r4rk1/ppp2pn1/3p4/q2N4/1n1PP3/5P2/PPP5/1K1R1B1R w - - 3 19",
    "solution": [
      "Nf6#"
    ],
    "solutionUci": [
      "d5f6"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 880,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "c6b4",
    "preMoveFen": "r4rk1/ppp2pn1/2np4/q2N4/3PP3/5P2/PPP5/1K1R1B1R b - - 2 18"
  },
  {
    "id": "00SOy",
    "puzzleIndex": 294,
    "title": "Exercise 294: Black to Move",
    "fen": "6k1/6b1/p1Q1p2p/1pN4r/3P3q/2P5/P4PP1/1R2R1K1 b - - 0 31",
    "solution": [
      "Qh1#"
    ],
    "solutionUci": [
      "h4h1"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 877,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "f3c6",
    "preMoveFen": "6k1/6b1/p1r1p2p/1pN4r/3P3q/2P2Q2/P4PP1/1R2R1K1 w - - 2 31"
  },
  {
    "id": "00SeK",
    "puzzleIndex": 295,
    "title": "Exercise 295: White to Move",
    "fen": "6k1/pp5p/4r1pP/5pP1/3Q1n2/P1P5/KP6/5q2 w - - 2 36",
    "solution": [
      "Qg7#"
    ],
    "solutionUci": [
      "d4g7"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 995,
    "themes": "endgame mate mateIn1 oneMove",
    "preMove": "h8g8",
    "preMoveFen": "7k/pp5p/4r1pP/5pP1/3Q1n2/P1P5/KP6/5q2 b - - 1 35"
  },
  {
    "id": "00SfT",
    "puzzleIndex": 296,
    "title": "Exercise 296: White to Move",
    "fen": "r4rk1/pb2ppb1/1q6/6PQ/8/2NP1N2/PP1K1PP1/n6R w - - 0 17",
    "solution": [
      "Qh7#"
    ],
    "solutionUci": [
      "h5h7"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1119,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "c2a1",
    "preMoveFen": "r4rk1/pb2ppb1/1q6/6PQ/8/2NP1N2/PPnK1PP1/R6R b - - 1 16"
  },
  {
    "id": "00SgB",
    "puzzleIndex": 297,
    "title": "Exercise 297: White to Move",
    "fen": "b4rk1/qn2r3/1p3ppp/1P1p4/1Q1PnB2/P3P3/4BPPP/5RK1 w - - 0 29",
    "solution": [
      "Qxe7",
      "Rf7",
      "Qe8+",
      "Kg7",
      "Bxh6+"
    ],
    "solutionUci": [
      "b4e7",
      "f8f7",
      "e7e8",
      "g8g7",
      "f4h6"
    ],
    "description": "White to move. Themes: Decisive Advantage, ExposedKing, KingsideAttack, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1171,
    "themes": "advantage exposedKing kingsideAttack long middlegame",
    "preMove": "e8e7",
    "preMoveFen": "b3rrk1/qn2R3/1p3ppp/1P1p4/1Q1PnB2/P3P3/4BPPP/5RK1 b - - 0 28"
  },
  {
    "id": "00SsI",
    "puzzleIndex": 298,
    "title": "Exercise 298: White to Move",
    "fen": "6R1/p4p1p/2p1pp1k/6b1/2N5/6R1/4K1PP/2q5 w - - 2 30",
    "solution": [
      "Rh3+",
      "Bh4",
      "Rxh4#"
    ],
    "solutionUci": [
      "g3h3",
      "g5h4",
      "h3h4"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1137,
    "themes": "endgame mate mateIn2 short",
    "preMove": "e3g5",
    "preMoveFen": "6R1/p4p1p/2p1pp1k/8/2N5/4b1R1/4K1PP/2q5 b - - 1 29"
  },
  {
    "id": "00SyL",
    "puzzleIndex": 299,
    "title": "Exercise 299: White to Move",
    "fen": "1rb2rk1/4bppp/p1n1p3/1pq1P3/7N/P5P1/1PQ2PBP/R1B2RK1 w - - 2 16",
    "solution": [
      "Qxc5",
      "Bxc5",
      "Bxc6"
    ],
    "solutionUci": [
      "c2c5",
      "e7c5",
      "g2c6"
    ],
    "description": "White to move. Themes: CapturingDefender, Crushing Advantage, Opening, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1257,
    "themes": "capturingDefender crushing opening short",
    "preMove": "d5c5",
    "preMoveFen": "1rb2rk1/4bppp/p1n1p3/1p1qP3/7N/P5P1/1PQ2PBP/R1B2RK1 b - - 1 15"
  },
  {
    "id": "00Sz9",
    "puzzleIndex": 300,
    "title": "Exercise 300: Black to Move",
    "fen": "1r4k1/p4ppp/4p3/p5n1/4P3/1P3PPq/QB3N1P/R5K1 b - - 0 30",
    "solution": [
      "Nxf3+",
      "Kh1",
      "Qxh2#"
    ],
    "solutionUci": [
      "g5f3",
      "g1h1",
      "h3h2"
    ],
    "description": "Black to move. Themes: KingsideAttack, Checkmate, Mate in 2, Middlegame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1053,
    "themes": "kingsideAttack mate mateIn2 middlegame short",
    "preMove": "d3f2",
    "preMoveFen": "1r4k1/p4ppp/4p3/p5n1/4P3/1P1N1PPq/QB3b1P/R5K1 w - - 0 30"
  },
  {
    "id": "00T85",
    "puzzleIndex": 301,
    "title": "Exercise 301: White to Move",
    "fen": "8/8/8/8/8/4K3/5Q2/1qk5 w - - 6 54",
    "solution": [
      "Qd2#"
    ],
    "solutionUci": [
      "f2d2"
    ],
    "description": "White to move. Themes: Endgame, Master, Checkmate, Mate in 1, One-Move Tactic, Queen Endgame",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1038,
    "themes": "endgame master mate mateIn1 oneMove queenEndgame",
    "preMove": "b2c1",
    "preMoveFen": "8/8/8/8/8/4K3/1k3Q2/1q6 b - - 5 53"
  },
  {
    "id": "00TAb",
    "puzzleIndex": 302,
    "title": "Exercise 302: White to Move",
    "fen": "6k1/5pp1/p1N5/1n1b3p/1B4P1/P4P1P/2K5/8 w - - 3 43",
    "solution": [
      "Ne7+",
      "Kh7",
      "Nxd5"
    ],
    "solutionUci": [
      "c6e7",
      "g8h7",
      "e7d5"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Fork, Master, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 704,
    "themes": "advantage endgame fork master short",
    "preMove": "e6d5",
    "preMoveFen": "6k1/5pp1/p1N1b3/1n5p/1B4P1/P4P1P/2K5/8 b - - 2 42"
  },
  {
    "id": "00TFd",
    "puzzleIndex": 303,
    "title": "Exercise 303: Black to Move",
    "fen": "1R6/2P5/p5k1/6pp/1P6/6PK/r6P/8 b - - 0 40",
    "solution": [
      "g4+",
      "Kh4",
      "Rxh2#"
    ],
    "solutionUci": [
      "g5g4",
      "h3h4",
      "a2h2"
    ],
    "description": "Black to move. Themes: Deflection, Endgame, Checkmate, Mate in 2, Rook Endgame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1031,
    "themes": "deflection endgame mate mateIn2 rookEndgame short",
    "preMove": "c6c7",
    "preMoveFen": "1R6/8/p1P3k1/6pp/1P6/6PK/r6P/8 w - - 1 40"
  },
  {
    "id": "00TOX",
    "puzzleIndex": 304,
    "title": "Exercise 304: White to Move",
    "fen": "b7/2k1pp2/ppn2qp1/8/4B3/1PNR4/P1P2PP1/5K2 w - - 0 27",
    "solution": [
      "Nd5+",
      "Kb8",
      "Nxf6"
    ],
    "solutionUci": [
      "c3d5",
      "c7b8",
      "d5f6"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 802,
    "themes": "crushing endgame fork short",
    "preMove": "a7a6",
    "preMoveFen": "b7/p1k1pp2/1pn2qp1/8/4B3/1PNR4/P1P2PP1/5K2 b - - 1 26"
  },
  {
    "id": "00TQf",
    "puzzleIndex": 305,
    "title": "Exercise 305: Black to Move",
    "fen": "4r1k1/p1R1n2p/4N3/5r2/6K1/6PP/P3R3/8 b - - 4 46",
    "solution": [
      "h5+",
      "Kh4",
      "Ng6#"
    ],
    "solutionUci": [
      "h7h5",
      "g4h4",
      "e7g6"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1221,
    "themes": "endgame mate mateIn2 short",
    "preMove": "g5g4",
    "preMoveFen": "4r1k1/p1R1n2p/4N3/5rK1/8/6PP/P3R3/8 w - - 3 46"
  },
  {
    "id": "00TTm",
    "puzzleIndex": 306,
    "title": "Exercise 306: White to Move",
    "fen": "r4bkr/pppqp1pp/6B1/7Q/2PP4/2N1P2P/PP4P1/R5K1 w - - 1 16",
    "solution": [
      "Bf7#"
    ],
    "solutionUci": [
      "g6f7"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 822,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "f7g8",
    "preMoveFen": "r4b1r/pppqpkpp/6B1/7Q/2PP4/2N1P2P/PP4P1/R5K1 b - - 0 15"
  },
  {
    "id": "00TU2",
    "puzzleIndex": 307,
    "title": "Exercise 307: Black to Move",
    "fen": "1k1r4/1p3Qp1/p2q3p/8/1N6/8/PP3PPP/2R3K1 b - - 0 22",
    "solution": [
      "Qd1+",
      "Rxd1",
      "Rxd1#"
    ],
    "solutionUci": [
      "d6d1",
      "c1d1",
      "d8d1"
    ],
    "description": "Black to move. Themes: Back-Rank Mate, Endgame, Checkmate, Mate in 2, Tactical Sacrifice, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 623,
    "themes": "backRankMate endgame mate mateIn2 sacrifice short",
    "preMove": "d5b4",
    "preMoveFen": "1k1r4/1p3Qp1/p2q3p/3N4/1b6/8/PP3PPP/2R3K1 w - - 4 22"
  },
  {
    "id": "00Ta0",
    "puzzleIndex": 308,
    "title": "Exercise 308: Black to Move",
    "fen": "4k3/1R6/6N1/5p1p/7P/2r3PK/5b2/8 b - - 0 47",
    "solution": [
      "Rxg3+",
      "Kh2",
      "Rxg6"
    ],
    "solutionUci": [
      "c3g3",
      "h3h2",
      "g3g6"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1156,
    "themes": "crushing endgame fork short",
    "preMove": "e5g6",
    "preMoveFen": "4k3/1R6/6p1/4Np1p/7P/2r3PK/5b2/8 w - - 11 47"
  },
  {
    "id": "00Tdk",
    "puzzleIndex": 309,
    "title": "Exercise 309: Black to Move",
    "fen": "r6r/4kppp/2pNpnq1/p1P1n3/8/B3P3/PP1Q1PPP/3R1RK1 b - - 8 20",
    "solution": [
      "Nf3+",
      "Kh1",
      "Nxd2"
    ],
    "solutionUci": [
      "e5f3",
      "g1h1",
      "f3d2"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Middlegame, Pin, Short Tactic",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 1041,
    "themes": "crushing middlegame pin short",
    "preMove": "e2d2",
    "preMoveFen": "r6r/4kppp/2pNpnq1/p1P1n3/8/B3P3/PP2QPPP/3R1RK1 w - - 7 20"
  },
  {
    "id": "00Tge",
    "puzzleIndex": 310,
    "title": "Exercise 310: White to Move",
    "fen": "8/5k2/8/1p1p2pn/1PpP2P1/2P1KP2/8/8 w - - 0 59",
    "solution": [
      "gxh5",
      "Kg7",
      "f4"
    ],
    "solutionUci": [
      "g4h5",
      "f7g7",
      "f3f4"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1070,
    "themes": "crushing endgame short",
    "preMove": "f4h5",
    "preMoveFen": "8/5k2/8/1p1p2pN/1PpP1nP1/2P1KP2/8/8 b - - 10 58"
  },
  {
    "id": "00TiV",
    "puzzleIndex": 311,
    "title": "Exercise 311: Black to Move",
    "fen": "8/1kp5/4n3/3p4/r2P3R/2K2N1P/8/8 b - - 6 48",
    "solution": [
      "Ra3+",
      "Kc2",
      "Rxf3"
    ],
    "solutionUci": [
      "a4a3",
      "c3c2",
      "a3f3"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Short Tactic, Skewer",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1073,
    "themes": "crushing endgame short skewer",
    "preMove": "e5f3",
    "preMoveFen": "8/1kp5/4n3/3pN3/r2P3R/2K4P/8/8 w - - 5 48"
  },
  {
    "id": "00Tkj",
    "puzzleIndex": 312,
    "title": "Exercise 312: White to Move",
    "fen": "2r2k1n/p4pp1/1p2p3/4P1B1/q7/2r4R/P4PP1/4R1K1 w - - 0 29",
    "solution": [
      "Rxh8#"
    ],
    "solutionUci": [
      "h3h8"
    ],
    "description": "White to move. Themes: Master, Checkmate, Mate in 1, Middlegame, One-Move Tactic, PillsburysMate",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 880,
    "themes": "master mate mateIn1 middlegame oneMove pillsburysMate",
    "preMove": "g6h8",
    "preMoveFen": "2r2k1Q/p4pp1/1p2p1n1/4P1B1/q7/2r4R/P4PP1/4R1K1 b - - 3 28"
  },
  {
    "id": "00Tmr",
    "puzzleIndex": 313,
    "title": "Exercise 313: White to Move",
    "fen": "2r3rk/6pp/p6N/1p1p4/2pq4/P6P/1P3PP1/4R1K1 w - - 0 37",
    "solution": [
      "Nf7#"
    ],
    "solutionUci": [
      "h6f7"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 1, One-Move Tactic, Smothered Mate",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 950,
    "themes": "endgame mate mateIn1 oneMove smotheredMate",
    "preMove": "f8g8",
    "preMoveFen": "2r2rQk/6pp/p6N/1p1p4/2pq4/P6P/1P3PP1/4R1K1 b - - 9 36"
  },
  {
    "id": "00Tya",
    "puzzleIndex": 314,
    "title": "Exercise 314: Black to Move",
    "fen": "r4rk1/6pp/1p1Bp3/p7/P1PP4/4nqP1/Q2R3P/4R1K1 b - - 2 25",
    "solution": [
      "Qf1+",
      "Rxf1",
      "Rxf1#"
    ],
    "solutionUci": [
      "f3f1",
      "e1f1",
      "f8f1"
    ],
    "description": "Black to move. Themes: KingsideAttack, Checkmate, Mate in 2, Middlegame, Tactical Sacrifice, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1115,
    "themes": "kingsideAttack mate mateIn2 middlegame sacrifice short",
    "preMove": "c2a2",
    "preMoveFen": "r4rk1/6pp/1p1Bp3/p7/P1PP4/4nqP1/2QR3P/4R1K1 w - - 1 25"
  },
  {
    "id": "00UHZ",
    "puzzleIndex": 315,
    "title": "Exercise 315: White to Move",
    "fen": "6k1/6p1/pp2np1p/8/2r1NR1P/6P1/1PP5/1K6 w - - 2 33",
    "solution": [
      "Nxf6+",
      "gxf6",
      "Rxc4"
    ],
    "solutionUci": [
      "e4f6",
      "g7f6",
      "f4c4"
    ],
    "description": "White to move. Themes: Decisive Advantage, Discovered Attack, Endgame, Short Tactic",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 1070,
    "themes": "advantage discoveredAttack endgame short",
    "preMove": "d8e6",
    "preMoveFen": "3n2k1/6p1/pp3p1p/8/2r1NR1P/6P1/1PP5/1K6 b - - 1 32"
  },
  {
    "id": "00UgJ",
    "puzzleIndex": 316,
    "title": "Exercise 316: Black to Move",
    "fen": "1r1q1rk1/1b4b1/4p1Bp/3pP3/p2B2P1/7Q/PPP5/2KR3R b - - 0 23",
    "solution": [
      "Qg5+",
      "Kb1",
      "Qxg6"
    ],
    "solutionUci": [
      "d8g5",
      "c1b1",
      "g5g6"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Fork, Middlegame, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 910,
    "themes": "advantage fork middlegame short",
    "preMove": "d3g6",
    "preMoveFen": "1r1q1rk1/1b4b1/4p1pp/3pP3/p2B2P1/3B3Q/PPP5/2KR3R w - - 0 23"
  },
  {
    "id": "00Ui0",
    "puzzleIndex": 317,
    "title": "Exercise 317: Black to Move",
    "fen": "r5k1/5pp1/2p5/P1N4p/2PR1n2/1P3P2/5P1P/6K1 b - - 0 26",
    "solution": [
      "Ne2+",
      "Kf1",
      "Nxd4"
    ],
    "solutionUci": [
      "f4e2",
      "g1f1",
      "e2d4"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 705,
    "themes": "crushing endgame fork short",
    "preMove": "d1d4",
    "preMoveFen": "r5k1/5pp1/2p5/P1N4p/2Pp1n2/1P3P2/5P1P/3R2K1 w - - 1 26"
  },
  {
    "id": "00Uo9",
    "puzzleIndex": 318,
    "title": "Exercise 318: White to Move",
    "fen": "4Q3/4qppk/2p2b1p/1p2pP2/2r1B3/5P1P/6P1/5R1K w - - 4 34",
    "solution": [
      "Qxe7",
      "Bxe7",
      "f6+",
      "Rxe4",
      "fxe7"
    ],
    "solutionUci": [
      "e8e7",
      "f6e7",
      "f5f6",
      "c4e4",
      "f6e7"
    ],
    "description": "White to move. Themes: AdvancedPawn, Crushing Advantage, Discovered Attack, DiscoveredCheck, Endgame, Long Tactic",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 1171,
    "themes": "advancedPawn crushing discoveredAttack discoveredCheck endgame long",
    "preMove": "c5e7",
    "preMoveFen": "4Q3/5ppk/2p2b1p/1pq1pP2/2r1B3/5P1P/6P1/5R1K b - - 3 33"
  },
  {
    "id": "00Upm",
    "puzzleIndex": 319,
    "title": "Exercise 319: White to Move",
    "fen": "5rr1/1p5k/p2b1Pn1/2p1p1P1/P1PpP3/2P5/1P3KB1/R4R2 w - - 3 30",
    "solution": [
      "Rh1+",
      "Nh4",
      "Rxh4+"
    ],
    "solutionUci": [
      "f1h1",
      "g6h4",
      "h1h4"
    ],
    "description": "White to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 953,
    "themes": "advantage middlegame short",
    "preMove": "a8f8",
    "preMoveFen": "r5r1/1p5k/p2b1Pn1/2p1p1P1/P1PpP3/2P5/1P3KB1/R4R2 b - - 2 29"
  },
  {
    "id": "00Us6",
    "puzzleIndex": 320,
    "title": "Exercise 320: White to Move",
    "fen": "3r1rk1/p3R2p/2p2p2/1pP5/1n1P1P2/1q4P1/1B2Q2P/2K1R3 w - - 4 33",
    "solution": [
      "Qg4+",
      "Kh8",
      "Qg7#"
    ],
    "solutionUci": [
      "e2g4",
      "g8h8",
      "g4g7"
    ],
    "description": "White to move. Themes: KingsideAttack, Checkmate, Mate in 2, Middlegame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1261,
    "themes": "kingsideAttack mate mateIn2 middlegame short",
    "preMove": "d5b3",
    "preMoveFen": "3r1rk1/p3R2p/2p2p2/1pPq4/1n1P1P2/6P1/1B2Q2P/2K1R3 b - - 3 32"
  },
  {
    "id": "00UwP",
    "puzzleIndex": 321,
    "title": "Exercise 321: White to Move",
    "fen": "5rk1/p4pp1/3qb2p/1B1p4/3P4/Q3PN2/P4PPP/1rR3K1 w - - 6 20",
    "solution": [
      "Qxd6",
      "Rxc1+",
      "Bf1"
    ],
    "solutionUci": [
      "a3d6",
      "b1c1",
      "b5f1"
    ],
    "description": "White to move. Themes: Decisive Advantage, Master, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1196,
    "themes": "advantage master middlegame short",
    "preMove": "b4b1",
    "preMoveFen": "5rk1/p4pp1/3qb2p/1B1p4/1r1P4/Q3PN2/P4PPP/2R3K1 b - - 5 19"
  },
  {
    "id": "00V0G",
    "puzzleIndex": 322,
    "title": "Exercise 322: Black to Move",
    "fen": "8/6P1/5k1K/8/8/3p4/P2R4/6r1 b - - 2 49",
    "solution": [
      "Rh1+",
      "Rh2",
      "Rxh2#"
    ],
    "solutionUci": [
      "g1h1",
      "d2h2",
      "h1h2"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 2, Rook Endgame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1145,
    "themes": "endgame mate mateIn2 rookEndgame short",
    "preMove": "b2d2",
    "preMoveFen": "8/6P1/5k1K/8/8/3p4/PR6/6r1 w - - 1 49"
  },
  {
    "id": "00VEX",
    "puzzleIndex": 323,
    "title": "Exercise 323: Black to Move",
    "fen": "4r1k1/3b1pp1/5q1p/r7/P1pBQ3/2P4P/5PP1/R4RK1 b - - 2 27",
    "solution": [
      "Rxe4",
      "Bxf6",
      "gxf6"
    ],
    "solutionUci": [
      "e8e4",
      "d4f6",
      "g7f6"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1314,
    "themes": "crushing middlegame short",
    "preMove": "b6d4",
    "preMoveFen": "4r1k1/3b1pp1/1B3q1p/r7/P1p1Q3/2P4P/5PP1/R4RK1 w - - 1 27"
  },
  {
    "id": "00VFK",
    "puzzleIndex": 324,
    "title": "Exercise 324: Black to Move",
    "fen": "8/6pk/7p/Q7/6PK/3q4/1P5P/8 b - - 2 45",
    "solution": [
      "g5+",
      "Qxg5",
      "hxg5+"
    ],
    "solutionUci": [
      "g7g5",
      "a5g5",
      "h6g5"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Master, Queen Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1058,
    "themes": "crushing endgame master queenEndgame short",
    "preMove": "h3h4",
    "preMoveFen": "8/6pk/7p/Q7/6P1/3q3K/1P5P/8 w - - 1 45"
  },
  {
    "id": "00VGt",
    "puzzleIndex": 325,
    "title": "Exercise 325: Black to Move",
    "fen": "3K4/8/2P5/R5pp/1n6/5PkP/6P1/8 b - - 4 61",
    "solution": [
      "Nxc6+",
      "Kd7",
      "Nxa5"
    ],
    "solutionUci": [
      "b4c6",
      "d8d7",
      "c6a5"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1061,
    "themes": "crushing endgame fork short",
    "preMove": "a2a5",
    "preMoveFen": "3K4/8/2P5/6pp/1n6/5PkP/R5P1/8 w - - 3 61"
  },
  {
    "id": "00VJF",
    "puzzleIndex": 326,
    "title": "Exercise 326: White to Move",
    "fen": "2rr2k1/1p1q1pp1/1B2pnp1/1Q1p4/8/2P2B2/PP4Pb/3RR2K w - - 2 33",
    "solution": [
      "Qxd7",
      "Nxd7",
      "Bxd8"
    ],
    "solutionUci": [
      "b5d7",
      "f6d7",
      "b6d8"
    ],
    "description": "White to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1233,
    "themes": "advantage middlegame short",
    "preMove": "c7d7",
    "preMoveFen": "2rr2k1/1pq2pp1/1B2pnp1/1Q1p4/8/2P2B2/PP4Pb/3RR2K b - - 1 32"
  },
  {
    "id": "00VSe",
    "puzzleIndex": 327,
    "title": "Exercise 327: Black to Move",
    "fen": "6nr/1pN2ppp/p2Qbk2/4p3/3Bq3/8/PP2BPPP/5K1R b - - 0 19",
    "solution": [
      "Qb1+",
      "Bd1",
      "Qxd1#"
    ],
    "solutionUci": [
      "e4b1",
      "e2d1",
      "b1d1"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 2, Middlegame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 977,
    "themes": "mate mateIn2 middlegame short",
    "preMove": "c5d4",
    "preMoveFen": "6nr/1pN2ppp/p2Qbk2/2B1p3/3nq3/8/PP2BPPP/5K1R w - - 8 19"
  },
  {
    "id": "00Vof",
    "puzzleIndex": 328,
    "title": "Exercise 328: Black to Move",
    "fen": "6k1/6p1/1pp4p/P3p3/2P1P3/3Pp2P/2P3P1/5K2 b - - 0 30",
    "solution": [
      "bxa5",
      "Ke2",
      "a4",
      "Kxe3",
      "a3",
      "Kd2",
      "a2"
    ],
    "solutionUci": [
      "b6a5",
      "f1e2",
      "a5a4",
      "e2e3",
      "a4a3",
      "e3d2",
      "a3a2"
    ],
    "description": "Black to move. Themes: AdvancedPawn, Crushing Advantage, Endgame, Pawn Endgame, Quiet Move, Deep Calculation",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1048,
    "themes": "advancedPawn crushing endgame pawnEndgame quietMove veryLong",
    "preMove": "b4a5",
    "preMoveFen": "6k1/6p1/1pp4p/p3p3/1PP1P3/3Pp2P/2P3P1/5K2 w - - 0 30"
  },
  {
    "id": "00Vt0",
    "puzzleIndex": 329,
    "title": "Exercise 329: White to Move",
    "fen": "1k4r1/pp3p2/4p3/2N1q3/1P1bp3/P3P3/5P2/2RR1K2 w - - 2 28",
    "solution": [
      "Nd7+",
      "Ka8",
      "Nxe5"
    ],
    "solutionUci": [
      "c5d7",
      "b8a8",
      "d7e5"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 885,
    "themes": "advantage endgame fork short",
    "preMove": "d6e5",
    "preMoveFen": "1k4r1/pp3p2/3qp3/2N5/1P1bp3/P3P3/5P2/2RR1K2 b - - 1 27"
  },
  {
    "id": "00Vv9",
    "puzzleIndex": 330,
    "title": "Exercise 330: Black to Move",
    "fen": "5r1k/pp4pp/5r2/3NQ3/3P4/5pN1/Pq5P/2R2R1K b - - 1 29",
    "solution": [
      "Qg2#"
    ],
    "solutionUci": [
      "b2g2"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 915,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "e3d5",
    "preMoveFen": "5r1k/pp4pp/5r2/4Q3/3P4/4NpN1/Pq5P/2R2R1K w - - 0 29"
  },
  {
    "id": "00WAp",
    "puzzleIndex": 331,
    "title": "Exercise 331: Black to Move",
    "fen": "r5k1/4p2p/p5p1/1p1b2Q1/2p5/P4q2/1P3P2/R2R2KN b - - 0 28",
    "solution": [
      "Qxh1#"
    ],
    "solutionUci": [
      "f3h1"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 994,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "g3h1",
    "preMoveFen": "r5k1/4p2p/p5p1/1p1b2Q1/2p5/P4qN1/1P3P2/R2R2Kr w - - 2 28"
  },
  {
    "id": "00WDP",
    "puzzleIndex": 332,
    "title": "Exercise 332: White to Move",
    "fen": "4kb1r/p4ppp/Qrn5/2qpP1Bb/8/5N1P/P2N1PP1/R4RK1 w k - 3 17",
    "solution": [
      "Qc8+",
      "Nd8",
      "Qxd8#"
    ],
    "solutionUci": [
      "a6c8",
      "c6d8",
      "c8d8"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 2, Middlegame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1165,
    "themes": "mate mateIn2 middlegame short",
    "preMove": "b8b6",
    "preMoveFen": "1r2kb1r/p4ppp/Q1n5/2qpP1Bb/8/5N1P/P2N1PP1/R4RK1 b k - 2 16"
  },
  {
    "id": "00WG3",
    "puzzleIndex": 333,
    "title": "Exercise 333: White to Move",
    "fen": "8/pk1r1Rp1/1p2p2p/4P1bP/4N3/8/PP6/1K1r1R2 w - - 5 34",
    "solution": [
      "Rxd1",
      "Rxf7",
      "Nd6+",
      "Kc7",
      "Nxf7"
    ],
    "solutionUci": [
      "f1d1",
      "d7f7",
      "e4d6",
      "b7c7",
      "d6f7"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Fork, Long Tactic, Pin",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1044,
    "themes": "crushing endgame fork long pin",
    "preMove": "d4d1",
    "preMoveFen": "8/pk1r1Rp1/1p2p2p/4P1bP/3rN3/8/PP6/1K3R2 b - - 4 33"
  },
  {
    "id": "00WJN",
    "puzzleIndex": 334,
    "title": "Exercise 334: White to Move",
    "fen": "5Q2/7K/8/8/4p2P/3k2q1/8/8 w - - 2 54",
    "solution": [
      "Qa3+",
      "Kd2",
      "Qxg3"
    ],
    "solutionUci": [
      "f8a3",
      "d3d2",
      "a3g3"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Queen Endgame, Short Tactic, Skewer",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1310,
    "themes": "crushing endgame queenEndgame short skewer",
    "preMove": "e3g3",
    "preMoveFen": "5Q2/7K/8/8/4p2P/3kq3/8/8 b - - 1 53"
  },
  {
    "id": "00WNb",
    "puzzleIndex": 335,
    "title": "Exercise 335: White to Move",
    "fen": "8/8/1KpB4/Pb6/1P5p/8/6k1/8 w - - 4 56",
    "solution": [
      "a6",
      "Kf3",
      "a7"
    ],
    "solutionUci": [
      "a5a6",
      "g2f3",
      "a6a7"
    ],
    "description": "White to move. Themes: AdvancedPawn, Bishop Endgame, Crushing Advantage, Endgame, Master, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1051,
    "themes": "advancedPawn bishopEndgame crushing endgame master short",
    "preMove": "f3g2",
    "preMoveFen": "8/8/1KpB4/Pb6/1P5p/5k2/8/8 b - - 3 55"
  },
  {
    "id": "00WZO",
    "puzzleIndex": 336,
    "title": "Exercise 336: White to Move",
    "fen": "8/1R2B3/5p2/4bP1p/p1k4r/5K2/8/8 w - - 8 46",
    "solution": [
      "Rb4+",
      "Kd5",
      "Rxh4"
    ],
    "solutionUci": [
      "b7b4",
      "c4d5",
      "b4h4"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Short Tactic, Skewer",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1127,
    "themes": "crushing endgame short skewer",
    "preMove": "b5c4",
    "preMoveFen": "8/1R2B3/5p2/1k2bP1p/p6r/5K2/8/8 b - - 7 45"
  },
  {
    "id": "00Wfu",
    "puzzleIndex": 337,
    "title": "Exercise 337: Black to Move",
    "fen": "3qr1k1/p4p1p/6p1/3Q4/8/1P3P2/P5PP/3R2K1 b - - 0 26",
    "solution": [
      "Re1+",
      "Rxe1",
      "Qxd5"
    ],
    "solutionUci": [
      "e8e1",
      "d1e1",
      "d8d5"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Deflection, Endgame, Master, Short Tactic",
    "hint": "Deflect the key defender away from its crucial post!",
    "rating": 1351,
    "themes": "advantage deflection endgame master short",
    "preMove": "e5d5",
    "preMoveFen": "3qr1k1/p4p1p/6p1/3pQ3/8/1P3P2/P5PP/3R2K1 w - - 2 26"
  },
  {
    "id": "00WiB",
    "puzzleIndex": 338,
    "title": "Exercise 338: White to Move",
    "fen": "3q1rk1/4pp1p/p4Pp1/4p1P1/b1PpP2Q/3n3P/P3r1B1/R4RK1 w - - 0 23",
    "solution": [
      "Qh6",
      "exf6",
      "gxf6",
      "Qxf6",
      "Rxf6"
    ],
    "solutionUci": [
      "h4h6",
      "e7f6",
      "g5f6",
      "d8f6",
      "f1f6"
    ],
    "description": "White to move. Themes: Decisive Advantage, Long Tactic, Master, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1355,
    "themes": "advantage long master middlegame",
    "preMove": "b2e2",
    "preMoveFen": "3q1rk1/4pp1p/p4Pp1/4p1P1/b1PpP2Q/3n3P/Pr2N1B1/R4RK1 b - - 1 22"
  },
  {
    "id": "00WiX",
    "puzzleIndex": 339,
    "title": "Exercise 339: Black to Move",
    "fen": "8/5kpp/1p2p3/p1p1Q3/2Pn4/6P1/P4P1P/6K1 b - - 0 32",
    "solution": [
      "Nf3+",
      "Kf1",
      "Nxe5"
    ],
    "solutionUci": [
      "d4f3",
      "g1f1",
      "f3e5"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 984,
    "themes": "crushing endgame fork short",
    "preMove": "b8e5",
    "preMoveFen": "1Q6/5kpp/1p2p3/p1p1r3/2Pn4/6P1/P4P1P/6K1 w - - 0 32"
  },
  {
    "id": "00Wp4",
    "puzzleIndex": 340,
    "title": "Exercise 340: White to Move",
    "fen": "3r1k2/p4p2/1p4p1/1P5p/4BP1P/3n2P1/P2p3K/3R4 w - - 2 45",
    "solution": [
      "Rxd2",
      "Rd4",
      "Bxd3"
    ],
    "solutionUci": [
      "d1d2",
      "d8d4",
      "e4d3"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Master, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1241,
    "themes": "advantage endgame master short",
    "preMove": "c5d3",
    "preMoveFen": "3r1k2/p4p2/1p4p1/1Pn4p/4BP1P/6P1/P2p3K/3R4 b - - 1 44"
  },
  {
    "id": "00WtH",
    "puzzleIndex": 341,
    "title": "Exercise 341: Black to Move",
    "fen": "8/2R2pk1/4p1pp/3p4/3Pq2P/1r2P1P1/5P1K/2Q5 b - - 3 45",
    "solution": [
      "Rb1",
      "Qxb1",
      "Qxb1"
    ],
    "solutionUci": [
      "b3b1",
      "c1b1",
      "e4b1"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1388,
    "themes": "crushing endgame short",
    "preMove": "f1c1",
    "preMoveFen": "8/2R2pk1/4p1pp/3p4/3Pq2P/1r2P1P1/5P1K/5Q2 w - - 2 45"
  },
  {
    "id": "00X1l",
    "puzzleIndex": 342,
    "title": "Exercise 342: White to Move",
    "fen": "5r1k/Q6p/1pb3p1/4q3/4p3/1BP4P/PP4p1/5RK1 w - - 0 31",
    "solution": [
      "Rxf8#"
    ],
    "solutionUci": [
      "f1f8"
    ],
    "description": "White to move. Themes: Endgame, Hanging Piece, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 848,
    "themes": "endgame hangingPiece mate mateIn1 oneMove",
    "preMove": "f3g2",
    "preMoveFen": "5r1k/Q6p/1pb3p1/4q3/4p3/1BP2p1P/PP4P1/5RK1 b - - 0 30"
  },
  {
    "id": "00X5a",
    "puzzleIndex": 343,
    "title": "Exercise 343: Black to Move",
    "fen": "3N3k/pQ5p/4p1p1/3q4/8/2b1P1PK/P3RP1P/4n3 b - - 2 28",
    "solution": [
      "Qh5#"
    ],
    "solutionUci": [
      "d5h5"
    ],
    "description": "Black to move. Themes: Endgame, Master, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1347,
    "themes": "endgame master mate mateIn1 oneMove",
    "preMove": "g2h3",
    "preMoveFen": "3N3k/pQ5p/4p1p1/3q4/8/2b1P1P1/P3RPKP/4n3 w - - 1 28"
  },
  {
    "id": "00X5w",
    "puzzleIndex": 344,
    "title": "Exercise 344: Black to Move",
    "fen": "r2q1r1k/1ppbb1pn/p1n4p/3QNp2/B3P3/2P4P/PP3PP1/R1B1RNK1 b - - 0 14",
    "solution": [
      "Nxe5",
      "Bxd7",
      "Nxd7"
    ],
    "solutionUci": [
      "c6e5",
      "a4d7",
      "e5d7"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1270,
    "themes": "advantage middlegame short",
    "preMove": "f3e5",
    "preMoveFen": "r2q1r1k/1ppbb1pn/p1n4p/3Qpp2/B3P3/2P2N1P/PP3PP1/R1B1RNK1 w - - 2 14"
  },
  {
    "id": "00XCT",
    "puzzleIndex": 345,
    "title": "Exercise 345: Black to Move",
    "fen": "6QK/8/2k5/3r4/8/8/8/8 b - - 6 82",
    "solution": [
      "Rh5+",
      "Qh7",
      "Rxh7+"
    ],
    "solutionUci": [
      "d5h5",
      "g8h7",
      "h5h7"
    ],
    "description": "Black to move. Themes: Endgame, Equality, Queen & Rook Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 996,
    "themes": "endgame equality queenRookEndgame short",
    "preMove": "h7h8",
    "preMoveFen": "6Q1/7K/2k5/3r4/8/8/8/8 w - - 5 82"
  },
  {
    "id": "00XL2",
    "puzzleIndex": 346,
    "title": "Exercise 346: Black to Move",
    "fen": "2kr3r/ppp3pp/6q1/3Pnp2/1PPQp3/7P/P3NPP1/R4RK1 b - - 2 17",
    "solution": [
      "Nf3+",
      "Kh1",
      "Nxd4"
    ],
    "solutionUci": [
      "e5f3",
      "g1h1",
      "f3d4"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Middlegame, Pin, Short Tactic",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 995,
    "themes": "crushing middlegame pin short",
    "preMove": "d2d4",
    "preMoveFen": "2kr3r/ppp3pp/6q1/3Pnp2/1PP1p3/7P/P2QNPP1/R4RK1 w - - 1 17"
  },
  {
    "id": "00Xdc",
    "puzzleIndex": 347,
    "title": "Exercise 347: White to Move",
    "fen": "r1br1N1k/ppp2Bbn/2n4p/q7/3P4/2N5/PPP2PPP/R1B2RK1 w - - 0 16",
    "solution": [
      "Ng6#"
    ],
    "solutionUci": [
      "f8g6"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 1, One-Move Tactic, Opening",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 943,
    "themes": "mate mateIn1 oneMove opening",
    "preMove": "f6h7",
    "preMoveFen": "r1br1N1k/ppp2BbQ/2n2n1p/q7/3P4/2N5/PPP2PPP/R1B2RK1 b - - 6 15"
  },
  {
    "id": "00Xfn",
    "puzzleIndex": 348,
    "title": "Exercise 348: White to Move",
    "fen": "rn4k1/pp1q1r2/3p2B1/3p4/2PB2b1/8/P2K1PP1/7R w - - 0 22",
    "solution": [
      "Rh8#"
    ],
    "solutionUci": [
      "h1h8"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic, Opera Mate",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1381,
    "themes": "mate mateIn1 middlegame oneMove operaMate",
    "preMove": "c6d5",
    "preMoveFen": "rn4k1/pp1q1r2/2pp2B1/3P4/2PB2b1/8/P2K1PP1/7R b - - 1 21"
  },
  {
    "id": "00Xiu",
    "puzzleIndex": 349,
    "title": "Exercise 349: Black to Move",
    "fen": "8/pp3Q1p/1n2B1pk/8/5PPq/7P/PPP5/2K5 b - - 0 31",
    "solution": [
      "Qe1#"
    ],
    "solutionUci": [
      "h4e1"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 604,
    "themes": "endgame mate mateIn1 oneMove",
    "preMove": "f2f4",
    "preMoveFen": "8/pp3Q1p/1n2B1pk/8/6Pq/7P/PPP2P2/2K5 w - - 10 31"
  },
  {
    "id": "00XoP",
    "puzzleIndex": 350,
    "title": "Exercise 350: Black to Move",
    "fen": "6r1/p6k/1p4rp/3Q4/8/P7/4Rp1P/5R1K b - - 0 37",
    "solution": [
      "Rg1+",
      "Rxg1",
      "fxg1=Q#"
    ],
    "solutionUci": [
      "g6g1",
      "f1g1",
      "f2g1q"
    ],
    "description": "Black to move. Themes: AdvancedPawn, Endgame, Checkmate, Mate in 2, Promotion, Queen & Rook Endgame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 678,
    "themes": "advancedPawn endgame mate mateIn2 promotion queenRookEndgame short",
    "preMove": "f5d5",
    "preMoveFen": "6r1/p6k/1p4rp/3q1Q2/8/P7/4Rp1P/5R1K w - - 0 37"
  },
  {
    "id": "00008",
    "puzzleIndex": 351,
    "title": "Exercise 351: White to Move",
    "fen": "r6k/pp2r2p/4Rp1Q/3p4/8/1N1P2b1/PqP3PP/7K w - - 0 25",
    "solution": [
      "Rxe7",
      "Qb1+",
      "Nc1",
      "Qxc1+",
      "Qxc1"
    ],
    "solutionUci": [
      "e6e7",
      "b2b1",
      "b3c1",
      "b1c1",
      "h6c1"
    ],
    "description": "White to move. Themes: Crushing Advantage, Hanging Piece, Long Tactic, Middlegame",
    "hint": "Look for undefended or hanging material!",
    "rating": 1819,
    "themes": "crushing hangingPiece long middlegame",
    "preMove": "f2g3",
    "preMoveFen": "r6k/pp2r2p/4Rp1Q/3p4/8/1N1P2R1/PqP2bPP/7K b - - 0 24"
  },
  {
    "id": "0000D",
    "puzzleIndex": 352,
    "title": "Exercise 352: Black to Move",
    "fen": "5rk1/1p3ppp/pq1Q1b2/8/8/1P3N2/P4PPP/3R2K1 b - - 3 27",
    "solution": [
      "Rd8",
      "Qxd8+",
      "Bxd8"
    ],
    "solutionUci": [
      "f8d8",
      "d6d8",
      "f6d8"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1433,
    "themes": "advantage endgame short",
    "preMove": "d3d6",
    "preMoveFen": "5rk1/1p3ppp/pq3b2/8/8/1P1Q1N2/P4PPP/3R2K1 w - - 2 27"
  },
  {
    "id": "000Pw",
    "puzzleIndex": 353,
    "title": "Exercise 353: Black to Move",
    "fen": "6k1/5p1p/4p3/4q3/3n4/2Q3P1/PP1N1P1P/6K1 b - - 3 37",
    "solution": [
      "Ne2+",
      "Kf1",
      "Nxc3"
    ],
    "solutionUci": [
      "d4e2",
      "g1f1",
      "e2c3"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1514,
    "themes": "crushing endgame fork short",
    "preMove": "e4d2",
    "preMoveFen": "6k1/5p1p/4p3/4q3/3nN3/2Q3P1/PP3P1P/6K1 w - - 2 37"
  },
  {
    "id": "000Sa",
    "puzzleIndex": 354,
    "title": "Exercise 354: White to Move",
    "fen": "2Q2bk1/5p1p/p5p1/2p3P1/4B3/7P/qPr2P2/2K4R w - - 0 33",
    "solution": [
      "Bxc2",
      "Qa1+",
      "Bb1"
    ],
    "solutionUci": [
      "e4c2",
      "a2a1",
      "c2b1"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1565,
    "themes": "advantage endgame short",
    "preMove": "c4c2",
    "preMoveFen": "2Q2bk1/5p1p/p5p1/2p3P1/2r1B3/7P/qPQ2P2/2K4R b - - 0 32"
  },
  {
    "id": "000Vc",
    "puzzleIndex": 355,
    "title": "Exercise 355: Black to Move",
    "fen": "8/8/4k1p1/2KpP2P/5P2/8/8/8 b - - 0 53",
    "solution": [
      "gxh5",
      "f5+",
      "Kxe5",
      "f6",
      "Kxf6"
    ],
    "solutionUci": [
      "g6h5",
      "f4f5",
      "e6e5",
      "f5f6",
      "e5f6"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Long Tactic, Pawn Endgame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1569,
    "themes": "crushing endgame long pawnEndgame",
    "preMove": "g4h5",
    "preMoveFen": "8/8/4k1p1/2KpP2p/5PP1/8/8/8 w - - 0 53"
  },
  {
    "id": "000aY",
    "puzzleIndex": 356,
    "title": "Exercise 356: Black to Move",
    "fen": "r4rk1/pp2Bppp/2n1b3/q1pp4/8/P1Q2NP1/1PP1PP1P/2KR3R b - - 1 15",
    "solution": [
      "Qxc3",
      "bxc3",
      "Nxe7"
    ],
    "solutionUci": [
      "a5c3",
      "b2c3",
      "c6e7"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Master, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1412,
    "themes": "advantage master middlegame short",
    "preMove": "g5e7",
    "preMoveFen": "r4rk1/pp3ppp/2n1b3/q1pp2B1/8/P1Q2NP1/1PP1PP1P/2KR3R w - - 0 15"
  },
  {
    "id": "000c8",
    "puzzleIndex": 357,
    "title": "Exercise 357: Black to Move",
    "fen": "6k1/Bp3pp1/p3p3/2NpPn1p/5P1q/P2Q1R1P/1P4PK/2r5 b - - 1 28",
    "solution": [
      "Qe1",
      "Rf1",
      "Qxf1",
      "Qxf1",
      "Rxf1"
    ],
    "solutionUci": [
      "h4e1",
      "f3f1",
      "e1f1",
      "d3f1",
      "c1f1"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1692,
    "themes": "crushing long middlegame",
    "preMove": "a4c5",
    "preMoveFen": "6k1/Bp3pp1/p3p3/3pPn1p/N4P1q/P2Q1R1P/1P4PK/2r5 w - - 0 28"
  },
  {
    "id": "00143",
    "puzzleIndex": 358,
    "title": "Exercise 358: White to Move",
    "fen": "r4rk1/5ppp/1np2q2/p1b5/2p1B3/P7/1P3PPP/R1BQ1RK1 w - - 2 18",
    "solution": [
      "Qh5",
      "h6",
      "Qxc5"
    ],
    "solutionUci": [
      "d1h5",
      "h7h6",
      "h5c5"
    ],
    "description": "White to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1852,
    "themes": "advantage middlegame short",
    "preMove": "d8f6",
    "preMoveFen": "r2q1rk1/5ppp/1np5/p1b5/2p1B3/P7/1P3PPP/R1BQ1RK1 b - - 1 17"
  },
  {
    "id": "0017R",
    "puzzleIndex": 359,
    "title": "Exercise 359: White to Move",
    "fen": "r2qk2r/pp2ppbp/1n1p2p1/3P4/2n5/2NBBP1P/PP3P2/R2QK2R w KQkq - 0 13",
    "solution": [
      "Bxc4",
      "Nxc4",
      "Qa4+",
      "Qd7",
      "Qxc4"
    ],
    "solutionUci": [
      "d3c4",
      "b6c4",
      "d1a4",
      "d8d7",
      "a4c4"
    ],
    "description": "White to move. Themes: Decisive Advantage, Fork, Long Tactic, Middlegame",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1494,
    "themes": "advantage fork long middlegame",
    "preMove": "e5c4",
    "preMoveFen": "r2qk2r/pp2ppbp/1n1p2p1/3Pn3/2P5/2NBBP1P/PP3P2/R2QK2R b KQkq - 0 12"
  },
  {
    "id": "0018P",
    "puzzleIndex": 360,
    "title": "Exercise 360: White to Move",
    "fen": "5R2/1p6/p1p1k3/2P1r3/2K3p1/2P1p1P1/1P5P/8 w - - 2 45",
    "solution": [
      "Re8+",
      "Kf5",
      "Rxe5+",
      "Kxe5",
      "Kd3",
      "Kd5",
      "Kxe3",
      "a5",
      "Kf4",
      "Kc4",
      "Kxg4"
    ],
    "solutionUci": [
      "f8e8",
      "e6f5",
      "e8e5",
      "f5e5",
      "c4d3",
      "e5d5",
      "d3e3",
      "a6a5",
      "e3f4",
      "d5c4",
      "f4g4"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, ExposedKing, Rook Endgame, Deep Calculation",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1906,
    "themes": "crushing endgame exposedKing rookEndgame veryLong",
    "preMove": "f5e6",
    "preMoveFen": "5R2/1p6/p1p5/2P1rk2/2K3p1/2P1p1P1/1P5P/8 b - - 1 44"
  },
  {
    "id": "001XA",
    "puzzleIndex": 361,
    "title": "Exercise 361: White to Move",
    "fen": "2r2rk1/pbq1bppp/8/8/2p1N3/P1Bn2P1/2Q2PBP/1R3RK1 w - - 4 24",
    "solution": [
      "Rxb7",
      "Qxb7",
      "Nf6+",
      "Bxf6",
      "Bxb7"
    ],
    "solutionUci": [
      "b1b7",
      "c7b7",
      "e4f6",
      "e7f6",
      "g2b7"
    ],
    "description": "White to move. Themes: Crushing Advantage, Discovered Attack, Long Tactic, Master, Middlegame, Tactical Sacrifice",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 1722,
    "themes": "crushing discoveredAttack long master middlegame sacrifice",
    "preMove": "b8c7",
    "preMoveFen": "1qr2rk1/pb2bppp/8/8/2p1N3/P1Bn2P1/2Q2PBP/1R3RK1 b - - 3 23"
  },
  {
    "id": "001cr",
    "puzzleIndex": 362,
    "title": "Exercise 362: White to Move",
    "fen": "8/3B2pp/p5k1/6P1/1ppp1K2/8/1P6/8 w - - 0 39",
    "solution": [
      "Be8#"
    ],
    "solutionUci": [
      "d7e8"
    ],
    "description": "White to move. Themes: Bishop Endgame, Endgame, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1531,
    "themes": "bishopEndgame endgame mate mateIn1 oneMove",
    "preMove": "c5c4",
    "preMoveFen": "8/3B2pp/p5k1/2p3P1/1p1p1K2/8/1P6/8 b - - 0 38"
  },
  {
    "id": "001h8",
    "puzzleIndex": 363,
    "title": "Exercise 363: White to Move",
    "fen": "2r3k1/2r4p/4p1p1/1p1q1pP1/p2P1P1Q/P6R/4bB2/2R3K1 w - - 6 35",
    "solution": [
      "Qxh7+",
      "Rxh7",
      "Rxc8+",
      "Kg7",
      "Rc7+"
    ],
    "solutionUci": [
      "h4h7",
      "c7h7",
      "c1c8",
      "g8g7",
      "c8c7"
    ],
    "description": "White to move. Themes: Crushing Advantage, Deflection, KingsideAttack, Long Tactic, Middlegame, Tactical Sacrifice",
    "hint": "Look for a tactical sacrifice that decisively alters the position!",
    "rating": 1715,
    "themes": "crushing deflection kingsideAttack long middlegame sacrifice",
    "preMove": "c4e2",
    "preMoveFen": "2r3k1/2r4p/4p1p1/1p1q1pP1/p1bP1P1Q/P6R/5B2/2R3K1 b - - 5 34"
  },
  {
    "id": "001kG",
    "puzzleIndex": 364,
    "title": "Exercise 364: White to Move",
    "fen": "rnbq3r/1p3kpp/p4n2/2b5/2pNP3/2N5/PPP3PP/R1BQ1RK1 w - - 2 12",
    "solution": [
      "Qh5+",
      "Kg8",
      "Qxc5"
    ],
    "solutionUci": [
      "d1h5",
      "f7g8",
      "h5c5"
    ],
    "description": "White to move. Themes: Decisive Advantage, Opening, Pin, Short Tactic",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 1941,
    "themes": "advantage opening pin short",
    "preMove": "e7c5",
    "preMoveFen": "rnbq3r/1p2bkpp/p4n2/8/2pNP3/2N5/PPP3PP/R1BQ1RK1 b - - 1 11"
  },
  {
    "id": "001m3",
    "puzzleIndex": 365,
    "title": "Exercise 365: Black to Move",
    "fen": "7r/6k1/2b1Rp2/8/P1N3p1/5nP1/5P2/Q4K2 b - - 0 38",
    "solution": [
      "Rh1+",
      "Ke2",
      "Rxa1"
    ],
    "solutionUci": [
      "h8h1",
      "f1e2",
      "h1a1"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, Short Tactic, Skewer",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1455,
    "themes": "advantage endgame short skewer",
    "preMove": "e2e6",
    "preMoveFen": "7r/6k1/2b1pp2/8/P1N3p1/5nP1/4RP2/Q4K2 w - - 2 38"
  },
  {
    "id": "001uD",
    "puzzleIndex": 366,
    "title": "Exercise 366: White to Move",
    "fen": "6k1/1p4p1/1p3p1p/2r1p3/2n5/r3PN2/2RnNPPP/2R3K1 w - - 0 33",
    "solution": [
      "Nxd2",
      "Nxd2",
      "Rxd2",
      "Rxc1+",
      "Nxc1"
    ],
    "solutionUci": [
      "f3d2",
      "c4d2",
      "c2d2",
      "c5c1",
      "e2c1"
    ],
    "description": "White to move. Themes: Decisive Advantage, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1896,
    "themes": "advantage long middlegame",
    "preMove": "f7f6",
    "preMoveFen": "6k1/1p3pp1/1p5p/2r1p3/2n5/r3PN2/2RnNPPP/2R3K1 b - - 1 32"
  },
  {
    "id": "001xO",
    "puzzleIndex": 367,
    "title": "Exercise 367: Black to Move",
    "fen": "k1r1b3/p1r1nppp/Bp1qpn2/2Np4/1P1P4/PQR1PN2/5PPP/2R3K1 b - - 1 19",
    "solution": [
      "bxc5",
      "Bxc8",
      "c4"
    ],
    "solutionUci": [
      "b6c5",
      "a6c8",
      "c5c4"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Master, MasterVsMaster, Middlegame, Tactical Sacrifice, Short Tactic",
    "hint": "Look for a tactical sacrifice that decisively alters the position!",
    "rating": 1790,
    "themes": "crushing master masterVsMaster middlegame sacrifice short",
    "preMove": "d3a6",
    "preMoveFen": "k1r1b3/p1r1nppp/1p1qpn2/2Np4/1P1P4/PQRBPN2/5PPP/2R3K1 w - - 0 19"
  },
  {
    "id": "002Ds",
    "puzzleIndex": 368,
    "title": "Exercise 368: White to Move",
    "fen": "8/2p5/pp1p4/P2Pk2p/1PP1p2P/2n1K2P/3N4/8 w - - 0 46",
    "solution": [
      "b5",
      "Nd1+",
      "Ke2",
      "axb5",
      "a6"
    ],
    "solutionUci": [
      "b4b5",
      "c3d1",
      "e3e2",
      "a6b5",
      "a5a6"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Knight Endgame, Long Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1992,
    "themes": "crushing endgame knightEndgame long",
    "preMove": "b7b6",
    "preMoveFen": "8/1pp5/p2p4/P2Pk2p/1PP1p2P/2n1K2P/3N4/8 b - - 0 45"
  },
  {
    "id": "002KJ",
    "puzzleIndex": 369,
    "title": "Exercise 369: White to Move",
    "fen": "r3k2r/ppq1bppp/4pn2/2Ppn3/1P4bP/2P2N2/P3BPP1/RNBQ1RK1 w kq - 3 11",
    "solution": [
      "Nxe5",
      "Qxe5",
      "Bxg4"
    ],
    "solutionUci": [
      "f3e5",
      "c7e5",
      "e2g4"
    ],
    "description": "White to move. Themes: Crushing Advantage, Discovered Attack, Middlegame, Short Tactic",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 1571,
    "themes": "crushing discoveredAttack middlegame short",
    "preMove": "f8e7",
    "preMoveFen": "r3kb1r/ppq2ppp/4pn2/2Ppn3/1P4bP/2P2N2/P3BPP1/RNBQ1RK1 b kq - 2 10"
  },
  {
    "id": "002Tf",
    "puzzleIndex": 370,
    "title": "Exercise 370: Black to Move",
    "fen": "r3kbnr/ppp1qppp/2n5/1B1pP3/5B2/4PQ2/PPP2PPP/RN2K2R b KQkq - 2 7",
    "solution": [
      "Qb4+",
      "Nc3",
      "Qxb2"
    ],
    "solutionUci": [
      "e7b4",
      "b1c3",
      "b4b2"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Fork, Opening, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1561,
    "themes": "advantage fork opening short",
    "preMove": "f1b5",
    "preMoveFen": "r3kbnr/ppp1qppp/2n5/3pP3/5B2/4PQ2/PPP2PPP/RN2KB1R w KQkq - 1 7"
  },
  {
    "id": "002Ua",
    "puzzleIndex": 371,
    "title": "Exercise 371: Black to Move",
    "fen": "r4rk1/pp3ppp/3p1q2/P1P1p3/2B5/2B2n2/2P2P1P/R2Q1R1K b - - 1 16",
    "solution": [
      "Qf4",
      "Qxf3",
      "Qxf3+"
    ],
    "solutionUci": [
      "f6f4",
      "d1f3",
      "f4f3"
    ],
    "description": "Black to move. Themes: Crushing Advantage, KingsideAttack, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1669,
    "themes": "crushing kingsideAttack middlegame short",
    "preMove": "g1h1",
    "preMoveFen": "r4rk1/pp3ppp/3p1q2/P1P1p3/2B5/2B2n2/2P2P1P/R2Q1RK1 w - - 0 16"
  },
  {
    "id": "002Uy",
    "puzzleIndex": 372,
    "title": "Exercise 372: Black to Move",
    "fen": "8/8/1p6/k7/P7/1KR4r/8/8 b - - 27 64",
    "solution": [
      "Rxc3+",
      "Kxc3",
      "Kxa4",
      "Kb2",
      "Kb4"
    ],
    "solutionUci": [
      "h3c3",
      "b3c3",
      "a5a4",
      "c3b2",
      "a4b4"
    ],
    "description": "Black to move. Themes: Crushing Advantage, DefensiveMove, Endgame, Long Tactic, Rook Endgame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1573,
    "themes": "crushing defensiveMove endgame long rookEndgame",
    "preMove": "c4c3",
    "preMoveFen": "8/8/1p6/k7/P1R5/1K5r/8/8 w - - 26 64"
  },
  {
    "id": "002rd",
    "puzzleIndex": 373,
    "title": "Exercise 373: White to Move",
    "fen": "r6k/q1p2p1p/1b2bPr1/p1ppP2Q/3P2p1/4B3/PP2NRPP/3R2K1 w - - 2 26",
    "solution": [
      "Nf4",
      "cxd4",
      "Nxg6+",
      "fxg6",
      "Qh6"
    ],
    "solutionUci": [
      "e2f4",
      "c5d4",
      "f4g6",
      "f7g6",
      "h5h6"
    ],
    "description": "White to move. Themes: Crushing Advantage, KingsideAttack, Long Tactic, Middlegame, Pin",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 1795,
    "themes": "crushing kingsideAttack long middlegame pin",
    "preMove": "d7e6",
    "preMoveFen": "r6k/q1pb1p1p/1b3Pr1/p1ppP2Q/3P2p1/4B3/PP2NRPP/3R2K1 b - - 1 25"
  },
  {
    "id": "002uV",
    "puzzleIndex": 374,
    "title": "Exercise 374: Black to Move",
    "fen": "r2r2k1/1p2qppp/2n1p3/5Q2/p2P4/P4N2/BP3PPP/2R1R1K1 b - - 0 20",
    "solution": [
      "exf5",
      "Rxe7",
      "Nxe7"
    ],
    "solutionUci": [
      "e6f5",
      "e1e7",
      "c6e7"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1434,
    "themes": "advantage middlegame short",
    "preMove": "d3f5",
    "preMoveFen": "r2r2k1/1p2qppp/2n1p3/5n2/p2P4/P2Q1N2/BP3PPP/2R1R1K1 w - - 4 20"
  },
  {
    "id": "003IX",
    "puzzleIndex": 375,
    "title": "Exercise 375: Black to Move",
    "fen": "8/3pk3/R7/1R2PK1p/2PPn1r1/8/8/8 b - - 0 43",
    "solution": [
      "Ng3#"
    ],
    "solutionUci": [
      "e4g3"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1699,
    "themes": "endgame mate mateIn1 oneMove",
    "preMove": "f4f5",
    "preMoveFen": "8/3pk3/R7/1R2Pp1p/2PPnKr1/8/8/8 w - - 4 43"
  },
  {
    "id": "003S3",
    "puzzleIndex": 376,
    "title": "Exercise 376: White to Move",
    "fen": "1r3k1r/pNqnppb1/6pn/2p3Np/7P/2P2Q2/PP3PP1/R1B1K2R w KQ - 3 16",
    "solution": [
      "Ne6+",
      "Kg8",
      "Nxc7"
    ],
    "solutionUci": [
      "g5e6",
      "f8g8",
      "e6c7"
    ],
    "description": "White to move. Themes: Decisive Advantage, Middlegame, Pin, Short Tactic",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 1415,
    "themes": "advantage middlegame pin short",
    "preMove": "a8b8",
    "preMoveFen": "r4k1r/pNqnppb1/6pn/2p3Np/7P/2P2Q2/PP3PP1/R1B1K2R b KQ - 2 15"
  },
  {
    "id": "003Tx",
    "puzzleIndex": 377,
    "title": "Exercise 377: Black to Move",
    "fen": "2r5/pR5p/5p1k/4p3/4R3/B4nPP/PP3P2/1K6 b - - 0 27",
    "solution": [
      "Nd2+",
      "Ka1",
      "Rc1#"
    ],
    "solutionUci": [
      "f3d2",
      "b1a1",
      "c8c1"
    ],
    "description": "Black to move. Themes: Back-Rank Mate, Endgame, Fork, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1510,
    "themes": "backRankMate endgame fork mate mateIn2 short",
    "preMove": "e1e4",
    "preMoveFen": "2r5/pR5p/5p1k/4p3/4r3/B4nPP/PP3P2/1K2R3 w - - 0 27"
  },
  {
    "id": "003UW",
    "puzzleIndex": 378,
    "title": "Exercise 378: White to Move",
    "fen": "8/6pk/7p/2pq4/3p4/5PP1/P3QK1P/8 w - - 2 41",
    "solution": [
      "Qe4+",
      "Qxe4",
      "fxe4"
    ],
    "solutionUci": [
      "e2e4",
      "d5e4",
      "f3e4"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Queen Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1492,
    "themes": "advantage endgame queenEndgame short",
    "preMove": "c4d5",
    "preMoveFen": "8/6pk/7p/2p5/2qp4/5PP1/P3QK1P/8 b - - 1 40"
  },
  {
    "id": "003wQ",
    "puzzleIndex": 379,
    "title": "Exercise 379: Black to Move",
    "fen": "2r2rk1/6pp/3Q1q2/8/3N1B2/6P1/PP1K3P/5R2 b - - 0 24",
    "solution": [
      "Qxd6",
      "Bxd6",
      "Rxf1"
    ],
    "solutionUci": [
      "f6d6",
      "f4d6",
      "f8f1"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Discovered Attack, Middlegame, Pin, Short Tactic",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 1877,
    "themes": "advantage discoveredAttack middlegame pin short",
    "preMove": "a1f1",
    "preMoveFen": "2r2rk1/6pp/3Q1q2/8/3N1B2/6P1/PP1K3P/R4b2 w - - 0 24"
  },
  {
    "id": "0047P",
    "puzzleIndex": 380,
    "title": "Exercise 380: Black to Move",
    "fen": "8/1N3k2/6p1/8/2P3P1/pr6/R7/5K2 b - - 2 56",
    "solution": [
      "Rb1+",
      "Ke2",
      "Rb2+",
      "Kd1",
      "Rxa2"
    ],
    "solutionUci": [
      "b3b1",
      "f1e2",
      "b1b2",
      "e2d1",
      "b2a2"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, ExposedKing, Fork, Long Tactic, Master",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1766,
    "themes": "crushing endgame exposedKing fork long master",
    "preMove": "g2f1",
    "preMoveFen": "8/1N3k2/6p1/8/2P3P1/pr6/R5K1/8 w - - 1 56"
  },
  {
    "id": "0048r",
    "puzzleIndex": 381,
    "title": "Exercise 381: White to Move",
    "fen": "1r3k2/5PbQ/p2p4/1q1Pp1P1/8/3R4/2P1K3/8 w - - 1 33",
    "solution": [
      "Qg8+",
      "Ke7",
      "Qxg7"
    ],
    "solutionUci": [
      "h7g8",
      "f8e7",
      "g8g7"
    ],
    "description": "White to move. Themes: Crushing Advantage, Deflection, Endgame, Short Tactic",
    "hint": "Deflect the key defender away from its crucial post!",
    "rating": 1443,
    "themes": "crushing deflection endgame short",
    "preMove": "a5b5",
    "preMoveFen": "1r3k2/5PbQ/p2p4/q2Pp1P1/8/3R4/2P1K3/8 b - - 0 32"
  },
  {
    "id": "0048x",
    "puzzleIndex": 382,
    "title": "Exercise 382: Black to Move",
    "fen": "6k1/7p/4p1p1/QP2Pp2/P1pq4/5bR1/7K/6R1 b - - 0 39",
    "solution": [
      "Qh4+",
      "Rh3",
      "Qf2+",
      "Rg2",
      "Qxg2#"
    ],
    "solutionUci": [
      "d4h4",
      "g3h3",
      "h4f2",
      "g1g2",
      "f2g2"
    ],
    "description": "Black to move. Themes: Endgame, ExposedKing, Long Tactic, Checkmate, Mate in 3",
    "hint": "Calculate a forcing checkmate combination!",
    "rating": 1433,
    "themes": "endgame exposedKing long mate mateIn3",
    "preMove": "h3h2",
    "preMoveFen": "6k1/7p/4p1p1/QP2Pp2/P1pq4/5bRK/7r/6R1 w - - 0 39"
  },
  {
    "id": "004Ao",
    "puzzleIndex": 383,
    "title": "Exercise 383: Black to Move",
    "fen": "4qk2/1b3R2/p7/1p2Q3/4P2P/P2P3K/2r5/3R4 b - - 0 41",
    "solution": [
      "Qxf7",
      "Qh8+",
      "Ke7"
    ],
    "solutionUci": [
      "e8f7",
      "e5h8",
      "f8e7"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1711,
    "themes": "advantage endgame short",
    "preMove": "g7f7",
    "preMoveFen": "4qk2/1b3rR1/p7/1p2Q3/4P2P/P2P3K/2r5/3R4 w - - 5 41"
  },
  {
    "id": "004Ax",
    "puzzleIndex": 384,
    "title": "Exercise 384: White to Move",
    "fen": "8/5k2/4R2p/p7/5rPK/8/7P/8 w - - 3 43",
    "solution": [
      "Rxh6",
      "Rf6",
      "Rh7+",
      "Kg6",
      "Ra7"
    ],
    "solutionUci": [
      "e6h6",
      "f4f6",
      "h6h7",
      "f7g6",
      "h7a7"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, ExposedKing, Long Tactic, Rook Endgame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1999,
    "themes": "crushing endgame exposedKing long rookEndgame",
    "preMove": "g6f7",
    "preMoveFen": "8/8/4R1kp/p7/5rPK/8/7P/8 b - - 2 42"
  },
  {
    "id": "004BW",
    "puzzleIndex": 385,
    "title": "Exercise 385: Black to Move",
    "fen": "r1bk2r1/ppq2NQp/3bpn2/1Bpn4/5P2/1P6/PBPP2PP/RN2K2R b KQ - 0 13",
    "solution": [
      "Ke7",
      "Qxg8",
      "Nxg8"
    ],
    "solutionUci": [
      "d8e7",
      "g7g8",
      "f6g8"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Master, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1679,
    "themes": "advantage master middlegame short",
    "preMove": "e5f7",
    "preMoveFen": "r1bk2r1/ppq2pQp/3bpn2/1BpnN3/5P2/1P6/PBPP2PP/RN2K2R w KQ - 3 13"
  },
  {
    "id": "004RF",
    "puzzleIndex": 386,
    "title": "Exercise 386: White to Move",
    "fen": "5rk1/5ppp/1p6/1q3P1Q/2pp3P/6R1/6PK/8 w - - 0 31",
    "solution": [
      "Rxg7+",
      "Kxg7",
      "f6+",
      "Kxf6",
      "Qxb5"
    ],
    "solutionUci": [
      "g3g7",
      "g8g7",
      "f5f6",
      "g7f6",
      "h5b5"
    ],
    "description": "White to move. Themes: Attraction Sacrifice, Crushing Advantage, Discovered Attack, Endgame, Long Tactic, Tactical Sacrifice",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 1709,
    "themes": "attraction crushing discoveredAttack endgame long sacrifice",
    "preMove": "c5c4",
    "preMoveFen": "5rk1/5ppp/1p6/1qp2P1Q/3p3P/6R1/6PK/8 b - - 0 30"
  },
  {
    "id": "004Ud",
    "puzzleIndex": 387,
    "title": "Exercise 387: White to Move",
    "fen": "r1bqk2r/p3nppp/3p4/1pp5/4P3/4Q3/PPP2PPP/2KR1B1R w kq - 0 12",
    "solution": [
      "Bxb5+",
      "Bd7",
      "Rxd6",
      "Bxb5",
      "Rxd8+"
    ],
    "solutionUci": [
      "f1b5",
      "c8d7",
      "d1d6",
      "d7b5",
      "d6d8"
    ],
    "description": "White to move. Themes: Decisive Advantage, Interference, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1513,
    "themes": "advantage interference long middlegame",
    "preMove": "d5e7",
    "preMoveFen": "r1bqk2r/p3Bppp/3p4/1ppn4/4P3/4Q3/PPP2PPP/2KR1B1R b kq - 0 11"
  },
  {
    "id": "004d8",
    "puzzleIndex": 388,
    "title": "Exercise 388: White to Move",
    "fen": "8/4kr2/R2p4/1p1Pp3/5pp1/3K1P2/PPP5/8 w - - 0 40",
    "solution": [
      "Ra7+",
      "Kf6",
      "Rxf7+",
      "Kxf7",
      "fxg4"
    ],
    "solutionUci": [
      "a6a7",
      "e7f6",
      "a7f7",
      "f6f7",
      "f3g4"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Long Tactic, Rook Endgame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1608,
    "themes": "crushing endgame long rookEndgame",
    "preMove": "g5g4",
    "preMoveFen": "8/4kr2/R2p4/1p1Pp1p1/5p2/3K1P2/PPP5/8 b - - 0 39"
  },
  {
    "id": "004zI",
    "puzzleIndex": 389,
    "title": "Exercise 389: White to Move",
    "fen": "2q3k1/4br2/6pQ/1p1n2p1/7P/1P4P1/1B2PP2/6K1 w - - 0 28",
    "solution": [
      "Qh8#"
    ],
    "solutionUci": [
      "h6h8"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1406,
    "themes": "endgame mate mateIn1 oneMove",
    "preMove": "h7g6",
    "preMoveFen": "2q3k1/4br1p/6RQ/1p1n2p1/7P/1P4P1/1B2PP2/6K1 b - - 0 27"
  },
  {
    "id": "0054a",
    "puzzleIndex": 390,
    "title": "Exercise 390: White to Move",
    "fen": "r1b2rk1/ppq2p1p/6p1/4b2Q/4R3/3B4/PP3PPP/R1B3K1 w - - 0 16",
    "solution": [
      "Qxe5",
      "Qxe5",
      "Rxe5"
    ],
    "solutionUci": [
      "h5e5",
      "c7e5",
      "e4e5"
    ],
    "description": "White to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1466,
    "themes": "advantage middlegame short",
    "preMove": "g7g6",
    "preMoveFen": "r1b2rk1/ppq2ppp/8/4b2Q/4R3/3B4/PP3PPP/R1B3K1 b - - 1 15"
  },
  {
    "id": "005Bm",
    "puzzleIndex": 391,
    "title": "Exercise 391: White to Move",
    "fen": "4rk2/p4q2/1p3Q1b/8/1p5N/2P1p3/P3P3/2K5 w - - 1 44",
    "solution": [
      "Ng6+",
      "Kg8",
      "Qh8#"
    ],
    "solutionUci": [
      "h4g6",
      "f8g8",
      "f6h8"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 2, Pin, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1476,
    "themes": "endgame mate mateIn2 pin short",
    "preMove": "c7f7",
    "preMoveFen": "4rk2/p1q5/1p3Q1b/8/1p5N/2P1p3/P3P3/2K5 b - - 0 43"
  },
  {
    "id": "005HG",
    "puzzleIndex": 392,
    "title": "Exercise 392: Black to Move",
    "fen": "r2q1rk1/p1p2pp1/3bbn1p/4N3/8/1P4P1/PBQPPP1P/RN2K2R b KQ - 2 12",
    "solution": [
      "Bxe5",
      "Bxe5",
      "Qd5",
      "f3",
      "Qxe5"
    ],
    "solutionUci": [
      "d6e5",
      "b2e5",
      "d8d5",
      "f2f3",
      "d5e5"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Clearance Sacrifice, Fork, Long Tactic, Opening",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1761,
    "themes": "advantage clearance fork long opening",
    "preMove": "c4c2",
    "preMoveFen": "r2q1rk1/p1p2pp1/3bbn1p/4N3/2Q5/1P4P1/PB1PPP1P/RN2K2R w KQ - 1 12"
  },
  {
    "id": "005gP",
    "puzzleIndex": 393,
    "title": "Exercise 393: Black to Move",
    "fen": "8/8/3p4/2kP2P1/1p6/2pK4/P7/8 b - - 0 42",
    "solution": [
      "Kxd5",
      "g6",
      "Ke6",
      "g7",
      "Kf7",
      "a4",
      "bxa3",
      "g8=R",
      "Kxg8"
    ],
    "solutionUci": [
      "c5d5",
      "g5g6",
      "d5e6",
      "g6g7",
      "e6f7",
      "a2a4",
      "b4a3",
      "g7g8r",
      "f7g8"
    ],
    "description": "Black to move. Themes: Crushing Advantage, EnPassant, Endgame, Pawn Endgame, Deep Calculation",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1797,
    "themes": "crushing enPassant endgame pawnEndgame veryLong",
    "preMove": "g4g5",
    "preMoveFen": "8/8/3p4/2kP4/1p4P1/2pK4/P7/8 w - - 1 42"
  },
  {
    "id": "005wy",
    "puzzleIndex": 394,
    "title": "Exercise 394: Black to Move",
    "fen": "1r6/pp2kppQ/2n1p1n1/3p2P1/5P2/2PqP3/PP1N4/2KR3R b - - 4 27",
    "solution": [
      "Nb4",
      "cxb4",
      "Rc8+",
      "Nc4",
      "Rxc4#"
    ],
    "solutionUci": [
      "c6b4",
      "c3b4",
      "b8c8",
      "d2c4",
      "c8c4"
    ],
    "description": "Black to move. Themes: Long Tactic, Checkmate, Mate in 3, Middlegame, QueensideAttack, Tactical Sacrifice",
    "hint": "Calculate a forcing checkmate combination!",
    "rating": 1918,
    "themes": "long mate mateIn3 middlegame queensideAttack sacrifice",
    "preMove": "h5h7",
    "preMoveFen": "1r6/pp2kpp1/2n1p1n1/3p2PQ/5P2/2PqP3/PP1N4/2KR3R w - - 3 27"
  },
  {
    "id": "005xu",
    "puzzleIndex": 395,
    "title": "Exercise 395: White to Move",
    "fen": "6r1/3k4/1K1P4/2P5/R7/5b2/8/8 w - - 1 69",
    "solution": [
      "Ra7+",
      "Ke6",
      "Re7+",
      "Kd5",
      "d7"
    ],
    "solutionUci": [
      "a4a7",
      "d7e6",
      "a7e7",
      "e6d5",
      "d6d7"
    ],
    "description": "White to move. Themes: AdvancedPawn, Crushing Advantage, Endgame, ExposedKing, Long Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1914,
    "themes": "advancedPawn crushing endgame exposedKing long",
    "preMove": "g5g8",
    "preMoveFen": "8/3k4/1K1P4/2P3r1/R7/5b2/8/8 b - - 0 68"
  },
  {
    "id": "0068B",
    "puzzleIndex": 396,
    "title": "Exercise 396: White to Move",
    "fen": "r1q3k1/3nbppp/pp2p3/4B3/8/2N2Q2/PPPR1PPP/6K1 w - - 1 19",
    "solution": [
      "Rxd7",
      "Qxd7",
      "Qxa8+"
    ],
    "solutionUci": [
      "d2d7",
      "c8d7",
      "f3a8"
    ],
    "description": "White to move. Themes: Crushing Advantage, Deflection, Middlegame, Short Tactic",
    "hint": "Deflect the key defender away from its crucial post!",
    "rating": 1514,
    "themes": "crushing deflection middlegame short",
    "preMove": "f6d7",
    "preMoveFen": "r1q3k1/4bppp/pp2pn2/4B3/8/2N2Q2/PPPR1PPP/6K1 b - - 0 18"
  },
  {
    "id": "0068D",
    "puzzleIndex": 397,
    "title": "Exercise 397: Black to Move",
    "fen": "7r/pppk4/2pN1r2/8/3P2p1/2P5/PP2RPP1/4R1K1 b - - 0 26",
    "solution": [
      "Rfh6",
      "f4",
      "g3",
      "Re7+",
      "Kxd6",
      "Kf1",
      "Rh1+"
    ],
    "solutionUci": [
      "f6h6",
      "f2f4",
      "g4g3",
      "e2e7",
      "d7d6",
      "g1f1",
      "h6h1"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Deep Calculation",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1962,
    "themes": "crushing endgame veryLong",
    "preMove": "c4d6",
    "preMoveFen": "7r/pppk4/2pb1r2/8/2NP2p1/2P5/PP2RPP1/4R1K1 w - - 2 26"
  },
  {
    "id": "006E1",
    "puzzleIndex": 398,
    "title": "Exercise 398: Black to Move",
    "fen": "5rk1/R4pp1/1p5p/3Q4/1PPp2q1/3P2P1/5P2/4K3 b - - 0 34",
    "solution": [
      "Re8+",
      "Kf1",
      "Qh3+",
      "Qg2",
      "Re1+",
      "Kxe1",
      "Qxg2"
    ],
    "solutionUci": [
      "f8e8",
      "e1f1",
      "g4h3",
      "d5g2",
      "e8e1",
      "f1e1",
      "h3g2"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Deflection, Endgame, Deep Calculation",
    "hint": "Deflect the key defender away from its crucial post!",
    "rating": 1543,
    "themes": "crushing deflection endgame veryLong",
    "preMove": "f1e1",
    "preMoveFen": "5rk1/R4pp1/1p5p/3Q4/1PPp2q1/3P2P1/5P2/4nK2 w - - 0 34"
  },
  {
    "id": "006RM",
    "puzzleIndex": 399,
    "title": "Exercise 399: White to Move",
    "fen": "1k1r3r/8/pp1n2p1/2q5/1Q6/3R2P1/PPP2P1P/3R2K1 w - - 5 30",
    "solution": [
      "Qxc5",
      "bxc5",
      "Rxd6",
      "Rxd6",
      "Rxd6"
    ],
    "solutionUci": [
      "b4c5",
      "b6c5",
      "d3d6",
      "d8d6",
      "d1d6"
    ],
    "description": "White to move. Themes: Crushing Advantage, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1458,
    "themes": "crushing long middlegame",
    "preMove": "c7c5",
    "preMoveFen": "1k1r3r/2q5/pp1n2p1/8/1Q6/3R2P1/PPP2P1P/3R2K1 b - - 4 29"
  },
  {
    "id": "006di",
    "puzzleIndex": 400,
    "title": "Exercise 400: Black to Move",
    "fen": "5rk1/p7/1p4p1/3pB1Nq/3P1Pn1/4nQP1/PP5P/4R1K1 b - - 3 36",
    "solution": [
      "Qxh2#"
    ],
    "solutionUci": [
      "h5h2"
    ],
    "description": "Black to move. Themes: KingsideAttack, Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1500,
    "themes": "kingsideAttack mate mateIn1 middlegame oneMove",
    "preMove": "e2f3",
    "preMoveFen": "5rk1/p7/1p4p1/3pB1Nq/3P1Pn1/4n1P1/PP2Q2P/4R1K1 w - - 2 36"
  },
  {
    "id": "006fF",
    "puzzleIndex": 401,
    "title": "Exercise 401: White to Move",
    "fen": "r1b4r/pp1k2p1/2nb2qp/1B1p2B1/3p3Q/8/PPP2PPP/3RR1K1 w - - 0 18",
    "solution": [
      "Qg4+",
      "Kc7",
      "Bd8+",
      "Rxd8",
      "Qxg6"
    ],
    "solutionUci": [
      "h4g4",
      "d7c7",
      "g5d8",
      "h8d8",
      "g4g6"
    ],
    "description": "White to move. Themes: Decisive Advantage, Discovered Attack, ExposedKing, Long Tactic, Middlegame",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 1688,
    "themes": "advantage discoveredAttack exposedKing long middlegame",
    "preMove": "h7h6",
    "preMoveFen": "r1b4r/pp1k2pp/2nb2q1/1B1p2B1/3p3Q/8/PPP2PPP/3RR1K1 b - - 5 17"
  },
  {
    "id": "006i7",
    "puzzleIndex": 402,
    "title": "Exercise 402: Black to Move",
    "fen": "r4rk1/3nqpp1/2N1bn1p/3p4/1p1P4/2NQP2P/1PB2PP1/R4RK1 b - - 0 18",
    "solution": [
      "Qd6",
      "Rxa8",
      "Rxa8",
      "Nxb4",
      "Qxb4"
    ],
    "solutionUci": [
      "e7d6",
      "a1a8",
      "f8a8",
      "c6b4",
      "d6b4"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1727,
    "themes": "advantage long middlegame",
    "preMove": "e5c6",
    "preMoveFen": "r4rk1/3nqpp1/2p1bn1p/3pN3/1p1P4/2NQP2P/1PB2PP1/R4RK1 w - - 0 18"
  },
  {
    "id": "006om",
    "puzzleIndex": 403,
    "title": "Exercise 403: White to Move",
    "fen": "1r3k2/5p1p/2p1pp2/P2n4/r3N3/P4PK1/2R2P1P/2R5 w - - 10 30",
    "solution": [
      "Nc5",
      "Rxa5",
      "Nd7+",
      "Kg7",
      "Nxb8"
    ],
    "solutionUci": [
      "e4c5",
      "a4a5",
      "c5d7",
      "f8g7",
      "d7b8"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Fork, Long Tactic, Master",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1874,
    "themes": "crushing endgame fork long master",
    "preMove": "c4a4",
    "preMoveFen": "1r3k2/5p1p/2p1pp2/P2n4/2r1N3/P4PK1/2R2P1P/2R5 b - - 9 29"
  },
  {
    "id": "006pe",
    "puzzleIndex": 404,
    "title": "Exercise 404: White to Move",
    "fen": "r4r2/2q1Nb2/5Qpk/2n4p/pp5P/8/1PP2PP1/2KR3R w - - 0 29",
    "solution": [
      "Nf5+",
      "Kh7",
      "Qg7#"
    ],
    "solutionUci": [
      "e7f5",
      "h6h7",
      "f6g7"
    ],
    "description": "White to move. Themes: Master, Checkmate, Mate in 2, Middlegame, Pin, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1560,
    "themes": "master mate mateIn2 middlegame pin short",
    "preMove": "e6f7",
    "preMoveFen": "r4r2/2q1NN2/4bQpk/2n4p/pp5P/8/1PP2PP1/2KR3R b - - 0 28"
  },
  {
    "id": "006wz",
    "puzzleIndex": 405,
    "title": "Exercise 405: White to Move",
    "fen": "2r5/4ppkp/6p1/1p6/1P6/P3B3/1br2PPP/1R1R2K1 w - - 3 23",
    "solution": [
      "Rxb2",
      "Rxb2",
      "Bd4+",
      "f6",
      "Bxb2"
    ],
    "solutionUci": [
      "b1b2",
      "c2b2",
      "e3d4",
      "f7f6",
      "d4b2"
    ],
    "description": "White to move. Themes: Attraction Sacrifice, Crushing Advantage, Endgame, Fork, Long Tactic, Tactical Sacrifice",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1426,
    "themes": "attraction crushing endgame fork long sacrifice",
    "preMove": "f6b2",
    "preMoveFen": "2r5/4ppkp/5bp1/1p6/1P6/P3B3/2r2PPP/1R1R2K1 b - - 2 22"
  },
  {
    "id": "00734",
    "puzzleIndex": 406,
    "title": "Exercise 406: White to Move",
    "fen": "r4bk1/2rqp2p/n1p3p1/3p1p2/3P1P1B/pP1BP3/P1Q2PRP/1KR5 w - - 1 27",
    "solution": [
      "Bxf5",
      "e6",
      "Bxg6"
    ],
    "solutionUci": [
      "d3f5",
      "e7e6",
      "f5g6"
    ],
    "description": "White to move. Themes: Crushing Advantage, Middlegame, Pin, Short Tactic",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 1692,
    "themes": "crushing middlegame pin short",
    "preMove": "b8a6",
    "preMoveFen": "rn3bk1/2rqp2p/2p3p1/3p1p2/3P1P1B/pP1BP3/P1Q2PRP/1KR5 b - - 0 26"
  },
  {
    "id": "00798",
    "puzzleIndex": 407,
    "title": "Exercise 407: Black to Move",
    "fen": "8/4k1K1/4P3/6pp/6rP/4R1P1/8/8 b - - 1 60",
    "solution": [
      "gxh4+",
      "Kh6",
      "hxg3"
    ],
    "solutionUci": [
      "g5h4",
      "g7h6",
      "h4g3"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Discovered Attack, Endgame, Rook Endgame, Short Tactic",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 1907,
    "themes": "crushing discoveredAttack endgame rookEndgame short",
    "preMove": "g8g7",
    "preMoveFen": "6K1/4k3/4P3/6pp/6rP/4R1P1/8/8 w - - 0 60"
  },
  {
    "id": "007AS",
    "puzzleIndex": 408,
    "title": "Exercise 408: White to Move",
    "fen": "1r2kb1r/3nnpp1/4p1bp/1NppP3/3P4/6N1/P2BBPPP/R3K2R w KQk - 1 18",
    "solution": [
      "Nd6+",
      "Kd8",
      "Ba5+"
    ],
    "solutionUci": [
      "b5d6",
      "e8d8",
      "d2a5"
    ],
    "description": "White to move. Themes: Crushing Advantage, Master, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1582,
    "themes": "crushing master middlegame short",
    "preMove": "a8b8",
    "preMoveFen": "r3kb1r/3nnpp1/4p1bp/1NppP3/3P4/6N1/P2BBPPP/R3K2R b KQkq - 0 17"
  },
  {
    "id": "007en",
    "puzzleIndex": 409,
    "title": "Exercise 409: Black to Move",
    "fen": "rn3rk1/4pp1p/3p2pB/2q4P/3QP1b1/Pp6/1P2B3/1K1R2NR b - - 0 20",
    "solution": [
      "Qc2+",
      "Ka1",
      "Rxa3+",
      "bxa3",
      "Qa2#"
    ],
    "solutionUci": [
      "c5c2",
      "b1a1",
      "a8a3",
      "b2a3",
      "c2a2"
    ],
    "description": "Black to move. Themes: Long Tactic, Checkmate, Mate in 3, Middlegame, QueensideAttack, Tactical Sacrifice",
    "hint": "Calculate a forcing checkmate combination!",
    "rating": 1766,
    "themes": "long mate mateIn3 middlegame queensideAttack sacrifice",
    "preMove": "e3d4",
    "preMoveFen": "rn3rk1/4pp1p/3p2pB/2q4P/3bP1b1/Pp2Q3/1P2B3/1K1R2NR w - - 0 20"
  },
  {
    "id": "007ku",
    "puzzleIndex": 410,
    "title": "Exercise 410: White to Move",
    "fen": "r1bq3Q/1np3p1/p5k1/1p1Pp3/1Pn2BP1/2b2P2/P3K3/R4N2 w - - 0 36",
    "solution": [
      "Qh5+",
      "Kf6",
      "Bg5#"
    ],
    "solutionUci": [
      "h8h5",
      "g6f6",
      "f4g5"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 2, Middlegame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1687,
    "themes": "mate mateIn2 middlegame short",
    "preMove": "f7g6",
    "preMoveFen": "r1bq3Q/1np2kp1/p5B1/1p1Pp3/1Pn2BP1/2b2P2/P3K3/R4N2 b - - 5 35"
  },
  {
    "id": "008D5",
    "puzzleIndex": 411,
    "title": "Exercise 411: White to Move",
    "fen": "r1bqk2r/pp3ppp/4p3/3pPn2/1b1P1P2/2N5/PP4PP/R1BQKB1R w KQkq - 3 10",
    "solution": [
      "Qa4+",
      "Bd7",
      "Qxb4"
    ],
    "solutionUci": [
      "d1a4",
      "c8d7",
      "a4b4"
    ],
    "description": "White to move. Themes: Decisive Advantage, Fork, Master, Opening, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1446,
    "themes": "advantage fork master opening short",
    "preMove": "h6f5",
    "preMoveFen": "r1bqk2r/pp3ppp/4p2n/3pP3/1b1P1P2/2N5/PP4PP/R1BQKB1R b KQkq - 2 9"
  },
  {
    "id": "008Sk",
    "puzzleIndex": 412,
    "title": "Exercise 412: White to Move",
    "fen": "8/6pp/3Bp2k/p2pP2P/P3p1PK/8/r4b2/5R2 w - - 3 38",
    "solution": [
      "Rxf2",
      "g5+",
      "Kg3",
      "Rxf2",
      "Kxf2"
    ],
    "solutionUci": [
      "f1f2",
      "g7g5",
      "h4g3",
      "a2f2",
      "g3f2"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Long Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1867,
    "themes": "crushing endgame long",
    "preMove": "d4f2",
    "preMoveFen": "8/6pp/3Bp2k/p2pP2P/P2bp1PK/8/r7/5R2 b - - 2 37"
  },
  {
    "id": "008qL",
    "puzzleIndex": 413,
    "title": "Exercise 413: Black to Move",
    "fen": "r7/6pk/p2Q4/2p1p1qp/1pP1PrP1/1P3P1P/1P4K1/R4R2 b - - 0 25",
    "solution": [
      "Rd8",
      "Qxd8",
      "Qxd8"
    ],
    "solutionUci": [
      "a8d8",
      "d6d8",
      "g5d8"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1837,
    "themes": "advantage endgame short",
    "preMove": "d3d6",
    "preMoveFen": "r7/6pk/p2p4/2p1p1qp/1pP1PrP1/1P1Q1P1P/1P4K1/R4R2 w - - 0 25"
  },
  {
    "id": "0095W",
    "puzzleIndex": 414,
    "title": "Exercise 414: Black to Move",
    "fen": "8/pp1r2kp/q2P1ppb/4N3/4P3/1Q5P/PPR2PP1/6K1 b - - 0 32",
    "solution": [
      "fxe5",
      "Rc7",
      "Qxd6"
    ],
    "solutionUci": [
      "f6e5",
      "c2c7",
      "a6d6"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, Hanging Piece, Short Tactic",
    "hint": "Look for undefended or hanging material!",
    "rating": 1858,
    "themes": "advantage endgame hangingPiece short",
    "preMove": "c4e5",
    "preMoveFen": "8/pp1r2kp/q2P1ppb/4p3/2N1P3/1Q5P/PPR2PP1/6K1 w - - 3 32"
  },
  {
    "id": "009BH",
    "puzzleIndex": 415,
    "title": "Exercise 415: White to Move",
    "fen": "3r3k/6p1/4Q3/4B3/1p3P2/4PKP1/3q4/8 w - - 18 52",
    "solution": [
      "Qh6+",
      "Kg8",
      "Qxg7#"
    ],
    "solutionUci": [
      "e6h6",
      "h8g8",
      "h6g7"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 2, Pin, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1507,
    "themes": "endgame mate mateIn2 pin short",
    "preMove": "g8h8",
    "preMoveFen": "3r2k1/6p1/4Q3/4B3/1p3P2/4PKP1/3q4/8 b - - 17 51"
  },
  {
    "id": "009FS",
    "puzzleIndex": 416,
    "title": "Exercise 416: Black to Move",
    "fen": "r2qr1k1/p5bp/1pp1N1p1/8/2Q2p2/2P1n2P/PP3PP1/R1B1RNK1 b - - 0 18",
    "solution": [
      "Nxc4",
      "Nxd8",
      "Rxe1"
    ],
    "solutionUci": [
      "e3c4",
      "e6d8",
      "e8e1"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Discovered Attack, Opening, Short Tactic",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 1736,
    "themes": "crushing discoveredAttack opening short",
    "preMove": "d4e6",
    "preMoveFen": "r2qr1k1/p5bp/1pp1b1p1/8/2QN1p2/2P1n2P/PP3PP1/R1B1RNK1 w - - 1 18"
  },
  {
    "id": "009Sz",
    "puzzleIndex": 417,
    "title": "Exercise 417: White to Move",
    "fen": "r2qkb1r/pp4pp/4ppb1/3pN2B/3nnP2/2N5/PPP3PP/R1B1QRK1 w kq - 2 12",
    "solution": [
      "Nxg6",
      "hxg6",
      "Bxg6+"
    ],
    "solutionUci": [
      "e5g6",
      "h7g6",
      "h5g6"
    ],
    "description": "White to move. Themes: Decisive Advantage, Opening, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1748,
    "themes": "advantage opening short",
    "preMove": "f5g6",
    "preMoveFen": "r2qkb1r/pp4pp/4pp2/3pNb1B/3nnP2/2N5/PPP3PP/R1B1QRK1 b kq - 1 11"
  },
  {
    "id": "009XT",
    "puzzleIndex": 418,
    "title": "Exercise 418: Black to Move",
    "fen": "rn1qk2r/pp3ppp/3bp1N1/3p4/3Pn3/3BB3/PPP2PPP/RN1Q1RK1 b kq - 0 10",
    "solution": [
      "Bxh2+",
      "Kh1",
      "hxg6"
    ],
    "solutionUci": [
      "d6h2",
      "g1h1",
      "h7g6"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Zwischenzug, Opening, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1981,
    "themes": "crushing intermezzo opening short",
    "preMove": "h4g6",
    "preMoveFen": "rn1qk2r/pp3ppp/3bp1b1/3p4/3Pn2N/3BB3/PPP2PPP/RN1Q1RK1 w kq - 4 10"
  },
  {
    "id": "009aD",
    "puzzleIndex": 419,
    "title": "Exercise 419: Black to Move",
    "fen": "r4k1r/pp3pp1/4p3/3pP1np/6Pq/1PP5/P3B1PP/RN1Q1RK1 b - - 0 14",
    "solution": [
      "hxg4",
      "Bxg4",
      "Qxh2+"
    ],
    "solutionUci": [
      "h5g4",
      "e2g4",
      "h4h2"
    ],
    "description": "Black to move. Themes: Decisive Advantage, KingsideAttack, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1426,
    "themes": "advantage kingsideAttack middlegame short",
    "preMove": "f3g4",
    "preMoveFen": "r4k1r/pp3pp1/4p3/3pP1np/6bq/1PP2P2/P3B1PP/RN1Q1RK1 w - - 1 14"
  },
  {
    "id": "009hH",
    "puzzleIndex": 420,
    "title": "Exercise 420: Black to Move",
    "fen": "k3r3/p3q3/1pp5/3pnB2/1P1Q4/1KPP4/P3R3/8 b - - 1 41",
    "solution": [
      "Nf3",
      "Rxe7",
      "Nxd4+",
      "cxd4",
      "Rxe7"
    ],
    "solutionUci": [
      "e5f3",
      "e2e7",
      "f3d4",
      "c3d4",
      "e8e7"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, Long Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1995,
    "themes": "advantage endgame long",
    "preMove": "f2e2",
    "preMoveFen": "k3r3/p3q3/1pp5/3pnB2/1P1Q4/1KPP4/P4R2/8 w - - 0 41"
  },
  {
    "id": "009zR",
    "puzzleIndex": 421,
    "title": "Exercise 421: Black to Move",
    "fen": "3Q4/p1p2ppp/4k3/8/5P2/4P3/Prqn2PP/3R1RK1 b - - 0 22",
    "solution": [
      "Nf3+",
      "Kh1",
      "Qxg2#"
    ],
    "solutionUci": [
      "d2f3",
      "g1h1",
      "c2g2"
    ],
    "description": "Black to move. Themes: Discovered Attack, Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1620,
    "themes": "discoveredAttack endgame mate mateIn2 short",
    "preMove": "g5d8",
    "preMoveFen": "3r4/p1p2ppp/4k3/6Q1/5P2/4P3/Prqn2PP/3R1RK1 w - - 3 22"
  },
  {
    "id": "009zS",
    "puzzleIndex": 422,
    "title": "Exercise 422: Black to Move",
    "fen": "r3r1k1/1p3p1p/p1p3p1/8/6bP/Q3b1P1/PP2B3/R3K2R b KQ - 0 20",
    "solution": [
      "Bxe2",
      "Kxe2",
      "Bc5+",
      "Kf3",
      "Bxa3"
    ],
    "solutionUci": [
      "g4e2",
      "e1e2",
      "e3c5",
      "e2f3",
      "c5a3"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Discovered Attack, DiscoveredCheck, ExposedKing, Long Tactic, Middlegame",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 1473,
    "themes": "advantage discoveredAttack discoveredCheck exposedKing long middlegame",
    "preMove": "g2g3",
    "preMoveFen": "r3r1k1/1p3p1p/p1p3p1/8/6bP/Q3b3/PP2B1P1/R3K2R w KQ - 2 20"
  },
  {
    "id": "00A5m",
    "puzzleIndex": 423,
    "title": "Exercise 423: White to Move",
    "fen": "8/1p6/p1p2p2/P3b3/1PK3P1/2PB4/3k4/8 w - - 4 61",
    "solution": [
      "Bf5",
      "Bc7",
      "Bc8",
      "b6",
      "axb6",
      "Bxb6",
      "Bxa6"
    ],
    "solutionUci": [
      "d3f5",
      "e5c7",
      "f5c8",
      "b7b6",
      "a5b6",
      "c7b6",
      "c8a6"
    ],
    "description": "White to move. Themes: Bishop Endgame, Crushing Advantage, Endgame, Quiet Move, Deep Calculation",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1980,
    "themes": "bishopEndgame crushing endgame quietMove veryLong",
    "preMove": "e3d2",
    "preMoveFen": "8/1p6/p1p2p2/P3b3/1PK3P1/2PBk3/8/8 b - - 3 60"
  },
  {
    "id": "00AEM",
    "puzzleIndex": 424,
    "title": "Exercise 424: White to Move",
    "fen": "r2q1rk1/p4p1p/1p3Qp1/2p4P/3p4/5R2/PPP2PP1/4R1K1 w - - 1 23",
    "solution": [
      "Re7",
      "Qxe7",
      "Qxe7"
    ],
    "solutionUci": [
      "e1e7",
      "d8e7",
      "f6e7"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1826,
    "themes": "crushing endgame short",
    "preMove": "d7d8",
    "preMoveFen": "r4rk1/p2q1p1p/1p3Qp1/2p4P/3p4/5R2/PPP2PP1/4R1K1 b - - 0 22"
  },
  {
    "id": "00AFG",
    "puzzleIndex": 425,
    "title": "Exercise 425: White to Move",
    "fen": "r4rk1/5ppp/p3bp2/2q2N1Q/Ppp5/8/1PP2PPP/R2R2K1 w - - 0 22",
    "solution": [
      "Nh6+",
      "gxh6",
      "Qxc5"
    ],
    "solutionUci": [
      "f5h6",
      "g7h6",
      "h5c5"
    ],
    "description": "White to move. Themes: Decisive Advantage, Discovered Attack, Middlegame, Short Tactic",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 1492,
    "themes": "advantage discoveredAttack middlegame short",
    "preMove": "c7c5",
    "preMoveFen": "r4rk1/2q2ppp/p3bp2/2P2N1Q/Ppp5/8/1PP2PPP/R2R2K1 b - - 6 21"
  },
  {
    "id": "00AVR",
    "puzzleIndex": 426,
    "title": "Exercise 426: White to Move",
    "fen": "br1qkb1r/p1p2ppp/4pn2/6B1/3Qn3/5NP1/P3PPBP/RN1R2K1 w k - 0 16",
    "solution": [
      "Qa4+",
      "Qd7",
      "Rxd7"
    ],
    "solutionUci": [
      "d4a4",
      "d8d7",
      "d1d7"
    ],
    "description": "White to move. Themes: Crushing Advantage, Opening, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1761,
    "themes": "crushing opening short",
    "preMove": "d7e6",
    "preMoveFen": "br1qkb1r/p1pp1ppp/4Pn2/6B1/3Qn3/5NP1/P3PPBP/RN1R2K1 b k - 0 15"
  },
  {
    "id": "00AcQ",
    "puzzleIndex": 427,
    "title": "Exercise 427: Black to Move",
    "fen": "8/1bpp2k1/1p5r/1P2P3/3P1P2/2P1n1K1/Q5P1/8 b - - 1 30",
    "solution": [
      "Rg6+",
      "Kf2",
      "Rxg2+"
    ],
    "solutionUci": [
      "h6g6",
      "g3f2",
      "g6g2"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1751,
    "themes": "crushing endgame short",
    "preMove": "c2a2",
    "preMoveFen": "8/1bpp2k1/1p5r/1P2P3/3P1P2/2P1n1K1/2Q3P1/8 w - - 0 30"
  },
  {
    "id": "00Al5",
    "puzzleIndex": 428,
    "title": "Exercise 428: Black to Move",
    "fen": "2r3k1/p2B1pbp/1p2pnp1/n2p4/3P4/1Pr1P2P/P1QB1PP1/2R2RK1 b - - 0 19",
    "solution": [
      "Rxc2",
      "Bxc8",
      "Rxd2"
    ],
    "solutionUci": [
      "c3c2",
      "d7c8",
      "c2d2"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1525,
    "themes": "advantage middlegame short",
    "preMove": "b5d7",
    "preMoveFen": "2r3k1/p2q1pbp/1p2pnp1/nB1p4/3P4/1Pr1P2P/P1QB1PP1/2R2RK1 w - - 0 19"
  },
  {
    "id": "00Ar2",
    "puzzleIndex": 429,
    "title": "Exercise 429: Black to Move",
    "fen": "r2q1r2/1n4pk/p6p/1ppN1pb1/3n1B2/P2PN2P/1PPQ1PP1/R3R1K1 b - - 1 21",
    "solution": [
      "Bxf4",
      "Nxf4",
      "Qg5",
      "Qd1",
      "Qxf4"
    ],
    "solutionUci": [
      "g5f4",
      "d5f4",
      "d8g5",
      "d2d1",
      "g5f4"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Clearance Sacrifice, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1752,
    "themes": "advantage clearance long middlegame",
    "preMove": "c3d5",
    "preMoveFen": "r2q1r2/1n4pk/p6p/1pp2pb1/3n1B2/P1NPN2P/1PPQ1PP1/R3R1K1 w - - 0 21"
  },
  {
    "id": "00AuR",
    "puzzleIndex": 430,
    "title": "Exercise 430: White to Move",
    "fen": "8/4bkp1/R6P/4p3/Pp2P3/1P2r3/6P1/6K1 w - - 0 34",
    "solution": [
      "h7",
      "Re1+",
      "Kh2"
    ],
    "solutionUci": [
      "h6h7",
      "e3e1",
      "g1h2"
    ],
    "description": "White to move. Themes: AdvancedPawn, Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1675,
    "themes": "advancedPawn crushing endgame short",
    "preMove": "d3e3",
    "preMoveFen": "8/4bkp1/R6P/4p3/Pp2P3/1P1rB3/6P1/6K1 b - - 0 33"
  },
  {
    "id": "00B3B",
    "puzzleIndex": 431,
    "title": "Exercise 431: Black to Move",
    "fen": "2KQ4/8/5b2/p1B5/P7/3k4/6p1/8 b - - 0 77",
    "solution": [
      "Bxd8",
      "Kxd8",
      "Kc4"
    ],
    "solutionUci": [
      "f6d8",
      "c8d8",
      "d3c4"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1446,
    "themes": "crushing endgame short",
    "preMove": "d7d8q",
    "preMoveFen": "2K5/3P4/5b2/p1B5/P7/3k4/6p1/8 w - - 7 77"
  },
  {
    "id": "00B7G",
    "puzzleIndex": 432,
    "title": "Exercise 432: Black to Move",
    "fen": "1rb2r1k/4q2p/p2p4/3B1p2/1pPb4/1P2NQ2/P5PP/2R2R1K b - - 2 24",
    "solution": [
      "Qxe3",
      "Qxe3",
      "Bxe3"
    ],
    "solutionUci": [
      "e7e3",
      "f3e3",
      "d4e3"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Master, MasterVsMaster, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1666,
    "themes": "crushing master masterVsMaster middlegame short",
    "preMove": "g1h1",
    "preMoveFen": "1rb2r1k/4q2p/p2p4/3B1p2/1pPb4/1P2NQ2/P5PP/2R2RK1 w - - 1 24"
  },
  {
    "id": "00BM8",
    "puzzleIndex": 433,
    "title": "Exercise 433: White to Move",
    "fen": "3r1rk1/pp2bppp/2ppnn2/8/N1P1P3/q1P4P/P2N2PB/R2Q1R1K w - - 1 17",
    "solution": [
      "Nb1",
      "Qxa4",
      "Qxa4"
    ],
    "solutionUci": [
      "d2b1",
      "a3a4",
      "d1a4"
    ],
    "description": "White to move. Themes: Decisive Advantage, Master, Middlegame, Short Tactic, Trapped Piece",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1583,
    "themes": "advantage master middlegame short trappedPiece",
    "preMove": "a8d8",
    "preMoveFen": "r4rk1/pp2bppp/2ppnn2/8/N1P1P3/q1P4P/P2N2PB/R2Q1R1K b - - 0 16"
  },
  {
    "id": "00Bg0",
    "puzzleIndex": 434,
    "title": "Exercise 434: Black to Move",
    "fen": "8/3k4/3P1K2/p4R2/5r2/5P2/8/8 b - - 2 57",
    "solution": [
      "Rxf5+",
      "Kxf5",
      "a4",
      "Ke4",
      "a3",
      "Kd3",
      "a2"
    ],
    "solutionUci": [
      "f4f5",
      "f6f5",
      "a5a4",
      "f5e4",
      "a4a3",
      "e4d3",
      "a3a2"
    ],
    "description": "Black to move. Themes: AdvancedPawn, Crushing Advantage, Endgame, Quiet Move, Rook Endgame, Deep Calculation",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1653,
    "themes": "advancedPawn crushing endgame quietMove rookEndgame veryLong",
    "preMove": "d5f5",
    "preMoveFen": "8/3k4/3P1K2/p2R4/5r2/5P2/8/8 w - - 1 57"
  },
  {
    "id": "00C8e",
    "puzzleIndex": 435,
    "title": "Exercise 435: White to Move",
    "fen": "8/5p1k/5Ppb/2p3P1/qp6/8/KB5Q/8 w - - 5 59",
    "solution": [
      "Kb1",
      "Qd1+",
      "Bc1"
    ],
    "solutionUci": [
      "a2b1",
      "a4d1",
      "b2c1"
    ],
    "description": "White to move. Themes: Endgame, Equality, Pin, Short Tactic",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 1559,
    "themes": "endgame equality pin short",
    "preMove": "d1a4",
    "preMoveFen": "8/5p1k/5Ppb/2p3P1/1p6/8/KB5Q/3q4 b - - 4 58"
  },
  {
    "id": "00CBU",
    "puzzleIndex": 436,
    "title": "Exercise 436: White to Move",
    "fen": "8/2pR3p/pb4pk/8/5p1P/B6K/P1r5/6r1 w - - 4 40",
    "solution": [
      "Bf8+",
      "Kh5",
      "Rxh7#"
    ],
    "solutionUci": [
      "a3f8",
      "h6h5",
      "d7h7"
    ],
    "description": "White to move. Themes: Deflection, Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1836,
    "themes": "deflection endgame mate mateIn2 short",
    "preMove": "g7h6",
    "preMoveFen": "8/2pR2kp/pb4p1/8/5p1P/B6K/P1r5/6r1 b - - 3 39"
  },
  {
    "id": "00CMj",
    "puzzleIndex": 437,
    "title": "Exercise 437: Black to Move",
    "fen": "7R/8/8/6p1/2p1p1k1/2Pb3p/P4K2/8 b - - 5 71",
    "solution": [
      "e3+",
      "Kxe3",
      "Kg3"
    ],
    "solutionUci": [
      "e4e3",
      "f2e3",
      "g4g3"
    ],
    "description": "Black to move. Themes: Crushing Advantage, DefensiveMove, Endgame, Master, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1588,
    "themes": "crushing defensiveMove endgame master short",
    "preMove": "e3f2",
    "preMoveFen": "7R/8/8/6p1/2p1p1k1/2PbK2p/P7/8 w - - 4 71"
  },
  {
    "id": "00CWE",
    "puzzleIndex": 438,
    "title": "Exercise 438: White to Move",
    "fen": "3r4/1p4p1/2pB1bBp/p1Pk4/3rp3/P7/1PK2P2/4R3 w - - 2 32",
    "solution": [
      "Bf7#"
    ],
    "solutionUci": [
      "g6f7"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1470,
    "themes": "endgame mate mateIn1 oneMove",
    "preMove": "e6d5",
    "preMoveFen": "3r4/1p4p1/2pBkbBp/p1P5/3rp3/P7/1PK2P2/4R3 b - - 1 31"
  },
  {
    "id": "00CXr",
    "puzzleIndex": 439,
    "title": "Exercise 439: White to Move",
    "fen": "r2k2nr/p3qBb1/1p1p3p/Q5p1/3n1B2/2N2R2/PPP3P1/R5K1 w - - 0 19",
    "solution": [
      "Qd5",
      "Nxf3+",
      "gxf3",
      "Rc8",
      "Bxd6"
    ],
    "solutionUci": [
      "a5d5",
      "d4f3",
      "g2f3",
      "a8c8",
      "f4d6"
    ],
    "description": "White to move. Themes: Decisive Advantage, Long Tactic, Middlegame, Tactical Sacrifice",
    "hint": "Look for a tactical sacrifice that decisively alters the position!",
    "rating": 1960,
    "themes": "advantage long middlegame sacrifice",
    "preMove": "b7b6",
    "preMoveFen": "r2k2nr/pp2qBb1/3p3p/Q5p1/3n1B2/2N2R2/PPP3P1/R5K1 b - - 1 18"
  },
  {
    "id": "00CcK",
    "puzzleIndex": 440,
    "title": "Exercise 440: Black to Move",
    "fen": "8/8/3p4/4kp2/1pP3pP/2RK2P1/8/8 b - - 0 42",
    "solution": [
      "bxc3",
      "Kxc3",
      "f4",
      "Kd3",
      "fxg3"
    ],
    "solutionUci": [
      "b4c3",
      "d3c3",
      "f5f4",
      "c3d3",
      "f4g3"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Long Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1691,
    "themes": "crushing endgame long",
    "preMove": "b3c3",
    "preMoveFen": "8/8/3p4/4kp2/1pP3pP/1RbK2P1/8/8 w - - 2 42"
  },
  {
    "id": "00Cqg",
    "puzzleIndex": 441,
    "title": "Exercise 441: White to Move",
    "fen": "3r2k1/pp4bp/4qpp1/3Pp3/8/4Q2P/4B1P1/2rR3K w - - 0 27",
    "solution": [
      "dxe6",
      "Rdxd1+",
      "Bxd1",
      "Rxd1+",
      "Kh2"
    ],
    "solutionUci": [
      "d5e6",
      "d8d1",
      "e2d1",
      "c1d1",
      "h1h2"
    ],
    "description": "White to move. Themes: Decisive Advantage, DefensiveMove, Hanging Piece, Long Tactic, Middlegame",
    "hint": "Look for undefended or hanging material!",
    "rating": 1634,
    "themes": "advantage defensiveMove hangingPiece long middlegame",
    "preMove": "c8c1",
    "preMoveFen": "2rr2k1/pp4bp/4qpp1/3Pp3/8/4Q2P/4B1P1/2RR3K b - - 0 26"
  },
  {
    "id": "00Cs4",
    "puzzleIndex": 442,
    "title": "Exercise 442: Black to Move",
    "fen": "2r1q1k1/8/b2b1r1p/Pp1pNpp1/P2Pn3/1RPQ3P/2B1NPP1/4R1K1 b - - 0 28",
    "solution": [
      "bxa4",
      "Qxa6",
      "axb3"
    ],
    "solutionUci": [
      "b5a4",
      "d3a6",
      "a4b3"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1401,
    "themes": "advantage middlegame short",
    "preMove": "a2a4",
    "preMoveFen": "2r1q1k1/8/b2b1r1p/Pp1pNpp1/3Pn3/1RPQ3P/P1B1NPP1/4R1K1 w - - 3 28"
  },
  {
    "id": "00CtD",
    "puzzleIndex": 443,
    "title": "Exercise 443: White to Move",
    "fen": "r5k1/3q1p2/p1Np2N1/1p4P1/2r5/1Q5P/Pb6/5R1K w - - 1 29",
    "solution": [
      "Nce7+",
      "Qxe7",
      "Nxe7+"
    ],
    "solutionUci": [
      "c6e7",
      "d7e7",
      "g6e7"
    ],
    "description": "White to move. Themes: Crushing Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1511,
    "themes": "crushing middlegame short",
    "preMove": "e4c4",
    "preMoveFen": "r5k1/3q1p2/p1Np2N1/1p4P1/4r3/1Q5P/Pb6/5R1K b - - 0 28"
  },
  {
    "id": "00Cwz",
    "puzzleIndex": 444,
    "title": "Exercise 444: Black to Move",
    "fen": "1r5r/5pk1/4p3/3p2PP/N1nP4/n1P5/P3B3/K1R4R b - - 0 34",
    "solution": [
      "Rb1+",
      "Rxb1",
      "Nc2#"
    ],
    "solutionUci": [
      "b8b1",
      "c1b1",
      "a3c2"
    ],
    "description": "Black to move. Themes: Checkmate, Mate in 2, Middlegame, Tactical Sacrifice, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1461,
    "themes": "mate mateIn2 middlegame sacrifice short",
    "preMove": "c5a4",
    "preMoveFen": "1r5r/5pk1/4p3/2Np2PP/p1nP4/n1P5/P3B3/K1R4R w - - 2 34"
  },
  {
    "id": "00D77",
    "puzzleIndex": 445,
    "title": "Exercise 445: White to Move",
    "fen": "5rk1/bpp3pp/p1npb3/4p3/1P2Nr2/P1PP3q/1B1QBPR1/2K3R1 w - - 0 22",
    "solution": [
      "Rxg7+",
      "Kh8",
      "Ng5"
    ],
    "solutionUci": [
      "g2g7",
      "g8h8",
      "e4g5"
    ],
    "description": "White to move. Themes: Crushing Advantage, KingsideAttack, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1798,
    "themes": "crushing kingsideAttack middlegame short",
    "preMove": "h4h3",
    "preMoveFen": "5rk1/bpp3pp/p1npb3/4p3/1P2Nr1q/P1PP3P/1B1QBPR1/2K3R1 b - - 2 21"
  },
  {
    "id": "00DII",
    "puzzleIndex": 446,
    "title": "Exercise 446: White to Move",
    "fen": "2rr2k1/p5p1/1p5p/2pq1p1P/8/P4QR1/5PP1/4R1K1 w - - 0 32",
    "solution": [
      "Re8+",
      "Kf7",
      "Qxd5+",
      "Rxd5",
      "Rxc8"
    ],
    "solutionUci": [
      "e1e8",
      "g8f7",
      "f3d5",
      "d8d5",
      "e8c8"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Zwischenzug, Long Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1692,
    "themes": "advantage endgame intermezzo long",
    "preMove": "c4d5",
    "preMoveFen": "2rr2k1/p5p1/1p5p/2pP1p1P/2q5/P4QR1/5PP1/4R1K1 b - - 3 31"
  },
  {
    "id": "00DUp",
    "puzzleIndex": 447,
    "title": "Exercise 447: Black to Move",
    "fen": "8/8/1p2k1p1/4P2p/P2K1p1P/5P2/8/8 b - - 0 66",
    "solution": [
      "g5",
      "Ke4",
      "gxh4"
    ],
    "solutionUci": [
      "g6g5",
      "d4e4",
      "g5h4"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Pawn Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1676,
    "themes": "crushing endgame pawnEndgame short",
    "preMove": "e4e5",
    "preMoveFen": "8/8/1p2k1p1/7p/P2KPp1P/5P2/8/8 w - - 8 66"
  },
  {
    "id": "00DcC",
    "puzzleIndex": 448,
    "title": "Exercise 448: White to Move",
    "fen": "5k2/6p1/p1b3Pp/2N2P1r/p7/8/1KP5/5R2 w - - 0 37",
    "solution": [
      "Ne6+",
      "Ke7",
      "Nxg7"
    ],
    "solutionUci": [
      "c5e6",
      "f8e7",
      "e6g7"
    ],
    "description": "White to move. Themes: Crushing Advantage, Deflection, Endgame, Master, Short Tactic",
    "hint": "Deflect the key defender away from its crucial post!",
    "rating": 1400,
    "themes": "crushing deflection endgame master short",
    "preMove": "h7h6",
    "preMoveFen": "5k2/6pp/p1b3P1/2N2P1r/p7/8/1KP5/5R2 b - - 0 36"
  },
  {
    "id": "00DdW",
    "puzzleIndex": 449,
    "title": "Exercise 449: White to Move",
    "fen": "5rk1/5ppp/4b3/1p1pPpPP/2pP4/b1P5/rqNQKP2/2RRN3 w - - 6 24",
    "solution": [
      "Rb1",
      "Qb3",
      "Rxb3"
    ],
    "solutionUci": [
      "c1b1",
      "b2b3",
      "b1b3"
    ],
    "description": "White to move. Themes: Decisive Advantage, Middlegame, Short Tactic, Trapped Piece",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1693,
    "themes": "advantage middlegame short trappedPiece",
    "preMove": "e7a3",
    "preMoveFen": "5rk1/4bppp/4b3/1p1pPpPP/2pP4/2P5/rqNQKP2/2RRN3 b - - 5 23"
  },
  {
    "id": "00DkJ",
    "puzzleIndex": 450,
    "title": "Exercise 450: White to Move",
    "fen": "3r1bnr/2p2ppp/2bk4/R7/5P2/2N5/4N1PP/1R4K1 w - - 4 22",
    "solution": [
      "Rd1+",
      "Ke7",
      "Re5+",
      "Kf6",
      "Rxd8"
    ],
    "solutionUci": [
      "b1d1",
      "d6e7",
      "a5e5",
      "e7f6",
      "d1d8"
    ],
    "description": "White to move. Themes: Crushing Advantage, Deflection, ExposedKing, Long Tactic, Middlegame",
    "hint": "Deflect the key defender away from its crucial post!",
    "rating": 1552,
    "themes": "crushing deflection exposedKing long middlegame",
    "preMove": "c5d6",
    "preMoveFen": "3r1bnr/2p2ppp/2b5/R1k5/5P2/2N5/4N1PP/1R4K1 b - - 3 21"
  },
  {
    "id": "00Dke",
    "puzzleIndex": 451,
    "title": "Exercise 451: White to Move",
    "fen": "5bk1/2Q2p1p/5qp1/p7/P1Bp4/1P5P/2r2PP1/3R2K1 w - - 6 28",
    "solution": [
      "Bxf7+",
      "Kg7",
      "Qxc2"
    ],
    "solutionUci": [
      "c4f7",
      "g8g7",
      "c7c2"
    ],
    "description": "White to move. Themes: Crushing Advantage, Discovered Attack, Endgame, Master, Short Tactic",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 1498,
    "themes": "crushing discoveredAttack endgame master short",
    "preMove": "c3c2",
    "preMoveFen": "5bk1/2Q2p1p/5qp1/p7/P1Bp4/1Pr4P/5PP1/3R2K1 b - - 5 27"
  },
  {
    "id": "00EDN",
    "puzzleIndex": 452,
    "title": "Exercise 452: Black to Move",
    "fen": "rnbq1rk1/p4ppp/1p2p3/2p5/2QPn3/B1P1PN2/P3BPPP/R4RK1 b - - 1 11",
    "solution": [
      "Ba6",
      "Qxa6",
      "Nxa6"
    ],
    "solutionUci": [
      "c8a6",
      "c4a6",
      "b8a6"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1537,
    "themes": "advantage middlegame short",
    "preMove": "c1a3",
    "preMoveFen": "rnbq1rk1/p4ppp/1p2p3/2p5/2QPn3/2P1PN2/P3BPPP/R1B2RK1 w - - 0 11"
  },
  {
    "id": "00EEp",
    "puzzleIndex": 453,
    "title": "Exercise 453: White to Move",
    "fen": "3k2q1/p2p3p/1p1P4/2p5/2P2Q1K/8/P5b1/5R2 w - - 3 37",
    "solution": [
      "Qf8+",
      "Qxf8",
      "Rxf8#"
    ],
    "solutionUci": [
      "f4f8",
      "g8f8",
      "f1f8"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1665,
    "themes": "endgame mate mateIn2 short",
    "preMove": "b7g2",
    "preMoveFen": "3k2q1/pb1p3p/1p1P4/2p5/2P2Q1K/8/P7/5R2 b - - 2 36"
  },
  {
    "id": "00EXS",
    "puzzleIndex": 454,
    "title": "Exercise 454: Black to Move",
    "fen": "r3r1k1/p2Q1p1p/1p2p1p1/8/1P1P4/P3P3/1B2Nb1q/2KR3R b - - 1 19",
    "solution": [
      "Bxe3+",
      "Kb1",
      "Qxe2"
    ],
    "solutionUci": [
      "f2e3",
      "c1b1",
      "h2e2"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Discovered Attack, Middlegame, Short Tactic",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 1548,
    "themes": "advantage discoveredAttack middlegame short",
    "preMove": "f1h1",
    "preMoveFen": "r3r1k1/p2Q1p1p/1p2p1p1/8/1P1P4/P3P3/1B2Nb1q/2KR1R2 w - - 0 19"
  },
  {
    "id": "00EgR",
    "puzzleIndex": 455,
    "title": "Exercise 455: Black to Move",
    "fen": "N2k3r/1b1n1Bpp/p3P3/1pb5/6P1/4p3/PPP4P/1K1R3R b - - 0 20",
    "solution": [
      "Bxh1",
      "Rxd7+",
      "Kc8",
      "Rc7+",
      "Kb8"
    ],
    "solutionUci": [
      "b7h1",
      "d1d7",
      "d8c8",
      "d7c7",
      "c8b8"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1788,
    "themes": "advantage long middlegame",
    "preMove": "e5e6",
    "preMoveFen": "N2k3r/1b1n1Bpp/p7/1pb1P3/6P1/4p3/PPP4P/1K1R3R w - - 1 20"
  },
  {
    "id": "00Erm",
    "puzzleIndex": 456,
    "title": "Exercise 456: White to Move",
    "fen": "3r4/6k1/1p1pr1p1/p1p2p2/P1P1p1P1/1P1n4/3R1PBP/4R1K1 w - - 1 30",
    "solution": [
      "Rxd3",
      "exd3",
      "Rxe6",
      "d2",
      "Bf3"
    ],
    "solutionUci": [
      "d2d3",
      "e4d3",
      "e1e6",
      "d3d2",
      "g2f3"
    ],
    "description": "White to move. Themes: Crushing Advantage, DefensiveMove, Endgame, Long Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1402,
    "themes": "crushing defensiveMove endgame long",
    "preMove": "b4d3",
    "preMoveFen": "3r4/6k1/1p1pr1p1/p1p2p2/PnP1p1P1/1P6/3R1PBP/4R1K1 b - - 0 29"
  },
  {
    "id": "00Ezc",
    "puzzleIndex": 457,
    "title": "Exercise 457: White to Move",
    "fen": "rnb1k2r/ppp2q1p/3b2p1/3P1pBQ/4p2N/2N5/PPP2PPP/R3R1K1 w kq - 2 14",
    "solution": [
      "Nxe4",
      "fxe4",
      "Rxe4+"
    ],
    "solutionUci": [
      "c3e4",
      "f5e4",
      "e1e4"
    ],
    "description": "White to move. Themes: Crushing Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1954,
    "themes": "crushing middlegame short",
    "preMove": "f6f7",
    "preMoveFen": "rnb1k2r/ppp4p/3b1qp1/3P1pBQ/4p2N/2N5/PPP2PPP/R3R1K1 b kq - 1 13"
  },
  {
    "id": "00F5G",
    "puzzleIndex": 458,
    "title": "Exercise 458: White to Move",
    "fen": "2rqrbk1/pp3ppp/8/3p1N2/3NnnQ1/2P4P/PP3PP1/R4RK1 w - - 0 23",
    "solution": [
      "Nh6+",
      "Kh8",
      "Nxf7+"
    ],
    "solutionUci": [
      "f5h6",
      "g8h8",
      "h6f7"
    ],
    "description": "White to move. Themes: Crushing Advantage, Deflection, KingsideAttack, Middlegame, Pin, Short Tactic",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 1520,
    "themes": "crushing deflection kingsideAttack middlegame pin short",
    "preMove": "e6f4",
    "preMoveFen": "2rqrbk1/pp3ppp/4n3/3p1N2/3NnBQ1/2P4P/PP3PP1/R4RK1 b - - 14 22"
  },
  {
    "id": "00F5e",
    "puzzleIndex": 459,
    "title": "Exercise 459: White to Move",
    "fen": "4k2r/1p1qb1p1/p3Rp2/2p4p/8/1Q4B1/PP3PpP/6K1 w k - 2 23",
    "solution": [
      "Bd6",
      "Qxd6",
      "Rxd6"
    ],
    "solutionUci": [
      "g3d6",
      "d7d6",
      "e6d6"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1697,
    "themes": "advantage endgame short",
    "preMove": "c6d7",
    "preMoveFen": "4k2r/1p2b1p1/p1q1Rp2/2p4p/8/1Q4B1/PP3PpP/6K1 b k - 1 22"
  },
  {
    "id": "00FAe",
    "puzzleIndex": 460,
    "title": "Exercise 460: Black to Move",
    "fen": "5Rbk/6pp/8/p3P3/Pp1pq3/1Q6/1P4PP/6K1 b - - 2 35",
    "solution": [
      "Qe1+",
      "Rf1",
      "Qxf1+",
      "Kxf1",
      "Bxb3"
    ],
    "solutionUci": [
      "e4e1",
      "f8f1",
      "e1f1",
      "g1f1",
      "g8b3"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Long Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1646,
    "themes": "crushing endgame long",
    "preMove": "d1b3",
    "preMoveFen": "5Rbk/6pp/8/p3P3/Pp1pq3/8/1P4PP/3Q2K1 w - - 1 35"
  },
  {
    "id": "00FF5",
    "puzzleIndex": 461,
    "title": "Exercise 461: White to Move",
    "fen": "r3k3/ppp2p2/1b1p3p/4p2r/2B1P1bq/P1PP1P2/1P4PQ/RN3R1K w q - 3 19",
    "solution": [
      "Bxf7+",
      "Ke7",
      "Bxh5"
    ],
    "solutionUci": [
      "c4f7",
      "e8e7",
      "f7h5"
    ],
    "description": "White to move. Themes: AttackingF2F7, Crushing Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1919,
    "themes": "attackingF2F7 crushing middlegame short",
    "preMove": "e7h4",
    "preMoveFen": "r3k3/ppp1qp2/1b1p3p/4p2r/2B1P1b1/P1PP1P2/1P4PQ/RN3R1K b q - 2 18"
  },
  {
    "id": "00FND",
    "puzzleIndex": 462,
    "title": "Exercise 462: Black to Move",
    "fen": "8/1P6/8/7p/3P4/3k1p1P/4p3/4K3 b - - 1 49",
    "solution": [
      "Ke3",
      "h4",
      "f2#"
    ],
    "solutionUci": [
      "d3e3",
      "h3h4",
      "f3f2"
    ],
    "description": "Black to move. Themes: AdvancedPawn, Endgame, Checkmate, Mate in 2, Pawn Endgame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1789,
    "themes": "advancedPawn endgame mate mateIn2 pawnEndgame short",
    "preMove": "d1e1",
    "preMoveFen": "8/1P6/8/7p/3P4/3k1p1P/4p3/3K4 w - - 0 49"
  },
  {
    "id": "00FPo",
    "puzzleIndex": 463,
    "title": "Exercise 463: White to Move",
    "fen": "7R/1K3p2/6k1/PP6/6p1/6rp/8/8 w - - 0 48",
    "solution": [
      "a6",
      "h2",
      "Rxh2"
    ],
    "solutionUci": [
      "a5a6",
      "h3h2",
      "h8h2"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Rook Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1775,
    "themes": "crushing endgame rookEndgame short",
    "preMove": "g5g4",
    "preMoveFen": "7R/1K3p2/6k1/PP4p1/8/6rp/8/8 b - - 2 47"
  },
  {
    "id": "00FVO",
    "puzzleIndex": 464,
    "title": "Exercise 464: White to Move",
    "fen": "r3r3/3k1p2/3p3p/1p1P4/1P1b4/2pKP3/6PP/R4R2 w - - 0 30",
    "solution": [
      "Rxf7+",
      "Re7",
      "Rxe7+",
      "Kxe7",
      "Rxa8"
    ],
    "solutionUci": [
      "f1f7",
      "e8e7",
      "f7e7",
      "d7e7",
      "a1a8"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Long Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1460,
    "themes": "crushing endgame long",
    "preMove": "g7d4",
    "preMoveFen": "r3r3/3k1pb1/3p3p/1p1P4/1P1N4/2pKP3/6PP/R4R2 b - - 4 29"
  },
  {
    "id": "00G1l",
    "puzzleIndex": 465,
    "title": "Exercise 465: White to Move",
    "fen": "5k2/1R6/3pp1P1/2p5/1p2PK2/5P2/8/2r5 w - - 1 61",
    "solution": [
      "Kg5",
      "Rg1+",
      "Kf6"
    ],
    "solutionUci": [
      "f4g5",
      "c1g1",
      "g5f6"
    ],
    "description": "White to move. Themes: Crushing Advantage, DefensiveMove, Endgame, Master, Rook Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1841,
    "themes": "crushing defensiveMove endgame master rookEndgame short",
    "preMove": "c4c1",
    "preMoveFen": "5k2/1R6/3pp1P1/2p5/1pr1PK2/5P2/8/8 b - - 0 60"
  },
  {
    "id": "00GBV",
    "puzzleIndex": 466,
    "title": "Exercise 466: White to Move",
    "fen": "3r1rk1/pp2n1pp/3q4/8/N7/1PB5/P3QPPP/4R1K1 w - - 2 26",
    "solution": [
      "Qxe7",
      "Qxe7",
      "Rxe7"
    ],
    "solutionUci": [
      "e2e7",
      "d6e7",
      "e1e7"
    ],
    "description": "White to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1453,
    "themes": "advantage middlegame short",
    "preMove": "b4d6",
    "preMoveFen": "3r1rk1/pp2n1pp/8/8/Nq6/1PB5/P3QPPP/4R1K1 b - - 1 25"
  },
  {
    "id": "00GVf",
    "puzzleIndex": 467,
    "title": "Exercise 467: White to Move",
    "fen": "5k2/3b2q1/pn4p1/1rp2p2/8/8/1P2Q1P1/1K2R2R w - - 4 33",
    "solution": [
      "Rh8+",
      "Qxh8",
      "Qe7+",
      "Kg8",
      "Qd8+"
    ],
    "solutionUci": [
      "h1h8",
      "g7h8",
      "e2e7",
      "f8g8",
      "e7d8"
    ],
    "description": "White to move. Themes: Crushing Advantage, ExposedKing, Long Tactic, Middlegame, Tactical Sacrifice",
    "hint": "Look for a tactical sacrifice that decisively alters the position!",
    "rating": 1497,
    "themes": "crushing exposedKing long middlegame sacrifice",
    "preMove": "c8d7",
    "preMoveFen": "2b2k2/6q1/pn4p1/1rp2p2/8/8/1P2Q1P1/1K2R2R b - - 3 32"
  },
  {
    "id": "00Gc5",
    "puzzleIndex": 468,
    "title": "Exercise 468: Black to Move",
    "fen": "8/p1r2p2/4r3/2P1PK2/1P4R1/3R2pk/8/8 b - - 3 46",
    "solution": [
      "Rxe5+",
      "Kxe5",
      "Kxg4"
    ],
    "solutionUci": [
      "e6e5",
      "f5e5",
      "h3g4"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Deflection, Endgame, Rook Endgame, Short Tactic",
    "hint": "Deflect the key defender away from its crucial post!",
    "rating": 1600,
    "themes": "advantage deflection endgame rookEndgame short",
    "preMove": "d4g4",
    "preMoveFen": "8/p1r2p2/4r3/2P1PK2/1P1R4/3R2pk/8/8 w - - 2 46"
  },
  {
    "id": "00GiQ",
    "puzzleIndex": 469,
    "title": "Exercise 469: White to Move",
    "fen": "5r2/5p1k/6pp/ppqp1P2/7Q/5N2/6PP/5N1K w - - 0 32",
    "solution": [
      "Ng5+",
      "Kg7",
      "f6+",
      "Kxf6",
      "Ne4+"
    ],
    "solutionUci": [
      "f3g5",
      "h7g7",
      "f5f6",
      "g7f6",
      "g5e4"
    ],
    "description": "White to move. Themes: Attraction Sacrifice, Crushing Advantage, DiscoveredCheck, Double Check, Endgame, Long Tactic, Pin",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 1838,
    "themes": "attraction crushing discoveredCheck doubleCheck endgame long pin",
    "preMove": "b7b5",
    "preMoveFen": "5r2/1p3p1k/6pp/p1qp1P2/7Q/5N2/6PP/5N1K b - - 4 31"
  },
  {
    "id": "00H87",
    "puzzleIndex": 470,
    "title": "Exercise 470: White to Move",
    "fen": "6k1/4pp2/p5pB/2p4n/3pP1Q1/P2P2qP/1r4P1/5RK1 w - - 2 31",
    "solution": [
      "Qc8+",
      "Kh7",
      "Rxf7+",
      "Ng7",
      "Rxg7+",
      "Kxh6",
      "Qh8+",
      "Kg5",
      "Rxg6+",
      "Kxg6",
      "Qg8+",
      "Kf6",
      "Qxg3"
    ],
    "solutionUci": [
      "g4c8",
      "g8h7",
      "f1f7",
      "h5g7",
      "f7g7",
      "h7h6",
      "c8h8",
      "h6g5",
      "g7g6",
      "g5g6",
      "h8g8",
      "g6f6",
      "g8g3"
    ],
    "description": "White to move. Themes: Attraction Sacrifice, Crushing Advantage, Deflection, Endgame, Tactical Sacrifice, Skewer, Deep Calculation",
    "hint": "Look for a tactical sacrifice that decisively alters the position!",
    "rating": 1887,
    "themes": "attraction crushing deflection endgame sacrifice skewer veryLong",
    "preMove": "c7g3",
    "preMoveFen": "6k1/2q1pp2/p5pB/2p4n/3pP1Q1/P2P3P/1r4P1/5RK1 b - - 1 30"
  },
  {
    "id": "00HGG",
    "puzzleIndex": 471,
    "title": "Exercise 471: Black to Move",
    "fen": "8/pp6/2p1kpp1/3p2P1/3P1P1p/1P3K2/P1P4P/8 b - - 0 31",
    "solution": [
      "fxg5",
      "Kg4",
      "gxf4",
      "Kxf4",
      "Kf6"
    ],
    "solutionUci": [
      "f6g5",
      "f3g4",
      "g5f4",
      "g4f4",
      "e6f6"
    ],
    "description": "Black to move. Themes: Crushing Advantage, DefensiveMove, Endgame, Long Tactic, Pawn Endgame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1682,
    "themes": "crushing defensiveMove endgame long pawnEndgame",
    "preMove": "g4g5",
    "preMoveFen": "8/pp6/2p1kpp1/3p4/3P1PPp/1P3K2/P1P4P/8 w - - 0 31"
  },
  {
    "id": "00HoG",
    "puzzleIndex": 472,
    "title": "Exercise 472: White to Move",
    "fen": "5r1k/8/2b2rQp/1p1p2p1/1q4P1/8/8/1B3R1K w - - 0 37",
    "solution": [
      "Qh7#"
    ],
    "solutionUci": [
      "g6h7"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1423,
    "themes": "mate mateIn1 middlegame oneMove",
    "preMove": "f7f6",
    "preMoveFen": "5r1k/5r2/2b2RQp/1p1p2p1/1q4P1/8/8/1B3R1K b - - 0 36"
  },
  {
    "id": "00Hpe",
    "puzzleIndex": 473,
    "title": "Exercise 473: White to Move",
    "fen": "1rr3k1/4Qppp/q3p3/p2pn3/3N4/4P2P/5PP1/RR4K1 w - - 0 30",
    "solution": [
      "Rxb8",
      "Rxb8",
      "Qc7",
      "Rc8",
      "Qxe5"
    ],
    "solutionUci": [
      "b1b8",
      "c8b8",
      "e7c7",
      "b8c8",
      "c7e5"
    ],
    "description": "White to move. Themes: Decisive Advantage, Fork, Long Tactic, Middlegame",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1768,
    "themes": "advantage fork long middlegame",
    "preMove": "b6a5",
    "preMoveFen": "1rr3k1/4Qppp/qp2p3/P2pn3/3N4/4P2P/5PP1/RR4K1 b - - 3 29"
  },
  {
    "id": "00HqY",
    "puzzleIndex": 474,
    "title": "Exercise 474: White to Move",
    "fen": "8/6p1/8/8/4P2k/5KpP/8/8 w - - 4 47",
    "solution": [
      "Kg2",
      "Kg5",
      "Kxg3"
    ],
    "solutionUci": [
      "f3g2",
      "h4g5",
      "g2g3"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Master, Pawn Endgame, Short Tactic, Zugzwang",
    "hint": "Place the opponent in zugzwang where any move loses!",
    "rating": 1775,
    "themes": "crushing endgame master pawnEndgame short zugzwang",
    "preMove": "g5h4",
    "preMoveFen": "8/6p1/8/6k1/4P3/5KpP/8/8 b - - 3 46"
  },
  {
    "id": "00Huv",
    "puzzleIndex": 475,
    "title": "Exercise 475: White to Move",
    "fen": "3r1q2/5prk/p3pQpp/1p2P3/2p4R/2P2P1P/PPB2P2/6K1 w - - 3 30",
    "solution": [
      "Rxh6+",
      "Kg8",
      "Qh4"
    ],
    "solutionUci": [
      "h4h6",
      "h7g8",
      "f6h4"
    ],
    "description": "White to move. Themes: Clearance Sacrifice, Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1775,
    "themes": "clearance crushing endgame short",
    "preMove": "g8f8",
    "preMoveFen": "3r2q1/5prk/p3pQpp/1p2P3/2p4R/2P2P1P/PPB2P2/6K1 b - - 2 29"
  },
  {
    "id": "00HzX",
    "puzzleIndex": 476,
    "title": "Exercise 476: Black to Move",
    "fen": "4r1k1/5pp1/7R/1p6/8/1PP3QP/2q2PP1/6K1 b - - 0 29",
    "solution": [
      "Qc1+",
      "Kh2",
      "Qxh6"
    ],
    "solutionUci": [
      "c2c1",
      "g1h2",
      "c1h6"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1612,
    "themes": "crushing endgame fork short",
    "preMove": "c6h6",
    "preMoveFen": "4r1k1/5pp1/2R4p/1p6/8/1PP3QP/2q2PP1/6K1 w - - 0 29"
  },
  {
    "id": "00IDw",
    "puzzleIndex": 477,
    "title": "Exercise 477: Black to Move",
    "fen": "4r3/pN3kpp/2N1b3/2R5/5b2/P5P1/1P3P1P/7K b - - 0 30",
    "solution": [
      "Bh3",
      "Rc1",
      "Bxc1"
    ],
    "solutionUci": [
      "e6h3",
      "c5c1",
      "f4c1"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, Quiet Move, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1862,
    "themes": "advantage endgame quietMove short",
    "preMove": "g2g3",
    "preMoveFen": "4r3/pN3kpp/2N1b3/2R5/5b2/P7/1P3PPP/7K w - - 1 30"
  },
  {
    "id": "00IHi",
    "puzzleIndex": 478,
    "title": "Exercise 478: Black to Move",
    "fen": "8/8/1k6/8/p7/1p1N2P1/5KP1/r3R3 b - - 1 55",
    "solution": [
      "Rxe1",
      "Kxe1",
      "a3",
      "Kd2",
      "a2",
      "Kc3",
      "a1=Q+"
    ],
    "solutionUci": [
      "a1e1",
      "f2e1",
      "a4a3",
      "e1d2",
      "a3a2",
      "d2c3",
      "a2a1q"
    ],
    "description": "Black to move. Themes: AdvancedPawn, Crushing Advantage, Endgame, Promotion, Deep Calculation",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1743,
    "themes": "advancedPawn crushing endgame promotion veryLong",
    "preMove": "e7e1",
    "preMoveFen": "8/4R3/1k6/8/p7/1p1N2P1/5KP1/r7 w - - 0 55"
  },
  {
    "id": "00IMS",
    "puzzleIndex": 479,
    "title": "Exercise 479: White to Move",
    "fen": "1r4k1/r5q1/p2p1pP1/4pn2/2p1P2Q/2Pb1BK1/P6R/2R5 w - - 0 36",
    "solution": [
      "exf5",
      "Bxf5",
      "Bd5+"
    ],
    "solutionUci": [
      "e4f5",
      "d3f5",
      "f3d5"
    ],
    "description": "White to move. Themes: Clearance Sacrifice, Crushing Advantage, KingsideAttack, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1706,
    "themes": "clearance crushing kingsideAttack middlegame short",
    "preMove": "e3f5",
    "preMoveFen": "1r4k1/r5q1/p2p1pP1/4pP2/2p1P2Q/2PbnBK1/P6R/2R5 b - - 7 35"
  },
  {
    "id": "00IPp",
    "puzzleIndex": 480,
    "title": "Exercise 480: Black to Move",
    "fen": "4Q3/6pk/p3p2p/5P2/1p1P4/4q2P/2B1n2B/7K b - - 0 35",
    "solution": [
      "Qf3#"
    ],
    "solutionUci": [
      "e3f3"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 1, One-Move Tactic",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1514,
    "themes": "endgame mate mateIn1 oneMove",
    "preMove": "g4f5",
    "preMoveFen": "4Q3/6pk/p3p2p/5p2/1p1P2P1/4q2P/2B1n2B/7K w - - 0 35"
  },
  {
    "id": "00IUT",
    "puzzleIndex": 481,
    "title": "Exercise 481: Black to Move",
    "fen": "1r2r1k1/ppp1q1pp/4b3/4P3/1Q1R1P2/8/P5PP/R1B3K1 b - - 0 19",
    "solution": [
      "c5",
      "Qa3",
      "cxd4",
      "Qxe7",
      "Rxe7"
    ],
    "solutionUci": [
      "c7c5",
      "b4a3",
      "c5d4",
      "a3e7",
      "e8e7"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Fork, Long Tactic, Middlegame",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1442,
    "themes": "crushing fork long middlegame",
    "preMove": "d1d4",
    "preMoveFen": "1r2r1k1/ppp1q1pp/4b3/4P3/1Q1p1P2/8/P5PP/R1BR2K1 w - - 6 19"
  },
  {
    "id": "00IUW",
    "puzzleIndex": 482,
    "title": "Exercise 482: Black to Move",
    "fen": "8/2p1r1kp/5pp1/3P3r/4P3/2N1QbPq/PPP2R1P/5RK1 b - - 4 23",
    "solution": [
      "Qxg3+",
      "hxg3",
      "Rh1#"
    ],
    "solutionUci": [
      "h3g3",
      "h2g3",
      "h5h1"
    ],
    "description": "Black to move. Themes: Clearance Sacrifice, KingsideAttack, Checkmate, Mate in 2, Middlegame, Opera Mate, Tactical Sacrifice, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1684,
    "themes": "clearance kingsideAttack mate mateIn2 middlegame operaMate sacrifice short",
    "preMove": "a7e3",
    "preMoveFen": "8/Q1p1r1kp/5pp1/3P3r/4P3/2N2bPq/PPP2R1P/5RK1 w - - 3 23"
  },
  {
    "id": "00IYg",
    "puzzleIndex": 483,
    "title": "Exercise 483: White to Move",
    "fen": "r1b2r2/pp2n1p1/1qn1ppk1/3pP1N1/3P3P/P7/1P1Q1PP1/RN2K2R w KQ - 0 14",
    "solution": [
      "h5+",
      "Kh6",
      "Nxe6+",
      "Kh7",
      "Nxf8+"
    ],
    "solutionUci": [
      "h4h5",
      "g6h6",
      "g5e6",
      "h6h7",
      "e6f8"
    ],
    "description": "White to move. Themes: Decisive Advantage, Discovered Attack, DiscoveredCheck, Long Tactic, Middlegame",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 1786,
    "themes": "advantage discoveredAttack discoveredCheck long middlegame",
    "preMove": "f7f6",
    "preMoveFen": "r1b2r2/pp2npp1/1qn1p1k1/3pP1N1/3P3P/P7/1P1Q1PP1/RN2K2R b KQ - 0 13"
  },
  {
    "id": "00IbM",
    "puzzleIndex": 484,
    "title": "Exercise 484: Black to Move",
    "fen": "6k1/5rp1/Q2B3p/P1Pp4/1P6/2q1P2P/6P1/6K1 b - - 0 34",
    "solution": [
      "Qe1+",
      "Kh2",
      "Rf1",
      "Qxf1",
      "Qxf1"
    ],
    "solutionUci": [
      "c3e1",
      "g1h2",
      "f7f1",
      "a6f1",
      "e1f1"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, Long Tactic, Quiet Move",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1629,
    "themes": "advantage endgame long quietMove",
    "preMove": "e2a6",
    "preMoveFen": "6k1/5rp1/p2B3p/P1Pp4/1P6/2q1P2P/4Q1P1/6K1 w - - 0 34"
  },
  {
    "id": "00IiM",
    "puzzleIndex": 485,
    "title": "Exercise 485: Black to Move",
    "fen": "r5k1/pp4p1/1n6/3pB3/3P2pb/2N2Q2/PP6/2K3R1 b - - 0 24",
    "solution": [
      "gxf3",
      "Rxg7+",
      "Kf8"
    ],
    "solutionUci": [
      "g4f3",
      "g1g7",
      "g8f8"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1707,
    "themes": "advantage middlegame short",
    "preMove": "d3f3",
    "preMoveFen": "r5k1/pp4p1/1n6/3pB3/3P2pb/2NQ1r2/PP6/2K3R1 w - - 2 24"
  },
  {
    "id": "00InW",
    "puzzleIndex": 486,
    "title": "Exercise 486: White to Move",
    "fen": "8/2p5/pp1p4/3P1N2/PPP1Pp2/5n1p/5K1k/8 w - - 0 47",
    "solution": [
      "Kxf3",
      "Kg1",
      "Kxf4",
      "h2",
      "Ng3"
    ],
    "solutionUci": [
      "f2f3",
      "h2g1",
      "f3f4",
      "h3h2",
      "f5g3"
    ],
    "description": "White to move. Themes: Crushing Advantage, DefensiveMove, Endgame, Hanging Piece, Knight Endgame, Long Tactic",
    "hint": "Look for undefended or hanging material!",
    "rating": 1439,
    "themes": "crushing defensiveMove endgame hangingPiece knightEndgame long",
    "preMove": "e5f3",
    "preMoveFen": "8/2p5/pp1p4/3PnN2/PPP1Pp2/5P1p/5K1k/8 b - - 3 46"
  },
  {
    "id": "00Ivf",
    "puzzleIndex": 487,
    "title": "Exercise 487: Black to Move",
    "fen": "8/2p4r/1p3k2/p2PR1p1/P1P2pP1/1P3P1r/4R1K1/8 b - - 0 46",
    "solution": [
      "Rh2+",
      "Kf1",
      "Rh1+",
      "Kf2",
      "R7h2#"
    ],
    "solutionUci": [
      "h3h2",
      "g2f1",
      "h2h1",
      "f1f2",
      "h7h2"
    ],
    "description": "Black to move. Themes: Endgame, Long Tactic, Checkmate, Mate in 3, Rook Endgame",
    "hint": "Calculate a forcing checkmate combination!",
    "rating": 1622,
    "themes": "endgame long mate mateIn3 rookEndgame",
    "preMove": "e4e5",
    "preMoveFen": "8/2p4r/1p3k2/p2Pp1p1/P1P1RpP1/1P3P1r/4R1K1/8 w - - 7 46"
  },
  {
    "id": "00J1t",
    "puzzleIndex": 488,
    "title": "Exercise 488: White to Move",
    "fen": "r1qr3k/pp3pb1/1np1p3/8/3P3P/2N2PR1/PP1Q2P1/2KR4 w - - 0 23",
    "solution": [
      "Qg5",
      "Rg8",
      "Qh5+",
      "Bh6+",
      "Qxh6#"
    ],
    "solutionUci": [
      "d2g5",
      "d8g8",
      "g5h5",
      "g7h6",
      "h5h6"
    ],
    "description": "White to move. Themes: ExposedKing, KingsideAttack, Long Tactic, Checkmate, Mate in 3, Middlegame",
    "hint": "Calculate a forcing checkmate combination!",
    "rating": 1678,
    "themes": "exposedKing kingsideAttack long mate mateIn3 middlegame",
    "preMove": "f6g7",
    "preMoveFen": "r1qr3k/pp3pB1/1np1pb2/8/3P3P/2N2PR1/PP1Q2P1/2KR4 b - - 0 22"
  },
  {
    "id": "00JR7",
    "puzzleIndex": 489,
    "title": "Exercise 489: White to Move",
    "fen": "r5k1/pp2q1p1/2p1p2p/3nP1pP/3P2P1/2PQ1r2/PPB5/R5K1 w - - 0 24",
    "solution": [
      "Qh7+",
      "Kf7",
      "Bg6+",
      "Kf8",
      "Qh8#"
    ],
    "solutionUci": [
      "d3h7",
      "g8f7",
      "c2g6",
      "f7f8",
      "h7h8"
    ],
    "description": "White to move. Themes: KingsideAttack, Long Tactic, Checkmate, Mate in 3, Middlegame",
    "hint": "Calculate a forcing checkmate combination!",
    "rating": 1445,
    "themes": "kingsideAttack long mate mateIn3 middlegame",
    "preMove": "f8f3",
    "preMoveFen": "r4rk1/pp2q1p1/2p1p2p/3nP1pP/3P2P1/2PQ1R2/PPB5/R5K1 b - - 1 23"
  },
  {
    "id": "00JYV",
    "puzzleIndex": 490,
    "title": "Exercise 490: White to Move",
    "fen": "r2q1rk1/p1p1bppp/2pp2b1/4p3/4n1PN/2NP3P/PPP2PK1/R1BQ1R2 w - - 0 12",
    "solution": [
      "Nxg6",
      "Nxc3",
      "Nxe7+",
      "Qxe7",
      "bxc3"
    ],
    "solutionUci": [
      "h4g6",
      "e4c3",
      "g6e7",
      "d8e7",
      "b2c3"
    ],
    "description": "White to move. Themes: Decisive Advantage, KingsideAttack, Long Tactic, Opening",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1612,
    "themes": "advantage kingsideAttack long opening",
    "preMove": "f6e4",
    "preMoveFen": "r2q1rk1/p1p1bppp/2pp1nb1/4p3/4P1PN/2NP3P/PPP2PK1/R1BQ1R2 b - - 4 11"
  },
  {
    "id": "00JqT",
    "puzzleIndex": 491,
    "title": "Exercise 491: Black to Move",
    "fen": "2r2rk1/pp2R3/5p2/3p1q2/3P2P1/4QP1p/PP3R1P/6K1 b - - 0 30",
    "solution": [
      "Qb1+",
      "Rf1",
      "Qxb2",
      "Qe6+",
      "Kh8"
    ],
    "solutionUci": [
      "f5b1",
      "f2f1",
      "b1b2",
      "e3e6",
      "g8h8"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Deflection, Endgame, Long Tactic",
    "hint": "Deflect the key defender away from its crucial post!",
    "rating": 1867,
    "themes": "crushing deflection endgame long",
    "preMove": "g3g4",
    "preMoveFen": "2r2rk1/pp2R3/5p2/3p1q2/3P4/4QPPp/PP3R1P/6K1 w - - 2 30"
  },
  {
    "id": "00JsQ",
    "puzzleIndex": 492,
    "title": "Exercise 492: White to Move",
    "fen": "r1b1k1nr/pp2p2p/2q1Npp1/2n1p3/2B5/2N3B1/PPPR1PPP/2K4R w kq - 0 15",
    "solution": [
      "Rd8+",
      "Kf7",
      "Rf8#"
    ],
    "solutionUci": [
      "d2d8",
      "e8f7",
      "d8f8"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 2, Middlegame, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1987,
    "themes": "mate mateIn2 middlegame short",
    "preMove": "d7c5",
    "preMoveFen": "r1b1k1nr/pp1np2p/2q1Npp1/2P1p3/2B5/2N3B1/PPPR1PPP/2K4R b kq - 2 14"
  },
  {
    "id": "00JzT",
    "puzzleIndex": 493,
    "title": "Exercise 493: Black to Move",
    "fen": "8/7K/6p1/5p2/4p3/1k4P1/5P1P/8 b - - 0 44",
    "solution": [
      "g5",
      "g4",
      "f4"
    ],
    "solutionUci": [
      "g6g5",
      "g3g4",
      "f5f4"
    ],
    "description": "Black to move. Themes: Crushing Advantage, DefensiveMove, Endgame, Pawn Endgame, Quiet Move, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1638,
    "themes": "crushing defensiveMove endgame pawnEndgame quietMove short",
    "preMove": "h6h7",
    "preMoveFen": "8/7p/6pK/5p2/4p3/1k4P1/5P1P/8 w - - 2 44"
  },
  {
    "id": "00K7b",
    "puzzleIndex": 494,
    "title": "Exercise 494: Black to Move",
    "fen": "7k/1p4p1/pP1r4/4qp2/P2Nn3/1Q5P/2N5/3R1K2 b - - 5 48",
    "solution": [
      "Qf4+",
      "Qf3",
      "Qxf3+",
      "Nxf3",
      "Rxd1+"
    ],
    "solutionUci": [
      "e5f4",
      "b3f3",
      "f4f3",
      "d4f3",
      "d6d1"
    ],
    "description": "Black to move. Themes: Decisive Advantage, ExposedKing, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1977,
    "themes": "advantage exposedKing long middlegame",
    "preMove": "g2f1",
    "preMoveFen": "7k/1p4p1/pP1r4/4qp2/P2Nn3/1Q5P/2N3K1/3R4 w - - 4 48"
  },
  {
    "id": "00KHR",
    "puzzleIndex": 495,
    "title": "Exercise 495: Black to Move",
    "fen": "8/6pk/1Q1p2n1/4p3/2P3P1/P2PPK1P/1B6/4q3 b - - 2 35",
    "solution": [
      "Nh4+",
      "Ke4",
      "Qh1#"
    ],
    "solutionUci": [
      "g6h4",
      "f3e4",
      "e1h1"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1460,
    "themes": "endgame mate mateIn2 short",
    "preMove": "g2f3",
    "preMoveFen": "8/6pk/1Q1p2n1/4p3/2P3P1/P2PP2P/1B4K1/4q3 w - - 1 35"
  },
  {
    "id": "00KSB",
    "puzzleIndex": 496,
    "title": "Exercise 496: White to Move",
    "fen": "7r/4kpRp/2p2p1P/p1P1n3/Pp6/1B6/5PP1/6K1 w - - 3 36",
    "solution": [
      "f4",
      "Nd7",
      "Rxf7+"
    ],
    "solutionUci": [
      "f2f4",
      "e5d7",
      "g7f7"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1464,
    "themes": "crushing endgame short",
    "preMove": "a8h8",
    "preMoveFen": "r7/4kpRp/2p2p1P/p1P1n3/Pp6/1B6/5PP1/6K1 b - - 2 35"
  },
  {
    "id": "00Kbj",
    "puzzleIndex": 497,
    "title": "Exercise 497: Black to Move",
    "fen": "8/8/6p1/PR3p2/1P3k1P/8/r5P1/7K b - - 0 39",
    "solution": [
      "Kg3",
      "Rd5",
      "Ra1+",
      "Rd1",
      "Rxd1#"
    ],
    "solutionUci": [
      "f4g3",
      "b5d5",
      "a2a1",
      "d5d1",
      "a1d1"
    ],
    "description": "Black to move. Themes: Endgame, Long Tactic, Checkmate, Mate in 3, Rook Endgame",
    "hint": "Calculate a forcing checkmate combination!",
    "rating": 1481,
    "themes": "endgame long mate mateIn3 rookEndgame",
    "preMove": "h3h4",
    "preMoveFen": "8/8/6p1/PR3p2/1P3k2/7P/r5P1/7K w - - 1 39"
  },
  {
    "id": "00Kia",
    "puzzleIndex": 498,
    "title": "Exercise 498: White to Move",
    "fen": "5r1k/4n2p/1p4p1/pP5Q/P2pB2K/6P1/2P4P/4q3 w - - 0 38",
    "solution": [
      "Qe5+",
      "Kg8",
      "Bd5+",
      "Nxd5",
      "Qxe1"
    ],
    "solutionUci": [
      "h5e5",
      "h8g8",
      "e4d5",
      "e7d5",
      "e5e1"
    ],
    "description": "White to move. Themes: Decisive Advantage, Discovered Attack, Endgame, Fork, Long Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1596,
    "themes": "advantage discoveredAttack endgame fork long",
    "preMove": "g7g6",
    "preMoveFen": "5r1k/4n1pp/1p6/pP5Q/P2pB2K/6P1/2P4P/4q3 b - - 4 37"
  },
  {
    "id": "00Knu",
    "puzzleIndex": 499,
    "title": "Exercise 499: White to Move",
    "fen": "r2q1rk1/p3bpp1/2pp2b1/4p1Q1/4n3/1B3N1P/PPP3P1/R1B2RK1 w - - 1 19",
    "solution": [
      "Qxg6",
      "Qb6+",
      "Kh2"
    ],
    "solutionUci": [
      "g5g6",
      "d8b6",
      "g1h2"
    ],
    "description": "White to move. Themes: Decisive Advantage, DefensiveMove, Opening, Pin, Short Tactic",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 1821,
    "themes": "advantage defensiveMove opening pin short",
    "preMove": "f6e4",
    "preMoveFen": "r2q1rk1/p3bpp1/2pp1nb1/4p1Q1/8/1B3N1P/PPP3P1/R1B2RK1 b - - 0 18"
  },
  {
    "id": "00Kq4",
    "puzzleIndex": 500,
    "title": "Exercise 500: Black to Move",
    "fen": "r2qk3/5p1r/p1p1p3/1p1pP1N1/P1nP2Pn/2P3B1/2P2P2/R1QR2K1 b q - 0 21",
    "solution": [
      "Qxg5",
      "Qxg5",
      "Nf3+",
      "Kg2",
      "Nxg5"
    ],
    "solutionUci": [
      "d8g5",
      "c1g5",
      "h4f3",
      "g1g2",
      "f3g5"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Attraction Sacrifice, Fork, Long Tactic, Middlegame, Tactical Sacrifice",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1417,
    "themes": "advantage attraction fork long middlegame sacrifice",
    "preMove": "f3g5",
    "preMoveFen": "r2qk3/5p1r/p1p1p3/1p1pP1p1/P1nP2Pn/2P2NB1/2P2P2/R1QR2K1 w q - 1 21"
  },
  {
    "id": "00Ksa",
    "puzzleIndex": 501,
    "title": "Exercise 501: White to Move",
    "fen": "8/5p2/5pk1/8/4PPr1/8/5K2/7R w - - 3 47",
    "solution": [
      "Kf3",
      "Rg5",
      "fxg5"
    ],
    "solutionUci": [
      "f2f3",
      "g4g5",
      "f4g5"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Rook Endgame, Short Tactic, Trapped Piece",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1857,
    "themes": "crushing endgame rookEndgame short trappedPiece",
    "preMove": "g3g4",
    "preMoveFen": "8/5p2/5pk1/8/4PP2/6r1/5K2/7R b - - 2 46"
  },
  {
    "id": "00L1Y",
    "puzzleIndex": 502,
    "title": "Exercise 502: Black to Move",
    "fen": "3rkb1r/pp2pbpp/2p5/q7/1Q3B2/2P3P1/PP2PP1P/RN2K2R b KQk - 1 15",
    "solution": [
      "Qd5",
      "O-O",
      "e5",
      "Qxb7",
      "exf4"
    ],
    "solutionUci": [
      "a5d5",
      "e1g1",
      "e7e5",
      "b4b7",
      "e5f4"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1861,
    "themes": "advantage long middlegame",
    "preMove": "d4b4",
    "preMoveFen": "3rkb1r/pp2pbpp/2p5/q7/3Q1B2/2P3P1/PP2PP1P/RN2K2R w KQk - 0 15"
  },
  {
    "id": "00LH7",
    "puzzleIndex": 503,
    "title": "Exercise 503: White to Move",
    "fen": "6k1/6Bp/3q2pP/5p2/p2PnQ2/2r5/P5PK/4R3 w - - 2 40",
    "solution": [
      "Rxe4",
      "Qxf4+",
      "Rxf4"
    ],
    "solutionUci": [
      "e1e4",
      "d6f4",
      "e4f4"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1547,
    "themes": "crushing endgame short",
    "preMove": "d5d6",
    "preMoveFen": "6k1/6Bp/6pP/3q1p2/p2PnQ2/2r5/P5PK/4R3 b - - 1 39"
  },
  {
    "id": "00LMb",
    "puzzleIndex": 504,
    "title": "Exercise 504: Black to Move",
    "fen": "8/8/1n4kP/1P2Kp2/3P4/2p1N3/8/8 b - - 5 49",
    "solution": [
      "Nc4+",
      "Nxc4",
      "c2"
    ],
    "solutionUci": [
      "b6c4",
      "e3c4",
      "c3c2"
    ],
    "description": "Black to move. Themes: AdvancedPawn, Crushing Advantage, Endgame, Knight Endgame, Tactical Sacrifice, Short Tactic",
    "hint": "Look for a tactical sacrifice that decisively alters the position!",
    "rating": 1725,
    "themes": "advancedPawn crushing endgame knightEndgame sacrifice short",
    "preMove": "f4e5",
    "preMoveFen": "8/8/1n4kP/1P3p2/3P1K2/2p1N3/8/8 w - - 4 49"
  },
  {
    "id": "00LNH",
    "puzzleIndex": 505,
    "title": "Exercise 505: Black to Move",
    "fen": "1k2r3/pp2r2p/2pqbpp1/3n4/3P1p2/1B3N1P/PPQB1PP1/1K1RR3 b - - 3 22",
    "solution": [
      "Bf5",
      "Qxf5",
      "gxf5"
    ],
    "solutionUci": [
      "e6f5",
      "c2f5",
      "g6f5"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Middlegame, Pin, Short Tactic",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 1622,
    "themes": "advantage middlegame pin short",
    "preMove": "c4b3",
    "preMoveFen": "1k2r3/pp2r2p/2pqbpp1/3n4/2BP1p2/5N1P/PPQB1PP1/1K1RR3 w - - 2 22"
  },
  {
    "id": "00LO6",
    "puzzleIndex": 506,
    "title": "Exercise 506: Black to Move",
    "fen": "2r3k1/3q1pp1/1rp5/3R2Np/1p1N3n/1Q2P3/5PP1/2R3K1 b - - 0 33",
    "solution": [
      "cxd5",
      "Rxc8+",
      "Qxc8"
    ],
    "solutionUci": [
      "c6d5",
      "c1c8",
      "d7c8"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1655,
    "themes": "advantage middlegame short",
    "preMove": "c5d5",
    "preMoveFen": "2r3k1/3q1pp1/1rp5/2Rn2Np/1p1N3n/1Q2P3/5PP1/2R3K1 w - - 0 33"
  },
  {
    "id": "00LOy",
    "puzzleIndex": 507,
    "title": "Exercise 507: White to Move",
    "fen": "5k2/1p3pp1/p3p3/r3b3/2P2B2/1P6/1PR1K1PP/8 w - - 1 34",
    "solution": [
      "b4",
      "Ra1",
      "Bxe5"
    ],
    "solutionUci": [
      "b3b4",
      "a5a1",
      "f4e5"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1506,
    "themes": "crushing endgame short",
    "preMove": "f6e5",
    "preMoveFen": "5k2/1p3pp1/p3pb2/r7/2P2B2/1P6/1PR1K1PP/8 b - - 0 33"
  },
  {
    "id": "00LSv",
    "puzzleIndex": 508,
    "title": "Exercise 508: White to Move",
    "fen": "3r3k/1p4pp/2p3q1/8/3Q4/8/PP5P/R4RrK w - - 2 29",
    "solution": [
      "Qxg1",
      "Qe4+",
      "Qg2"
    ],
    "solutionUci": [
      "d4g1",
      "g6e4",
      "g1g2"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1716,
    "themes": "advantage endgame short",
    "preMove": "g2g1",
    "preMoveFen": "3r3k/1p4pp/2p3q1/8/3Q4/8/PP4rP/R4R1K b - - 1 28"
  },
  {
    "id": "00LUV",
    "puzzleIndex": 509,
    "title": "Exercise 509: White to Move",
    "fen": "5r1k/8/p3p2p/1p2P3/1P1p2R1/3Q3P/3r1qPK/8 w - - 2 32",
    "solution": [
      "Qg6",
      "Qxg2+",
      "Rxg2",
      "Rxg2+",
      "Qxg2"
    ],
    "solutionUci": [
      "d3g6",
      "f2g2",
      "g4g2",
      "d2g2",
      "g6g2"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Long Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1501,
    "themes": "crushing endgame long",
    "preMove": "g7h8",
    "preMoveFen": "5r2/6k1/p3p2p/1p2P3/1P1p2R1/3Q3P/3r1qPK/8 b - - 1 31"
  },
  {
    "id": "00Lhb",
    "puzzleIndex": 510,
    "title": "Exercise 510: White to Move",
    "fen": "7k/p3b2p/Pp1n4/1PpPp3/2B1PpP1/1P6/5BK1/8 w - - 1 34",
    "solution": [
      "Bxc5",
      "bxc5",
      "b6",
      "axb6",
      "a7"
    ],
    "solutionUci": [
      "f2c5",
      "b6c5",
      "b5b6",
      "a7b6",
      "a6a7"
    ],
    "description": "White to move. Themes: AdvancedPawn, Decisive Advantage, Endgame, Long Tactic, Master, MasterVsMaster, Tactical Sacrifice",
    "hint": "Look for a tactical sacrifice that decisively alters the position!",
    "rating": 1797,
    "themes": "advancedPawn advantage endgame long master masterVsMaster sacrifice",
    "preMove": "c8d6",
    "preMoveFen": "2n4k/p3b2p/Pp6/1PpPp3/2B1PpP1/1P6/5BK1/8 b - - 0 33"
  },
  {
    "id": "00Lt1",
    "puzzleIndex": 511,
    "title": "Exercise 511: Black to Move",
    "fen": "r4k2/pp3p2/2pNR2p/5Qp1/1P3n2/2KP4/P1P2qPP/8 b - - 7 31",
    "solution": [
      "Nd5+",
      "Kb3",
      "Qxf5",
      "Nxf5",
      "fxe6"
    ],
    "solutionUci": [
      "f4d5",
      "c3b3",
      "f2f5",
      "d6f5",
      "f7e6"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Discovered Attack, Endgame, Long Tactic",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 1612,
    "themes": "advantage discoveredAttack endgame long",
    "preMove": "d2c3",
    "preMoveFen": "r4k2/pp3p2/2pNR2p/5Qp1/1P3n2/3P4/P1PK1qPP/8 w - - 6 31"
  },
  {
    "id": "00Lyc",
    "puzzleIndex": 512,
    "title": "Exercise 512: Black to Move",
    "fen": "4R3/1p4k1/1q3bpp/3B4/4Np1P/p4P2/3RK1P1/8 b - - 5 42",
    "solution": [
      "Qb5+",
      "Rd3",
      "Qxe8"
    ],
    "solutionUci": [
      "b6b5",
      "d2d3",
      "b5e8"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Fork, Master, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1975,
    "themes": "crushing endgame fork master short",
    "preMove": "d6e4",
    "preMoveFen": "4R3/1p4k1/1q1N1bpp/3B4/5p1P/p4P2/3RK1P1/8 w - - 4 42"
  },
  {
    "id": "00M1q",
    "puzzleIndex": 513,
    "title": "Exercise 513: White to Move",
    "fen": "2r3k1/2r3p1/p3pqQ1/1p1p4/nP1P4/2P4R/P4PPP/2R3K1 w - - 1 31",
    "solution": [
      "Qh7+",
      "Kf7",
      "Rf3",
      "Qxf3",
      "gxf3"
    ],
    "solutionUci": [
      "g6h7",
      "g8f7",
      "h3f3",
      "f6f3",
      "g2f3"
    ],
    "description": "White to move. Themes: Decisive Advantage, Long Tactic, Middlegame, Pin",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 1482,
    "themes": "advantage long middlegame pin",
    "preMove": "e7f6",
    "preMoveFen": "2r3k1/2r1q1p1/p3p1Q1/1p1p4/nP1P4/2P4R/P4PPP/2R3K1 b - - 0 30"
  },
  {
    "id": "00MDy",
    "puzzleIndex": 514,
    "title": "Exercise 514: Black to Move",
    "fen": "8/pp6/2p1k3/2Pp2pp/1P1P1p2/P2K1PP1/7P/8 b - - 0 42",
    "solution": [
      "fxg3",
      "hxg3",
      "h4",
      "gxh4",
      "gxh4"
    ],
    "solutionUci": [
      "f4g3",
      "h2g3",
      "h5h4",
      "g3h4",
      "g5h4"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Long Tactic, Pawn Endgame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1833,
    "themes": "crushing endgame long pawnEndgame",
    "preMove": "g2g3",
    "preMoveFen": "8/pp6/2p1k3/2Pp2pp/1P1P1p2/P2K1P2/6PP/8 w - - 0 42"
  },
  {
    "id": "00ME0",
    "puzzleIndex": 515,
    "title": "Exercise 515: White to Move",
    "fen": "8/1p6/p1b5/4k2p/1PB1p2P/P3P1K1/8/8 w - - 3 36",
    "solution": [
      "Bf7",
      "Bd7",
      "Bxh5"
    ],
    "solutionUci": [
      "c4f7",
      "c6d7",
      "f7h5"
    ],
    "description": "White to move. Themes: Bishop Endgame, Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1604,
    "themes": "bishopEndgame crushing endgame short",
    "preMove": "f5e5",
    "preMoveFen": "8/1p6/p1b5/5k1p/1PB1p2P/P3P1K1/8/8 b - - 2 35"
  },
  {
    "id": "00MIY",
    "puzzleIndex": 516,
    "title": "Exercise 516: Black to Move",
    "fen": "6k1/3R3p/1p5q/3P4/3QP1pN/6P1/PPr3B1/5K2 b - - 0 25",
    "solution": [
      "Qc1+",
      "Qd1",
      "Qxd1#"
    ],
    "solutionUci": [
      "h6c1",
      "d4d1",
      "c1d1"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1496,
    "themes": "endgame mate mateIn2 short",
    "preMove": "g1f1",
    "preMoveFen": "6k1/3R3p/1p5q/3P4/3QP1pN/6P1/PPr3B1/5rK1 w - - 0 25"
  },
  {
    "id": "00MQl",
    "puzzleIndex": 517,
    "title": "Exercise 517: Black to Move",
    "fen": "r1b2k1r/pp3ppp/2p5/2bp4/5Pnq/1B2BN2/PPP3PP/RN1QR2K b - - 5 15",
    "solution": [
      "Bxe3",
      "Nxh4",
      "Nf2+",
      "Kg1",
      "Nxd1+"
    ],
    "solutionUci": [
      "c5e3",
      "f3h4",
      "g4f2",
      "h1g1",
      "f2d1"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Discovered Attack, Fork, Long Tactic, Opening, Tactical Sacrifice",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1735,
    "themes": "advantage discoveredAttack fork long opening sacrifice",
    "preMove": "d4f3",
    "preMoveFen": "r1b2k1r/pp3ppp/2p5/2bp4/3N1Pnq/1B2B3/PPP3PP/RN1QR2K w - - 4 15"
  },
  {
    "id": "00MZC",
    "puzzleIndex": 518,
    "title": "Exercise 518: Black to Move",
    "fen": "5r1k/p5p1/1pb4p/3pR3/1Q6/P1P4P/1P3qP1/R6K b - - 1 24",
    "solution": [
      "d4",
      "Re2",
      "Bxg2+"
    ],
    "solutionUci": [
      "d5d4",
      "e5e2",
      "c6g2"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Discovered Attack, Endgame, Short Tactic",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 1872,
    "themes": "advantage discoveredAttack endgame short",
    "preMove": "g1h1",
    "preMoveFen": "5r1k/p5p1/1pb4p/3pR3/1Q6/P1P4P/1P3qP1/R5K1 w - - 0 24"
  },
  {
    "id": "00Mbv",
    "puzzleIndex": 519,
    "title": "Exercise 519: White to Move",
    "fen": "2k2b1r/pp3ppp/8/BN2p1P1/2n1Nn1P/8/PP3P2/2KR4 w - - 0 25",
    "solution": [
      "Rd8#"
    ],
    "solutionUci": [
      "d1d8"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 1, Middlegame, One-Move Tactic, Opera Mate",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1558,
    "themes": "mate mateIn1 middlegame oneMove operaMate",
    "preMove": "b6c4",
    "preMoveFen": "2k2b1r/pp3ppp/1n6/BN2p1P1/2Q1Nn1P/8/PP3P2/2KR4 b - - 0 24"
  },
  {
    "id": "00Msq",
    "puzzleIndex": 520,
    "title": "Exercise 520: White to Move",
    "fen": "r4k2/1pp2Bp1/5n1p/1q2N3/3P4/7P/5PP1/4Q1K1 w - - 3 31",
    "solution": [
      "Bc4",
      "Qxc4",
      "Nxc4"
    ],
    "solutionUci": [
      "f7c4",
      "b5c4",
      "e5c4"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Master, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1820,
    "themes": "crushing endgame master short",
    "preMove": "g8f8",
    "preMoveFen": "r5k1/1pp2Bp1/5n1p/1q2N3/3P4/7P/5PP1/4Q1K1 b - - 2 30"
  },
  {
    "id": "00MwU",
    "puzzleIndex": 521,
    "title": "Exercise 521: White to Move",
    "fen": "3r1b1R/1pq3p1/p1k3P1/3p4/1P1Q4/4PP2/P1P5/2K5 w - - 0 27",
    "solution": [
      "Rxf8",
      "Rxf8",
      "Qc5+",
      "Kd7",
      "Qxf8"
    ],
    "solutionUci": [
      "h8f8",
      "d8f8",
      "d4c5",
      "c6d7",
      "c5f8"
    ],
    "description": "White to move. Themes: Decisive Advantage, Attraction Sacrifice, Endgame, Fork, Long Tactic, Tactical Sacrifice",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1710,
    "themes": "advantage attraction endgame fork long sacrifice",
    "preMove": "a7a6",
    "preMoveFen": "3r1b1R/ppq3p1/2k3P1/3p4/1P1Q4/4PP2/P1P5/2K5 b - - 0 26"
  },
  {
    "id": "00Myw",
    "puzzleIndex": 522,
    "title": "Exercise 522: White to Move",
    "fen": "r1b3rk/2q2p2/1n2p2n/p2pP1NP/P1pP1QP1/1pP5/1P3PB1/R3R1K1 w - - 5 27",
    "solution": [
      "Qf6+",
      "Rg7",
      "Qxh6+"
    ],
    "solutionUci": [
      "f4f6",
      "g8g7",
      "f6h6"
    ],
    "description": "White to move. Themes: Crushing Advantage, Fork, Master, Middlegame, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1532,
    "themes": "crushing fork master middlegame short",
    "preMove": "h7h8",
    "preMoveFen": "r1b3r1/2q2p1k/1n2p2n/p2pP1NP/P1pP1QP1/1pP5/1P3PB1/R3R1K1 b - - 4 26"
  },
  {
    "id": "00NEO",
    "puzzleIndex": 523,
    "title": "Exercise 523: White to Move",
    "fen": "4qr2/pR4pk/2b2p1p/4pPP1/3bB3/3P3Q/P1r4P/4BR1K w - - 1 25",
    "solution": [
      "Qxh6+",
      "Kg8",
      "Qxg7#"
    ],
    "solutionUci": [
      "h3h6",
      "h7g8",
      "h6g7"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 2, Middlegame, Pin, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1879,
    "themes": "mate mateIn2 middlegame pin short",
    "preMove": "d7c6",
    "preMoveFen": "4qr2/pR1b2pk/5p1p/4pPP1/3bB3/3P3Q/P1r4P/4BR1K b - - 0 24"
  },
  {
    "id": "00NHK",
    "puzzleIndex": 524,
    "title": "Exercise 524: White to Move",
    "fen": "r1b2rk1/1p2b1p1/pq2p1P1/3pn3/1P1P4/P1N1P3/6P1/R2QK2R w KQ - 0 18",
    "solution": [
      "Rh8+",
      "Kxh8",
      "Qh5+",
      "Kg8",
      "Qh7#"
    ],
    "solutionUci": [
      "h1h8",
      "g8h8",
      "d1h5",
      "h8g8",
      "h5h7"
    ],
    "description": "White to move. Themes: Attraction Sacrifice, Fork, Long Tactic, Checkmate, Mate in 3, Middlegame, Tactical Sacrifice",
    "hint": "Calculate a forcing checkmate combination!",
    "rating": 1847,
    "themes": "attraction fork long mate mateIn3 middlegame sacrifice",
    "preMove": "c6e5",
    "preMoveFen": "r1b2rk1/1p2b1p1/pqn1p1P1/3pP3/1P1P4/P1N1P3/6P1/R2QK2R b KQ - 0 17"
  },
  {
    "id": "00NKk",
    "puzzleIndex": 525,
    "title": "Exercise 525: White to Move",
    "fen": "2r2r1k/pp4q1/4Q3/3p4/3P4/P1P5/1P3PPP/4R1K1 w - - 1 26",
    "solution": [
      "Re3",
      "Rc7",
      "Rh3+"
    ],
    "solutionUci": [
      "e1e3",
      "c8c7",
      "e3h3"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Quiet Move, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1822,
    "themes": "advantage endgame quietMove short",
    "preMove": "g8h8",
    "preMoveFen": "2r2rk1/pp4q1/4Q3/3p4/3P4/P1P5/1P3PPP/4R1K1 b - - 0 25"
  },
  {
    "id": "00NUc",
    "puzzleIndex": 526,
    "title": "Exercise 526: Black to Move",
    "fen": "6k1/2P3pp/1P6/4b3/3p4/Br5P/4prP1/R5RK b - - 0 30",
    "solution": [
      "Rxh3+",
      "gxh3",
      "Rh2#"
    ],
    "solutionUci": [
      "b3h3",
      "g2h3",
      "f2h2"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 2, Opera Mate, Tactical Sacrifice, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1514,
    "themes": "endgame mate mateIn2 operaMate sacrifice short",
    "preMove": "c6c7",
    "preMoveFen": "6k1/6pp/1PP5/4b3/3p4/Br5P/4prP1/R5RK w - - 1 30"
  },
  {
    "id": "00NVe",
    "puzzleIndex": 527,
    "title": "Exercise 527: Black to Move",
    "fen": "7k/p1p3pb/8/5Bnr/8/2P2R2/PPP2K2/6R1 b - - 0 34",
    "solution": [
      "Nxf3",
      "Bg4",
      "Nxg1"
    ],
    "solutionUci": [
      "g5f3",
      "f5g4",
      "f3g1"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1821,
    "themes": "advantage endgame short",
    "preMove": "c8f5",
    "preMoveFen": "2B4k/p1p3pb/8/5pnr/8/2P2R2/PPP2K2/6R1 w - - 6 34"
  },
  {
    "id": "00Nay",
    "puzzleIndex": 528,
    "title": "Exercise 528: White to Move",
    "fen": "r2q1r2/ppp2p2/3p1nk1/4p1p1/2B1P3/2NP2Q1/PPP5/2K4R w - - 1 20",
    "solution": [
      "Qh3",
      "Rh8",
      "Qf5+",
      "Kg7",
      "Qxg5+"
    ],
    "solutionUci": [
      "g3h3",
      "f8h8",
      "h3f5",
      "g6g7",
      "f5g5"
    ],
    "description": "White to move. Themes: Crushing Advantage, Deflection, Long Tactic, Middlegame, Quiet Move",
    "hint": "Deflect the key defender away from its crucial post!",
    "rating": 1766,
    "themes": "crushing deflection long middlegame quietMove",
    "preMove": "g7g6",
    "preMoveFen": "r2q1r2/ppp2pk1/3p1n2/4p1p1/2B1P3/2NP2Q1/PPP5/2K4R b - - 0 19"
  },
  {
    "id": "00Nf5",
    "puzzleIndex": 529,
    "title": "Exercise 529: Black to Move",
    "fen": "r1bq1rk1/pp2bppp/2pp1n2/8/5P2/2N2N2/PBPPB1PP/R2Q1RK1 b - - 6 11",
    "solution": [
      "Qb6+",
      "Kh1",
      "Qxb2",
      "Rb1",
      "Qa3"
    ],
    "solutionUci": [
      "d8b6",
      "g1h1",
      "b6b2",
      "a1b1",
      "b2a3"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Fork, Long Tactic, Opening",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1563,
    "themes": "advantage fork long opening",
    "preMove": "b1c3",
    "preMoveFen": "r1bq1rk1/pp2bppp/2pp1n2/8/5P2/5N2/PBPPB1PP/RN1Q1RK1 w - - 5 11"
  },
  {
    "id": "00Ngg",
    "puzzleIndex": 530,
    "title": "Exercise 530: Black to Move",
    "fen": "3qk2r/1p1bbppp/4pn2/1BPp1n2/3P4/4PN2/4QPPP/BN2K2R b Kk - 2 15",
    "solution": [
      "Qa5+",
      "Bc3",
      "Qxb5"
    ],
    "solutionUci": [
      "d8a5",
      "a1c3",
      "a5b5"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Fork, Middlegame, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1490,
    "themes": "advantage fork middlegame short",
    "preMove": "d1e2",
    "preMoveFen": "3qk2r/1p1bbppp/4pn2/1BPp1n2/3P4/4PN2/5PPP/BN1QK2R w Kk - 1 15"
  },
  {
    "id": "00NpT",
    "puzzleIndex": 531,
    "title": "Exercise 531: White to Move",
    "fen": "4rrk1/1ppq2p1/p3Rp1p/3P4/2P2Q2/3B3P/PP4PK/8 w - - 2 26",
    "solution": [
      "Qf5",
      "Rxe6",
      "Qh7+"
    ],
    "solutionUci": [
      "f4f5",
      "e8e6",
      "f5h7"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Tactical Sacrifice, Short Tactic",
    "hint": "Look for a tactical sacrifice that decisively alters the position!",
    "rating": 1699,
    "themes": "crushing endgame sacrifice short",
    "preMove": "a8e8",
    "preMoveFen": "r4rk1/1ppq2p1/p3Rp1p/3P4/2P2Q2/3B3P/PP4PK/8 b - - 1 25"
  },
  {
    "id": "00Nqd",
    "puzzleIndex": 532,
    "title": "Exercise 532: White to Move",
    "fen": "8/p7/5P2/PP1bp3/4N3/K7/2kp4/8 w - - 0 49",
    "solution": [
      "Nxd2",
      "Kxd2",
      "b6",
      "axb6",
      "axb6"
    ],
    "solutionUci": [
      "e4d2",
      "c2d2",
      "b5b6",
      "a7b6",
      "a5b6"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Long Tactic, Tactical Sacrifice",
    "hint": "Look for a tactical sacrifice that decisively alters the position!",
    "rating": 1782,
    "themes": "crushing endgame long sacrifice",
    "preMove": "d3d2",
    "preMoveFen": "8/p7/5P2/PP1bp3/4N3/K2p4/2k5/8 b - - 0 48"
  },
  {
    "id": "00Nte",
    "puzzleIndex": 533,
    "title": "Exercise 533: Black to Move",
    "fen": "r4k2/8/2p3Bb/4p1R1/3q4/PQ6/2K2P2/1N6 b - - 0 30",
    "solution": [
      "Qxf2+",
      "Nd2",
      "Bxg5",
      "Qf3+",
      "Qxf3"
    ],
    "solutionUci": [
      "d4f2",
      "b1d2",
      "h6g5",
      "b3f3",
      "f2f3"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Zwischenzug, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1689,
    "themes": "advantage intermezzo long middlegame",
    "preMove": "g1g5",
    "preMoveFen": "r4k2/8/2p3Bb/4p1n1/3q4/PQ6/2K2P2/1N4R1 w - - 3 30"
  },
  {
    "id": "00O8m",
    "puzzleIndex": 534,
    "title": "Exercise 534: White to Move",
    "fen": "r3r1k1/ppp2ppp/2nnq3/8/3P4/P1P1P1P1/2Q3BP/R1B1KR2 w Q - 5 17",
    "solution": [
      "d5",
      "Qe5",
      "dxc6"
    ],
    "solutionUci": [
      "d4d5",
      "e6e5",
      "d5c6"
    ],
    "description": "White to move. Themes: Crushing Advantage, Fork, Middlegame, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1424,
    "themes": "crushing fork middlegame short",
    "preMove": "f6e6",
    "preMoveFen": "r3r1k1/ppp2ppp/2nn1q2/8/3P4/P1P1P1P1/2Q3BP/R1B1KR2 b Q - 4 16"
  },
  {
    "id": "00O9Z",
    "puzzleIndex": 535,
    "title": "Exercise 535: Black to Move",
    "fen": "5Q1R/5p1p/1b3qp1/p6k/P2P4/8/1P2rPPP/5RK1 b - - 8 32",
    "solution": [
      "Qxf2+",
      "Rxf2",
      "Re1+",
      "Rf1",
      "Bxd4+",
      "Kh1",
      "Rxf1#"
    ],
    "solutionUci": [
      "f6f2",
      "f1f2",
      "e2e1",
      "f2f1",
      "b6d4",
      "g1h1",
      "e1f1"
    ],
    "description": "Black to move. Themes: Back-Rank Mate, Deflection, Endgame, Fork, Master, Checkmate, Mate in 4, Pin, Tactical Sacrifice, Deep Calculation",
    "hint": "Calculate a forcing checkmate combination!",
    "rating": 1616,
    "themes": "backRankMate deflection endgame fork master mate mateIn4 pin sacrifice veryLong",
    "preMove": "g8h8",
    "preMoveFen": "5QR1/5p1p/1b3qp1/p6k/P2P4/8/1P2rPPP/5RK1 w - - 7 32"
  },
  {
    "id": "00OLF",
    "puzzleIndex": 536,
    "title": "Exercise 536: Black to Move",
    "fen": "k1r5/n1N3p1/Q2p4/P2Pp2p/q3Pp1P/2RK4/5PP1/8 b - - 0 36",
    "solution": [
      "Rxc7",
      "Rxc7",
      "Qd1+",
      "Kc3",
      "Qc1+",
      "Kb3",
      "Qxc7"
    ],
    "solutionUci": [
      "c8c7",
      "c3c7",
      "a4d1",
      "d3c3",
      "d1c1",
      "c3b3",
      "c1c7"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Tactical Sacrifice, Skewer, Deep Calculation",
    "hint": "Look for a tactical sacrifice that decisively alters the position!",
    "rating": 1856,
    "themes": "crushing endgame sacrifice skewer veryLong",
    "preMove": "e6c7",
    "preMoveFen": "k1r5/n1p3p1/Q2pN3/P2Pp2p/q3Pp1P/2RK4/5PP1/8 w - - 4 36"
  },
  {
    "id": "00ON5",
    "puzzleIndex": 537,
    "title": "Exercise 537: Black to Move",
    "fen": "8/k1p5/P7/3N4/3P2pp/4K1n1/6P1/8 b - - 2 47",
    "solution": [
      "h3",
      "Kf2",
      "h2",
      "Kxg3",
      "h1=Q"
    ],
    "solutionUci": [
      "h4h3",
      "e3f2",
      "h3h2",
      "f2g3",
      "h2h1q"
    ],
    "description": "Black to move. Themes: AdvancedPawn, Crushing Advantage, Endgame, Knight Endgame, Long Tactic, Promotion",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1825,
    "themes": "advancedPawn crushing endgame knightEndgame long promotion",
    "preMove": "d3e3",
    "preMoveFen": "8/k1p5/P7/3N4/3P2pp/3K2n1/6P1/8 w - - 1 47"
  },
  {
    "id": "00OPc",
    "puzzleIndex": 538,
    "title": "Exercise 538: Black to Move",
    "fen": "1k1rr3/ppp1q3/8/4nQ1p/8/2P2N1P/PP4P1/2K1R2R b - - 1 25",
    "solution": [
      "Nd3+",
      "Qxd3",
      "Rxd3",
      "Rxe7",
      "Rxe7"
    ],
    "solutionUci": [
      "e5d3",
      "f5d3",
      "d8d3",
      "e1e7",
      "e8e7"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Fork, Long Tactic, Middlegame",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1932,
    "themes": "advantage fork long middlegame",
    "preMove": "g5f3",
    "preMoveFen": "1k1rr3/ppp1q3/8/4nQNp/8/2P4P/PP4P1/2K1R2R w - - 0 25"
  },
  {
    "id": "00OQt",
    "puzzleIndex": 539,
    "title": "Exercise 539: Black to Move",
    "fen": "8/8/8/p3b3/P1B2p1K/1Pk1p2P/6P1/8 b - - 0 50",
    "solution": [
      "Kd2",
      "Kg4",
      "e2",
      "Bxe2",
      "Kxe2"
    ],
    "solutionUci": [
      "c3d2",
      "h4g4",
      "e3e2",
      "c4e2",
      "d2e2"
    ],
    "description": "Black to move. Themes: AdvancedPawn, Bishop Endgame, Crushing Advantage, Endgame, Long Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1709,
    "themes": "advancedPawn bishopEndgame crushing endgame long",
    "preMove": "g4h4",
    "preMoveFen": "8/8/8/p3b3/P1B2pKp/1Pk1p2P/6P1/8 w - - 8 50"
  },
  {
    "id": "00OYl",
    "puzzleIndex": 540,
    "title": "Exercise 540: Black to Move",
    "fen": "3r4/5p2/k3p1p1/2B1Pr2/2P3nN/1p4Pp/4QP1P/6K1 b - - 1 34",
    "solution": [
      "Rxe5",
      "Qf1",
      "Rxc5"
    ],
    "solutionUci": [
      "f5e5",
      "e2f1",
      "e5c5"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1944,
    "themes": "crushing endgame fork short",
    "preMove": "f3h4",
    "preMoveFen": "3r4/5p2/k3p1p1/2B1Pr2/2P3n1/1p3NPp/4QP1P/6K1 w - - 0 34"
  },
  {
    "id": "00P6s",
    "puzzleIndex": 541,
    "title": "Exercise 541: Black to Move",
    "fen": "1n3rk1/p1p3pp/1p2Pb2/8/3qQ3/5P2/PPP4P/R3KBNR b KQ - 1 14",
    "solution": [
      "Bh4+",
      "Ke2",
      "Qf2+"
    ],
    "solutionUci": [
      "f6h4",
      "e1e2",
      "d4f2"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1605,
    "themes": "advantage middlegame short",
    "preMove": "a8e4",
    "preMoveFen": "Qn3rk1/p1p3pp/1p2Pb2/8/3q4/5P2/PPP4P/R3KBNR w KQ - 0 14"
  },
  {
    "id": "00PF3",
    "puzzleIndex": 542,
    "title": "Exercise 542: Black to Move",
    "fen": "2kr3r/Qpp2ppp/3b1n2/1N6/8/4P1Pq/PP1B1P1P/2R2RK1 b - - 5 18",
    "solution": [
      "Ng4",
      "Nxd6+",
      "Rxd6",
      "Rxc7+",
      "Kxc7"
    ],
    "solutionUci": [
      "f6g4",
      "b5d6",
      "d8d6",
      "c1c7",
      "c8c7"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1408,
    "themes": "advantage long middlegame",
    "preMove": "d4b5",
    "preMoveFen": "2kr3r/Qpp2ppp/3b1n2/8/3N4/4P1Pq/PP1B1P1P/2R2RK1 w - - 4 18"
  },
  {
    "id": "00PUc",
    "puzzleIndex": 543,
    "title": "Exercise 543: Black to Move",
    "fen": "3r3k/pp4bp/3Bn1p1/7n/8/8/PP3P1K/3R1RN1 b - - 2 27",
    "solution": [
      "Rxd6",
      "Rxd6",
      "Be5+",
      "Kh1",
      "Bxd6"
    ],
    "solutionUci": [
      "d8d6",
      "d1d6",
      "g7e5",
      "h2h1",
      "e5d6"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Attraction Sacrifice, ExposedKing, Fork, Long Tactic, Middlegame, Tactical Sacrifice",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1503,
    "themes": "advantage attraction exposedKing fork long middlegame sacrifice",
    "preMove": "a1d1",
    "preMoveFen": "3r3k/pp4bp/3Bn1p1/7n/8/8/PP3P1K/R4RN1 w - - 1 27"
  },
  {
    "id": "00Pr6",
    "puzzleIndex": 544,
    "title": "Exercise 544: White to Move",
    "fen": "r1b2rk1/p4ppp/2p5/6q1/6P1/3p1Q1P/PPP5/1K2RR2 w - - 0 18",
    "solution": [
      "Qxf7+",
      "Rxf7",
      "Re8+",
      "Rf8",
      "Rfxf8#"
    ],
    "solutionUci": [
      "f3f7",
      "f8f7",
      "e1e8",
      "f7f8",
      "f1f8"
    ],
    "description": "White to move. Themes: KingsideAttack, Long Tactic, Checkmate, Mate in 3, Middlegame, Tactical Sacrifice",
    "hint": "Calculate a forcing checkmate combination!",
    "rating": 1496,
    "themes": "kingsideAttack long mate mateIn3 middlegame sacrifice",
    "preMove": "c4d3",
    "preMoveFen": "r1b2rk1/p4ppp/2p5/6q1/2p3P1/3P1Q1P/PPP5/1K2RR2 b - - 0 17"
  },
  {
    "id": "00PvX",
    "puzzleIndex": 545,
    "title": "Exercise 545: Black to Move",
    "fen": "8/n7/P7/K2k4/P7/7P/5PP1/8 b - - 1 53",
    "solution": [
      "Kc5",
      "f3",
      "Nc6#"
    ],
    "solutionUci": [
      "d5c5",
      "f2f3",
      "a7c6"
    ],
    "description": "Black to move. Themes: Endgame, Knight Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1680,
    "themes": "endgame knightEndgame mate mateIn2 short",
    "preMove": "b4a5",
    "preMoveFen": "8/n7/P7/3k4/PK6/7P/5PP1/8 w - - 0 53"
  },
  {
    "id": "00QCe",
    "puzzleIndex": 546,
    "title": "Exercise 546: White to Move",
    "fen": "1k5r/n1r3pp/5p2/ppN5/5P2/8/2R3PP/1R4K1 w - - 4 29",
    "solution": [
      "Na6+",
      "Kb7",
      "Nxc7"
    ],
    "solutionUci": [
      "c5a6",
      "b8b7",
      "a6c7"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1423,
    "themes": "crushing endgame fork short",
    "preMove": "d7c7",
    "preMoveFen": "1k5r/n2r2pp/5p2/ppN5/5P2/8/2R3PP/1R4K1 b - - 3 28"
  },
  {
    "id": "00QF0",
    "puzzleIndex": 547,
    "title": "Exercise 547: White to Move",
    "fen": "5rk1/4pb2/3p1p1Q/p5p1/P3P2N/1P5P/2r2qPK/3R2R1 w - - 0 31",
    "solution": [
      "Nf5",
      "Qf4+",
      "Kh1",
      "Qxf5",
      "exf5"
    ],
    "solutionUci": [
      "h4f5",
      "f2f4",
      "h2h1",
      "f4f5",
      "e4f5"
    ],
    "description": "White to move. Themes: Crushing Advantage, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1504,
    "themes": "crushing long middlegame",
    "preMove": "g6g5",
    "preMoveFen": "5rk1/4pb2/3p1ppQ/p7/P3P2N/1P5P/2r2qPK/3R2R1 b - - 5 30"
  },
  {
    "id": "00QN3",
    "puzzleIndex": 548,
    "title": "Exercise 548: Black to Move",
    "fen": "r1b1B2k/pp4pp/2pb4/4q3/8/6P1/PPP4P/R2Q1R1K b - - 0 17",
    "solution": [
      "Qe4+",
      "Qf3",
      "Qxe8"
    ],
    "solutionUci": [
      "e5e4",
      "d1f3",
      "e4e8"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Fork, Middlegame, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1880,
    "themes": "advantage fork middlegame short",
    "preMove": "g2g3",
    "preMoveFen": "r1b1B2k/pp4pp/2pb4/4q3/8/8/PPP3PP/R2Q1R1K w - - 1 17"
  },
  {
    "id": "00QVZ",
    "puzzleIndex": 549,
    "title": "Exercise 549: White to Move",
    "fen": "8/7p/4K3/6p1/3k2P1/8/5P2/8 w - - 1 44",
    "solution": [
      "Kf5",
      "h6",
      "Kg6",
      "Ke4",
      "Kxh6"
    ],
    "solutionUci": [
      "e6f5",
      "h7h6",
      "f5g6",
      "d4e4",
      "g6h6"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Long Tactic, Master, Pawn Endgame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1468,
    "themes": "crushing endgame long master pawnEndgame",
    "preMove": "c4d4",
    "preMoveFen": "8/7p/4K3/6p1/2k3P1/8/5P2/8 b - - 0 43"
  },
  {
    "id": "00Qlc",
    "puzzleIndex": 550,
    "title": "Exercise 550: White to Move",
    "fen": "8/5R2/P7/2p2r2/2Pp2k1/3K4/5p2/8 w - - 2 55",
    "solution": [
      "Rxf5",
      "Kxf5",
      "Ke2",
      "f1=Q+",
      "Kxf1"
    ],
    "solutionUci": [
      "f7f5",
      "g4f5",
      "d3e2",
      "f2f1q",
      "e2f1"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Long Tactic, Rook Endgame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1667,
    "themes": "crushing endgame long rookEndgame",
    "preMove": "e5f5",
    "preMoveFen": "8/5R2/P7/2p1r3/2Pp2k1/3K4/5p2/8 b - - 1 54"
  },
  {
    "id": "00Qm5",
    "puzzleIndex": 551,
    "title": "Exercise 551: White to Move",
    "fen": "r4rk1/p1q1b1pp/2p5/4ppB1/4p1nP/2N5/PPP1QPP1/3R1RK1 w - - 9 16",
    "solution": [
      "Qc4+",
      "Kh8",
      "Nd5",
      "cxd5",
      "Qxc7"
    ],
    "solutionUci": [
      "e2c4",
      "g8h8",
      "c3d5",
      "c6d5",
      "c4c7"
    ],
    "description": "White to move. Themes: Crushing Advantage, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1893,
    "themes": "crushing long middlegame",
    "preMove": "d8c7",
    "preMoveFen": "r2q1rk1/p3b1pp/2p5/4ppB1/4p1nP/2N5/PPP1QPP1/3R1RK1 b - - 8 15"
  },
  {
    "id": "00QnO",
    "puzzleIndex": 552,
    "title": "Exercise 552: Black to Move",
    "fen": "1k1r1r2/pp4p1/6q1/2Qp4/5NP1/2P4p/PPN4P/R4R1K b - - 0 30",
    "solution": [
      "Qe4+",
      "Kg1",
      "Rxf4"
    ],
    "solutionUci": [
      "g6e4",
      "h1g1",
      "f8f4"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Fork, Zwischenzug, Middlegame, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1511,
    "themes": "crushing fork intermezzo middlegame short",
    "preMove": "g2f4",
    "preMoveFen": "1k1r1r2/pp4p1/6q1/2Qp4/5bP1/2P4p/PPN3NP/R4R1K w - - 0 30"
  },
  {
    "id": "00QqI",
    "puzzleIndex": 553,
    "title": "Exercise 553: Black to Move",
    "fen": "r6r/pQ2nkpp/4b3/2p1q3/4N3/8/PP1B1PPP/R4RK1 b - - 0 15",
    "solution": [
      "Bd5",
      "Ng5+",
      "Qxg5",
      "Bxg5",
      "Bxb7"
    ],
    "solutionUci": [
      "e6d5",
      "e4g5",
      "e5g5",
      "d2g5",
      "d5b7"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1638,
    "themes": "advantage long middlegame",
    "preMove": "c3e4",
    "preMoveFen": "r6r/pQ2nkpp/4b3/2p1q3/4p3/2N5/PP1B1PPP/R4RK1 w - - 1 15"
  },
  {
    "id": "00Qqp",
    "puzzleIndex": 554,
    "title": "Exercise 554: Black to Move",
    "fen": "6k1/4P3/p5p1/8/8/2P3PP/1r5r/R3RK2 b - - 0 46",
    "solution": [
      "Rh1#"
    ],
    "solutionUci": [
      "h2h1"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 1, One-Move Tactic, Rook Endgame",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1684,
    "themes": "endgame mate mateIn1 oneMove rookEndgame",
    "preMove": "e6e7",
    "preMoveFen": "6k1/8/p3P1p1/8/8/2P3PP/1r5r/R3RK2 w - - 0 46"
  },
  {
    "id": "00R4l",
    "puzzleIndex": 555,
    "title": "Exercise 555: Black to Move",
    "fen": "r1b5/R4pkp/3p2p1/2pPr3/2P5/1P1B4/5PPP/R5K1 b - - 0 24",
    "solution": [
      "Rxa7",
      "Rxa7",
      "Re1+",
      "Bf1",
      "Bf5"
    ],
    "solutionUci": [
      "a8a7",
      "a1a7",
      "e5e1",
      "d3f1",
      "c8f5"
    ],
    "description": "Black to move. Themes: Decisive Advantage, DefensiveMove, Endgame, Long Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1563,
    "themes": "advantage defensiveMove endgame long",
    "preMove": "a2a7",
    "preMoveFen": "r1b5/p4pkp/3p2p1/2pPr3/2P5/1P1B4/R4PPP/R5K1 w - - 0 24"
  },
  {
    "id": "00RbX",
    "puzzleIndex": 556,
    "title": "Exercise 556: White to Move",
    "fen": "3r2k1/2q2ppp/b3n3/p1bN4/2p1P3/P3QN2/1PP2PPP/4R1K1 w - - 2 23",
    "solution": [
      "Nxc7",
      "Bxe3",
      "Nxe6",
      "Bxf2+",
      "Kxf2"
    ],
    "solutionUci": [
      "d5c7",
      "c5e3",
      "c7e6",
      "e3f2",
      "g1f2"
    ],
    "description": "White to move. Themes: Decisive Advantage, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1616,
    "themes": "advantage long middlegame",
    "preMove": "e7c5",
    "preMoveFen": "3r2k1/2q1bppp/b3n3/p2N4/2p1P3/P3QN2/1PP2PPP/4R1K1 b - - 1 22"
  },
  {
    "id": "00Rep",
    "puzzleIndex": 557,
    "title": "Exercise 557: Black to Move",
    "fen": "8/8/N1k5/p7/2p5/1P4P1/P6P/6K1 b - - 0 51",
    "solution": [
      "c3",
      "b4",
      "c2"
    ],
    "solutionUci": [
      "c4c3",
      "b3b4",
      "c3c2"
    ],
    "description": "Black to move. Themes: AdvancedPawn, Crushing Advantage, Endgame, Knight Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1409,
    "themes": "advancedPawn crushing endgame knightEndgame short",
    "preMove": "c5a6",
    "preMoveFen": "8/8/b1k5/p1N5/2p5/1P4P1/P6P/6K1 w - - 1 51"
  },
  {
    "id": "00Rmm",
    "puzzleIndex": 558,
    "title": "Exercise 558: Black to Move",
    "fen": "2rr2k1/5ppp/p7/1p1nP3/1B1P1PP1/PK5P/2R5/3R4 b - - 5 30",
    "solution": [
      "Rxc2",
      "Kxc2",
      "Ne3+",
      "Kd3",
      "Nxd1"
    ],
    "solutionUci": [
      "c8c2",
      "b3c2",
      "d5e3",
      "c2d3",
      "e3d1"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Attraction Sacrifice, Endgame, Fork, Long Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1451,
    "themes": "advantage attraction endgame fork long",
    "preMove": "e2c2",
    "preMoveFen": "2rr2k1/5ppp/p7/1p1nP3/1B1P1PP1/PK5P/4R3/3R4 w - - 4 30"
  },
  {
    "id": "00RtC",
    "puzzleIndex": 559,
    "title": "Exercise 559: Black to Move",
    "fen": "r4k2/ppp3p1/3p3r/2q5/1PNnP3/2Q2PBp/P4R1P/5RK1 b - - 0 25",
    "solution": [
      "Ne2+",
      "Kh1",
      "Qxf2",
      "Qxg7+",
      "Kxg7"
    ],
    "solutionUci": [
      "d4e2",
      "g1h1",
      "c5f2",
      "c3g7",
      "f8g7"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Deflection, Discovered Attack, Long Tactic, Middlegame, Pin",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 1948,
    "themes": "advantage deflection discoveredAttack long middlegame pin",
    "preMove": "b2b4",
    "preMoveFen": "r4k2/ppp3p1/3p3r/2q5/2NnP3/2Q2PBp/PP3R1P/5RK1 w - - 4 25"
  },
  {
    "id": "00Rue",
    "puzzleIndex": 560,
    "title": "Exercise 560: Black to Move",
    "fen": "r2qkb1r/pp1nppp1/2p2n1p/3p1b2/2PP4/BP2PN2/P4PPP/RN1QKB1R b KQkq - 0 7",
    "solution": [
      "Bxb1",
      "Rxb1",
      "Qa5+",
      "b4",
      "Qxa3"
    ],
    "solutionUci": [
      "f5b1",
      "a1b1",
      "d8a5",
      "b3b4",
      "a5a3"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Fork, Long Tactic, Opening",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1868,
    "themes": "advantage fork long opening",
    "preMove": "c2c4",
    "preMoveFen": "r2qkb1r/pp1nppp1/2p2n1p/3p1b2/3P4/BP2PN2/P1P2PPP/RN1QKB1R w KQkq - 2 7"
  },
  {
    "id": "00SCA",
    "puzzleIndex": 561,
    "title": "Exercise 561: Black to Move",
    "fen": "8/2Q5/2p2nk1/4K3/2r5/8/8/8 b - - 5 71",
    "solution": [
      "Re4+",
      "Kd6",
      "Ne8+",
      "Kd7",
      "Nxc7"
    ],
    "solutionUci": [
      "c4e4",
      "e5d6",
      "f6e8",
      "d6d7",
      "e8c7"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Fork, Long Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1400,
    "themes": "crushing endgame fork long",
    "preMove": "f4e5",
    "preMoveFen": "8/2Q5/2p2nk1/8/2r2K2/8/8/8 w - - 4 71"
  },
  {
    "id": "00SIq",
    "puzzleIndex": 562,
    "title": "Exercise 562: Black to Move",
    "fen": "r3r1k1/1Q3Rpp/8/pP6/2q5/7P/3R2P1/7K b - - 0 30",
    "solution": [
      "Qxf7",
      "Qxf7+",
      "Kxf7"
    ],
    "solutionUci": [
      "c4f7",
      "b7f7",
      "g8f7"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1903,
    "themes": "crushing endgame short",
    "preMove": "f1f7",
    "preMoveFen": "r3r1k1/1Q3ppp/8/pP6/2q5/7P/3R2P1/5R1K w - - 0 30"
  },
  {
    "id": "00STy",
    "puzzleIndex": 563,
    "title": "Exercise 563: White to Move",
    "fen": "8/1R5R/4kpp1/4p3/4P2K/5P1P/7r/6r1 w - - 11 41",
    "solution": [
      "Rb6#"
    ],
    "solutionUci": [
      "b7b6"
    ],
    "description": "White to move. Themes: Endgame, Master, Checkmate, Mate in 1, One-Move Tactic, Rook Endgame",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1525,
    "themes": "endgame master mate mateIn1 oneMove rookEndgame",
    "preMove": "a2h2",
    "preMoveFen": "8/1R5R/4kpp1/4p3/4P2K/5P1P/r7/6r1 b - - 10 40"
  },
  {
    "id": "00SU7",
    "puzzleIndex": 564,
    "title": "Exercise 564: Black to Move",
    "fen": "2rqr1k1/B2b1ppp/5n2/8/7Q/3B4/P1P2PPP/R3R1K1 b - - 4 22",
    "solution": [
      "Rxe1+",
      "Rxe1",
      "Qa5",
      "Ra1",
      "Qxa7"
    ],
    "solutionUci": [
      "e8e1",
      "a1e1",
      "d8a5",
      "e1a1",
      "a5a7"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Fork, Long Tactic, Middlegame",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1549,
    "themes": "advantage fork long middlegame",
    "preMove": "d4h4",
    "preMoveFen": "2rqr1k1/B2b1ppp/5n2/8/3Q4/3B4/P1P2PPP/R3R1K1 w - - 3 22"
  },
  {
    "id": "00Se9",
    "puzzleIndex": 565,
    "title": "Exercise 565: White to Move",
    "fen": "5rk1/pp1n1r2/3p2N1/2pQ4/2P5/4P1P1/qP2KPP1/7R w - - 2 25",
    "solution": [
      "Ne7+",
      "Kg7",
      "Qg5#"
    ],
    "solutionUci": [
      "g6e7",
      "g8g7",
      "d5g5"
    ],
    "description": "White to move. Themes: Checkmate, Mate in 2, Middlegame, Pin, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1803,
    "themes": "mate mateIn2 middlegame pin short",
    "preMove": "g7f7",
    "preMoveFen": "5rk1/pp1n2r1/3p2N1/2pQ4/2P5/4P1P1/qP2KPP1/7R b - - 1 24"
  },
  {
    "id": "00Sr6",
    "puzzleIndex": 566,
    "title": "Exercise 566: Black to Move",
    "fen": "4r2k/p6p/1p3p2/8/2p2P2/P4Q1q/8/3R1RK1 b - - 1 37",
    "solution": [
      "Rg8+",
      "Kf2",
      "Qh2+"
    ],
    "solutionUci": [
      "e8g8",
      "g1f2",
      "h3h2"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, Master, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1520,
    "themes": "advantage endgame master short",
    "preMove": "b7f3",
    "preMoveFen": "4r2k/pQ5p/1p3p2/8/2p2P2/P6q/8/3R1RK1 w - - 0 37"
  },
  {
    "id": "00T2k",
    "puzzleIndex": 567,
    "title": "Exercise 567: White to Move",
    "fen": "2k5/p3qp2/bpp1p1p1/4r3/P4n1p/5P2/BPQ2B1P/1K1R4 w - - 0 31",
    "solution": [
      "Qxc6+",
      "Kb8",
      "Rd7",
      "Qxd7",
      "Qxd7"
    ],
    "solutionUci": [
      "c2c6",
      "c8b8",
      "d1d7",
      "e7d7",
      "c6d7"
    ],
    "description": "White to move. Themes: Decisive Advantage, Long Tactic, Middlegame, QueensideAttack",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1584,
    "themes": "advantage long middlegame queensideAttack",
    "preMove": "h5e5",
    "preMoveFen": "2k5/p3qp2/bpp1p1p1/4P2r/P4n1p/5P2/BPQ2B1P/1K1R4 b - - 0 30"
  },
  {
    "id": "00T4i",
    "puzzleIndex": 568,
    "title": "Exercise 568: Black to Move",
    "fen": "2r4k/q2b1Q1p/2p2P2/1p2p3/4P3/p2P3R/4N1K1/R7 b - - 0 38",
    "solution": [
      "Bxh3+",
      "Kxh3",
      "Qxf7"
    ],
    "solutionUci": [
      "d7h3",
      "g2h3",
      "a7f7"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Discovered Attack, Middlegame, Short Tactic",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 1540,
    "themes": "crushing discoveredAttack middlegame short",
    "preMove": "h2g2",
    "preMoveFen": "2r4k/q2b1Q1p/2p2P2/1p2p3/4P3/p2P3R/4N1rK/R7 w - - 0 38"
  },
  {
    "id": "00TJN",
    "puzzleIndex": 569,
    "title": "Exercise 569: White to Move",
    "fen": "r3r1k1/pp3pB1/2q3pp/3R4/8/P4Q2/BP3PPP/1b4K1 w - - 0 24",
    "solution": [
      "Qxf7+",
      "Kxf7",
      "Rd7#"
    ],
    "solutionUci": [
      "f3f7",
      "g8f7",
      "d5d7"
    ],
    "description": "White to move. Themes: Attraction Sacrifice, Double Check, KingsideAttack, Checkmate, Mate in 2, Middlegame, Tactical Sacrifice, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1830,
    "themes": "attraction doubleCheck kingsideAttack mate mateIn2 middlegame sacrifice short",
    "preMove": "f5b1",
    "preMoveFen": "r3r1k1/pp3pB1/2q3pp/3R1b2/8/P4Q2/BP3PPP/1R4K1 b - - 0 23"
  },
  {
    "id": "00TLz",
    "puzzleIndex": 570,
    "title": "Exercise 570: White to Move",
    "fen": "8/p3Q2p/5qp1/4p1k1/8/8/Pr4PP/6K1 w - - 2 37",
    "solution": [
      "h4+",
      "Kf5",
      "g4+",
      "Kxg4",
      "Qxf6"
    ],
    "solutionUci": [
      "h2h4",
      "g5f5",
      "g2g4",
      "f5g4",
      "e7f6"
    ],
    "description": "White to move. Themes: Decisive Advantage, Deflection, Endgame, Long Tactic",
    "hint": "Deflect the key defender away from its crucial post!",
    "rating": 1477,
    "themes": "advantage deflection endgame long",
    "preMove": "f4f6",
    "preMoveFen": "8/p3Q2p/6p1/4p1k1/5q2/8/Pr4PP/6K1 b - - 1 36"
  },
  {
    "id": "00TOt",
    "puzzleIndex": 571,
    "title": "Exercise 571: Black to Move",
    "fen": "5bk1/5ppp/8/8/3p4/8/P1KQq2P/2R5 b - - 3 33",
    "solution": [
      "d3+",
      "Kc3",
      "Bb4+"
    ],
    "solutionUci": [
      "d4d3",
      "c2c3",
      "f8b4"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1403,
    "themes": "crushing endgame short",
    "preMove": "a5d2",
    "preMoveFen": "5bk1/5ppp/8/Q7/3p4/8/P1K1q2P/2R5 w - - 2 33"
  },
  {
    "id": "00TRo",
    "puzzleIndex": 572,
    "title": "Exercise 572: White to Move",
    "fen": "7k/2r3p1/1p2p2b/3p2NQ/1q1P4/1p6/5R2/6K1 w - - 2 39",
    "solution": [
      "Qe8+",
      "Qf8",
      "Rxf8#"
    ],
    "solutionUci": [
      "h5e8",
      "b4f8",
      "f2f8"
    ],
    "description": "White to move. Themes: Endgame, Checkmate, Mate in 2, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1695,
    "themes": "endgame mate mateIn2 short",
    "preMove": "f8b4",
    "preMoveFen": "5q1k/2r3p1/1p2p2b/3p2NQ/3P4/1p6/5R2/6K1 b - - 1 38"
  },
  {
    "id": "00TV2",
    "puzzleIndex": 573,
    "title": "Exercise 573: White to Move",
    "fen": "6k1/p1Q2p1p/4p1p1/3p4/1r6/7P/q4PP1/5RK1 w - - 0 27",
    "solution": [
      "Qc8+",
      "Kg7",
      "Qc3+",
      "d4",
      "Qxb4"
    ],
    "solutionUci": [
      "c7c8",
      "g8g7",
      "c8c3",
      "d5d4",
      "c3b4"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Fork, Long Tactic, Master",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1729,
    "themes": "advantage endgame fork long master",
    "preMove": "b2a2",
    "preMoveFen": "6k1/p1Q2p1p/4p1p1/3p4/1r6/7P/Pq3PP1/5RK1 b - - 2 26"
  },
  {
    "id": "00TXF",
    "puzzleIndex": 574,
    "title": "Exercise 574: White to Move",
    "fen": "3R4/6pk/2r2p1p/p1N1P3/1p3P2/1Pb4P/6P1/6K1 w - - 2 34",
    "solution": [
      "e6",
      "Rxe6",
      "Nxe6"
    ],
    "solutionUci": [
      "e5e6",
      "c6e6",
      "c5e6"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1736,
    "themes": "crushing endgame short",
    "preMove": "e6c6",
    "preMoveFen": "3R4/6pk/4rp1p/p1N1P3/1p3P2/1Pb4P/6P1/6K1 b - - 1 33"
  },
  {
    "id": "00Tll",
    "puzzleIndex": 575,
    "title": "Exercise 575: Black to Move",
    "fen": "5r1k/1pN3p1/7p/pP6/P3P3/2PP3P/3BnbPK/R7 b - - 0 27",
    "solution": [
      "Bg3+",
      "Kh1",
      "Bxc7"
    ],
    "solutionUci": [
      "f2g3",
      "h2h1",
      "g3c7"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1513,
    "themes": "advantage endgame fork short",
    "preMove": "d5c7",
    "preMoveFen": "5r1k/1pp3p1/7p/pP1N4/P3P3/2PP3P/3BnbPK/R7 w - - 2 27"
  },
  {
    "id": "00UEs",
    "puzzleIndex": 576,
    "title": "Exercise 576: White to Move",
    "fen": "8/3R3p/6p1/4k3/2Bnp3/1P5P/P6r/4K3 w - - 2 41",
    "solution": [
      "Rd5+",
      "Kf4",
      "Rxd4"
    ],
    "solutionUci": [
      "d7d5",
      "e5f4",
      "d5d4"
    ],
    "description": "White to move. Themes: Decisive Advantage, Deflection, Endgame, Master, Short Tactic",
    "hint": "Deflect the key defender away from its crucial post!",
    "rating": 1495,
    "themes": "advantage deflection endgame master short",
    "preMove": "f6e5",
    "preMoveFen": "8/3R3p/5kp1/8/2Bnp3/1P5P/P6r/4K3 b - - 1 40"
  },
  {
    "id": "00UF4",
    "puzzleIndex": 577,
    "title": "Exercise 577: White to Move",
    "fen": "rnbQ3r/pp2n1bp/2p2k2/1q2p1p1/3P4/5N2/P1P2PPP/R1B1K2R w KQ - 1 14",
    "solution": [
      "Bxg5+",
      "Kf7",
      "Qxe7+"
    ],
    "solutionUci": [
      "c1g5",
      "f6f7",
      "d8e7"
    ],
    "description": "White to move. Themes: Crushing Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1599,
    "themes": "crushing middlegame short",
    "preMove": "f8g7",
    "preMoveFen": "rnbQ1b1r/pp2n2p/2p2k2/1q2p1p1/3P4/5N2/P1P2PPP/R1B1K2R b KQ - 0 13"
  },
  {
    "id": "00UI2",
    "puzzleIndex": 578,
    "title": "Exercise 578: White to Move",
    "fen": "2r3nr/p5pp/b3k3/3p1p2/4p3/BP3P2/P1PN2PP/2KR3R w - - 0 19",
    "solution": [
      "fxe4",
      "fxe4",
      "Nxe4",
      "dxe4",
      "Rd6+",
      "Kf7",
      "Rxa6"
    ],
    "solutionUci": [
      "f3e4",
      "f5e4",
      "d2e4",
      "d5e4",
      "d1d6",
      "e6f7",
      "d6a6"
    ],
    "description": "White to move. Themes: Clearance Sacrifice, Crushing Advantage, Fork, Middlegame, Tactical Sacrifice, Deep Calculation",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1860,
    "themes": "clearance crushing fork middlegame sacrifice veryLong",
    "preMove": "f6f5",
    "preMoveFen": "2r3nr/p5pp/b3kp2/3p4/4p3/BP3P2/P1PN2PP/2KR3R b - - 0 18"
  },
  {
    "id": "00UJF",
    "puzzleIndex": 579,
    "title": "Exercise 579: Black to Move",
    "fen": "2kr2r1/3q1p2/pp1B1n1p/2pP4/2Pp4/PQ1P3P/4B1PK/R4R2 b - - 0 21",
    "solution": [
      "Qxd6+",
      "Kg1",
      "Rxg2+",
      "Kxg2",
      "Rg8+",
      "Bg4+",
      "Nxg4"
    ],
    "solutionUci": [
      "d7d6",
      "h2g1",
      "g8g2",
      "g1g2",
      "d8g8",
      "e2g4",
      "f6g4"
    ],
    "description": "Black to move. Themes: Attraction Sacrifice, Crushing Advantage, Middlegame, Deep Calculation",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1961,
    "themes": "attraction crushing middlegame veryLong",
    "preMove": "f4d6",
    "preMoveFen": "2kr2r1/3q1p2/pp1b1n1p/2pP4/2Pp1B2/PQ1P3P/4B1PK/R4R2 w - - 2 21"
  },
  {
    "id": "00UOA",
    "puzzleIndex": 580,
    "title": "Exercise 580: White to Move",
    "fen": "6k1/5p1p/4p1p1/p2p4/2rb1P2/P3B1P1/1P2R1KP/8 w - - 0 31",
    "solution": [
      "b3",
      "Rc2",
      "Rxc2"
    ],
    "solutionUci": [
      "b2b3",
      "c4c2",
      "e2c2"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1657,
    "themes": "advantage endgame short",
    "preMove": "f6d4",
    "preMoveFen": "6k1/5p1p/4pbp1/p2p4/2rP1P2/P3B1P1/1P2R1KP/8 b - - 0 30"
  },
  {
    "id": "00UTH",
    "puzzleIndex": 581,
    "title": "Exercise 581: Black to Move",
    "fen": "3r3r/q4pk1/p4N2/1p2PQp1/P4n2/3p1P1P/1P4PK/3RR3 b - - 1 32",
    "solution": [
      "Rxh3+",
      "Qxh3",
      "Nxh3"
    ],
    "solutionUci": [
      "h8h3",
      "f5h3",
      "f4h3"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1830,
    "themes": "crushing middlegame short",
    "preMove": "g1h2",
    "preMoveFen": "3r3r/q4pk1/p4N2/1p2PQp1/P4n2/3p1P1P/1P4P1/3RR1K1 w - - 0 32"
  },
  {
    "id": "00UZP",
    "puzzleIndex": 582,
    "title": "Exercise 582: Black to Move",
    "fen": "5r1k/pQ4p1/6qp/5r2/3Pp1b1/2P5/P2B1PPP/R4R1K b - - 0 22",
    "solution": [
      "Rxf2",
      "Rxf2",
      "Rxf2"
    ],
    "solutionUci": [
      "f5f2",
      "f1f2",
      "f8f2"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1723,
    "themes": "crushing middlegame short",
    "preMove": "c7b7",
    "preMoveFen": "5r1k/ppQ3p1/6qp/5r2/3Pp1b1/2P5/P2B1PPP/R4R1K w - - 5 22"
  },
  {
    "id": "00Ueq",
    "puzzleIndex": 583,
    "title": "Exercise 583: White to Move",
    "fen": "r1b3k1/pp4b1/n1pqprQ1/4p3/2P2PP1/P2B4/1P6/R1B1K2R w KQ - 2 20",
    "solution": [
      "Rh8+",
      "Kxh8",
      "Qh7#"
    ],
    "solutionUci": [
      "h1h8",
      "g8h8",
      "g6h7"
    ],
    "description": "White to move. Themes: Attraction Sacrifice, KingsideAttack, Master, Checkmate, Mate in 2, Middlegame, Pin, Tactical Sacrifice, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1725,
    "themes": "attraction kingsideAttack master mate mateIn2 middlegame pin sacrifice short",
    "preMove": "f8f6",
    "preMoveFen": "r1b2rk1/pp4b1/n1pqp1Q1/4p3/2P2PP1/P2B4/1P6/R1B1K2R b KQ - 1 19"
  },
  {
    "id": "00Uwn",
    "puzzleIndex": 584,
    "title": "Exercise 584: White to Move",
    "fen": "3r1rk1/p1p2pbp/1p4p1/7n/4P2q/1P2BP2/P1B3QP/3R1R1K w - - 7 24",
    "solution": [
      "Bg5",
      "Ng3+",
      "Qxg3"
    ],
    "solutionUci": [
      "e3g5",
      "h5g3",
      "g2g3"
    ],
    "description": "White to move. Themes: Decisive Advantage, Fork, Middlegame, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1631,
    "themes": "advantage fork middlegame short",
    "preMove": "h3h4",
    "preMoveFen": "3r1rk1/p1p2pbp/1p4p1/7n/4P3/1P2BP1q/P1B3QP/3R1R1K b - - 6 23"
  },
  {
    "id": "00UyQ",
    "puzzleIndex": 585,
    "title": "Exercise 585: Black to Move",
    "fen": "4r1k1/p1Q2pp1/1p5p/4P3/5r1q/5R2/P3B1PP/R5K1 b - - 0 22",
    "solution": [
      "Rxf3",
      "gxf3",
      "Qd4+",
      "Kg2",
      "Qxa1"
    ],
    "solutionUci": [
      "f4f3",
      "g2f3",
      "h4d4",
      "g1g2",
      "d4a1"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Clearance Sacrifice, Fork, Long Tactic, Middlegame",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1751,
    "themes": "advantage clearance fork long middlegame",
    "preMove": "c5c7",
    "preMoveFen": "4r1k1/p1p2pp1/1p5p/2Q1P3/5r1q/5R2/P3B1PP/R5K1 w - - 0 22"
  },
  {
    "id": "00VDp",
    "puzzleIndex": 586,
    "title": "Exercise 586: White to Move",
    "fen": "3rk2r/pp2qpp1/2b1pn2/6Np/2p4P/2N1RP2/PPPQ2P1/2KR4 w k - 2 18",
    "solution": [
      "Qxd8+",
      "Qxd8",
      "Rxd8+",
      "Kxd8",
      "Nxf7+"
    ],
    "solutionUci": [
      "d2d8",
      "e7d8",
      "d1d8",
      "e8d8",
      "g5f7"
    ],
    "description": "White to move. Themes: Attraction Sacrifice, Crushing Advantage, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1433,
    "themes": "attraction crushing long middlegame",
    "preMove": "a8d8",
    "preMoveFen": "r3k2r/pp2qpp1/2b1pn2/6Np/2p4P/2N1RP2/PPPQ2P1/2KR4 b kq - 1 17"
  },
  {
    "id": "00VEe",
    "puzzleIndex": 587,
    "title": "Exercise 587: White to Move",
    "fen": "5r2/4k3/3pn3/p3r1p1/PpB3K1/1P4P1/3R4/7R w - - 4 48",
    "solution": [
      "Rh7+",
      "Rf7",
      "Rxf7+",
      "Kxf7",
      "Rxd6"
    ],
    "solutionUci": [
      "h1h7",
      "f8f7",
      "h7f7",
      "e7f7",
      "d2d6"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Long Tactic, Master, MasterVsMaster",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1694,
    "themes": "crushing endgame long master masterVsMaster",
    "preMove": "d8f8",
    "preMoveFen": "3r4/4k3/3pn3/p3r1p1/PpB3K1/1P4P1/3R4/7R b - - 3 47"
  },
  {
    "id": "00VIe",
    "puzzleIndex": 588,
    "title": "Exercise 588: Black to Move",
    "fen": "8/8/8/P6p/8/2Rnk3/r7/3KN3 b - - 2 60",
    "solution": [
      "Rd2#"
    ],
    "solutionUci": [
      "a2d2"
    ],
    "description": "Black to move. Themes: Endgame, Checkmate, Mate in 1, One-Move Tactic, VukovicMate",
    "hint": "Look for an immediate checkmate in 1 move!",
    "rating": 1658,
    "themes": "endgame mate mateIn1 oneMove vukovicMate",
    "preMove": "f3e1",
    "preMoveFen": "8/8/8/P6p/8/2RnkN2/r7/3K4 w - - 1 60"
  },
  {
    "id": "00VNr",
    "puzzleIndex": 589,
    "title": "Exercise 589: Black to Move",
    "fen": "5rk1/npp3p1/p3Rr1p/2b5/3N4/4B2P/PPP2PP1/R5K1 b - - 0 22",
    "solution": [
      "Bxd4",
      "Rxf6",
      "Bxf6",
      "Bxa7",
      "b6"
    ],
    "solutionUci": [
      "c5d4",
      "e6f6",
      "d4f6",
      "e3a7",
      "b7b6"
    ],
    "description": "Black to move. Themes: Crushing Advantage, DefensiveMove, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1938,
    "themes": "crushing defensiveMove long middlegame",
    "preMove": "e4e6",
    "preMoveFen": "5rk1/npp3p1/p3pr1p/2b5/3NR3/4B2P/PPP2PP1/R5K1 w - - 5 22"
  },
  {
    "id": "00VQ7",
    "puzzleIndex": 590,
    "title": "Exercise 590: Black to Move",
    "fen": "r2q1r1k/pppn2pp/2n1B3/6B1/8/2N2Q2/PPP3PP/2KR1R2 b - - 0 15",
    "solution": [
      "Qxg5+",
      "Kb1",
      "Rxf3"
    ],
    "solutionUci": [
      "d8g5",
      "c1b1",
      "f8f3"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1546,
    "themes": "crushing middlegame short",
    "preMove": "f4g5",
    "preMoveFen": "r2q1r1k/pppn2pp/2n1B3/6b1/5B2/2N2Q2/PPP3PP/2KR1R2 w - - 1 15"
  },
  {
    "id": "00VRm",
    "puzzleIndex": 591,
    "title": "Exercise 591: Black to Move",
    "fen": "3r2k1/Q4pp1/1p2p2p/8/2P5/1P6/P3qPPP/5RK1 b - - 0 22",
    "solution": [
      "Rd1",
      "Qa8+",
      "Kh7",
      "Qe4+",
      "Qxe4"
    ],
    "solutionUci": [
      "d8d1",
      "a7a8",
      "g8h7",
      "a8e4",
      "e2e4"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Long Tactic, Master",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1461,
    "themes": "crushing endgame long master",
    "preMove": "b7a7",
    "preMoveFen": "3r2k1/pQ3pp1/1p2p2p/8/2P5/1P6/P3qPPP/5RK1 w - - 0 22"
  },
  {
    "id": "00VXe",
    "puzzleIndex": 592,
    "title": "Exercise 592: White to Move",
    "fen": "rn1q1knr/pbpp4/1p2p1Q1/6p1/1bPP3p/2N3B1/PP2PPPP/R3KB1R w KQ - 0 11",
    "solution": [
      "Be5",
      "Rh7",
      "Qxh7"
    ],
    "solutionUci": [
      "g3e5",
      "h8h7",
      "g6h7"
    ],
    "description": "White to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1542,
    "themes": "advantage middlegame short",
    "preMove": "f6g5",
    "preMoveFen": "rn1q1knr/pbpp4/1p2ppQ1/6N1/1bPP3p/2N3B1/PP2PPPP/R3KB1R b KQ - 0 10"
  },
  {
    "id": "00Vdx",
    "puzzleIndex": 593,
    "title": "Exercise 593: Black to Move",
    "fen": "2k3rB/ppp2p1p/2np4/8/4P3/2NB1b2/PPP2PPP/R4RK1 b - - 0 13",
    "solution": [
      "Rxg2+",
      "Kh1",
      "Rg4#"
    ],
    "solutionUci": [
      "g8g2",
      "g1h1",
      "g2g4"
    ],
    "description": "Black to move. Themes: Discovered Attack, DiscoveredCheck, KingsideAttack, Checkmate, Mate in 2, Middlegame, MorphysMate, Short Tactic",
    "hint": "Look for a forcing checkmate sequence in 2 moves!",
    "rating": 1482,
    "themes": "discoveredAttack discoveredCheck kingsideAttack mate mateIn2 middlegame morphysMate short",
    "preMove": "f6h8",
    "preMoveFen": "2k3rr/ppp2p1p/2np1B2/8/4P3/2NB1b2/PPP2PPP/R4RK1 w - - 1 13"
  },
  {
    "id": "00VhV",
    "puzzleIndex": 594,
    "title": "Exercise 594: Black to Move",
    "fen": "5k2/5P2/4K3/4p3/ppp1P1P1/2P1P3/PP6/8 b - - 0 50",
    "solution": [
      "a3",
      "cxb4",
      "axb2"
    ],
    "solutionUci": [
      "a4a3",
      "c3b4",
      "a3b2"
    ],
    "description": "Black to move. Themes: AdvancedPawn, Crushing Advantage, Endgame, Pawn Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1642,
    "themes": "advancedPawn crushing endgame pawnEndgame short",
    "preMove": "g2g4",
    "preMoveFen": "5k2/5P2/4K3/4p3/ppp1P3/2P1P3/PP4P1/8 w - - 2 50"
  },
  {
    "id": "00VoA",
    "puzzleIndex": 595,
    "title": "Exercise 595: White to Move",
    "fen": "r3r1k1/2pqbppp/ppn2n2/3p1b2/NP1P4/P3P1P1/1BQ1NPBP/2R1K2R w K - 2 15",
    "solution": [
      "Qxc6",
      "Qxc6",
      "Rxc6"
    ],
    "solutionUci": [
      "c2c6",
      "d7c6",
      "c1c6"
    ],
    "description": "White to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1448,
    "themes": "advantage middlegame short",
    "preMove": "g4f5",
    "preMoveFen": "r3r1k1/2pqbppp/ppn2n2/3p4/NP1P2b1/P3P1P1/1BQ1NPBP/2R1K2R b K - 1 14"
  },
  {
    "id": "00Vqp",
    "puzzleIndex": 596,
    "title": "Exercise 596: Black to Move",
    "fen": "8/2R2ppp/4p3/p6k/6R1/4P2P/3q1PP1/6K1 b - - 3 33",
    "solution": [
      "Qd1+",
      "Kh2",
      "Qd6+",
      "g3",
      "Qxc7"
    ],
    "solutionUci": [
      "d2d1",
      "g1h2",
      "d1d6",
      "g2g3",
      "d6c7"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Fork, Long Tactic, Queen & Rook Endgame",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1551,
    "themes": "crushing endgame fork long queenRookEndgame",
    "preMove": "c1c7",
    "preMoveFen": "8/5ppp/4p3/p6k/6R1/4P2P/3q1PP1/2R3K1 w - - 2 33"
  },
  {
    "id": "00W5B",
    "puzzleIndex": 597,
    "title": "Exercise 597: White to Move",
    "fen": "1r4k1/p5pp/5p2/2Rb4/1P4P1/P7/3r3P/3B1RK1 w - - 0 35",
    "solution": [
      "Rxd5",
      "Rxd5",
      "Bb3",
      "Kf8",
      "Bxd5"
    ],
    "solutionUci": [
      "c5d5",
      "d2d5",
      "d1b3",
      "g8f8",
      "b3d5"
    ],
    "description": "White to move. Themes: Decisive Advantage, Attraction Sacrifice, Endgame, Long Tactic, Pin, Tactical Sacrifice",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 1402,
    "themes": "advantage attraction endgame long pin sacrifice",
    "preMove": "d3d2",
    "preMoveFen": "1r4k1/p5pp/5p2/2Rb4/1P4P1/P2r4/3P3P/3B1RK1 b - - 3 34"
  },
  {
    "id": "00WTN",
    "puzzleIndex": 598,
    "title": "Exercise 598: Black to Move",
    "fen": "8/7R/3k4/2pnp3/P1B5/3KP3/1r6/8 b - - 2 43",
    "solution": [
      "e4+",
      "Kxe4",
      "Nf6+"
    ],
    "solutionUci": [
      "e5e4",
      "d3e4",
      "d5f6"
    ],
    "description": "Black to move. Themes: Attraction Sacrifice, Crushing Advantage, Endgame, Master, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1994,
    "themes": "attraction crushing endgame master short",
    "preMove": "a6c4",
    "preMoveFen": "8/7R/B2k4/2pnp3/P7/3KP3/1r6/8 w - - 1 43"
  },
  {
    "id": "00WUu",
    "puzzleIndex": 599,
    "title": "Exercise 599: Black to Move",
    "fen": "r3k1nr/pp3ppp/1q2b3/8/1n1B4/6P1/P2QPPBP/R3K1NR b KQkq - 0 13",
    "solution": [
      "Qxd4",
      "Qxd4",
      "Nc2+",
      "Kf1",
      "Nxd4"
    ],
    "solutionUci": [
      "b6d4",
      "d2d4",
      "b4c2",
      "e1f1",
      "c2d4"
    ],
    "description": "Black to move. Themes: Attraction Sacrifice, Crushing Advantage, Fork, Long Tactic, Opening, Tactical Sacrifice",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 1472,
    "themes": "attraction crushing fork long opening sacrifice",
    "preMove": "b2d4",
    "preMoveFen": "r3k1nr/pp3ppp/1q2b3/8/1n1p4/6P1/PB1QPPBP/R3K1NR w KQkq - 0 13"
  },
  {
    "id": "00WVK",
    "puzzleIndex": 600,
    "title": "Exercise 600: White to Move",
    "fen": "k7/7R/p1P5/4K3/1P6/1r5p/8/8 w - - 3 52",
    "solution": [
      "Rh8+",
      "Ka7",
      "c7"
    ],
    "solutionUci": [
      "h7h8",
      "a8a7",
      "c6c7"
    ],
    "description": "White to move. Themes: AdvancedPawn, Crushing Advantage, Endgame, Master, Rook Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 1912,
    "themes": "advancedPawn crushing endgame master rookEndgame short",
    "preMove": "a3b3",
    "preMoveFen": "k7/7R/p1P5/4K3/1P6/r6p/8/8 b - - 2 51"
  },
  {
    "id": "000h0",
    "puzzleIndex": 601,
    "title": "Exercise 601: Black to Move",
    "fen": "5rk1/p5p1/3bRr1p/1Pp4q/3p4/1P1Q1N2/P4PPP/4R1K1 b - - 0 22",
    "solution": [
      "Rxf3",
      "gxf3",
      "Qxh2+",
      "Kf1",
      "Qh3+",
      "Ke2",
      "Qxe6+"
    ],
    "solutionUci": [
      "f6f3",
      "g2f3",
      "h5h2",
      "g1f1",
      "h2h3",
      "f1e2",
      "h3e6"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Interference, KingsideAttack, Middlegame, Deep Calculation",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2046,
    "themes": "advantage interference kingsideAttack middlegame veryLong",
    "preMove": "e4e6",
    "preMoveFen": "5rk1/p5p1/3bpr1p/1Pp4q/3pR3/1P1Q1N2/P4PPP/4R1K1 w - - 4 22"
  },
  {
    "id": "000qP",
    "puzzleIndex": 602,
    "title": "Exercise 602: Black to Move",
    "fen": "8/7R/8/5p2/4bk1P/8/2r5/5KR1 b - - 8 51",
    "solution": [
      "Kf3",
      "Ke1",
      "Rc1+",
      "Kd2",
      "Rxg1"
    ],
    "solutionUci": [
      "f4f3",
      "f1e1",
      "c2c1",
      "e1d2",
      "c1g1"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, ExposedKing, Long Tactic, Skewer",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2146,
    "themes": "crushing endgame exposedKing long skewer",
    "preMove": "f2f1",
    "preMoveFen": "8/7R/8/5p2/4bk1P/8/2r2K2/6R1 w - - 7 51"
  },
  {
    "id": "0018S",
    "puzzleIndex": 603,
    "title": "Exercise 603: White to Move",
    "fen": "2kr3r/p4p2/1p2p2p/1N1p2p1/3Q4/1P1P4/2q2PPP/5RK1 w - - 0 21",
    "solution": [
      "Qa1",
      "a5",
      "Rc1"
    ],
    "solutionUci": [
      "d4a1",
      "a7a5",
      "f1c1"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Pin, Short Tactic",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 2613,
    "themes": "advantage endgame pin short",
    "preMove": "b7b6",
    "preMoveFen": "2kr3r/pp3p2/4p2p/1N1p2p1/3Q4/1P1P4/2q2PPP/5RK1 b - - 1 20"
  },
  {
    "id": "001Oo",
    "puzzleIndex": 604,
    "title": "Exercise 604: White to Move",
    "fen": "6k1/4p1bp/6p1/1p1pP3/qPpPp3/2P1P3/Q2B1KPP/8 w - - 3 24",
    "solution": [
      "Qxa4",
      "bxa4",
      "b5",
      "Kf7",
      "b6"
    ],
    "solutionUci": [
      "a2a4",
      "b5a4",
      "b4b5",
      "g8f7",
      "b5b6"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Long Tactic, Quiet Move",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2078,
    "themes": "crushing endgame long quietMove",
    "preMove": "d1a4",
    "preMoveFen": "6k1/4p1bp/6p1/1p1pP3/1PpPp3/2P1P3/Q2B1KPP/3q4 b - - 2 23"
  },
  {
    "id": "001aK",
    "puzzleIndex": 605,
    "title": "Exercise 605: White to Move",
    "fen": "6k1/5p2/4p3/P1B5/2P4P/4Pnp1/Rb2r3/5K2 w - - 0 34",
    "solution": [
      "Kxe2",
      "g2",
      "e4",
      "Nd4+",
      "Kf2"
    ],
    "solutionUci": [
      "f1e2",
      "g3g2",
      "e3e4",
      "f3d4",
      "e2f2"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Hanging Piece, Long Tactic, Quiet Move",
    "hint": "Look for undefended or hanging material!",
    "rating": 2052,
    "themes": "crushing endgame hangingPiece long quietMove",
    "preMove": "d2e2",
    "preMoveFen": "6k1/5p2/4p3/P1B5/2P4P/4Pnp1/Rb1rN3/5K2 b - - 1 33"
  },
  {
    "id": "002LF",
    "puzzleIndex": 606,
    "title": "Exercise 606: White to Move",
    "fen": "7r/p4pk1/1pp3p1/8/6q1/4Q3/PP1R1P1r/5KN1 w - - 0 39",
    "solution": [
      "Qe5+",
      "f6",
      "Qc7+",
      "Kh6",
      "Qxh2+"
    ],
    "solutionUci": [
      "e3e5",
      "f7f6",
      "e5c7",
      "g7h6",
      "c7h2"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Interference, Long Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2222,
    "themes": "advantage endgame interference long",
    "preMove": "d7g4",
    "preMoveFen": "7r/p2q1pk1/1pp3p1/8/6P1/4Q3/PP1R1P1r/5KN1 b - - 0 38"
  },
  {
    "id": "002LW",
    "puzzleIndex": 607,
    "title": "Exercise 607: White to Move",
    "fen": "3r1rk1/1b3pp1/3p4/p3nPPQ/4P3/3q1BN1/8/2R2RK1 w - - 2 29",
    "solution": [
      "f6",
      "Nxf3+",
      "Rxf3"
    ],
    "solutionUci": [
      "f5f6",
      "e5f3",
      "f1f3"
    ],
    "description": "White to move. Themes: Decisive Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2464,
    "themes": "advantage middlegame short",
    "preMove": "d7e5",
    "preMoveFen": "3r1rk1/1b1n1pp1/3p4/p4PPQ/4P3/3q1BN1/8/2R2RK1 b - - 1 28"
  },
  {
    "id": "002e5",
    "puzzleIndex": 608,
    "title": "Exercise 608: White to Move",
    "fen": "r2q2k1/pp1n2bp/3P2b1/6N1/6Q1/P3P3/6P1/4K2R w K - 2 22",
    "solution": [
      "Qc4+",
      "Kh8",
      "Rxh7+",
      "Bxh7",
      "Nf7+"
    ],
    "solutionUci": [
      "g4c4",
      "g8h8",
      "h1h7",
      "g6h7",
      "g5f7"
    ],
    "description": "White to move. Themes: Crushing Advantage, Long Tactic, Middlegame, Tactical Sacrifice",
    "hint": "Look for a tactical sacrifice that decisively alters the position!",
    "rating": 2602,
    "themes": "crushing long middlegame sacrifice",
    "preMove": "f7g8",
    "preMoveFen": "r2q4/pp1n1kbp/3P2b1/6N1/6Q1/P3P3/6P1/4K2R b K - 1 21"
  },
  {
    "id": "002e8",
    "puzzleIndex": 609,
    "title": "Exercise 609: White to Move",
    "fen": "3rnrk1/1b3pp1/4pb2/p3q3/1p1N4/3B2R1/PPPQN2P/1K4R1 w - - 2 24",
    "solution": [
      "Qh6",
      "g6",
      "Rh3"
    ],
    "solutionUci": [
      "d2h6",
      "g7g6",
      "g3h3"
    ],
    "description": "White to move. Themes: Crushing Advantage, DefensiveMove, Master, Middlegame, Pin, Short Tactic",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 2524,
    "themes": "crushing defensiveMove master middlegame pin short",
    "preMove": "a8d8",
    "preMoveFen": "r3nrk1/1b3pp1/4pb2/p3q3/1p1N4/3B2R1/PPPQN2P/1K4R1 b - - 1 23"
  },
  {
    "id": "002mG",
    "puzzleIndex": 610,
    "title": "Exercise 610: Black to Move",
    "fen": "5r1k/B1p3pp/2Qb1p2/3Pq3/P6P/8/2P2K2/3R1R2 b - - 2 36",
    "solution": [
      "Re8",
      "Qxe8+",
      "Qxe8"
    ],
    "solutionUci": [
      "f8e8",
      "c6e8",
      "e5e8"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Middlegame, Quiet Move, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2377,
    "themes": "advantage middlegame quietMove short",
    "preMove": "g2f2",
    "preMoveFen": "5r1k/B1p3pp/2Qb1p2/3Pq3/P6P/8/2P3K1/3R1R2 w - - 1 36"
  },
  {
    "id": "00347",
    "puzzleIndex": 611,
    "title": "Exercise 611: Black to Move",
    "fen": "8/2p5/8/2pPk2p/8/3K3P/6P1/8 b - - 2 42",
    "solution": [
      "h4",
      "Kc4",
      "Kd6"
    ],
    "solutionUci": [
      "h5h4",
      "d3c4",
      "e5d6"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Pawn Endgame, Quiet Move, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2264,
    "themes": "crushing endgame pawnEndgame quietMove short",
    "preMove": "e3d3",
    "preMoveFen": "8/2p5/8/2pPk2p/8/4K2P/6P1/8 w - - 1 42"
  },
  {
    "id": "003Ec",
    "puzzleIndex": 612,
    "title": "Exercise 612: White to Move",
    "fen": "3r4/p4R2/1pb2Pp1/n1p1Qqkp/8/P7/1P4PP/6RK w - - 3 33",
    "solution": [
      "Qe3+",
      "Qf4",
      "h4+",
      "Kf5",
      "Qh3+"
    ],
    "solutionUci": [
      "e5e3",
      "f5f4",
      "h2h4",
      "g5f5",
      "e3h3"
    ],
    "description": "White to move. Themes: Crushing Advantage, Long Tactic, Middlegame, Pin",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 2245,
    "themes": "crushing long middlegame pin",
    "preMove": "d3f5",
    "preMoveFen": "3r4/p4R2/1pb2Pp1/n1p1Q1kp/8/P2q4/1P4PP/6RK b - - 2 32"
  },
  {
    "id": "003aS",
    "puzzleIndex": 613,
    "title": "Exercise 613: Black to Move",
    "fen": "8/8/5k1p/6pP/1R4P1/1p2KP2/8/1r6 b - - 0 43",
    "solution": [
      "b2",
      "Rb6+",
      "Ke5",
      "f4+",
      "gxf4+"
    ],
    "solutionUci": [
      "b3b2",
      "b4b6",
      "f6e5",
      "f3f4",
      "g5f4"
    ],
    "description": "Black to move. Themes: AdvancedPawn, Crushing Advantage, DefensiveMove, Endgame, Long Tactic, Rook Endgame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2095,
    "themes": "advancedPawn crushing defensiveMove endgame long rookEndgame",
    "preMove": "h4h5",
    "preMoveFen": "8/8/5k1p/6p1/1R4PP/1p2KP2/8/1r6 w - - 0 43"
  },
  {
    "id": "003cs",
    "puzzleIndex": 614,
    "title": "Exercise 614: White to Move",
    "fen": "2r1kbnr/pp4pp/4p3/3pq1N1/8/1P2B3/P3Q1PP/nN3RK1 w k - 0 17",
    "solution": [
      "Rxf8+",
      "Kxf8",
      "Bc5+",
      "Rxc5",
      "Qxe5",
      "Rc1+",
      "Kf2"
    ],
    "solutionUci": [
      "f1f8",
      "e8f8",
      "e3c5",
      "c8c5",
      "e2e5",
      "c5c1",
      "g1f2"
    ],
    "description": "White to move. Themes: Decisive Advantage, Attraction Sacrifice, Discovered Attack, ExposedKing, Middlegame, Tactical Sacrifice, Deep Calculation",
    "hint": "Unleash a devastating discovered check or attack!",
    "rating": 2106,
    "themes": "advantage attraction discoveredAttack exposedKing middlegame sacrifice veryLong",
    "preMove": "d4e5",
    "preMoveFen": "2r1kbnr/pp4pp/4p3/3pP1N1/3q4/1P2B3/P3Q1PP/nN3RK1 b k - 1 16"
  },
  {
    "id": "003md",
    "puzzleIndex": 615,
    "title": "Exercise 615: Black to Move",
    "fen": "r1b1k2N/ppp3pp/2n5/2bp4/7q/1B4n1/PPPP1P1P/RNBQR1K1 b q - 1 10",
    "solution": [
      "Ne4",
      "Rxe4+",
      "dxe4",
      "Qh5+",
      "Qxh5",
      "Bf7+",
      "Qxf7"
    ],
    "solutionUci": [
      "g3e4",
      "e1e4",
      "d5e4",
      "d1h5",
      "h4h5",
      "b3f7",
      "h5f7"
    ],
    "description": "Black to move. Themes: Crushing Advantage, DefensiveMove, Middlegame, Deep Calculation",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2171,
    "themes": "crushing defensiveMove middlegame veryLong",
    "preMove": "f1e1",
    "preMoveFen": "r1b1k2N/ppp3pp/2n5/2bp4/7q/1B4n1/PPPP1P1P/RNBQ1RK1 w q - 0 10"
  },
  {
    "id": "004M1",
    "puzzleIndex": 616,
    "title": "Exercise 616: White to Move",
    "fen": "8/pp3kp1/6p1/2p3P1/3n1NKP/6B1/PPqr2B1/4R3 w - - 6 41",
    "solution": [
      "Be4",
      "Qa4",
      "Bd5+"
    ],
    "solutionUci": [
      "g2e4",
      "c2a4",
      "e4d5"
    ],
    "description": "White to move. Themes: Decisive Advantage, Master, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2667,
    "themes": "advantage master middlegame short",
    "preMove": "f5d4",
    "preMoveFen": "8/pp3kp1/6p1/2p2nP1/5NKP/6B1/PPqr2B1/4R3 b - - 5 40"
  },
  {
    "id": "004Op",
    "puzzleIndex": 617,
    "title": "Exercise 617: Black to Move",
    "fen": "2kr2r1/1bp4n/1pq1p2p/p1P5/1P3B2/P6P/5RP1/RB3QK1 b - - 4 26",
    "solution": [
      "Rd1",
      "Qxd1",
      "Rxg2+",
      "Kf1",
      "Rg1+",
      "Ke2",
      "Rxd1"
    ],
    "solutionUci": [
      "d8d1",
      "f1d1",
      "g8g2",
      "g1f1",
      "g2g1",
      "f1e2",
      "g1d1"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Deflection, KingsideAttack, Middlegame, Pin, Tactical Sacrifice, Skewer, Deep Calculation",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 2204,
    "themes": "crushing deflection kingsideAttack middlegame pin sacrifice skewer veryLong",
    "preMove": "e1f1",
    "preMoveFen": "2kr2r1/1bp4n/1pq1p2p/p1P5/1P3B2/P6P/5RP1/RB2Q1K1 w - - 3 26"
  },
  {
    "id": "004Ys",
    "puzzleIndex": 618,
    "title": "Exercise 618: White to Move",
    "fen": "r4rk1/5pbp/p1n1p1p1/2p3NP/1p1q1B2/3P3Q/PPP3P1/R3R1K1 w - - 3 20",
    "solution": [
      "Be3",
      "Qf6",
      "Rf1",
      "Qe5",
      "hxg6",
      "Qxe3+",
      "Qxe3"
    ],
    "solutionUci": [
      "f4e3",
      "d4f6",
      "e1f1",
      "f6e5",
      "h5g6",
      "e5e3",
      "h3e3"
    ],
    "description": "White to move. Themes: Decisive Advantage, DefensiveMove, Middlegame, Deep Calculation",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2424,
    "themes": "advantage defensiveMove middlegame veryLong",
    "preMove": "d7d4",
    "preMoveFen": "r4rk1/3q1pbp/p1n1p1p1/2p3NP/1p3B2/3P3Q/PPP3P1/R3R1K1 b - - 2 19"
  },
  {
    "id": "004sg",
    "puzzleIndex": 619,
    "title": "Exercise 619: Black to Move",
    "fen": "6k1/p3b2p/1p1pP3/2P3P1/2np3B/P6P/3Q3K/8 b - - 0 38",
    "solution": [
      "Nxd2",
      "c6",
      "d5",
      "g6",
      "Bd6+"
    ],
    "solutionUci": [
      "c4d2",
      "c5c6",
      "d6d5",
      "g5g6",
      "e7d6"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Clearance Sacrifice, Endgame, Hanging Piece, Long Tactic, Quiet Move",
    "hint": "Look for undefended or hanging material!",
    "rating": 2440,
    "themes": "advantage clearance endgame hangingPiece long quietMove",
    "preMove": "b4c5",
    "preMoveFen": "6k1/p3b2p/1p1pP3/2p3P1/1Pnp3B/P6P/3Q3K/8 w - - 0 38"
  },
  {
    "id": "0055Y",
    "puzzleIndex": 620,
    "title": "Exercise 620: White to Move",
    "fen": "r1b2rk1/p3pp2/2B5/2Qpq3/3N2pp/4b3/2P2PPP/1R2K2R w K - 0 24",
    "solution": [
      "fxe3",
      "Qxe3+",
      "Kd1"
    ],
    "solutionUci": [
      "f2e3",
      "e5e3",
      "e1d1"
    ],
    "description": "White to move. Themes: Decisive Advantage, DefensiveMove, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2055,
    "themes": "advantage defensiveMove middlegame short",
    "preMove": "h6e3",
    "preMoveFen": "r1b2rk1/p3pp2/2B4b/2Qpq3/3N2pp/4P3/2P2PPP/1R2K2R b K - 1 23"
  },
  {
    "id": "005YM",
    "puzzleIndex": 621,
    "title": "Exercise 621: Black to Move",
    "fen": "5k2/p4pp1/1qn3r1/3pP2p/3N1P2/2PQ4/Pr3RPP/R5K1 b - - 6 24",
    "solution": [
      "Rxf2",
      "Kxf2",
      "Nxd4",
      "Qxd4",
      "Qb2+"
    ],
    "solutionUci": [
      "b2f2",
      "g1f2",
      "c6d4",
      "d3d4",
      "b6b2"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2429,
    "themes": "advantage long middlegame",
    "preMove": "b3d4",
    "preMoveFen": "5k2/p4pp1/1qn3r1/3pP2p/5P2/1NPQ4/Pr3RPP/R5K1 w - - 5 24"
  },
  {
    "id": "005YX",
    "puzzleIndex": 622,
    "title": "Exercise 622: Black to Move",
    "fen": "2rr4/5pk1/p1Q1N1pp/1p4q1/3pP3/1B1P4/PPP3PP/6RK b - - 0 25",
    "solution": [
      "fxe6",
      "Qb7+",
      "Kh8"
    ],
    "solutionUci": [
      "f7e6",
      "c6b7",
      "g7h8"
    ],
    "description": "Black to move. Themes: DefensiveMove, Equality, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2014,
    "themes": "defensiveMove equality middlegame short",
    "preMove": "c7e6",
    "preMoveFen": "2rr4/2N2pk1/p1Q1b1pp/1p4q1/3pP3/1B1P4/PPP3PP/6RK w - - 7 25"
  },
  {
    "id": "005f3",
    "puzzleIndex": 623,
    "title": "Exercise 623: White to Move",
    "fen": "r5k1/2p1pp2/pp4p1/1q5r/5P2/2QP2R1/PP6/1K4R1 w - - 1 33",
    "solution": [
      "Rxg6+",
      "fxg6",
      "Rxg6+",
      "Kf7",
      "Qg7+",
      "Ke8",
      "Qg8+",
      "Kd7",
      "Qe6+",
      "Kd8",
      "Rg8+"
    ],
    "solutionUci": [
      "g3g6",
      "f7g6",
      "g1g6",
      "g8f7",
      "c3g7",
      "f7e8",
      "g7g8",
      "e8d7",
      "g8e6",
      "d7d8",
      "g6g8"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Tactical Sacrifice, Deep Calculation",
    "hint": "Look for a tactical sacrifice that decisively alters the position!",
    "rating": 2080,
    "themes": "crushing endgame sacrifice veryLong",
    "preMove": "d5h5",
    "preMoveFen": "r5k1/2p1pp2/pp4p1/1q1r4/5P2/2QP2R1/PP6/1K4R1 b - - 0 32"
  },
  {
    "id": "005jR",
    "puzzleIndex": 624,
    "title": "Exercise 624: Black to Move",
    "fen": "8/5p1k/1P4pp/3Qn3/4BP2/6P1/1p2PK1P/2q5 b - - 2 34",
    "solution": [
      "b1=Q",
      "Bxb1",
      "Ng4+",
      "Kf3",
      "Qh1+"
    ],
    "solutionUci": [
      "b2b1q",
      "e4b1",
      "e5g4",
      "f2f3",
      "c1h1"
    ],
    "description": "Black to move. Themes: AdvancedPawn, Crushing Advantage, Endgame, Long Tactic, Promotion",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2718,
    "themes": "advancedPawn crushing endgame long promotion",
    "preMove": "g1f2",
    "preMoveFen": "8/5p1k/1P4pp/3Qn3/4BP2/6P1/1p2P2P/2q3K1 w - - 1 34"
  },
  {
    "id": "005ws",
    "puzzleIndex": 625,
    "title": "Exercise 625: Black to Move",
    "fen": "8/8/4Kpp1/7p/3N2kP/8/8/8 b - - 3 62",
    "solution": [
      "g5",
      "hxg5",
      "fxg5",
      "Kd5",
      "h4",
      "Ke4",
      "h3",
      "Nf3",
      "Kg3"
    ],
    "solutionUci": [
      "g6g5",
      "h4g5",
      "f6g5",
      "e6d5",
      "h5h4",
      "d5e4",
      "h4h3",
      "d4f3",
      "g4g3"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Knight Endgame, Master, MasterVsMaster, Quiet Move, Deep Calculation",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2487,
    "themes": "crushing endgame knightEndgame master masterVsMaster quietMove veryLong",
    "preMove": "d5e6",
    "preMoveFen": "8/8/5pp1/3K3p/3N2kP/8/8/8 w - - 2 62"
  },
  {
    "id": "006NL",
    "puzzleIndex": 626,
    "title": "Exercise 626: Black to Move",
    "fen": "1r6/k2qn1b1/p1N1p1p1/2PpPpN1/2n2P1P/p4B2/1PP2Q2/1K1R3R b - - 0 32",
    "solution": [
      "Nxc6",
      "b3",
      "a2+",
      "Ka1",
      "N4xe5",
      "fxe5",
      "Bxe5+",
      "Kxa2",
      "Rb5"
    ],
    "solutionUci": [
      "e7c6",
      "b2b3",
      "a3a2",
      "b1a1",
      "c4e5",
      "f4e5",
      "g7e5",
      "a1a2",
      "b8b5"
    ],
    "description": "Black to move. Themes: AdvancedPawn, Decisive Advantage, Middlegame, Pin, Deep Calculation",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 2603,
    "themes": "advancedPawn advantage middlegame pin veryLong",
    "preMove": "d4c6",
    "preMoveFen": "1r6/k2qn1b1/p1b1p1p1/2PpPpN1/2nN1P1P/p4B2/1PP2Q2/1K1R3R w - - 0 32"
  },
  {
    "id": "006XF",
    "puzzleIndex": 627,
    "title": "Exercise 627: White to Move",
    "fen": "r5kr/pp1qb1p1/2p4p/3pP2Q/3Pb3/2P1B3/PP4PP/R4RK1 w - - 2 18",
    "solution": [
      "Qf7+",
      "Kh7",
      "Rf6",
      "Bxf6",
      "Qxd7"
    ],
    "solutionUci": [
      "h5f7",
      "g8h7",
      "f1f6",
      "e7f6",
      "f7d7"
    ],
    "description": "White to move. Themes: Decisive Advantage, Long Tactic, Middlegame, Pin",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 2372,
    "themes": "advantage long middlegame pin",
    "preMove": "f5e4",
    "preMoveFen": "r5kr/pp1qb1p1/2p4p/3pPb1Q/3P4/2P1B3/PP4PP/R4RK1 b - - 1 17"
  },
  {
    "id": "006of",
    "puzzleIndex": 628,
    "title": "Exercise 628: Black to Move",
    "fen": "r2qr2k/1pp2Qp1/1b4np/pP2P3/P4n2/B1N2N1P/5PP1/R3R1K1 b - - 0 20",
    "solution": [
      "Qd3",
      "Ne2",
      "Nxe2+",
      "Rxe2",
      "Qxe2"
    ],
    "solutionUci": [
      "d8d3",
      "c3e2",
      "f4e2",
      "e1e2",
      "d3e2"
    ],
    "description": "Black to move. Themes: Decisive Advantage, KingsideAttack, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2593,
    "themes": "advantage kingsideAttack long middlegame",
    "preMove": "b3f7",
    "preMoveFen": "r2qr2k/1pp2pp1/1b4np/pP2P3/P4n2/BQN2N1P/5PP1/R3R1K1 w - - 3 20"
  },
  {
    "id": "0072T",
    "puzzleIndex": 629,
    "title": "Exercise 629: Black to Move",
    "fen": "3q1nk1/1bN2rpp/pp1P4/8/3Nn2b/8/PPP2PPP/R1BQ1RK1 b - - 2 16",
    "solution": [
      "Bxf2+",
      "Rxf2",
      "Nxf2"
    ],
    "solutionUci": [
      "h4f2",
      "f1f2",
      "e4f2"
    ],
    "description": "Black to move. Themes: Decisive Advantage, KingsideAttack, Master, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2304,
    "themes": "advantage kingsideAttack master middlegame short",
    "preMove": "b5d4",
    "preMoveFen": "3q1nk1/1bN2rpp/pp1P4/1N6/4n2b/8/PPP2PPP/R1BQ1RK1 w - - 1 16"
  },
  {
    "id": "0078T",
    "puzzleIndex": 630,
    "title": "Exercise 630: White to Move",
    "fen": "rk5r/1b3R2/pp2p2q/4P2p/B6B/4p2P/PP4P1/5Q1K w - - 0 28",
    "solution": [
      "Rxb7+",
      "Kxb7",
      "Qf7+",
      "Kb8",
      "Be7"
    ],
    "solutionUci": [
      "f7b7",
      "b8b7",
      "f1f7",
      "b7b8",
      "h4e7"
    ],
    "description": "White to move. Themes: Attraction Sacrifice, Crushing Advantage, DefensiveMove, ExposedKing, Long Tactic, Middlegame, QueensideAttack, Tactical Sacrifice",
    "hint": "Look for a tactical sacrifice that decisively alters the position!",
    "rating": 2248,
    "themes": "attraction crushing defensiveMove exposedKing long middlegame queensideAttack sacrifice",
    "preMove": "d4e3",
    "preMoveFen": "rk5r/1b3R2/pp2p2q/4P2p/B2p3B/4R2P/PP4P1/5Q1K b - - 0 27"
  },
  {
    "id": "007gO",
    "puzzleIndex": 631,
    "title": "Exercise 631: Black to Move",
    "fen": "2r3rk/5p2/4p2p/4q3/1Q6/8/1P3PPP/2R2RK1 b - - 1 31",
    "solution": [
      "Qg5",
      "g3",
      "Rxc1"
    ],
    "solutionUci": [
      "e5g5",
      "g2g3",
      "c8c1"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2197,
    "themes": "crushing endgame short",
    "preMove": "a1c1",
    "preMoveFen": "2r3rk/5p2/4p2p/4q3/1Q6/8/1P3PPP/R4RK1 w - - 0 31"
  },
  {
    "id": "008EC",
    "puzzleIndex": 632,
    "title": "Exercise 632: Black to Move",
    "fen": "6k1/4rRp1/p6p/7P/q1pP4/2Pb2Q1/P4RP1/6K1 b - - 0 31",
    "solution": [
      "Rxf7",
      "Qb8+",
      "Kh7",
      "Rxf7",
      "Qd1+",
      "Kf2",
      "Qf1+",
      "Kg3",
      "Qxf7"
    ],
    "solutionUci": [
      "e7f7",
      "g3b8",
      "g8h7",
      "f2f7",
      "a4d1",
      "g1f2",
      "d1f1",
      "f2g3",
      "f1f7"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, Skewer, Deep Calculation",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2437,
    "themes": "advantage endgame skewer veryLong",
    "preMove": "f4f7",
    "preMoveFen": "6k1/4rpp1/p6p/7P/q1pP1R2/2Pb2Q1/P4RP1/6K1 w - - 9 31"
  },
  {
    "id": "008LT",
    "puzzleIndex": 633,
    "title": "Exercise 633: White to Move",
    "fen": "r4r1k/6p1/b3p1nN/p1pp4/1p3P1q/3P1Q1B/PPP2PK1/R6R w - - 1 27",
    "solution": [
      "Nf7+",
      "Rxf7",
      "Bxe6"
    ],
    "solutionUci": [
      "h6f7",
      "f8f7",
      "h3e6"
    ],
    "description": "White to move. Themes: Crushing Advantage, KingsideAttack, Middlegame, Pin, Tactical Sacrifice, Short Tactic",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 2240,
    "themes": "crushing kingsideAttack middlegame pin sacrifice short",
    "preMove": "g8h8",
    "preMoveFen": "r4rk1/6p1/b3p1nN/p1pp4/1p3P1q/3P1Q1B/PPP2PK1/R6R b - - 0 26"
  },
  {
    "id": "008lc",
    "puzzleIndex": 634,
    "title": "Exercise 634: White to Move",
    "fen": "7k/pb1qn1rn/1p2R2Q/2p2p2/2Pp4/3B4/PP3P1P/4RK2 w - - 2 28",
    "solution": [
      "Qxg7+",
      "Kxg7",
      "Rxe7+",
      "Qxe7",
      "Rxe7+"
    ],
    "solutionUci": [
      "h6g7",
      "h8g7",
      "e6e7",
      "d7e7",
      "e1e7"
    ],
    "description": "White to move. Themes: Attraction Sacrifice, Crushing Advantage, ExposedKing, Fork, Long Tactic, Middlegame",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 2031,
    "themes": "attraction crushing exposedKing fork long middlegame",
    "preMove": "g2g7",
    "preMoveFen": "7k/pb1qn2n/1p2R2Q/2p2p2/2Pp4/3B4/PP3PrP/4RK2 b - - 1 27"
  },
  {
    "id": "008nF",
    "puzzleIndex": 635,
    "title": "Exercise 635: Black to Move",
    "fen": "2rq1rk1/7p/1n4pb/1R2Q3/pPpP1P2/P1B5/3N2PP/2R3K1 b - - 0 31",
    "solution": [
      "Re8",
      "Qxe8+",
      "Qxe8"
    ],
    "solutionUci": [
      "f8e8",
      "e5e8",
      "d8e8"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Master, Middlegame, Short Tactic, Trapped Piece",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2194,
    "themes": "crushing master middlegame short trappedPiece",
    "preMove": "e2e5",
    "preMoveFen": "2rq1rk1/7p/1n4pb/1R2p3/pPpP1P2/P1B5/3NQ1PP/2R3K1 w - - 0 31"
  },
  {
    "id": "0091A",
    "puzzleIndex": 636,
    "title": "Exercise 636: White to Move",
    "fen": "5rk1/q4ppp/p3Pb2/3nN3/P2P4/7Q/1r4PP/1R3RK1 w - - 0 25",
    "solution": [
      "exf7+",
      "Rxf7",
      "Qc8+",
      "Rf8",
      "Qe6+"
    ],
    "solutionUci": [
      "e6f7",
      "f8f7",
      "h3c8",
      "f7f8",
      "c8e6"
    ],
    "description": "White to move. Themes: AdvancedPawn, Decisive Advantage, KingsideAttack, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2163,
    "themes": "advancedPawn advantage kingsideAttack long middlegame",
    "preMove": "b8b2",
    "preMoveFen": "1r3rk1/q4ppp/p3Pb2/3nN3/P2P4/7Q/1B4PP/1R3RK1 b - - 0 24"
  },
  {
    "id": "0092V",
    "puzzleIndex": 637,
    "title": "Exercise 637: White to Move",
    "fen": "r2qk1nr/ppp3pp/2n5/1B1p4/1b1Pp3/5Q1P/PP1B1PP1/RN2K2R w KQkq - 0 12",
    "solution": [
      "Bxc6+",
      "bxc6",
      "Qh5+",
      "g6",
      "Qe5+"
    ],
    "solutionUci": [
      "b5c6",
      "b7c6",
      "f3h5",
      "g7g6",
      "h5e5"
    ],
    "description": "White to move. Themes: Crushing Advantage, ExposedKing, Long Tactic, Opening",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2259,
    "themes": "crushing exposedKing long opening",
    "preMove": "e5e4",
    "preMoveFen": "r2qk1nr/ppp3pp/2n5/1B1pp3/1b1P4/5Q1P/PP1B1PP1/RN2K2R b KQkq - 3 11"
  },
  {
    "id": "00A1H",
    "puzzleIndex": 638,
    "title": "Exercise 638: Black to Move",
    "fen": "2r3k1/4brp1/2p3b1/2Pp1qNp/3B3P/2P5/PP3P1K/R2Q2R1 b - - 2 31",
    "solution": [
      "Qf4+",
      "Kg2",
      "Bxg5"
    ],
    "solutionUci": [
      "f5f4",
      "h2g2",
      "e7g5"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2041,
    "themes": "crushing middlegame short",
    "preMove": "f3g5",
    "preMoveFen": "2r3k1/4brp1/2p3b1/2Pp1q1p/3B3P/2P2N2/PP3P1K/R2Q2R1 w - - 1 31"
  },
  {
    "id": "00A8H",
    "puzzleIndex": 639,
    "title": "Exercise 639: White to Move",
    "fen": "1k6/1p3p2/p1p1p3/2P1b3/PP6/1KB5/4q3/1R1R4 w - - 2 39",
    "solution": [
      "Rd8+",
      "Ka7",
      "Re1",
      "Qxe1",
      "Bxe1"
    ],
    "solutionUci": [
      "d1d8",
      "b8a7",
      "b1e1",
      "e2e1",
      "c3e1"
    ],
    "description": "White to move. Themes: Clearance Sacrifice, Crushing Advantage, Endgame, Long Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2624,
    "themes": "clearance crushing endgame long",
    "preMove": "c7e5",
    "preMoveFen": "1k6/1pb2p2/p1p1p3/2P5/PP6/1KB5/4q3/1R1R4 b - - 1 38"
  },
  {
    "id": "00APl",
    "puzzleIndex": 640,
    "title": "Exercise 640: White to Move",
    "fen": "5k2/1p4r1/pb2qp1Q/8/8/3B1bP1/PP3P1P/2R3K1 w - - 1 30",
    "solution": [
      "Bc4",
      "Bd5",
      "Bxd5",
      "Qxd5",
      "Qxf6+"
    ],
    "solutionUci": [
      "d3c4",
      "f3d5",
      "c4d5",
      "e6d5",
      "h6f6"
    ],
    "description": "White to move. Themes: Decisive Advantage, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2390,
    "themes": "advantage long middlegame",
    "preMove": "d8b6",
    "preMoveFen": "3b1k2/1p4r1/p3qp1Q/8/8/3B1bP1/PP3P1P/2R3K1 b - - 0 29"
  },
  {
    "id": "00AXb",
    "puzzleIndex": 641,
    "title": "Exercise 641: White to Move",
    "fen": "5kr1/pp3p1p/1q2pBb1/1B1p4/P7/5P2/1P5P/2Q1K1rR w K - 1 22",
    "solution": [
      "Rxg1",
      "Qxg1+",
      "Bf1",
      "Bc2",
      "Qf4"
    ],
    "solutionUci": [
      "h1g1",
      "b6g1",
      "b5f1",
      "g6c2",
      "c1f4"
    ],
    "description": "White to move. Themes: Decisive Advantage, DefensiveMove, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2112,
    "themes": "advantage defensiveMove long middlegame",
    "preMove": "g2g1",
    "preMoveFen": "5kr1/pp3p1p/1q2pBb1/1B1p4/P7/5P2/1P4rP/2Q1K2R b K - 0 21"
  },
  {
    "id": "00Ac7",
    "puzzleIndex": 642,
    "title": "Exercise 642: White to Move",
    "fen": "8/2p1pk1p/Pp4p1/8/2P2P2/p2r2P1/3PR2P/3K4 w - - 0 34",
    "solution": [
      "a7",
      "Rd8",
      "Re3",
      "a2",
      "Ra3"
    ],
    "solutionUci": [
      "a6a7",
      "d3d8",
      "e2e3",
      "a3a2",
      "e3a3"
    ],
    "description": "White to move. Themes: AdvancedPawn, Decisive Advantage, Endgame, Long Tactic, Rook Endgame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2219,
    "themes": "advancedPawn advantage endgame long rookEndgame",
    "preMove": "a4a3",
    "preMoveFen": "8/2p1pk1p/Pp4p1/8/p1P2P2/3r2P1/3PR2P/3K4 b - - 1 33"
  },
  {
    "id": "00Aul",
    "puzzleIndex": 643,
    "title": "Exercise 643: White to Move",
    "fen": "4r3/1p3R1p/1pb2R1B/8/6k1/8/r6P/6K1 w - - 0 34",
    "solution": [
      "Rg7+",
      "Kh4",
      "Bd2",
      "Re1+",
      "Bxe1+"
    ],
    "solutionUci": [
      "f7g7",
      "g4h4",
      "h6d2",
      "e8e1",
      "d2e1"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Long Tactic, Quiet Move",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2666,
    "themes": "crushing endgame long quietMove",
    "preMove": "h5g4",
    "preMoveFen": "4r3/1p3R1p/1pb2R1B/7k/6P1/8/r6P/6K1 b - - 0 33"
  },
  {
    "id": "00BKa",
    "puzzleIndex": 644,
    "title": "Exercise 644: White to Move",
    "fen": "2r3k1/p1Rb1ppp/2n1pn2/8/8/2P3P1/q4PBP/1rNQK2R w K - 3 17",
    "solution": [
      "Rxc8+",
      "Bxc8",
      "Nxa2",
      "Rxd1+",
      "Kxd1"
    ],
    "solutionUci": [
      "c7c8",
      "d7c8",
      "c1a2",
      "b1d1",
      "e1d1"
    ],
    "description": "White to move. Themes: Decisive Advantage, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2535,
    "themes": "advantage long middlegame",
    "preMove": "f8c8",
    "preMoveFen": "5rk1/p1Rb1ppp/2n1pn2/8/8/2P3P1/q4PBP/1rNQK2R b K - 2 16"
  },
  {
    "id": "00BZ6",
    "puzzleIndex": 645,
    "title": "Exercise 645: Black to Move",
    "fen": "1r1r1bk1/3n1p1p/1qp3p1/2N1p3/PpQ1P3/4BP2/4N1PP/1RR3K1 b - - 1 24",
    "solution": [
      "Bxc5",
      "Bxc5",
      "Nxc5"
    ],
    "solutionUci": [
      "f8c5",
      "e3c5",
      "d7c5"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Master, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2429,
    "themes": "advantage master middlegame short",
    "preMove": "f1c1",
    "preMoveFen": "1r1r1bk1/3n1p1p/1qp3p1/2N1p3/PpQ1P3/4BP2/4N1PP/1R3RK1 w - - 0 24"
  },
  {
    "id": "00Bpq",
    "puzzleIndex": 646,
    "title": "Exercise 646: Black to Move",
    "fen": "7k/pb1r2p1/1pq2n1p/2p1RP2/2P5/1NP1Q1BP/P7/5BK1 b - - 2 37",
    "solution": [
      "Qh1+",
      "Kf2",
      "Rd1",
      "Nd2",
      "Rxd2+"
    ],
    "solutionUci": [
      "c6h1",
      "g1f2",
      "d7d1",
      "b3d2",
      "d1d2"
    ],
    "description": "Black to move. Themes: Decisive Advantage, KingsideAttack, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2222,
    "themes": "advantage kingsideAttack long middlegame",
    "preMove": "c1e3",
    "preMoveFen": "7k/pb1r2p1/1pq2n1p/2p1RP2/2P5/1NP3BP/P7/2Q2BK1 w - - 1 37"
  },
  {
    "id": "00C3O",
    "puzzleIndex": 647,
    "title": "Exercise 647: Black to Move",
    "fen": "r2qkbnr/pp4pp/2p2p2/4n2b/2B1P3/2N2N2/PPP1Q1PP/R1B2RK1 b kq - 1 10",
    "solution": [
      "Bxf3",
      "gxf3",
      "Qd4+"
    ],
    "solutionUci": [
      "h5f3",
      "g2f3",
      "d8d4"
    ],
    "description": "Black to move. Themes: Crushing Advantage, KingsideAttack, Opening, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2037,
    "themes": "crushing kingsideAttack opening short",
    "preMove": "d1e2",
    "preMoveFen": "r2qkbnr/pp4pp/2p2p2/4n2b/2B1P3/2N2N2/PPP3PP/R1BQ1RK1 w kq - 0 10"
  },
  {
    "id": "00CNA",
    "puzzleIndex": 648,
    "title": "Exercise 648: White to Move",
    "fen": "rnbq1r1k/pp1n2b1/3pB1p1/4P1N1/5P2/2p5/PPP3P1/R1BQK3 w Q - 2 14",
    "solution": [
      "Qd3",
      "Qxg5",
      "fxg5"
    ],
    "solutionUci": [
      "d1d3",
      "d8g5",
      "f4g5"
    ],
    "description": "White to move. Themes: Crushing Advantage, Opening, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2730,
    "themes": "crushing opening short",
    "preMove": "h7h8",
    "preMoveFen": "rnbq1r2/pp1n2bk/3pB1p1/4P1N1/5P2/2p5/PPP3P1/R1BQK3 b Q - 1 13"
  },
  {
    "id": "00CbV",
    "puzzleIndex": 649,
    "title": "Exercise 649: White to Move",
    "fen": "2r3k1/5p2/p3p1nQ/3pPP2/2qN4/6BP/7K/4b3 w - - 0 34",
    "solution": [
      "f6",
      "Bxg3+",
      "Kxg3",
      "Qd3+",
      "Nf3",
      "Qxf3+",
      "Kxf3",
      "Nh4+",
      "Qxh4"
    ],
    "solutionUci": [
      "f5f6",
      "e1g3",
      "h2g3",
      "c4d3",
      "d4f3",
      "d3f3",
      "g3f3",
      "g6h4",
      "h6h4"
    ],
    "description": "White to move. Themes: Crushing Advantage, Middlegame, Deep Calculation",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2423,
    "themes": "crushing middlegame veryLong",
    "preMove": "c3e1",
    "preMoveFen": "2r3k1/5p2/p3p1nQ/3pPP2/2qN4/2b3BP/7K/4R3 b - - 0 33"
  },
  {
    "id": "00D12",
    "puzzleIndex": 650,
    "title": "Exercise 650: White to Move",
    "fen": "8/6pp/8/3kP3/1p1P2P1/1rpK3P/4R3/8 w - - 0 40",
    "solution": [
      "e6",
      "c2+",
      "Kxc2",
      "Rc3+",
      "Kd2"
    ],
    "solutionUci": [
      "e5e6",
      "c3c2",
      "d3c2",
      "b3c3",
      "c2d2"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Long Tactic, Rook Endgame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2033,
    "themes": "crushing endgame long rookEndgame",
    "preMove": "a3b3",
    "preMoveFen": "8/6pp/8/3kP3/1p1P2P1/rPpK3P/4R3/8 b - - 1 39"
  },
  {
    "id": "00DKr",
    "puzzleIndex": 651,
    "title": "Exercise 651: Black to Move",
    "fen": "3r1k2/2p1R3/p2p2n1/1p6/1P1P2Q1/7P/5qPK/4R3 b - - 3 42",
    "solution": [
      "Nxe7",
      "Re4",
      "Ke8"
    ],
    "solutionUci": [
      "g6e7",
      "e1e4",
      "f8e8"
    ],
    "description": "Black to move. Themes: Decisive Advantage, DefensiveMove, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2152,
    "themes": "advantage defensiveMove endgame short",
    "preMove": "d1e1",
    "preMoveFen": "3r1k2/2p1R3/p2p2n1/1p6/1P1P2Q1/7P/5qPK/3R4 w - - 2 42"
  },
  {
    "id": "00DZe",
    "puzzleIndex": 652,
    "title": "Exercise 652: Black to Move",
    "fen": "8/5k2/7p/p1P1bPpP/Pp2P3/1P1p1K2/5B2/8 b - - 2 47",
    "solution": [
      "g4+",
      "Ke3",
      "Bd4+",
      "Kxd3",
      "Bxf2"
    ],
    "solutionUci": [
      "g5g4",
      "f3e3",
      "e5d4",
      "e3d3",
      "d4f2"
    ],
    "description": "Black to move. Themes: Bishop Endgame, Crushing Advantage, Deflection, Endgame, Long Tactic, Master, Skewer",
    "hint": "Deflect the key defender away from its crucial post!",
    "rating": 2357,
    "themes": "bishopEndgame crushing deflection endgame long master skewer",
    "preMove": "e3f2",
    "preMoveFen": "8/5k2/7p/p1P1bPpP/Pp2P3/1P1pBK2/8/8 w - - 1 47"
  },
  {
    "id": "00DzI",
    "puzzleIndex": 653,
    "title": "Exercise 653: Black to Move",
    "fen": "8/2p5/2P2k1p/2K1p3/3p2P1/3B1p2/7P/8 b - - 0 42",
    "solution": [
      "Kg5",
      "Kd5",
      "Kf4",
      "h4",
      "Ke3"
    ],
    "solutionUci": [
      "f6g5",
      "c5d5",
      "g5f4",
      "h2h4",
      "f4e3"
    ],
    "description": "Black to move. Themes: Bishop Endgame, Crushing Advantage, Endgame, Long Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2590,
    "themes": "bishopEndgame crushing endgame long",
    "preMove": "d5c5",
    "preMoveFen": "8/2p5/2P2k1p/2pKp3/3p2P1/3B1p2/7P/8 w - - 0 42"
  },
  {
    "id": "00E4Z",
    "puzzleIndex": 654,
    "title": "Exercise 654: Black to Move",
    "fen": "1r4k1/p4p1p/6p1/3rb3/K7/2PpB3/1P1R1PPP/3R4 b - - 2 25",
    "solution": [
      "Rd6",
      "b4",
      "Bxc3",
      "Bc5",
      "Ra6+"
    ],
    "solutionUci": [
      "d5d6",
      "b2b4",
      "e5c3",
      "e3c5",
      "d6a6"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, Long Tactic, Master, MasterVsMaster, Quiet Move",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2290,
    "themes": "advantage endgame long master masterVsMaster quietMove",
    "preMove": "h1d1",
    "preMoveFen": "1r4k1/p4p1p/6p1/3rb3/K7/2PpB3/1P1R1PPP/7R w - - 1 25"
  },
  {
    "id": "00EJb",
    "puzzleIndex": 655,
    "title": "Exercise 655: Black to Move",
    "fen": "6k1/5pp1/2R1p2p/8/P1B5/1P4P1/1q3QKP/3r4 b - - 2 35",
    "solution": [
      "Rd2",
      "Rc8+",
      "Kh7",
      "Bd3+",
      "f5",
      "Rc2",
      "Rxf2+"
    ],
    "solutionUci": [
      "d1d2",
      "c6c8",
      "g8h7",
      "c4d3",
      "f7f5",
      "c8c2",
      "d2f2"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, Pin, Deep Calculation",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 2288,
    "themes": "advantage endgame pin veryLong",
    "preMove": "g1g2",
    "preMoveFen": "6k1/5pp1/2R1p2p/8/P1B5/1P4P1/1q3Q1P/3r2K1 w - - 1 35"
  },
  {
    "id": "00EUu",
    "puzzleIndex": 656,
    "title": "Exercise 656: White to Move",
    "fen": "8/5P1P/1p4Kr/8/6P1/8/2p5/k7 w - - 1 63",
    "solution": [
      "Kxh6",
      "c1=Q+",
      "g5",
      "Qc6+",
      "Kg7"
    ],
    "solutionUci": [
      "g6h6",
      "c2c1q",
      "g4g5",
      "c1c6",
      "h6g7"
    ],
    "description": "White to move. Themes: Crushing Advantage, DefensiveMove, Endgame, Long Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2474,
    "themes": "crushing defensiveMove endgame long",
    "preMove": "h1h6",
    "preMoveFen": "8/5P1P/1p4K1/8/6P1/8/2p5/k6r b - - 0 62"
  },
  {
    "id": "00FGc",
    "puzzleIndex": 657,
    "title": "Exercise 657: Black to Move",
    "fen": "1r4k1/5p2/2q3bp/4R3/p1r5/P1N5/KPP1Q2P/2R5 b - - 3 33",
    "solution": [
      "Rxc3",
      "bxc3",
      "f6"
    ],
    "solutionUci": [
      "c4c3",
      "b2c3",
      "f7f6"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Middlegame, Tactical Sacrifice, Short Tactic",
    "hint": "Look for a tactical sacrifice that decisively alters the position!",
    "rating": 2438,
    "themes": "advantage middlegame sacrifice short",
    "preMove": "b1a2",
    "preMoveFen": "1r4k1/5p2/2q3bp/4R3/p1r5/P1N5/1PP1Q2P/1KR5 w - - 2 33"
  },
  {
    "id": "00Feu",
    "puzzleIndex": 658,
    "title": "Exercise 658: White to Move",
    "fen": "4Rrk1/p6p/1pp2rp1/8/5B1q/4QP1P/P1P2PK1/8 w - - 3 29",
    "solution": [
      "Bg5",
      "Qxg5+",
      "Qxg5"
    ],
    "solutionUci": [
      "f4g5",
      "h4g5",
      "e3g5"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Fork, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 2011,
    "themes": "crushing endgame fork short",
    "preMove": "f7f8",
    "preMoveFen": "4R1k1/p4r1p/1pp2rp1/8/5B1q/4QP1P/P1P2PK1/8 b - - 2 28"
  },
  {
    "id": "00GHw",
    "puzzleIndex": 659,
    "title": "Exercise 659: White to Move",
    "fen": "r1bq1r2/1p4kp/4p1p1/1NpPp1P1/2P1P3/pPQ4B/P7/2KR3n w - - 0 22",
    "solution": [
      "Qxe5+",
      "Kg8",
      "dxe6",
      "Qe7",
      "Rxh1",
      "Qg7",
      "Qxg7+"
    ],
    "solutionUci": [
      "c3e5",
      "g7g8",
      "d5e6",
      "d8e7",
      "d1h1",
      "e7g7",
      "e5g7"
    ],
    "description": "White to move. Themes: Decisive Advantage, Middlegame, Deep Calculation",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2496,
    "themes": "advantage middlegame veryLong",
    "preMove": "f2h1",
    "preMoveFen": "r1bq1r2/1p4kp/4p1p1/1NpPp1P1/2P1P3/pPQ4B/P4n2/2KR3R b - - 1 21"
  },
  {
    "id": "00GWg",
    "puzzleIndex": 660,
    "title": "Exercise 660: Black to Move",
    "fen": "1r1r2k1/pN4pp/2n1b3/2R2p2/2P1p3/8/P4PPP/3BR1K1 b - - 0 26",
    "solution": [
      "Rxb7",
      "Rxc6",
      "Rb1",
      "Kf1",
      "Rdxd1",
      "Rxd1",
      "Rxd1+",
      "Ke2",
      "Bd7"
    ],
    "solutionUci": [
      "b8b7",
      "c5c6",
      "b7b1",
      "g1f1",
      "d8d1",
      "e1d1",
      "b1d1",
      "f1e2",
      "e6d7"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Middlegame, Deep Calculation",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2066,
    "themes": "crushing middlegame veryLong",
    "preMove": "d6b7",
    "preMoveFen": "1r1r2k1/pp4pp/2nNb3/2R2p2/2P1p3/8/P4PPP/3BR1K1 w - - 1 26"
  },
  {
    "id": "00GuG",
    "puzzleIndex": 661,
    "title": "Exercise 661: Black to Move",
    "fen": "8/7p/1KR3k1/8/5p2/5n2/8/8 b - - 1 63",
    "solution": [
      "Kf5",
      "Kc5",
      "h5"
    ],
    "solutionUci": [
      "g6f5",
      "b6c5",
      "h7h5"
    ],
    "description": "Black to move. Themes: Decisive Advantage, DefensiveMove, Endgame, Master, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2550,
    "themes": "advantage defensiveMove endgame master short",
    "preMove": "c8c6",
    "preMoveFen": "2R5/7p/1K4k1/8/5p2/5n2/8/8 w - - 0 63"
  },
  {
    "id": "00Gz6",
    "puzzleIndex": 662,
    "title": "Exercise 662: White to Move",
    "fen": "r7/p4kp1/1p4p1/2qNn3/Q7/4PP2/PP3K2/6R1 w - - 1 26",
    "solution": [
      "Qf4+",
      "Ke6",
      "Qe4",
      "Rf8",
      "Rxg6+"
    ],
    "solutionUci": [
      "a4f4",
      "f7e6",
      "f4e4",
      "a8f8",
      "g1g6"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Fork, Long Tactic, Pin",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 2253,
    "themes": "crushing endgame fork long pin",
    "preMove": "e7c5",
    "preMoveFen": "r7/p3qkp1/1p4p1/3Nn3/Q7/4PP2/PP3K2/6R1 b - - 0 25"
  },
  {
    "id": "00H2I",
    "puzzleIndex": 663,
    "title": "Exercise 663: Black to Move",
    "fen": "4rrk1/ppp2pp1/7p/3n4/3P3q/1P2p2P/PB4P1/R2QRBK1 b - - 3 23",
    "solution": [
      "Qf2+",
      "Kh2",
      "Qxb2"
    ],
    "solutionUci": [
      "h4f2",
      "g1h2",
      "f2b2"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Fork, Middlegame, Short Tactic",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 2052,
    "themes": "crushing fork middlegame short",
    "preMove": "c1b2",
    "preMoveFen": "4rrk1/ppp2pp1/7p/3n4/3P3q/1P2p2P/P5P1/R1BQRBK1 w - - 2 23"
  },
  {
    "id": "00H2L",
    "puzzleIndex": 664,
    "title": "Exercise 664: Black to Move",
    "fen": "8/8/2p2p2/p4P1p/Pk5P/3K2P1/8/8 b - - 2 39",
    "solution": [
      "c5",
      "Ke2",
      "c4",
      "g4",
      "hxg4"
    ],
    "solutionUci": [
      "c6c5",
      "d3e2",
      "c5c4",
      "g3g4",
      "h5g4"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Long Tactic, Pawn Endgame, Quiet Move",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2280,
    "themes": "crushing endgame long pawnEndgame quietMove",
    "preMove": "e3d3",
    "preMoveFen": "8/8/2p2p2/p4P1p/Pk5P/4K1P1/8/8 w - - 1 39"
  },
  {
    "id": "00H5n",
    "puzzleIndex": 665,
    "title": "Exercise 665: White to Move",
    "fen": "8/5Rpk/3p3p/p1qPp3/P7/5N1P/1Q3nPK/2r5 w - - 0 36",
    "solution": [
      "Qb7",
      "Rh1+",
      "Kg3",
      "Ne4+",
      "Kg4",
      "Nf6+",
      "Rxf6",
      "Qb4+",
      "Qxb4"
    ],
    "solutionUci": [
      "b2b7",
      "c1h1",
      "h2g3",
      "f2e4",
      "g3g4",
      "e4f6",
      "f7f6",
      "c5b4",
      "b7b4"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Pin, Quiet Move, Deep Calculation",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 2348,
    "themes": "advantage endgame pin quietMove veryLong",
    "preMove": "e4f2",
    "preMoveFen": "8/5Rpk/3p3p/p1qPp3/P3n3/5N1P/1Q3PPK/2r5 b - - 0 35"
  },
  {
    "id": "00IFk",
    "puzzleIndex": 666,
    "title": "Exercise 666: White to Move",
    "fen": "r1b4r/ppk2ppp/2p5/6B1/2P5/2n3P1/P1P1B2P/2KR3R w - - 1 17",
    "solution": [
      "Bf4+",
      "Kb6",
      "c5+",
      "Kxc5",
      "Be3+"
    ],
    "solutionUci": [
      "g5f4",
      "c7b6",
      "c4c5",
      "b6c5",
      "f4e3"
    ],
    "description": "White to move. Themes: Attraction Sacrifice, Crushing Advantage, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2150,
    "themes": "attraction crushing long middlegame",
    "preMove": "d5c3",
    "preMoveFen": "r1b4r/ppk2ppp/2p5/3n2B1/2P5/6P1/P1P1B2P/2KR3R b - - 0 16"
  },
  {
    "id": "00IKw",
    "puzzleIndex": 667,
    "title": "Exercise 667: Black to Move",
    "fen": "3r2k1/pp1P1p1p/6p1/2R1P2r/5P2/6Pq/3Q3P/3R2K1 b - - 2 33",
    "solution": [
      "Rxd7",
      "Qxd7",
      "Qxh2+",
      "Kf1",
      "Qxg3",
      "Qd8+",
      "Kg7",
      "Qf6+",
      "Kh6",
      "Qg5+",
      "Rxg5"
    ],
    "solutionUci": [
      "d8d7",
      "d2d7",
      "h3h2",
      "g1f1",
      "h2g3",
      "d7d8",
      "g8g7",
      "d8f6",
      "g7h6",
      "f6g5",
      "h5g5"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Deflection, Endgame, Tactical Sacrifice, Deep Calculation",
    "hint": "Look for a tactical sacrifice that decisively alters the position!",
    "rating": 2491,
    "themes": "advantage deflection endgame sacrifice veryLong",
    "preMove": "d4d2",
    "preMoveFen": "3r2k1/pp1P1p1p/6p1/2R1P2r/3Q1P2/6Pq/7P/3R2K1 w - - 1 33"
  },
  {
    "id": "00IpT",
    "puzzleIndex": 668,
    "title": "Exercise 668: White to Move",
    "fen": "r1b4r/pppkn2p/3pNQ2/8/2BpP2p/8/PPPq2PP/R5K1 w - - 3 22",
    "solution": [
      "Qxh8",
      "Kc6",
      "Qe8+"
    ],
    "solutionUci": [
      "f6h8",
      "d7c6",
      "h8e8"
    ],
    "description": "White to move. Themes: Crushing Advantage, Hanging Piece, Middlegame, Short Tactic",
    "hint": "Look for undefended or hanging material!",
    "rating": 2130,
    "themes": "crushing hangingPiece middlegame short",
    "preMove": "d8d7",
    "preMoveFen": "r1bk3r/ppp1n2p/3pNQ2/8/2BpP2p/8/PPPq2PP/R5K1 b - - 2 21"
  },
  {
    "id": "00J5q",
    "puzzleIndex": 669,
    "title": "Exercise 669: White to Move",
    "fen": "8/5Qpk/4p3/1p6/8/pq1bB2P/5PP1/6K1 w - - 0 33",
    "solution": [
      "Bd4",
      "e5",
      "Qxb3"
    ],
    "solutionUci": [
      "e3d4",
      "e6e5",
      "f7b3"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2215,
    "themes": "crushing endgame short",
    "preMove": "a4a3",
    "preMoveFen": "8/5Qpk/4p3/1p6/p7/1q1bB2P/5PP1/6K1 b - - 0 32"
  },
  {
    "id": "00J5r",
    "puzzleIndex": 670,
    "title": "Exercise 670: Black to Move",
    "fen": "r4rk1/1p4p1/p1p1n1PR/q3p3/4P3/2N1QP2/PPP5/2KR4 b - - 0 21",
    "solution": [
      "gxh6",
      "Qxh6",
      "Qc7"
    ],
    "solutionUci": [
      "g7h6",
      "e3h6",
      "a5c7"
    ],
    "description": "Black to move. Themes: Crushing Advantage, DefensiveMove, Master, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2112,
    "themes": "crushing defensiveMove master middlegame short",
    "preMove": "h1h6",
    "preMoveFen": "r4rk1/1p4p1/p1p1n1Pp/q3p3/4P3/2N1QP2/PPP5/2KR3R w - - 0 21"
  },
  {
    "id": "00JFF",
    "puzzleIndex": 671,
    "title": "Exercise 671: White to Move",
    "fen": "4r1k1/ppqb4/6p1/3pb2Q/8/2P5/PP1B2PP/5RK1 w - - 0 21",
    "solution": [
      "Qxg6+",
      "Bg7",
      "Rf7",
      "Qc5+",
      "Kh1",
      "Qf8",
      "Rxf8+"
    ],
    "solutionUci": [
      "h5g6",
      "e5g7",
      "f1f7",
      "c7c5",
      "g1h1",
      "c5f8",
      "f7f8"
    ],
    "description": "White to move. Themes: Crushing Advantage, Middlegame, Pin, Deep Calculation",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 2017,
    "themes": "crushing middlegame pin veryLong",
    "preMove": "h7g6",
    "preMoveFen": "4r1k1/ppqb3p/6B1/3pb2Q/8/2P5/PP1B2PP/5RK1 b - - 0 20"
  },
  {
    "id": "00JH5",
    "puzzleIndex": 672,
    "title": "Exercise 672: White to Move",
    "fen": "8/2Q2pk1/8/3pp2P/2q5/2P5/KP6/8 w - - 2 37",
    "solution": [
      "Qxc4",
      "dxc4",
      "b4"
    ],
    "solutionUci": [
      "c7c4",
      "d5c4",
      "b2b4"
    ],
    "description": "White to move. Themes: Crushing Advantage, DefensiveMove, Endgame, Queen Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2082,
    "themes": "crushing defensiveMove endgame queenEndgame short",
    "preMove": "d3c4",
    "preMoveFen": "8/2Q2pk1/8/3pp2P/8/2Pq4/KP6/8 b - - 1 36"
  },
  {
    "id": "00JMV",
    "puzzleIndex": 673,
    "title": "Exercise 673: Black to Move",
    "fen": "8/1p4pk/pPp4b/P1P1P3/3pq1b1/8/6PP/2B1QRK1 b - - 1 32",
    "solution": [
      "Qxe1",
      "Rxe1",
      "Bxc1"
    ],
    "solutionUci": [
      "e4e1",
      "f1e1",
      "h6c1"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2110,
    "themes": "advantage endgame short",
    "preMove": "c3e1",
    "preMoveFen": "8/1p4pk/pPp4b/P1P1P3/3pq1b1/2Q5/6PP/2B2RK1 w - - 0 32"
  },
  {
    "id": "00JZk",
    "puzzleIndex": 674,
    "title": "Exercise 674: White to Move",
    "fen": "7k/5q1p/3Q2p1/8/P3p3/1p2B2P/1br3P1/R5K1 w - - 1 33",
    "solution": [
      "Rf1",
      "Qxf1+",
      "Kxf1"
    ],
    "solutionUci": [
      "a1f1",
      "f7f1",
      "g1f1"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2060,
    "themes": "crushing endgame short",
    "preMove": "b7f7",
    "preMoveFen": "7k/1q5p/3Q2p1/8/P3p3/1p2B2P/1br3P1/R5K1 b - - 0 32"
  },
  {
    "id": "00JtR",
    "puzzleIndex": 675,
    "title": "Exercise 675: Black to Move",
    "fen": "1rbk3r/3qp1b1/p3P1Bp/1N4p1/8/P5P1/1P2Q1P1/R3K2R b KQ - 0 23",
    "solution": [
      "Qxb5",
      "Qd2+",
      "Kc7",
      "Rc1+",
      "Kb7",
      "Be4+",
      "Ka7"
    ],
    "solutionUci": [
      "d7b5",
      "e2d2",
      "d8c7",
      "a1c1",
      "c7b7",
      "g6e4",
      "b7a7"
    ],
    "description": "Black to move. Themes: Crushing Advantage, DefensiveMove, Middlegame, Deep Calculation",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2109,
    "themes": "crushing defensiveMove middlegame veryLong",
    "preMove": "d5e6",
    "preMoveFen": "1rbk3r/3qp1b1/p3p1Bp/1N1P2p1/8/P5P1/1P2Q1P1/R3K2R w KQ - 2 23"
  },
  {
    "id": "00KNB",
    "puzzleIndex": 676,
    "title": "Exercise 676: White to Move",
    "fen": "3r2k1/2r2p2/4p2p/4N1pQ/1p3P2/4P3/np3P1P/2q2BRK w - - 2 33",
    "solution": [
      "Qxh6",
      "b1=Q",
      "Qxg5+"
    ],
    "solutionUci": [
      "h5h6",
      "b2b1q",
      "h6g5"
    ],
    "description": "White to move. Themes: Crushing Advantage, KingsideAttack, Master, Middlegame, Pin, Short Tactic",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 2499,
    "themes": "crushing kingsideAttack master middlegame pin short",
    "preMove": "c8c7",
    "preMoveFen": "2rr2k1/5p2/4p2p/4N1pQ/1p3P2/4P3/np3P1P/2q2BRK b - - 1 32"
  },
  {
    "id": "00KNK",
    "puzzleIndex": 677,
    "title": "Exercise 677: White to Move",
    "fen": "r3r1k1/p1p4p/3b4/6qN/4p3/1P1b1Q2/P2P1PP1/B5KR w - - 0 23",
    "solution": [
      "Nf6+",
      "Kf8",
      "Nxh7+",
      "Ke7",
      "Bf6+",
      "Qxf6",
      "Qxf6+"
    ],
    "solutionUci": [
      "h5f6",
      "g8f8",
      "f6h7",
      "f8e7",
      "a1f6",
      "g5f6",
      "f3f6"
    ],
    "description": "White to move. Themes: Decisive Advantage, Deflection, DiscoveredCheck, Double Check, Fork, Middlegame, Deep Calculation",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 2023,
    "themes": "advantage deflection discoveredCheck doubleCheck fork middlegame veryLong",
    "preMove": "e5e4",
    "preMoveFen": "r3r1k1/p1p4p/3b4/4p1qN/8/1P1b1Q2/P2P1PP1/B5KR b - - 2 22"
  },
  {
    "id": "00KVF",
    "puzzleIndex": 678,
    "title": "Exercise 678: Black to Move",
    "fen": "4r1k1/p4ppp/bqp2n2/3p4/3P4/2Q5/PP3PPP/RNB1N1K1 b - - 2 16",
    "solution": [
      "Qb5",
      "Nd3",
      "Qxd3"
    ],
    "solutionUci": [
      "b6b5",
      "e1d3",
      "b5d3"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2335,
    "themes": "crushing middlegame short",
    "preMove": "c5c3",
    "preMoveFen": "4r1k1/p4ppp/bqp2n2/2Qp4/3P4/8/PP3PPP/RNB1N1K1 w - - 1 16"
  },
  {
    "id": "00KYC",
    "puzzleIndex": 679,
    "title": "Exercise 679: Black to Move",
    "fen": "5rk1/pR5p/2r1pBp1/4P3/2b5/3p4/P4PPP/4R1K1 b - - 1 27",
    "solution": [
      "Rxf6",
      "exf6",
      "d2",
      "Rd1",
      "Be2"
    ],
    "solutionUci": [
      "f8f6",
      "e5f6",
      "d3d2",
      "e1d1",
      "c4e2"
    ],
    "description": "Black to move. Themes: AdvancedPawn, Clearance Sacrifice, Crushing Advantage, Endgame, Long Tactic, Master, Tactical Sacrifice",
    "hint": "Look for a tactical sacrifice that decisively alters the position!",
    "rating": 2272,
    "themes": "advancedPawn clearance crushing endgame long master sacrifice",
    "preMove": "b1b7",
    "preMoveFen": "5rk1/p6p/2r1pBp1/4P3/2b5/3p4/P4PPP/1R2R1K1 w - - 0 27"
  },
  {
    "id": "00Kd8",
    "puzzleIndex": 680,
    "title": "Exercise 680: Black to Move",
    "fen": "3R4/3P4/8/5p2/5kPp/8/3r2P1/6K1 b - - 2 64",
    "solution": [
      "Kg3",
      "Kf1",
      "fxg4"
    ],
    "solutionUci": [
      "f4g3",
      "g1f1",
      "f5g4"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Endgame, Rook Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2133,
    "themes": "advantage endgame rookEndgame short",
    "preMove": "f2g1",
    "preMoveFen": "3R4/3P4/8/5p2/5kPp/8/3r1KP1/8 w - - 1 64"
  },
  {
    "id": "00KgF",
    "puzzleIndex": 681,
    "title": "Exercise 681: White to Move",
    "fen": "4r3/p6k/1p5P/1P2P1K1/8/5N2/8/8 w - - 1 43",
    "solution": [
      "Kh5",
      "Kg8",
      "Ng5",
      "Rxe5",
      "Kg6",
      "Rxb5",
      "h7+"
    ],
    "solutionUci": [
      "g5h5",
      "h7g8",
      "f3g5",
      "e8e5",
      "h5g6",
      "e5b5",
      "h6h7"
    ],
    "description": "White to move. Themes: AdvancedPawn, Crushing Advantage, Endgame, Quiet Move, Tactical Sacrifice, Deep Calculation",
    "hint": "Look for a tactical sacrifice that decisively alters the position!",
    "rating": 2508,
    "themes": "advancedPawn crushing endgame quietMove sacrifice veryLong",
    "preMove": "g7h7",
    "preMoveFen": "4r3/p5k1/1p5P/1P2P1K1/8/5N2/8/8 b - - 0 42"
  },
  {
    "id": "00Kip",
    "puzzleIndex": 682,
    "title": "Exercise 682: Black to Move",
    "fen": "8/6pp/8/3k1P2/2p3PP/2K5/8/8 b - - 0 50",
    "solution": [
      "Ke5",
      "h5",
      "h6",
      "g5",
      "hxg5"
    ],
    "solutionUci": [
      "d5e5",
      "h4h5",
      "h7h6",
      "g4g5",
      "h6g5"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Long Tactic, Pawn Endgame, Quiet Move",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2645,
    "themes": "crushing endgame long pawnEndgame quietMove",
    "preMove": "f4f5",
    "preMoveFen": "8/6pp/8/3k4/2p2PPP/2K5/8/8 w - - 1 50"
  },
  {
    "id": "00Ksk",
    "puzzleIndex": 683,
    "title": "Exercise 683: White to Move",
    "fen": "6B1/ppp5/7k/6pp/6q1/8/Pb1Q1P1P/5K2 w - - 0 35",
    "solution": [
      "Qd3",
      "Kg7",
      "Qh7+",
      "Kf6",
      "Qf7+"
    ],
    "solutionUci": [
      "d2d3",
      "h6g7",
      "d3h7",
      "g7f6",
      "h7f7"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Long Tactic, Quiet Move",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2355,
    "themes": "crushing endgame long quietMove",
    "preMove": "g7g5",
    "preMoveFen": "6B1/ppp3p1/7k/7p/6q1/8/Pb1Q1P1P/5K2 b - - 7 34"
  },
  {
    "id": "00L53",
    "puzzleIndex": 684,
    "title": "Exercise 684: Black to Move",
    "fen": "3q2k1/1Q4pp/3r4/P7/8/1P6/3p1PPP/3R2K1 b - - 0 35",
    "solution": [
      "Re6",
      "Qb4",
      "Qd4",
      "Qb8+",
      "Kf7",
      "Qb7+",
      "Kg6",
      "g3",
      "Re1+"
    ],
    "solutionUci": [
      "d6e6",
      "b7b4",
      "d8d4",
      "b4b8",
      "g8f7",
      "b8b7",
      "f7g6",
      "g2g3",
      "e6e1"
    ],
    "description": "Black to move. Themes: Clearance Sacrifice, Crushing Advantage, DefensiveMove, Endgame, Quiet Move, Deep Calculation",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2536,
    "themes": "clearance crushing defensiveMove endgame quietMove veryLong",
    "preMove": "a7b7",
    "preMoveFen": "3q2k1/Qp4pp/3r4/P7/8/1P6/3p1PPP/3R2K1 w - - 0 35"
  },
  {
    "id": "00LBF",
    "puzzleIndex": 685,
    "title": "Exercise 685: White to Move",
    "fen": "3r2k1/1b1q1pb1/pp4p1/3rp3/3R2P1/2P2NBP/PP2Q2K/3R4 w - - 1 34",
    "solution": [
      "Rxd5",
      "Bxd5",
      "c4"
    ],
    "solutionUci": [
      "d4d5",
      "b7d5",
      "c3c4"
    ],
    "description": "White to move. Themes: Decisive Advantage, Master, Middlegame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2179,
    "themes": "advantage master middlegame short",
    "preMove": "e7d7",
    "preMoveFen": "3r2k1/1b2qpb1/pp4p1/3rp3/3R2P1/2P2NBP/PP2Q2K/3R4 b - - 0 33"
  },
  {
    "id": "00LRq",
    "puzzleIndex": 686,
    "title": "Exercise 686: White to Move",
    "fen": "1k6/1p1q2r1/P2p3p/1NpPpn1Q/5b2/2P5/1P2B1P1/R6K w - - 4 29",
    "solution": [
      "a7+",
      "Ka8",
      "Nc7+",
      "Qxc7",
      "Qe8+",
      "Qb8",
      "axb8=Q#"
    ],
    "solutionUci": [
      "a6a7",
      "b8a8",
      "b5c7",
      "d7c7",
      "h5e8",
      "c7b8",
      "a7b8q"
    ],
    "description": "White to move. Themes: AdvancedPawn, DiscoveredCheck, Double Check, Checkmate, Mate in 4, Middlegame, Promotion, QueensideAttack, Tactical Sacrifice, Deep Calculation",
    "hint": "Calculate a forcing checkmate combination!",
    "rating": 2219,
    "themes": "advancedPawn discoveredCheck doubleCheck mate mateIn4 middlegame promotion queensideAttack sacrifice veryLong",
    "preMove": "g3g7",
    "preMoveFen": "1k6/1p1q4/P2p3p/1NpPpn1Q/5b2/2P3r1/1P2B1P1/R6K b - - 3 28"
  },
  {
    "id": "00LZl",
    "puzzleIndex": 687,
    "title": "Exercise 687: White to Move",
    "fen": "r2qk2r/ppp2ppp/2n5/3pPb2/1b1n1B2/2NB1N2/PP3PPP/R2QK2R w KQkq - 4 10",
    "solution": [
      "Nxd4",
      "Nxd4",
      "Qa4+",
      "Nc6",
      "Bxf5"
    ],
    "solutionUci": [
      "f3d4",
      "c6d4",
      "d1a4",
      "d4c6",
      "d3f5"
    ],
    "description": "White to move. Themes: Decisive Advantage, Deflection, Fork, Long Tactic, Opening",
    "hint": "Find the fork attacking multiple undefended targets simultaneously!",
    "rating": 2262,
    "themes": "advantage deflection fork long opening",
    "preMove": "f8b4",
    "preMoveFen": "r2qkb1r/ppp2ppp/2n5/3pPb2/3n1B2/2NB1N2/PP3PPP/R2QK2R b KQkq - 3 9"
  },
  {
    "id": "00M7w",
    "puzzleIndex": 688,
    "title": "Exercise 688: White to Move",
    "fen": "r1b1k2r/ppp3pp/2n2p2/2bBp3/2Pq4/3P1QP1/P2B1P1P/1R2K1NR w Kkq - 0 13",
    "solution": [
      "Ne2",
      "Qxf2+",
      "Qxf2",
      "Bxf2+",
      "Kxf2"
    ],
    "solutionUci": [
      "g1e2",
      "d4f2",
      "f3f2",
      "c5f2",
      "e1f2"
    ],
    "description": "White to move. Themes: Crushing Advantage, Long Tactic, Opening",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2308,
    "themes": "crushing long opening",
    "preMove": "f7f6",
    "preMoveFen": "r1b1k2r/ppp2ppp/2n5/2bBp3/2Pq4/3P1QP1/P2B1P1P/1R2K1NR b Kkq - 2 12"
  },
  {
    "id": "00MBF",
    "puzzleIndex": 689,
    "title": "Exercise 689: White to Move",
    "fen": "7k/np1bb1pp/p4p2/2P1pq2/PPQ4P/5PP1/1B5K/3BN3 w - - 1 30",
    "solution": [
      "Bb3",
      "Qh3+",
      "Kg1",
      "Be6",
      "Qxe6",
      "Qxe6",
      "Bxe6"
    ],
    "solutionUci": [
      "d1b3",
      "f5h3",
      "h2g1",
      "d7e6",
      "c4e6",
      "h3e6",
      "b3e6"
    ],
    "description": "White to move. Themes: Decisive Advantage, Middlegame, Quiet Move, Deep Calculation",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2104,
    "themes": "advantage middlegame quietMove veryLong",
    "preMove": "c6d7",
    "preMoveFen": "7k/np2b1pp/p1b2p2/2P1pq2/PPQ4P/5PP1/1B5K/3BN3 b - - 0 29"
  },
  {
    "id": "00MZr",
    "puzzleIndex": 690,
    "title": "Exercise 690: Black to Move",
    "fen": "1k5r/ppp5/2p5/3n4/5pQ1/3P1P1r/PPP2K2/6R1 b - - 3 26",
    "solution": [
      "Rh2+",
      "Rg2",
      "Ne3"
    ],
    "solutionUci": [
      "h3h2",
      "g1g2",
      "d5e3"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2019,
    "themes": "crushing endgame short",
    "preMove": "f1g1",
    "preMoveFen": "1k5r/ppp5/2p5/3n4/5pQ1/3P1P1r/PPP2K2/5R2 w - - 2 26"
  },
  {
    "id": "00Mca",
    "puzzleIndex": 691,
    "title": "Exercise 691: White to Move",
    "fen": "1k6/1Pp2qp1/p1R1r3/6pp/Q6P/1P6/P4PBK/3r4 w - - 6 35",
    "solution": [
      "Qc4",
      "Rxc6",
      "Qxf7"
    ],
    "solutionUci": [
      "a4c4",
      "e6c6",
      "c4f7"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2387,
    "themes": "crushing endgame short",
    "preMove": "e7e6",
    "preMoveFen": "1k6/1Pp1rqp1/p1R5/6pp/Q6P/1P6/P4PBK/3r4 b - - 5 34"
  },
  {
    "id": "00Mei",
    "puzzleIndex": 692,
    "title": "Exercise 692: White to Move",
    "fen": "8/6rk/6p1/1R5p/2pQ1P2/2Pb2P1/qP4PK/8 w - - 1 37",
    "solution": [
      "Qd8",
      "Qa7",
      "Rb8",
      "Qxb8",
      "Qxb8"
    ],
    "solutionUci": [
      "d4d8",
      "a2a7",
      "b5b8",
      "a7b8",
      "d8b8"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Long Tactic, Master, Quiet Move",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2591,
    "themes": "advantage endgame long master quietMove",
    "preMove": "f5d3",
    "preMoveFen": "8/6rk/6p1/1R3b1p/2pQ1P2/2P3P1/qP4PK/8 b - - 0 36"
  },
  {
    "id": "00Mf0",
    "puzzleIndex": 693,
    "title": "Exercise 693: White to Move",
    "fen": "2kr3r/pp1b1p2/2n1p2q/2Pp4/5Np1/1QP3P1/P4PBP/R4RK1 w - - 5 20",
    "solution": [
      "Rfb1",
      "Qxh2+",
      "Kf1",
      "Na5",
      "Qb4"
    ],
    "solutionUci": [
      "f1b1",
      "h6h2",
      "g1f1",
      "c6a5",
      "b3b4"
    ],
    "description": "White to move. Themes: Decisive Advantage, Long Tactic, Master, Middlegame, Quiet Move",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2345,
    "themes": "advantage long master middlegame quietMove",
    "preMove": "g7h6",
    "preMoveFen": "2kr3r/pp1b1pq1/2n1p3/2Pp4/5Np1/1QP3P1/P4PBP/R4RK1 b - - 4 19"
  },
  {
    "id": "00NBR",
    "puzzleIndex": 694,
    "title": "Exercise 694: White to Move",
    "fen": "8/1p3p2/1Pp1k3/p1Pn2p1/P2K3p/7P/4BPP1/8 w - - 2 34",
    "solution": [
      "Bc4",
      "Kd7",
      "Bxd5"
    ],
    "solutionUci": [
      "e2c4",
      "e6d7",
      "c4d5"
    ],
    "description": "White to move. Themes: Crushing Advantage, Endgame, Master, Short Tactic",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2001,
    "themes": "crushing endgame master short",
    "preMove": "e7d5",
    "preMoveFen": "8/1p2np2/1Pp1k3/p1P3p1/P2K3p/7P/4BPP1/8 b - - 1 33"
  },
  {
    "id": "00NGM",
    "puzzleIndex": 695,
    "title": "Exercise 695: Black to Move",
    "fen": "3k1rr1/R2b3Q/2pqp3/8/N2P4/8/5PB1/R4K2 b - - 0 34",
    "solution": [
      "Rxf2+",
      "Ke1",
      "Qb4+",
      "Nc3",
      "Qxc3+",
      "Kxf2",
      "Qxd4+",
      "Kf1",
      "Rf8+"
    ],
    "solutionUci": [
      "f8f2",
      "f1e1",
      "d6b4",
      "a4c3",
      "b4c3",
      "e1f2",
      "c3d4",
      "f2f1",
      "g8f8"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Middlegame, Deep Calculation",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2465,
    "themes": "crushing middlegame veryLong",
    "preMove": "b7a7",
    "preMoveFen": "3k1rr1/pR1b3Q/2pqp3/8/N2P4/8/5PB1/R4K2 w - - 5 34"
  },
  {
    "id": "00Nhl",
    "puzzleIndex": 696,
    "title": "Exercise 696: Black to Move",
    "fen": "5r1r/p6R/k1ppb1n1/4p1Q1/N3P3/1P1P4/P1P3PP/6K1 b - - 0 23",
    "solution": [
      "Nf4",
      "Qxf4",
      "exf4",
      "Rxh8",
      "Rxh8"
    ],
    "solutionUci": [
      "g6f4",
      "g5f4",
      "e5f4",
      "h7h8",
      "f8h8"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Long Tactic, Middlegame",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2351,
    "themes": "advantage long middlegame",
    "preMove": "b7h7",
    "preMoveFen": "5r1r/pR5p/k1ppb1n1/4p1Q1/N3P3/1P1P4/P1P3PP/6K1 w - - 1 23"
  },
  {
    "id": "00Ns0",
    "puzzleIndex": 697,
    "title": "Exercise 697: Black to Move",
    "fen": "r2qr1k1/pn1p2pp/bp3R2/2p1N3/2P5/1PB3Q1/P1P3PP/R5K1 b - - 0 18",
    "solution": [
      "Qxf6",
      "Rf1",
      "Qh6",
      "Ng4",
      "Qg6",
      "Bxg7",
      "Re4",
      "Nf6+",
      "Kxg7"
    ],
    "solutionUci": [
      "d8f6",
      "a1f1",
      "f6h6",
      "e5g4",
      "h6g6",
      "c3g7",
      "e8e4",
      "g4f6",
      "g8g7"
    ],
    "description": "Black to move. Themes: Decisive Advantage, Hanging Piece, Zwischenzug, Middlegame, Deep Calculation",
    "hint": "Look for undefended or hanging material!",
    "rating": 2613,
    "themes": "advantage hangingPiece intermezzo middlegame veryLong",
    "preMove": "f1f6",
    "preMoveFen": "r2qr1k1/pn1p2pp/bp3p2/2p1N3/2P5/1PB3Q1/P1P3PP/R4RK1 w - - 0 18"
  },
  {
    "id": "00OKo",
    "puzzleIndex": 698,
    "title": "Exercise 698: White to Move",
    "fen": "r3rk2/pbq5/1p2pp1p/2p1N3/2PP2Q1/1P1B4/P5PP/R5K1 w - - 2 25",
    "solution": [
      "Rf1",
      "Qg7",
      "Rxf6+",
      "Qxf6",
      "Nd7+"
    ],
    "solutionUci": [
      "a1f1",
      "c7g7",
      "f1f6",
      "g7f6",
      "e5d7"
    ],
    "description": "White to move. Themes: Decisive Advantage, ExposedKing, Long Tactic, Middlegame, Pin, Tactical Sacrifice",
    "hint": "Target the pinned piece that cannot move away!",
    "rating": 2331,
    "themes": "advantage exposedKing long middlegame pin sacrifice",
    "preMove": "g8f8",
    "preMoveFen": "r3r1k1/pbq5/1p2pp1p/2p1N3/2PP2Q1/1P1B4/P5PP/R5K1 b - - 1 24"
  },
  {
    "id": "00OR6",
    "puzzleIndex": 699,
    "title": "Exercise 699: White to Move",
    "fen": "2r4k/5Q1p/p7/1pq5/4p2N/2P4P/PP4P1/4b2K w - - 0 35",
    "solution": [
      "Qf6+",
      "Kg8",
      "Nf5",
      "Qxf5",
      "Qxf5"
    ],
    "solutionUci": [
      "f7f6",
      "h8g8",
      "h4f5",
      "c5f5",
      "f6f5"
    ],
    "description": "White to move. Themes: Decisive Advantage, Endgame, Long Tactic, Quiet Move",
    "hint": "Find the most forcing tactical continuation!",
    "rating": 2265,
    "themes": "advantage endgame long quietMove",
    "preMove": "g3e1",
    "preMoveFen": "2r4k/5Q1p/p7/1pq5/4p2N/2P3bP/PP4P1/4R2K b - - 0 34"
  },
  {
    "id": "00Oyf",
    "puzzleIndex": 700,
    "title": "Exercise 700: Black to Move",
    "fen": "8/1p6/7p/3k1pP1/1P6/3K1P2/6P1/8 b - - 0 39",
    "solution": [
      "hxg5",
      "Kc3",
      "Ke5",
      "Kc4",
      "Kf4",
      "Kc5",
      "Kg3"
    ],
    "solutionUci": [
      "h6g5",
      "d3c3",
      "d5e5",
      "c3c4",
      "e5f4",
      "c4c5",
      "f4g3"
    ],
    "description": "Black to move. Themes: Crushing Advantage, Endgame, Pawn Endgame, Deep Calculation, Zugzwang",
    "hint": "Place the opponent in zugzwang where any move loses!",
    "rating": 2696,
    "themes": "crushing endgame pawnEndgame veryLong zugzwang",
    "preMove": "h4g5",
    "preMoveFen": "8/1p6/7p/3k1pp1/1P5P/3K1P2/6P1/8 w - - 0 39"
  }
];
