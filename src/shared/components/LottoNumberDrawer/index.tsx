import CloseIcon from '@mui/icons-material/Close';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {
  Box,
  Chip,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { CATEGORY_COLORS } from '../../constants';
import { Interpretation, NumberStat } from '../../types';
import { convertToPercentage } from '../../utils/calculations';
import { LottoNumber } from '../LottoNumber';

interface LottoNumberDrawerProps {
  open: boolean;
  onClose: () => void;
  numberStat: NumberStat | null;
  relatedNumbers?: NumberStat[];
}

export const LottoNumberDrawer: React.FC<LottoNumberDrawerProps> = ({
  open,
  onClose,
  numberStat,
  relatedNumbers = [],
}) => {
  const { t } = useTranslation();

  if (!numberStat) return null;

  const getStatusIcon = (status?: Interpretation['status']) => {
    switch (status) {
      case 'frequent':
        return <TrendingUpIcon fontSize="small" />;
      case 'rare':
        return <TrendingDownIcon fontSize="small" />;
      default:
        return <TrendingFlatIcon fontSize="small" />;
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

  const getStatusBgColor = (status?: Interpretation['status']): string => {
    if (!status || status === 'normal') return 'rgba(156, 163, 175, 0.1)';
    const colors = CATEGORY_COLORS[status];
    return colors.gradient;
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        zIndex: 1400, // Higher than Dialog (1300)
        '& .MuiDrawer-paper': { width: { xs: '100%', sm: 450 } }
      }}
    >
      <Box sx={{ p: 2 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LottoNumber digit={numberStat.digit} index={`drawer-${numberStat.digit}`} />
            <Typography variant="h5" fontWeight="bold">
              {t('general.number')} {numberStat.digit}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Status Badge */}
        {numberStat.interpretation && (
          <Paper sx={{ p: 2, mb: 3, backgroundColor: 'background.default' }}>
            <Chip
              icon={getStatusIcon(numberStat.interpretation.status)}
              label={getStatusLabel(numberStat.interpretation.status)}
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                py: 2.5,
                bgcolor: numberStat.interpretation.status && numberStat.interpretation.status !== 'normal'
                  ? CATEGORY_COLORS[numberStat.interpretation.status].primary
                  : '#9ca3af',
                color: 'white',
                '& .MuiChip-icon': {
                  color: 'white',
                },
              }}
            />
          </Paper>
        )}

        {/* Basic Statistics */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {t('numberStats.basicStatistics')}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <Typography variant="caption" color="text.secondary">
                {t('general.count')}
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {numberStat.count}
              </Typography>
              {numberStat.totalDraws && (
                <Typography variant="caption" color="text.secondary">
                  {t('numberStats.outOfDraws', { totalDraws: numberStat.totalDraws })}
                </Typography>
              )}
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="caption" color="text.secondary">
                {t('general.probability')}
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {convertToPercentage(numberStat.frequency)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {t('numberStats.observedFrequency')}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Confidence Interval */}
        {numberStat.confidenceInterval && (
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {t('numberStats.wilsonConfidenceInterval')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              {t('numberStats.confidenceRange', {
                confidence: Math.round(numberStat.confidenceInterval.confidenceLevel * 100)
              })}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {t('numberStats.lowerBound')}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {convertToPercentage(numberStat.confidenceInterval.lower)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {t('numberStats.upperBound')}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {convertToPercentage(numberStat.confidenceInterval.upper)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        )}

        {/* Theoretical vs Actual */}
        {numberStat.theoreticalProbability !== undefined && (
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {t('numberStats.expectedVsObserved')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Typography variant="caption" color="text.secondary">
                  {t('numberStats.theoretical')}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {convertToPercentage(numberStat.theoreticalProbability)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {t('numberStats.expectedProbability')}
                </Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="caption" color="text.secondary">
                  {t('numberStats.observed')}
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  {convertToPercentage(numberStat.frequency)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {t('numberStats.actualFrequency')}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Deviation Analysis */}
        {numberStat.deviation && (
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {t('numberStats.deviationAnalysis')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Typography variant="body2" color="text.secondary">
                  {t('numberStats.absoluteDeviation')}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {convertToPercentage(numberStat.deviation.absolute)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Typography variant="body2" color="text.secondary">
                  {t('numberStats.relativeDeviation')}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {numberStat.deviation.relative.toFixed(2)}x
                </Typography>
              </Box>
              <Chip
                label={numberStat.deviation.isSignificant ? t('numberStats.statisticallySignificant') : t('numberStats.notSignificant')}
                color={numberStat.deviation.isSignificant ? 'warning' : 'default'}
                size="small"
              />
            </Box>
            <Typography variant="caption" color="text.secondary" display="block">
              {numberStat.deviation.isSignificant
                ? t('numberStats.significantDescription')
                : t('numberStats.notSignificantDescription')}
            </Typography>
          </Paper>
        )}

        {/* Interpretation */}
        {numberStat.interpretation && (
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {t('numberStats.analysisSummary')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }} dangerouslySetInnerHTML={{
              __html: t('numberStats.appearedTimes', {
                count: numberStat.interpretation.appearedCount,
                total: numberStat.interpretation.totalDraws
              })
            }} />
            {numberStat.interpretation.percentDifference !== 0 && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 1,
                  background: getStatusBgColor(numberStat.interpretation.status),
                }}
              >
                <Typography variant="body2" fontWeight="bold" dangerouslySetInnerHTML={{
                  __html: numberStat.interpretation.percentDifference > 0
                    ? t('numberStats.appearingMoreThanExpected', {
                        color: CATEGORY_COLORS.frequent.primary,
                        percent: numberStat.interpretation.percentDifference
                      })
                    : t('numberStats.appearingLessThanExpected', {
                        color: CATEGORY_COLORS.rare.primary,
                        percent: Math.abs(numberStat.interpretation.percentDifference)
                      })
                }} />
              </Box>
            )}
          </Paper>
        )}

        {/* Related Numbers */}
        {relatedNumbers.length > 0 && (
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {t('result.numbersWithSameProbability')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {relatedNumbers.map((stat, index) => (
                <LottoNumber key={index} digit={stat.digit} index={`related-drawer-${index}`} />
              ))}
            </Box>
          </Paper>
        )}

        {/* Future: Graphs Section Placeholder */}
        <Paper sx={{ p: 2, mb: 2, backgroundColor: 'background.default' }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="text.secondary">
            {t('numberStats.historicalTrends')}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {t('numberStats.historicalTrendsDescription')}
          </Typography>
        </Paper>
      </Box>
    </Drawer>
  );
};
