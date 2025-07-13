import express from "express";
import {createProfile,updateProfile} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/signup").post(createProfile);
router.route("/update-profile").post(updateProfile);


export default router;
