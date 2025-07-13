import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "express-async-handler";

export const createProfile = asyncHandler(async (req, res) => {
  const { email, name, phone, userType,password } = req.body;

  if (!email || !name || !phone || !userType || !password) {
    throw new ApiError(
      400,
      "All fields are required: uid, email, name, phone, userType"
    );
  }

  const validUserTypes = ["farmer", "buyer"];
  if (!validUserTypes.includes(userType)) {
    throw new ApiError(400, "Invalid user type");
  }

  
  const createdUser = await User.create({ email, name, phone, userType ,password });
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with this UID already exists");
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      createdUser,
      "Profile created successfully"
    )
  );
});




