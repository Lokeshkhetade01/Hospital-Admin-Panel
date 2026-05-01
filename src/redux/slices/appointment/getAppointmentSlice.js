import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (page = 1, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      // API endpoint par page query parameter add kiya
      const response = await axios.get(`${BASE_URL}/admin/appointments?page=${page}&limit=10`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load appointments");
    }
  }
);

const getAppointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    appointments: [],
    loading: false,
    error: null,
    pagination: {
      total: 0,
      page: 1,
      pages: 1
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload.appointments;
        state.pagination = {
          total: action.payload.total,
          page: action.payload.page,
          pages: action.payload.pages
        };
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default getAppointmentSlice.reducer;