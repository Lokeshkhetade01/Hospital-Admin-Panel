import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async (page = 1, { rejectWithValue }) => {
    try {
      // LocalStorage se token nikaala
      const token = localStorage.getItem('token'); 

      // API call mein headers bheje
      const response = await axios.get(
        `${BASE_URL}/admin/dashboard?page=${page}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: null,
    recentAppointments: [],
    pagination: {
      total: 0,
      page: 1,
      totalPages: 1
    },
    loading: false,
    tableLoading: false, 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state, action) => {
        if (state.recentAppointments.length === 0) {
          state.loading = true;
        } else {
          state.tableLoading = true;
        }
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.tableLoading = false;
        state.stats = action.payload.data.stats;
        state.recentAppointments = action.payload.data.recentAppointments;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.tableLoading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;