import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const toggleVerification = createAsyncThunk(
  'doctor/toggleVerification',
  async ({ id, targetStatus }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${BASE_URL}/admin/doctors/${id}/verify`,
        { isVerified: targetStatus }, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return { id, isVerified: targetStatus, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

const verifyDoctorSlice = createSlice({
  name: 'verifyDoctor',
  initialState: { updatingId: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleVerification.pending, (state, action) => {
        state.updatingId = action.meta.arg.id; 
      })
      .addCase(toggleVerification.fulfilled, (state) => {
        state.updatingId = null;
        toast.success("Status updated successfully!", { autoClose: 1500 });
      })
      .addCase(toggleVerification.rejected, (state, action) => {
        state.updatingId = null;
        state.error = action.payload;
        toast.error(action.payload || "Failed to update status");
      });
  },
});

export default verifyDoctorSlice.reducer;