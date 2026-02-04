import express from "express";
import { createUser, getUserProfile, userLogin } from "../controllers/user.js";
import { authMiddleware } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", userLogin);
userRouter.get("/profile", authMiddleware, getUserProfile);

export default userRouter;
