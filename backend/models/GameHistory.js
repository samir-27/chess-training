import mongoose from 'mongoose';

const gameMetadataSchema = new mongoose.Schema({
  white: { type: String, default: 'White', trim: true, maxlength: 100 },
  black: { type: String, default: 'Black', trim: true, maxlength: 100 },
  whiteElo: { type: Number, default: null },
  blackElo: { type: Number, default: null },
  result: { type: String, default: '*', trim: true, maxlength: 20 },
  date: { type: String, default: '', trim: true, maxlength: 30 },
  timeControl: { type: String, default: '', trim: true, maxlength: 40 },
  opening: { type: String, default: '', trim: true, maxlength: 120 },
  eco: { type: String, default: '', trim: true, maxlength: 10 }
}, { _id: false });

const accuracySchema = new mongoose.Schema({
  white: { type: Number, min: 0, max: 100, default: null },
  black: { type: Number, min: 0, max: 100, default: null }
}, { _id: false });

const gameHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AnonymousSession',
    required: true,
    index: true
  },
  source: {
    type: String,
    enum: ['upload', 'paste', 'chess.com'],
    required: true,
    default: 'paste'
  },
  externalId: {
    type: String,
    default: null,
    trim: true,
    maxlength: 255
  },
  fingerprint: {
    type: String,
    required: true,
    trim: true,
    maxlength: 128
  },
  game: {
    type: gameMetadataSchema,
    required: true,
    default: () => ({})
  },
  pgn: {
    type: String,
    required: true,
    maxlength: 1_000_000
  },
  accuracy: {
    type: accuracySchema,
    default: null
  }
}, { timestamps: true });

// Compound indexes for user querying, sorting, and deduplication
gameHistorySchema.index({ userId: 1, fingerprint: 1 }, { unique: true });
gameHistorySchema.index({ userId: 1, createdAt: -1 });
gameHistorySchema.index({ userId: 1, 'game.white': 1 });
gameHistorySchema.index({ userId: 1, 'game.black': 1 });
gameHistorySchema.index({ userId: 1, 'game.result': 1 });

export default mongoose.models.GameHistory || mongoose.model('GameHistory', gameHistorySchema);
