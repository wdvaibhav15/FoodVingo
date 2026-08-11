
// import axios from 'axios'
// import React from 'react'
// import { useEffect } from 'react'
// import { SERVER_URL } from '../config/env'
// import { useDispatch } from 'react-redux'
// import { setUserData } from '../redux/userSlice'

// const useGetCurrentUser = () => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     //function declaration
//       const fetchUser = async () => {
//           try {
//             const result = await axios.get(`${SERVER_URL}/api/user/currentUser`,
//             {withCredentials: true});
//             dispatch(setUserData(result.data));
//           } catch (error) {
//             console.log(error);
//           }
//       }
//       //function call
//       fetchUser();
    

//   },[])
// }

// export default useGetCurrentUser
import axios from "axios";
import { useEffect } from "react";
import { SERVER_URL } from "../config/env";
import { useDispatch } from "react-redux";
import { setUserData, setLoading } from "../redux/userSlice";
import { setMyShopData } from "../redux/ownerSlice";

const useGetMyShop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        dispatch(setLoading(true));
        const result = await axios.get(`${SERVER_URL}/api/shop/my-shop`, {
          withCredentials: true,
        });
        dispatch(setMyShopData(result.data.user));
      } catch (error) {
        console.error("User auth error:", error);
        dispatch(setUserData(null));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchShop();
  }, [dispatch]);
};

export default useGetMyShop;