import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/lib/db/mongodb';
import { User } from '@/lib/db/models/User';
import { ConsentLog } from '@/lib/db/models/ConsentLog';
import { redis } from '@/lib/cache/redis';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    ...authConfig.providers,
    CredentialsProvider({
      id: 'credentials',
      name: 'WhatsAppOTP',
      credentials: {
        phone: { label: 'Phone', type: 'text' },
        code: { label: 'Code', type: 'text' },
        consentAccepted: { label: 'Consent Accepted', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.code) {
          throw new Error('Missing phone number or verification code');
        }

        const phone = credentials.phone as string;
        const code = credentials.code as string;

        // Verify OTP against Upstash Redis
        let storedCode: string | null = null;
        if (redis) {
          storedCode = await redis.get<string>(`otp:${phone}`);
          const attemptsKey = `attempts:otp:${phone}`;
          const attempts = parseInt((await redis.get<string>(attemptsKey)) || '0', 10);

          if (attempts >= 3) {
            throw new Error('Too many verification attempts. Please request a new code.');
          }

          if (!storedCode || storedCode !== code) {
            await redis.set(attemptsKey, String(attempts + 1), { ex: 300 });
            throw new Error('Invalid or expired verification code');
          }

          // Clear keys on successful verification
          await redis.del(`otp:${phone}`);
          await redis.del(attemptsKey);
          await redis.del(`rate:otp:send:${phone}`);
        } else {
          // Dev mock fallback if Redis is unconfigured
          console.warn('[Auth] Redis unconfigured — authorizing with sandbox OTP verification');
          if (code !== '123456') {
            throw new Error('Invalid code (use 123456 in Redis sandbox mode)');
          }
        }

        await connectDB();
        let user = await User.findOne({ phone });

        if (!user) {
          // Create new user if phone is not registered yet
          const emailPrefix = phone.replace('+', '');
          user = await User.create({
            email: `${emailPrefix}@nexusdm.local`, // placeholder email for credentials auth
            phone,
            termsAccepted: credentials.consentAccepted === 'true',
            termsAcceptedAt: new Date(),
            role: 'owner',
          });
        }

        return {
          id: user._id.toString(),
          phone: user.phone,
          email: user.email,
          name: user.name || `User ${phone}`,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        if (!user.email) return false;

        await connectDB();
        let dbUser = await User.findOne({ email: user.email });

        if (!dbUser) {
          // Auto-create user for Google login
          dbUser = await User.create({
            email: user.email,
            name: user.name || undefined,
            avatar: user.image || undefined,
            termsAccepted: true, // Google login requires clicking terms check on login screen
            termsAcceptedAt: new Date(),
            role: 'owner',
          });

          // Log user consent
          await ConsentLog.create({
            userId: dbUser._id,
            ipAddress: '0.0.0.0', // filled from request headers in API routes
            userAgent: 'Google OAuth',
            categories: ['essential', 'platform_data'],
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone = (user as any).phone;
        token.role = (user as any).role || 'owner';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).phone = token.phone;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
});
