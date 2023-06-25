import express from "express";
import {
  registerController,
  loginController,
  changePassword,
} from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

//router obj
const router = express.Router();

//routing
//register
router.post("/register", registerController);

//Login
router.post("/login", loginController);

router.put("/change-password", requireSignIn, changePassword);

export default router;
