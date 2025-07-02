// store/league/createLeagueSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiPost, apiGet } from '../../api/api';

// Thunk para crear liga
export const createLeague = createAsyncThunk(
  'league/create',
  async (data, thunkAPI) => {
    try {
      const response = await apiPost('/leagues', data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk para buscar usuarios por nombre/email
export const searchManagers = createAsyncThunk(
  'league/searchManagers',
  async (query, thunkAPI) => {
    try {
      const response = await apiGet('/users', { search: query, limit: 10 });
      return response.data; // Ajusta si tu backend envía en otra estructura
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const createLeagueSlice = createSlice({
  name: 'createLeague',
  initialState: {
    loading: false,
    error: null,
    success: false,
    managers: [],
  },
  reducers: {
    resetCreateLeagueState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLeague.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLeague.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createLeague.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchManagers.fulfilled, (state, action) => {
        state.managers = action.payload;
      });
  },
});

export const { resetCreateLeagueState } = createLeagueSlice.actions;
export default createLeagueSlice.reducer;
