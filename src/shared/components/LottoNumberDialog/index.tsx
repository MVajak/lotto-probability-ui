import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, DialogContent, Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchNumberHistory } from '../../../features/lottoProbability/lottoThunks';
import { isLoadingHistorySelector, numberHistorySelector, searchParamsSelector } from '../../../features/lottoProbability/selectors';
import { NumberStat } from '../../types';
import { LottoNumber } from '../LottoNumber';
import {
  AnalysisSummaryCard,
  ConfidenceIntervalCard,
  DeviationAnalysisCard,
  HistoricalTrendsCard,
  NumberStatsCard,
  RelatedNumbersCard,
} from './components';

interface LottoNumberDialogProps {
  open: boolean;
  onClose: () => void;
  numberStat: NumberStat | null;
  relatedNumbers?: NumberStat[];
  onNumberChange?: (numberStat: NumberStat) => void;
}

export const LottoNumberDialog: React.FC<LottoNumberDialogProps> = ({
  open,
  onClose,
  numberStat,
  relatedNumbers = [],
  onNumberChange,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const searchParams = useAppSelector(searchParamsSelector);
  const numberHistory = useAppSelector(numberHistorySelector);
  const isLoadingHistory = useAppSelector(isLoadingHistorySelector);

  // Fetch number history when dialog opens or number changes
  useEffect(() => {
    if (open && numberStat && searchParams) {
      dispatch(fetchNumberHistory({
        lottoType: searchParams.lottoType,
        number: numberStat.digit,
        dateFrom: searchParams.dateFrom,
        dateTo: searchParams.dateTo,
        position: numberStat.position ?? undefined,
      }));
    }
  }, [open, numberStat?.digit, searchParams, dispatch]);

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
            <RelatedNumbersCard
              relatedNumbers={relatedNumbers}
              onNumberClick={onNumberChange}
            />
          </Grid>

          {/* Historical Trends */}
          <Grid size={{ xs: 12 }}>
            <HistoricalTrendsCard
              numberHistory={numberHistory}
              isLoading={isLoadingHistory}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
