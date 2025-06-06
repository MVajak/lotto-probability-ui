import { NumberStat } from '../../shared/types';

export interface BingoMainNumberStats {
  centerNumberStats: NumberStat[];
  cornerNumberStats: NumberStat[];
  diagonalNumberStats: NumberStat[];
  fullNumberStats: NumberStat[];
}
