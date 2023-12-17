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
    recieverCoords: {
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
    setSenderLocDetails: (state,actions) => {
      state.senderLocDetails = actions.payload
      },
      setRecieverLocDetails: (state,actions) => {
        state.recieverLocDetails = actions.payload
        },

  }
});

export const { setOrderDetails ,setSenderLocDetails,setRecieverLocDetails} = orderSlice.actions;
export default orderSlice.reducer;
