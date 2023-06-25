import express from "express";
import {
  createTeacherAccount,
  getInfoTeacher,
  updateProfileTeacher,
} from "../controllers/teacherController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

//router obj
const router = express.Router();

//routing
router.post("/create", createTeacherAccount);
router.put("/update/:tid", updateProfileTeacher);

router.get("/get-info-teacher", requireSignIn, getInfoTeacher);

export default router;
