import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://hospital-backend-fwrb.onrender.com/api/admin/payments";

// Async thunk to fetch payments with Bearer Token
export const fetchPayments = createAsyncThunk(
  "payments/fetchPayments",
  async (_, { rejectWithValue }) => {
    try {
      // Localstorage se token nikalna
      const token = localStorage.getItem("token");

      const response = await axios.get(API_URL, {
        headers: {
          // Senior Dev Tip: Hamesha check karein ki token format Bearer hai ya simple
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      // 401 Unauthorized handling (agar token expire ho gaya ho)
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      return rejectWithValue(error.response?.data?.message || "Failed to fetch payments");
    }
  }
);

const paymentSlice = createSlice({
  name: "payments",
  initialState: {
    loading: false,
    paymentData: null,
    error: null,
    // Hum initial state mein bhi token check kar sakte hain safety ke liye
    isAuthenticated: !!localStorage.getItem("token"),
  },
  reducers: {
    // Optional: Manually clear payments on logout
    clearPaymentState: (state) => {
      state.paymentData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentData = action.payload;
        state.error = null;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;