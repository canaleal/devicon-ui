import { configureStore } from '@reduxjs/toolkit';
import iconSlice from '../features/devicon/iconSlice';

export const store = configureStore({
    reducer: {
        icon: iconSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>