import React, { useState } from 'react'
import { FaBackward } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Forgot_password = () => {
    const primaryColor = "#ff4d2d";

    const Navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className=" flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
            {/* Logo */}
        <h1
          className="text-3xl font-bold mb-2 text-center"
          style={{ color: primaryColor }}
        >
          FoodVingo
        </h1>
        <div className="flex mt-6 items-center gap-4 mb-4">
            <FaBackward onClick={()=> Navigate("/signin")} size={20} className="text-[#ff4d2d] cursor-pointer"/>
        <h3 className="text-xl mb-1 font-bold text-center">Forgot Password</h3>
        </div>

        {/* step--1 */}
        {step == 1 && (
          <div>
            {/* Email */}
              <div className="mb-3">
            <label
              htmlFor="email"
              className=" ml-3 block text-gray-700 font-medium mb-1 text-sm"
            >
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              type="email"
              required
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm"
            />
              </div>
            {/* Submit Button */}
              <button
                 type="submit"
                 className="font-bold cursor-pointer w-full px-3 py-2.5 rounded-lg text-white transition-all duration-300 hover:bg-[#e64323]"
                 style={{ backgroundColor: primaryColor }}
              >
                 Send Otp
              </button>
          </div>
        )}


        {/* step--2 */}
        {step == 2 && (
          <div>
            {/* Email */}
              <div className="mb-3">
            <label
              
              className=" ml-3 block text-gray-700 font-medium mb-1 text-sm"
            >
              Enter sended OTP
            </label>
            <input
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              type="tel"
              required
              placeholder="Enter OTP"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm"
            />
              </div>
            {/* Submit Button */}
              <button
                 type="submit"
                 className="font-bold cursor-pointer w-full px-3 py-2.5 rounded-lg text-white transition-all duration-300 hover:bg-[#e64323]"
                 style={{ backgroundColor: primaryColor }}
              >
                 Verify
              </button>
          </div>
        )}

        {/* step--3 */}
        {step == 3 && (
          <div>
            {/* Email */}
            <div className="mb-3">
            <label
              htmlFor="newPassword"
              className=" ml-3 block text-gray-700 font-medium mb-1 text-sm"
            >
              Enter New Password
            </label>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              type="tel"
              required
              placeholder="Enter New Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm"
            />
            </div>



            <div className="mb-3">
            <label
              htmlFor="ConfirmPassword"
              className=" ml-3 block text-gray-700 font-medium mb-1 text-sm"
            >
              Confirm Password
            </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type="tel"
              required
              placeholder="Confirm Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm"
            />
            </div>



            {/* Submit Button */}
              <button
                 type="submit"
                 className="font-bold cursor-pointer w-full px-3 py-2.5 rounded-lg text-white transition-all duration-300 hover:bg-[#e64323]"
                 style={{ backgroundColor: primaryColor }}
              >
                 Reset Password
              </button>
          </div>
        )}


      </div>
    </div>
  )
}

export default Forgot_password
