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
              className="bg-[#ff4d2d] text-white py-2 px-5 sm:px-6 mt-3 rounded-full font-medium shadow-md hover:bg-orange-700 transition-colors duration-300">Get Started</button>
          </div>
        </div>
      </div>
      }

      {/* // My Shop Data */}
      {myShopData && (
        <div className="w-full flex flex-col items-center gap-6 px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3 mt-8 text-center">Welcome to {myShopData.name}</h1>

        </div>
      )}
    </div>
  )
}

export default Ownerdashboard
