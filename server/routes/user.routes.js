import express from "express";
import {createProfile,loginuser} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/signup").post(createProfile);
router.route("/login").post(loginuser); // Assuming signin uses the same controller for now

export default router;
