import { Router } from "express";
import {
  createProfile,
  loginuser,
  logoutUser,
  getProfile,
  updateProfile,
  getAllUsers,
  changeUserRole,
  deleteUser,
  getBuyers,
  getFarmers,
  refreshAccessToken,
  verifyToken,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = Router();

router.route("/register").post(createProfile);
router.route("/login").post(loginuser);

router.route("/refresh").post(refreshAccessToken);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/verify").get(verifyJWT, verifyToken);
router
  .route("/profile")
  .get(verifyJWT, getProfile)
  .patch(verifyJWT, updateProfile);

// Admin only routes - specific routes first
router.route("/all").get(verifyJWT, roleMiddleware("admin"), getAllUsers);
router.route("/buyers").get(verifyJWT, roleMiddleware("admin"), getBuyers);
router.route("/farmers").get(verifyJWT, roleMiddleware("admin"), getFarmers);

// Parameterized routes last
router
  .route("/change-role/:id")
  .patch(verifyJWT, roleMiddleware("admin"), changeUserRole);
router
  .route("/delete/:id")
  .delete(verifyJWT, roleMiddleware("admin"), deleteUser);

export default router;
