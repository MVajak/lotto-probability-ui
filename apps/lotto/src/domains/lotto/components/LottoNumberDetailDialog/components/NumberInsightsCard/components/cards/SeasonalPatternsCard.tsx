import type React from 'react';
import { useMemo } from 'react';
import { CalendarDaysIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Banner, type BannerVariant, Card, CardContent, cn, Separator } from '@lotto/ui';

import type { NumberDetailDto } from '@/domains/lotto';

interface SeasonalPatternsCardProps {
  seasonalPatterns: NumberDetailDto['seasonalPatterns'];
}

type DayData = { dayOfWeek: number; appearances: number; totalDraws: number; frequency: number };
type MonthData = { month: number; appearances: number; totalDraws: number; frequency: number };

/**
 * Seasonal patterns visualization with horizontal bars.
 * Each day/month as a row with label → bar → percentage.
 * Very mobile-friendly layout.
 */
export const SeasonalPatternsCard: React.FC<SeasonalPatternsCardProps> = ({ seasonalPatterns }) => {
  const { t } = useTranslation();

  // Extract data with defaults for hook stability
  const byDayOfWeek = seasonalPatterns?.byDayOfWeek ?? [];
  const byMonth = seasonalPatterns?.byMonth ?? [];
  const interpretation = seasonalPatterns?.interpretation ?? 'no_pattern';

  // All hooks must be called before any early return
  const dayNames = useMemo(
    () => [
      t('numberStats.seasonal.days.mon'),
      t('numberStats.seasonal.days.tue'),
      t('numberStats.seasonal.days.wed'),
      t('numberStats.seasonal.days.thu'),
      t('numberStats.seasonal.days.fri'),
      t('numberStats.seasonal.days.sat'),
      t('numberStats.seasonal.days.sun'),
    ],
    [t]
  );

  const monthNames = useMemo(
    () => [
      t('numberStats.seasonal.months.jan'),
      t('numberStats.seasonal.months.feb'),
      t('numberStats.seasonal.months.mar'),
      t('numberStats.seasonal.months.apr'),
      t('numberStats.seasonal.months.may'),
      t('numberStats.seasonal.months.jun'),
      t('numberStats.seasonal.months.jul'),
      t('numberStats.seasonal.months.aug'),
      t('numberStats.seasonal.months.sep'),
      t('numberStats.seasonal.months.oct'),
      t('numberStats.seasonal.months.nov'),
      t('numberStats.seasonal.months.dec'),
    ],
    [t]
  );

  const dayStats = useMemo(() => {
    const activeDays = byDayOfWeek.filter((d: DayData) => d.totalDraws > 0);
    const maxFreq = Math.max(...activeDays.map((d: DayData) => d.frequency), 0.01);
    const avgFreq = activeDays.length > 0 ? activeDays.reduce((sum: number, d: DayData) => sum + d.frequency, 0) / activeDays.length : 0;
    return { maxFreq, avgFreq };
  }, [byDayOfWeek]);

  const monthStats = useMemo(() => {
    const activeMonths = byMonth.filter((m: MonthData) => m.totalDraws > 0);
    const maxFreq = Math.max(...activeMonths.map((m: MonthData) => m.frequency), 0.01);
    const avgFreq = activeMonths.length > 0 ? activeMonths.reduce((sum: number, m: MonthData) => sum + m.frequency, 0) / activeMonths.length : 0;
    return { maxFreq, avgFreq };
  }, [byMonth]);

  // Early return after all hooks
  if (!seasonalPatterns) {
    return null;
  }

  const getBannerConfig = (): { variant: BannerVariant; icon: React.ReactNode } => {
    switch (interpretation) {
      case 'day_pattern':
      case 'month_pattern':
        return {
          variant: 'warning',
          icon: <ExclamationTriangleIcon className="size-5" />,
        };
      default:
        return {
          variant: 'success',
          icon: <CheckCircleIcon className="size-5" />,
        };
    }
  };

  const bannerConfig = getBannerConfig();

  const getBarColor = (frequency: number, avgFreq: number, hasData: boolean) => {
    if (!hasData) return 'bg-muted';
    if (frequency > avgFreq * 1.2) return 'bg-primary-green';
    if (frequency < avgFreq * 0.8) return 'bg-primary-red/50';
    return 'bg-primary-blue/70';
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h4 className="text-body-default-bold">{t('numberStats.seasonal.title')}</h4>
        <p className="text-body-small text-muted-foreground">{t('numberStats.seasonal.description')}</p>
      </div>

      <Banner
        variant={bannerConfig.variant}
        icon={bannerConfig.icon}
        title={t(`numberStats.seasonal.interpretation.${interpretation}`)}
        description={t(`numberStats.seasonal.interpretationDescription.${interpretation}`)}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {/* Day of Week - Horizontal Bars */}
        <Card className="rounded">
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <CalendarDaysIcon className="size-5 text-primary-blue" />
              <span className="text-body-small-bold">{t('numberStats.seasonal.byDayOfWeek')}</span>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              {byDayOfWeek.map((day: DayData, index: number) => {
                const hasData = day.totalDraws > 0;
                const widthPercent = hasData ? (day.frequency / dayStats.maxFreq) * 100 : 0;
                return (
                  <div key={day.dayOfWeek} className="flex items-center gap-2">
                    <span className="w-10 shrink-0 text-body-small text-muted-foreground">{dayNames[index]}</span>
                    <div className="h-5 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn('h-full rounded-full transition-all', getBarColor(day.frequency, dayStats.avgFreq, hasData))}
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right font-mono text-body-small">
                      {hasData ? `${(day.frequency * 100).toFixed(0)}%` : '-'}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Month - Horizontal Bars */}
        <Card className="rounded">
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <CalendarDaysIcon className="size-5 text-primary-green" />
              <span className="text-body-small-bold">{t('numberStats.seasonal.byMonth')}</span>
            </div>
            <Separator />
            <div className="flex flex-col gap-1.5">
              {byMonth.map((month: MonthData, index: number) => {
                const hasData = month.totalDraws > 0;
                const widthPercent = hasData ? (month.frequency / monthStats.maxFreq) * 100 : 0;
                return (
                  <div key={month.month} className="flex items-center gap-2">
                    <span className="w-10 shrink-0 text-body-small text-muted-foreground">{monthNames[index]}</span>
                    <div className="h-4 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn('h-full rounded-full transition-all', getBarColor(month.frequency, monthStats.avgFreq, hasData))}
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right font-mono text-body-small">
                      {hasData ? `${(month.frequency * 100).toFixed(0)}%` : '-'}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-body-small text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="size-3 rounded bg-primary-green" />
          <span>{t('numberStats.seasonal.aboveAverage')}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="size-3 rounded bg-primary-blue/70" />
          <span>{t('numberStats.seasonal.average')}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="size-3 rounded bg-primary-red/50" />
          <span>{t('numberStats.seasonal.belowAverage')}</span>
        </div>
      </div>
    </div>
  );
};
