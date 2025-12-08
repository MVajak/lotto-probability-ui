import type React from 'react';
import { useMemo } from 'react';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { useTranslation } from 'react-i18next';

import type { NumberHistoryDto } from '@/domains/lotto';

// Helper to get CSS variable values for chart colors
const getCSSColor = (varName: string): string => {
  if (typeof window === 'undefined') return '#1976d2'; // fallback for SSR
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || '#1976d2';
};

interface TimelineScatterPlotProps {
  occurrences: NumberHistoryDto['occurrences'];
  numberValue: number;
}

export const TimelineScatterPlot: React.FC<TimelineScatterPlotProps> = ({ occurrences, numberValue }) => {
  const { t } = useTranslation();
  const chartColor = useMemo(() => getCSSColor('--color-chart-1'), []);

  if (occurrences.length === 0) {
    return null;
  }

  return (
    <div>
      <h4 className="mb-1 text-body-default-bold">{t('numberStats.timeline.title')}</h4>
      <p className="mb-4 text-body-small text-muted-foreground">
        {t('numberStats.timeline.description', { number: numberValue })}
      </p>
      <div className="h-[200px]">
        <ResponsiveScatterPlot
          data={[
            {
              id: `Number ${numberValue}`,
              data: occurrences.map((occurrence, index) => ({
                x: new Date(occurrence.drawDate),
                y: 1,
                drawLabel: occurrence.drawLabel,
                drawDate: occurrence.drawDate,
                index: index + 1,
              })),
            },
          ]}
          margin={{ top: 20, right: 20, bottom: 70, left: 60 }}
          xScale={{
            type: 'time',
            format: 'native',
            precision: 'day',
          }}
          xFormat="time:%Y-%m-%d"
          yScale={{
            type: 'linear',
            min: 0,
            max: 2,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: '%b %Y',
            tickRotation: -45,
            legend: 'Date',
            legendPosition: 'middle',
            legendOffset: 60,
          }}
          axisLeft={{
            tickSize: 0,
            tickValues: [],
            legend: '',
          }}
          colors={chartColor}
          nodeSize={10}
          tooltip={({ node }) => {
            const data = node.data as { drawLabel: string; drawDate: string; index: number };
            return (
              <div className="rounded border border-border bg-card p-3 shadow-lg">
                <p className="mb-1 text-body-default-bold">{data.drawLabel}</p>
                <p className="text-body-small text-muted-foreground">
                  Date: <strong>{new Date(data.drawDate).toLocaleDateString()}</strong>
                </p>
                <p className="mt-1 text-body-small text-muted-foreground">
                  Occurrence #{data.index} of {occurrences.length}
                </p>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};
