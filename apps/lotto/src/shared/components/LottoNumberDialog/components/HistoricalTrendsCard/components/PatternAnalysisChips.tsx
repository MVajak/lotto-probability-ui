import type React from 'react';

import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, Chip, Stack, Typography } from '@mui/material';

import type { NumberHistoryDto } from '@/features/lottoProbability/types.ts';

interface PatternAnalysisChipsProps {
  autocorrelation: NumberHistoryDto['autocorrelation'];
  markovChain: NumberHistoryDto['markovChain'];
}

const getInterpretationIcon = (interpretation: string) => {
  if (interpretation === 'random' || interpretation === 'memoryless') {
    return <TrendingFlatIcon />;
  }
  if (interpretation === 'clustered' || interpretation === 'persistent') {
    return <TrendingUpIcon />;
  }
  return <TrendingDownIcon />;
};

const getInterpretationColor = (interpretation: string): 'info' | 'success' | 'warning' => {
  if (interpretation === 'random' || interpretation === 'memoryless') {
    return 'info';
  }
  if (interpretation === 'clustered' || interpretation === 'persistent') {
    return 'success';
  }
  return 'warning';
};

export const PatternAnalysisChips: React.FC<PatternAnalysisChipsProps> = ({ autocorrelation, markovChain }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" fontWeight="600" gutterBottom>
        Pattern Analysis
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
        <Chip
          icon={getInterpretationIcon(autocorrelation.interpretation)}
          label={`Autocorrelation: ${autocorrelation.interpretation}`}
          size="small"
          color={getInterpretationColor(autocorrelation.interpretation)}
          sx={{ fontWeight: 600 }}
        />
        <Chip
          icon={getInterpretationIcon(markovChain.interpretation)}
          label={`Markov: ${markovChain.interpretation}`}
          size="small"
          color={getInterpretationColor(markovChain.interpretation)}
          sx={{ fontWeight: 600 }}
        />
      </Stack>
    </Box>
  );
};
