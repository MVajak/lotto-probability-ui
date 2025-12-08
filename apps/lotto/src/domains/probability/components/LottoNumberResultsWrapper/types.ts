import type React from 'react';

import type { NumberStat } from '@/domains/lotto';

export interface LottoNumberResultsWrapperProps {
  children: React.ReactNode;
  allNumberStats: NumberStat[];
  titleKey: string;
}
