import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, Separator, Spinner } from '@lotto/ui';
import { safeBig } from '@lotto/ui/utils';

import { analyzeGroupsForDisplay, groupNumbersByFrequency } from '../../../utils/numberGrouping';
import { LottoNumberGroup } from '../LottoNumberGroup';
import { NumberResultsSection } from '../NumberResultsSection';
import type { LottoPositionalProbabilityResultsProps } from './types';

export const LottoPositionalProbabilityResultsCard = (
  props: LottoPositionalProbabilityResultsProps
): React.JSX.Element => {
  const { totalDraws, numberStatsByPosition, allNumberStats, isLoading } = props;
  const { t } = useTranslation();

  const hasResults = safeBig(totalDraws).gt(0);

  return (
    <Card className="w-full shadow-md">
      <CardContent>
        {/* Divider with centered text */}
        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-body-small text-muted-foreground">{t('result.totalDraws', { totalDraws })}</span>
          <Separator className="flex-1" />
        </div>
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center p-8 transition-opacity duration-400 ease-in-out">
              <Spinner className="size-8" />
            </div>
          )}
          <div className="transition-opacity duration-400 ease-in-out" style={{ opacity: isLoading ? 0 : 1 }}>
            {hasResults ? (
              <div className="grid grid-cols-12 gap-4 p-4">
                <div className="col-span-12">
                  <NumberResultsSection allNumberStats={allNumberStats} titleKey="result.primaryNumbers">
                    {Object.entries(numberStatsByPosition).map(([position, stats]) => {
                      // For each position, group by frequency and apply display logic
                      const maxCount = 3; // Show top 3 numbers per position
                      const allGroupedNumbers = groupNumbersByFrequency(stats);
                      const { groupsToShow, cutoffGroupIndex, maxVisibleInCutoffGroup } = analyzeGroupsForDisplay(
                        allGroupedNumbers,
                        maxCount
                      );

                      return (
                        <React.Fragment key={`position-${position}`}>
                          {groupsToShow.map((group, groupIndex) => {
                            // Only apply maxVisible to the cutoff group
                            const maxVisible =
                              groupIndex === cutoffGroupIndex ? (maxVisibleInCutoffGroup ?? undefined) : undefined;
                            // Use frequency value from the group's first element as part of the key
                            const groupFrequency = group[0]?.frequency ?? groupIndex;

                            return (
                              <LottoNumberGroup
                                key={`position-${position}-freq-${groupFrequency}`}
                                numbers={group}
                                index={`${position}-${groupIndex}`}
                                maxVisible={maxVisible}
                              />
                            );
                          })}
                        </React.Fragment>
                      );
                    })}
                  </NumberResultsSection>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <p className="text-body-default">{t('result.noResults')}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
