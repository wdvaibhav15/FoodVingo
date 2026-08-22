import React, { useState } from "react";
import { FaLeaf } from "react-icons/fa";
import { FaDrumstickBite } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/userSlice";

const FoodCard = ({ data }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const {cartItems} = useSelector(state => state.user);
  const renderStarts = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar className="text-[#ff4d2d] text-lg" />
        ) : (
          <FaRegStar className="text-[#ff4d2d] text-lg" />
        ),
      );
    }
    return stars;
  };

  const handleQuantityIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  }

  return (
    <div className="w-[250px] rounded-2xl border-2 border-[#ff4d2d]  bg-white shadow-md overflow-hidden hover:shadow-xl transition-all furation-300 flex flex-col">
      <div className="relative w-full h-[170px] flex justify-center items-center bg-white">
        <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow">
          {data?.foodType?.toLowerCase() === "veg" ? (
            <FaLeaf size={20} className="text-green-600 text-lg" />
          ) : (
            <FaDrumstickBite size={20} className="text-red-600 text-lg" />
          )}
        </div>
        <img
          src={data?.image}
          alt={data?.name || data?.category || "Card image"}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* name of food */}
        <h2 className="text-lg font-semibold text-gray-800 mb-1.5 truncate">
          {data?.name || data?.category || data?.shopName}
        </h2>
        {/* rating */}
        <div className="flex items-center gap-1 mt-1">
          {renderStarts(data?.rating?.average || 0)}
          <span className="text-xs text-gray-500">
            ({data?.rating?.count || 0})
          </span>
        </div>
        {/* description of food */}
        <p className="text-xs text-gray-500 mb-4 px-2">
          {data?.description || ""}
        </p>
        <div className="flex justify-between items-center">
          {/* price */}
          <span className="text-sm font-semibold text-gray-800">
            ${data?.price}
          </span>
          {/* cart button */}
          <div className="flex items-center bg-gray-100 rounded-full p-0.5 border border-gray-200">
            {/* Minus Button */}
            <button
              onClick={handleQuantityDecrease}
              className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#ff4d2d] rounded-full transition-all text-sm font-bold active:scale-90 "
            >
              <CiCircleMinus size={30} />
            </button>

            {/* Quantity */}
            <span className="text-xs font-bold text-gray-800 px-2 min-w-[20px] text-center select-none">
              {quantity}
            </span>

            {/* Plus Button */}
            <button
              onClick={handleQuantityIncrease}
              className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#ff4d2d] rounded-full transition-all text-sm font-bold active:scale-90 "
            >
              <CiCirclePlus size={30} />
            </button>

            {/* Add to Cart */}
            <button
              onClick={() => dispatch(addToCart({
                id:data._id,
                name:data.name,
                price:data.price,
                image:data.image,
                shop:data.shop,
                quantity,
                foodType:data.foodType,
              }))}
              type="button"
              className= {`${cartItems.some((item) => item.id === data._id) ? "bg-gray-800" : "bg-[#ff4d2d]" } text-white px-3.5 py-1.5 rounded-full text-xs font-semibold hover:bg-[#e03d24] transition-all shadow-sm active:scale-95 ml-1`}
            >
              Add Food
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
