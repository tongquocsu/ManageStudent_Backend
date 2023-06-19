import express from "express";

import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import {
  createAdminController,
  deleteAdminController,
  getAdminInfoController,
  getAllAdminsController,
  updateAdminController,
} from "../controllers/adminController.js";

//router obj
const router = express.Router();

//routing
//Account
router.post("/create", createAdminController);
router.get("/list", getAllAdminsController);
router.delete("/delete/:aid", deleteAdminController);
router.put("/update/:aid", updateAdminController);
router.get("/detail/:aid", getAdminInfoController);

export default router;
