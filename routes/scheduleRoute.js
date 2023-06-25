import express from "express";
import {
  createScheduleStudent,
  getScheduleStudent,
  getScheduleTeacher,
} from "../controllers/scheduleController.js";


//router obj
const router = express.Router();

//routing
//schedule student
router.get("/", getScheduleStudent);
router.get("/teacher/:tid", getScheduleTeacher);
router.post("/", createScheduleStudent);
export default router;
