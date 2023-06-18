import express from "express";
import { 
    createTuitionFee,
    getAllTuitionFees,
    getTuitionFeeById,
    updateTuitionFee,
    deleteTuitionFee 
} from "../controllers/tuitionFeeController.js";

const router = express.Router();
//tuition fee
router.get("/tuitionFees", getAllTuitionFees);
router.post("/tuitionFee", createTuitionFee);
router.get("/tuitionFee/:id", getTuitionFeeById);
router.put("/tuitionFee/:id", updateTuitionFee)
router.delete("/tuitionFee/:id",deleteTuitionFee)

export default router;