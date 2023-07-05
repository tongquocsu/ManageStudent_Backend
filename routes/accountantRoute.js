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
router.post("/create", createAccountantController);
router.get("/list", getAllAccountantsController);
router.delete("/delete/:acid", deleteAccountantController);
router.put("/update/:acid", updateAccountantController);
router.get("/detail/:acid", getAccountantInfoController);

export default router;
