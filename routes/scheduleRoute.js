import express from "express";
import {
    getScheduleStudent,
    getScheduleStudentDetail,
    createScheduleStudent,
    updateScheduleStudent,
    deleteScheduleStudent,
} from "../controllers/scheduleController.js"

//router obj
const router = express.Router();

//routing
//schedule student
router.get("/schedules", getScheduleStudent);
router.post("/schedule", createScheduleStudent);
router.get("/schedule/:id", getScheduleStudentDetail);
router.put("/schedule/:id", updateScheduleStudent)
router.delete("/schedule/:id",deleteScheduleStudent)
export default router;
