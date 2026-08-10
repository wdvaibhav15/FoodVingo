// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//     name:"user",
//     initialState: {
//         //state
//         userData:null,
//         city:null,

//     },
//     reducers: {
//         setUserData: (state,action) => {
//             state.userData = action.payload;
//         },
//         setCity: (state,action) => {
//             state.city = action.payload;
//         },

//     }
// })

// export const {
//     setUserData,
//     setCity
//              } = userSlice.actions;
// export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    city: null,
    loading: true, // Crucial for async auth checks
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUserData, setCity, setLoading } = userSlice.actions;
export default userSlice.reducer;