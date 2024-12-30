import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import weatherRoutes from "./routes/weatherRoutes.js";
const app = express();

app.use(express.json());
app.use("/api", weatherRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The Server is Running on port ${PORT}`);
});
