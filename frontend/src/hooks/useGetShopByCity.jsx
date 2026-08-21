
import axios from "axios";
import { useEffect } from "react";
import { SERVER_URL } from "../config/env";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setLoading, setShopInMyCity } from "../redux/userSlice";

const useGetShopByCity = () => {
  const dispatch = useDispatch();
  const {currentCity} = useSelector(state => state.user);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        dispatch(setLoading(true));
        const result = await axios.get(`${SERVER_URL}/api/shop/shop-by-city/${currentCity}`, {
          withCredentials: true,
        });

        const userPayload = result.data?.user || result.data.shops;
        dispatch(setShopInMyCity(userPayload));
        console.log(result.data);
      } catch (error) {
        console.error("User auth check failed:", error.response?.data || error.message);
        dispatch(setShopInMyCity(null));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchShop();
  }, [currentCity, dispatch]);
};

export default useGetShopByCity;