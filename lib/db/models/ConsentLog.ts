import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IConsentLog extends Document {
  userId: mongoose.Types.ObjectId;
  acceptedAt: Date;
  ipAddress: string;
  userAgent: string;
  categories: string[];
}

const ConsentLogSchema = new Schema<IConsentLog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    acceptedAt: { type: Date, default: Date.now, required: true },
    ipAddress: { type: String, required: true },
    userAgent: { type: String, required: true },
    categories: { type: [String], default: ['essential'] },
  },
  { timestamps: false }
);

export const ConsentLog: Model<IConsentLog> =
  mongoose.models.ConsentLog || mongoose.model<IConsentLog>('ConsentLog', ConsentLogSchema);
export default ConsentLog;
