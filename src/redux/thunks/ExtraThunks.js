import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk for resetting the state of slice (use only when need to reset all slice to intial state)
const resetStateThunk = createAsyncThunk(
  "reset-state/api",
  async () => "reset"
);

export default resetStateThunk;
