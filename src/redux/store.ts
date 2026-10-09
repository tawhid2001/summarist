import { configureStore } from "@reduxjs/toolkit";
import authModalReducer from "./features/authModalSlice";
import authReducer from './features/authSlice'

export const store = configureStore({
  reducer: {
    authModal: authModalReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;