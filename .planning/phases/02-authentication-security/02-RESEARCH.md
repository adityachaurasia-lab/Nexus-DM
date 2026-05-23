# Phase 2 Technical Research: Authentication & Security

## Domain Overview

This research covers integrating NextAuth.js v5 (beta.25) in a Next.js 14 App Router project with custom credentials, Google OAuth, Redis-backed WhatsApp OTP, and strict security headers.

---

## 1. NextAuth.js v5 (Auth.js) App Router Integration

In NextAuth.js v5, configuration is defined in a root file `auth.ts` rather than dynamic API folders. This allows middleware and API routes to share the configuration easily.

### File Structure
```
├── auth.ts                   # Root Auth config & exports
├── middleware.ts             # Route guard middleware
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts  # Catch-all Auth API handler
```

### NextAuth configuration (`auth.ts`)
```typescript
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/lib/db/models/User";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "WhatsAppOTP",
      credentials: {
        phone: { label: "Phone", type: "text" },
        code: { label: "OTP Code", type: "text" },
        consentAccepted: { label: "Consent", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.code) return null;
        
        // Verify OTP against Upstash Redis
        const storedCode = await redis.get(`otp:${credentials.phone}`);
        if (!storedCode || storedCode !== credentials.code) {
          throw new Error("Invalid or expired OTP");
        }
        
        // Delete OTP on successful verification
        await redis.del(`otp:${credentials.phone}`);
        
        await connectDB();
        let user = await User.findOne({ phone: credentials.phone });
        if (!user) {
          // Create new user if they don't exist
          user = await User.create({
            phone: credentials.phone,
            termsAccepted: credentials.consentAccepted === "true",
            termsAcceptedAt: new Date(),
          });
        }
        
        return {
          id: user._id.toString(),
          phone: user.phone,
          email: user.email,
          name: user.name,
        };
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await connectDB();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          // If first time Google login, create user
          await User.create({
            email: user.email,
            name: user.name,
            avatar: user.image,
            termsAccepted: true, // User accepted terms on login screen check
            termsAcceptedAt: new Date(),
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone = (user as any).phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).phone = token.phone;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  }
});
```

---

## 2. WhatsApp OTP Lifecycle in Upstash Redis

To prevent spam, Redis handles TTL expiration, request cooldowns, and brute force protection.

### Steps
1. **Send Request (`/api/auth/otp/send`)**:
   - Verify phone format (e.g., regex `^\+[1-9]\d{1,14}$`).
   - Check rate limit in Redis: `rate:otp:send:${phone}` (TTL 60s). If exists, return `429 Too Many Requests`.
   - Generate cryptographically secure 6-digit code:
     ```typescript
     import { randomInt } from "crypto";
     const otp = randomInt(100000, 999999).toString();
     ```
   - Store OTP in Redis: `otp:${phone}` = `otp` (TTL 300s / 5 min).
   - Store limit indicator: `rate:otp:send:${phone}` = `true` (TTL 60s).
   - Store failed attempts counter: `attempts:otp:${phone}` = `0` (TTL 300s).
   - Dispatch OTP via WhatsApp Cloud API (mocked in development to `console.log` or helper file).

2. **Verify Request (via Credentials provider `authorize`)**:
   - Check locked/cooldown state: `attempts:otp:${phone}`. If value >= 3, reject request immediately (too many failed attempts).
   - Compare code.
   - If match: clear keys (`otp:${phone}`, `attempts:otp:${phone}`, `rate:otp:send:${phone}`).
   - If mismatch: increment `attempts:otp:${phone}`.

---

## 3. Route Guard Middleware in Next.js 14

Middleware validates JWT claims and redirects unauthenticated traffic to `/login`.

```typescript
import { auth } from "./auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isDashboardRoute = req.nextUrl.pathname.startsWith("/dashboard");
  
  if (isDashboardRoute && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
};
```

---

## 4. Security Headers in `next.config.js`

Add security headers via custom headers in `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.pusher.com wss://ws-ap1.pusher.com;",
          }
        ],
      },
    ];
  },
};
```

---

## 5. UI Layout: Split Animated Page

Brutalist split layout details for `/login`:
- Left Side (Desktop only, `hidden lg:flex`): Large bold Cabinet Grotesk text, looping system stats (Framer Motion marquee), background gradient (`#FF3D00`).
- Right Side: Centered card container. Handles stage selection:
  - Stage 1: Phone input + Consent Checkbox + Google login button.
  - Stage 2: 6-digit OTP verification code inputs.

---

## Validation Architecture

To verify implementation correctness:
1. **API Endpoints**: Request sent `/api/auth/otp/send` returns status `200` and creates key in Redis. Multiple calls in 60s return `429`.
2. **NextAuth Handler**: `/api/auth/signin/credentials` accepts valid credentials and signs JWT.
3. **Middleware**: Access to `/dashboard` without cookies triggers redirect to `/login`.
4. **Security Headers**: Curl verification returns correct headers.
