import CloseIcon from '@mui/icons-material/Close';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { Box, Card, CardContent, Dialog, DialogContent, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { NumberStat } from '../../types';
import { LottoNumber } from '../LottoNumber';
import {
  AnalysisSummaryCard,
  ConfidenceIntervalCard,
  DeviationAnalysisCard,
  NumberStatsCard,
  RelatedNumbersCard,
} from './components';

interface LottoNumberDialogProps {
  open: boolean;
  onClose: () => void;
  numberStat: NumberStat | null;
  relatedNumbers?: NumberStat[];
}

export const LottoNumberDialog: React.FC<LottoNumberDialogProps> = ({
  open,
  onClose,
  numberStat,
  relatedNumbers = [],
}) => {
  const { t } = useTranslation();

  if (!numberStat) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            width: '100%',
            margin: 1,
            borderRadius: 2,
            minHeight: '80vh',
            maxHeight: '90vh',
          }
        }
      }}
    >
      {/* Compact Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <LottoNumber digit={numberStat.digit} index={`dialog-${numberStat.digit}`} />
          <Typography variant="h5" fontWeight="bold">
            {t('general.number')} {numberStat.digit}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 3, bgcolor: 'grey.50' }}>
        <Grid container spacing={3}>
          {/* Compact Stats with Status Badge */}
          <Grid size={{ xs: 12 }}>
            <NumberStatsCard numberStat={numberStat} />
          </Grid>

          {/* Confidence Interval */}
          {numberStat.confidenceInterval && (
            <Grid size={{ xs: 12, md: 6 }}>
              <ConfidenceIntervalCard numberStat={numberStat} />
            </Grid>
          )}

          {/* Deviation Analysis */}
          {numberStat.deviation && (
            <Grid size={{ xs: 12, md: 6 }}>
              <DeviationAnalysisCard numberStat={numberStat} />
            </Grid>
          )}

          {/* Interpretation Summary & Related Numbers - Side by Side */}
          {numberStat.interpretation && (
            <Grid size={{ xs: 12, md: relatedNumbers.length > 0 ? 6 : 12 }}>
              <AnalysisSummaryCard numberStat={numberStat} />
            </Grid>
          )}

          {/* Related Numbers */}
          <Grid size={{ xs: 12, md: numberStat.interpretation ? 6 : 12 }}>
            <RelatedNumbersCard relatedNumbers={relatedNumbers} />
          </Grid>

          {/* Graph Placeholder */}
          <Grid size={{ xs: 12 }}>
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
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
