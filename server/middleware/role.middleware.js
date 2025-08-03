import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "express-async-handler";

export const roleMiddleware = (requiredRole) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }

    if (req.user.userType !== requiredRole) {
      throw new ApiError(403, `Access denied. ${requiredRole} role required`);
    }

    next();
  });
};
