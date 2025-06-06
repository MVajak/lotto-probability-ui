import { createSelector } from '@reduxjs/toolkit';

import { lottoProbabilityResultSelector } from '../../features/lottoProbability/selectors';
import { NumberStat, WinningNumberStat } from '../../shared/types';
import { getTopProbabilityStats } from '../../shared/utils/probability';
import { MAX_PRIMARY_NUMBERS, MAX_SECONDARY_NUMBERS } from './constants';

export const euroJackpotLottoWinningNumberStatsSelector = createSelector(
  [lottoProbabilityResultSelector],
  (result): NumberStat[] => {
    const probabilityNumbers = result.probabilityNumbers[0];
    if (!probabilityNumbers) {
      return [];
    }

    return probabilityNumbers.winningNumbersCount;
  }
);

export const euroJackpotLottoSecWinningNumberStatsSelector = createSelector(
  [lottoProbabilityResultSelector],
  (result): NumberStat[] => {
    const probabilityNumbers = result.probabilityNumbers[0];
    if (!probabilityNumbers || !probabilityNumbers.secWinningNumbersCount) {
      return [];
    }

    return probabilityNumbers.secWinningNumbersCount;
  }
);

export const euroJackpotLottoMainNumbersSelector = createSelector(
  [lottoProbabilityResultSelector],
  (result): WinningNumberStat => {
    const probabilityNumbers = result.probabilityNumbers[0];
    if (!probabilityNumbers) {
      return { winningNumberStats: [], secWinningNumberStats: [] };
    }

    return {
      winningNumberStats: getTopProbabilityStats(probabilityNumbers.winningNumbersCount, MAX_PRIMARY_NUMBERS),
      secWinningNumberStats: getTopProbabilityStats(
        probabilityNumbers.secWinningNumbersCount ?? [],
        MAX_SECONDARY_NUMBERS
      ),
    };
  }
);
