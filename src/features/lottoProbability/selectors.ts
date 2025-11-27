import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

export const isLoadingSelector = (state: RootState) => state.lottoProbability.isLoading;

export const lottoProbabilityResultSelector = (state: RootState) => state.lottoProbability.lottoProbabilityResult;

export const searchParamsSelector = (state: RootState) => state.lottoProbability.searchParams;

export const numberHistorySelector = (state: RootState) => state.lottoProbability.numberHistory;

export const isLoadingHistorySelector = (state: RootState) => state.lottoProbability.isLoadingHistory;

export const lottoTotalDrawsSelector = createSelector(
  [lottoProbabilityResultSelector],
  (result): number => result.totalDraws
);
