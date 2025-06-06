import { createSelector } from '@reduxjs/toolkit';

import { lottoProbabilityResultSelector } from '../../features/lottoProbability/selectors';
import { NumberStat, WinningNumberStat } from '../../shared/types';
import { getTopProbabilityStats } from '../../shared/utils/probability';
import { MAX_PRIMARY_NUMBERS } from './constants';

export const kenoLottoWinningNumberStatsSelector = createSelector(
  [lottoProbabilityResultSelector],
  (result): NumberStat[] => {
    const probabilityNumbers = result.probabilityNumbers[0];
    if (!probabilityNumbers) {
      return [];
    }

    return probabilityNumbers.winningNumbersCount;
  }
);

export const kenoLottoMainNumbersSelector = createSelector(
  [lottoProbabilityResultSelector],
  (result): WinningNumberStat => {
    const probabilityNumbers = result.probabilityNumbers[0];
    if (!probabilityNumbers) {
      return { winningNumberStats: [], secWinningNumberStats: [] };
    }

    return {
      winningNumberStats: getTopProbabilityStats(probabilityNumbers.winningNumbersCount, MAX_PRIMARY_NUMBERS),
      secWinningNumberStats: [],
    };
  }
);
