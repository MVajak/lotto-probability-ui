import { LottoSearchDto } from '../../../features/lottoProbability/types';
import { LottoType } from '../../types';
import { NullablePartial } from '../../utils/types';

export type LottoSearchDtoWithRequiredType = {
  lottoType: LottoType;
} & NullablePartial<Omit<LottoSearchDto, 'lottoType'>>;

export interface SearchLottoProbabilityButtonProps {
  onClick: () => void;
}
