import type React from 'react';

import type { NumberStat } from '../../../types';

export interface NumberResultsSectionProps {
  children: React.ReactNode;
  allNumberStats: NumberStat[];
  titleKey: string;
  isSecondaryNumbers?: boolean;
}
