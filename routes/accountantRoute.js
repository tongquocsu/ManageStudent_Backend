import express from "express";

import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import {
  createAccountantController,
  deleteAccountantController,
  getAccountantInfoController,
  getAllAccountantsController,
  updateAccountantController,
} from "../controllers/accountantController.js";

//router obj
const router = express.Router();

//routing
//Account
router.post("/create", requireSignIn, isAdmin, createAccountantController);
router.get("/list", requireSignIn, isAdmin, getAllAccountantsController);
router.delete(
  "/delete/:acid",
  requireSignIn,
  isAdmin,
  deleteAccountantController
);
router.put("/update/:acid", requireSignIn, isAdmin, updateAccountantController);
router.get(
  "/detail/:acid",
  requireSignIn,
  isAdmin,
  getAccountantInfoController
);

export default router;
