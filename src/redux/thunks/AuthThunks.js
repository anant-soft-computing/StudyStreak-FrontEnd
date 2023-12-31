import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "redux/ApiService/ApiService";

// Register Api call
export const registerThunk = createAsyncThunk("register/api", async (body) => {
  const res = await ApiService.post("registration", {
    ...body,
  })
    .then((r) => r.data)
    .catch((err) => err.response);
  return res;
});

// Login Api call
export const loginThunk = createAsyncThunk("login/api", async (body) => {
  const res = await ApiService.post("login/", {
    ...body,
  })
    .then((r) => r.data)
    .catch((err) => err.response);
  return res;
});

// Forgot Password Api call
export const ForgetPasswordThunk = createAsyncThunk(
  "forgetpassword/api",
  async (body) => {
    const res = await ApiService.post(`auths/forget-password`, { ...body })
      .then((r) => r)
      .catch((err) => err.response);
    return res;
  }
);

// Reset Password Api call
export const ResetPasswordThunk = createAsyncThunk(
  "forgetpassword/api",
  async (data) => {
    const res = await ApiService.patch(`auths/reset-password/${data.id}`, {
      ...data.body,
    })
      .then((r) => r)
      .catch((err) => err.response);
    return res;
  }
);

// Check Reset Token Api call
export const checkResetTokenThunk = createAsyncThunk(
  "check-reset-token/api",
  async (token) => {
    const res = await ApiService.get(`auths/reset-password/${token}`)
      .then((r) => r)
      .catch((err) => err.response);
    return res;
  }
);

export default ForgetPasswordThunk;
