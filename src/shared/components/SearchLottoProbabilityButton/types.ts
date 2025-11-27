import type { LottoSearchDto } from '../../../features/lottoProbability/types';
import type { LottoType } from '../../types';
import type { NullablePartial } from '../../utils/types';

export type LottoSearchDtoWithRequiredType = {
  lottoType: LottoType;
} & NullablePartial<Omit<LottoSearchDto, 'lottoType'>>;

export interface SearchLottoProbabilityButtonProps {
  onClick: () => void;
}
