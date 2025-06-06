import { createSlice } from '@reduxjs/toolkit';

import { calculateLottoProbability } from './lottoThunks';
import { LottoProbabilityState } from './types';

const initialState: LottoProbabilityState = {
  lottoProbabilityResult: {
    lottoType: null,
    totalDraws: 0,
    probabilityNumbers: [],
  },
  isLoading: false,
  error: null,
};

const lottoProbabilitySlice = createSlice({
  name: 'lottoProbabilityNumbers',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(calculateLottoProbability.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(calculateLottoProbability.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lottoProbabilityResult = action.payload;
      })
      .addCase(calculateLottoProbability.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to calculate';
      });
  },
});

export const { resetState } = lottoProbabilitySlice.actions;
export default lottoProbabilitySlice.reducer;
