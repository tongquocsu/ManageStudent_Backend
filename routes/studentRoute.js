import express from "express";
import {
  createStudentAccount,
  getAllStudentsByClass,
  getAllStudentsController,
  getInfoStudent,
  updateProfileStudent,
} from "../controllers/studentController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

//router obj
const router = express.Router();

//routing
router.post("/create", createStudentAccount);
router.put("/update/:sid", updateProfileStudent);

//getInfoStudent
router.get("/", requireSignIn, getAllStudentsController);
router.get("/class/:cid", requireSignIn, getAllStudentsByClass);
router.get("/get-info-student", requireSignIn, getInfoStudent);

export default router;
