import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IWorkspace extends Document {
  name: string;
  slug: string;
  logo?: string;
  ownerId: mongoose.Types.ObjectId;
  members: Array<{
    userId: mongoose.Types.ObjectId;
    role: string;
    joinedAt: Date;
  }>;
  plan: {
    tier: 'free' | 'creator' | 'pro' | 'agency';
    billingCycle?: 'monthly' | 'annual';
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    razorpayCustomerId?: string;
    currentPeriodEnd?: Date;
    limits: {
      automations: number;
      messagesPerMonth: number;
      platforms: number;
      teamMembers: number;
    };
  };
  usage: {
    automations: number;
    messagesThisMonth: number;
    connectedPlatforms: number;
    resetAt?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const WorkspaceSchema = new Schema<IWorkspace>(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    logo: String,
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        role: { type: String, enum: ['owner', 'admin', 'member'] },
        joinedAt: { type: Date, default: Date.now },
      },
    ],
    plan: {
      tier: { type: String, enum: ['free', 'creator', 'pro', 'agency'], default: 'free' },
      billingCycle: { type: String, enum: ['monthly', 'annual'] },
      stripeCustomerId: String,
      stripeSubscriptionId: String,
      razorpayCustomerId: String,
      currentPeriodEnd: Date,
      limits: {
        automations: { type: Number, default: 3 },
        messagesPerMonth: { type: Number, default: 1000 },
        platforms: { type: Number, default: 2 },
        teamMembers: { type: Number, default: 1 },
      },
    },
    usage: {
      automations: { type: Number, default: 0 },
      messagesThisMonth: { type: Number, default: 0 },
      connectedPlatforms: { type: Number, default: 0 },
      resetAt: Date,
    },
  },
  { timestamps: true }
);

export const Workspace: Model<IWorkspace> =
  mongoose.models.Workspace || mongoose.model<IWorkspace>('Workspace', WorkspaceSchema);
export default Workspace;
