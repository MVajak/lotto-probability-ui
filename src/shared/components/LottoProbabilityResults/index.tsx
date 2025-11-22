import { CircularProgress, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { NumberStat } from '../../types';
import { safeBig } from '../../utils/calculations';
import { CardWrapper } from '../CardWrapper';
import { LottoNumberGroup } from '../LottoNumberGroup';
import { LottoNumberResultsWrapper } from '../LottoNumberResultsWrapper';
import { LottoProbabilityResultsProps } from './types';

export const LottoProbabilityResults = (props: LottoProbabilityResultsProps): React.JSX.Element => {
  const { t } = useTranslation();
  const { totalDraws, numberStatsResults, isLoading } = props;

  // Group numbers by frequency for better UX
  const groupNumbersByFrequency = (stats: NumberStat[]): NumberStat[][] => {
    const grouped: { [key: number]: NumberStat[] } = {};

    stats.forEach(stat => {
      if (!grouped[stat.frequency]) {
        grouped[stat.frequency] = [];
      }
      grouped[stat.frequency].push(stat);
    });

    // Sort groups by frequency (descending) and return as array of arrays
    return Object.values(grouped).sort((a, b) => b[0].frequency - a[0].frequency);
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
              {numberStatsResults.map((statResult, containerIndex) => {
                // Take only the top N numbers and group them by frequency
                const topStats = statResult.allNumberStats.slice(0, statResult.maxNumbersCount);
                const groupedNumbers = groupNumbersByFrequency(topStats);

                return (
                  <Grid key={containerIndex} size={{ xs: 12, ...statResult.style?.container }}>
                    <LottoNumberResultsWrapper
                      allNumberStats={statResult.allNumberStats}
                      titleKey={statResult.titleKey}
                      style={statResult.style}
                    >
                      <>
                        {groupedNumbers.map((group, groupIndex) => (
                          <LottoNumberGroup
                            key={`group-${containerIndex}-${groupIndex}`}
                            numbers={group}
                            index={`${containerIndex}-${groupIndex}`}
                            style={statResult.style?.digitButton}
                          />
                        ))}
                      </>
                    </LottoNumberResultsWrapper>
                  </Grid>
                );
              })}
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
