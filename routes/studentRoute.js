import express from "express";
import {
  createStudentAccountController,
  deleteStudentController,
  getAllStudentsController,
  getStudentInfoController,
  updateStudentController,
} from "../controllers/studentController.js";
import {
  isAdmin,
  isStudent,
  requireSignIn,
} from "../middlewares/authMiddlewares.js";
import { testController } from "../controllers/authController.js";

//router obj
const router = express.Router();

//routing
//Account
router.post("/create", createStudentAccountController);
router.get("/list", getAllStudentsController);
router.delete("/delete/:sid", deleteStudentController);
router.put("/update/:sid", updateStudentController);
router.get("/detail/:sid", getStudentInfoController);

//test
router.get("/account/test", requireSignIn, isStudent, testController);

export default router;
