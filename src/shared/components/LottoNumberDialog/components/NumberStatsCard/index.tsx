import type React from 'react';
import { useTranslation } from 'react-i18next';

import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Card, CardContent, Chip, Grid, Typography } from '@mui/material';

import { CATEGORY_COLORS } from '../../../../constants';
import type { Interpretation, NumberStat } from '../../../../types';
import { convertToPercentage } from '../../../../utils/calculations';

interface NumberStatsCardProps {
  numberStat: NumberStat;
}

export const NumberStatsCard: React.FC<NumberStatsCardProps> = ({ numberStat }) => {
  const { t } = useTranslation();

  const getStatusIcon = (status?: Interpretation['status']) => {
    switch (status) {
      case 'frequent':
        return <TrendingUpIcon />;
      case 'rare':
        return <TrendingDownIcon />;
      default:
        return <TrendingFlatIcon />;
    }
  };

  const getStatusLabel = (status?: Interpretation['status']) => {
    switch (status) {
      case 'frequent':
        return t('numberStats.frequentNumber');
      case 'rare':
        return t('numberStats.rareNumber');
      default:
        return t('numberStats.normalDistribution');
    }
  };

  const getCategoryColor = (status?: Interpretation['status']) => {
    if (!status || status === 'normal') return CATEGORY_COLORS.normal.primary;
    return CATEGORY_COLORS[status].primary;
  };

  return (
    <Card elevation={1}>
      <CardContent sx={{ py: 2, px: 2.5 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Status Badge */}
          {numberStat.interpretation && (
            <Grid size={{ xs: 12, sm: 'auto' }}>
              <Chip
                icon={getStatusIcon(numberStat.interpretation.status)}
                label={getStatusLabel(numberStat.interpretation.status)}
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  height: 36,
                  bgcolor: getCategoryColor(numberStat.interpretation.status),
                  color: 'white',
                  '& .MuiChip-icon': {
                    color: 'white',
                    fontSize: '1.2rem',
                  },
                }}
              />
            </Grid>
          )}

          {/* Stats Grid */}
          <Grid>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  gutterBottom
                  sx={{ fontWeight: 500 }}
                >
                  {t('general.count')}
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  {numberStat.count}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: '0.7rem', display: 'block', mt: 0.5, opacity: 0.8 }}
                >
                  {t('numberStats.countHelp')}
                </Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  gutterBottom
                  sx={{ fontWeight: 500 }}
                >
                  {t('general.frequency')}
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  {convertToPercentage(numberStat.frequency)}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: '0.7rem', display: 'block', mt: 0.5, opacity: 0.8 }}
                >
                  {t('numberStats.probabilityHelp')}
                </Typography>
              </Grid>
              {numberStat.theoreticalProbability !== undefined && (
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    gutterBottom
                    sx={{ fontWeight: 500 }}
                  >
                    {t('numberStats.theoretical')}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {convertToPercentage(numberStat.theoreticalProbability)}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: '0.7rem', display: 'block', mt: 0.5, opacity: 0.8 }}
                  >
                    {t('numberStats.theoreticalHelp')}
                  </Typography>
                </Grid>
              )}
              {numberStat.interpretation?.percentDifference !== undefined &&
                numberStat.interpretation.percentDifference !== 0 && (
                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      gutterBottom
                      sx={{ fontWeight: 500 }}
                    >
                      Difference
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color={numberStat.interpretation.percentDifference > 0 ? 'error' : 'info'}
                    >
                      {numberStat.interpretation.percentDifference > 0 ? '+' : ''}
                      {numberStat.interpretation.percentDifference}%
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: '0.7rem', display: 'block', mt: 0.5, opacity: 0.8 }}
                    >
                      {t('numberStats.differenceHelp')}
                    </Typography>
                  </Grid>
                )}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
