import express from "express";
import {createProfile} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/signup").post(createProfile);

export default router;
