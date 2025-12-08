import type { NumberStat } from '@/domains/lotto';

export interface BingoMainNumberStats {
  centerNumberStats: NumberStat[];
  cornerNumberStats: NumberStat[];
  diagonalNumberStats: NumberStat[];
  fullNumberStats: NumberStat[];
}
