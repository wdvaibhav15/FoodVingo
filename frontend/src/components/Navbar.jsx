import React, { useState } from "react";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch, FaCartPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "../config/env";
import { setUserData } from "../redux/userSlice";

const Navbar = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const dispatch = useDispatch();

  const { userData, city } = useSelector((state) => state.user);

//   const handleLogout = async () => {
//     try {
//       await axios.get(`${SERVER_URL}/api/auth/logout`, {
//         withCredentials: true,
//       });
//       console.log(userData)
//       dispatch(setUserData(null));
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };
const handleLogout = async () => {
  // 1. Log immediately when clicked
  console.log("Logout triggered! Current userData:", userData);

  try {
    const response = await axios.get(`${SERVER_URL}/api/auth/logout`, {
      withCredentials: true,
    });
    
    console.log("Logout API Success:", response.data);
    dispatch(setUserData(null));
  } catch (error) {
    // 2. Catch API failures (e.g., 404, 500, network error)
    console.error("Logout error details:", error.response?.data || error.message);
  }
};

  return (
    <header className="w-full h-[80px] fixed top-0 left-0 right-0 z-[999] bg-[#fff9f6] border-b border-gray-100/50 px-4 md:px-8 lg:px-12 flex items-center justify-between">
      
      {/* 1. Brand Logo */}
      <div className="flex items-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#ff4d2d] cursor-pointer tracking-tight">
          FoodVingo
        </h1>
      </div>

      {/* 2. Desktop Search Pill (Hidden on Mobile) */}
      <div className="hidden md:flex items-center bg-white shadow-md rounded-full px-4 py-2 w-[50%] max-w-[550px] border border-gray-100 gap-3">
        {/* City Indicator */}
        <div className="flex items-center gap-2 pr-3 border-r border-gray-300 min-w-[100px] max-w-[140px]">
          <FaLocationDot className="text-[#ff4d2d] text-lg shrink-0" />
          <span className="text-sm font-medium text-gray-700 truncate">
            {city || "Select City"}
          </span>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2 flex-1">
          <FaSearch className="text-[#ff4d2d] text-lg shrink-0" />
          <input
            type="text"
            placeholder="Search Your favourite food..."
            className="w-full text-sm text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* 3. Right Action Icons */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Mobile Search Toggle */}
        <button
          onClick={() => setShowSearchBar((prev) => !prev)}
          className="md:hidden text-[#ff4d2d] p-1 focus:outline-none"
          aria-label="Toggle Search Bar"
        >
          {showSearchBar ? <ImCross size={20} /> : <FaSearch size={22} />}
        </button>

        {/* Cart Icon */}
        <div className="relative cursor-pointer p-1">
          <FaCartPlus className="text-[#ff4d2d] text-2xl md:text-2xl" />
          <span className="absolute -top-1.5 -right-2 w-5 h-5 bg-[#ff4d2d] text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
            0
          </span>
        </div>

        {/* My Orders Button (Desktop Only) */}
        <button className="hidden md:block px-4 py-1.5 rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-semibold hover:bg-[#ff4d2d]/20 transition-colors">
          My Orders
        </button>

        {/* User Profile Avatar */}
        <div
          onClick={() => setShowInfo((prev) => !prev)}
          className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#ff4d2d] text-white flex items-center justify-center font-bold text-base md:text-lg shadow-md cursor-pointer select-none hover:opacity-90 transition-opacity"
        >
          {userData?.fullName?.charAt(0)}
        </div>
      </div>

      {/* 4. Mobile Dropdown Search Pill */}
      {showSearchBar && (
        <div className="md:hidden absolute top-[80px] left-0 right-0 bg-[#fff9f6] p-3 shadow-lg z-50 border-b border-gray-200">
          <div className="flex items-center bg-white shadow-md rounded-full px-4 py-2 w-full border border-gray-100 gap-2">
            {/* City */}
            <div className="flex items-center gap-1.5 pr-2 border-r border-gray-300 max-w-[110px]">
              <FaLocationDot className="text-[#ff4d2d] text-base shrink-0" />
              <span className="text-xs font-medium text-gray-700 truncate">
                {city || "City"}
              </span>
            </div>
            {/* Input */}
            <div className="flex items-center gap-2 flex-1">
              <FaSearch className="text-[#ff4d2d] text-base shrink-0" />
              <input
                type="text"
                placeholder="Search Your favourite food..."
                className="w-full text-xs text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* 5. User Profile Menu Dropdown */}
      {showInfo && (
        <div className="absolute top-[75px] right-4 md:right-12 w-48 bg-white shadow-2xl rounded-xl p-4 flex flex-col gap-3 z-[1000] border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="text-base font-bold text-gray-800 border-b border-gray-100 pb-2 truncate">
            {userData?.fullName || "User"}
          </div>
          <button className="md:hidden text-left text-sm font-semibold text-[#ff4d2d] hover:underline">
            My Orders
          </button>
          <button
            onClick={handleLogout}
            className="text-left text-sm font-semibold text-[#ff4d2d] hover:underline"
          >
            Log Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;