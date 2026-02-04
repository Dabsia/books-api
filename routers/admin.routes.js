import express from "express";
import { getAllUsers } from "../controllers/admin.js";
import { authMiddleware } from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.get("/users", authMiddleware, getAllUsers);

export default adminRouter;
