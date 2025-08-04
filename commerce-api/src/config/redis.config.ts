import Redis from 'ioredis';

const redis = new Redis({
  port: parseInt(process?.env?.REDIS_PORT || '6379'), // Redis port
  host: process?.env?.REDIS_HOST || '127.0.0.1', // Redis host
  password: process?.env?.REDIS_PASSWORD || undefined,
  db: parseInt(process?.env?.DB || '0'), // Defaults to 0
});

redis.on('connect', () => console.log('🔌 Connected to Redis'));
redis.on('error', (err) => console.error('❌ Redis Error:', err));

export default redis;
