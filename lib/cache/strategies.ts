import redis from './redis';

export const TTL = {
  REALTIME: 5,
  SHORT: 60,
  MEDIUM: 300,
  LONG: 3600,
  DAY: 86400,
  WEEK: 604800,
} as const;

export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = TTL.MEDIUM
): Promise<T> {
  if (!redis) return fetcher();

  try {
    const cached = await redis.get(key);
    if (cached !== null && cached !== undefined) {
      // Upstash Redis client automatically parses JSON on get if configured,
      // but to be safe and compatible with all client setups, we handle both parsed objects and strings.
      if (typeof cached === 'string') {
        try {
          return JSON.parse(cached) as T;
        } catch {
          return cached as unknown as T;
        }
      }
      return cached as T;
    }
  } catch (err) {
    console.warn('[Cache] Read error:', err);
  }

  const data = await fetcher();

  try {
    await redis.setex(key, ttl, typeof data === 'string' ? data : JSON.stringify(data));
  } catch (err) {
    console.warn('[Cache] Write error:', err);
  }

  return data;
}

export const CacheKeys = {
  workspaceDashboard: (id: string) => `workspace:${id}:dashboard`,
  automationList: (id: string) => `workspace:${id}:automations`,
  contactList: (wid: string, page: number) => `workspace:${wid}:contacts:${page}`,
  platformStatus: (wid: string) => `workspace:${wid}:platforms`,
  analyticsDaily: (wid: string, date: string) => `workspace:${wid}:analytics:${date}`,
  rateLimit: (userId: string, action: string) => `rate:${userId}:${action}`,
  session: (userId: string) => `session:${userId}`,
  otp: (phone: string) => `otp:${phone}`,
};
