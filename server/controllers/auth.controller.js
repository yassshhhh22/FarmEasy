import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

const signUp = asyncHandler(async (req, res) => {
  const { email, password, name, phone, userType } = req.body;

  if (!email || !password || !name || !phone || !userType) {
    throw new ApiError(
      400,
      "All fields are required: email, password, name, phone, userType"
    );
  }

  const validUserTypes = ["farmer", "contractor", "buyer"];
  if (!validUserTypes.includes(userType)) {
    throw new ApiError(400, "Invalid user type");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await User.create({
    email,
    password: hashedPassword,
    name,
    phone,
    userType,
  });

  // Generate token
  const token = generateToken(user._id);

  // Remove password from response
  const userResponse = {
    _id: user._id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    userType: user.userType,
  };

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: userResponse, token },
        "User registered successfully"
      )
    );
});

const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Check password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Generate token
  const token = generateToken(user._id);

  // Remove password from response
  const userResponse = {
    _id: user._id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    userType: user.userType,
  };

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: userResponse, token },
        "User signed in successfully"
      )
    );
});

export { signUp, signIn };
