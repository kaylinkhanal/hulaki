import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderDetails: {},
  senderLocDetails: {
    senderCoords: {
      lat: 27.7172,
      lng: 85.3240
    }
  },
  receiverLocDetails: {
    receiverCoords: {
      lat: 27.7172,
      lng: 85.3240
    }
  },

};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderDetails: (state, actions) => {
      state.orderDetails = actions.payload
    },
    addPriceDetails: (state, actions) => {
      state.orderDetails.price = actions.payload;
    },
    setSenderLocDetails: (state, actions) => {
      return {
        ...state,
        senderLocDetails: { ...state.senderLocDetails, ...actions.payload }
      }
    },
    setReceiverLocDetails: (state, actions) => {
      return {
        ...state,
        receiverLocDetails: { ...state.receiverLocDetails, ...actions.payload }
      }
    },
    setSenderPosition: (state, actions) => {
      state.senderLocDetails.senderCoords = actions.payload
    },
    setReceiverPosition: (state, actions) => {
      state.receiverLocDetails.receiverCoords = actions.payload
    },

  }
});

export const { setOrderDetails,addPriceDetails, setSenderLocDetails, setReceiverLocDetails, setSenderPosition, setReceiverPosition } = orderSlice.actions;
export default orderSlice.reducer;
