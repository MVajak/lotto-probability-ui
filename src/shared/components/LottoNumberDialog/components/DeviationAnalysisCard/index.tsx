import type React from 'react';
import { useTranslation } from 'react-i18next';

import ShowChartIcon from '@mui/icons-material/ShowChart';
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

import type { NumberStat } from '../../../../types';
import { convertToPercentage } from '../../../../utils/calculations';

interface DeviationAnalysisCardProps {
  numberStat: NumberStat;
}

export const DeviationAnalysisCard: React.FC<DeviationAnalysisCardProps> = ({ numberStat }) => {
  const { t } = useTranslation();

  if (!numberStat.deviation) return null;

  return (
    <Card elevation={2} sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <ShowChartIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">
            {t('numberStats.deviationAnalysis')}
          </Typography>
        </Stack>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, fontStyle: 'italic', bgcolor: 'warning.50', p: 1.5, borderRadius: 1 }}
        >
          {t('numberStats.deviationAnalysisHelp')}
        </Typography>
        <Stack spacing={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              bgcolor: 'grey.50',
              borderRadius: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {t('numberStats.absoluteDeviation')}
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {convertToPercentage(numberStat.deviation.absolute)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              bgcolor: 'grey.50',
              borderRadius: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {t('numberStats.relativeDeviation')}
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {numberStat.deviation.relative.toFixed(2)}x
            </Typography>
          </Box>
          <Chip
            label={
              numberStat.deviation.isSignificant
                ? t('numberStats.statisticallySignificant')
                : t('numberStats.notSignificant')
            }
            color={numberStat.deviation.isSignificant ? 'warning' : 'success'}
            sx={{ fontWeight: 'bold' }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};
