import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  verificationStatus: false,
  cooldown: 0,
  error: null,
};

const emailVerificationSlice = createSlice({
  name: "emailVerification",
  initialState,
  reducers: {
    setVerificationStatus: (state, action) => {
      state.verificationStatus = action.payload;
    },
    setCooldown: (state, action) => {
      state.cooldown = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    decrementCooldown: (state) => {
      state.cooldown = Math.max(0, state.cooldown - 1); // Calculate the new cooldown value directly
    },
  },
});

export const {
  setVerificationStatus,
  setCooldown,
  setError,
  decrementCooldown,
} = emailVerificationSlice.actions;
export default emailVerificationSlice.reducer;
