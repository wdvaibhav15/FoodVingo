// import React from 'react'
// import { useSelector } from 'react-redux'
// import UserDashboard from '../components/UserDashboard.jsx'
// import Ownerdashboard from '../components/Ownerdashboard.jsx'
// import DeliveryManDashboard from '../components/DeliveryManDashboard.jsx'

// const Home = () => {
//     const { userData  } = useSelector((state) => state.user);
//     //console.log("Current userData in Redux:", userData);

//   return (
//     <div className="w-[100vw] min-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff9f6]">
      
//       {userData?.role === "user" && <UserDashboard />}
//       {userData?.role === "owner" && <Ownerdashboard />}
//       {userData?.role === "deliveryBoy" && <DeliveryManDashboard />}
//     </div>
//   )
// }

// export default Home;
import React from "react";
import { useSelector } from "react-redux";
import UserDashboard from "../components/UserDashboard.jsx";
import Ownerdashboard from "../components/Ownerdashboard.jsx";
import DeliveryManDashboard from "../components/DeliveryManDashboard.jsx";

const Home = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="w-full min-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff9f6]">
      {userData?.role === "owner" ? (
        <Ownerdashboard />
      ) : userData?.role === "deliveryBoy" ? (
        <DeliveryManDashboard />
      ) : (
        <UserDashboard />
      )}
    </div>
  );
};

export default Home;