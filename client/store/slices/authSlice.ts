import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JwtPayload } from "jwt-decode";

export interface IUser {
  id: string;
  email: string;
  role: string;
}

export interface IUserJwt extends JwtPayload {
  userId: string;
}

export interface AuthState {
  user: IUserJwt | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload }: PayloadAction<Omit<AuthState, "isAuthenticated">>,
    ) => {
      state.user = payload.user;
      state.accessToken = payload.accessToken;
      state.isAuthenticated = true;

      if (typeof window !== "undefined" && payload.accessToken) {
        localStorage.setItem("accessToken", payload.accessToken);
      }
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
      }
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;
export const authReducer = authSlice.reducer;
