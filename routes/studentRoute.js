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
router.post("/create", requireSignIn, isAdmin, createStudentAccountController);
router.get("/list", requireSignIn, isAdmin, getAllStudentsController);
router.delete("/delete/:sid", requireSignIn, isAdmin, deleteStudentController);
router.put("/update/:sid", requireSignIn, isAdmin, updateStudentController);
router.get("/detail/:sid", requireSignIn, isAdmin, getStudentInfoController);

//test
router.get("/account/test", requireSignIn, isStudent, testController);

export default router;
