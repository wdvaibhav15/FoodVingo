import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.user);
  return (
    <div className="min-h-screen bg-[#fff9f6] flex justify-center p-6">
      <div className="w-full max-w-[800px]">
        {/* heading */}
        <div className="flex item-center gap-[20px]">
          <div className=" z-10 cursor-pointer" onClick={() => navigate("/")}>
            <IoIosArrowRoundBack size={35} className="text-[#ff4d2d]" />
          </div>
          <h1 className=" text-start font-bold text-2xl">
            Your Cart Collection
          </h1>
        </div>
        {/* cartItems */}
        {cartItems?.length == 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            {/* Icon Container with soft glow */}
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-orange-100 blur-xl opacity-70"></div>
              <div className="relative flex items-center justify-center w-28 h-28 bg-gradient-to-tr from-orange-50 to-orange-100 border border-orange-200 rounded-full shadow-inner">
                <svg
                  className="w-12 h-12 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.75"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {/* Decorative floating badge */}
                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-md">
                  0
                </span>
              </div>
            </div>

            {/* Typography */}
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
              Your cart is <span className="text-orange-600">Empty</span>
            </h2>
            <p className="mt-2 text-sm text-gray-500 max-w-sm">
              Looks like you haven't added anything to your cart yet. Explore
              our collection and find something you love!
            </p>

            {/* Action Button */}
            <button
              onClick={() => navigate("/")}
              type="button"
              className=" cursor-pointer mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg shadow-orange-500/20 hover:from-orange-600 hover:to-red-600 hover:shadow-orange-500/30 transition-all duration-200 active:scale-95"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Explore Products
            </button>
          </div>
        ) : (
          <div className="mt-10">
            {cartItems?.map((item,index) => (
              <CartItemCard key={index} data={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
