
import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { FaUtensils, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Ownerdashboard = () => {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);

  return (
    <div className="w-full min-h-screen bg-[#fff9f6] flex flex-col items-center pb-12">
      <Navbar />

      {/* Case 1: No Shop Created Yet */}
      {!myShopData && (
        <div className="flex justify-center items-center p-4 mt-8">
          <div className="w-full max-w-sm bg-white shadow-md rounded-2xl p-6 border border-gray-100 text-center">
            <FaUtensils className="text-[#ff4d2d] w-10 h-10 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-gray-800 mb-1.5">
              Add Your Shop
            </h2>
            <p className="text-xs text-gray-500 mb-4 px-2">
              Join our food delivery platform and reach thousands of hungry
              customers every minute.
            </p>
            <button
              onClick={() => navigate("/create-edit-shop")}
              className="bg-[#ff4d2d] text-white py-1.5 px-6 rounded-full text-xs font-semibold shadow hover:bg-[#e03d24] transition-all cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* Case 2: Shop Exists */}
      {myShopData && (
        <div className="w-full flex flex-col items-center gap-5 px-4">
          {/* Welcome Header */}
          <h1 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2 mt-6 text-center">
            <FaUtensils className="text-[#ff4d2d] w-5 h-5 sm:w-6 sm:h-6" />
            Welcome to {myShopData.name}
          </h1>

          {/* Shop Card */}
          <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100 w-full max-w-sm sm:max-w-md relative">
            {/* Edit Button */}
            <div
              onClick={() => navigate("/create-edit-shop")}
              className="absolute top-2.5 right-2.5 bg-[#ff4d2d] text-white p-2 rounded-full shadow hover:bg-[#e03d24] transition-all cursor-pointer"
            >
              <FaEdit size={14} />
            </div>

            {/* Shop Image */}
            {myShopData?.image ? (
              <img
                src={myShopData.image}
                alt={myShopData.name}
                className="w-full h-40 sm:h-44 object-cover"
              />
            ) : (
              <div className="w-full h-40 sm:h-44 bg-orange-50 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-orange-200">
                <FaUtensils className="text-orange-300 w-7 h-7" />
                <p className="text-xs font-medium text-gray-400">
                  No Shop Image Uploaded
                </p>
                <button
                  onClick={() => navigate("/create-edit-shop")}
                  className="px-3 py-1 bg-[#ff4d2d] text-white text-xs font-semibold rounded-md shadow hover:bg-[#e03d24] transition-all cursor-pointer"
                >
                  Upload Image
                </button>
              </div>
            )}

            {/* Shop Details */}
            <div className="p-3.5 space-y-0.5">
              <h2 className="text-sm font-bold text-gray-900 leading-tight">
                {myShopData.name}
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                {myShopData.city}, {myShopData.state}
              </p>
              <p className="text-xs text-gray-400">
                {myShopData.address}
              </p>
            </div>
          </div>

          {/* Add Food Item Card (Shown when items array is empty) */}
          {(!myShopData?.items || myShopData.items.length === 0) && (
            <div className="w-full max-w-[280px] sm:max-w-[300px] bg-white shadow-md rounded-2xl p-5 border border-gray-100 flex flex-col items-center text-center mt-1">
              <FaUtensils className="text-[#ff4d2d] w-8 h-8 mb-2" />
              <h2 className="text-sm font-bold text-gray-800 mb-1">
                Add Your Food Item
              </h2>
              <p className="text-[11px] text-gray-500 leading-tight mb-3">
                Share your delicious creations with our customers by adding them to the menu.
              </p>
              <button

                onClick={() => navigate("/add-items")}
                className="bg-[#ff4d2d] cursor-pointer text-white py-1.5 px-5 rounded-full text-xs font-semibold shadow hover:bg-[#e03d24] transition-all cursor-pointer"
              >
                Add Food
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Ownerdashboard;