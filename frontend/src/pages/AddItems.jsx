import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMyShopData } from "../redux/ownerSlice"; // adjust import path to your slice
import { serverUrl } from "../App"; // adjust import path to your serverUrl
import { ClipLoader } from "react-spinners";

const AddItems = () => {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);
  const [loading, setLoading] = useState(false);
  // States
  const [name, setName] = useState();
  const [price, setPrice] = useState(0);
  const [backendImage, setBackendImage] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null)
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("Veg");
  const categories = ["Snacks", "Main Course", "Dessert", "Pizza", "Burger", "Sandwich", "South Indian", "North Indian", "Chinese", "Fast Food", "Others"];
  const dispatch = useDispatch();

  // Handle Image Selection
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
  };

  // Handle Form Submission
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

      const result = await axios.post(
        `${serverUrl}/api/item/add-item`,
        formData,
        { withCredentials: true }
      );
      dispatch(setMyShopData(result.data));
      setLoading(false);
      navigate("/");

    } catch (error) {
      console.log("Server Error Response:", error.response?.data);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen">
      {/* Back Button */}
      <div
        className="absolute top-[20px] left-[20px] z-[10] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IoIosArrowRoundBack size={35} className="text-[#ff4d2d]" />
      </div>

      {/* Main Form Container - Widened */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-orange-100">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full mb-4">
            <FaUtensils className="text-[#ff4d2d] w-14 h-14" />
          </div>
          <div className="text-2xl font-extrabold text-gray-900">
            Add Food
          </div>
        </div>

        {/* Form Fields */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Shop Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Food Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          {/* Shop Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={handleImage}
            />
            {frontendImage && (
              <div className="mt-4">
                <img
                  src={frontendImage}
                  alt="Shop Preview"
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>
          
          {/* Item price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              placeholder="0.00"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>

          {/* Item category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
             Select Category
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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

           {/* food type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
             Select Food Type
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
            className="w-full bg-[#ff4d2d] text-white py-2.5 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200 cursor-pointer"
            disabled = {loading}
          >
            {loading ?<ClipLoader size={20} color={"#fff"}/> : "Item Added"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;