import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const deleteDoctor = createAsyncThunk(
  'doctor/deleteDoctor',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('token');

      const response = await axios.delete(
        `https://hospital-backend-fwrb.onrender.com/api/admin/doctors/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );

      return id; 
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete doctor';
      return rejectWithValue(errorMessage);
    }
  }
);

const deleteDoctorSlice = createSlice({
  name: 'deleteDoctor',
  initialState: {
    loading: false,
    success: false,
    error: null,
    deletingId: null, 
  },
  reducers: {
    resetDeleteState: (state) => {
      state.success = false;
      state.error = null;
      state.loading = false;
      state.deletingId = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteDoctor.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.deletingId = action.meta.arg; 
      })
      .addCase(deleteDoctor.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.deletingId = null;
        toast.success("Doctor Deleted Successfully",{
          autoClose:1500
        })
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.deletingId = null;
      });
  },
});

export const { resetDeleteState } = deleteDoctorSlice.actions;
export default deleteDoctorSlice.reducer;