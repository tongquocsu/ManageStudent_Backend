import express from "express";
import { createClassroom, deleteClassroom, getAllClassrooms, getClassroomById, updateClassroom } from "../controllers/classRoomController.js";

const router = express.Router();
router.get("/classRooms", getAllClassrooms);
router.post("/classRoom", createClassroom);
router.get("/classRoom/:id", getClassroomById);
router.put("/classRoom/:id", updateClassroom)
router.delete("/classRoom/:id", deleteClassroom)
export default router;