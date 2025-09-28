"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState, IUser, ILoginResponse, IRegisterResponse } from "@/types/authenticationTypes";
import axiosInstance from "@/lib/axios";

// ===== Initial State =====
const initialState: IAuthState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  email: typeof window !== "undefined" ? localStorage.getItem("email") : null,
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null,
  loading: false,
  error: null,
};

// ===== Async thunk for login =====
export const loginUser = createAsyncThunk<
  ILoginResponse,
  IUser,
  { rejectValue: string }
>(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", userData);
      return response.data.data;
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const error = err as { response?: { data?: { message?: string } } };
        return rejectWithValue(error.response?.data?.message || "Login failed");
      }
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue("Login failed");
    }
  }
);

// ===== Async thunk for register =====
export const registerUser = createAsyncThunk<
  IRegisterResponse,
  IUser,
  { rejectValue: string }
>(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/register", userData);
      return response.data.data;
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const error = err as { response?: { data?: { message?: string } } };
        return rejectWithValue(error.response?.data?.message || "Registration failed");
      }
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue("Registration failed");
    }
  }
);

// ===== Auth Slice =====
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.email = null;
      state.user = null;
      state.error = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("user");
      }
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== Login =====
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<ILoginResponse>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.email = action.payload.user.email;
        state.user = action.payload.user;

        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("email", action.payload.user.email);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // ===== Register =====
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<IRegisterResponse>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.email = action.payload.user.email;
        state.user = action.payload.user;

        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("email", action.payload.user.email);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// ===== Export Actions & Reducer =====
export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
