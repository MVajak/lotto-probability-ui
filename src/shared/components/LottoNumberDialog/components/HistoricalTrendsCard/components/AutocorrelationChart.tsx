import type React from 'react';

import { Box, Typography } from '@mui/material';

import { ResponsiveBar } from '@nivo/bar';
import type { NumberHistoryDto } from '@/features/lottoProbability/types.ts';

interface AutocorrelationChartProps {
  lagCorrelations: NumberHistoryDto['autocorrelation']['lagCorrelations'];
}

export const AutocorrelationChart: React.FC<AutocorrelationChartProps> = ({ lagCorrelations }) => {
  return (
    <Box>
      <Typography variant="subtitle2" fontWeight="600" gutterBottom>
        Pattern Detection (Autocorrelation)
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
        Checks if this number's appearances are related to previous draws. Bars near zero = random (good!), bars far
        from zero = potential pattern
      </Typography>
      <Box sx={{ height: 250 }}>
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
              return data.correlation > 0 ? '#f44336' : '#2196f3';
            }
            return '#9e9e9e';
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
              lineStyle: { stroke: '#000', strokeWidth: 2 },
            },
          ]}
          tooltip={({ data }) => {
            const item = data as { lag: string; correlation: number; pValue: number; significant: number };
            return (
              <Box
                sx={{
                  background: 'white',
                  padding: '12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              >
                <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
                  {item.lag}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Correlation: <strong>{item.correlation.toFixed(3)}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  P-value: <strong>{item.pValue.toFixed(3)}</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                  {item.significant === 1
                    ? '⚠️ Statistically significant - may indicate a pattern'
                    : '✓ Not significant - appears random'}
                </Typography>
              </Box>
            );
          }}
        />
      </Box>
    </Box>
  );
};
