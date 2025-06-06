import { LottoType, NumberStat } from '../../shared/types';

export interface LottoProbabilityState {
  lottoProbabilityResult: LottoProbabilityDto;
  isLoading: boolean;
  error: string | null;
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
