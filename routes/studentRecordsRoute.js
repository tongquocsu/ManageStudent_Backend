import express from "express";
import { createStudentRecord, getAllStudentRecords, getStudentRecordById, updateStudentRecord, deleteStudentRecord } from "../controllers/studentRecordsController.js";

const router = express.Router();
//studentRecord
router.get("/studentRecords", getAllStudentRecords);
router.post("/studentRecord", createStudentRecord);
router.get("/studentRecord/:id", getStudentRecordById);
router.put("/studentRecord/:id", updateStudentRecord)
router.delete("/studentRecord/:id",deleteStudentRecord)

export default router;