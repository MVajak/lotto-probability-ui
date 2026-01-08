import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, Spinner } from '@lotto/ui';
import { safeBig } from '@lotto/ui/utils';

import {
  analyzeGroupsForDisplay,
  groupNumbersByFrequency,
  LottoNumberGroup,
  NumberResultsSection,
} from '@/domains/lotto';

import type { LottoPositionalProbabilityResultsProps } from './types';

export const LottoPositionalProbabilityResultsCard = (
  props: LottoPositionalProbabilityResultsProps
): React.JSX.Element => {
  const { totalDraws, numberStatsByPosition, allNumberStats, isLoading } = props;
  const { t } = useTranslation();

  const hasResults = safeBig(totalDraws).gt(0);

  return (
    <Card className="w-full">
      <CardContent className="pt-4">
        {/* Subtle banner */}
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-primary-light/30 bg-primary-light/10 px-3 py-2">
          <span className="text-body-default">💡</span>
          <p className="text-body-small text-primary">{t('result.bestNumbersExplanation')}</p>
        </div>

        {/* Stats header */}
        <p className="mb-4 text-body-small text-muted-foreground">{t('result.totalDraws', { totalDraws })}</p>
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center p-8 transition-opacity duration-400 ease-in-out">
              <Spinner className="size-8" />
            </div>
          )}
          <div className="transition-opacity duration-400 ease-in-out" style={{ opacity: isLoading ? 0 : 1 }}>
            {hasResults ? (
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                  <NumberResultsSection
                    allNumberStats={allNumberStats}
                    titleKey="result.primaryNumbers"
                    isSecondaryNumbers={false}
                  >
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
