
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { SERVER_URL } from "../config/env.js";

const SignUp = () => {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${SERVER_URL}/api/auth/signup`,
        {
          fullName,
          email,
          mobile,
          password,
          role: role.toLowerCase(),
        },
        { withCredentials: true }
      );
      console.log(result);

      if (result.status === 201) {
        toast.success(result.data.message || "Account created successfully!");
        navigate("/signin");
      }
    } catch (error) {
      console.error(error);
      const errorMsg =
        error.response?.data?.message || "Failed to sign up. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md p-8"
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1
          className="text-2xl font-bold mb-2 text-center"
          style={{ color: primaryColor }}
        >
          Sign Up to FoodVingo
        </h1>

        <p className="text-gray-600 mb-6 text-center text-sm">
          Create your account to get started with delicious food deliveries
        </p>

        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <label
              htmlFor="fullname"
              className="block text-gray-700 font-medium mb-1 text-sm"
            >
              Full Name
            </label>
            <input
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              id="fullname"
              type="text"
              required
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1 text-sm"
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

          <div className="mb-3">
            <label
              htmlFor="mobile"
              className="block text-gray-700 font-medium mb-1 text-sm"
            >
              Mobile Number
            </label>
            <input
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              id="mobile"
              type="tel"
              required
              placeholder="Enter your mobile number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1 text-sm"
            >
              Password
            </label>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {!showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-center text-gray-700 font-medium mb-2 text-sm">
              Select Role
            </label>
            <div className="flex gap-2">
              {["user", "owner", "deliveryBoy"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setRole(item)}
                  className="cursor-pointer flex-1 border rounded-lg px-2 py-2 text-sm font-medium transition-colors capitalize"
                  style={
                    role === item
                      ? {
                          backgroundColor: primaryColor,
                          color: "#fff",
                          borderColor: primaryColor,
                        }
                      : {
                          borderColor: primaryColor,
                          color: primaryColor,
                        }
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="font-bold cursor-pointer w-full px-3 py-2.5 rounded-lg text-white transition-all duration-300 hover:bg-[#e64323]"
            style={{ backgroundColor: primaryColor }}
          >
            Sign Up
          </button>
        </form>

        <div className="flex gap-3 mt-3">
          <button
            type="button"
            className="border border-gray-300 flex items-center justify-center font-bold cursor-pointer w-full px-2 py-2 rounded-lg text-black transition-all duration-300 gap-2 hover:bg-gray-100 text-sm"
          >
            SignUp with <FcGoogle className="text-xl" />
          </button>

          <button
            type="button"
            className="border border-gray-300 flex items-center justify-center font-bold cursor-pointer w-full px-2 py-2 rounded-lg text-black transition-all duration-300 gap-2 hover:bg-gray-100 text-sm"
          >
            SignUp with <FaFacebook className="text-[#1877F2] text-xl" />
          </button>
        </div>

        <p className="mt-5 text-sm flex items-center justify-center text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-[#ff4d2d] ml-2 font-semibold hover:underline">
            SignIn
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;