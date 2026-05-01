import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const toggleBlockStatus = createAsyncThunk(
  'users/toggleBlockStatus',
  async (userId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token || localStorage.getItem('token');
      const response = await axios.put(
        `https://hospital-backend-fwrb.onrender.com/api/admin/users/${userId}/block`,
        {}, // Empty body if the API only needs the ID in the URL
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return { userId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Action failed');
    }
  }
);

const blockUserSlice = createSlice({
  name: 'blockUser',
  initialState: { loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleBlockStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleBlockStatus.fulfilled, (state) => {
        state.loading = false;
        toast.success('User status updated successfully!');
      })
      .addCase(toggleBlockStatus.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload);
      });
  },
});

export default blockUserSlice.reducer;