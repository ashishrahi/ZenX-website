import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";

// ========== Interfaces ==========
export interface IAuth {
  _id: string;
  email: string;
  password?: string;
  role: string;
  refreshTokens?: string[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IUserProfile {
  _id: string;
  authId: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

// Merged Auth + Profile for app usage
export interface IUserState {
  _id: string;
  email: string;
  role: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// API response
export interface IAuthResponse {
  success: boolean;
  message: string;
  data: {
    auth: IAuth;
    userProfile: IUserProfile;
    token: string;
    refreshToken: string;
  };
}

// Redux state
export interface IAuthState {
  token: string | null;
  email: string | null;
  user: IUserState | null;         // merged object
  userProfile: IUserProfile | null; // raw profile
  loading: boolean;
  error: string | null;
}

// ========== Initial State ==========
const initialState: IAuthState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  email: typeof window !== "undefined" ? localStorage.getItem("email") : null,
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null,
  userProfile: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("userProfile") || "null") : null,
  loading: false,
  error: null,
};

// ========== Async Thunks ==========
export const loginUser = createAsyncThunk<
  IAuthResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<IAuthResponse>("/auth/login", userData);
    return response.data;
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      (error as { response?: { data?: { message?: string } } }).response?.data?.message
    ) {
      return rejectWithValue(
        (error as { response: { data: { message: string } } }).response.data.message
      );
    }
    return rejectWithValue("Login failed");
  }
});

export const registerUser = createAsyncThunk<
  IAuthResponse,
  { email: string; password: string; name: string },
  { rejectValue: string }
>("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<IAuthResponse>("/auth/register", userData);
    return response.data;
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      (error as { response?: { data?: { message?: string } } }).response?.data?.message
    ) {
      return rejectWithValue(
        (error as { response: { data: { message: string } } }).response.data.message
      );
    }
    return rejectWithValue("Registration failed");
  }
});

// ========== Slice ==========
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.email = null;
      state.user = null;
      state.userProfile = null;
      state.error = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("user");
        localStorage.removeItem("userProfile");
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
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
        const { auth, userProfile, token } = action.payload.data;

        state.loading = false;
        state.token = token;
        state.email = auth.email;

        // merged object
        state.user = {
          _id: auth._id,
          email: auth.email,
          role: auth.role,
          name: userProfile.name,
          isActive: userProfile.isActive,
          createdAt: userProfile.createdAt,
          updatedAt: userProfile.updatedAt,
        };

        // raw profile
        state.userProfile = userProfile;

        if (typeof window !== "undefined") {
          localStorage.setItem("token", token);
          localStorage.setItem("email", auth.email);
          localStorage.setItem("user", JSON.stringify(state.user));
          localStorage.setItem("userProfile", JSON.stringify(userProfile));
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
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
        const { auth, userProfile, token } = action.payload.data;

        state.loading = false;
        state.token = token;
        state.email = auth.email;

        // merged object
        state.user = {
          _id: auth._id,
          email: auth.email,
          role: auth.role,
          name: userProfile.name,
          isActive: userProfile.isActive,
          createdAt: userProfile.createdAt,
          updatedAt: userProfile.updatedAt,
        };

        // raw profile
        state.userProfile = userProfile;

        if (typeof window !== "undefined") {
          localStorage.setItem("token", token);
          localStorage.setItem("email", auth.email);
          localStorage.setItem("user", JSON.stringify(state.user));
          localStorage.setItem("userProfile", JSON.stringify(userProfile));
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// ========== Export ==========
export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
