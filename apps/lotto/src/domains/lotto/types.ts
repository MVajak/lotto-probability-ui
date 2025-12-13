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

export interface NumberHistoryRequestDto {
  lottoType: LottoType;
  number: number;
  dateFrom: string;
  dateTo: string;
  useSecondaryNumbers?: boolean;
  position?: number;
}

export interface NumberHistoryDto {
  summary: {
    number: number;
    totalDraws: number;
    appearanceCount: number;
    frequencyPercent: number;
    expectedFrequencyPercent: number;
    deviationPercent: number;
    status: 'frequent' | 'rare' | 'normal';
    confidenceInterval: ConfidenceInterval;
    deviation: Deviation;
  };
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
  };
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
  };
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
