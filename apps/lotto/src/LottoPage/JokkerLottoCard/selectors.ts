import { lottoProbabilityResultSelector } from '../../features/lottoProbability/selectors';
import type { MostProbableDigitsByPosition, NumberStat } from '../../shared/types';
import { getMostProbableDigitsByPosition } from '../../shared/utils/probability';
import { createSelector } from '@reduxjs/toolkit';

export const jokkerLottoWinningNumberStatsSelector = createSelector(
  [lottoProbabilityResultSelector],
  (result): NumberStat[] => {
    const probabilityNumbers = result.probabilityNumbers[0];
    if (!probabilityNumbers) {
      return [];
    }

    return probabilityNumbers.winningNumbersCount;
  }
);

export const jokkerLottoMostProbableNumbersByPositionSelector = createSelector(
  [lottoProbabilityResultSelector],
  (result): MostProbableDigitsByPosition => {
    const probabilityNumbers = result.probabilityNumbers[0];
    if (!probabilityNumbers) {
      return {};
    }

    return getMostProbableDigitsByPosition(probabilityNumbers.winningNumbersCount);
  }
);
