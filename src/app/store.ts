import authReducer from '../features/auth/authSlice';
import lottoProbabilityReducer from '../features/lottoProbability/lottoProbabilitySlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lottoProbability: lottoProbabilityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
