import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://hospital-backend-fwrb.onrender.com/api/faqs';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchFaqs = createAsyncThunk('faqs/fetchAll', async () => {
  const response = await axios.get(BASE_URL);
  return response.data; 
});

export const addFaq = createAsyncThunk('faqs/add', async (faqData) => {
  const response = await axios.post(BASE_URL, faqData, getAuthHeader());
  return response.data; // Expecting { success: true, Faq: {...} }
});

export const updateFaq = createAsyncThunk('faqs/update', async ({ id, faqData }) => {
  const response = await axios.put(`${BASE_URL}/${id}`, faqData, getAuthHeader());
  return response.data; // Expecting { success: true, Faq: {...} }
});

export const deleteFaq = createAsyncThunk('faqs/delete', async (id) => {
  await axios.delete(`${BASE_URL}/${id}`, getAuthHeader());
  return id;
});

const faqSlice = createSlice({
  name: 'faqs',
  initialState: { items: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.Faqs || [];
      })
      // ADD FIX: Data ko top par add karein (unshift)
      .addCase(addFaq.fulfilled, (state, action) => {
        const newFaq = action.payload.Faq || action.payload;
        state.items.unshift(newFaq); 
      })
      // UPDATE FIX: Sahi ID match karke object replace karein
      .addCase(updateFaq.fulfilled, (state, action) => {
        const updatedFaq = action.payload.Faq || action.payload;
        const index = state.items.findIndex(f => f._id === updatedFaq._id);
        if (index !== -1) {
          state.items[index] = updatedFaq; // Pura object update
        }
      })
      // DELETE FIX
      .addCase(deleteFaq.fulfilled, (state, action) => {
        state.items = state.items.filter(f => f._id !== action.payload);
      });
  },
});

export default faqSlice.reducer;