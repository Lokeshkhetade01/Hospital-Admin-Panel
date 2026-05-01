import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const updateAppointmentStatus = createAsyncThunk(
  'appointment/updateStatus',
  async ({ id, statusData, token }, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.put(
        `${BASE_URL}/admin/appointments/${id}/status`,
        statusData,
        config
      );
      // toast.success("Status Updated Successfully!");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update status";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const updateStatusSlice = createSlice({
  name: 'updateStatus',
  initialState: { loading: false, success: false, error: null },
  reducers: {
    resetStatusState: (state) => {
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAppointmentStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAppointmentStatus.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        toast.success("Status update successfully!",{
          autoClose:1500
        })
      })
      .addCase(updateAppointmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetStatusState } = updateStatusSlice.actions;
export default updateStatusSlice.reducer;