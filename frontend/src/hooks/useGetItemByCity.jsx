import axios from "axios";
import { useEffect } from "react";
import { SERVER_URL } from "../config/env";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setItemsInMyCity } from "../redux/userSlice";

const useGetItemByCity = () => {
  const dispatch = useDispatch();
  const { currentCity } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentCity) return;

    const fetchItems = async () => {
      try {
        dispatch(setLoading(true));

        // Verify if your backend prefix is /api/item or /api/shop
        const result = await axios.get(
          `${SERVER_URL}/api/item/get-all-items-by-city/${encodeURIComponent(currentCity)}`,
          { withCredentials: true }
        );

        console.log("Items API Response:", result.data.items);

        // Ensure array is dispatched
        const itemsPayload = Array.isArray(result.data?.items)
          ? result.data.items
          : [];
        dispatch(setItemsInMyCity(itemsPayload));
      } catch (error) {
        console.error("Get items failed:", error.response?.data || error.message);
        dispatch(setItemsInMyCity([]));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchItems();
  }, [currentCity, dispatch]);
};

export default useGetItemByCity;