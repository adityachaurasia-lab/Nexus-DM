---
phase: "02"
plan: "02"
title: "WhatsApp OTP Send API & Redis Throttling"
wave: 2
depends_on:
  - "02-01"
files_modified:
  - app/api/auth/otp/send/route.ts
  - lib/utils/whatsapp.ts
requirements:
  - AUTH-02
  - AUTH-03
autonomous: true
---

# Plan 02-02: WhatsApp OTP Send API & Redis Throttling

**Objective:** Implement the backend route `/api/auth/otp/send` with strict Upstash Redis rate limits, OTP code generation, and verification attempt controls, alongside a WhatsApp Cloud API notification client.

## Tasks

<task id="02-02-01">
  <action>
    Create the WhatsApp dispatch service in `lib/utils/whatsapp.ts`:
    - Define `sendWhatsAppOTP(phone: string, code: string)`:
      - Validates that phone matches the pattern `^\+[1-9]\d{1,14}$`.
      - If `WHATSAPP_API_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID` are configured, issue a POST request to the Meta Graph API sending the template message.
      - If environment variables are missing, log the OTP code to the console with custom colored logger utilities for development simulation.
  </action>
  <read_first>
    - lib/utils/logger.ts
  </read_first>
  <acceptance_criteria>
    - lib/utils/whatsapp.ts exports sendWhatsAppOTP function
    - sendWhatsAppOTP returns a boolean promise indicating delivery success or log confirmation
  </acceptance_criteria>
</task>

<task id="02-02-02">
  <action>
    Create the API route handler `app/api/auth/otp/send/route.ts`:
    - Accept phone number via POST request.
    - Check rate limits in Upstash Redis (`rate:otp:send:${phone}`):
      - If key exists, return JSON error with status `429` (too many requests, wait 60s).
      - If not, set key `rate:otp:send:${phone}` to true with a TTL of 60 seconds.
    - Generate a secure 6-digit random code using Node's `crypto.randomInt`.
    - Store the code in Redis at `otp:${phone}` with a TTL of 300 seconds (5 minutes).
    - Initialize/reset the failed attempts counter: set `attempts:otp:${phone}` to 0 with a TTL of 300 seconds.
    - Call `sendWhatsAppOTP(phone, code)` to dispatch code.
    - Return JSON response status `200` with message indicating code was sent.
  </action>
  <read_first>
    - lib/cache/redis.ts
    - lib/utils/whatsapp.ts
  </read_first>
  <acceptance_criteria>
    - app/api/auth/otp/send/route.ts exists
    - Handler checks rate limits, returns 429 if active, and saves OTP in Redis with 300s TTL
    - Returns JSON status 200 on successful save and dispatch
  </acceptance_criteria>
</task>

## Verification

### Automated Verification
- Run: `npx ts-node scripts/verify-auth.ts --test=redis-otp`
  - Verifies Redis client reads and writes OTP strings and failed attempt keys accurately.
  - Confirms rate limit cooldown flags block consecutive creations correctly.

### Manual Verification
- Test using curl or Thunder Client to post phone to `/api/auth/otp/send`. Check server console to verify OTP code prints clearly in logs.
