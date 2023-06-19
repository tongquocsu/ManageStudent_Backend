import express from "express";
import {
  registerController,
  loginController,
  getAllAccountsController,
  deleteAccountController,
  updateProfileController,
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
router.post("/account/register", registerController);
router.post("/account/login", loginController);
router.get(
  "/account/account-list",
  requireSignIn,
  isAdmin,
  getAllAccountsController
);
router.delete("/account/delete-account/:aid", deleteAccountController);
router.put("/account/account-update", requireSignIn, updateProfileController);

//Test login role
router.get("/account/test", requireSignIn, isAccountant, testController);

export default router;
