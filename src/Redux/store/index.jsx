import { configureStore } from "@reduxjs/toolkit";
import uiReducer from './uiSlice';
import authReducer from './authSlice'
import searchReducer from './searchresSlider'
export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    search:searchReducer
  },
});