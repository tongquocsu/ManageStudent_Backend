import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";

//router obj
const router = express.Router();

//routing
//register
router.post("/register", registerController);

//Login
router.post("/login", loginController);

export default router;
