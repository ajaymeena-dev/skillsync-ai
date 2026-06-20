import Redis from "ioredis";

// ⚡ Check if Redis is enabled in .env
const isRedisEnabled = process.env.ENABLE_REDIS === "true";
let redis = null;

if (isRedisEnabled) {
  redis = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: 3,
    connectTimeout: 10000,
  });

  redis.on("connect", () => {
    console.log("🚀 SkillSync Engine: Redis Cache connected successfully.");
  });

  redis.on("error", (err) => {
    console.error("❌ Redis Connection Failure:", err);
  });
}

export const getCache = async (key) => {
  if (!isRedisEnabled || !redis) return null;
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`🚨 Cache Read Error for key [${key}]:`, error);
    return null;
  }
};

export const setCache = async (key, value, ttltime = 0) => {
  if (!isRedisEnabled || !redis) return null;
  try {
    const serializedData = JSON.stringify(value);
    // Agar TTL 0 hai toh permanent save karo, warna TTL ke sath
    if (ttltime > 0) {
      await redis.set(key, serializedData, "EX", ttltime);
    } else {
      await redis.set(key, serializedData);
    }
  } catch (error) {
    console.error(`🚨 Cache Write Error for key [${key}]:`, error);
    return null;
  }
};

export const deleteCache = async (key) => {
  if (!isRedisEnabled || !redis) return null;
  try {
    await redis.del(key);
  } catch (error) {
    console.error(`🚨 Cache Delete Error for key [${key}]:`, error);
    return null;
  }
};

export default redis;
