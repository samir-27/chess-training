#!/usr/bin/env node

/**
 * Universal Chess Course PGN Importer CLI
 * Converts PGN files and directories into Universal Course JSON format
 * 
 * Usage:
 *   node scripts/import-pgn.js <path-to-pgn-or-dir> [options]
 * 
 * Options:
 *   --out <dir>           Output directory (defaults to src/data/courses)
 *   --title <title>       Override course title
 *   --author <author>     Override course author
 *   --category <category> Set course category (Tactics, Opening Repertoire, Endgame, etc.)
 *   --group-by <strategy> Chapter grouping: 'auto', 'white', 'event', 'single'
 *   --type <type>         Default lesson type: 'auto', 'puzzle', 'repertoire', 'game'
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { importPgnToCourse } from '../frontend/src/services/pgnImporter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseArgs(args) {
  const options = {
    inputs: [],
    outDir: path.resolve(__dirname, '../frontend/src/data/courses'),
    title: null,
    author: null,
    category: null,
    groupBy: 'auto',
    defaultType: 'auto'
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--out' && args[i + 1]) {
      options.outDir = path.resolve(process.cwd(), args[++i]);
    } else if (arg === '--title' && args[i + 1]) {
      options.title = args[++i];
    } else if (arg === '--author' && args[i + 1]) {
      options.author = args[++i];
    } else if (arg === '--category' && args[i + 1]) {
      options.category = args[++i];
    } else if (arg === '--group-by' && args[i + 1]) {
      options.groupBy = args[++i];
    } else if (arg === '--type' && args[i + 1]) {
      options.defaultType = args[++i];
    } else if (!arg.startsWith('--')) {
      options.inputs.push(arg);
    }
  }

  return options;
}

function processFile(filePath, options) {
  console.log(`\n📄 Processing: ${path.basename(filePath)}...`);
  const content = fs.readFileSync(filePath, 'utf-8');

  const result = importPgnToCourse(content, {
    courseTitle: options.title,
    courseAuthor: options.author,
    category: options.category,
    chapterGroupBy: options.groupBy,
    defaultType: options.defaultType
  });

  const { success, course, report } = result;

  if (!success || !course) {
    console.error(`❌ Failed to convert ${filePath}`);
    if (report.errors?.length) {
      report.errors.forEach(e => console.error(`   Error: ${e}`));
    }
    return null;
  }

  // Ensure output directory exists
  if (!fs.existsSync(options.outDir)) {
    fs.mkdirSync(options.outDir, { recursive: true });
  }

  const outputFileName = `${course.id}.json`;
  const outputPath = path.join(options.outDir, outputFileName);
  fs.writeFileSync(outputPath, JSON.stringify(course, null, 2), 'utf-8');

  console.log(`✅ Successfully generated course: "${course.title}"`);
  console.log(`   ID: ${course.id}`);
  console.log(`   Output: ${outputPath}`);
  console.log(`   Chapters: ${report.chapterCount}`);
  console.log(`   Lessons: ${report.importedLessons} (Skipped: ${report.skippedGames})`);

  if (report.warnings?.length > 0) {
    console.log(`   ⚠️ Warnings (${report.warnings.length}):`);
    report.warnings.slice(0, 5).forEach(w => console.log(`      - ${w}`));
    if (report.warnings.length > 5) {
      console.log(`      ... and ${report.warnings.length - 5} more`);
    }
  }

  return course;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
♟️  Universal PGN-to-JSON Course Importer CLI
---------------------------------------------
Usage:
  node scripts/import-pgn.js <path-to-pgn-or-directory> [options]

Examples:
  node scripts/import-pgn.js ./src/data/woodpacker.pgn --title "Woodpecker Method"
  node scripts/import-pgn.js ./my-courses/ --group-by auto

Options:
  --out <dir>           Output directory (default: src/data/courses)
  --title <title>       Override course title
  --author <author>     Override course author
  --category <category> Set course category
  --group-by <strategy> Chapter grouping: 'auto', 'white', 'event', 'single'
  --type <type>         Default lesson type: 'auto', 'puzzle', 'repertoire', 'game'
`);
    process.exit(0);
  }

  const options = parseArgs(args);

  if (options.inputs.length === 0) {
    console.error('❌ Error: No input PGN file or directory specified.');
    process.exit(1);
  }

  let totalImported = 0;

  for (const input of options.inputs) {
    const resolvedPath = path.resolve(process.cwd(), input);

    if (!fs.existsSync(resolvedPath)) {
      console.error(`❌ Path not found: ${resolvedPath}`);
      continue;
    }

    const stat = fs.statSync(resolvedPath);
    if (stat.isDirectory()) {
      const files = fs.readdirSync(resolvedPath).filter(f => f.toLowerCase().endsWith('.pgn'));
      console.log(`📂 Found ${files.length} PGN files in directory.`);
      for (const file of files) {
        const fullPath = path.join(resolvedPath, file);
        if (processFile(fullPath, options)) totalImported++;
      }
    } else {
      if (processFile(resolvedPath, options)) totalImported++;
    }
  }

  console.log(`\n🎉 Conversion complete! Converted ${totalImported} course(s).\n`);
}

main();
