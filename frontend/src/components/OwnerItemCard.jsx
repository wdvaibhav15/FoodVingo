import React from 'react'
import { FaEdit } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function OwnerItemCard({ data }) {
    const navigate = useNavigate();
  return (
    <div className="flex mt-4 bg-white rounded-lg shadow-md overflow-hidden border border-[#ff4d2d] w-full h-34 max-w-2xl">
      <div className="w-1/3 flex-shrink-0 bg-gray-50">
        <img
          src={data.image}
          alt={data.name || ""}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between p-3 flex-1">
        <div>
          <h2 className="text-base font-semibold text-[#ff4d2d]">
            {data.name}
          </h2>
          <p>
            <span className="font-medium text-gray-700">Category:</span>{" "}
            {data.category}
          </p>
          <p>
            <span className="font-medium text-gray-700">Food Type:</span>{" "}
            {data.foodType}
          </p>
        </div>

        <div className="flex items-center justify-between">
            <div className="text-[#ff4d2d] font-bold"> {data.price} /- </div>
            <div className=" flex items-center gap-2 "> 
                <div 
                onClick={()=>navigate(`/edit-items/${data._id}`)}
                className="p-2 rounded-full hover:bg-[#ff4d2d]/10 text-[#ff4d2d] cursor-pointer">
                <FaEdit size={20} />
                </div>

                <div 
                className="p-2 rounded-full hover:bg-[#ff4d2d]/10 text-[#ff4d2d] cursor-pointer">
                <IoTrashBinSharp size={20} />
                </div>

            </div>
            
        </div>
      </div>
    </div>
  );
}

export default OwnerItemCard;
