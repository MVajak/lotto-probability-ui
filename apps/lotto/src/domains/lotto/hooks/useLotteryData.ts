import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getMostProbableDigitsByPosition, getTopProbabilityStats } from '@/domains/lotto';

import type { LotteryConfig, NumberCategoryConfig } from '../config/types';
import { probabilityQueryOptions } from '../queries';
import { useLottoStore } from '../store';
import type { MostProbableDigitsByPosition, NumberStat } from '../types';

/**
 * Processed category data for standard result display
 */
export interface ProcessedCategory {
  config: NumberCategoryConfig;
  allNumberStats: NumberStat[];
  displayNumberStats: NumberStat[];
  hiddenNumberStats: NumberStat[];
}

/**
 * Processed data for standard (frequency-based) result display
 */
export interface StandardResultData {
  mode: 'standard';
  categories: ProcessedCategory[];
  totalDraws: number;
}

/**
 * Processed data for positional result display
 */
export interface PositionalResultData {
  mode: 'positional';
  allNumberStats: NumberStat[];
  numberStatsByPosition: MostProbableDigitsByPosition;
  totalDraws: number;
}

/**
 * Union type for all possible result data shapes
 */
export type LotteryResultData = StandardResultData | PositionalResultData;

/**
 * Return type for the useLotteryData hook
 */
export interface UseLotteryDataResult {
  data: LotteryResultData | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook that fetches and transforms lottery probability data based on configuration.
 *
 * This hook encapsulates:
 * 1. Fetching data via React Query (probabilityQueryOptions)
 * 2. Transforming raw API data based on config.dataTransform.mode
 * 3. Returning processed data ready for rendering
 *
 * @param config - Lottery configuration from the registry
 * @returns Processed lottery data, loading state, and error state
 */
export function useLotteryData(config: LotteryConfig): UseLotteryDataResult {
  const searchParams = useLottoStore((state) => state.searchParams);
  const isCurrentLottoType = searchParams.lottoType === config.lottoType;

  const {
    data: rawData,
    isLoading,
    error,
  } = useQuery({
    ...probabilityQueryOptions({
      lottoType: config.lottoType,
      dateFrom: searchParams.dateFrom,
      dateTo: searchParams.dateTo,
    }),
    enabled: isCurrentLottoType,
  });

  const processedData = useMemo((): LotteryResultData | null => {
    if (!rawData) return null;

    const { dataTransform } = config;

    // Handle positional mode (Jokker-style)
    if (dataTransform.mode === 'positional') {
      const probabilityNumbers = rawData.probabilityNumbers[0];
      if (!probabilityNumbers) {
        return {
          mode: 'positional',
          allNumberStats: [],
          numberStatsByPosition: {},
          totalDraws: 0,
        };
      }

      return {
        mode: 'positional',
        allNumberStats: probabilityNumbers.winningNumbersCount,
        numberStatsByPosition: getMostProbableDigitsByPosition(probabilityNumbers.winningNumbersCount),
        totalDraws: rawData.totalDraws,
      };
    }

    // Handle standard mode (most lottery types)
    const categories: ProcessedCategory[] = (dataTransform.categories ?? []).map((categoryConfig) => {
      let allNumberStats: NumberStat[] = [];

      if (categoryConfig.winClass !== undefined) {
        // Multi-win-class extraction (Bingo)
        const winClassData = rawData.probabilityNumbers.find((p) => p.winClass === categoryConfig.winClass);
        // Tag each NumberStat with the winClass for use in detail requests
        allNumberStats = (winClassData?.winningNumbersCount ?? []).map((stat) => ({
          ...stat,
          winClass: categoryConfig.winClass,
        }));
      } else {
        // Standard single win class (most lotteries)
        const probabilityNumbers = rawData.probabilityNumbers[0];
        if (probabilityNumbers) {
          allNumberStats = categoryConfig.isSecondary
            ? (probabilityNumbers.secWinningNumbersCount ?? [])
            : probabilityNumbers.winningNumbersCount;
        }
      }

      // Get top probability stats (includes ties at threshold)
      const topStats = getTopProbabilityStats(allNumberStats, categoryConfig.maxNumbers);
      const displayNumberStats = topStats.slice(0, categoryConfig.maxNumbers);
      const hiddenNumberStats = topStats.slice(categoryConfig.maxNumbers);

      return {
        config: categoryConfig,
        allNumberStats,
        displayNumberStats,
        hiddenNumberStats,
      };
    });

    return {
      mode: 'standard',
      categories,
      totalDraws: rawData.totalDraws,
    };
  }, [rawData, config]);

  return {
    data: processedData,
    isLoading,
    error: error as Error | null,
  };
}
