import express from "express";
import { createSubject } from "../controllers/subjectController.js";

//router obj
const router = express.Router();

//routing
//schedule student
router.post("/", createSubject);
export default router;
