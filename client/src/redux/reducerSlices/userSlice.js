import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {},
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginDetails: (state, actions) => {
     return {
        ...state,
        userDetails: actions.payload,
        isLoggedIn: true
     }
    },
    handleLogout: (state) => {
      state.userDetails = {}
      state.isLoggedIn = false
    },
  }
});

export const { setLoginDetails, handleLogout } = userSlice.actions;
export default userSlice.reducer;
