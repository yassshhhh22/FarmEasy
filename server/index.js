import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

import userRoutes from "./routes/user.routes.js";
app.use("/api/users", userRoutes);
import cropRoutes from "./routes/crop.routes.js";
app.use("/api/crops", cropRoutes);
import contractRoutes from "./routes/contract.routes.js";
app.use("/api/contracts", contractRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  connectDB();
});
export default app;
