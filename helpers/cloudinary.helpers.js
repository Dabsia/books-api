import cloud from "../config/cloudinary.js";

// Helper function to upload image to Cloudinary
export const uploadImage = async (filePath) => {
  try {
    const result = await cloud.uploader.upload(filePath, {
      folder: "book_covers",
    });
    return { url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
};
