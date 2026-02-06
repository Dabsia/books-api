import express from "express";
import {
  uploadImageFile,
  getAllImages,
  deleteImage,
} from "../controllers/image.js";
import { authMiddleware } from "../middleware/auth.js";
import adminRouter from "./admin.routes.js";
import upload from "../middleware/imageUpload.js";

const imageRouter = express.Router();

imageRouter.post(
  "/upload",
  authMiddleware,
  adminRouter,
  upload.single("image"),
  uploadImageFile
);
imageRouter.get("/images", authMiddleware, adminRouter, getAllImages);
imageRouter.delete("/images/:id", authMiddleware, adminRouter, deleteImage);

export default imageRouter;
