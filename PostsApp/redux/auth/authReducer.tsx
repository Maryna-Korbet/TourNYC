import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../utils/authTypes';


interface UserState {
    userInfo: UserData | null;
};

const initialState: UserState = {
    userInfo: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserInfo(state, action: PayloadAction<UserState['userInfo']>) {
            state.userInfo = action.payload;
        },
        clearUserInfo(state) {
            state.userInfo = null;
        },
    },
});

// Export actions for use in components
export const { setUserInfo, clearUserInfo } = authSlice.actions;

// Export reducer to connect to Store
export default authSlice.reducer;