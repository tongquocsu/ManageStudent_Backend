import express from "express";
import {
  createStudentAccountController,
  deleteStudentController,
  getAllStudentsController,
  getStudentInfoController,
  updateStudentController,
} from "../controllers/studentController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";

//router obj
const router = express.Router();

//routing
//Account
router.post("/create", createStudentAccountController);
router.get("/list", requireSignIn, isAdmin, getAllStudentsController);
router.delete("/delete/:sid", deleteStudentController);
router.put("/update/:sid", updateStudentController);
router.get("/detail/:sid", getStudentInfoController);
// router.post("/school-create", requireSignIn, isAdmin, createSchool);
// router.put("/school-update/:sid", requireSignIn, isAdmin, updateSchool);
// router.delete("/school-delete/:sid", requireSignIn, isAdmin, deleteSchool);
// router.get("/school-list", requireSignIn, isAdmin, listSchoolsController);
// router.get("/school-detail/:sid", requireSignIn, isAdmin, getSchoolController);

export default router;
