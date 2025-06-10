import { Grid, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import React from 'react';

import { NumberStat } from '../../types';
import { safeBig } from '../../utils/calculations';
import { LottoNumberPopover } from '../LottoNumberPopover';
import { LottoNumberResultsWrapper } from '../LottoNumberResultsWrapper';
import { LottoProbabilityResultsProps } from './types';

export const LottoProbabilityResults = (props: LottoProbabilityResultsProps): React.JSX.Element | null => {
  const { totalDraws, numberStatsResults, shouldShow } = props;
  if (!shouldShow) {
    return null;
  }

  if (safeBig(totalDraws).lte(0)) {
    return (
      <Grid size={{ xs: 12 }} padding={8}>
        <Typography>Nothing to show...</Typography>
      </Grid>
    );
  }

  const renderLottoNumbers = (
    index: number,
    stat: NumberStat,
    hiddenNumberStats: NumberStat[],
    maxNumbersCount: number,
    style?: SxProps<Theme>
  ) => {
    const { probability, count, digit } = stat;

    if (safeBig(index).plus(1).eq(maxNumbersCount)) {
      return (
        <LottoNumberPopover
          key={index}
          index={index}
          probability={probability}
          count={count}
          digit={digit}
          leftoverNumbers={hiddenNumberStats}
          style={style}
        />
      );
    }

    return (
      <LottoNumberPopover
        key={index}
        index={index}
        probability={probability}
        count={count}
        digit={digit}
        style={style}
      />
    );
  };

  return (
    <Grid container size={{ xs: 12 }} padding={2}>
      {numberStatsResults.map((statResult, containerIndex) => (
        <Grid key={containerIndex} size={{ xs: 12, ...statResult.style?.container }}>
          <LottoNumberResultsWrapper
            allNumberStats={statResult.allNumberStats}
            title={statResult.title}
            style={statResult.style}
          >
            <>
              {statResult.displayNumberStats.map((stat, index) =>
                renderLottoNumbers(
                  index,
                  stat,
                  statResult.hiddenNumberStats,
                  statResult.maxNumbersCount,
                  statResult.style?.digitButton
                )
              )}
            </>
          </LottoNumberResultsWrapper>
        </Grid>
      ))}
    </Grid>
  );
};
