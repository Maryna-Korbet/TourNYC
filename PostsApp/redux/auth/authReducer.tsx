import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userId: null,
        nickname: null,
        login: null,
        email: null,
        avatar: null,
        token: null,
        isAuth: false,
        error: null,
        isLoading: false,
    },
    reducers: {
        login: (state, action) => {
            state.userId = action.payload.userId;
            state.nickname = action.payload.nickname;
            state.login = action.payload.login;
            state.email = action.payload.email;
            state.avatar = action.payload.avatar;
            state.token = action.payload.token;
            state.isAuth = true;
            state.error = null;
            state.isLoading = false;
        },
        logout: (state) => {
            state.userId = null;
            state.nickname = null;
            state.login = null;
            state.email = null;
            state.avatar = null;
            state.token = null;
            state.isAuth = false;
            state.error = null;
            state.isLoading = false;
        },
    },
});