import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        pictures: '',
        isLoading: false,
        error: null
    },   
    reducers: {
    },        
});

