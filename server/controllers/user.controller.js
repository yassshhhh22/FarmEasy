import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

export const createProfile = asyncHandler(async (req, res) => {
  const { email, name, phone, userType, password } = req.body;

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

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with this UID already exists");
  }
  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long");
  }
  
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createdUser = await User.create({
    email,
    name,
    phone,
    userType,
    password: hashedPassword,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "Profile created successfully"));
});

export const loginuser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { userId: user._id, email: user.email, userType: user.userType },
        "User logged in successfully"
      )
    );
});
