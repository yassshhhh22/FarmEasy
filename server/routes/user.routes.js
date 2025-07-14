import express from "express";
import {createProfile,loginuser,logoutUser} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/signup").post(createProfile);
router.route("/login").post(loginuser);
router.route("/logout").post(verifyJWT,logoutUser); 


export default router;
