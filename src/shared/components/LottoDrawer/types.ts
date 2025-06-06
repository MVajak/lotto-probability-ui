import { NumberStat } from '../../types';

export interface LottoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  numberStats: NumberStat[];
}
