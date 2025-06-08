import { Divider, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../app/store';
import { calculateLottoProbability } from '../../../features/lottoProbability/lottoThunks';
import { DateFormat } from '../../types';
import { SearchLottoProbabilityButton } from '../SearchLottoProbabilityButton';
import { buildLottoSearchDto } from '../SearchLottoProbabilityButton/helpers/buildLottoSearchDto';
import { LottoSearchProps } from './types';

export const LottoSearch = ({ lottoType }: LottoSearchProps): React.JSX.Element => {
  const [dateFromValue, setDateFromValue] = useState<Dayjs | null>(dayjs().subtract(1, 'month'));
  const [dateToValue, setDateToValue] = useState<Dayjs | null>(dayjs());

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
    <Grid container size={{ xs: 12 }}>
      <Grid size={{ xs: 12 }}>
        <Divider textAlign="center">SEARCH</Divider>
      </Grid>
      <Grid container size={{ xs: 12 }} padding={1}>
        <Grid size={{ xs: 6, sm: 4 }} padding={1}>
          <DatePicker
            label="Date from"
            value={dateFromValue}
            format={DateFormat.European}
            maxDate={dateToValue ?? undefined}
            onChange={(newValue) => setDateFromValue(newValue)}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 4 }} padding={1}>
          <DatePicker
            label="Date to"
            value={dateToValue}
            format={DateFormat.European}
            minDate={dateFromValue ?? undefined}
            onChange={(newValue) => setDateToValue(newValue)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }} spacing={5}>
          <SearchLottoProbabilityButton onClick={handleSearch} />
        </Grid>
      </Grid>
    </Grid>
  );
};
