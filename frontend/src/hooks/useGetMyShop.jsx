
// // import axios from 'axios'
// // import React from 'react'
// // import { useEffect } from 'react'
// // import { SERVER_URL } from '../config/env'
// // import { useDispatch } from 'react-redux'
// // import { setUserData } from '../redux/userSlice'

// // const useGetCurrentUser = () => {
// //   const dispatch = useDispatch();
// //   useEffect(() => {
// //     //function declaration
// //       const fetchUser = async () => {
// //           try {
// //             const result = await axios.get(`${SERVER_URL}/api/user/currentUser`,
// //             {withCredentials: true});
// //             dispatch(setUserData(result.data));
// //           } catch (error) {
// //             console.log(error);
// //           }
// //       }
// //       //function call
// //       fetchUser();
    

// //   },[])
// // }

// // export default useGetCurrentUser
// import axios from "axios";
// import { useEffect } from "react";
// import { SERVER_URL } from "../config/env";
// import { useDispatch } from "react-redux";
// import { setUserData, setLoading } from "../redux/userSlice";
// import { setMyShopData } from "../redux/ownerSlice";

// const useGetMyShop = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchShop = async () => {
//       try {
//         dispatch(setLoading(true));
//         const result = await axios.get(`${SERVER_URL}/api/shop/my-shop`, {
//           withCredentials: true,
//         });
//         dispatch(setMyShopData(result.data.user));
//       } catch (error) {
//         console.error("User auth error:", error);
//         dispatch(setUserData(null));
//       } finally {
//         dispatch(setLoading(false));
//       }
//     };

//     fetchShop();
//   }, [dispatch]);
// };

// export default useGetMyShop;

import axios from "axios";
import { useEffect } from "react";
import { SERVER_URL } from "../config/env";
import { useDispatch, useSelector } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";

const useGetMyShop = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    // Only fetch shop if the user is logged in AND is an owner
    if (!userData || userData.role !== "owner") {
      dispatch(setMyShopData(null));
      return;
    }

    const fetchShop = async () => {
      try {
        const result = await axios.get(`${SERVER_URL}/api/shop/my-shop`, {
          withCredentials: true,
        });
        
        // ✅ Corrected to result.data.shop
        dispatch(setMyShopData(result.data?.shop || null));
      } catch (error) {
        console.error("Get Shop Error:", error.response?.data || error.message);
        dispatch(setMyShopData(null)); // Safely reset shop without breaking user session
      }
    };

    fetchShop();
  }, [userData, dispatch]);
};

export default useGetMyShop;