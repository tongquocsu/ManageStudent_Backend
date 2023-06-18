import express from "express";
import { createReceipt, getReceiptById, updateReceiptById, deleteReceiptById } from "../controllers/receiptController.js";

const router = express.Router();
//receipt fee
router.post("/receipt", createReceipt);
router.get("/receipt/:id", getReceiptById);
router.put("/receipt/:id", updateReceiptById)
router.delete("/receipt/:id",deleteReceiptById)

export default router;