import express from "express";

import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import {
  createSchoolAdminStaffController,
  deleteSchoolAdminStaffController,
  getAllSchoolAdminStaffController,
  getSchoolAdminStaffInfoController,
  updateSchoolAdminStaffController,
} from "../controllers/schoolAdministrationStaffController.js";

//router obj
const router = express.Router();

//routing
//Account
router.post("/create", createSchoolAdminStaffController);
router.get("/list", getAllSchoolAdminStaffController);
router.delete("/delete/:scsid", deleteSchoolAdminStaffController);
router.put("/update/:scsid", updateSchoolAdminStaffController);
router.get("/detail/:scsid", getSchoolAdminStaffInfoController);

export default router;
