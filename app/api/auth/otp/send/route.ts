import { NextRequest, NextResponse } from 'next/server';
import { randomInt } from 'crypto';
import { redis } from '@/lib/cache/redis';
import { sendWhatsAppOTP } from '@/lib/utils/whatsapp';
import { createLogger } from '@/lib/utils/logger';

const logger = createLogger('auth');

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    const cleanPhone = phone.trim();
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json({ error: 'Phone number must be in E.164 format (e.g. +1234567890)' }, { status: 400 });
    }

    if (redis) {
      const rateLimitKey = `rate:otp:send:${cleanPhone}`;
      const hasSentRecently = await redis.get(rateLimitKey);

      if (hasSentRecently) {
        return NextResponse.json(
          { error: 'Please wait 60 seconds before requesting another code.' },
          { status: 429 }
        );
      }

      // Generate 6-digit code
      const code = randomInt(100000, 999999).toString();

      // Store key values in Redis with pipeline or parallel promises
      await Promise.all([
        redis.set(`otp:${cleanPhone}`, code, { ex: 300 }),
        redis.set(rateLimitKey, 'true', { ex: 60 }),
        redis.set(`attempts:otp:${cleanPhone}`, '0', { ex: 300 }),
      ]);

      const sent = await sendWhatsAppOTP(cleanPhone, code);
      if (!sent) {
        return NextResponse.json({ error: 'Failed to deliver OTP message' }, { status: 500 });
      }

      logger.info(`OTP successfully requested and dispatched for ${cleanPhone}`);
    } else {
      // Mock flow if Upstash Redis is missing
      const code = '123456';
      logger.warn(`Redis client is unconfigured. Simulating dispatch code ${code} for phone ${cleanPhone}`);
      await sendWhatsAppOTP(cleanPhone, code);
    }

    return NextResponse.json({ message: 'Verification code sent successfully.' }, { status: 200 });
  } catch (error: any) {
    logger.error(`Error executing OTP send API: ${error?.message || error}`);
    return NextResponse.json({ error: 'Internal server error occurred.' }, { status: 500 });
  }
}
