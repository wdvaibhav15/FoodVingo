import React, { useState } from "react";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "../config/env";
import { setUserData } from "../redux/userSlice";
import { TiPlus } from "react-icons/ti";
import { FaReceipt } from "react-icons/fa";

const Navbar = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const dispatch = useDispatch();

  const { userData, currentCity } = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.owner);
  const handleLogout = async () => {
    console.log("Logout triggered! Current userData:", userData);
    try {
      const response = await axios.get(`${SERVER_URL}/api/auth/logout`, {
        withCredentials: true,
      });
      console.log("Logout API Success:", response.data);
      dispatch(setUserData(null));
    } catch (error) {
      console.error(
        "Logout error details:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <header className="w-full h-[65px] md:h-[85px] fixed top-0 left-0 right-0 z-[999] bg-[#fffaf7] px-4 md:px-12 flex items-center justify-between md:justify-center gap-8 md:gap-8">
      {/*  Logo */}
      <div className="flex items-center">
        <h1 className="text-3xl md:text-2xl font-bold text-[#e03d24] cursor-pointer tracking-tight">
          FoodVingo
        </h1>
      </div>

      {/* Desktop Search Box */}
      {userData.role == "user" && (
        <div className="hidden md:flex items-center bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] rounded-xl px-5 py-3.5 w-[55%] max-w-[650px] gap-4">
          <div className="flex items-center gap-2.5 min-w-[100px] max-w-[140px]">
            <FaLocationDot className="text-[#e03d24] text-xl shrink-0" />
            <span className="text-sm font-medium text-gray-700 truncate">
              {currentCity}
            </span>
          </div>

          <div className="h-6 w-[1px] bg-gray-200"></div>

          {/* Search bar */}
          <div className="flex items-center gap-3 flex-1">
            <FaSearch className="text-gray-400 text-sm shrink-0" />
            <input
              type="text"
              placeholder="search delicious food"
              className="w-full text-sm text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Right buttons */}
      <div className="flex items-center gap-3 md:gap-6">
        {userData?.role === "user" && (
          <button
            onClick={() => setShowSearchBar((prev) => !prev)}
            className="md:hidden text-[#e03d24] p-1 focus:outline-none"
            aria-label="Toggle Search Bar"
          >
            {showSearchBar ? <ImCross size={16} /> : <FaSearch size={18} />}
          </button>
        )}

        {/* section for owner */}
        {userData?.role === "owner" ? (
          <>
            {userData?.role === "owner" && (
              <div>
                <button className="hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] font-semibold">
                  <TiPlus
                    size={20}
                    className="bg-[#ff4d2d] text-white rounded-full"
                  />
                  <span>Add Food Items</span>
                </button>
                <button className=" md:hidden flex items-center p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] font-semibold">
                  <TiPlus
                    size={20}
                    className="bg-[#ff4d2d] text-white rounded-full"
                  />
                </button>
              </div>
            )}

            <div>
              <button className="hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] font-semibold">
                <FaReceipt size={20} />
                <span>Pending Orders</span>
                <span className="relative -right-1 -top-4 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px]">
                  0
                </span>
              </button>
              <button className=" md:hidden flex items-center p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] font-semibold">
                <FaReceipt size={20} />
                <span className="relative -right-1 -top-4 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px]">
                  0
                </span>
              </button>
            </div>
          </>
        ) : (
          //   <div>
          //     {/* Cart Button */}
          //     <div className="relative cursor-pointer p-1 flex items-center">
          //     <FaCartPlus className="text-[#e03d24] text-lg md:text-xl" />
          //     <span className="absolute -top-1 -right-1.5 text-[10px] md:text-xs text-[#e03d24] font-semibold">
          //       0
          //     </span>
          //   </div>
          //   {/* My Orders */}
          // <button className="hidden md:block px-4 py-2 rounded-xl bg-[#feeae6] text-[#e03d24] text-xs md:text-sm font-semibold hover:bg-[#fddbd4] transition-colors">
          //   My Orders
          // </button>
          //   </div>
          <div className="flex items-center gap-3 md:gap-5">
            {/* 1. My Orders Button First */}
            <button className="hidden md:block px-4 py-2 rounded-xl bg-[#feeae6] text-[#e03d24] text-xs md:text-sm font-semibold hover:bg-[#fddbd4] transition-colors cursor-pointer">
              My Orders
            </button>

            {/* 2. Cart Icon with Badge in Top-Right Corner */}
            <div className="relative cursor-pointer p-1.5 flex items-center justify-center">
              <FaCartPlus className="text-[#e03d24] text-xl md:text-2xl" />
              <span className="absolute -top-1 -right-2 bg-[#e03d24] text-white text-[10px] md:text-xs font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center leading-none">
                0
              </span>
            </div>
          </div>
        )}

        {/* Profile section */}
        <div
          onClick={() => setShowInfo((prev) => !prev)}
          className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#e03d24] text-white flex items-center justify-center font-bold text-sm md:text-base shadow-sm cursor-pointer select-none hover:opacity-90 transition-opacity"
        >
          {userData?.fullName?.charAt(0) || "A"}
        </div>
      </div>

      {showSearchBar && userData.role == "user" && (
        <div className="md:hidden absolute top-[65px] left-0 right-0 bg-[#fffaf7] px-4 pt-1 pb-3 shadow-md z-50 border-b border-gray-100">
          <div className="flex items-center bg-white shadow-sm rounded-xl px-3 py-2 w-full gap-2.5">
            <div className="flex items-center gap-1.5 min-w-[85px]">
              <FaLocationDot className="text-[#e03d24] text-sm shrink-0" />
              <span className="text-xs font-medium text-gray-700 truncate">
                {currentCity}
              </span>
            </div>
            <div className="h-4 w-[1px] bg-gray-200"></div>
            <div className="flex items-center gap-2 flex-1">
              <FaSearch className="text-gray-400 text-xs shrink-0" />
              <input
                type="text"
                placeholder="search delicious food"
                className="w-full text-xs text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {showInfo && (
        <div className="absolute top-[60px] md:top-[80px] right-4 md:right-12 w-48 bg-white shadow-2xl rounded-xl p-4 flex flex-col gap-3 z-[1000] border border-gray-100">
          <div className="text-base font-bold text-gray-800 border-b border-gray-100 pb-2 truncate">
            {userData?.fullName || "User"}
          </div>
          <button className="md:hidden text-left text-sm font-semibold text-[#e03d24] hover:underline">
            My Orders
          </button>
          <button
            onClick={handleLogout}
            className="text-left text-sm font-semibold text-[#e03d24] hover:underline"
          >
            Log Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
