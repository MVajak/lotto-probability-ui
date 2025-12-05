import type React from 'react';
import { useTranslation } from 'react-i18next';

import ShowChartIcon from '@mui/icons-material/ShowChart';
import { Box, Card, CardContent, CircularProgress, Divider, Stack, Typography } from '@mui/material';

import {
  AutocorrelationChart,
  DroughtStreakChart,
  InsufficientDataWarning,
  MarkovHeatmap,
  MonthlyAppearancesChart,
  PatternAnalysisChips,
  StatsSummaryGrid,
  TimelineScatterPlot,
} from './components';
import type { NumberHistoryDto } from '@/features/lottoProbability/types.ts';

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

  const { summary, trends, autocorrelation, markovChain } = numberHistory;
  const hasEnoughData = autocorrelation.lagCorrelations.length > 0;

  return (
    <Card elevation={2}>
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
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

        {/* Stats Summary Grid */}
        <StatsSummaryGrid trends={trends} markovChain={markovChain} />

        <Divider sx={{ my: 2 }} />

        {/* Pattern Analysis Chips */}
        <PatternAnalysisChips autocorrelation={autocorrelation} markovChain={markovChain} />

        {/* Monthly Appearances Chart */}
        <MonthlyAppearancesChart timeSeries={trends.timeSeries} numberValue={summary.number} />

        <Divider sx={{ my: 3 }} />

        {/* Autocorrelation Chart */}
        {hasEnoughData ? (
          <AutocorrelationChart lagCorrelations={autocorrelation.lagCorrelations} />
        ) : (
          <InsufficientDataWarning
            title="Pattern Detection (Autocorrelation)"
            message="Not enough data for statistical analysis. At least 20 draws are needed to detect meaningful patterns."
          />
        )}

        <Divider sx={{ my: 3 }} />

        {/* Markov Transition Heatmap */}
        {hasEnoughData ? (
          <MarkovHeatmap transitionProbabilities={markovChain.transitionProbabilities} />
        ) : (
          <InsufficientDataWarning
            title="State Transitions (Markov Chain)"
            message="Not enough data for statistical analysis. At least 20 draws are needed to analyze state transitions."
          />
        )}

        <Divider sx={{ my: 3 }} />

        {/* Timeline Scatter Plot */}
        <TimelineScatterPlot occurrences={numberHistory.occurrences} numberValue={summary.number} />

        <Divider sx={{ my: 3 }} />

        {/* Drought and Streak Chart */}
        <DroughtStreakChart trends={trends} />

        {/* Interpretation Helper */}
        <Box sx={{ mt: 2, p: 1.5, bgcolor: 'info.50', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary">
            <strong>Pattern Interpretation:</strong>{' '}
            {autocorrelation.interpretation === 'random'
              ? 'No significant patterns detected - appearances are random as expected in a fair lottery.'
              : `Detected ${autocorrelation.interpretation} pattern - this may indicate clustering or dispersion in appearances.`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
