import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addDoctor = createAsyncThunk(
  'doctor/addDoctor',
  async (doctorData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}/admin/doctors`,
        doctorData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

const addDoctorSlice = createSlice({
  name: 'addDoctor',
  initialState: { loading: false, success: false, error: null },
  reducers: {
    resetState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDoctor.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        toast.success("Doctor Added Successfully!",{
          autoClose:1500
        })
      })
      .addCase(addDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = addDoctorSlice.actions;
export default addDoctorSlice.reducer;