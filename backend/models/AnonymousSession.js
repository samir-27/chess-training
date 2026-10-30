import mongoose from 'mongoose';

const anonymousSessionSchema = new mongoose.Schema({
  tokenHash: { type: String, required: true, unique: true, index: true },
  expiresAt: { type: Date, required: true, index: { expires: 0 } }
}, { timestamps: true });

export default mongoose.models.AnonymousSession ||
  mongoose.model('AnonymousSession', anonymousSessionSchema);
