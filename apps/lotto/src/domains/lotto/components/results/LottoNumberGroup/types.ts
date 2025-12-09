import type { NumberStat } from '../../../types';

export interface LottoNumberGroupProps {
  numbers: NumberStat[];
  index: string | number;
  maxVisible?: number;
  isSecondaryNumbers?: boolean;
}
