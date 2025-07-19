import Contract from "../models/contract.model.js";
import Crop from "../models/crop.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "express-async-handler";

export const createContract = asyncHandler(async (req, res) => {
  const { cropId, terms, quantity, price, deliveryDate } = req.body;

  if (!cropId || !terms || !quantity || !price || !deliveryDate) {
    throw new ApiError(
      400,
      "All fields are required: cropId, terms, quantity, price, deliveryDate"
    );
  }

  // Verify crop exists and get farmer info
  const crop = await Crop.findById(cropId).populate("farmer");
  if (!crop) {
    throw new ApiError(404, "Crop not found");
  }

  // Prevent buyer from creating contract with their own crop
  if (crop.farmer._id.toString() === req.user._id.toString()) {
    throw new ApiError(400, "You cannot create a contract for your own crop");
  }

  // Validate delivery date
  const deliveryDateObj = new Date(deliveryDate);
  if (deliveryDateObj <= new Date()) {
    throw new ApiError(400, "Delivery date must be in the future");
  }

  const contract = await Contract.create({
    crop: cropId,
    buyer: req.user._id,
    farmer: crop.farmer._id,
    terms,
    quantity,
    price,
    deliveryDate: deliveryDateObj,
  });

  const populatedContract = await Contract.findById(contract._id)
    .populate("crop", "name category")
    .populate("buyer", "name email")
    .populate("farmer", "name email");

  return res
    .status(201)
    .json(
      new ApiResponse(201, populatedContract, "Contract created successfully")
    );
});

export const getMyContracts = asyncHandler(async (req, res) => {
  const { status } = req.query;

  let query = {
    $or: [{ buyer: req.user._id }, { farmer: req.user._id }],
  };

  if (status) {
    const validStatuses = ["Pending", "Accepted", "Rejected", "Completed"];
    if (!validStatuses.includes(status)) {
      throw new ApiError(400, "Invalid status filter");
    }
    query.status = status;
  }

  const contracts = await Contract.find(query)
    .populate("crop", "name category")
    .populate("buyer", "name email")
    .populate("farmer", "name email")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, contracts, "Contracts fetched successfully"));
});

export const getPendingContracts = asyncHandler(async (req, res) => {
  const contracts = await Contract.find({
    farmer: req.user._id,
    status: "Pending",
  })
    .populate("crop", "name category")
    .populate("buyer", "name email")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(200, contracts, "Pending contracts fetched successfully")
    );
});

export const getActiveContracts = asyncHandler(async (req, res) => {
  const contracts = await Contract.find({
    $or: [{ buyer: req.user._id }, { farmer: req.user._id }],
    status: "Accepted",
  })
    .populate("crop", "name category")
    .populate("buyer", "name email")
    .populate("farmer", "name email")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(200, contracts, "Active contracts fetched successfully")
    );
});

export const updateContractStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["Accepted", "Rejected", "Completed"];
  if (!validStatuses.includes(status)) {
    throw new ApiError(
      400,
      "Invalid status. Must be one of: Accepted, Rejected, Completed"
    );
  }

  const contract = await Contract.findById(id);
  if (!contract) {
    throw new ApiError(404, "Contract not found");
  }

  // Only farmer can update contract status
  if (contract.farmer.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You can only update contracts for your own crops");
  }

  // Prevent updating already processed contracts
  if (contract.status !== "Pending" && status === "Accepted") {
    throw new ApiError(400, "Can only accept pending contracts");
  }

  if (contract.status === "Completed") {
    throw new ApiError(400, "Cannot update completed contracts");
  }

  contract.status = status;
  await contract.save();

  const updatedContract = await Contract.findById(id)
    .populate("crop", "name category")
    .populate("buyer", "name email")
    .populate("farmer", "name email");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedContract,
        `Contract ${status.toLowerCase()} successfully`
      )
    );
});

export const getContractById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const contract = await Contract.findById(id)
    .populate("crop", "name category")
    .populate("buyer", "name email")
    .populate("farmer", "name email");

  if (!contract) {
    throw new ApiError(404, "Contract not found");
  }

  // Check if user is involved in the contract
  const isInvolved =
    contract.buyer._id.toString() === req.user._id.toString() ||
    contract.farmer._id.toString() === req.user._id.toString();

  if (!isInvolved) {
    throw new ApiError(403, "You don't have access to this contract");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, contract, "Contract fetched successfully"));
});
