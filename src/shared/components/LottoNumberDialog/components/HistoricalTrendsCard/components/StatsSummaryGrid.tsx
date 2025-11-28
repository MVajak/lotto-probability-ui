import type React from 'react';

import { Box, Grid, Typography } from '@mui/material';

import type { NumberHistoryDto } from '@/features/lottoProbability/types.ts';

interface StatsSummaryGridProps {
  trends: NumberHistoryDto['trends'];
  markovChain: NumberHistoryDto['markovChain'];
}

export const StatsSummaryGrid: React.FC<StatsSummaryGridProps> = ({ trends, markovChain }) => {
  return (
    <Grid container spacing={2}>
      {/* Current Streak */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Box sx={{ p: 1.5, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            Current Streak
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="primary">
            {trends.currentStreak}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Longest: {trends.longestStreak}
          </Typography>
        </Box>
      </Grid>

      {/* Current Drought */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Box sx={{ p: 1.5, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            Current Drought
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="warning.main">
            {trends.currentDroughtDays} days
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Longest: {trends.longestDroughtDays} days
          </Typography>
        </Box>
      </Grid>

      {/* Average Days Between */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Box sx={{ p: 1.5, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            Avg. Days Between
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {trends.averageDaysBetweenAppearances} days
          </Typography>
        </Box>
      </Grid>

      {/* Steady State Probability */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Box sx={{ p: 1.5, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            Steady State Prob.
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="success.main">
            {(markovChain.steadyStateProbability * 100).toFixed(1)}%
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
