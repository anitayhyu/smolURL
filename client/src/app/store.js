import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import urlReducer from "../features/urls/urlSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    urls: urlReducer,
  },
});
