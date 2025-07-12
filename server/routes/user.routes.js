import express from "express";
import User from "../models/user.model.js";
import app from "../controllers/user.controller.js";

const router = express.Router();

router.route("/profile").post(app.createProfile);
router.route("/update-profile").post(app.updateProfile);


export default router;
