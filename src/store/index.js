import { configureStore } from "@reduxjs/toolkit";
import authStore from "./authStore";

const store = configureStore({
  reducer: {
    authStore,
  },
});

export default store;
