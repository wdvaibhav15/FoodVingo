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

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        dispatch(setLoading(true));
        const result = await axios.get(`${SERVER_URL}/api/user/currentUser`, {
          withCredentials: true,
        });
        dispatch(setUserData(result.data.user));
      } catch (error) {
        console.error("User auth error:", error);
        dispatch(setUserData(null));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useGetCurrentUser;