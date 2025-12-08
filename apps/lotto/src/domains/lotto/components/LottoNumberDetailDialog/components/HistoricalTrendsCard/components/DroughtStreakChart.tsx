import type React from 'react';
import { useMemo } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useTranslation } from 'react-i18next';

import type { NumberHistoryDto } from '@/domains/lotto';

// Helper to get CSS variable values for chart colors
const getCSSColor = (varName: string): string => {
  if (typeof window === 'undefined') return '#1976d2'; // fallback for SSR
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || '#1976d2';
};

interface DroughtStreakChartProps {
  trends: NumberHistoryDto['trends'];
}

export const DroughtStreakChart: React.FC<DroughtStreakChartProps> = ({ trends }) => {
  const { t } = useTranslation();
  const chartColors = useMemo(() => [getCSSColor('--color-chart-1'), getCSSColor('--color-chart-2')], []);

  return (
    <div>
      <h4 className="mb-1 text-body-default-bold">{t('numberStats.droughtStreak.title')}</h4>
      <p className="mb-4 text-body-small text-muted-foreground">{t('numberStats.droughtStreak.description')}</p>
      <div className="h-[200px]">
        <ResponsiveBar
          data={[
            {
              metric: 'Streak',
              Current: trends.currentStreak,
              Longest: trends.longestStreak,
              currentLabel: `${trends.currentStreak} draw${trends.currentStreak !== 1 ? 's' : ''}`,
              longestLabel: `${trends.longestStreak} draw${trends.longestStreak !== 1 ? 's' : ''}`,
            },
            {
              metric: 'Drought',
              Current: trends.currentDroughtDays,
              Longest: trends.longestDroughtDays,
              currentLabel: `${trends.currentDroughtDays} day${trends.currentDroughtDays !== 1 ? 's' : ''}`,
              longestLabel: `${trends.longestDroughtDays} day${trends.longestDroughtDays !== 1 ? 's' : ''}`,
            },
          ]}
          keys={['Current', 'Longest']}
          indexBy="metric"
          margin={{ top: 20, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          groupMode="grouped"
          colors={chartColors}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Metric',
            legendPosition: 'middle',
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Count',
            legendPosition: 'middle',
            legendOffset: -50,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          tooltip={({ id, data }) => {
            const metric = data as {
              metric: string;
              currentLabel: string;
              longestLabel: string;
            };
            const isCurrent = id === 'Current';
            const label = isCurrent ? metric.currentLabel : metric.longestLabel;
            return (
              <div className="rounded border border-border bg-card p-3 shadow-lg">
                <p className="mb-1 text-body-default-bold">
                  {id} {metric.metric}
                </p>
                <p className="text-body-small text-muted-foreground">
                  Value: <strong>{label}</strong>
                </p>
                <p className="mt-1 text-body-small text-muted-foreground">
                  {metric.metric === 'Streak'
                    ? isCurrent
                      ? 'Number of consecutive draws with this number'
                      : 'Maximum consecutive appearances recorded'
                    : isCurrent
                      ? 'Days since this number last appeared'
                      : 'Longest gap between appearances'}
                </p>
              </div>
            );
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};
