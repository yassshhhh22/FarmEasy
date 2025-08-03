import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000; // ✅ Add fallback port for local development

app.use(cookieParser());
app.use(express.json());

// ✅ Updated CORS for multiple environments
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CORS_ORIGIN
        : [
            "http://localhost:3000",
            "http://localhost:5173",
            process.env.CORS_ORIGIN,
          ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Add root health check route
app.get("/", (req, res) => {
  res.json({
    message: "Contract Farming API is running!",
    status: "healthy",
    environment: process.env.NODE_ENV || "development",
  });
});

// API routes
import userRoutes from "./routes/user.routes.js";
app.use("/api/users", userRoutes);

import cropRoutes from "./routes/crop.routes.js";
app.use("/api/crops", cropRoutes);

import contractRoutes from "./routes/contract.routes.js";
app.use("/api/contracts", contractRoutes);

// ✅ Add 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
  });
});

// ✅ Updated listener for production
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  connectDB();
});

export default app;
