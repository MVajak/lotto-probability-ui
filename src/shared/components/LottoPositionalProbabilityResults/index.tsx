import React from 'react';
import { useTranslation } from 'react-i18next';

import { CircularProgress, Divider, Grid, Typography } from '@mui/material';

import { safeBig } from '../../utils/calculations';
import { analyzeGroupsForDisplay, groupNumbersByFrequency } from '../../utils/numberGrouping';
import { CardWrapper } from '../CardWrapper';
import { LottoNumberGroup } from '../LottoNumberGroup';
import { LottoNumberResultsWrapper } from '../LottoNumberResultsWrapper';
import type { LottoPositionalProbabilityResultsProps } from './types';

export const LottoPositionalProbabilityResults = (props: LottoPositionalProbabilityResultsProps): React.JSX.Element => {
  const { totalDraws, numberStatsByPosition, allNumberStats, isLoading } = props;
  const { t } = useTranslation();

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
              <Grid size={{ xs: 12 }}>
                <LottoNumberResultsWrapper allNumberStats={allNumberStats} titleKey={'result.primaryNumbers'}>
                  {Object.entries(numberStatsByPosition).map(([, stats], positionIndex) => {
                    // For each position, group by frequency and apply display logic
                    const maxCount = 3; // Show top 3 numbers per position
                    const allGroupedNumbers = groupNumbersByFrequency(stats);
                    const { groupsToShow, cutoffGroupIndex, maxVisibleInCutoffGroup } = analyzeGroupsForDisplay(
                      allGroupedNumbers,
                      maxCount
                    );

                    return (
                      <React.Fragment key={positionIndex}>
                        {groupsToShow.map((group, groupIndex) => {
                          // Only apply maxVisible to the cutoff group
                          const maxVisible =
                            groupIndex === cutoffGroupIndex ? (maxVisibleInCutoffGroup ?? undefined) : undefined;

                          return (
                            <LottoNumberGroup
                              key={`position-${positionIndex}-group-${groupIndex}`}
                              numbers={group}
                              index={`${positionIndex}-${groupIndex}`}
                              maxVisible={maxVisible}
                            />
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </LottoNumberResultsWrapper>
              </Grid>
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
