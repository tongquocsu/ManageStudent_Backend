import express from "express";
import {
  registerController,
  loginController,
  getAllAccountsController,
  deleteAccountController,
  updateProfileController,
} from "../controllers/authController.js";

//router obj
const router = express.Router();

//routing
//register
router.post("/register", registerController);

//Login
router.post("/login", loginController);

//Admin account controller
router.get("/all-accounts", getAllAccountsController);

//Delete account
router.delete("/delete-account/:aid", deleteAccountController);

//Update account
router.put("/account/:aid", updateProfileController);

export default router;
