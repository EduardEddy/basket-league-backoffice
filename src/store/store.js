// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import usersReducer from './usersSlice';
import leaguesReducer from './league/getAllSlice';
import createLeagueReducer from './league/createLeagueSlice';
import countryReducer from './country/countrySlice';
import uploadLogoReducer from './uploads/uploadLogoSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    leagues: leaguesReducer,
    createLeague: createLeagueReducer,
    countries: countryReducer,
    uploadLogo: uploadLogoReducer,
  },
});
