import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  loggedIn: false,
  accessToken: null,
  refreshToken: null,
  userId: null,
  user_type: null,
  user_role: "",
};

const authStore = createSlice({
  name: "AUTHState",
  initialState,
  reducers: {
    setAuthStatus(state, action) {
      if (action.payload.loggedIn) {
        state.loggedIn = true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.userName = action.payload.userName;
        state.user_type = action.payload.user_type;
        state.userId = action.payload.userId;
        state.user_role = action.payload.user_role;  
      } else {
        state.loggedIn = false;
      }
    },
  },
});

export const authAction = authStore.actions;

export default authStore.reducer;