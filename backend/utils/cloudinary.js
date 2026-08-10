import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
const uploadOnCloudinary = async (file) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    // for deleting file from local storage using fs function
    fs.unlinkSync(file);
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export default uploadOnCloudinary;
