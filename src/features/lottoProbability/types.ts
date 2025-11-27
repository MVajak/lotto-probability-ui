import { LottoType, NumberStat } from '../../shared/types';

export interface LottoProbabilityState {
  lottoProbabilityResult: LottoProbabilityDto;
  searchParams: LottoSearchDto | null;
  isLoading: boolean;
  error: string | null;
  numberHistory: NumberHistoryDto | null;
  isLoadingHistory: boolean;
}

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
    interpretation: 'memoryless' | 'persistent' | 'alternating';
  };
  occurrences: Array<{
    drawId: number;
    drawDate: string;
    drawLabel: string;
    allNumbers: number[];
    secondaryNumbers: number[];
  }>;
  periodStart: string;
  periodEnd: string;
}
