import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { TbCurrentLocationFilled } from "react-icons/tb";
import { MapContainer } from 'react-leaflet';
import { useSelector } from 'react-redux';

const Checkout = () => {
const {location, address} = useSelector(state => state.map)


  return (
    <div className="min-h-screen bg-[#fff9f6] flex items-center justify-center p-6">
      {/* heading */}
            <div className="absolute top-[20px] left-[20px] z-[10] cursor-pointer" onClick={() => navigate("/")}>
                <IoIosArrowRoundBack size={35} className="text-[#ff4d2d] text-bold" />
            </div>
            <div className="w-full max-w-[900px] bg-white rounded-2xl shadow-xl p-6 space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
                {/* map section */}
                <section>
                    <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800"> <FaLocationDot  
                    className="text-[#ff4d2d]"/> Delivery location</h2>
                    <div className="flex gap-2 mb-3">
                        <input type="text" className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]" placeholder="Enter your delivery address"/> 
                        <button className=" bg-[#ff4d2d] hover:bg-[#e03d26] text-white py-2 px-3 rounded-lg flex items-center justify-center"><FaSearch /></button>
                        <button className=" bg-blue-400 hover:bg-blue-600 text-white py-2 px-3 rounded-lg flex items-center justify-center"><TbCurrentLocationFilled /></button>
                    </div>
                    {/* MAP */}
                    <div className="rounded-xl border overflow-hidden">
                        <div className="h-64 w-full flex items-center justify-center">
                            <MapContainer className="w-full h-full" 
                            center={[location?.lat, location?.lng]} 
                            zoom={13} 
                            scrollWheelZoom={false} 
                            style={{ height: "100%", width: "100%" }}>

                            </MapContainer>
                        </div>
                    </div>
                </section>
            </div>
    </div>
  )
}

export default Checkout
