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
router.post("/create", createParentController);
router.get("/list", getAllParentsController);
router.delete("/delete/:pid", deleteParentController);
router.put("/update/:pid", updateParentController);
router.get("/detail/:pid", getParentInfoController);

router.get("/student-results/:pid", getAcademicResultOfStudentController);

export default router;
