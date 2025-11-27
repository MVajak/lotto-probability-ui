import type React from 'react';
import { useTranslation } from 'react-i18next';

import ShowChartIcon from '@mui/icons-material/ShowChart';
import { Box, Card, CardContent, LinearProgress, Stack, Typography } from '@mui/material';

import type { NumberStat } from '../../../../types';
import { convertToPercentage } from '../../../../utils/calculations';

interface ConfidenceIntervalCardProps {
  numberStat: NumberStat;
}

export const ConfidenceIntervalCard: React.FC<ConfidenceIntervalCardProps> = ({ numberStat }) => {
  const { t } = useTranslation();

  if (!numberStat.confidenceInterval) return null;

  return (
    <Card elevation={2} sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <ShowChartIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">
            {t('numberStats.wilsonConfidenceInterval')}
          </Typography>
        </Stack>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, fontStyle: 'italic', bgcolor: 'info.50', p: 1.5, borderRadius: 1 }}
        >
          {t('numberStats.wilsonConfidenceIntervalHelp', {
            confidence: Math.round(numberStat.confidenceInterval.confidenceLevel * 100),
          })}
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                {t('numberStats.lowerBound')}
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="primary">
                {convertToPercentage(numberStat.confidenceInterval.lower)}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={numberStat.confidenceInterval.lower * 100}
              sx={{ height: 8, borderRadius: 1 }}
            />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                {t('numberStats.upperBound')}
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="primary">
                {convertToPercentage(numberStat.confidenceInterval.upper)}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={numberStat.confidenceInterval.upper * 100}
              sx={{ height: 8, borderRadius: 1 }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
