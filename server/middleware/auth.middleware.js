import { ApiError } from "../utils/apiError.js";
import asynchandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyJWT = asynchandler(async (req, res, next) => {
  // Debug logs
  console.log("🍪 Raw cookies:", req.headers.cookie);
  console.log("🍪 Parsed cookies:", req.cookies);
  console.log("📋 Authorization header:", req.get("Authorization"));
  console.log("🌐 Origin:", req.get("Origin"));
  console.log("🔗 Referer:", req.get("Referer"));

  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  console.log("🔑 Final token:", token ? "Token found" : "No token found");

  if (!token) {
    throw new ApiError(401, "Unauthorized request - No Token");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log("✅ Decoded Token:", decodedToken); // Debugging log

    const user = await User.findById(decodedToken.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token - User Not Found");
    }
    // console.log("✅ User Found:", user); // Debugging log

    req.user = user;
    next();
  } catch (error) {
    // console.error("❌ JWT Verification Error:", error.message);
    throw new ApiError(401, "Invalid or Expired Access Token");
  }
});
