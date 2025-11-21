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

import { NumberStat } from '../../types';
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

  const getStatusColor = (status?: 'hot' | 'normal' | 'cold') => {
    switch (status) {
      case 'hot':
        return 'error';
      case 'cold':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status?: 'hot' | 'normal' | 'cold') => {
    switch (status) {
      case 'hot':
        return <TrendingUpIcon fontSize="small" />;
      case 'cold':
        return <TrendingDownIcon fontSize="small" />;
      default:
        return <TrendingFlatIcon fontSize="small" />;
    }
  };

  const getStatusLabel = (status?: 'hot' | 'normal' | 'cold') => {
    switch (status) {
      case 'hot':
        return 'Hot Number (Appearing More)';
      case 'cold':
        return 'Cold Number (Appearing Less)';
      default:
        return 'Normal Distribution';
    }
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
              Number {numberStat.digit}
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
              color={getStatusColor(numberStat.interpretation.status)}
              sx={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.9rem', fontWeight: 'bold', py: 2.5 }}
            />
          </Paper>
        )}

        {/* Basic Statistics */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Basic Statistics
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
                  out of {numberStat.totalDraws} draws
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
                observed frequency
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Confidence Interval */}
        {numberStat.confidenceInterval && (
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Wilson Confidence Interval
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              {Math.round(numberStat.confidenceInterval.confidenceLevel * 100)}% confidence that true probability is between:
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Lower Bound
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {convertToPercentage(numberStat.confidenceInterval.lower)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Upper Bound
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
              Expected vs Observed
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Typography variant="caption" color="text.secondary">
                  Theoretical
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {convertToPercentage(numberStat.theoreticalProbability)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  expected probability
                </Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="caption" color="text.secondary">
                  Observed
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  {convertToPercentage(numberStat.frequency)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  actual frequency
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Deviation Analysis */}
        {numberStat.deviation && (
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Deviation Analysis
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Absolute Deviation
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {convertToPercentage(numberStat.deviation.absolute)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Relative Deviation
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {numberStat.deviation.relative.toFixed(2)}x
                </Typography>
              </Box>
              <Chip
                label={numberStat.deviation.isSignificant ? 'Statistically Significant' : 'Not Significant'}
                color={numberStat.deviation.isSignificant ? 'warning' : 'default'}
                size="small"
              />
            </Box>
            <Typography variant="caption" color="text.secondary" display="block">
              {numberStat.deviation.isSignificant
                ? 'This deviation is unlikely to occur by random chance alone.'
                : 'This deviation is within the expected range of random variation.'}
            </Typography>
          </Paper>
        )}

        {/* Interpretation */}
        {numberStat.interpretation && (
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Analysis Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              This number appeared <strong>{numberStat.interpretation.appearedCount}</strong> times in{' '}
              <strong>{numberStat.interpretation.totalDraws}</strong> draws.
            </Typography>
            {numberStat.interpretation.percentDifference !== 0 && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 1,
                  backgroundColor:
                    numberStat.interpretation.status === 'hot'
                      ? 'error.light'
                      : numberStat.interpretation.status === 'cold'
                        ? 'info.light'
                        : 'grey.100',
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  {numberStat.interpretation.percentDifference > 0 ? (
                    <>
                      Appearing <span style={{ color: 'red', fontSize: '1.2em' }}>{numberStat.interpretation.percentDifference}%</span> more than expected
                    </>
                  ) : (
                    <>
                      Appearing <span style={{ color: 'blue', fontSize: '1.2em' }}>{Math.abs(numberStat.interpretation.percentDifference)}%</span> less than expected
                    </>
                  )}
                </Typography>
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
            📊 Historical Trends (Coming Soon)
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Frequency over time, distribution charts, and pattern analysis will appear here.
          </Typography>
        </Paper>
      </Box>
    </Drawer>
  );
};
