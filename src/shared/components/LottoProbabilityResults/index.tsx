import { CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { NumberStat } from '../../types';
import { safeBig } from '../../utils/calculations';
import { CardWrapper } from '../CardWrapper';
import { LottoNumberButton } from '../LottoNumberButton';
import { LottoNumberResultsWrapper } from '../LottoNumberResultsWrapper';
import { LottoProbabilityResultsProps } from './types';

export const LottoProbabilityResults = (props: LottoProbabilityResultsProps): React.JSX.Element => {
  const { t } = useTranslation();
  const { totalDraws, numberStatsResults, isLoading } = props;

  const renderLottoNumbers = (
    index: number,
    stat: NumberStat,
    hiddenNumberStats: NumberStat[],
    maxNumbersCount: number,
    style?: SxProps<Theme>
  ) => {
    const { frequency, count, digit } = stat;

    if (safeBig(index).plus(1).eq(maxNumbersCount)) {
      return (
        <LottoNumberButton
          key={index}
          index={index}
          frequency={frequency}
          count={count}
          digit={digit}
          leftoverNumbers={hiddenNumberStats}
          style={style}
          numberStat={stat}
        />
      );
    }

    return (
      <LottoNumberButton
        key={index}
        index={index}
        frequency={frequency}
        count={count}
        digit={digit}
        style={style}
        numberStat={stat}
      />
    );
  };

  const hasResults = safeBig(totalDraws).gt(0);

  return (
    <CardWrapper sx={{ width: '100%' }}>
      <Divider textAlign="center">{t('result.totalDraws', { totalDraws })}</Divider>
      <div style={{ position: 'relative'}}>
        {isLoading && (
          <Grid
            size={{ xs: 12 }}
            padding={8}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: isLoading ? 1 : 0,
              transition: 'opacity 400ms ease-in-out',
              zIndex: 1,
            }}
          >
            <CircularProgress />
          </Grid>
        )}
        <div
          style={{
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 400ms ease-in-out',
          }}
        >
          {hasResults ? (
            <Grid container size={{ xs: 12 }} padding={2}>
              {numberStatsResults.map((statResult, containerIndex) => (
                <Grid key={containerIndex} size={{ xs: 12, ...statResult.style?.container }}>
                  <LottoNumberResultsWrapper
                    allNumberStats={statResult.allNumberStats}
                    titleKey={statResult.titleKey}
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
          ) : (
            <Grid size={{ xs: 12 }} padding={2}>
              <Typography>{t('result.noResults')}</Typography>
            </Grid>
          )}
        </div>
      </div>
    </CardWrapper>
  );
};
