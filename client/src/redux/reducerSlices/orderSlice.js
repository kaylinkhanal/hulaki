import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderDetails: {},
  senderLocDetails: {},
  receiverLocDetails: {}
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderDetails: (state, actions) => {
    state.orderDetails = actions.payload
    },
    setSenderLocDetails: (state,actions) => {
      state.senderLocDetails = actions.payload
      },
  }
});

export const { setOrderDetails ,setSenderLocDetails} = orderSlice.actions;
export default orderSlice.reducer;
