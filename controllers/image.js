import { uploadImage } from "../helpers/cloudinary.helpers.js";
import Image from "../models/image.js";
import cloud from "../config/cloudinary.js";
import fs from "fs";

export const uploadImageFile = async (req, res) => {
  try {
    // Create new image document
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }
    // upload to cloudinary and get url and publicId
    const { url, publicId } = await uploadImage(req.file.path);

    // Save image details to database
    const newImage = await Image.create({
      url,
      publicId,
      uploadedBy: req.user.userId, // Assuming you have user authentication and req.user is available
    });

    fs.unlinkSync(req.file.path); // Remove the file from the server after upload

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: newImage,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to upload image",
    });
  }
};

export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find().populate("uploadedBy", "username email");

    return res.status(200).json({
      success: true,
      images,
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch images",
    });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    // Delete image from Cloudinary
    await cloud.uploader.destroy(image.publicId);

    // Delete image from database
    await Image.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete image",
    });
  }
};
