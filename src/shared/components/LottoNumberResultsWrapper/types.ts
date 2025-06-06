import React from 'react';

import { NumberStat } from '../../types';

export interface LottoNumberResultsWrapperProps {
  children: React.JSX.Element;
  allNumberStats: NumberStat[];
  title: string;
}
