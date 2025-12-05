import type React from 'react';

import { Box, Typography } from '@mui/material';

import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import type { NumberHistoryDto } from '@/features/lottoProbability/types.ts';

interface TimelineScatterPlotProps {
  occurrences: NumberHistoryDto['occurrences'];
  numberValue: number;
}

export const TimelineScatterPlot: React.FC<TimelineScatterPlotProps> = ({ occurrences, numberValue }) => {
  if (occurrences.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography variant="subtitle2" fontWeight="600" gutterBottom>
        Appearance Timeline
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
        Each dot shows when number {numberValue} appeared in a draw. Clusters indicate multiple appearances in a short
        time.
      </Typography>
      <Box sx={{ height: 200 }}>
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
          colors="#1976d2"
          nodeSize={10}
          tooltip={({ node }) => {
            const data = node.data as { drawLabel: string; drawDate: string; index: number };
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
                  {data.drawLabel}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: <strong>{new Date(data.drawDate).toLocaleDateString()}</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                  Occurrence #{data.index} of {occurrences.length}
                </Typography>
              </Box>
            );
          }}
        />
      </Box>
    </Box>
  );
};
