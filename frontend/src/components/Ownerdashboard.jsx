import React from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux';
import { FaUtensils } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Ownerdashboard = () => {

  const Navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);


  return (
    <div className="w-full min-h-screen bg-[#fff9f6] flex flex-col items-center">
      <Navbar/>
      { !myShopData && 
      <div className="flex justify-center items-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover-shadow-xl transition-shadow duration-300">
          <div className="flex flex-col items-center text-center">
              <FaUtensils className="text-[#ff4d2d] w-16 h-16 sm:w-15 sm:h-15 text-6xl mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Add Your Shop</h2>
              <p>Join our food delivery plateform and reach thousands of hungry customers every Minuts.</p>
              <button
              onClick={()=>Navigate("/create-edit-shop")} 
              className="bg-[#ff4d2d] text-white py-2 px-5 sm:px-6 mt-3 rounded-full font-medium shadow-md hover:bg-orange-700 transition-colors duration-300">
                Get Started</button>
          </div>
        </div>
      </div>
      }

      {/* // My Shop Data */}
      {/* {myShopData && (
        <div className="w-full flex flex-col items-center gap-6 px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3 mt-8 text-center">
            <FaUtensils className="text-[#ff4d2d] w-14 h-14 " />
            Welcome to {myShopData.name}</h1>

            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-all duration-300 w-full max-w-3xl relative">
              <img src={myShopData.image} alt={myShopData.name} className="w-full h-48 sm:h-64 object-cover"/>
            </div>

        </div>
      )} */}
      {myShopData && (
  <div className="w-full flex flex-col items-center gap-6 px-4 sm:px-6">
    {/* Welcome Header */}
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3 mt-8 text-center">
      <FaUtensils className="text-[#ff4d2d] w-8 h-8 sm:w-10 sm:h-10" />
      Welcome to {myShopData.name}
    </h1>

    {/* Shop Banner / Image Box */}
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-all duration-300 w-full max-w-3xl relative">
      
      {/* 💡 RENDER <img> ONLY IF A VALID IMAGE URL EXISTS */}
      {myShopData?.image ? (
        <img
          src={myShopData.image}
          alt={myShopData.name}
          className="w-full h-48 sm:h-64 object-cover"
        />
      ) : (
        /* Fallback UI when image is null */
        <div className="w-full h-48 sm:h-64 bg-orange-50 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-orange-200">
          <FaUtensils className="text-orange-300 w-12 h-12" />
          <p className="text-sm font-semibold text-gray-400">
            No Shop Image Uploaded
          </p>
          <button
            onClick={() => navigate("/create-edit-shop")}
            className="mt-1 px-4 py-1.5 bg-[#ff4d2d] text-white text-xs font-semibold rounded-lg shadow hover:bg-[#e03d24] transition-all cursor-pointer"
          >
            Upload Image
          </button>
        </div>
      )}
    </div>
  </div>
)}
    </div>
  )
}

export default Ownerdashboard
