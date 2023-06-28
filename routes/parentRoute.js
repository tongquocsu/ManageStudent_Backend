import express from "express";

import {
  isAdmin,
  isParent,
  requireSignIn,
} from "../middlewares/authMiddlewares.js";
import {
  createParentController,
  deleteParentController,
  getAcademicResultOfStudentController,
  getAllParentsController,
  getParentInfoController,
  updateParentController,
} from "../controllers/parentController.js";

//router obj
const router = express.Router();

//routing
//Account
router.post("/create", requireSignIn, isAdmin, createParentController);
router.get("/list", requireSignIn, isAdmin, getAllParentsController);
router.delete("/delete/:pid", requireSignIn, isAdmin, deleteParentController);
router.put("/update/:pid", requireSignIn, isAdmin, updateParentController);
router.get("/detail/:pid", requireSignIn, isAdmin, getParentInfoController);

router.get(
  "/student-results/:pid",
  requireSignIn,
  isParent,
  getAcademicResultOfStudentController
);

export default router;
