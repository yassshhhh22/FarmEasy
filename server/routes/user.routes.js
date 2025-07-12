import express from "express";
import User from "../models/user.model.js";
import { createProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/profile", createProfile);

export default router;
