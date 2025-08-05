import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        ...options,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        ...options,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .json(new ApiResponse(200, {}, "Access token refreshed successfully"));
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
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
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email, password, or user type");
  }

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  // Updated cookie options for cross-origin requests
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // "none" for cross-origin
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  };

  const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, refreshCookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken, // Include in response for localStorage fallback
          refreshToken,
        },
        "User logged in successfully"
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

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
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
