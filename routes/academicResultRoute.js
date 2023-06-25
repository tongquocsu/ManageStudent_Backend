import express from "express";
import {
  createAcademicResult,
  getAcademicResult,
  getAcademicResultByStudentID,
  updateAcademicResult,
} from "../controllers/academicResultController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

//router obj
const router = express.Router();

//routing
router.post("/class/:cid/student/:sid", requireSignIn, createAcademicResult);
router.get("/class/:cid", requireSignIn, getAcademicResult);
router.get("/student/:sid", requireSignIn, getAcademicResultByStudentID);
router.put(
  "/class/:cid/student/:sid/result/:rid",
  requireSignIn,
  updateAcademicResult
);

export default router;
