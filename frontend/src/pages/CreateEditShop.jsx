import React, { useState, useEffect } from "react";
import { IoMdArrowRoundBack as BackIcon } from "react-icons/io";
import { FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SERVER_URL } from "../config/env";
import { setMyShopData } from "../redux/ownerSlice";

const CreateEditShop = () => {
  const navigate = useNavigate();
  
  // Get myShopData from Redux (or pass it via props)
  const { myShopData } = useSelector((state) => state.owner);
  const {currentCity , currentState, currentAddress } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
    address: "",
  });

  const [name, setName] = useState(myShopData?.name || "");
  const [address, setAddress] = useState(myShopData?.address || currentAddress || "");
  const [city, setCity] = useState(myShopData?.city || currentCity || "");
  const [state, setState] = useState(myShopData?.state || currentState || "");
  const [frontendImage, setFrontendImage] = useState(myShopData?.image || null);
  const [backendImage, setBackendImage] = useState(null);
  

  // const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //         const formData = new FormData();
  //         formData.append("name", name);
  //         formData.append("city", city);
  //         formData.append("state", state);
  //         formData.append("address", address);
  //         if(backendImage) {
  //           formData.append("image", backendImage);
  //         }
  //         const result = await axios.post(`${SERVER_URL}/api/shop/create-update`, formData, 
  //           {
  //             withCredentials: true,
  //         })
  //         dispatch(setMyShopData(result.data.user));
  //         console.log(result.data)

  //     }catch (error) {
  //         console.log(error);
  //     }
  // }

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

// 1. Correct Image Change Handler
const handleImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file)); 
  }
};

// 2. Form Submission
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("address", address);

    // 💡 ONLY append image if a file was selected
    if (backendImage) {
      formData.append("image", backendImage); // 👈 Field name MUST be 'image'
    }

    const result = await axios.post(`${SERVER_URL}/api/shop/create-update`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Response:", result.data);
    dispatch(setMyShopData(result.data.shop));
    navigate("/");
  } catch (error) {
    console.error("Error submitting shop form:", error.response?.data || error.message);
  }
};

  useEffect(() => {
    if (myShopData) {
      setName(myShopData.name || "");
      setCity(myShopData.city || "");
      setState(myShopData.state || "");
      setAddress(myShopData.address || "");
      setFrontendImage(myShopData.image || null);
    } else {
      if (currentCity) setCity(currentCity);
      if (currentState) setState(currentState);
      if (currentAddress) setAddress(currentAddress);
    }
  }, [myShopData, currentCity, currentState, currentAddress]);

 

  return (
    <div className="flex justify-center flex-col items-center p-4 md:p-6 bg-gradient-to-br from-orange-50 to-white min-h-screen relative">
      {/* Back Button */}
      <div
        onClick={() => navigate("/")}
        className="cursor-pointer absolute top-5 left-5 z-10 hover:opacity-80 transition-opacity"
      >
        <BackIcon size={30} className="text-[#ff4d2d]" />
      </div>

      {/* Main Form Box */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col items-center my-6 border border-gray-100">
        
        {/* Utensils Circular Icon */}
        <div className="w-16 h-16 rounded-full bg-[#ff4d2d]/10 flex items-center justify-center mb-3">
          <FaUtensils size={26} className="text-[#ff4d2d]" />
        </div>

        {/* Dynamic Title using Ternary Operator */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {myShopData ? "Edit Shop" : "Add Shop"}
        </h2>

        {/* Form */}
        <form 
        onSubmit={handleSubmit} 
        className="w-full space-y-4">
          
          {/* Shop Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter shop name"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]/30 focus:border-[#ff4d2d]"
              required
            />
          </div>

          {/* Shop Image Upload */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Shop Image
            </label>
            <input
              
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full text-xs text-gray-500 border border-gray-300 rounded-lg p-1.5 cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#ff4d2d]/10 file:text-[#ff4d2d] hover:file:bg-[#ff4d2d]/20"
              required={!myShopData} // Required only when adding a new shop
            />
          </div>

          {/* Image Preview Window */}
          { frontendImage && (
            <div className="w-full h-36 rounded-lg overflow-hidden border border-gray-200 shadow-inner mt-2">
              <img
                src={frontendImage}
                alt="Shop Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* City & State Side-by-Side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]/30 focus:border-[#ff4d2d]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                State
              </label>
              <input
                type="text"
                name="state"
                value={state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="State"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]/30 focus:border-[#ff4d2d]"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter complete shop address"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]/30 focus:border-[#ff4d2d]"
              required
            />
          </div>

          {/* Dynamic Submit Button Label using Ternary Operator */}
          <button
            type="submit"
            className="w-full bg-[#ff4d2d] hover:bg-[#e03d24] text-white font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 mt-2 cursor-pointer active:scale-[0.99]"
          >
            {myShopData ? "Save Changes" : "Add Shop"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditShop;