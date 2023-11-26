import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import emailVerificationSlice from "./emailVerificationSlice";

const store = configureStore({
    reducer:{
        auth: authSlice,
        emailVerification: emailVerificationSlice,
    }
})

export default store;