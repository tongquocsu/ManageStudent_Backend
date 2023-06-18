import express from "express";
import { getAllClasses, createClass, getClassDetail,updateClass,deleteClass  } from "../controllers/classController.js";

const router = express.Router();
router.get("/classes", getAllClasses);
router.post("/class", createClass);
router.get("/class/:id", getClassDetail);
router.put("/class/:id", updateClass)
router.delete("/class/:id", deleteClass)
export default router;