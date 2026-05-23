import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  phone?: string;
  name?: string;
  avatar?: string;
  authProviders: Array<{
    provider: 'google' | 'whatsapp';
    providerId: string;
    connectedAt: Date;
  }>;
  workspaceId?: mongoose.Types.ObjectId;
  role: 'owner' | 'admin' | 'member';
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: {
      email: boolean;
      push: boolean;
      whatsapp: boolean;
    };
    timezone: string;
  };
  consentLog: Array<{
    type: string;
    version: string;
    acceptedAt: Date;
    ip: string;
    userAgent: string;
  }>;
  lastActiveAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, unique: true, index: true, required: true },
    phone: { type: String, sparse: true },
    name: String,
    avatar: String,
    authProviders: [
      {
        provider: { type: String, enum: ['google', 'whatsapp'], required: true },
        providerId: { type: String, required: true },
        connectedAt: { type: Date, default: Date.now },
      },
    ],
    workspaceId: { type: Schema.Types.ObjectId, ref: 'Workspace', index: true },
    role: { type: String, enum: ['owner', 'admin', 'member'], default: 'owner' },
    preferences: {
      theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        whatsapp: { type: Boolean, default: false },
      },
      timezone: { type: String, default: 'UTC' },
    },
    consentLog: [
      {
        type: { type: String },
        version: String,
        acceptedAt: Date,
        ip: String,
        userAgent: String,
      },
    ],
    lastActiveAt: Date,
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
