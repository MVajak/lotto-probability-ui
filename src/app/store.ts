import { configureStore } from '@reduxjs/toolkit';

import lottoProbabilityReducer from '../features/lottoProbability/lottoProbabilitySlice';

export const store = configureStore({
  reducer: {
    // Add reducers here
    lottoProbability: lottoProbabilityReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
