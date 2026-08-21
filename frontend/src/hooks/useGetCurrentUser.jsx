
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

        // ✅ Check if payload returns .user or direct object
        const userPayload = result.data?.user || result.data;
        dispatch(setUserData(userPayload));
      } catch (error) {
        console.error("User auth check failed:", error.response?.data || error.message);
        dispatch(setUserData(null));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useGetCurrentUser;