import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  user: {
    id: string;
    name: string;
    email: string;
    photo?: string | null;
    role?: "customer" | "seller" | "admin";
  } | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading(state) {
      state.status = "loading";
      state.error = null;
    },
    setAuthUser(
      state,
      action: PayloadAction<AuthState["user"]>
    ) {
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload);
      state.status = "succeeded";
      state.error = null;
    },
    clearAuthUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
    },
    setAuthError(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { setAuthLoading, setAuthUser, clearAuthUser, setAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;
