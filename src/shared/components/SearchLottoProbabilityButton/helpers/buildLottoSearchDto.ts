import { LottoSearchDto } from '../../../../features/lottoProbability/types';
import { LottoSearchDtoWithRequiredType } from '../types';

export const buildLottoSearchDto = (dto: LottoSearchDtoWithRequiredType): LottoSearchDto => {
  const { dateFrom, dateTo, lottoType } = dto;

  return {
    dateFrom: dateFrom ?? '',
    dateTo: dateTo ?? '',
    lottoType,
  };
};
