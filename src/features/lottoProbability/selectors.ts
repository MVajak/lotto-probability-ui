import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

export const isLoadingSelector = (state: RootState) => state.lottoProbability.isLoading;

export const lottoProbabilityResultSelector = (state: RootState) => state.lottoProbability.lottoProbabilityResult;

export const lottoTotalDrawsSelector = createSelector(
  [lottoProbabilityResultSelector],
  (result): number => result.totalDraws
);
