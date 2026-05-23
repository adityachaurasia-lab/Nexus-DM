import { Redis } from '@upstash/redis';

function createRedisClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.warn('[Redis] UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not set — using mock');
    return null;
  }

  return new Redis({ url, token });
}

export const redis = createRedisClient();

export default redis;
