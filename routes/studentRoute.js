import express from "express";
import {
  getInfoStudent,
  updateProfileStudent,
} from "../controllers/studentController.js";
import { isStudent, requireSignIn } from "../middlewares/authMiddleware.js";

//router obj
const router = express.Router();

//routing
//getInfoStudent
router.get("/get-info-student", requireSignIn, getInfoStudent);

//updateProfileStudent
router.put(
  "/update-profile-student",
  [requireSignIn, isStudent],
  updateProfileStudent
);

export default router;
