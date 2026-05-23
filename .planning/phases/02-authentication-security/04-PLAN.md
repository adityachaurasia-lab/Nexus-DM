---
phase: "02"
plan: "04"
title: "Animated Split Login UI & Forms"
wave: 4
depends_on:
  - "02-02"
  - "02-03"
files_modified:
  - app/login/page.tsx
requirements:
  - AUTH-08
  - AUTH-07
autonomous: true
---

# Plan 02-04: Animated Split Login UI & Forms

**Objective:** Build a premium, brutalist-inspired split login page at `/login` showing dynamic scrolling testimonials on the left, and a step-by-step form (Google button, WhatsApp phone, OTP inputs, consent terms) on the right.

## Tasks

<task id="02-04-01">
  <action>
    Create the login page directory `app/login/` and scaffold `app/login/page.tsx` client component:
    - Set up layout wrapper with full screen dimensions, split into two columns:
      - Left column (hidden on mobile, visible on `lg` viewports): A vibrant background gradient (`from-[var(--accent-primary)] to-[var(--accent-secondary)]`), filled with floating bento metrics and a Framer Motion ticker scrolling testimonials and creator quotes.
      - Right column: A canvas background hosting the centered user access card with brutal border borders (`border-4 border-black`) and heavy shadows.
  </action>
  <read_first>
    - app/globals.css
    - components/ui/Card.tsx
  </read_first>
  <acceptance_criteria>
    - app/login/page.tsx exists and is declared 'use client'
    - Login page splits into a left animated column and right form canvas column
  </acceptance_criteria>
</task>

<task id="02-04-02">
  <action>
    Implement authentication forms and step logic inside `app/login/page.tsx`:
    - Incorporate standard `signIn("google")` trigger buttons with Google logos.
    - Create phone credentials entry wizard:
      - Step 1: Phone input with country code formatting, the mandatory Terms + Privacy policy consent checkbox, and the "Send OTP" button.
      - Send OTP invokes `/api/auth/otp/send` via fetch POST. If rate-limited (429), displays error. If successful, advances to Step 2 and triggers a success Toast.
      - Step 2: Render 6 digit code inputs. When the code is entered, submit using NextAuth `signIn("credentials", { phone, code, consentAccepted })`. If success, redirect to `/dashboard`. If fail, increment error alert and display.
  </action>
  <read_first>
    - app/login/page.tsx
    - components/ui/Input.tsx
    - components/ui/Button.tsx
    - components/ui/Switch.tsx
    - components/ui/Toast.tsx
  </read_first>
  <acceptance_criteria>
    - app/login/page.tsx uses Custom Button, Input, Card, and Switch primitives
    - Page contains Terms + Privacy consent checkbox which is required to start authentication
    - OTP fields handle auto-focus, digit bounds, and submit verification values correctly
  </acceptance_criteria>
</task>

## Verification

### Automated Verification
- Run: `npm run build`
  - Validates Next.js build compilation for `/login` routing, making sure types are strict and layout assets render correctly.

### Manual Verification
- Start dev server (`npm run dev`), visit `/login`.
- Verify the layout is responsive, checking left-panel animations, checkbox selection, and transitions from phone entry to code verification.
