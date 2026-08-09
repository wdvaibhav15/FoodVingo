import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { ImCross } from "react-icons/im";
import { SERVER_URL } from '../config/env';
import { setUserData } from '../redux/userSlice';

const Navbar = () => {

    const [showInfo, setShowInfo] = React.useState(false);
    const dispatch = useDispatch();
    const {userdata, city} = useSelector((state) => state.user);
    const [showSearchBar, setShowSearchBar] = React.useState(false);

    const handleLogout = async () => {
        try {
            const result = await axios.get(`${SERVER_URL}/api/auth/logout`,{
                withCredentials: true
            });
            dispatch(setUserData(null));
        } catch (error) {
            console.log(error);
        }
    }




  return (
    <div className="w-fill h-[80px] flex items-center justify-between md:justify-center gap-[20px] fixed top-0 left-0 right-0 z-[9999] bg-[#fff9f6] overflow-visible">
        {showSearchBar &&
           <div className="w-[90%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] flex fixed top-[80px] left-[5%] md:hidden">
            //cities
            <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
                <FaLocationDot size={25} className=" text-[#ff4d2d]" />
                <div className="w-[80%] truncate text-gray-600">{city}</div>
            </div>
            // inputs
            <div className="w-[80%] flex items-center gap-[10px]">
                <FaSearch size={25} className=" text-[#ff4d2d]" />
                <input className="px-[10px] text-gray-700 outline-0 w-full" type="text" placeholder="Search Your favourite food..." className="w-[70%] focus:outline-none"/>
            </div>
        </div>
        }



        <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">FoodVingo</h1>
        <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] hidden md:flex">
            //cities
            <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
                <FaLocationDot size={25} className=" text-[#ff4d2d]" />
                <div className="w-[80%] truncate text-gray-600">{city}</div>
            </div>
            // inputs
            <div className="w-[80%] flex items-center gap-[10px]">
                <FaSearch size={25} className=" text-[#ff4d2d]" />
                <input className="px-[10px] text-gray-700 outline-0 w-full" type="text" placeholder="Search Your favourite food..." className="w-[70%] focus:outline-none"/>
            </div>
        </div>
        <div classname="flex item-center gap-4">
            {showSearchBar ? <ImCross size={25} className=" text-[#ff4d2d] md:hidden" onClick={()=>setShowSearchBar(false)} /> : <FaSearch size={25} className=" text-[#ff4d2d] md:hidden" onClick={()=>setShowSearchBar(true)} />}
            
      // cart section
      <div className="relative cursor-pointer">
        <FaCartPlus size={25} className="text-[#ff4d2d]" />
        //count items
        <span className="absolute top-[-12px] right-[-9px] w-[20px] h-[20px] bg-[#ff4d2d] text-white rounded-full flex justify-center items-center">0</span>
      </div>
      // my order
      <button className="hidden md:block pc-3 pt-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium">My Orders</button>
      // profile section
      <div
       onClick={() => setShowInfo(prev => !prev)}
       className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer">
        {userdata?.fullName.slice(0,1)}
      </div>
      {showInfo && 
         <div classname="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-lg p-[20px] flex flex-col gap-[10px] z-[9999]">
           <div className="text-[18px] font-semibold">{userdata?.fullName}</div>
           <div className="md:hidden text-[#ff4d2d] text-[14px] font-semibold cursor-pointer">My Orders</div>
           <div
            onClick={handleLogout}
            className="text-[#ff4d2d] text-[14px] font-semibold cursor-pointer">Log Out</div>
         </div>
      }
      </div>
    </div>
  )
}

export default Navbar
