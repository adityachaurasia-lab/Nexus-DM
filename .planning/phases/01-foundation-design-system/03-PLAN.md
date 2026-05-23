# Plan 03: Database & Cache Connections

---
wave: 2
depends_on: [01]
files_modified:
  - lib/db/mongodb.ts
  - lib/db/models/User.ts
  - lib/db/models/Workspace.ts
  - lib/cache/redis.ts
  - lib/cache/strategies.ts
  - lib/utils/encryption.ts
  - lib/utils/logger.ts
autonomous: true
requirements: [FOUND-06, FOUND-07]
---

## Objective

Set up MongoDB connection pooling with Mongoose ODM, Upstash Redis client for serverless caching, cache strategies (cache-aside, TTL presets, SWR), and utility modules (encryption, logging).

## Tasks

<task id="03.1">
<title>Create MongoDB connection with Mongoose and pooling</title>
<read_first>
- .env.example (to verify MONGODB_URI variable name)
</read_first>
<action>
Create `lib/db/mongodb.ts`:

```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      console.log('[MongoDB] Connected successfully');
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
```
</action>
<acceptance_criteria>
- `lib/db/mongodb.ts` contains `export async function connectDB`
- `lib/db/mongodb.ts` contains `mongoose.connect`
- `lib/db/mongodb.ts` contains `maxPoolSize`
- `lib/db/mongodb.ts` contains `global.mongooseCache`
</acceptance_criteria>
</task>

<task id="03.2">
<title>Create User and Workspace Mongoose models</title>
<read_first>
- lib/db/mongodb.ts
</read_first>
<action>
Create `lib/db/models/User.ts`:

```typescript
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
```

Create `lib/db/models/Workspace.ts`:

```typescript
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
```
</action>
<acceptance_criteria>
- `lib/db/models/User.ts` contains `export const User`
- `lib/db/models/User.ts` contains `consentLog`
- `lib/db/models/Workspace.ts` contains `export const Workspace`
- `lib/db/models/Workspace.ts` contains `tier: 'free' | 'creator' | 'pro' | 'agency'`
</acceptance_criteria>
</task>

<task id="03.3">
<title>Create Upstash Redis client and cache strategies</title>
<read_first>
- .env.example
</read_first>
<action>
Create `lib/cache/redis.ts`:

```typescript
import { Redis } from '@upstash/redis';

function createRedisClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.warn('[Redis] UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not set — using mock');
    return null;
  }

  return new Redis({ url, token });
}

export const redis = createRedisClient();

export default redis;
```

Create `lib/cache/strategies.ts`:

```typescript
import redis from './redis';

export const TTL = {
  REALTIME: 5,
  SHORT: 60,
  MEDIUM: 300,
  LONG: 3600,
  DAY: 86400,
  WEEK: 604800,
} as const;

export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = TTL.MEDIUM
): Promise<T> {
  if (!redis) return fetcher();

  try {
    const cached = await redis.get(key);
    if (cached !== null && cached !== undefined) {
      return cached as T;
    }
  } catch (err) {
    console.warn('[Cache] Read error:', err);
  }

  const data = await fetcher();

  try {
    await redis.setex(key, ttl, JSON.stringify(data));
  } catch (err) {
    console.warn('[Cache] Write error:', err);
  }

  return data;
}

export const CacheKeys = {
  workspaceDashboard: (id: string) => `workspace:${id}:dashboard`,
  automationList: (id: string) => `workspace:${id}:automations`,
  contactList: (wid: string, page: number) => `workspace:${wid}:contacts:${page}`,
  platformStatus: (wid: string) => `workspace:${wid}:platforms`,
  analyticsDaily: (wid: string, date: string) => `workspace:${wid}:analytics:${date}`,
  rateLimit: (userId: string, action: string) => `rate:${userId}:${action}`,
  session: (userId: string) => `session:${userId}`,
  otp: (phone: string) => `otp:${phone}`,
};
```
</action>
<acceptance_criteria>
- `lib/cache/redis.ts` contains `import { Redis } from '@upstash/redis'`
- `lib/cache/redis.ts` contains `export const redis`
- `lib/cache/strategies.ts` contains `export async function withCache`
- `lib/cache/strategies.ts` contains `export const CacheKeys`
- `lib/cache/strategies.ts` contains `TTL`
</acceptance_criteria>
</task>

<task id="03.4">
<title>Create encryption utility and logger</title>
<read_first>
- .env.example (to verify ENCRYPTION_SECRET variable name)
</read_first>
<action>
Create `lib/utils/encryption.ts`:

```typescript
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

const ALGORITHM = 'aes-256-gcm';

function getKey(): Buffer {
  const secret = process.env.ENCRYPTION_SECRET;
  if (!secret) {
    throw new Error('ENCRYPTION_SECRET environment variable is required');
  }
  return scryptSync(secret, 'nexus-salt', 32);
}

export function encrypt(plaintext: string): string {
  const key = getKey();
  const iv = randomBytes(16);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decrypt(ciphertext: string): string {
  const key = getKey();
  const [ivHex, authTagHex, encryptedHex] = ciphertext.split(':');
  if (!ivHex || !authTagHex || !encryptedHex) {
    throw new Error('Invalid ciphertext format');
  }
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const encrypted = Buffer.from(encryptedHex, 'hex');
  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
}
```

Create `lib/utils/logger.ts`:

```typescript
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_COLORS: Record<LogLevel, string> = {
  debug: '\x1b[36m',
  info: '\x1b[32m',
  warn: '\x1b[33m',
  error: '\x1b[31m',
};

const RESET = '\x1b[0m';

function log(level: LogLevel, module: string, message: string, data?: unknown) {
  const timestamp = new Date().toISOString();
  const color = LOG_COLORS[level];
  const prefix = `${color}[${level.toUpperCase()}]${RESET} [${timestamp}] [${module}]`;

  if (data) {
    console[level](`${prefix} ${message}`, data);
  } else {
    console[level](`${prefix} ${message}`);
  }
}

export function createLogger(module: string) {
  return {
    debug: (msg: string, data?: unknown) => log('debug', module, msg, data),
    info: (msg: string, data?: unknown) => log('info', module, msg, data),
    warn: (msg: string, data?: unknown) => log('warn', module, msg, data),
    error: (msg: string, data?: unknown) => log('error', module, msg, data),
  };
}
```
</action>
<acceptance_criteria>
- `lib/utils/encryption.ts` contains `export function encrypt`
- `lib/utils/encryption.ts` contains `export function decrypt`
- `lib/utils/encryption.ts` contains `aes-256-gcm`
- `lib/utils/logger.ts` contains `export function createLogger`
</acceptance_criteria>
</task>

## Verification

- [ ] MongoDB connection function exported and importable
- [ ] User and Workspace models have correct schema fields
- [ ] Redis client gracefully handles missing env vars
- [ ] Cache-aside pattern works with withCache function
- [ ] Encryption/decryption round-trips correctly

## must_haves

1. MongoDB connection pooling works in serverless context (global cache pattern)
2. User and Workspace Mongoose models match PRD schema
3. Redis client is Vercel-serverless-safe (REST API, no persistent connections)
4. AES-256-GCM encryption utility is functional
