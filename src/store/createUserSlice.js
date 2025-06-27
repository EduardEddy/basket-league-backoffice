import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPost } from '../api/api';

export const createUser = createAsyncThunk(
  'createUser',
  async (user, thunkAPI) => {
    try {
      const response = await apiPost('/create-user', user);
      return response;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || 'Error al crear el usuario';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);


const createUserSlice = createSlice({
  name: 'createUser',
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    resetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});