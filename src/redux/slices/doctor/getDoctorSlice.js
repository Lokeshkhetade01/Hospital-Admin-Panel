import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchDoctors = createAsyncThunk(
  'doctors/fetchDoctors', 
  async (_, { rejectWithValue }) => {
    try {
      // LocalStorage se token nikaalna
      const token = localStorage.getItem('token'); 

      const response = await axios.get(`${BASE_URL}/admin/doctors`, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });

      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch doctors");
    }
  }
);

const getDoctorSlice = createSlice({
  name: 'doctor',
  initialState: {
    doctors: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload.doctors;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default getDoctorSlice.reducer;