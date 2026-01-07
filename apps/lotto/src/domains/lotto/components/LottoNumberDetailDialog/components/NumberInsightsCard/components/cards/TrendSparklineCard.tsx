import type React from 'react';
import { useMemo } from 'react';
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, MinusIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, cn, Separator } from '@lotto/ui';

import type { NumberDetailDto } from '@/domains/lotto';

interface TrendSparklineProps {
  timeSeries: NumberDetailDto['trends']['timeSeries'];
}

/**
 * A minimal sparkline showing the monthly appearance trend.
 * No complex axes or legends - just a simple visual line with trend indicator.
 */
export const TrendSparklineCard: React.FC<TrendSparklineProps> = ({ timeSeries }) => {
  const { t } = useTranslation();

  // Safe timeSeries - ensure it's always an array
  const safeTimeSeries = timeSeries ?? [];
  const hasData = safeTimeSeries.length > 0;

  // Calculate trend direction based on recent vs older data
  const trendInfo = useMemo(() => {
    if (safeTimeSeries.length < 3) {
      return { direction: 'neutral' as const, change: 0 };
    }

    // Compare average of first half vs second half
    const midpoint = Math.floor(safeTimeSeries.length / 2);
    const firstHalf = safeTimeSeries.slice(0, midpoint);
    const secondHalf = safeTimeSeries.slice(midpoint);

    const firstAvg = firstHalf.reduce((sum, p) => sum + p.appearances, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, p) => sum + p.appearances, 0) / secondHalf.length;

    const changePercent = firstAvg > 0 ? ((secondAvg - firstAvg) / firstAvg) * 100 : 0;

    if (changePercent > 10) return { direction: 'up' as const, change: Math.round(changePercent) };
    if (changePercent < -10) return { direction: 'down' as const, change: Math.round(changePercent) };
    return { direction: 'neutral' as const, change: Math.round(changePercent) };
  }, [safeTimeSeries]);

  // Generate SVG path for sparkline
  const sparklinePath = useMemo(() => {
    if (safeTimeSeries.length === 0) return '';

    const maxVal = Math.max(...safeTimeSeries.map((p) => p.appearances), 1);
    const width = 200;
    const height = 40;
    const padding = 4;

    const points = safeTimeSeries.map((point, index) => {
      const x = padding + (index / (safeTimeSeries.length - 1)) * (width - 2 * padding);
      const y = height - padding - (point.appearances / maxVal) * (height - 2 * padding);
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')}`;
  }, [safeTimeSeries]);

  // Generate area path (filled below the line)
  const areaPath = useMemo(() => {
    if (safeTimeSeries.length === 0) return '';

    const maxVal = Math.max(...safeTimeSeries.map((p) => p.appearances), 1);
    const width = 200;
    const height = 40;
    const padding = 4;

    const points = safeTimeSeries.map((point, index) => {
      const x = padding + (index / (safeTimeSeries.length - 1)) * (width - 2 * padding);
      const y = height - padding - (point.appearances / maxVal) * (height - 2 * padding);
      return { x, y };
    });

    const startX = points[0].x;
    const endX = points[points.length - 1].x;

    return `M ${startX},${height - padding} L ${points.map((p) => `${p.x},${p.y}`).join(' L ')} L ${endX},${height - padding} Z`;
  }, [safeTimeSeries]);

  // Early return after all hooks
  if (!hasData) {
    return null;
  }

  const getTrendIcon = () => {
    switch (trendInfo.direction) {
      case 'up':
        return <ArrowTrendingUpIcon className="size-5 text-primary-green" />;
      case 'down':
        return <ArrowTrendingDownIcon className="size-5 text-primary-red" />;
      default:
        return <MinusIcon className="size-5 text-muted-foreground" />;
    }
  };

  const getTrendLabel = () => {
    switch (trendInfo.direction) {
      case 'up':
        return t('numberStats.trend.increasing');
      case 'down':
        return t('numberStats.trend.decreasing');
      default:
        return t('numberStats.trend.stable');
    }
  };

  const getTrendColor = () => {
    switch (trendInfo.direction) {
      case 'up':
        return 'text-primary-green';
      case 'down':
        return 'text-primary-red';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStrokeColor = () => {
    switch (trendInfo.direction) {
      case 'up':
        return 'stroke-primary-green';
      case 'down':
        return 'stroke-primary-red';
      default:
        return 'stroke-chart-1';
    }
  };

  const getFillColor = () => {
    switch (trendInfo.direction) {
      case 'up':
        return 'fill-primary-green/20';
      case 'down':
        return 'fill-primary-red/20';
      default:
        return 'fill-chart-1/20';
    }
  };

  // Calculate stats
  const totalAppearances = safeTimeSeries.reduce((sum, p) => sum + (p.appearances ?? 0), 0);
  const avgPerMonth = (totalAppearances / safeTimeSeries.length).toFixed(1);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h4 className="text-body-default-bold text-foreground">{t('numberStats.trend.title')}</h4>
        <p className="text-body-small text-muted-foreground">{t('numberStats.trend.description')}</p>
      </div>

      <Card className="rounded">
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {/* Sparkline */}
            <div className="flex-1">
              <svg viewBox="0 0 200 40" className="h-10 w-full" preserveAspectRatio="none">
                {/* Area fill */}
                <path d={areaPath} className={getFillColor()} />
                {/* Line */}
                <path
                  d={sparklinePath}
                  fill="none"
                  className={cn(getStrokeColor(), 'stroke-2')}
                  strokeLinecap="round"
                />
              </svg>
              <div className="mt-1 flex justify-between text-body-small text-subtle-foreground">
                <span>{safeTimeSeries[0]?.month.substring(0, 7)}</span>
                <span>{safeTimeSeries[safeTimeSeries.length - 1]?.month.substring(0, 7)}</span>
              </div>
            </div>

            {/* Trend indicator */}
            <div className="flex flex-col items-center rounded-lg bg-background p-3">
              {getTrendIcon()}
              <span className={cn('mt-1 text-body-small-bold', getTrendColor())}>{getTrendLabel()}</span>
              {trendInfo.change !== 0 && (
                <span className="text-body-small text-muted-foreground">
                  {trendInfo.change > 0 ? '+' : ''}
                  {trendInfo.change}%
                </span>
              )}
            </div>
          </div>

          {/* Stats row */}
          <Separator />
          <div className="flex items-center gap-4 text-body-small">
            <div>
              <span className="text-muted-foreground">{t('numberStats.trend.totalAppearances')}: </span>
              <span className="text-body-small-bold">{totalAppearances}</span>
            </div>
            <div>
              <span className="text-muted-foreground">{t('numberStats.trend.avgPerMonth')}: </span>
              <span className="text-body-small-bold">{avgPerMonth}</span>
            </div>
            <div>
              <span className="text-muted-foreground">{t('numberStats.trend.months')}: </span>
              <span className="text-body-small-bold">{safeTimeSeries.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
