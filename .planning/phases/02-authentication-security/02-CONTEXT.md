# Phase 2: Authentication & Security - Context

**Gathered:** 2026-05-23
**Status:** Ready for planning
**Source:** Skip-discussion path (user-directed direct planning)

<domain>
## Phase Boundary

This phase implements the complete user authentication and core security infrastructure:
1. NextAuth.js v5 integration with Google OAuth and a custom WhatsApp OTP credentials provider.
2. Redis-backed OTP throttling and TTL checks.
3. Consent management gate (recording user acceptance of Privacy Policy + Terms).
4. Secure Middleware route guarding for all `/dashboard` paths.
5. Strict security headers and CSRF tokens for API routes.

</domain>

<decisions>
## Implementation Decisions

### NextAuth.js v5 & Database Integration
- **NextAuth v5 (Beta/Auth.js)** will be used for session handling, JWT tokens, and OAuth flows.
- **MongoDB Adapter**: Use the Mongoose connection/adapter pattern to automatically persist users, accounts, and session tokens.
- **Session Strategy**: Database sessions or JWT strategy? Since we want serverless Vercel compatibility, we will use the **JWT session strategy** to minimize database roundtrips on edge route verification, but sync the user profile status directly with MongoDB.

### Google OAuth Flow
- Standard Google Client ID / Client Secret credentials configuration.
- Auto-registers users in MongoDB on first sign-in.

### WhatsApp OTP Flow (Custom Credentials Provider)
- **Initiate route (`/api/auth/otp/send`)**: Accepts phone number, validates format, checks rate limits.
- **OTP Generation & Storage**:
  - Generates a cryptographically secure 6-digit code.
  - Stores in Upstash Redis as `otp:{phone}` with a 5-minute (300 seconds) TTL.
  - Limits sending to 1 request per 60 seconds per phone number, and a maximum of 3 failed verification attempts before locking.
- **Dispatch**: Uses mock delivery or logs to terminal if `WHATSAPP_API_TOKEN` is missing, but integrates standard WhatsApp Cloud API HTTP client logic for production delivery.
- **Credentials Provider**: A custom NextAuth credentials provider that verifies phone + OTP code against Redis, returning the user document if verified.

### Consent Center Gate
- Users must check the "I agree to the Privacy Policy and Terms of Service" checkbox before signing in.
- If first sign-in, create a `ConsentLog` record in MongoDB tracking: user ID, IP address, timestamp, and categories accepted (essential, platform data).
- Block authentication completion (in NextAuth `signIn` callback) if consent has not been recorded.

### Layout & Pages
- `/login`: Split layout.
  - Left panel: Kinetic Brutalism animated presentation (scrolling testimonials, system stats, bold Bebas Neue labels).
  - Right panel: Unified Login Card containing Google OAuth button, phone input field, OTP entry field, and the consent checkbox.
- `/dashboard`: Middleware-guarded path redirects to `/login` if no valid JWT is present.

### Core Security & Headers
- **Security Headers**: Map CSP (Content Security Policy), HSTS (Strict-Transport-Security), X-Frame-Options, X-Content-Type-Options, and Referrer-Policy inside `next.config.js`.
- **Encryption**: Encrypt session claims or secrets using our existing AES-256-GCM tools if custom metadata needs transport.

### the agent's Discretion
- Standardize NextAuth configuration file to `auth.ts` in the project root (NextAuth v5 convention).
- Keep pages clean, using our custom `Button`, `Card`, `Input`, `Toast`, and `Switch` primitives.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Database and Cache
- `lib/db/mongodb.ts` — Database connection pooling reference
- `lib/cache/redis.ts` — Upstash Redis REST cache client reference
- `lib/db/models/User.ts` — User model schema definition

### Utilities and Primitives
- `lib/utils/encryption.ts` — AES-256-GCM encryption helper
- `components/ui/` — Design primitives library (Card, Input, Button, Switch)

</canonical_refs>

<specifics>
## Specific Ideas
- The login split layout should use a bold color gradient (e.g. from `#FF3D00` to `#FF4D1A`) for the left-side branding panel to capture the "Liquid Brutalism" feel.

</specifics>

<deferred>
## Deferred Ideas
- Multi-workspace selection flow on login is deferred to Phase 7.
- WhatsApp API production template verification is mockable for this phase.

</deferred>

---

*Phase: 02-authentication-security*
*Context gathered: 2026-05-23 via PRD/Manual Mapping*
