import { getCache } from "../utils/redisCache.js";

export const cacheMiddleware = async (req, res, next) => {
  // ⚡ Master Switch: Agar .env me Redis false hai, toh sidha aage jao!
  if (process.env.ENABLE_REDIS !== "true") {
    return next();
  }

  try {
    // GET requests me body nahi hoti, isliye hum URL ko hi "key" bana lete hain.
    // Example key: "/api/jobs"
    const key = req.originalUrl;
    
    // Redis se data check karo
    const cachedData = await getCache(key);

    // Agar data Redis me mil gaya, toh sidha yahi se send kar do (Database ke paas mat jao)
    if (cachedData) {
      console.log(`⚡ Cache Hit for: ${key}`);
      return res.status(200).json(cachedData);
    }

    // Agar data Redis me NAHI mila (Cache Miss), toh request ko aage (Database route par) jane do
    console.log(`⏳ Cache Miss for: ${key}`);
    next();
  } catch (err) {
    console.error("Cache Middleware Error:", err);
    // Agar Redis fail bhi ho jaye, toh app crash nahi hona chahiye. Request aage chali jani chahiye.
    next();
  }
};