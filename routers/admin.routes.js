import express from "express";
import { getAllUsers } from "../controllers/admin.js";
import { authMiddleware } from "../middleware/auth.js";
import { isAdmin } from "../middleware/adminmiddleware.js";

const adminRouter = express.Router();

adminRouter.get("/users", authMiddleware, isAdmin, getAllUsers);

export default adminRouter;
