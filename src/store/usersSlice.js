import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet } from '../api/api';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
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
    setUsers: (state, action) => {
      state.users = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data || [];
        state.pagination = {
          currentPage: action.payload.page || 1,
          totalPages: action.payload.totalPages || 0,
          totalUsers: action.payload.total || 0,
          pageSize: action.payload.pageSize || 10
        };
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const getUsers = createAsyncThunk('users/getUsers',
  async (params = {}, thunkAPI) => {
    try {
      const response = await apiGet('/users', params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  });

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;