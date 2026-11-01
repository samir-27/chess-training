import process from 'node:process';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Analysis from '../models/Analysis.js';
import GameHistory from '../models/GameHistory.js';
import AnonymousSession from '../models/AnonymousSession.js';
import { parsePgnGame } from '../services/gameHistoryService.js';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chess-training';

export async function runMigration({ cleanup = false } = {}) {
  console.log(`Connecting to MongoDB: ${mongoUri}...`);
  await mongoose.connect(mongoUri);

  try {
    const totalAnalyses = await Analysis.countDocuments();
    console.log(`Found ${totalAnalyses} records in 'analyses' collection.`);

    if (totalAnalyses === 0) {
      console.log('No analyses to migrate.');
      return { total: 0, migrated: 0, duplicates: 0, skipped: 0 };
    }

    const cursor = Analysis.find({}).cursor();
    let migratedCount = 0;
    let duplicateCount = 0;
    let skippedCount = 0;

    for await (const analysis of cursor) {
      if (!analysis.sourcePgn || typeof analysis.sourcePgn !== 'string') {
        skippedCount++;
        continue;
      }

      let userId = analysis.sessionId;
      // If sessionId is missing or invalid, verify or create a fallback session
      if (!userId) {
        let fallbackSession = await AnonymousSession.findOne();
        if (!fallbackSession) {
          fallbackSession = await AnonymousSession.create({
            tokenHash: 'legacy-migration-session',
            expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
          });
        }
        userId = fallbackSession._id;
      }

      try {
        const parsed = parsePgnGame(analysis.sourcePgn, 'paste');

        // Extract accuracy if available from existing report
        let accuracy = null;
        if (analysis.report?.accuracies) {
          const w = analysis.report.accuracies.white;
          const b = analysis.report.accuracies.black;
          if (typeof w === 'number' && typeof b === 'number') {
            accuracy = {
              white: Math.max(0, Math.min(100, Math.round(w * 10) / 10)),
              black: Math.max(0, Math.min(100, Math.round(b * 10) / 10))
            };
          }
        }

        // Detect source from headers if applicable
        let source = 'paste';
        if (
          analysis.headers?.Site?.toLowerCase().includes('chess.com') ||
          analysis.headers?.Link?.toLowerCase().includes('chess.com')
        ) {
          source = 'chess.com';
        }

        // Check if already in GameHistory
        const existing = await GameHistory.findOne({
          userId,
          fingerprint: parsed.fingerprint
        });

        if (existing) {
          // If existing does not have accuracy but analysis has it, update accuracy
          if (!existing.accuracy && accuracy) {
            existing.accuracy = accuracy;
            await existing.save();
          }
          duplicateCount++;
          continue;
        }

        await GameHistory.create({
          userId,
          source,
          externalId: parsed.externalId || analysis.headers?.Link || null,
          fingerprint: parsed.fingerprint,
          game: {
            white: analysis.headers?.White || parsed.game.white,
            black: analysis.headers?.Black || parsed.game.black,
            whiteElo: Number(analysis.headers?.WhiteElo) || parsed.game.whiteElo,
            blackElo: Number(analysis.headers?.BlackElo) || parsed.game.blackElo,
            result: analysis.headers?.Result || parsed.game.result,
            date: analysis.headers?.Date || parsed.game.date,
            timeControl: analysis.headers?.TimeControl || parsed.game.timeControl,
            opening: analysis.headers?.Opening || analysis.report?.opening?.name || parsed.game.opening,
            eco: analysis.headers?.ECO || analysis.report?.opening?.eco || parsed.game.eco
          },
          pgn: analysis.sourcePgn,
          accuracy,
          createdAt: analysis.createdAt || new Date()
        });

        migratedCount++;
      } catch (err) {
        console.warn(`Could not parse analysis ${analysis._id}: ${err.message}`);
        skippedCount++;
      }
    }

    console.log('\n--- Migration Results ---');
    console.log(`Total Examined: ${totalAnalyses}`);
    console.log(`Successfully Migrated: ${migratedCount}`);
    console.log(`Duplicates / Already Migrated: ${duplicateCount}`);
    console.log(`Skipped (malformed): ${skippedCount}`);

    const newHistoryCount = await GameHistory.countDocuments();
    console.log(`Total GameHistory records in database now: ${newHistoryCount}`);

    if (cleanup) {
      console.log('\n[CLEANUP] Cleaning up obsolete full analysis records from "analyses"...');
      const deleteResult = await Analysis.deleteMany({});
      console.log(`Removed ${deleteResult.deletedCount} full analysis documents.`);
    } else {
      console.log('\nOriginal "analyses" documents have been preserved.');
      console.log('To clean up obsolete records after verification, run with --cleanup.');
    }

    return {
      total: totalAnalyses,
      migrated: migratedCount,
      duplicates: duplicateCount,
      skipped: skippedCount
    };
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

if (process.argv[1]?.endsWith('migrateAnalysesToHistory.js')) {
  const cleanup = process.argv.includes('--cleanup');
  runMigration({ cleanup })
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Migration failed:', err);
      process.exit(1);
    });
}
