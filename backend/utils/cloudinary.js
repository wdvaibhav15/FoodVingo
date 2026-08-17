
// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
//   api_key: process.env.CLOUDINARY_API_KEY?.trim(),
//   api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
//   secure: true,
// });

// const uploadOnCloudinary = async (filePath) => {
//   if (!filePath) {
//     throw new Error("Image file path was not provided");
//   }

//   try {
//     const result = await cloudinary.uploader.upload(filePath, {
//       resource_type: "image",
//       folder: "FoodVingo/shops",
//     });

//     return result.secure_url;
//   } catch (error) {
//     console.error("Cloudinary upload failed:", {
//       message: error.message,
//       httpCode: error.http_code,
//     });

//     // Important: null return mat karo
//     throw new Error(`Cloudinary upload failed: ${error.message}`);
//   } finally {
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//     }
//   }
// };

// export default uploadOnCloudinary;
// utils/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (filePath) => {
  if (!filePath) {
    throw new Error("Image file path was not provided");
  }

  // Ensure Cloudinary is configured with loaded environment variables
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
    api_key: process.env.CLOUDINARY_API_KEY?.trim(),
    api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
    secure: true,
  });

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      folder: "FoodVingo/shops",
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  } finally {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

export default uploadOnCloudinary;