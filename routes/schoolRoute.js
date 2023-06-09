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
router.post("/school-create", requireSignIn, isAdmin, createSchool);
router.put("/school-update/:sid", requireSignIn, isAdmin, updateSchool);
router.delete("/school-delete/:sid", requireSignIn, isAdmin, deleteSchool);
router.get("/school-list", requireSignIn, isAdmin, listSchoolsController);
router.get("/school-detail/:sid", requireSignIn, isAdmin, getSchoolController);

export default router;
