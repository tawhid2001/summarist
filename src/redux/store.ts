import { configureStore } from "@reduxjs/toolkit";
import authModalReducer from "./features/authModalSlice";
import authReducer from './features/authSlice'
import readerReducer from './features/readerSlice'

export const store = configureStore({
  reducer: {
    authModal: authModalReducer,
    auth: authReducer,
    reader: readerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;