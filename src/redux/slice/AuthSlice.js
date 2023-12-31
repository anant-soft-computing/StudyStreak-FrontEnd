import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  loggedIn: false,
  accessToken: null,
  refreshToken: null,
  userId: null,
  user_type: null,
  user_role: "",
  timeOfLogin: null,
  logInOperation: -1,
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
        state.timeOfLogin = action.payload.timeOfLogin;
        state.username = action.payload.username;
        state.user_type = action.payload.user_type;
        state.userId = action.payload.userId;
        state.user_role = action.payload.user_role;
        state.logInOperation = action.payload.logInOperation;
      } else {
        state.loggedIn = false;
        state.timeOfLogin = null;
        state.logInOperation = action.payload.logInOperation;
      }
    },
  },
});

export const authAction = authStore.actions;

export default authStore.reducer;
