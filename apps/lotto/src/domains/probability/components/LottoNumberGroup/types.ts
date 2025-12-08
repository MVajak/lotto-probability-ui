import type { NumberStat } from '@/domains/lotto';

export interface LottoNumberGroupProps {
  numbers: NumberStat[];
  index: string | number;
  maxVisible?: number;
}
