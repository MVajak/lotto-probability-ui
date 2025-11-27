import ShowChartIcon from '@mui/icons-material/ShowChart';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, Card, CardContent, Chip, CircularProgress, Divider, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { NumberHistoryDto } from '../../../../../features/lottoProbability/types';

interface HistoricalTrendsCardProps {
  numberHistory: NumberHistoryDto | null;
  isLoading: boolean;
}

export const HistoricalTrendsCard: React.FC<HistoricalTrendsCardProps> = ({ numberHistory, isLoading }) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <Card elevation={2}>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <CircularProgress size={40} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Loading historical data...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (!numberHistory) {
    return (
      <Card
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          border: '2px dashed',
          borderColor: 'divider',
        }}
      >
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <ShowChartIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1.5, opacity: 0.5 }} />
          <Typography variant="subtitle1" fontWeight="600" color="text.secondary" gutterBottom>
            {t('numberStats.historicalTrends')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.7 }}>
            {t('numberStats.historicalTrendsDescription')}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const { trends, autocorrelation, markovChain } = numberHistory;

  const getInterpretationIcon = (interpretation: string) => {
    if (interpretation === 'random' || interpretation === 'memoryless') {
      return <TrendingFlatIcon />;
    }
    if (interpretation === 'clustered' || interpretation === 'persistent') {
      return <TrendingUpIcon />;
    }
    return <TrendingDownIcon />;
  };

  const getInterpretationColor = (interpretation: string) => {
    if (interpretation === 'random' || interpretation === 'memoryless') {
      return 'info';
    }
    if (interpretation === 'clustered' || interpretation === 'persistent') {
      return 'success';
    }
    return 'warning';
  };

  return (
    <Card elevation={2}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
          <Box
            sx={{
              p: 0.75,
              borderRadius: 1.5,
              bgcolor: 'success.50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShowChartIcon sx={{ fontSize: 20, color: 'success.dark' }} />
          </Box>
          <Typography variant="h6" fontWeight="bold">
            Historical Trends & Patterns
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          {/* Streak & Drought Info */}
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

        <Divider sx={{ my: 2 }} />

        {/* Pattern Analysis */}
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

        {/* Monthly Time Series */}
        {trends.timeSeries.length > 0 && (
          <Box>
            <Typography variant="subtitle2" fontWeight="600" gutterBottom>
              Monthly Appearances
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5, mt: 1, overflowX: 'auto', pb: 1 }}>
              {trends.timeSeries.map((point, index) => {
                const isAboveExpected = point.appearances > point.expectedAppearances;
                return (
                  <Box
                    key={index}
                    sx={{
                      minWidth: 60,
                      p: 1,
                      bgcolor: isAboveExpected ? 'success.50' : 'grey.100',
                      borderRadius: 1,
                      textAlign: 'center',
                      border: '1px solid',
                      borderColor: isAboveExpected ? 'success.200' : 'grey.300',
                    }}
                  >
                    <Typography variant="caption" color="text.secondary" display="block">
                      {point.month.substring(5)}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {point.appearances}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                      exp: {point.expectedAppearances.toFixed(1)}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}

        {/* Interpretation Helper */}
        <Box sx={{ mt: 2, p: 1.5, bgcolor: 'info.50', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary">
            <strong>Pattern Interpretation:</strong> {autocorrelation.interpretation === 'random' ?
              'No significant patterns detected - appearances are random as expected in a fair lottery.' :
              `Detected ${autocorrelation.interpretation} pattern - this may indicate clustering or dispersion in appearances.`
            }
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
