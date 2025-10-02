import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getCookieOptions } from "../utils/cookieOptions.js";
import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incoming = req.cookies?.refreshToken;
  if (!incoming) {
    throw new ApiError(401, "Unauthorized request - Missing refresh token");
  }

  let decoded;
  try {
    decoded = jwt.verify(incoming, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    throw new ApiError(401, "Unauthorized request - Invalid refresh token");
  }

  // FIX: use decoded.id (your tokens are signed with { id: ... })
  const user = await User.findById(decoded?.id);
  if (!user || !user.refreshToken || user.refreshToken !== incoming) {
    throw new ApiError(401, "Unauthorized request");
  }

  // Issue new tokens (consistent payload: id)
  const accessToken = user.generateAccessToken
    ? user.generateAccessToken()
    : jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "24h",
      });

  const refreshToken = user.generateRefreshToken
    ? user.generateRefreshToken()
    : jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d",
      });

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const options = getCookieOptions();
  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...options,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      ...options,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json(new ApiResponse(200, {}, "Access token refreshed successfully"));
});

export const verifyToken = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );

  return res.status(200).json(new ApiResponse(200, { user }, "Token is valid"));
});

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

  const createdUser = await User.create({
    email,
    name,
    phone,
    userType,
    password,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "Profile created successfully"));
});

export const loginuser = asyncHandler(async (req, res) => {
  const { email, password, userType } = req.body;

  if (!email || !password || !userType) {
    throw new ApiError(400, "Email, password, and userType are required");
  }

  const user = await User.findOne({ email, userType });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch || user.userType !== userType) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const options = getCookieOptions();

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...options,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      ...options,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json(
      new ApiResponse(
        200,
        {
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            userType: user.userType,
            location: user.location,
            bio: user.bio,
            company: user.company,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        },
        "Logged in successfully"
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = getCookieOptions();
  res.clearCookie("accessToken", options);
  res.clearCookie("refreshToken", options);
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Logged out successfully"));
});

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User profile fetched successfully"));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, location, bio, company } = req.body;

  const updateData = {};
  if (name) updateData.name = name;
  if (phone) updateData.phone = phone;
  if (location) updateData.location = location;
  if (bio) updateData.bio = bio;
  if (company) updateData.company = company;

  const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
    new: true,
    runValidators: true,
  }).select("-password -refreshToken");

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"));
});

export const changeUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userType } = req.body;

  const validUserTypes = ["farmer", "buyer", "admin"];
  if (!validUserTypes.includes(userType)) {
    throw new ApiError(400, "Invalid user type");
  }

  const user = await User.findByIdAndUpdate(
    id,
    { userType },
    { new: true, runValidators: true }
  ).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User role updated successfully"));
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User deleted successfully"));
});

export const getBuyers = asyncHandler(async (req, res) => {
  const buyers = await User.find({ userType: "buyer" }).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, buyers, "Buyers fetched successfully"));
});

export const getFarmers = asyncHandler(async (req, res) => {
  const farmers = await User.find({ userType: "farmer" }).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, farmers, "Farmers fetched successfully"));
});
