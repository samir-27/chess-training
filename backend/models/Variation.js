import mongoose from 'mongoose';

const variationSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AnonymousSession',
    required: true,
    index: true
  },
  analysisId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Analysis',
    required: true,
    index: true
  },
  branchId: { type: String, required: true, maxlength: 80 },
  rootFen: { type: String, required: true, maxlength: 120 },
  originalPly: { type: Number, required: true, min: 0 },
  moves: { type: [String], required: true, default: [] },
  cursor: { type: Number, required: true, min: 0 }
}, { timestamps: true });

variationSchema.index({ analysisId: 1, branchId: 1 }, { unique: true });

export default mongoose.models.Variation || mongoose.model('Variation', variationSchema);
