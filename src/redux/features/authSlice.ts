import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  uid: string;
  email: string | null;
  subscriptionStatus?: string | null;
  subscriptionPlan?: string | null;
};

type AuthState = {
  user: UserState | null;
  loading: boolean;
};

const initialState: AuthState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState | null>) => {
      state.user = action.payload;
      state.loading = false;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
