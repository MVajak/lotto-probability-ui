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

interface AutocorrelationChartProps {
  lagCorrelations: NumberHistoryDto['autocorrelation']['lagCorrelations'];
}

export const AutocorrelationChart: React.FC<AutocorrelationChartProps> = ({ lagCorrelations }) => {
  const { t } = useTranslation();
  const colors = useMemo(
    () => ({
      positive: getCSSColor('--color-primary-red'),
      negative: getCSSColor('--color-primary-blue'),
      neutral: getCSSColor('--color-muted-foreground'),
      foreground: getCSSColor('--color-foreground'),
    }),
    []
  );

  return (
    <div>
      <h4 className="mb-1 text-body-default-bold">{t('numberStats.autocorrelationChart.title')}</h4>
      <p className="mb-4 text-body-small text-muted-foreground">{t('numberStats.autocorrelationChart.description')}</p>
      <div className="h-[250px]">
        <ResponsiveBar
          data={lagCorrelations.map((item) => ({
            lag: `Lag ${item.lag}`,
            correlation: item.correlation,
            significant: item.isSignificant ? 1 : 0,
            pValue: item.pValue,
          }))}
          keys={['correlation']}
          indexBy="lag"
          margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
          padding={0.3}
          colors={(bar) => {
            const data = bar.data as { significant: number; correlation: number };
            if (data.significant === 1) {
              return data.correlation > 0 ? colors.positive : colors.negative;
            }
            return colors.neutral;
          }}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Previous Draws',
            legendPosition: 'middle',
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Correlation',
            legendPosition: 'middle',
            legendOffset: -50,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          markers={[
            {
              axis: 'y',
              value: 0,
              lineStyle: { stroke: colors.foreground, strokeWidth: 2 },
            },
          ]}
          tooltip={({ data }) => {
            const item = data as { lag: string; correlation: number; pValue: number; significant: number };
            return (
              <div className="rounded border border-border bg-card p-3 shadow-lg">
                <p className="mb-1 text-body-default-bold">{item.lag}</p>
                <p className="text-body-small text-muted-foreground">
                  Correlation: <strong>{item.correlation.toFixed(3)}</strong>
                </p>
                <p className="text-body-small text-muted-foreground">
                  P-value: <strong>{item.pValue.toFixed(3)}</strong>
                </p>
                <p className="mt-1 text-body-small text-muted-foreground">
                  {item.significant === 1
                    ? '⚠️ Statistically significant - may indicate a pattern'
                    : '✓ Not significant - appears random'}
                </p>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};
