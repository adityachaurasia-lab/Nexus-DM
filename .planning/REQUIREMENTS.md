# Requirements: NEXUS DM

**Defined:** 2026-05-23
**Core Value:** Creators can visually build and deploy cross-platform DM automations that run reliably at scale — with rate limiting that protects their social accounts from bans — all for free at the base tier.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [x] **FOUND-01**: Next.js 14 App Router project initializes with TypeScript strict mode
- [ ] **FOUND-02**: Design system CSS variables (colors, spacing, typography, motion tokens) load for both themes
- [ ] **FOUND-03**: User can toggle between Solar Paper (light) and Void Matter (dark) themes with smooth transition
- [ ] **FOUND-04**: Custom fonts (Cabinet Grotesk, Fraunces, Sora, JetBrains Mono, Bebas Neue) load with font-display: swap
- [ ] **FOUND-05**: Fluid type scaling with clamp() works across viewport sizes
- [ ] **FOUND-06**: MongoDB connection pooling is configured with Mongoose ODM
- [ ] **FOUND-07**: Upstash Redis client is configured for serverless use
- [x] **FOUND-08**: Global CSS reset and design tokens are defined in globals.css
- [x] **FOUND-09**: Tailwind CSS 3.x is configured with custom design tokens
- [ ] **FOUND-10**: Component anatomy rules (cards, buttons, inputs, modals, toasts) are implemented as UI primitives

### Authentication

- [ ] **AUTH-01**: User can sign up / sign in with Google OAuth via NextAuth v5
- [ ] **AUTH-02**: User can sign in with WhatsApp OTP (phone → OTP via WhatsApp Cloud API → verify → JWT)
- [ ] **AUTH-03**: OTP is stored in Redis with 5-minute TTL and 3-attempt rate limit
- [ ] **AUTH-04**: JWT is signed with secure algorithm, HttpOnly + Secure + SameSite=Strict cookies
- [ ] **AUTH-05**: CSRF protection is active on all mutation endpoints
- [ ] **AUTH-06**: Auth middleware protects all dashboard routes
- [ ] **AUTH-07**: Consent checkbox (Privacy Policy + Terms) is required before first authentication
- [ ] **AUTH-08**: Login/register pages show animated brand panel (left) + clean form (right) split layout

### Landing Page

- [ ] **LAND-01**: Hero section shows oversized kinetic typography with character-by-character split-text entrance animation
- [ ] **LAND-02**: Hero has gradient mesh background + noise overlay + floating platform cards in orbit
- [ ] **LAND-03**: Social proof marquee shows creator names and live message counter
- [ ] **LAND-04**: Features bento grid uses asymmetric layout with 3D tilt on hover
- [ ] **LAND-05**: Platform grid shows all supported platforms as glassmorphic tiles
- [ ] **LAND-06**: Pricing table shows 3 plans with annual/monthly toggle and currency switcher (USD/INR)
- [ ] **LAND-07**: Testimonials carousel auto-plays with pause on hover
- [ ] **LAND-08**: CTA section has email capture + Google sign-in button
- [ ] **LAND-09**: Footer has grid layout with links, social, theme toggle, version number
- [ ] **LAND-10**: All sections have scroll-triggered staggered animations
- [ ] **LAND-11**: Magnetic cursor effects work on interactive elements

### Dashboard

- [ ] **DASH-01**: Dashboard layout has collapsible sidebar (64px icon mode / 240px expanded) + topbar
- [ ] **DASH-02**: Overview page shows stats row (active automations, messages today, response rate, new contacts)
- [ ] **DASH-03**: Overview shows 30-day message volume line chart
- [ ] **DASH-04**: Overview shows platform status pills (green/red per connected platform)
- [ ] **DASH-05**: Overview shows real-time activity feed via Pusher
- [ ] **DASH-06**: Quick actions allow creating automation or connecting platform from overview
- [ ] **DASH-07**: Sidebar shows Home, Automations, Inbox, Contacts, Analytics, Platforms, Billing, Settings
- [ ] **DASH-08**: Command palette (Cmd+K) opens with fuzzy search for navigation and actions
- [ ] **DASH-09**: Skeleton loading screens match exact content shapes during data fetch

### Automation Builder

- [ ] **AUTO-01**: User can create, edit, and delete automations
- [ ] **AUTO-02**: Full-screen React Flow canvas with infinite pan/zoom and grid background
- [ ] **AUTO-03**: Left panel shows draggable node palette (trigger, condition, action, delay, split test)
- [ ] **AUTO-04**: Top toolbar shows name input, status toggle (draft/active/paused), save, test, deploy
- [ ] **AUTO-05**: Right panel shows node configuration form on node select
- [ ] **AUTO-06**: Trigger nodes support: dm_received, keyword_match, comment_received, story_reply, new_follower, mention, scheduled, webhook
- [ ] **AUTO-07**: Condition nodes support: keyword_match, contact_tag, contact_stage, time_window, message_count, custom_field, platform_is
- [ ] **AUTO-08**: Action nodes support: send_message, send_image, add_tag, remove_tag, update_contact, move_stage, send_notification, http_request
- [ ] **AUTO-09**: Delay nodes support: wait_duration, wait_until, wait_for_reply
- [ ] **AUTO-10**: Split test nodes support: ab_split, random_split with configurable ratios
- [ ] **AUTO-11**: Node colors: trigger=coral, condition=cobalt, action=mint, delay=purple, split=gradient
- [ ] **AUTO-12**: Bottom status bar shows last run time and success rate
- [ ] **AUTO-13**: Template library offers pre-built automation flows

### Automation Engine

- [ ] **ENGN-01**: Automation engine executes flows via BFS traversal from trigger node
- [ ] **ENGN-02**: Execution state is persisted in MongoDB (ExecutionRun document)
- [ ] **ENGN-03**: Rate limits are checked before each node execution (4-layer system)
- [ ] **ENGN-04**: Delay nodes publish to delay topic and resume after specified duration
- [ ] **ENGN-05**: Failed nodes trigger exponential backoff retry (max 3 attempts)
- [ ] **ENGN-06**: Dead letter queue captures 3x-failed jobs with full context
- [ ] **ENGN-07**: DLQ entries trigger real-time notification to workspace owner
- [ ] **ENGN-08**: A/B test execution respects split ratios and tracks variant performance

### Inbox

- [ ] **INBX-01**: Three-panel layout: platform filter sidebar + conversation list + message thread
- [ ] **INBX-02**: New messages slide in from top in real-time via Pusher
- [ ] **INBX-03**: Unread count badges show per-platform and total
- [ ] **INBX-04**: Search with debounce filters conversations
- [ ] **INBX-05**: Quick reply templates are accessible from message input
- [ ] **INBX-06**: Automation tags are visible on conversations
- [ ] **INBX-07**: "Reply manually" override button bypasses automation

### Contacts (CRM)

- [ ] **CRM-01**: User can view all contacts across platforms in a unified list
- [ ] **CRM-02**: Contact profile shows all linked platform accounts
- [ ] **CRM-03**: User can add/remove tags on contacts
- [ ] **CRM-04**: User can set lifecycle stage (lead, prospect, customer, vip, churned)
- [ ] **CRM-05**: User can add notes to contacts
- [ ] **CRM-06**: Contact scoring tracks engagement metrics
- [ ] **CRM-07**: User can define custom fields per workspace
- [ ] **CRM-08**: User can block/unblock contacts with reason

### Analytics

- [ ] **ANLY-01**: Date range picker supports 7d / 30d / 90d / custom ranges
- [ ] **ANLY-02**: KPI cards show delta vs previous period
- [ ] **ANLY-03**: Line chart visualizes message volume over time
- [ ] **ANLY-04**: Funnel chart shows Trigger → Condition → Action → Conversion
- [ ] **ANLY-05**: Platform breakdown pie chart shows per-platform distribution
- [ ] **ANLY-06**: Top performing automations table ranks by success rate
- [ ] **ANLY-07**: A/B test results comparison shows variant performance
- [ ] **ANLY-08**: Export functionality generates CSV and PDF reports
- [ ] **ANLY-09**: Real-time counter animates on scroll-into-view

### Platform Integrations

- [ ] **PLAT-01**: Abstract PlatformAdapter base class defines connect, sendMessage, getConversations, validateWebhook, parseWebhookEvent
- [ ] **PLAT-02**: Platform registry pattern allows adding new platforms without core changes
- [ ] **PLAT-03**: Instagram adapter connects via Meta Graph API for messaging and comments
- [ ] **PLAT-04**: Facebook adapter connects via Meta Graph API for Pages Messenger
- [ ] **PLAT-05**: YouTube adapter connects via YouTube Data API v3 for comments
- [ ] **PLAT-06**: WhatsApp adapter supports both Cloud API (official) and OpenWA bridge (self-hosted)
- [ ] **PLAT-07**: Twitter/X adapter connects via Twitter API v2 for DMs
- [ ] **PLAT-08**: Platform credentials are encrypted with AES-256-GCM at rest
- [ ] **PLAT-09**: Token refresh runs hourly via Vercel cron
- [ ] **PLAT-10**: Platform status (active/expired/error/paused) shows in dashboard

### Queue System

- [ ] **QUEUE-01**: Upstash Kafka producer publishes to typed topics with trace IDs
- [ ] **QUEUE-02**: Kafka consumers process batches via Vercel cron jobs (every 30-60s)
- [ ] **QUEUE-03**: Webhook deduplication uses Redis SET NX with 5-minute window
- [ ] **QUEUE-04**: Raw webhooks are normalized into NexusEvent schema
- [ ] **QUEUE-05**: Retry handler uses exponential backoff with jitter (base 2s, max 300s)
- [ ] **QUEUE-06**: Queue health dashboard shows lag, throughput, errors per topic
- [ ] **QUEUE-07**: Rate limit gauges show platform usage percentage

### Rate Limiting

- [ ] **RATE-01**: Layer 1 — Sliding window rate limit on all API routes
- [ ] **RATE-02**: Layer 2 — Workspace plan limits enforce monthly message caps
- [ ] **RATE-03**: Layer 3 — Platform token bucket (Lua script in Redis) protects social accounts
- [ ] **RATE-04**: Layer 4 — Per-contact cooldowns prevent spam (automation entry, daily cap, weekly cap, global cooldown)
- [ ] **RATE-05**: Unified canSendMessage() checker runs all 4 layers in order
- [ ] **RATE-06**: Platform cooldown triggers on 429 response with Pusher notification

### Payments

- [ ] **PAY-01**: Stripe checkout creates subscriptions with webhook handling
- [ ] **PAY-02**: Razorpay subscription creation with HMAC-SHA256 webhook verification
- [ ] **PAY-03**: Lemon Squeezy integration as MoR alternative
- [ ] **PAY-04**: 4 pricing tiers: Free, Creator ($19/₹999), Pro ($49/₹2499), Agency ($149/₹7499)
- [ ] **PAY-05**: Annual/monthly billing toggle with smooth number animation
- [ ] **PAY-06**: Plan upgrade/downgrade flows with proration
- [ ] **PAY-07**: Usage counters reset monthly via cron

### Legal & Compliance

- [ ] **LEGAL-01**: Privacy Policy page covers all 11 sections (data collection, use, storage, third parties, rights, retention, cookies, etc.)
- [ ] **LEGAL-02**: Terms of Service page covers all 11 sections (acceptance, acceptable use, automation rules, IP, payments, liability, etc.)
- [ ] **LEGAL-03**: Consent Management Center with 5 categories (essential, functional, analytics, marketing, platform data)
- [ ] **LEGAL-04**: All consent is logged in ConsentLog collection with full audit trail
- [ ] **LEGAL-05**: GDPR rights implemented (access, rectify, delete, export)
- [ ] **LEGAL-06**: Data retention policies: messages 90 days, analytics 1 year, billing 7 years

### Security

- [ ] **SEC-01**: AES-256-GCM encryption for all platform credentials
- [ ] **SEC-02**: Security headers configured (CSP, HSTS, X-Frame-Options, etc.)
- [ ] **SEC-03**: CSRF protection on all mutations
- [ ] **SEC-04**: Token rotation on sensitive operations
- [ ] **SEC-05**: Suspicious login detection (new IP/device → email alert)

### Real-Time

- [ ] **RT-01**: Pusher channels configured for workspace-scoped events
- [ ] **RT-02**: Events pushed: message.received, automation.ran, platform.status, analytics.update, contact.created
- [ ] **RT-03**: useRealtime hook subscribes and updates Zustand stores
- [ ] **RT-04**: Real-time messages show slide-in animation with bubble pop

### UI Polish

- [ ] **UI-01**: Magnetic buttons track cursor offset with spring physics
- [ ] **UI-02**: Number counters animate count-up on scroll-into-view
- [ ] **UI-03**: Theme transition uses CSS view transitions API (no flash)
- [ ] **UI-04**: Confetti burst fires on first automation activation
- [ ] **UI-05**: Platform logos show brand color hover glows
- [ ] **UI-06**: All interactive elements have ARIA labels and keyboard navigation
- [ ] **UI-07**: Focus rings visible in both themes
- [ ] **UI-08**: @media (prefers-reduced-motion) respected throughout
- [ ] **UI-09**: Parallax depth layers on landing hero

### Workspace & Team

- [ ] **TEAM-01**: User can create a workspace with name, slug, and logo
- [ ] **TEAM-02**: Workspace owner can invite team members (owner/admin/member roles)
- [ ] **TEAM-03**: Workspace settings page allows profile editing
- [ ] **TEAM-04**: Multiple workspace support for Agency tier

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Advanced Platforms

- **PLAT-V2-01**: LinkedIn Messaging API integration
- **PLAT-V2-02**: TikTok Comments integration
- **PLAT-V2-03**: Telegram bot integration

### AI Features

- **AI-01**: AI-generated reply suggestions based on conversation context
- **AI-02**: Smart keyword extraction from messages
- **AI-03**: Sentiment analysis on incoming messages

### Advanced CRM

- **CRM-V2-01**: CSV import/export of contacts
- **CRM-V2-02**: Custom automation sequences (drip campaigns)
- **CRM-V2-03**: Lead scoring with machine learning

### White Label

- **WL-01**: Custom branding per workspace
- **WL-02**: Custom domain support
- **WL-03**: Embeddable widgets

## Out of Scope

| Feature | Reason |
|---------|--------|
| Native mobile app | Web-first, responsive design sufficient for v1 |
| AI/ML message generation | High complexity, manual templates first |
| Self-hosted deployment | Vercel-only for v1, simplifies infrastructure |
| Video/audio message creation | Text/image only, reduces scope |
| Custom domain per workspace | Deferred to Agency tier post-launch |
| SMS integration | Out of core DM automation scope |
| Email marketing automation | Different product category |
| Multi-language UI | English-only for v1 |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 through FOUND-10 | Phase 1 | Pending |
| AUTH-01 through AUTH-08 | Phase 2 | Pending |
| LAND-01 through LAND-11 | Phase 3 | Pending |
| DASH-01 through DASH-09 | Phase 4 | Pending |
| AUTO-01 through AUTO-13 | Phase 5 | Pending |
| ENGN-01 through ENGN-08 | Phase 5 | Pending |
| QUEUE-01 through QUEUE-07 | Phase 5 | Pending |
| RATE-01 through RATE-06 | Phase 5 | Pending |
| PLAT-01 through PLAT-10 | Phase 6 | Pending |
| INBX-01 through INBX-07 | Phase 6 | Pending |
| CRM-01 through CRM-08 | Phase 6 | Pending |
| ANLY-01 through ANLY-09 | Phase 7 | Pending |
| PAY-01 through PAY-07 | Phase 7 | Pending |
| TEAM-01 through TEAM-04 | Phase 7 | Pending |
| LEGAL-01 through LEGAL-06 | Phase 8 | Pending |
| SEC-01 through SEC-05 | Phase 8 | Pending |
| RT-01 through RT-04 | Phase 4 | Pending |
| UI-01 through UI-09 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 120 total
- Mapped to phases: 120
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-23*
*Last updated: 2026-05-23 after initial definition*
