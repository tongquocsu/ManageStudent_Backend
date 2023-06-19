import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import {
  createTeacherAccountController,
  deleteTeacherController,
  getAllTeachersController,
  getTeacherInfoController,
  updateTeacherController,
} from "../controllers/teacherController.js";

//router obj
const router = express.Router();

//routing
//Account
router.post("/create", createTeacherAccountController);
router.get("/list", getAllTeachersController);
router.delete("/delete/:tid", deleteTeacherController);
router.put("/update/:tid", updateTeacherController);
router.get("/detail/:tid", getTeacherInfoController);
// router.post("/school-create", requireSignIn, isAdmin, createSchool);
// router.put("/school-update/:sid", requireSignIn, isAdmin, updateSchool);
// router.delete("/school-delete/:sid", requireSignIn, isAdmin, deleteSchool);
// router.get("/school-list", requireSignIn, isAdmin, listSchoolsController);
// router.get("/school-detail/:sid", requireSignIn, isAdmin, getSchoolController);

export default router;
