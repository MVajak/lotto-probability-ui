// Core types moved from shared/types.ts

export interface ConfidenceInterval {
  lower: number;
  upper: number;
  confidenceLevel: number;
}

export interface Deviation {
  absolute: number;
  relative: number;
  isSignificant: boolean;
}

export interface Interpretation {
  status: 'frequent' | 'normal' | 'rare';
  percentDifference: number;
  appearedCount: number;
  totalDraws: number;
}

export interface NumberStat {
  position: number | null;
  digit: number;
  count: number;
  totalDraws?: number;
  frequency: number;
  interpretation?: Interpretation;
}

export interface WinningNumberStat {
  winningNumberStats: NumberStat[];
  secWinningNumberStats: NumberStat[];
}

export type MostProbableDigitsByPosition = {
  [position: number]: NumberStat[];
};

export enum DateFormat {
  European = 'DD.MM.YYYY',
}

export enum LottoStorageKey {
  SELECTED_LOTTERY = 'selectedLottery',
}

export enum LottoType {
  // European lotteries (Estonian)
  EURO = 'EURO',
  VIKINGLOTTO = 'VIKINGLOTTO',
  BINGO = 'BINGO',
  KENO = 'KENO',
  JOKKER = 'JOKKER',

  // US lotteries
  POWERBALL = 'POWERBALL',
  MEGA_MILLIONS = 'MEGA_MILLIONS',
  CASH4LIFE = 'CASH4LIFE',

  // UK lotteries
  UK_EUROMILLIONS = 'UK_EUROMILLIONS',
  UK_LOTTO = 'UK_LOTTO',
  UK_THUNDERBALL = 'UK_THUNDERBALL',
  UK_SET_FOR_LIFE = 'UK_SET_FOR_LIFE',
}

// DTOs

export interface LottoProbabilityDto {
  lottoType: LottoType | null;
  totalDraws: number;
  probabilityNumbers: LottoProbabilityNumbersDto[];
}

export interface LottoProbabilityNumbersDto {
  winClass: number | null;
  winningNumbersCount: NumberStat[];
  secWinningNumbersCount?: NumberStat[];
}

export interface LottoSearchDto {
  lottoType: LottoType;
  dateFrom: string;
  dateTo: string;
}

export interface NumberDetailRequestDto {
  lottoType: LottoType;
  number: number;
  dateFrom: string;
  dateTo: string;
  useSecondaryNumbers?: boolean;
  position?: number;
}

export interface NumberDetailDto {
  summary: {
    number: number;
    totalDraws: number;
    appearanceCount: number;
    frequencyPercent: number;
    expectedFrequencyPercent: number;
    status: 'frequent' | 'rare' | 'normal';
    lastSeenDrawsAgo: number;
    lastSeenDate: string;
    overdueScore: number;
  };
  confidenceInterval: ConfidenceInterval;
  deviation: Deviation;
  trends: {
    longestDroughtDays: number;
    currentDroughtDays: number;
    averageDaysBetweenAppearances: number;
    currentStreak: number;
    longestStreak: number;
    timeSeries: Array<{
      month: string;
      appearances: number;
      expectedAppearances: number;
    }>;
  };
  autocorrelation: {
    lagCorrelations: Array<{
      lag: number;
      correlation: number;
      pValue: number;
      isSignificant: boolean;
    }>;
    interpretation: 'random' | 'clustered' | 'dispersed';
  } | null;
  markovChain: {
    transitionProbabilities: {
      appearedToAppeared: number;
      appearedToNotAppeared: number;
      notAppearedToAppeared: number;
      notAppearedToNotAppeared: number;
    };
    transitionCounts: {
      appearedToAppeared: number;
      appearedToNotAppeared: number;
      notAppearedToAppeared: number;
      notAppearedToNotAppeared: number;
    };
    steadyStateProbability: number;
    interpretation: 'memoryless' | 'persistent' | 'alternating' | 'gamblers_fallacy' | 'hot_hand';
  } | null;
  pairAnalysis: {
    topCompanions: Array<{
      number: number;
      coOccurrences: number;
      expectedCoOccurrences: number;
      lift: number;
      isSignificant: boolean;
    }>;
    avoidedNumbers: Array<{
      number: number;
      coOccurrences: number;
      expectedCoOccurrences: number;
      lift: number;
      isSignificant: boolean;
    }>;
    interpretation: 'has_avoided' | 'has_companions' | 'no_pattern' | 'random';
  } | null;
  monteCarlo: {
    simulationCount: number;
    simulatedProbability: number;
    theoreticalProbability: number;
    percentile5: number;
    percentile95: number;
    actualAppearances: number;
    interpretation: 'above_expected' | 'below_expected' | 'within_expected';
  } | null;
  seasonalPatterns: {
    byDayOfWeek: Array<{
      dayOfWeek: number;
      appearances: number;
      totalDraws: number;
      frequency: number;
    }>;
    byMonth: Array<{
      month: number;
      appearances: number;
      totalDraws: number;
      frequency: number;
    }>;
    interpretation: 'no_pattern' | 'day_pattern' | 'month_pattern';
  } | null;
  occurrences: Array<{
    drawId: string;
    drawDate: string;
    drawLabel: string;
    allNumbers: number[];
    secondaryNumbers: number[];
  }>;
  timeline: Array<{
    drawDate: string;
    drawLabel: string;
    appeared: boolean;
  }>;
  periodStart: string;
  periodEnd: string;
}
