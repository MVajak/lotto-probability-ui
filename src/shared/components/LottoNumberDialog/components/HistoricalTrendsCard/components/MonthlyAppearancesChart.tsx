import type React from 'react';

import { Box, Typography } from '@mui/material';

import { ResponsiveLine } from '@nivo/line';
import type { NumberHistoryDto } from '@/features/lottoProbability/types.ts';

interface MonthlyAppearancesChartProps {
  timeSeries: NumberHistoryDto['trends']['timeSeries'];
  numberValue: number;
}

export const MonthlyAppearancesChart: React.FC<MonthlyAppearancesChartProps> = ({ timeSeries, numberValue }) => {
  if (timeSeries.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography variant="subtitle2" fontWeight="600" gutterBottom>
        Monthly Appearances Over Time
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
        How many times this number appeared each month vs. what we'd expect if it was random
      </Typography>
      <Box sx={{ height: 300, mt: 2 }}>
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
          colors={['#1976d2', '#ff9800']}
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
                  {seriesLabel}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Month: <strong>{point.data.xFormatted}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Appearances: <strong>{point.data.yFormatted}</strong>
                </Typography>
                {isActual && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                    {Number(point.data.y) > 0
                      ? `Number ${numberValue} appeared ${point.data.y} time${Number(point.data.y) > 1 ? 's' : ''} this month`
                      : "Number didn't appear this month"}
                  </Typography>
                )}
                {!isActual && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                    Average expected if random: {Number(point.data.y).toFixed(2)} times
                  </Typography>
                )}
              </Box>
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
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
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
