import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import { getAllPersonsController } from "../controllers/personController.js";

//router obj
const router = express.Router();

//routing
//Account
router.get("/list", getAllPersonsController);

export default router;
