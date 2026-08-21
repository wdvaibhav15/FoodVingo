// import React, { useEffect, useRef, useState } from 'react'
// import Navbar from './Navbar.jsx'
// import { categories } from '../category.js'
// import CategoryCard from './CategoryCard.jsx'
// import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
// import { useSelector } from 'react-redux';

// const UserDashboard = () => {
//   const { currentCity, shopInMyCity = [] } = useSelector(state => state.user);

//   const categoryScrollRef = useRef(null);
//   const shopScrollRef = useRef(null);

//   // Category scroll buttons state
//   const [showLeftCateButton, setShowLeftCateButton] = useState(false);
//   const [showRightCateButton, setShowRightCateButton] = useState(true);

//   // Shop scroll buttons state
//   const [showLeftShopButton, setShowLeftShopButton] = useState(false);
//   const [showRightShopButton, setShowRightShopButton] = useState(true);

//   // Generic helper to update button visibility
//   const updateScrollButtons = (ref, setLeftButton, setRightButton) => {
//     const element = ref.current;
//     if (element) {
//       const { scrollLeft, scrollWidth, clientWidth } = element;
//       setLeftButton(scrollLeft > 0);
//       setRightButton(scrollLeft < scrollWidth - clientWidth - 1);
//     }
//   };

//   // Generic helper to scroll horizontal containers
//   const handleScroll = (ref, direction) => {
//     if (ref.current) {
//       ref.current.scrollBy({
//         left: direction === "left" ? -200 : 200,
//         behavior: "smooth"
//       });
//     }
//   };

//   // Category scroll listener & cleanup
//   useEffect(() => {
//     const categoryEl = categoryScrollRef.current;
//     if (!categoryEl) return;

//     const handleCategoryScrollUpdate = () => {
//       updateScrollButtons(categoryScrollRef, setShowLeftCateButton, setShowRightCateButton);
//     };

//     updateScrollButtons(categoryScrollRef, setShowLeftCateButton, setShowRightCateButton);
//     categoryEl.addEventListener("scroll", handleCategoryScrollUpdate);

//     return () => categoryEl.removeEventListener("scroll", handleCategoryScrollUpdate);
//   }, []);

//   // Shop scroll listener & cleanup
//   useEffect(() => {
//     const shopEl = shopScrollRef.current;
//     if (!shopEl) return;

//     const handleShopScrollUpdate = () => {
//       updateScrollButtons(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
//     };

//     updateScrollButtons(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
//     shopEl.addEventListener("scroll", handleShopScrollUpdate);

//     return () => shopEl.removeEventListener("scroll", handleShopScrollUpdate);
//   }, [shopInMyCity]);

//   return (
//     <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-auto">
//       <Navbar />

//       {/* Category Section */}
//       <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
//         <h1 className="text-gray-800 text-2xl font-bold">Inspiration for your first order</h1>
//         <div className="w-full relative">
//           {showLeftCateButton && (
//             <button
//               onClick={() => handleScroll(categoryScrollRef, "left")}
//               className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10"
//             >
//               <FaArrowCircleLeft size={20} />
//             </button>
//           )}

//           <div className="w-full flex overflow-x-auto gap-4 pb-2" ref={categoryScrollRef}>
//             {categories?.map((category, index) => (
//               <CategoryCard key={index} data={category} />
//             ))}
//           </div>

//           {showRightCateButton && (
//             <button
//               onClick={() => handleScroll(categoryScrollRef, "right")}
//               className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10"
//             >
//               <FaArrowCircleRight size={20} />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Shop Section */}
//       <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
//         <h1 className="text-gray-800 text-2xl font-bold">Best Shop in {currentCity}</h1>
//         <div className="w-full relative">
//           {showLeftShopButton && (
//             <button
//               onClick={() => handleScroll(shopScrollRef, "left")}
//               className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10"
//             >
//               <FaArrowCircleLeft size={20} />
//             </button>
//           )}

//           <div className="w-full flex overflow-x-auto gap-4 pb-2" ref={categoryScrollRef}>
//             {shopInMyCity?.map((shop, index) => (
//               <CategoryCard key={index} data={shop} />
//             ))}
//           </div>

//           {showRightShopButton && (
//             <button
//               onClick={() => handleScroll(shopScrollRef, "right")}
//               className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10"
//             >
//               <FaArrowCircleRight size={20} />
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;
import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar.jsx";
import { categories } from "../category.js";
import CategoryCard from "./CategoryCard.jsx";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  // Accessing both possibilities to ensure data is picked up regardless of slice key name
  const userState = useSelector((state) => state.user || {});
  const { currentCity, shopInMyCity } = useSelector((state) => state.user);
  const categoryScrollRef = useRef(null);
  const shopScrollRef = useRef(null);

  // Category scroll buttons state
  const [showLeftCateButton, setShowLeftCateButton] = useState(false);
  const [showRightCateButton, setShowRightCateButton] = useState(true);

  // Shop scroll buttons state
  const [showLeftShopButton, setShowLeftShopButton] = useState(false);
  const [showRightShopButton, setShowRightShopButton] = useState(true);

  // Generic helper to update button visibility
  const updateScrollButtons = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      const { scrollLeft, scrollWidth, clientWidth } = element;
      setLeftButton(scrollLeft > 0);
      setRightButton(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Generic helper to scroll horizontal containers
  const handleScroll = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  // Category scroll listener & cleanup
  useEffect(() => {
    const categoryEl = categoryScrollRef.current;
    if (!categoryEl) return;

    const handleCategoryScrollUpdate = () => {
      updateScrollButtons(
        categoryScrollRef,
        setShowLeftCateButton,
        setShowRightCateButton,
      );
    };

    updateScrollButtons(
      categoryScrollRef,
      setShowLeftCateButton,
      setShowRightCateButton,
    );
    categoryEl.addEventListener("scroll", handleCategoryScrollUpdate);

    return () =>
      categoryEl.removeEventListener("scroll", handleCategoryScrollUpdate);
  }, []);

  // Shop scroll listener & cleanup
  useEffect(() => {
    const shopEl = shopScrollRef.current;
    if (!shopEl) return;

    const handleShopScrollUpdate = () => {
      updateScrollButtons(
        shopScrollRef,
        setShowLeftShopButton,
        setShowRightShopButton,
      );
    };

    updateScrollButtons(
      shopScrollRef,
      setShowLeftShopButton,
      setShowRightShopButton,
    );
    shopEl.addEventListener("scroll", handleShopScrollUpdate);

    return () => shopEl.removeEventListener("scroll", handleShopScrollUpdate);
  }, [shopInMyCity]);

  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-auto">
      <Navbar />

      {/* Category Section */}
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl font-bold">
          Inspiration for your first order
        </h1>
        <div className="w-full relative">
          {showLeftCateButton && (
            <button
              onClick={() => handleScroll(categoryScrollRef, "left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10"
            >
              <FaArrowCircleLeft size={20} />
            </button>
          )}

          <div
            className="w-full flex overflow-x-auto gap-4 pb-2"
            ref={categoryScrollRef}
          >
            {categories?.map((category, index) => (
              <CategoryCard key={index} data={category} />
            ))}
          </div>

          {showRightCateButton && (
            <button
              onClick={() => handleScroll(categoryScrollRef, "right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10"
            >
              <FaArrowCircleRight size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Shop Section */}
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl font-bold">
          Best Shop in {currentCity}
        </h1>
        <div className="w-full relative">
          {showLeftShopButton && (
            <button
              onClick={() => handleScroll(shopScrollRef, "left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10"
            >
              <FaArrowCircleLeft size={20} />
            </button>
          )}

          <div
            className="w-full flex overflow-x-auto gap-4 pb-2"
            ref={shopScrollRef}
          >
            {Array.isArray(shopInMyCity) && shopInMyCity.length > 0 ? (
              shopInMyCity.map((shop, index) => (
                <CategoryCard key={shop?._id || index} data={shop} />
              ))
            ) : (
              <p className="text-gray-500 text-sm py-4">
                No shops found in this area.
              </p>
            )}
          </div>

          {showRightShopButton && (
            <button
              onClick={() => handleScroll(shopScrollRef, "right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10"
            >
              <FaArrowCircleRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
