import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  cleanPgnText,
  splitPgnGames,
  computeGameFingerprint,
  parsePgnGame,
  selectRecentGames
} from '../services/gameHistoryService.js';

describe('Game History Service & Importer Pipeline', () => {
  const sampleSinglePgn = `[Event "Live Chess"]
[Site "Chess.com"]
[Date "2026.04.15"]
[White "MagnusCarlsen"]
[Black "Hikaru"]
[Result "1-0"]
[WhiteElo "2880"]
[BlackElo "2850"]
[ECO "C50"]
[Opening "Italian Game"]

1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. d3 Nf6 1-0`;

  const sampleMultiPgn = `[Event "Game 1"]
[White "Player1"]
[Black "Player2"]
[Result "1-0"]

1. e4 e5 2. Nf3 1-0

[Event "Game 2"]
[White "Player3"]
[Black "Player4"]
[Result "0-1"]

1. d4 d5 2. c4 0-1`;

  test('cleanPgnText strips UTF-8 BOM and standardizes line breaks', () => {
    const raw = '\uFEFF[Event "Test"]\r\n1. e4 e5\r\n';
    const cleaned = cleanPgnText(raw);
    assert.ok(!cleaned.startsWith('\uFEFF'));
    assert.ok(!cleaned.includes('\r\n'));
    assert.ok(cleaned.includes('\n'));
  });

  test('splitPgnGames accurately detects and splits multi-game PGNs', () => {
    const games = splitPgnGames(sampleMultiPgn);
    assert.equal(games.length, 2);
    assert.ok(games[0].includes('Player1'));
    assert.ok(games[1].includes('Player3'));
  });

  test('parsePgnGame extracts metadata, ratings, openings and normalized moves', () => {
    const parsed = parsePgnGame(sampleSinglePgn, 'upload');
    assert.equal(parsed.game.white, 'MagnusCarlsen');
    assert.equal(parsed.game.black, 'Hikaru');
    assert.equal(parsed.game.whiteElo, 2880);
    assert.equal(parsed.game.blackElo, 2850);
    assert.equal(parsed.game.result, '1-0');
    assert.equal(parsed.game.eco, 'C50');
    assert.equal(parsed.game.opening, 'Italian Game');
    assert.equal(parsed.source, 'chess.com'); // Automatically detected from [Site "Chess.com"]
    assert.ok(parsed.fingerprint);
    assert.ok(parsed.pgn.includes('1. e4 e5'));
  });

  test('computeGameFingerprint produces identical hash for same game moves', () => {
    const pgnA = `[White "A"][Black "B"] 1. e4 e5 2. Nf3 Nc6`;
    const pgnB = `[White "Different"][Black "Header"] 1. e4 e5 2. Nf3 Nc6`;
    const fpA = computeGameFingerprint(pgnA, { White: 'Carlsen', Black: 'Nakamura' }, 'e4 e5 Nf3 Nc6');
    const fpB = computeGameFingerprint(pgnB, { White: 'Carlsen', Black: 'Nakamura' }, 'e4 e5 Nf3 Nc6');
    assert.equal(fpA, fpB);
  });

  test('computeGameFingerprint handles Chess.com game URL external IDs', () => {
    const headers = { Link: 'https://www.chess.com/game/live/123456789' };
    const fp = computeGameFingerprint('', headers);
    assert.equal(fp, 'chesscom:123456789');
  });

  test('selectRecentGames returns no more than ten unique games in newest-first order', () => {
    const games = Array.from({ length: 12 }, (_, index) => ({
      fingerprint: `game-${index}`,
      game: { date: `2026.01.${String(index + 1).padStart(2, '0')}` }
    }));
    games.push(games[11]);

    const recent = selectRecentGames(games);
    assert.equal(recent.length, 10);
    assert.equal(recent[0].fingerprint, 'game-11');
    assert.equal(recent[9].fingerprint, 'game-2');
    assert.equal(new Set(recent.map((game) => game.fingerprint)).size, 10);
  });

  test('rejects malformed PGN without valid moves gracefully', () => {
    const malformed = 'Random invalid text with no legal moves';
    assert.throws(() => parsePgnGame(malformed, 'paste'), /Invalid PGN notation/);
  });
});
