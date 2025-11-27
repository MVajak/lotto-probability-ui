import { createSlice } from '@reduxjs/toolkit';

import { calculateLottoProbability, fetchNumberHistory } from './lottoThunks';
import type { LottoProbabilityState } from './types';

const initialState: LottoProbabilityState = {
  lottoProbabilityResult: {
    lottoType: null,
    totalDraws: 0,
    probabilityNumbers: [],
  },
  searchParams: null,
  isLoading: false,
  error: null,
  numberHistory: null,
  isLoadingHistory: false,
};

const lottoProbabilitySlice = createSlice({
  name: 'lottoProbabilityNumbers',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(calculateLottoProbability.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.searchParams = action.meta.arg;
      })
      .addCase(calculateLottoProbability.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lottoProbabilityResult = action.payload;
      })
      .addCase(calculateLottoProbability.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to calculate';
      })
      .addCase(fetchNumberHistory.pending, (state) => {
        state.isLoadingHistory = true;
      })
      .addCase(fetchNumberHistory.fulfilled, (state, action) => {
        state.isLoadingHistory = false;
        state.numberHistory = action.payload;
      })
      .addCase(fetchNumberHistory.rejected, (state) => {
        state.isLoadingHistory = false;
        state.numberHistory = null;
      });
  },
});

export const { resetState } = lottoProbabilitySlice.actions;
export default lottoProbabilitySlice.reducer;
