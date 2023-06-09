import express from "express";

import { isAdmin } from "../middlewares/authMiddlewares.js";
import { requireSignIn } from "../middlewares/authMiddlewares.js";
import {
  addClassController,
  deleteClassController,
  getClassController,
  listClassesController,
  updateClassController,
} from "../controllers/classController.js";

//router obj
const router = express.Router();

//routing
router.post("/class-add", requireSignIn, isAdmin, addClassController);
router.put("/class-update/:cid", requireSignIn, isAdmin, updateClassController);
router.delete(
  "/class-delete/:cid",
  requireSignIn,
  isAdmin,
  deleteClassController
);
router.get("/class-list", requireSignIn, isAdmin, listClassesController);
router.get("/class-detail/:cid", requireSignIn, isAdmin, getClassController);

export default router;
