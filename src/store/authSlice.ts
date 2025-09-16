import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit"
import { apiClient } from "@/services/apiClient"
import {AuthState} from '../types/AuthState'
import { AxiosError } from "axios";
import { LoginResponse } from "@/types/LoginResponse";

// Initial state

const initialState :AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null
}

// async thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post<LoginResponse>("/auth/login", credentials);
      return response?.data; 
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
  return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Async thunk for logout (optional if server-side logout)
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await apiClient.post("/auth/logout");
  return true;
});


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Optional: reset error
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: AuthState["user"]; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;