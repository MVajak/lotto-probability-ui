import type React from 'react';

import { Box, Typography } from '@mui/material';

import { ResponsiveHeatMap } from '@nivo/heatmap';
import type { NumberHistoryDto } from '@/features/lottoProbability/types.ts';

interface MarkovHeatmapProps {
  transitionProbabilities: NumberHistoryDto['markovChain']['transitionProbabilities'];
}

export const MarkovHeatmap: React.FC<MarkovHeatmapProps> = ({ transitionProbabilities }) => {
  return (
    <Box>
      <Typography variant="subtitle2" fontWeight="600" gutterBottom>
        State Transitions (Markov Chain)
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
        Shows probability of number appearing/not appearing based on previous draw. Darker = higher probability
      </Typography>
      <Box sx={{ height: 200 }}>
        <ResponsiveHeatMap
          data={[
            {
              id: 'After Appeared',
              data: [
                {
                  x: 'Appears Again',
                  y: transitionProbabilities.appearedToAppeared * 100,
                },
                {
                  x: 'Does Not Appear',
                  y: transitionProbabilities.appearedToNotAppeared * 100,
                },
              ],
            },
            {
              id: 'After Not Appeared',
              data: [
                {
                  x: 'Appears',
                  y: transitionProbabilities.notAppearedToAppeared * 100,
                },
                {
                  x: 'Does Not Appear',
                  y: transitionProbabilities.notAppearedToNotAppeared * 100,
                },
              ],
            },
          ]}
          margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
          valueFormat={(value) => `${value.toFixed(1)}%`}
          axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: '',
            legendOffset: 46,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Previous State',
            legendPosition: 'middle',
            legendOffset: -72,
          }}
          colors={{
            type: 'sequential',
            scheme: 'blues',
          }}
          emptyColor="#555555"
          legends={[
            {
              anchor: 'bottom',
              translateX: 0,
              translateY: 30,
              length: 400,
              thickness: 8,
              direction: 'row',
              tickPosition: 'after',
              tickSize: 3,
              tickSpacing: 4,
              tickOverlap: false,
              title: 'Probability (%) →',
              titleAlign: 'start',
              titleOffset: 4,
            },
          ]}
        />
      </Box>
    </Box>
  );
};
