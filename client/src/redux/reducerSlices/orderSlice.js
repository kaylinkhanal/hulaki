import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderDetails: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderDetails: (state, actions) => {
    state.orderDetails = actions.payload
    },
  }
});

export const { setOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;
