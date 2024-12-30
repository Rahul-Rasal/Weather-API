import { createClient } from "redis";

const redisClient = createClient({});

await redisClient.connect();

export const cacheMiddleware = async (req, res, next) => {
  const { city } = req.params;

  try {
    const cacheData = await redisClient.get(city);

    if (cacheData) {
      return res.status(200).json({
        source: "cache",
        data: JSON.parse(cacheData),
      });
    }
    next();
  } catch (error) {
    next();
  }
};
