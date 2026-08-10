
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { SERVER_URL } from "../config/env.js";

//firebase Google authentication
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebaseGoogle.js";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

const SignIn = () => {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors
    try {
      const result = await axios.post(
        `${SERVER_URL}/api/auth/signin`,
        {
          email: email.trim(),
          password,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data.user));
      setError("");
      setLoading(false);

      if (result.status === 200) {
        toast.success(result.data.message || "Signed in successfully!");
        navigate("/"); // Redirect to home or dashboard after signin
      }
    } catch (error) {
       setError(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  };

  // function for firebase Google authentication and then onClick in that button
  const handleGoogleSignIn = async () => {
     setError(""); // Clear previous errors
      // console.log(result.user.displayName, result.user.email);
      // alert("Google Sign In Successful!");

      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
      
        const {data} = await axios.post(`${SERVER_URL}/api/auth/google-auth`,{
          
          email: result.user.email,
        },{withCredentials: true});
        dispatch(setUserData(data));
        toast.success(data.message || "Signed up successfully!");
        navigate("/signin");
      } catch (error) {
      console.error("Google Auth Error:", error);

      // Handle Firebase specific error codes gracefully
      if (error.code === "auth/popup-closed-by-user") {
        setError("Google sign-in popup was closed.");
      } else {
        setError(
          error.response?.data?.message ||
            error.message ||
            "Google Authentication failed."
        );
      }
    }
    
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md p-8"
        style={{ border: `1px solid ${borderColor}` }}
      >
        {/* Logo */}
        <h1
          className="text-2xl font-bold mb-2 text-center"
          style={{ color: primaryColor }}
        >
          Sign In to FoodVingo
        </h1>

        {/* Heading */}
        <p className="text-gray-600 mb-6 text-center text-sm">
          Link your account to get started with delicious food deliveries
        </p>

        {/* Form Container */}
        <form onSubmit={handleSignIn}>
          {/* Email */}
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
              required
            />
          </div>

          {/* Password */}
          <div className="mb-2">
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
                required
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

          {/* Forgot Password */}
          <div
            onClick={() => navigate("/forgot-password")}
            className="cursor-pointer mb-4 text-right text-sm text-[#ff4d2d] hover:underline"
          >
            Forgot your password?
          </div>

          {/* Submit Button */}
          <button
            
            type="submit"
            className="font-bold cursor-pointer w-full px-3 py-2.5 rounded-lg text-white transition-all duration-300 hover:bg-[#e64323]"
            style={{ backgroundColor: primaryColor }}
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Sign Up"}
            
          </button>

          {error && (
            <p className="text-red-500 text-center text-sm mt-2 font-medium">
              *{error}
            </p>
          )}
        </form>

        {/* Social SignIns */}
        <div className="flex gap-3 mt-3">
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="border border-gray-300 flex items-center justify-center font-bold cursor-pointer w-full px-2 py-2 rounded-lg text-black transition-all duration-300 gap-2 hover:bg-gray-100 text-sm"
          >
            SignIn with <FcGoogle className="text-xl" />
          </button>

          <button
            type="button"
            className="border border-gray-300 flex items-center justify-center font-bold cursor-pointer w-full px-2 py-2 rounded-lg text-black transition-all duration-300 gap-2 hover:bg-gray-100 text-sm"
          >
            SignIn with <FaFacebook className="text-[#1877F2] text-xl" />
          </button>
        </div>

        {/* Footer Link */}
        <p className="mt-5 text-sm flex items-center justify-center text-gray-600">
          Create a new account?{" "}
          <Link
            to="/signup"
            className="text-[#ff4d2d] ml-2 font-semibold hover:underline"
          >
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;