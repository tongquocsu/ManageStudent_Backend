import express from "express";
import { getAttendanceByClass, markAttendance } from "../controllers/attendanceController.js";
import { isTeacher, requireSignIn } from "../middlewares/authMiddleware.js";

//router obj
const router = express.Router();

//routing
//schedule student
router.post("/class/:cid", requireSignIn, markAttendance);
router.get("/class/:cid", requireSignIn, getAttendanceByClass);
export default router;
