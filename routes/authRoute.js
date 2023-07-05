import express from "express";
import {
  loginController,
  getAllAccountsController,
  testController,
} from "../controllers/authController.js";
import {
  isAccountant,
  isAdmin,
  requireSignIn,
} from "../middlewares/authMiddlewares.js";

//router obj
const router = express.Router();

//routing
//Account
router.post("/account/login", loginController);
router.get("/account/account-list", getAllAccountsController);

//Test login role
router.get("/account/test", testController);

export default router;
