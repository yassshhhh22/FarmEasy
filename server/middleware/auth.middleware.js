import { ApiError } from "../utils/apiError.js";
import asynchandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyJWT = asynchandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  //   console.log("🔑 Received Token:", token); // Debugging log

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
