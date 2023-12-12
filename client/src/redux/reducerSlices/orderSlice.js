import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderDetails: {},

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
   
    setOrderDetails: (state) => {
   
    },
  }
});

export const { setLoginDetails, handleLogout } = userSlice.actions;
export default userSlice.reducer;
