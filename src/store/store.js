// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import usersReducer from './usersSlice';
import leaguesReducer from './league/getAllSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    leagues: leaguesReducer,
  },
});
