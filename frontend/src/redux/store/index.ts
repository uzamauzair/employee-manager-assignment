// src/redux/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../slices/employeeSlice';
import viewGridSlice from '../slices/viewGridSlice';

const store = configureStore({
    reducer: {
        employee: employeeReducer,
        view: viewGridSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
