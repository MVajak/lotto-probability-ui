import type React from 'react';
import { useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useTranslation } from 'react-i18next';

import type { NumberHistoryDto } from '@/domains/lotto';

// Helper to get CSS variable values for chart colors
const getCSSColor = (varName: string): string => {
  if (typeof window === 'undefined') return '#1976d2'; // fallback for SSR
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || '#1976d2';
};

interface MonthlyAppearancesChartProps {
  timeSeries: NumberHistoryDto['trends']['timeSeries'];
  numberValue: number;
}

export const MonthlyAppearancesChart: React.FC<MonthlyAppearancesChartProps> = ({ timeSeries, numberValue }) => {
  const { t } = useTranslation();
  const chartColors = useMemo(() => [getCSSColor('--color-chart-1'), getCSSColor('--color-chart-2')], []);

  if (timeSeries.length === 0) {
    return null;
  }

  return (
    <div>
      <h4 className="mb-1 text-body-default-bold">{t('numberStats.monthlyAppearances.title')}</h4>
      <p className="mb-4 text-body-small text-muted-foreground">{t('numberStats.monthlyAppearances.description')}</p>
      <div className="mt-4 h-[300px]">
        <ResponsiveLine
          data={[
            {
              id: 'Actual Appearances',
              data: timeSeries.map((point) => ({
                x: point.month.substring(5),
                y: point.appearances,
              })),
            },
            {
              id: 'Expected (Random)',
              data: timeSeries.map((point) => ({
                x: point.month.substring(5),
                y: point.expectedAppearances,
              })),
            },
          ]}
          margin={{ top: 20, right: 130, bottom: 50, left: 50 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 0,
            max: 'auto',
          }}
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: 'Month (YYYY-MM)',
            legendOffset: 45,
            legendPosition: 'middle',
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Times Appeared',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          colors={chartColors}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          enableArea={true}
          areaOpacity={0.15}
          useMesh={true}
          tooltip={({ point }) => {
            const seriesLabel = String((point as { serieId?: string }).serieId || '');
            const isActual = seriesLabel === 'Actual Appearances';
            return (
              <div className="rounded border border-border bg-card p-3 shadow-lg">
                <p className="mb-1 text-body-default-bold">{seriesLabel}</p>
                <p className="text-body-small text-muted-foreground">
                  Month: <strong>{point.data.xFormatted}</strong>
                </p>
                <p className="text-body-small text-muted-foreground">
                  Appearances: <strong>{point.data.yFormatted}</strong>
                </p>
                {isActual && (
                  <p className="mt-1 text-body-small text-muted-foreground">
                    {Number(point.data.y) > 0
                      ? `Number ${numberValue} appeared ${point.data.y} time${Number(point.data.y) > 1 ? 's' : ''} this month`
                      : "Number didn't appear this month"}
                  </p>
                )}
                {!isActual && (
                  <p className="mt-1 text-body-small text-muted-foreground">
                    Average expected if random: {Number(point.data.y).toFixed(2)} times
                  </p>
                )}
              </div>
            );
          }}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 4,
              itemDirection: 'left-to-right',
              itemWidth: 110,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'currentColor',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'transparent',
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
