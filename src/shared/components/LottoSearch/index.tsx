import { Divider, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { type Dayjs } from 'dayjs';
import type React from 'react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '../../../app/store';
import { calculateLottoProbability } from '../../../features/lottoProbability/lottoThunks';
import { DateFormat } from '../../types';
import { CardWrapper } from '../CardWrapper';
import { SearchLottoProbabilityButton } from '../SearchLottoProbabilityButton';
import { buildLottoSearchDto } from '../SearchLottoProbabilityButton/helpers/buildLottoSearchDto';
import type { LottoSearchProps } from './types';

export const LottoSearch = ({ lottoType }: LottoSearchProps): React.JSX.Element => {
  const [dateFromValue, setDateFromValue] = useState<Dayjs | null>(dayjs().subtract(1, 'month'));
  const [dateToValue, setDateToValue] = useState<Dayjs | null>(dayjs());
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = useCallback(() => {
    const searchDto = buildLottoSearchDto({
      lottoType: lottoType,
      dateTo: dateToValue?.toISOString(),
      dateFrom: dateFromValue?.toISOString(),
    });
    dispatch(calculateLottoProbability(searchDto));
  }, [dateFromValue, dateToValue, dispatch, lottoType]);

  return (
    <CardWrapper>
      <Grid container size={{ xs: 12 }}>
        <Grid size={{ xs: 12 }}>
          <Divider textAlign="center">{t('search.search')}</Divider>
        </Grid>
        <Grid container size={{ xs: 12 }}>
          <Grid size={{ xs: 6, sm: 4 }} padding={1} display="flex" alignItems="center">
            <DatePicker
              label={t('search.dateFrom')}
              value={dateFromValue}
              format={DateFormat.European}
              maxDate={dateToValue ?? undefined}
              onChange={(newValue) => setDateFromValue(newValue)}
              slotProps={{
                day: {
                  sx: {
                    borderRadius: '50%',
                    transition: 'all 0.2s ease-in-out',
                    '&.Mui-selected': {
                      fontWeight: 600,
                    },
                  },
                },
                textField: {
                  fullWidth: true,
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }} padding={1} display="flex" alignItems="center">
            <DatePicker
              label={t('search.dateTo')}
              value={dateToValue}
              format={DateFormat.European}
              minDate={dateFromValue ?? undefined}
              onChange={(newValue) => setDateToValue(newValue)}
              slotProps={{
                day: {
                  sx: {
                    borderRadius: '50%',
                    transition: 'all 0.2s ease-in-out',
                    '&.Mui-selected': {
                      fontWeight: 600,
                    },
                  },
                },
                textField: {
                  fullWidth: true,
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }} padding={1}>
            <SearchLottoProbabilityButton onClick={handleSearch} />
          </Grid>
        </Grid>
      </Grid>
    </CardWrapper>
  );
};
