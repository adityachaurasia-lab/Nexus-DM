---
phase: 2
slug: authentication-security
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-05-23
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js TS-Node custom scripts |
| **Config file** | none — scripts/verify-auth.ts runs direct test asserts |
| **Quick run command** | `npx ts-node scripts/verify-auth.ts` |
| **Full suite command** | `npm run build && npx ts-node scripts/verify-auth.ts` |
| **Estimated runtime** | ~8 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx ts-node scripts/verify-auth.ts`
- **After every plan wave:** Run `npm run build`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | AUTH-01 | unit | `npx ts-node scripts/verify-auth.ts --test=auth-config` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 1 | AUTH-04 | unit | `npx ts-node scripts/verify-auth.ts --test=auth-endpoints` | ❌ W0 | ⬜ pending |
| 02-01-03 | 01 | 1 | AUTH-07 | unit | `npx ts-node scripts/verify-auth.ts --test=db-models` | ❌ W0 | ⬜ pending |
| 02-02-01 | 02 | 2 | AUTH-03 | unit | `npx ts-node scripts/verify-auth.ts --test=redis-otp` | ❌ W0 | ⬜ pending |
| 02-02-02 | 02 | 2 | AUTH-02 | unit | `npx ts-node scripts/verify-auth.ts --test=whatsapp-client` | ❌ W0 | ⬜ pending |
| 02-03-01 | 03 | 3 | AUTH-06 | integration | `npx ts-node scripts/verify-auth.ts --test=middleware` | ❌ W0 | ⬜ pending |
| 02-03-02 | 03 | 3 | SEC-02 | integration | `npx ts-node scripts/verify-auth.ts --test=csp-headers` | ❌ W0 | ⬜ pending |
| 02-04-01 | 04 | 4 | AUTH-08 | visual/smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 02-04-02 | 04 | 4 | AUTH-08 | visual/smoke | `npm run build` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `scripts/verify-auth.ts` — contains test asserts for routes, cookies, and Redis models
- [ ] `ts-node` — install devDependency if not available (we can use `npx ts-node`)

*If none: "Existing infrastructure covers all phase requirements."*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Google Login Flow Click | AUTH-01 | Requires active OAuth web interface interaction | Start dev server, open `/login`, click "Sign in with Google", verify redirection to Google account picker |
| WhatsApp Verification SMS/App message reception | AUTH-02 | Requires physical device connectivity to simulate client receive | Send test OTP, verify code prints in dev server log / delivers to sandbox, input code on UI, verify successful login |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 10s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending 2026-05-23
