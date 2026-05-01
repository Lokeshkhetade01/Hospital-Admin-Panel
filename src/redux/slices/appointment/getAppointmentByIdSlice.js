import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAppointmentById = createAsyncThunk(
  'appointment/fetchById',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://hospital-backend-fwrb.onrender.com/api/admin/appointments/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Something went wrong');
    }
  }
);

const getAppointmentByIdSlice = createSlice({
  name: 'appointmentById',
  initialState: {
    appointment: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearDetails: (state) => {
      state.appointment = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointmentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppointmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.appointment = action.payload;
      })
      .addCase(fetchAppointmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDetails } = getAppointmentByIdSlice.actions;
export default getAppointmentByIdSlice.reducer;