import { configureStore } from '@reduxjs/toolkit';

import lottoProbabilityReducer from '../features/lottoProbability/lottoProbabilitySlice';

export const store = configureStore({
  reducer: {
    lottoProbability: lottoProbabilityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
