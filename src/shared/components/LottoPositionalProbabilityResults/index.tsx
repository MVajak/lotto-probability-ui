import { Grid, Typography } from '@mui/material';
import React from 'react';

import { NumberStat } from '../../types';
import { safeBig } from '../../utils/calculations';
import { LottoNumberPopover } from '../LottoNumberPopover';
import { LottoNumberResultsWrapper } from '../LottoNumberResultsWrapper';
import { LottoPositionalProbabilityResultsProps } from './types';

export const LottoPositionalProbabilityResults = (
  props: LottoPositionalProbabilityResultsProps
): React.JSX.Element | null => {
  const { totalDraws, numberStatsByPosition, allNumberStats, shouldShow } = props;

  if (!shouldShow) {
    return null;
  }

  if (safeBig(totalDraws).lte(0)) {
    return (
      <Grid size={{ xs: 12 }} padding={8}>
        <Typography>Nothing to show</Typography>
      </Grid>
    );
  }

  const renderLottoNumbers = (stats: NumberStat[], index: number) => {
    const { probability, count, digit } = stats[0];
    const hiddenNumberStats = stats.slice(1);
    return (
      <LottoNumberPopover
        key={index}
        index={index}
        probability={probability}
        count={count}
        digit={digit}
        leftoverNumbers={hiddenNumberStats}
      />
    );
  };

  return (
    <Grid container size={{ xs: 12 }} padding={2}>
      <Grid size={{ xs: 12 }}>
        <LottoNumberResultsWrapper allNumberStats={allNumberStats} title={'Primary numbers'}>
          <>{Object.entries(numberStatsByPosition).map(([, stats], index) => renderLottoNumbers(stats, index))}</>
        </LottoNumberResultsWrapper>
      </Grid>
    </Grid>
  );
};
