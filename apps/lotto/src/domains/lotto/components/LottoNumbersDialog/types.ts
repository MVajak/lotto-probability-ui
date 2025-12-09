import type { NumberStat } from '../../types';

export enum SortingType {
  DigitAsc = 'DigitAsc',
  DigitDesc = 'DigitDesc',
  FrequencyAsc = 'FrequencyAsc',
  FrequencyDesc = 'FrequencyDesc',
}

export interface LottoNumbersDialogProps {
  isOpen: boolean;
  onClose: () => void;
  numberStats: NumberStat[];
  isSecondaryNumbers?: boolean;
}
