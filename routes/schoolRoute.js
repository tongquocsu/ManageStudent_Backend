import express from "express";

import { isAdmin } from "../middlewares/authMiddlewares.js";
import {
  createSchool,
  deleteSchool,
  getSchoolController,
  listSchoolsController,
  updateSchool,
} from "../controllers/schoolController.js";
import { requireSignIn } from "../middlewares/authMiddlewares.js";

//router obj
const router = express.Router();

//routing
//Account
router.post("/school-create", createSchool);
router.put("/school-update/:sid", updateSchool);
router.delete("/school-delete/:sid", deleteSchool);
router.get("/school-list", listSchoolsController);
router.get("/school-detail/:sid", getSchoolController);

export default router;
