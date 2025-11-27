import { CircularProgress, Divider, Grid, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';

import { safeBig } from '../../utils/calculations';
import { analyzeGroupsForDisplay, groupNumbersByFrequency } from '../../utils/numberGrouping';
import { CardWrapper } from '../CardWrapper';
import { LottoNumberGroup } from '../LottoNumberGroup';
import { LottoNumberResultsWrapper } from '../LottoNumberResultsWrapper';
import type { LottoProbabilityResultsProps } from './types';

export const LottoProbabilityResults = (props: LottoProbabilityResultsProps): React.JSX.Element => {
  const { t } = useTranslation();
  const { totalDraws, numberStatsResults, isLoading } = props;

  const hasResults = safeBig(totalDraws).gt(0);

  return (
    <CardWrapper sx={{ width: '100%' }}>
      <Divider textAlign="center">{t('result.totalDraws', { totalDraws })}</Divider>
      <div style={{ position: 'relative' }}>
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
                // First group all numbers by frequency
                const allGroupedNumbers = groupNumbersByFrequency(statResult.allNumberStats);

                // Then determine which groups to show and which is the cutoff group
                const { groupsToShow, cutoffGroupIndex, maxVisibleInCutoffGroup } = analyzeGroupsForDisplay(
                  allGroupedNumbers,
                  statResult.maxNumbersCount
                );

                return (
                  <Grid key={containerIndex} size={{ xs: 12, ...statResult.style?.container }}>
                    <LottoNumberResultsWrapper
                      allNumberStats={statResult.allNumberStats}
                      titleKey={statResult.titleKey}
                      style={statResult.style}
                    >
                      {groupsToShow.map((group, groupIndex) => {
                        // Only apply maxVisible to the cutoff group
                        const maxVisible =
                          groupIndex === cutoffGroupIndex ? (maxVisibleInCutoffGroup ?? undefined) : undefined;

                        return (
                          <LottoNumberGroup
                            key={`group-${containerIndex}-${groupIndex}`}
                            numbers={group}
                            index={`${containerIndex}-${groupIndex}`}
                            style={statResult.style?.digitButton}
                            maxVisible={maxVisible}
                          />
                        );
                      })}
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
