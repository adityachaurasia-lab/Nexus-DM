# Roadmap: NEXUS DM

**Created:** 2026-05-23
**Milestone:** v1.0 — Initial Release
**Phases:** 8
**Requirements:** 120 mapped

## Overview

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | Foundation & Design System | 5/5 | Complete   | 2026-05-23 |
| 2 | Authentication & Security | 3/4 | In Progress|  |
| 3 | Landing Page & UI Polish | Award-winning landing page with all sections + micro-interactions | LAND-01→11, UI-01→09 | 5 |
| 4 | Dashboard Shell & Real-Time | Dashboard layout + overview + real-time infrastructure + command palette | DASH-01→09, RT-01→04 | 5 |
| 5 | Automation Builder & Engine | React Flow canvas + automation engine + queue system + rate limiting | AUTO-01→13, ENGN-01→08, QUEUE-01→07, RATE-01→06 | 5 |
| 6 | Platform Integrations & Inbox & CRM | Platform adapters + unified inbox + contact management | PLAT-01→10, INBX-01→07, CRM-01→08 | 5 |
| 7 | Analytics & Payments & Teams | Analytics dashboard + payment providers + workspace team management | ANLY-01→09, PAY-01→07, TEAM-01→04 | 5 |
| 8 | Legal, Compliance & Launch Polish | Privacy policy + terms + consent management + final security + performance | LEGAL-01→06 | 5 |

---

## Phase 1: Foundation & Design System

**Goal:** Scaffold the Next.js 14 project, implement the complete Antigravity design system with dual themes, connect MongoDB and Redis, and build all UI primitive components.

**Requirements:** FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07, FOUND-08, FOUND-09, FOUND-10

**UI hint:** yes

**Success Criteria:**
1. `npm run dev` serves a working Next.js 14 app with TypeScript strict mode
2. Theme toggle switches between Solar Paper and Void Matter with all CSS variables applied
3. All 5 font families render correctly (Cabinet Grotesk, Fraunces, Sora, JetBrains Mono, Bebas Neue)
4. MongoDB connection succeeds and a test document can be created/read
5. All UI primitives (Button, Card, Input, Modal, Toast, Badge, Avatar, Tooltip, Dropdown, Switch, Progress, Skeleton) render correctly in both themes

---

## Phase 2: Authentication & Security

**Goal:** Implement Google OAuth and WhatsApp OTP authentication with NextAuth v5, consent management, and core security infrastructure (encryption, CSRF, headers).

**Requirements:** AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, AUTH-06, AUTH-07, AUTH-08, SEC-01, SEC-02, SEC-03, SEC-04, SEC-05

**UI hint:** yes

**Success Criteria:**
1. User can complete Google OAuth sign-in flow and land on dashboard
2. User can enter phone number, receive WhatsApp OTP, verify, and get authenticated
3. Unauthenticated users are redirected to /login when accessing dashboard routes
4. Consent checkbox must be accepted before first authentication completes
5. Security headers (CSP, HSTS, X-Frame-Options, etc.) are present on all responses

---

## Phase 3: Landing Page & UI Polish

**Goal:** Build the Awwwwards-grade landing page with all sections (hero, social proof, features, platforms, pricing, testimonials, CTA, footer) and implement all micro-interactions and animations.

**Requirements:** LAND-01, LAND-02, LAND-03, LAND-04, LAND-05, LAND-06, LAND-07, LAND-08, LAND-09, LAND-10, LAND-11, UI-01, UI-02, UI-03, UI-04, UI-05, UI-06, UI-07, UI-08, UI-09

**UI hint:** yes

**Success Criteria:**
1. Landing page loads with hero animation completing within 2 seconds
2. All 8 sections render with scroll-triggered staggered animations
3. Pricing toggle switches between monthly/annual with animated number transition
4. Magnetic cursor effects work on buttons and interactive elements
5. Page passes WCAG 2.1 AA contrast ratios in both themes

---

## Phase 4: Dashboard Shell & Real-Time

**Goal:** Build the dashboard layout with collapsible sidebar, topbar, overview page with stats/charts, command palette, and real-time update infrastructure via Pusher.

**Requirements:** DASH-01, DASH-02, DASH-03, DASH-04, DASH-05, DASH-06, DASH-07, DASH-08, DASH-09, RT-01, RT-02, RT-03, RT-04

**UI hint:** yes

**Success Criteria:**
1. Sidebar collapses from 240px to 64px with smooth width transition
2. Overview page shows 4 stat cards with skeleton loading states
3. Command palette (Cmd+K) opens with fuzzy search and keyboard navigation
4. Pusher connection establishes and receives test events
5. Activity feed updates in real-time when events are pushed

---

## Phase 5: Automation Builder & Engine

**Goal:** Build the visual automation builder with React Flow, implement the server-side automation engine with BFS execution, set up the full Kafka queue system with retry/DLQ, and implement the 4-layer rate limiting system.

**Requirements:** AUTO-01→13, ENGN-01→08, QUEUE-01→07, RATE-01→06

**UI hint:** yes

**Success Criteria:**
1. User can drag nodes from palette onto canvas and connect them with edges
2. Node configuration forms appear on right panel when a node is selected
3. Saving an automation persists the full graph (nodes + edges) to MongoDB
4. Automation engine can execute a simple trigger → action flow end-to-end
5. Rate limiting blocks sends when any of the 4 layers is exceeded

---

## Phase 6: Platform Integrations & Inbox & CRM

**Goal:** Implement the platform adapter architecture, build adapters for Instagram/Facebook/YouTube/WhatsApp/Twitter, create the unified inbox with real-time messaging, and build the contact CRM.

**Requirements:** PLAT-01→10, INBX-01→07, CRM-01→08

**UI hint:** yes

**Success Criteria:**
1. At least one platform (Instagram) can be connected via OAuth and show as "active"
2. Webhook endpoint receives, verifies, and processes incoming messages
3. Unified inbox shows conversations across platforms with real-time updates
4. Contact profile aggregates data from multiple platforms
5. User can add tags, change lifecycle stage, and add notes to contacts

---

## Phase 7: Analytics & Payments & Teams

**Goal:** Build the analytics dashboard with charts/funnels/exports, integrate Stripe + Razorpay + Lemon Squeezy payments, and implement workspace team management.

**Requirements:** ANLY-01→09, PAY-01→07, TEAM-01→04

**UI hint:** yes

**Success Criteria:**
1. Analytics page shows KPI cards, line chart, funnel, and pie chart with real data
2. Stripe checkout creates a subscription and webhook updates workspace plan
3. Razorpay subscription flow works with webhook verification
4. Team invite flow sends invite and new member appears in team settings
5. Plan limits are enforced based on subscription tier

---

## Phase 8: Legal, Compliance & Launch Polish

**Goal:** Create comprehensive legal pages (Privacy Policy, Terms of Service, Consent Management), ensure GDPR/CCPA/DPDP compliance, final security audit, performance optimization, and responsive design polish.

**Requirements:** LEGAL-01→06

**UI hint:** yes

**Success Criteria:**
1. Privacy Policy page renders all 11 sections with proper formatting
2. Terms of Service page renders all 11 sections
3. Consent Management Center shows 5 categories with toggle controls
4. All consent actions are logged in ConsentLog collection
5. Lighthouse score ≥ 95 on all categories (performance, accessibility, best practices, SEO)

---

*Roadmap created: 2026-05-23*
*Last updated: 2026-05-23 after initial creation*
