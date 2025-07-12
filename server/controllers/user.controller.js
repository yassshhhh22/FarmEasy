import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "express-async-handler";

const createProfile = asyncHandler(async (req, res) => {
  const { uid, email, name, phone, userType } = req.body;

  if (!uid || !email || !name || !phone || !userType) {
    throw new ApiError(
      400,
      "All fields are required: uid, email, name, phone, userType"
    );
  }

  const validUserTypes = ["farmer", "contractor", "buyer"];
  if (!validUserTypes.includes(userType)) {
    throw new ApiError(400, "Invalid user type");
  }

  const createdUser = await User.create({ uid, email, name, phone, userType });

  return res.status(201).json(
    new ApiResponse(
      201,
      createdUser,
      "Profile created successfully"
    )
  );
});

const updateProfile = asyncHandler(async (req, res) => {
  const { uid, email, name, phone, userType } = req.body;
    if (!uid) {
        throw new ApiError(400, "User ID is required for profile update");
    }
    const updatedUser = await User.findOneAndUpdate(
        { uid },
        { email, name, phone, userType },
        { new: true, runValidators: true }
    );
    if (!user) {    
        throw new ApiError(404, "User not found");
    }
    return res.status(200).json(
        new ApiResponse(200, updatedUser, "Profile updated successfully")
    );
});
const app = { createProfile, updateProfile };
export  default app;
