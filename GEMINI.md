<!-- GSD:project-start source:PROJECT.md -->
## Project

**NEXUS DM**

NEXUS DM is an Awwwwards-grade DM automation platform for creators and influencers. It automates direct message workflows across Instagram, Facebook, YouTube, WhatsApp, Twitter/X, LinkedIn, and TikTok — with a visual flow builder, unified inbox, CRM contacts, analytics, and multi-provider payments (Stripe, Razorpay, Lemon Squeezy). The design follows a "Liquid Brutalism meets Kinetic Editorial" aesthetic with dual-theme support (Solar Paper light / Void Matter dark).

**Core Value:** Creators can visually build and deploy cross-platform DM automations that run reliably at scale — with rate limiting that protects their social accounts from bans — all for free at the base tier.

### Constraints

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
<!-- GSD:project-end -->

<!-- GSD:stack-start source:STACK.md -->
## Technology Stack

Technology stack not yet documented. Will populate after codebase mapping or first phase.
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
