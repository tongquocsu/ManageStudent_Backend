import express from "express";
import { createAcademicYear } from "../controllers/academicYearController.js";

//router obj
const router = express.Router();

//routing
router.post("/create", createAcademicYear);

export default router;
