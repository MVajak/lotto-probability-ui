import type React from 'react';
import { useMemo } from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

import { cn, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@lotto/ui';

import type { NumberHistoryDto } from '@/domains/lotto';

interface RecentPatternChartProps {
  occurrences: NumberHistoryDto['occurrences'];
  totalDraws: number;
}

interface DrawResult {
  appeared: boolean;
  date?: string;
  label?: string;
  drawIndex: number;
}

/**
 * Shows the pattern of the last 20 draws - whether the number appeared or not.
 * Filled = appeared, Empty = didn't appear.
 * This gives a clear visual of recent hot/cold streaks.
 */
export const RecentDrawsChart: React.FC<RecentPatternChartProps> = ({ occurrences, totalDraws }) => {
  const { t } = useTranslation();

  // Number of recent draws to show
  const displayCount = Math.min(20, totalDraws);

  // Build the pattern: for each of the last N draws, did the number appear?
  const recentPattern = useMemo((): DrawResult[] => {
    if (!occurrences || occurrences.length === 0 || totalDraws === 0) {
      return [];
    }

    // Sort occurrences by date (most recent first)
    const sortedOccurrences = [...occurrences].sort(
      (a, b) => new Date(b.drawDate).getTime() - new Date(a.drawDate).getTime()
    );

    // Get the date range
    const mostRecentDate = sortedOccurrences[0]?.drawDate;
    if (!mostRecentDate) return [];

    // Build pattern from most recent going back
    // Since we don't have all draw dates, we'll estimate based on occurrences
    // and the gaps between them
    const pattern: DrawResult[] = [];

    // Use occurrences to build pattern with gaps
    let currentIndex = 0;
    for (let i = 0; i < sortedOccurrences.length && pattern.length < displayCount; i++) {
      const occurrence = sortedOccurrences[i];
      const nextOccurrence = sortedOccurrences[i + 1];

      // Add this occurrence as "appeared"
      pattern.push({
        appeared: true,
        date: occurrence.drawDate,
        label: occurrence.drawLabel,
        drawIndex: currentIndex,
      });
      currentIndex++;

      // If there's a next occurrence, estimate gaps between them
      if (nextOccurrence && pattern.length < displayCount) {
        const daysBetween = Math.floor(
          (new Date(occurrence.drawDate).getTime() - new Date(nextOccurrence.drawDate).getTime()) /
            (1000 * 60 * 60 * 24)
        );
        // Estimate ~2-3 draws per week for most lotteries
        const estimatedGaps = Math.min(Math.floor(daysBetween / 3), displayCount - pattern.length - 1);

        for (let g = 0; g < estimatedGaps && pattern.length < displayCount; g++) {
          pattern.push({
            appeared: false,
            drawIndex: currentIndex,
          });
          currentIndex++;
        }
      }
    }

    // Reverse to show oldest first (left) to newest (right)
    return pattern.reverse();
  }, [occurrences, totalDraws, displayCount]);

  if (recentPattern.length === 0) {
    return null;
  }

  // Calculate stats
  const appearedCount = recentPattern.filter((d) => d.appeared).length;
  const hitRate = ((appearedCount / recentPattern.length) * 100).toFixed(0);

  return (
    <div>
      <h4 className="mb-1 text-body-default-bold">{t('numberStats.recentPattern.title')}</h4>
      <p className="mb-4 text-body-small text-muted-foreground">
        {t('numberStats.recentPattern.description', { count: recentPattern.length })}
      </p>

      <div className="rounded-lg bg-muted/50 p-4">
        {/* Pattern visualization */}
        <TooltipProvider>
          <div className="flex items-center justify-center gap-1 overflow-x-auto pb-2">
            {recentPattern.map((draw, index) => (
              <Tooltip key={`draw-${index}`}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      'flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full transition-transform hover:scale-110',
                      draw.appeared
                        ? 'bg-primary-green text-primary-foreground shadow-sm'
                        : 'border-2 border-muted-foreground/30 bg-transparent'
                    )}
                  >
                    {draw.appeared ? (
                      <CheckIcon className="size-4" />
                    ) : (
                      <XMarkIcon className="size-3 text-muted-foreground/50" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-center">
                    {draw.appeared ? (
                      <>
                        <p className="text-body-small-bold text-primary-green">
                          {t('numberStats.recentPattern.appeared')}
                        </p>
                        {draw.label && <p className="text-body-small">{draw.label}</p>}
                        {draw.date && (
                          <p className="text-body-small text-muted-foreground">
                            {new Date(draw.date).toLocaleDateString()}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-body-small text-muted-foreground">{t('numberStats.recentPattern.missed')}</p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>

        {/* Timeline labels */}
        <div className="mt-2 flex justify-between text-body-small text-subtle-foreground">
          <span>{t('numberStats.recentPattern.older')}</span>
          <span>{t('numberStats.recentPattern.recent')}</span>
        </div>

        {/* Stats summary */}
        <div className="mt-4 flex items-center justify-between rounded-lg bg-background p-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-primary-green" />
              <span className="text-body-small text-muted-foreground">
                {t('numberStats.recentPattern.hits', { count: appearedCount })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full border-2 border-muted-foreground/30" />
              <span className="text-body-small text-muted-foreground">
                {t('numberStats.recentPattern.misses', { count: recentPattern.length - appearedCount })}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-body-small text-muted-foreground">{t('numberStats.recentPattern.hitRate')}: </span>
            <span className="text-body-default-bold">{hitRate}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
