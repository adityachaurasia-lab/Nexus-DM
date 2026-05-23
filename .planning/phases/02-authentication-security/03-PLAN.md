---
phase: "02"
plan: "03"
title: "Route Protection Middleware & CSP Security Headers"
wave: 3
depends_on:
  - "02-01"
files_modified:
  - middleware.ts
  - next.config.js
requirements:
  - AUTH-05
  - AUTH-06
  - SEC-02
  - SEC-03
autonomous: true
---

# Plan 02-03: Route Protection Middleware & CSP Security Headers

**Objective:** Implement Middleware checking JWT session headers to guard all dashboard routes, and define strict Content Security Policy (CSP) and frame security headers in next.config.js.

## Tasks

<task id="02-03-01">
  <action>
    Create Next.js route guard middleware in `middleware.ts` in the project root:
    - Import `auth` handler from root `@/auth`.
    - Wrap the middleware handler with auth check:
      - Retrieve session object.
      - Check if pathname starts with `/dashboard` or `/api/dashboard`.
      - If user is not authenticated, redirect `/dashboard` requests to `/login` page.
      - If API route is requested without auth, return `401 Unauthorized` JSON.
    - Set matching rules config:
      - Match `/dashboard/:path*`, `/api/dashboard/:path*`.
  </action>
  <read_first>
    - auth.ts
  </read_first>
  <acceptance_criteria>
    - middleware.ts exists in project root
    - middleware.ts imports and wraps the auth function
    - Unauthenticated requests to /dashboard are redirected to /login
  </acceptance_criteria>
</task>

<task id="02-03-02">
  <action>
    Add strict security headers policy in `next.config.js`:
    - Define Content-Security-Policy (CSP) restricting scripts/styles/frames to self and trusted origins (e.g. Google Fonts, Google OAuth endpoints, and Pusher websockets).
    - Enable X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy: origin-when-cross-origin.
    - Configure Strict-Transport-Security (HSTS) for long-duration max-age with preload enabled.
  </action>
  <read_first>
    - next.config.js
  </read_first>
  <acceptance_criteria>
    - next.config.js contains async headers() function definition
    - Security headers include Content-Security-Policy and X-Frame-Options
  </acceptance_criteria>
</task>

## Verification

### Automated Verification
- Run: `npx ts-node scripts/verify-auth.ts --test=middleware`
  - Verifies middleware mocks block unauthorized paths correctly.
- Run: `npx ts-node scripts/verify-auth.ts --test=csp-headers`
  - Parses headers setup to ensure security policies match strict guidelines.

### Manual Verification
- None (fully covered by automated tests).
