import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Obtiene países del API externo
export const fetchCountries = createAsyncThunk('countries/fetchCountries', async (_, thunkAPI) => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all?fields=name');
    // Devuelve nombre común y código país para el dropdown
    return response.data.map(c => ({
      name: c.name.common,
      code: c.cca2,
    })).sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const countrySlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default countrySlice.reducer;
