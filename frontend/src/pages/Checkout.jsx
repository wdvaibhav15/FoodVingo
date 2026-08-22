import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";

const Checkout = () => {
  return (
    <div>
      {/* heading */}
              <div className="flex item-center gap-[20px]">
                <div className=" z-10 cursor-pointer" onClick={() => navigate("/")}>
                  <IoIosArrowRoundBack size={35} className="text-[#ff4d2d]" />
                </div>
                <h1 className=" text-start font-bold text-2xl">
                  Your delivery Cridentials
                </h1>
              </div>
    </div>
  )
}

export default Checkout
