import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/material';

import type { NumberStat } from '../../types';

export enum SortingType {
  DigitAsc = 'DigitAsc',
  DigitDesc = 'DigitDesc',
  FrequencyAsc = 'FrequencyAsc',
  FrequencyDesc = 'FrequencyDesc',
}

export interface LottoNumbersDialogStyle {
  digitButton?: SxProps<Theme>;
}

export interface LottoNumbersDialogProps {
  isOpen: boolean;
  onClose: () => void;
  numberStats: NumberStat[];
  style?: LottoNumbersDialogStyle;
}
