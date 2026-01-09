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
  /** Win class for games with multiple prize tiers */
  winClass?: number;
}

export type MostProbableDigitsByPosition = {
  [position: number]: NumberStat[];
};

export enum LottoStorageKey {
  SELECTED_LOTTERY = 'selectedLottery',
}

export enum LottoType {
  // European lotteries (Estonian)
  EST_BINGO = 'EST_BINGO',
  EST_KENO = 'EST_KENO',
  EST_JOKKER = 'EST_JOKKER',

  // US lotteries
  US_POWERBALL = 'US_POWERBALL',
  US_MEGA_MILLIONS = 'US_MEGA_MILLIONS',
  US_CASH4LIFE = 'US_CASH4LIFE',

  // UK lotteries
  UK_LOTTO = 'UK_LOTTO',
  UK_THUNDERBALL = 'UK_THUNDERBALL',
  UK_SET_FOR_LIFE = 'UK_SET_FOR_LIFE',
  UK_HOT_PICKS = 'UK_HOT_PICKS',

  // Spanish lotteries
  ES_LA_PRIMITIVA = 'ES_LA_PRIMITIVA',
  ES_BONOLOTO = 'ES_BONOLOTO',
  ES_EL_GORDO = 'ES_EL_GORDO',

  // Shared
  VIKINGLOTTO = 'VIKINGLOTTO',
  EUROJACKPOT = 'EUROJACKPOT',
  EUROMILLIONS = 'EUROMILLIONS',
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
  /** Win class for games with multiple prize tiers (like EST_BINGO) */
  winClass?: number;
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
