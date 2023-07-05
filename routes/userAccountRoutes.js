import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import { getAllAccountController } from "../controllers/accountController.js";

//router obj
const router = express.Router();

//routing
//Account
router.get("/list", getAllAccountController);

export default router;
