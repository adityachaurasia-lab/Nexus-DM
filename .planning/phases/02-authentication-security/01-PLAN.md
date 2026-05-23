---
phase: "02"
plan: "01"
title: "NextAuth v5 Core Configuration & Schema Extensions"
wave: 1
depends_on: []
files_modified:
  - lib/db/models/User.ts
  - lib/db/models/ConsentLog.ts
  - auth.ts
  - app/api/auth/[...nextauth]/route.ts
requirements:
  - AUTH-01
  - AUTH-04
  - AUTH-07
  - SEC-04
  - SEC-05
autonomous: true
---

# Plan 02-01: NextAuth v5 Core Configuration & Schema Extensions

**Objective:** Install and configure the NextAuth.js v5 core setup in the App Router, extend the database User model with consent/profile tracking fields, and implement the ConsentLog schema.

## Tasks

<task id="02-01-01">
  <action>
    Extend the existing User Mongoose schema in `lib/db/models/User.ts` to include:
    - `phone`: String, optional, sparse unique index (for WhatsApp login)
    - `termsAccepted`: Boolean, default false
    - `termsAcceptedAt`: Date, optional
    - `role`: String, enum: ['owner', 'admin', 'member'], default 'owner'
    
    Create a new file `lib/db/models/ConsentLog.ts` declaring:
    - `userId`: ObjectId referencing User model, required
    - `acceptedAt`: Date, default Date.now, required
    - `ipAddress`: String, required
    - `userAgent`: String, required
    - `categories`: Array of Strings (e.g. ['essential', 'platform_data']), default ['essential']
  </action>
  <read_first>
    - lib/db/models/User.ts
    - lib/db/mongodb.ts
  </read_first>
  <acceptance_criteria>
    - lib/db/models/User.ts defines phone, termsAccepted, termsAcceptedAt, and role fields
    - lib/db/models/ConsentLog.ts exports a Mongoose model named ConsentLog matching the requested schema
  </acceptance_criteria>
</task>

<task id="02-01-02">
  <action>
    Create NextAuth v5 main configuration in `auth.ts` in the project root:
    - Import NextAuth, GoogleProvider, and CredentialsProvider.
    - Set session strategy to 'jwt'.
    - Configure GoogleProvider utilizing GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.
    - Configure a custom CredentialsProvider for WhatsApp OTP:
      - Define credentials fields: phone, code, consentAccepted.
      - Implement authorize(credentials) checking the OTP in Upstash Redis (`otp:${phone}`).
      - Verify user exists in MongoDB; if not, create them with termsAccepted set to true.
      - Return user profile (id, phone, role).
    - Implement callbacks:
      - `signIn`: If Google login, check/create User in MongoDB. Record ConsentLog if new user.
      - `jwt`: Sync user.id, user.phone, and user.role into the token object.
      - `session`: Map token claims (id, phone, role) into the session user object.
  </action>
  <read_first>
    - lib/db/models/User.ts
    - lib/cache/redis.ts
    - package.json
  </read_first>
  <acceptance_criteria>
    - auth.ts exists in project root
    - auth.ts exports handlers, auth, signIn, and signOut
    - auth.ts contains custom CredentialsProvider and GoogleProvider configurations
    - jwt callback maps token.id, token.phone, and token.role from user profile
  </acceptance_criteria>
</task>

<task id="02-01-03">
  <action>
    Create NextAuth API catch-all handler in `app/api/auth/[...nextauth]/route.ts`:
    - Import the handlers object from `@/auth`.
    - Export GET and POST handlers directly.
  </action>
  <read_first>
    - auth.ts
  </read_first>
  <acceptance_criteria>
    - app/api/auth/[...nextauth]/route.ts exists
    - app/api/auth/[...nextauth]/route.ts exports const { GET, POST } = handlers
  </acceptance_criteria>
</task>

## Verification

### Automated Verification
- Run: `npx ts-node scripts/verify-auth.ts --test=auth-config`
  - Validates Mongoose models compile cleanly.
  - Verifies auth exports and providers are correctly instantiated.

### Manual Verification
- None (Wave 1 covers core libraries/models).
