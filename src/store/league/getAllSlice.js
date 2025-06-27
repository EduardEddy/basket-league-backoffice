import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiGet } from '../../api/api';

export const leagueSlice = createSlice({
  name: 'leagues',
  initialState: {
    leagues: [],
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 0,
      totalUsers: 0,
      pageSize: 10
    }
  },
  reducers: {
    setLeagues: (state, action) => {
      state.leagues = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLeagues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllLeagues.fulfilled, (state, action) => {
        state.loading = false;
        state.leagues = action.payload.data || [];
        state.pagination = {
          currentPage: action.payload.page || 1,
          totalPages: action.payload.totalPages || 0,
          totalUsers: action.payload.total || 0,
          pageSize: action.payload.pageSize || 10
        };
      })
      .addCase(getAllLeagues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const getAllLeagues = createAsyncThunk('league/getAll', async (params = {}, thunkAPI) => {
  try {
    const response = await apiGet('/leagues', params);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const { setLeagues } = leagueSlice.actions;
export default leagueSlice.reducer;
