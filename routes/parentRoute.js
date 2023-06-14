import express from "express";

import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import {
  createParentController,
  deleteParentController,
  getAllParentsController,
  getParentInfoController,
} from "../controllers/parentController.js";
import { updateStudentController } from "../controllers/studentController.js";

//router obj
const router = express.Router();

//routing
//Account
router.post("/create", createParentController);
router.get("/list", requireSignIn, isAdmin, getAllParentsController);
router.delete("/delete/:sid", deleteParentController);
router.put("/update/:sid", updateStudentController);
router.get("/detail/:sid", getParentInfoController);

export default router;
