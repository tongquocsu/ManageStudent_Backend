import express from "express";
import {
  loginController,
  getAllAccountsController,
  testController,
} from "../controllers/authController.js";
import {
  isAccountant,
  isAdmin,
  isParent,
  isStudent,
  requireSignIn,
} from "../middlewares/authMiddlewares.js";

//router obj
const router = express.Router();

//routing
//Account
router.post("/account/login", loginController);
router.get(
  "/account/account-list",
  requireSignIn,
  isAdmin,
  getAllAccountsController
);

//Test login role
router.get("/account/test", requireSignIn, isAccountant, testController);

export default router;
