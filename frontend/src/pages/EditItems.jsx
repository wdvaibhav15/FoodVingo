import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaUtensils } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setMyShopData } from "../redux/ownerSlice";
import { serverUrl } from "../App";

const EditItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { itemId } = useParams();

  // Form States
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [backendImage, setBackendImage] = useState(null);
  const [frontendImage, setFrontendImage] = useState("");
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("Veg");
  const [loading, setLoading] = useState(false);

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

  // Fetch Item Details
  useEffect(() => {
    let isMounted = true;

    const fetchItemDetails = async () => {
      try {
        const { data } = await axios.get(
          `${serverUrl}/api/item/get-itemBy-id/${itemId}`,
          { withCredentials: true }
        );

        const item = data.item || data;

        if (isMounted && item) {
          setName(item.name || "");
          setPrice(item.price || 0);
          setCategory(item.category || "");
          setFoodType(item.foodType || "Veg");
          setFrontendImage(item.image || "");
        }
      } catch (error) {
        console.error("Fetch Item Error:", error.response?.data || error.message);
      }
    };

    if (itemId) {
      fetchItemDetails();
    }

    return () => {
      isMounted = false;
    };
  }, [itemId]);

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

      const response = await axios.put(
        `${serverUrl}/api/item/edit-item/${itemId}`,
        formData,
        { withCredentials: true }
      );

      if (response.data.shop) {
        dispatch(setMyShopData(response.data.shop));
      }

      navigate("/");
    } catch (error) {
      console.error("Update Error:", error.response?.data || error.message);
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
          <h1 className="text-xl font-bold text-gray-900">Edit Food</h1>
        </div>

        {/* Form Fields */}
        <form className="space-y-3.5" onSubmit={handleSubmit}>
          {/* Food Name */}
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
              required
            />
          </div>

          {/* Food Image */}
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
                  alt="Item Preview"
                  className="w-full h-32 object-cover rounded-md border"
                />
              </div>
            )}
          </div>

          {/* Item Price (Numbers only, hidden spinners) */}
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
              required
            />
          </div>

          {/* Item Category */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Select Category
            </label>
            <select
              className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Food Type */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Select Food Type
            </label>
            <select
              className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setFoodType(e.target.value)}
              value={foodType}
              required
            >
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff4d2d] text-white py-2 rounded-md font-semibold text-sm shadow hover:bg-orange-600 transition-all duration-200 cursor-pointer disabled:opacity-60 mt-2"
          >
            {loading ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditItems;