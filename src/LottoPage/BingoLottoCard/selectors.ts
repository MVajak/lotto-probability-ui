import { createSelector } from '@reduxjs/toolkit';

import { lottoProbabilityResultSelector } from '../../features/lottoProbability/selectors';
import { NumberStat } from '../../shared/types';
import { getTopProbabilityStats } from '../../shared/utils/probability';
import {
  CENTER_SQUARE_GAME_WIN_CLASS,
  CORNER_SQUARE_GAME_WIN_CLASS,
  DIAGONAL_SQUARE_GAME_WIN_CLASS,
  FULL_GAME_WIN_CLASS,
  MAX_CENTER_NUMBERS,
  MAX_CORNER_NUMBERS,
  MAX_DIAGONAL_NUMBERS,
  MAX_FULL_NUMBERS,
} from './constants';
import { BingoMainNumberStats } from './types';

export const centerSquareGameWinningNumberStatsSelector = createSelector(
  [lottoProbabilityResultSelector],
  (result): NumberStat[] => {
    const probabilityNumbers = result.probabilityNumbers.find(
      (probabilityNumber) => probabilityNumber.winClass === CENTER_SQUARE_GAME_WIN_CLASS
    );
    if (!probabilityNumbers) {
      return [];
    }

    return probabilityNumbers.winningNumbersCount;
  }
);

export const cornerSquareGameWinningNumberStatsSelector = createSelector(
  [lottoProbabilityResultSelector],
  (result): NumberStat[] => {
    const probabilityNumbers = result.probabilityNumbers.find(
      (probabilityNumber) => probabilityNumber.winClass === CORNER_SQUARE_GAME_WIN_CLASS
    );
    if (!probabilityNumbers) {
      return [];
    }

    return probabilityNumbers.winningNumbersCount;
  }
);

export const diagonalSquareGameWinningNumberStatsSelector = createSelector(
  [lottoProbabilityResultSelector],
  (result): NumberStat[] => {
    const probabilityNumbers = result.probabilityNumbers.find(
      (probabilityNumber) => probabilityNumber.winClass === DIAGONAL_SQUARE_GAME_WIN_CLASS
    );
    if (!probabilityNumbers) {
      return [];
    }

    return probabilityNumbers.winningNumbersCount;
  }
);

export const fullGameWinningNumberStatsSelector = createSelector(
  [lottoProbabilityResultSelector],
  (result): NumberStat[] => {
    const probabilityNumbers = result.probabilityNumbers.find(
      (probabilityNumber) => probabilityNumber.winClass === FULL_GAME_WIN_CLASS
    );
    if (!probabilityNumbers) {
      return [];
    }

    return probabilityNumbers.winningNumbersCount;
  }
);

export const mainWinningNumberStatsSelector = createSelector(
  [
    centerSquareGameWinningNumberStatsSelector,
    cornerSquareGameWinningNumberStatsSelector,
    diagonalSquareGameWinningNumberStatsSelector,
    fullGameWinningNumberStatsSelector,
  ],
  (centerGameStats, cornerGameStats, diagonalGameStats, fullGameStats): BingoMainNumberStats => {
    return {
      centerNumberStats: getTopProbabilityStats(centerGameStats, MAX_CENTER_NUMBERS),
      cornerNumberStats: getTopProbabilityStats(cornerGameStats, MAX_CORNER_NUMBERS),
      diagonalNumberStats: getTopProbabilityStats(diagonalGameStats, MAX_DIAGONAL_NUMBERS),
      fullNumberStats: getTopProbabilityStats(fullGameStats, MAX_FULL_NUMBERS),
    };
  }
);
