

import axios from 'axios';
import React, { useEffect } from 'react';
import { SERVER_URL } from '../config/env';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAddress, setCurrentCity, setCurrentState, setUserData } from '../redux/userSlice';
import { setAddress, setLocation } from '../redux/mapSlice';


const useGetCity = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const apikey = import.meta.env.VITE_GEOAPIKEY;

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          
          
          const latitude = position.coords.latitude; 
          const longitude = position.coords.longitude;

          dispatch(setLocation({lat:latitude, long:longitude}));
          if (!latitude || !longitude) return;

          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`
          );

          
          dispatch(setCurrentCity(result?.data?.results[0].city));
          dispatch(setCurrentState(result?.data?.results[0].state));
          dispatch(setCurrentAddress(result?.data?.results[0].formatted));
          dispatch(setAddress(result?.data?.results[0].formatted));
          console.log(result?.data?.results[0].formatted);
          

        } catch (error) {
          console.error("Error fetching city from Geoapify:", error);
        }
      },
      (error) => {
        console.error("Geolocation permission error:", error.message);
      }
    );
  }, [userData]); 

};

export default useGetCity;
