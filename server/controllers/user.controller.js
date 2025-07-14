import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "express-async-handler";

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
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
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
    secure: true,
    sameSite: "strict",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

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
  const { name, email, phone } = req.body;

  const updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (phone) updateData.phone = phone;
  // Check if email is being updated and if it already exists
  if (email) {
    const existingUser = await User.findOne({
      email,
      _id: { $ne: req.user._id },
    });
    if (existingUser) {
      throw new ApiError(409, "Email already exists");
    }
  }

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
