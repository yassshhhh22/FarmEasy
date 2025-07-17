import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "express-async-handler";
import { Crop } from "../models/crop.model.js";

export const addCrop = asyncHandler(async (req, res) => {
  const { cropName, category, region, price, quantity, description } = req.body;
  const farmerId = req.user.id;

  if (!cropName || !category || !region || !price || !quantity) {
    throw new ApiError(400, "All fields are required");
  }
  if (price < 0 || quantity < 0) {
    throw new ApiError(400, "Price and quantity must be non-negative");
  }

  const existingCrop = await Crop.findOne({ cropName, farmer: farmerId });
  if (existingCrop) {
    throw new ApiError(
      400,
      "Crop with this name already exists for this farmer"
    );
  }
  const newCrop = await Crop.create({
    cropName,
    category,
    region,
    price,
    quantity,
    description,
    farmer: farmerId,
    isFlashDeal: false,
  });
  if (!newCrop) {
    throw new ApiError(500, "Failed to add crop");
  }
  res.status(201).json(new ApiResponse("Crop added successfully", newCrop));
});



export const getAllCrops = asyncHandler(async (req, res) => {
  const crops = await Crop.find({ status: "Active" })
    .populate("farmer", "name email")
    .sort({ createdAt: -1 });

  if (!crops || crops.length === 0) {
    throw new ApiError(404, "No crops found");
  }

  res.status(200).json(new ApiResponse("Crops retrieved successfully", crops));
});

export const getFarmerCrops = asyncHandler(async (req, res) => {
  const farmerId = req.user.id;
  const crops = await Crop.find({ farmer: farmerId, status: "Active" })
    .populate("farmer", "name email")
    .sort({ createdAt: -1 });

  if (!crops || crops.length === 0) {
    throw new ApiError(404, "No crops found for this farmer");
  }

  res
    .status(200)
    .json(new ApiResponse("Farmer's crops retrieved successfully", crops));
});

export const getCropById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Crop ID is required");
  }

  const crop = await Crop.findById(id).populate("farmer", "name email region");

  if (!crop) {
    throw new ApiError(404, "Crop not found");
  }

  res.status(200).json(new ApiResponse("Crop retrieved successfully", crop));
});

export const getFlashDeals = asyncHandler(async (req, res) => {
  const flashDeals = await Crop.find({
    isFlashDeal: true,
    status: "Active",
  })
    .populate("farmer", "name email region")
    .sort({ createdAt: -1 });

  if (!flashDeals || flashDeals.length === 0) {
    throw new ApiError(404, "No flash deals found");
  }

  res
    .status(200)
    .json(new ApiResponse("Flash deals retrieved successfully", flashDeals));
});

export const editCrop = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const farmerId = req.user.id;
  const { name, category, region, price, quantity, description, isFlashDeal } =
    req.body;

  if (!id) {
    throw new ApiError(400, "Crop ID is required");
  }

  const crop = await Crop.findById(id);
  if (!crop) {
    throw new ApiError(404, "Crop not found");
  }

  if (crop.farmer.toString() !== farmerId) {
    throw new ApiError(403, "You can only edit your own crops");
  }

  if (price && price < 0) {
    throw new ApiError(400, "Price must be non-negative");
  }
  if (quantity && quantity < 0) {
    throw new ApiError(400, "Quantity must be non-negative");
  }

  const updateData = {};
  if (name) updateData.name = name;
  if (category) updateData.category = category;
  if (region) updateData.region = region;
  if (price !== undefined) updateData.price = price;
  if (quantity !== undefined) updateData.quantity = quantity;
  if (description) updateData.description = description;
  if (isFlashDeal !== undefined) updateData.isFlashDeal = isFlashDeal;

  const updatedCrop = await Crop.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  ).populate("farmer", "name email");

  res
    .status(200)
    .json(new ApiResponse("Crop updated successfully", updatedCrop));
});

export const deleteCrop = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const farmerId = req.user.id;

  if (!id) {
    throw new ApiError(400, "Crop ID is required");
  }

  const crop = await Crop.findById(id);
  if (!crop) {
    throw new ApiError(404, "Crop not found");
  }

  if (crop.farmer.toString() !== farmerId) {
    throw new ApiError(403, "You can only delete your own crops");
  }

  await Crop.findByIdAndDelete(id);

  res.status(200).json(new ApiResponse("Crop deleted successfully", null));
});

export const searchCrops = asyncHandler(async (req, res) => {
  const { cropName, region, category, description, query } = req.query;

  // Build dynamic search criteria
  const criteria = { status: "Active" };
  const orArray = [];

  if (query && query.trim().length > 0) {
    orArray.push(
      { cropName: { $regex: query, $options: "i" } },
      { region: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } }
    );
  }
  if (cropName) criteria.cropName = { $regex: cropName, $options: "i" };
  if (region) criteria.region = { $regex: region, $options: "i" };
  if (category) criteria.category = { $regex: category, $options: "i" };
  if (description) criteria.description = { $regex: description, $options: "i" };

  // If query is present, use $or, else use criteria
  const searchResults = await Crop.find(
    orArray.length > 0 ? { status: "Active", $or: orArray } : criteria
  )
    .populate("farmer", "name email region")
    .sort({ createdAt: -1 });

  if (!searchResults || searchResults.length === 0) {
    throw new ApiError(404, "No crops found matching your search");
  }

  res
    .status(200)
    .json(
      new ApiResponse("Search results retrieved successfully", searchResults)
    );
});