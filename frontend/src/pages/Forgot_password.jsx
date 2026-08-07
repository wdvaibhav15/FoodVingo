
import React, { useState } from "react";
import { FaBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { SERVER_URL } from "../config/env.js";

const Forgot_password = () => {
  const primaryColor = "#ff4d2d";
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${SERVER_URL}/api/auth/send-otp`,
        { email: email.trim() },
        { withCredentials: true }
      );
      console.log(result);
      toast.success(result.data.message || "OTP sent successfully!");
      setStep(2);
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Failed to send OTP";
      toast.error(errorMessage);
    }
  };

  const handleOtpVarification = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${SERVER_URL}/api/auth/verify-otp`,
        { email: email.trim(), otp: otp.trim() },
        { withCredentials: true }
      );
      console.log(result);
      toast.success(result.data.message || "OTP verified!");
      setStep(3);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    try {
      const result = await axios.post(
        `${SERVER_URL}/api/auth/reset-password`,
        { email: email.trim(), newPassword },
        { withCredentials: true }
      );
      console.log(result);
      toast.success(result.data.message || "Password reset successfully!");
      navigate("/signin");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <h1
          className="text-3xl font-bold mb-2 text-center"
          style={{ color: primaryColor }}
        >
          FoodVingo
        </h1>

        <div className="flex mt-6 items-center gap-4 mb-4">
          <FaBackward
            onClick={() => navigate("/signin")}
            size={20}
            className="text-[#ff4d2d] cursor-pointer"
          />
          <h3 className="text-xl mb-1 font-bold text-center">Forgot Password</h3>
        </div>

        {/* Step 1: Send OTP */}
        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="ml-1 block text-gray-700 font-medium mb-1 text-sm"
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
            <button
              type="submit"
              className="font-bold cursor-pointer w-full px-3 py-2.5 rounded-lg text-white transition-all duration-300 hover:bg-[#e64323]"
              style={{ backgroundColor: primaryColor }}
            >
              Send OTP
            </button>
          </form>
        )}

        {/* Step 2: Verify OTP */}
        {step === 2 && (
          <form onSubmit={handleOtpVarification}>
            <div className="mb-3">
              <label className="ml-1 block text-gray-700 font-medium mb-1 text-sm">
                Enter Sent OTP
              </label>
              <input
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                type="text"
                required
                placeholder="Enter OTP"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm"
              />
            </div>
            <button
              type="submit"
              className="font-bold cursor-pointer w-full px-3 py-2.5 rounded-lg text-white transition-all duration-300 hover:bg-[#e64323]"
              style={{ backgroundColor: primaryColor }}
            >
              Verify OTP
            </button>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <div className="mb-3">
              <label
                htmlFor="newPassword"
                className="ml-1 block text-gray-700 font-medium mb-1 text-sm"
              >
                Enter New Password
              </label>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                type="password"
                required
                placeholder="Enter New Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm"
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="confirmPassword"
                className="ml-1 block text-gray-700 font-medium mb-1 text-sm"
              >
                Confirm Password
              </label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                required
                placeholder="Confirm Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm"
              />
            </div>

            <button
              type="submit"
              className="font-bold cursor-pointer w-full px-3 py-2.5 rounded-lg text-white transition-all duration-300 hover:bg-[#e64323]"
              style={{ backgroundColor: primaryColor }}
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Forgot_password;