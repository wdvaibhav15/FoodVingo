
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