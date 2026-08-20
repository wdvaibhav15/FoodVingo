import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMyShopData } from "../redux/ownerSlice";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";
import imageCompression from "browser-image-compression";

const AddItems = () => {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);
  const [loading, setLoading] = useState(false);

  // States
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [backendImage, setBackendImage] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("Veg");
  const categories = [
    "Snacks",
    "Main Course",
    "Dessert",
    "Pizza",
    "Burger",
    "Sandwich",
    "South Indian",
    "North Indian",
    "Chinese",
    "Fast Food",
    "Others",
  ];
  const dispatch = useDispatch();

  // Handle Image Selection
  // const handleImage = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setBackendImage(file);
  //     setFrontendImage(URL.createObjectURL(file));
  //   }
  // };
  // Handle Image Selection with Compression
const handleImage = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Configuration options to reduce file size
  const options = {
    maxSizeMB: 0.8, // Target max size under 800 KB
    maxWidthOrHeight: 1024, // Resizes large phone images down to 1024px
    useWebWorker: true, // Runs compression in a background thread to prevent UI freezing
  };

  try {
    const compressedFile = await imageCompression(file, options);
    setBackendImage(compressedFile); // Stores the smaller file for submission
    setFrontendImage(URL.createObjectURL(compressedFile)); // Preview
  } catch (error) {
    console.error("Compression error:", error);
    // Fallback: use raw file if compression fails
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  }
};

  // // Handle Form Submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const formData = new FormData();
  //     formData.append("name", name);
  //     formData.append("price", price);
  //     formData.append("category", category);
  //     formData.append("foodType", foodType);

  //     if (backendImage) {
  //       formData.append("image", backendImage);
  //     }

  //     const result = await axios.post(
  //       `${serverUrl}/api/item/add-item`,
  //       formData,
  //       { withCredentials: true }
  //     );
  //     dispatch(setMyShopData(response.data.shop));
  //     navigate("/");
  //   } catch (error) {
  //     console.log("Server Error Response:", error.response?.data);
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("foodType", foodType);

    if (backendImage) {
      formData.append("image", backendImage);
    }

    // FIX: change variable to response (or use result.data.shop)
    const response = await axios.post(
      `${serverUrl}/api/item/add-item`,
      formData,
      { withCredentials: true }
    );

    if (response.data.shop) {
      dispatch(setMyShopData(response.data.shop));
    }
    navigate("/");
  } catch (error) {
    console.log("Server Error Response:", error.response?.data);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex justify-center flex-col items-center p-4 bg-gradient-to-br from-orange-50 relative to-white min-h-screen">
      {/* Back Button */}
      <div
        className="absolute top-4 left-4 z-10 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IoIosArrowRoundBack size={32} className="text-[#ff4d2d]" />
      </div>

      {/* Main Form Container (Compacted) */}
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-5 sm:p-6 border border-orange-100">
        <div className="flex flex-col items-center mb-4">
          <div className="bg-orange-100 p-3 rounded-full mb-2">
            <FaUtensils className="text-[#ff4d2d] w-8 h-8" />
          </div>
          <div className="text-xl font-bold text-gray-900">
            Add Food
          </div>
        </div>

        {/* Form Fields */}
        <form className="space-y-3.5" onSubmit={handleSubmit}>
          {/* Shop Name */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Food Name"
              className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          {/* Shop Image */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Food Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-3 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              onChange={handleImage}
            />
            {frontendImage && (
              <div className="mt-2">
                <img
                  src={frontendImage}
                  alt="Shop Preview"
                  className="w-full h-32 object-cover rounded-md border"
                />
              </div>
            )}
          </div>

          {/* Item price (No Spinners, Numbers Only) */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              placeholder="0"
              className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>

          {/* Item category */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Select Category
            </label>
            <select
              className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="">Select Category</option>
              {categories.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Food type */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Select Food Type
            </label>
            <select
              className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setFoodType(e.target.value)}
              value={foodType}
            >
              <option value="Veg">veg</option>
              <option value="Non-Veg">non-veg</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#ff4d2d] text-white py-2 rounded-md font-semibold text-sm shadow hover:bg-orange-600 transition-all duration-200 cursor-pointer mt-2"
            disabled={loading}
          >
            {loading ? <ClipLoader size={18} color={"#fff"} /> : "Add Food"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;