import express from "express";
import { getAllClassByTeacher } from "../controllers/classController.js";

//router obj
const router = express.Router();

//routing
//schedule student
router.get("/teacher/:tid", getAllClassByTeacher);
export default router;
