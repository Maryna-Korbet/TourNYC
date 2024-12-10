import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth/authReducer';
import { dashboardSlice } from './dashboard/dashboardReducer';

const rootReducer = combineReducers({
    //auth
    [authSlice.name]: authSlice.reducer,
    //dashboard
    [dashboardSlice.name]: dashboardSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;