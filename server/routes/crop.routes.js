import { Router } from "express";
import {
  addCrop,
  getAllCrops,
  getFarmerCrops,
  getFlashDeals,
  getCropById,
  editCrop,
  deleteCrop,
} from "../controllers/crop.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = Router();

// POST /api/crops/add - Farmer adds a new crop listing (Farmer only)
router.post("/add", verifyJWT, roleMiddleware("farmer"), addCrop);

// GET /api/crops/all - Get list of all crops available (Public)
router.get("/all", getAllCrops);

// GET /api/crops/my-crops - Get logged-in farmer's own crop listings (Farmer only)
router.get("/my-crops", verifyJWT, roleMiddleware("farmer"), getFarmerCrops);

// GET /api/crops/flash-deals - Get crops flagged as flash deals (Public)
router.get("/flash-deals", getFlashDeals);

// GET /api/crops/search - Search crops by name, category, region, etc. (Public)
// router.get("/search", searchCrops);

// GET /api/crops/:id - Get specific crop details by crop ID (Public)
router.get("/:id", getCropById);

// PATCH /api/crops/edit/:id - Farmer updates a crop listing (Farmer only)
router.patch("/edit/:id", verifyJWT, roleMiddleware("farmer"), editCrop);

// DELETE /api/crops/delete/:id - Farmer deletes a crop listing (Farmer only)
router.delete("/delete/:id", verifyJWT, roleMiddleware("farmer"), deleteCrop);

export default router;
