import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AnonymousSession',
    required: true,
    index: true
  },
  title: { type: String, required: true, maxlength: 160 },
  sourcePgn: { type: String, required: true, maxlength: 1_000_000 },
  headers: { type: mongoose.Schema.Types.Mixed, default: {} },
  report: { type: mongoose.Schema.Types.Mixed, default: null },
  commentary: { type: [mongoose.Schema.Types.Mixed], default: [] },
  selectedPly: { type: Number, default: 0, min: 0 },
  schemaVersion: { type: Number, default: 1 }
}, { timestamps: true, minimize: false });

analysisSchema.index({ sessionId: 1, updatedAt: -1 });

export default mongoose.models.Analysis || mongoose.model('Analysis', analysisSchema);
