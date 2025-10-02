import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "express-async-handler";
import Crop from "../models/crop.model.js";

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
  const {
    page = 1,
    limit = 12,
    sort = "-createdAt",
    status = "Active",
    category,
    region,
    minPrice,
    maxPrice,
    minQuantity,
    maxQuantity,
    search,
  } = req.query;

  const q = {};
  if (status) q.status = status; // default Active
  if (category) q.category = category;
  if (region) q.region = region;

  if (minPrice || maxPrice) {
    q.price = {};
    if (minPrice) q.price.$gte = Number(minPrice);
    if (maxPrice) q.price.$lte = Number(maxPrice);
  }
  if (minQuantity || maxQuantity) {
    q.quantity = {};
    if (minQuantity) q.quantity.$gte = Number(minQuantity);
    if (maxQuantity) q.quantity.$lte = Number(maxQuantity);
  }
  if (search) {
    const s = String(search).trim();
    if (s) {
      q.$or = [
        { cropName: { $regex: s, $options: "i" } },
        { category: { $regex: s, $options: "i" } },
        { region: { $regex: s, $options: "i" } },
        { description: { $regex: s, $options: "i" } },
      ];
    }
  }

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(50, Math.max(1, Number(limit)));
  const skip = (pageNum - 1) * limitNum;

  const [items, total] = await Promise.all([
    Crop.find(q)
      .populate("farmer", "name email")
      .sort(sortParser(sort))
      .skip(skip)
      .limit(limitNum),
    Crop.countDocuments(q),
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { items, total, page: pageNum, limit: limitNum },
        "Crops retrieved successfully"
      )
    );
});

export const getFarmerCrops = asyncHandler(async (req, res) => {
  const farmerId = req.user.id;
  const {
    page = 1,
    limit = 12,
    sort = "-createdAt",
    status, // optional filter
    minPrice,
    maxPrice,
    minQuantity,
    maxQuantity,
    category,
    region,
    search,
  } = req.query;

  const q = { farmer: farmerId };
  if (status) q.status = status;
  if (category) q.category = category;
  if (region) q.region = region;

  if (minPrice || maxPrice) {
    q.price = {};
    if (minPrice) q.price.$gte = Number(minPrice);
    if (maxPrice) q.price.$lte = Number(maxPrice);
  }
  if (minQuantity || maxQuantity) {
    q.quantity = {};
    if (minQuantity) q.quantity.$gte = Number(minQuantity);
    if (maxQuantity) q.quantity.$lte = Number(maxQuantity);
  }
  if (search) {
    const s = String(search).trim();
    if (s) {
      q.$or = [
        { cropName: { $regex: s, $options: "i" } },
        { category: { $regex: s, $options: "i" } },
        { region: { $regex: s, $options: "i" } },
        { description: { $regex: s, $options: "i" } },
      ];
    }
  }

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(50, Math.max(1, Number(limit)));
  const skip = (pageNum - 1) * limitNum;

  const [items, total] = await Promise.all([
    Crop.find(q)
      .populate("farmer", "name email")
      .sort(sortParser(sort))
      .skip(skip)
      .limit(limitNum),
    Crop.countDocuments(q),
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { items, total, page: pageNum, limit: limitNum },
        "Farmer crops retrieved successfully"
      )
    );
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
  const {
    cropName,
    category,
    region,
    price,
    quantity,
    description,
    isFlashDeal,
    status,
  } = req.body;

  if (!id) throw new ApiError(400, "Crop ID is required");

  const crop = await Crop.findById(id);
  if (!crop) throw new ApiError(404, "Crop not found");

  if (crop.farmer.toString() !== farmerId) {
    throw new ApiError(403, "You can only edit your own crops");
  }

  // Only update allowed fields if provided
  if (cropName !== undefined) crop.cropName = cropName;
  if (category !== undefined) crop.category = category;
  if (region !== undefined) crop.region = region;
  if (price !== undefined) crop.price = price;
  if (quantity !== undefined) crop.quantity = quantity;
  if (description !== undefined) crop.description = description;
  if (typeof isFlashDeal === "boolean") crop.isFlashDeal = isFlashDeal;
  if (status !== undefined) crop.status = status;

  await crop.save();

  return res
    .status(200)
    .json(new ApiResponse(200, crop, "Crop updated successfully"));
});

export const deleteCrop = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const farmerId = req.user.id;

  if (!id) throw new ApiError(400, "Crop ID is required");

  const crop = await Crop.findById(id);
  if (!crop) throw new ApiError(404, "Crop not found");

  if (crop.farmer.toString() !== farmerId) {
    throw new ApiError(403, "You can only delete your own crops");
  }

  await Crop.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Crop deleted successfully"));
});

// Helpers
function sortParser(sort) {
  // supports "-createdAt" or "price"
  const obj = {};
  if (!sort) return { createdAt: -1 };
  const fields = String(sort).split(",");
  for (const f of fields) {
    if (!f) continue;
    if (f.startsWith("-")) obj[f.slice(1)] = -1;
    else obj[f] = 1;
  }
  return obj;
}
