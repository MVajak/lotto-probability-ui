import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import groupBy from 'lodash/groupBy';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NumberStat } from '../../types';
import { convertToPercentage, safeBig } from '../../utils/calculations';
import { LottoNumber } from '../LottoNumber';
import { LottoDrawerProps, SortingType } from './types';

const UnassignedPosition = 'unassigned';

export const LottoDrawer = ({ isOpen, onClose, numberStats, style }: LottoDrawerProps): React.JSX.Element => {
  const [filteredStats, setFilteredStats] = useState<NumberStat[]>(numberStats);
  const [shouldExcludeZeroCounts, setShouldExcludeZeroCounts] = useState<boolean>(false);
  const [sortByValue, setSortByValue] = useState<SortingType>(SortingType.DigitAsc);
  const { t } = useTranslation();

  const numberStatsByPositions = groupBy(filteredStats, (stat) => stat.position ?? UnassignedPosition);
  const handleDrawerClose = useCallback((): void => {
    onClose();
  }, [onClose]);

  const handleSortingChange = (event: SelectChangeEvent) => {
    const sortingValue: SortingType = event.target.value as SortingType;
    setSortByValue(sortingValue);
    setFilteredStats(handleSorting(shouldExcludeZeroCounts, sortingValue));
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const isChecked = event.target.checked;
    setShouldExcludeZeroCounts(isChecked);
    setFilteredStats(handleSorting(isChecked, sortByValue));
  };

  function handleSorting(showOnlyAppearing: boolean, sortingValue: SortingType): NumberStat[] {
    const newFilteredStats = showOnlyAppearing ? numberStats.filter((stat) => stat.count !== 0) : numberStats;

    return [...newFilteredStats].sort((a, b) => {
      switch (sortingValue) {
        case SortingType.DigitAsc:
          return a.digit - b.digit;
        case SortingType.DigitDesc:
          return b.digit - a.digit;
        case SortingType.ProbabilityAsc:
          return a.frequency - b.frequency;
        case SortingType.ProbabilityDesc:
          return b.frequency - a.frequency;
        default:
          return 0;
      }
    });
  }

  return (
    <Drawer
      open={isOpen}
      onClose={handleDrawerClose}
      anchor={'right'}
      slotProps={{ paper: { sx: { width: { xs: '100%', sm: '340px' } } } }}
      data-testid="lotto-drawer"
    >
      <Grid container sx={{ p: 1 }}>
        <Grid container sx={{ p: 1, width: '100%' }}>
          <Grid size={{ xs: 10 }}>
            <Typography data-testid="number-statistics-title" variant={'h6'} sx={{ p: 0.25, fontWeight: 600 }}>
              {t('statisticsDrawer.statistics')}:
            </Typography>
          </Grid>
          <Grid size={{ xs: 2 }}>
            <IconButton onClick={handleDrawerClose} data-testid="drawer-close-button">
              <ArrowForwardIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container sx={{ px: 2 }}>
          <FormGroup>
            <FormControlLabel
              control={<Switch onChange={(e) => handleFilterChange(e)} value={shouldExcludeZeroCounts} />}
              label={t('statisticsDrawer.showOnlyAppearingNumbers')}
            />
          </FormGroup>
          <FormControl sx={{ my: 1, width: '100%' }} size="small">
            <InputLabel id="select-sort-by-label">{t('statisticsDrawer.sortBy')}</InputLabel>
            <Select
              labelId="select-sort-by-label"
              id="select-sort-by"
              value={sortByValue}
              label={t('statisticsDrawer.sortBy')}
              onChange={handleSortingChange}
            >
              <MenuItem value={SortingType.DigitAsc}>{t('general.digit')} ↑</MenuItem>
              <MenuItem value={SortingType.DigitDesc}>{t('general.digit')} ↓</MenuItem>
              <MenuItem value={SortingType.ProbabilityAsc}>{t('general.probability')} ↑</MenuItem>
              <MenuItem value={SortingType.ProbabilityDesc}>{t('general.probability')} ↓</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {Object.entries(numberStatsByPositions).map(([position, stats], positionIndex) => (
          <Grid key={`position-container-${positionIndex}`} size={{ xs: 12 }}>
            {position !== UnassignedPosition ? (
              <Typography data-testid={`position-${positionIndex}-title`} sx={{ p: 0.25, fontWeight: 600 }}>
                {t('statisticsDrawer.position')}: {safeBig(position).plus(1).toNumber()}
              </Typography>
            ) : null}
            {stats.map((stat, statIndex) => (
              <Grid
                container
                key={`statistics-container-${positionIndex}-${statIndex}`}
                size={{ xs: 12 }}
                sx={{
                  alignItems: 'center',
                  p: 1,
                }}
              >
                <LottoNumber index={`${positionIndex}-${statIndex}`} digit={stat.digit} style={style?.digitButton} />
                <Grid sx={{ paddingLeft: 2 }}>
                  <Grid container data-testid={`count-${positionIndex}-${statIndex}-statistics`}>
                    <Typography sx={{ p: 0.25, fontWeight: 600 }}>{t('general.count')}: </Typography>
                    <Typography sx={{ p: 0.25 }}>{stat.count}</Typography>
                  </Grid>
                  <Grid container data-testid={`probability-${positionIndex}-${statIndex}-statistics`}>
                    <Typography sx={{ p: 0.25, fontWeight: 600 }}>{t('general.probability')}: </Typography>
                    <Typography sx={{ p: 0.25 }}>{convertToPercentage(stat.frequency)}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Drawer>
  );
};
