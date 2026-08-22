import React, { use } from 'react';
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem, updateQuantity } from '../redux/userSlice';

const CartItemCard = ({ data }) => {
    const { cartItem } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const increaseQuantity = (id, currentQuantity) => {
        dispatch(updateQuantity({id, quantity: currentQuantity + 1}));
      };
    
      const decreaseQuantity = (id, currentQuantity) => {
        if (data.quantity > 1) {
          dispatch(updateQuantity({id, quantity: currentQuantity - 1}));
        }
      };
      const handleDelete = () => {
        dispatch(removeCartItem(data.id));
      }

  return (
    <div className="bg-white border mt-2 border-gray-400 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
      {/* Product Image & Details */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={data.image}
          alt={name}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-gray-100 shadow-sm"
        />
        <div className="space-y-1">
          <h3 className="font-semibold text-lg text-gray-900 leading-snug">
            {data.name}
          </h3>
          <p className="text-sm font-medium text-gray-400">
            ₹{data.price} x {data.quantity}
          </p>
          <p className="text-base font-bold text-gray-900">
            ₹{data.price * data.quantity}
          </p>
        </div>
      </div>

      {/* Actions: Controls & Delete Button */}
      <div className="flex items-center gap-3 self-end sm:self-center">
        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <button
            
            type="button"
            onClick={() => decreaseQuantity(data.id, data.quantity)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 active:scale-95 transition-all"
            aria-label="Decrease quantity"
          >
            <FaMinus className="w-4 h-4" />
          </button>
          
          <span className="font-semibold text-sm w-4 text-center text-gray-900">
            {data.quantity}
          </span>

          <button
            onClick={() => increaseQuantity(data.id, data.quantity)}
            type="button"
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 active:scale-95 transition-all"
            aria-label="Increase quantity"
          >
            <FaPlus className="w-4 h-4" />
          </button>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={handleDelete}
          className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 hover:text-red-500 active:scale-95 transition-all ml-1"
          aria-label="Remove item"
        >
          <FaTrash className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;