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
router.post("/create", requireSignIn, isAdmin, createTeacherAccountController);
router.get("/list", requireSignIn, isAdmin, getAllTeachersController);
router.delete("/delete/:tid", requireSignIn, isAdmin, deleteTeacherController);
router.put("/update/:tid", requireSignIn, isAdmin, updateTeacherController);
router.get("/detail/:tid", requireSignIn, isAdmin, getTeacherInfoController);

export default router;
