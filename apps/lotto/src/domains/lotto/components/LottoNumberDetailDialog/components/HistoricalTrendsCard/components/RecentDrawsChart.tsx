import type React from 'react';
import { useMemo } from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, cn, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@lotto/ui';

import type { NumberDetailDto } from '@/domains/lotto';

interface RecentDrawsChartProps {
  timeline: NumberDetailDto['timeline'];
}

/**
 * Shows all draws in a horizontally scrollable timeline.
 * Green dots = number appeared, empty circles = number didn't appear.
 * Oldest on the left, newest on the right.
 */
export const RecentDrawsChart: React.FC<RecentDrawsChartProps> = ({ timeline }) => {
  const { t } = useTranslation();

  // Sort timeline by date (oldest first for left-to-right display)
  const sortedTimeline = useMemo(() => {
    if (!timeline || timeline.length === 0) {
      return [];
    }

    return [...timeline].sort((a, b) => new Date(a.drawDate).getTime() - new Date(b.drawDate).getTime());
  }, [timeline]);

  if (sortedTimeline.length === 0) {
    return null;
  }

  // Calculate stats
  const appearedCount = sortedTimeline.filter((d) => d.appeared).length;
  const hitRate = ((appearedCount / sortedTimeline.length) * 100).toFixed(1);

  // Get date range for display
  const oldestDate = new Date(sortedTimeline[0].drawDate).toLocaleDateString();
  const newestDate = new Date(sortedTimeline[sortedTimeline.length - 1].drawDate).toLocaleDateString();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h4 className="text-body-default-bold">{t('numberStats.recentPattern.title')}</h4>
        <p className="text-body-small text-muted-foreground">
          {t('numberStats.recentPattern.description', { count: sortedTimeline.length })}
        </p>
      </div>

      <Card className="rounded">
        <CardContent className="flex flex-col gap-4">
          {/* Scrollable timeline of all draws */}
          <div>
            <TooltipProvider>
              <div className="overflow-x-auto px-2 py-4">
                <div className="flex min-w-max items-center gap-1">
                  {sortedTimeline.map((draw, index) => (
                    <Tooltip key={`${draw.drawDate}-${index}`}>
                      <TooltipTrigger asChild>
                        <div
                          className={cn(
                            'flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full transition-transform hover:scale-125',
                            draw.appeared
                              ? 'bg-primary-green text-primary-foreground shadow-sm'
                              : 'border-2 border-muted-foreground/30 bg-transparent'
                          )}
                        >
                          {draw.appeared ? (
                            <CheckIcon className="size-3.5" />
                          ) : (
                            <XMarkIcon className="size-3 text-muted-foreground/50" />
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-center">
                          <p
                            className={cn(
                              'text-body-small-bold',
                              draw.appeared ? 'text-primary-green' : 'text-muted-foreground'
                            )}
                          >
                            {draw.appeared
                              ? t('numberStats.recentPattern.appeared')
                              : t('numberStats.recentPattern.missed')}
                          </p>
                          {draw.drawLabel && <p className="text-body-small">{draw.drawLabel}</p>}
                          <p className="text-body-small text-muted-foreground">
                            {new Date(draw.drawDate).toLocaleDateString()}
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </TooltipProvider>

            {/* Timeline labels showing date range */}
            <div className="flex justify-between text-body-small text-subtle-foreground">
              <span>{oldestDate}</span>
              <span>{newestDate}</span>
            </div>
          </div>

          {/* Stats summary */}
          <Card className="rounded">
            <CardContent className="flex items-center justify-between">
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
                    {t('numberStats.recentPattern.misses', { count: sortedTimeline.length - appearedCount })}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-body-small text-muted-foreground">
                  {t('numberStats.recentPattern.hitRate')}:{' '}
                </span>
                <span className="text-body-default-bold">{hitRate}%</span>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
