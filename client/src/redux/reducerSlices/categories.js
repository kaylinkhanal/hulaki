import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryDetails: {},
  
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
  
  
  }
});

export const { setLoginDetails, handleLogout } = categorySlice.actions;
export default categorySlice.reducer;