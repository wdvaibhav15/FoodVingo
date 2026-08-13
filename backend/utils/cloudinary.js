// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";
// const uploadOnCloudinary = async (file) => {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });

//   try {
//     const result = await cloudinary.uploader.upload(file, {
//       resource_type: "auto",
//     });
//     // for deleting file from local storage using fs function
//     fs.unlinkSync(file);
//     return result.secure_url;
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     return null;
//   }
// };

// export default uploadOnCloudinary;
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

// Ensure environment variables are loaded
dotenv.config();

// Configure Cloudinary globally
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file) => {
  try {
    if (!file) return null;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });

    // Delete local temporary file from public/ folder after success
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }

    // Returns the string URL directly
    return result.secure_url;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error);

    // Delete local temporary file if upload fails
    if (file && fs.existsSync(file)) {
      fs.unlinkSync(file);
    }

    return null;
  }
};

export default uploadOnCloudinary;