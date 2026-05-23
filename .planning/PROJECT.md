# NEXUS DM

## What This Is

NEXUS DM is an Awwwwards-grade DM automation platform for creators and influencers. It automates direct message workflows across Instagram, Facebook, YouTube, WhatsApp, Twitter/X, LinkedIn, and TikTok — with a visual flow builder, unified inbox, CRM contacts, analytics, and multi-provider payments (Stripe, Razorpay, Lemon Squeezy). The design follows a "Liquid Brutalism meets Kinetic Editorial" aesthetic with dual-theme support (Solar Paper light / Void Matter dark).

## Core Value

Creators can visually build and deploy cross-platform DM automations that run reliably at scale — with rate limiting that protects their social accounts from bans — all for free at the base tier.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

(None yet — ship to validate)

### Active

- [ ] Next.js 14 App Router project with TypeScript strict mode
- [ ] Awwwwards-grade design system (Liquid Brutalism × Kinetic Editorial)
- [ ] Dual theme (Solar Paper light / Void Matter dark) with smooth transitions
- [ ] Custom typography system (Cabinet Grotesk, Fraunces, Sora, JetBrains Mono, Bebas Neue)
- [ ] Landing page with hero, features bento grid, pricing, testimonials, CTA
- [ ] Authentication (Google OAuth via NextAuth v5 + WhatsApp OTP)
- [ ] Dashboard with collapsible sidebar, topbar, real-time overview
- [ ] Visual automation builder (React Flow canvas with 4 node types)
- [ ] Automation engine with BFS traversal and Kafka queue processing
- [ ] Unified inbox with real-time updates (Pusher)
- [ ] Contact CRM with lifecycle stages and tagging
- [ ] Analytics dashboard with charts and funnel visualization
- [ ] Platform integration architecture (abstract adapter pattern, registry)
- [ ] Multi-layer rate limiting (API, plan, platform token bucket, per-contact)
- [ ] Payment integration (Stripe + Razorpay + Lemon Squeezy, 4 tiers)
- [ ] MongoDB Atlas database with Mongoose ODM
- [ ] Upstash Redis caching with cache-aside and SWR patterns
- [ ] Upstash Kafka queue system with retry and DLQ
- [ ] AES-256-GCM credential encryption
- [ ] Privacy Policy, Terms of Service, and Consent Management pages
- [ ] GDPR/CCPA/DPDP compliance
- [ ] Security headers (CSP, HSTS, etc.)
- [ ] Command palette (Cmd+K)
- [ ] Team management and workspace system
- [ ] Responsive design, WCAG 2.1 AA accessibility
- [ ] Performance targets: LCP < 1.5s, CLS = 0, FID < 50ms, Lighthouse 95+

### Out of Scope

- Native mobile app — web-first, mobile responsive only for v1
- AI/ML message generation — manual templates only for v1
- White-label reselling — deferred to Agency tier later
- Video/audio message creation — text and image only for v1
- Custom domain per workspace — not in v1
- Self-hosted option — Vercel deployment only

## Context

- **Target audience:** Content creators, influencers, social media managers, agencies
- **Competition:** ManyChat, MobileMonkey, Chatfuel — but none are free + beautiful + multi-platform
- **Award targets:** Awwwwards Site of the Day, FWA, CSS Design Awards
- **Design inspiration:** Virgil Abloh × Teenage Engineering — anti-gravity composition, magnetic hover physics, typographic tension
- **Deployment:** Vercel with serverless functions, cron jobs for queue processing
- **Data residency:** MongoDB Atlas (cloud), Upstash Redis/Kafka (serverless)
- **User has experience with:** Next.js 14, MongoDB, Tailwind CSS, Framer Motion

## Constraints

- **Stack**: Next.js 14 App Router, TypeScript strict, Tailwind CSS 3.x + CSS Modules — non-negotiable
- **Database**: MongoDB Atlas with Mongoose — chosen for flexible schema and free tier
- **Cache/Queue**: Upstash Redis + Kafka only — Vercel serverless compatible (no persistent connections)
- **Real-time**: Pusher Channels — Vercel-safe WebSocket alternative
- **Payments**: Zero platform fee — Stripe (global), Razorpay (India), Lemon Squeezy (MoR)
- **Auth**: NextAuth.js v5 — Google OAuth + custom WhatsApp OTP provider
- **Storage**: Cloudflare R2 — S3-compatible, generous free tier
- **Budget**: Free-tier friendly across all services
- **Performance**: Core Web Vitals targets are hard requirements (LCP < 1.5s)
- **Bundle**: Initial JS < 200kb (aggressive code splitting)
- **Accessibility**: WCAG 2.1 AA compliance required

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 14 App Router over Pages Router | Server Components, better performance, modern patterns | — Pending |
| MongoDB over PostgreSQL | Flexible schema for automation nodes/edges, free tier | — Pending |
| Upstash over self-hosted Redis/Kafka | Vercel serverless compatible, no persistent connections | — Pending |
| Pusher over native WebSockets | Vercel doesn't support long-lived connections | — Pending |
| React Flow for automation builder | Best-in-class flow canvas library, extensible nodes | — Pending |
| Tailwind CSS + CSS Modules hybrid | Tailwind for utility, CSS Modules for design tokens | — Pending |
| AES-256-GCM for credential storage | Industry standard, built into Node.js crypto | — Pending |
| 4-tier pricing (Free/Creator/Pro/Agency) | Generous free tier for adoption, clear upgrade path | — Pending |
| Cron-based queue consumers | Vercel cron jobs process Kafka topics every 30-60s | — Pending |
| Platform adapter pattern | Extensible — add new platforms without touching core | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-23 after initialization*
