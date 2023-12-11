import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 orderDetails: {},
  };


const orderSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setOrderDetails: (state, actions) => {
      return {
        ...state,
        orderDetails: actions.payload,
        isLoggedIn: true
     }
    
    },
    handleLogout: (state) => {
   
    },
  }
});

export const { setOrderDetails, handleLogout } = orderSlice.actions;
export default orderSlice.reducer;
