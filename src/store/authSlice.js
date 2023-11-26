import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authSliceLogin: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        authSliceLogout: (state) => {
            state.status = false;
            state.userData = null;
        }
     }
})

export const {authSliceLogin, authSliceLogout} = authSlice.actions;

export default authSlice.reducer;