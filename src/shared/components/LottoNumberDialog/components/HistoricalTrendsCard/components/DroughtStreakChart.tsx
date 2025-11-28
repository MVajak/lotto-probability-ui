import type React from 'react';

import { Box, Typography } from '@mui/material';

import { ResponsiveBar } from '@nivo/bar';
import type { NumberHistoryDto } from '@/features/lottoProbability/types.ts';

interface DroughtStreakChartProps {
  trends: NumberHistoryDto['trends'];
}

export const DroughtStreakChart: React.FC<DroughtStreakChartProps> = ({ trends }) => {
  return (
    <Box>
      <Typography variant="subtitle2" fontWeight="600" gutterBottom>
        Drought & Streak Patterns
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
        Visual comparison of current vs. historical streaks and droughts
      </Typography>
      <Box sx={{ height: 200 }}>
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
          colors={['#1976d2', '#ff9800']}
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
                  {id} {metric.metric}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Value: <strong>{label}</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                  {metric.metric === 'Streak'
                    ? isCurrent
                      ? 'Number of consecutive draws with this number'
                      : 'Maximum consecutive appearances recorded'
                    : isCurrent
                      ? 'Days since this number last appeared'
                      : 'Longest gap between appearances'}
                </Typography>
              </Box>
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
      </Box>
    </Box>
  );
};
