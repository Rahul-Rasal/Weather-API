import axios from "axios";
import { createClient } from "redis";
const API_KEY = process.env.API_KEY;
const redisClient = createClient({});
await redisClient.connect();

export const getWeather = async (req, res) => {
  const { city } = req.params;

  try {
    // const response = await axios.get(
    //   `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`
    // );

    const response = await axios.get(
      `  http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const weatherData = response.data;

    await redisClient.setEx(city, 43200, JSON.stringify(weatherData));

    res.status(200).json({
      source: "api",
      data: weatherData,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: "City not found" });
    } else {
      res.status(500).json({ error: "Failed to fetch weather data" });
      console.log(error.response.data); // This will give you the exact error message from Visual Crossing
    }
  }
};
