import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { migrateWoodpeckerData } from '../src/services/woodpeckerMigration.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🪵 Running Woodpecker Method Migration...');
const { course, stats } = migrateWoodpeckerData();

const outputPath = path.resolve(__dirname, '../src/data/woodpeckerCourse.json');
fs.writeFileSync(outputPath, JSON.stringify(course, null, 2), 'utf-8');

console.log('✅ Woodpecker Migration Complete!');
console.log(`📁 Saved to: ${outputPath}`);
console.log(`📊 Total Puzzles: ${stats.totalPuzzles}`);
console.log(`   - Verified Positions: ${stats.verifiedCount}`);
console.log(`   - Chapters created: ${stats.chaptersCount}`);
console.log(`   - Easy: ${stats.easyCount}`);
console.log(`   - Intermediate: ${stats.intermediateCount}`);
console.log(`   - Advanced: ${stats.advancedCount}`);
