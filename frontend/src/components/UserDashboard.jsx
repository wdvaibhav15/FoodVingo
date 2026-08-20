import React,{ useEffect, useRef, useState } from 'react'
import Navbar from './Navbar.jsx'
import { categories } from '../category.js'
import CategoryCard from './CategoryCard.jsx'
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

const UserDashboard = () => {

  const categoryScrollRef = useRef();
  const [showLeftCateButton, setShowLeftCateButton] = useState(false);
  const [showRightCateButton, setShowRightCateButton] = useState(true);
  
  const updateButton = (ref,setLeftButton,setRightButton) => {
    const  element = ref.current;
    if(element) {
      const { scrollLeft, scrollWidth, clientWidth } = element;
      setLeftButton(scrollLeft > 0);
      setRightButton(scrollLeft < scrollWidth - clientWidth);
    }
  }
  const handleScroll = (ref, direction) => {
    if(ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth"
      })
    }
  };

  useEffect(() => {
    if(categoryScrollRef.current) {
      categoryScrollRef.current.addEventListener("scroll", () => {
        updateButton(categoryScrollRef, setShowLeftCateButton, setShowRightCateButton);
      })
    }
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-auto">
      <Navbar/>
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl  sm:text-2xl font-bold">Inspriration for your first order</h1>
        <div className="w-full relative">
          {/* left button */}
          {showLeftCateButton && (           
          <button
          onClick={() => handleScroll(categoryScrollRef, "left")} 
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10">
              <FaArrowCircleLeft size={20} />
          </button>
          )}
          <div className="w-full flex overflow-x-auto gap-4 pb-2 " ref={categoryScrollRef}>
          {categories.map((category, index) => (
            <CategoryCard key={index} data={category} />
          ))}
          </div>
          {/* right button */}
          {
            showRightCateButton && (
              <button
          onClick={() => handleScroll(categoryScrollRef, "right")} 
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10">
              <FaArrowCircleRight size={20} />
          </button>
            )

          }
          
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
