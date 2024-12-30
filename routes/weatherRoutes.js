import express from "express";
import { getWeather } from "../controllers/weatherController.js";
import { cacheMiddleware } from "../middlewares/cacheMiddleware.js";
import { limiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.get("/weather/:city", limiter, cacheMiddleware, getWeather);

export default router;
