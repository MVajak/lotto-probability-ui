import type React from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, Spinner } from '@lotto/ui';
import { safeBig } from '@lotto/ui/utils';

import {
  analyzeGroupsForDisplay,
  groupNumbersByFrequency,
  LottoNumberGroup,
  NumberResultsSection,
} from '@/domains/lotto';

import type { LottoProbabilityResultsProps } from './types';

export const LottoProbabilityResultsCard = (props: LottoProbabilityResultsProps): React.JSX.Element => {
  const { t } = useTranslation();
  const { totalDraws, totalDrawsInRange, numberStatsResults, isLoading } = props;
  const isLimited = totalDrawsInRange && totalDrawsInRange > totalDraws;

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
        <p className="mb-4 text-body-small text-muted-foreground">
          {isLimited ? (
            <>
              {t('result.totalDrawsLimited', { totalDraws, totalDrawsInRange })}
              {' · '}
              <Link to="/subscription" className="text-primary underline hover:text-primary/80">
                {t('result.upgradeForMore')}
              </Link>
            </>
          ) : (
            t('result.totalDraws', { totalDraws })
          )}
        </p>
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center p-8 transition-opacity duration-400 ease-in-out">
              <Spinner className="size-8" />
            </div>
          )}
          <div className="transition-opacity duration-400 ease-in-out" style={{ opacity: isLoading ? 0 : 1 }}>
            {hasResults ? (
              <div className="grid grid-cols-12 gap-4">
                {numberStatsResults.map((statResult) => {
                  // First group all numbers by frequency
                  const allGroupedNumbers = groupNumbersByFrequency(statResult.allNumberStats);

                  // Then determine which groups to show and which is the cutoff group
                  const { groupsToShow, cutoffGroupIndex, maxVisibleInCutoffGroup } = analyzeGroupsForDisplay(
                    allGroupedNumbers,
                    statResult.maxNumbersCount
                  );

                  // Convert containerSize to Tailwind grid classes
                  const smCols = statResult.containerSize?.sm;
                  // Map sm values to explicit Tailwind classes (Tailwind JIT needs full class names)
                  const smColSpanMap: Record<number, string> = {
                    4: 'sm:col-span-4',
                    6: 'sm:col-span-6',
                    8: 'sm:col-span-8',
                    12: 'sm:col-span-12',
                  };
                  const colSpanClass = smCols ? `col-span-12 ${smColSpanMap[smCols] || ''}` : 'col-span-12';

                  return (
                    <div key={statResult.titleKey} className={colSpanClass}>
                      <NumberResultsSection
                        allNumberStats={statResult.allNumberStats}
                        titleKey={statResult.titleKey}
                        isSecondaryNumbers={statResult.isSecondaryNumbers}
                      >
                        {groupsToShow.map((group, groupIndex) => {
                          // Only apply maxVisible to the cutoff group
                          const maxVisible =
                            groupIndex === cutoffGroupIndex ? (maxVisibleInCutoffGroup ?? undefined) : undefined;
                          // Use frequency value from the group's first element as part of the key
                          const groupFrequency = group[0]?.frequency ?? groupIndex;

                          return (
                            <LottoNumberGroup
                              key={`group-${statResult.titleKey}-freq-${groupFrequency}`}
                              numbers={group}
                              index={`${statResult.titleKey}-${groupIndex}`}
                              maxVisible={maxVisible}
                              isSecondaryNumbers={statResult.isSecondaryNumbers}
                            />
                          );
                        })}
                      </NumberResultsSection>
                    </div>
                  );
                })}
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
