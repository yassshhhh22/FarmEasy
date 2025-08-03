import express from "express";
import {
  createContract,
  getMyContracts,
  getPendingContracts,
  getActiveContracts,
  updateContractStatus,
  getContractById,
} from "../controllers/contract.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

// All routes require authentication
router.use(verifyJWT);

// POST /api/contracts/create - Buyer creates contract
router.post("/create", roleMiddleware("buyer"), createContract);

// GET /api/contracts/my-contracts - Get user's contracts
router.get("/my-contracts", getMyContracts);

// GET /api/contracts/pending - Farmer views pending contracts
router.get("/pending", roleMiddleware("farmer"), getPendingContracts);

// GET /api/contracts/active - View active contracts
router.get("/active", getActiveContracts);

// GET /api/contracts/:id - Get specific contract
router.get("/:id", getContractById);

// PATCH /api/contracts/update-status/:id - Farmer updates status
router.patch(
  "/update-status/:id",
  roleMiddleware("farmer"),
  updateContractStatus
);

export default router;
