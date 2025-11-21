import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import groupBy from 'lodash/groupBy';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NumberStat } from '../../types';
import { convertToPercentage, safeBig } from '../../utils/calculations';
import { LottoNumber } from '../LottoNumber';
import { LottoNumberDrawer } from '../LottoNumberDrawer';
import { LottoNumbersFilter } from './LottoNumbersFilter';
import { LottoNumbersDialogProps, SortingType } from './types';

const UnassignedPosition = 'unassigned';

export const LottoNumbersDialog = ({ isOpen, onClose, numberStats, style }: LottoNumbersDialogProps): React.JSX.Element => {
  const [filteredStats, setFilteredStats] = useState<NumberStat[]>(numberStats);
  const [shouldExcludeZeroCounts, setShouldExcludeZeroCounts] = useState<boolean>(false);
  const [sortByValue, setSortByValue] = useState<SortingType>(SortingType.DigitAsc);
  const [selectedStat, setSelectedStat] = useState<NumberStat | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t } = useTranslation();

  const numberStatsByPositions = groupBy(filteredStats, (stat) => stat.position ?? UnassignedPosition);

  const handleDialogClose = useCallback((): void => {
    onClose();
  }, [onClose]);

  const handleSortingChange = (sortingValue: SortingType) => {
    setSortByValue(sortingValue);
    setFilteredStats(handleSorting(shouldExcludeZeroCounts, sortingValue));
  };

  const handleFilterChange = (excludeZeros: boolean): void => {
    setShouldExcludeZeroCounts(excludeZeros);
    setFilteredStats(handleSorting(excludeZeros, sortByValue));
  };

  const handleClearFilters = () => {
    setShouldExcludeZeroCounts(false);
    setSortByValue(SortingType.DigitAsc);
    setFilteredStats(handleSorting(false, SortingType.DigitAsc));
  };

  function handleSorting(showOnlyAppearing: boolean, sortingValue: SortingType): NumberStat[] {
    const newFilteredStats = showOnlyAppearing ? numberStats.filter((stat) => stat.count !== 0) : numberStats;

    return [...newFilteredStats].sort((a, b) => {
      switch (sortingValue) {
        case SortingType.DigitAsc:
          return a.digit - b.digit;
        case SortingType.DigitDesc:
          return b.digit - a.digit;
        case SortingType.FrequencyAsc:
          return a.frequency - b.frequency;
        case SortingType.FrequencyDesc:
          return b.frequency - a.frequency;
        default:
          return 0;
      }
    });
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleDialogClose}
      maxWidth="md"
      fullWidth
      data-testid="lotto-numbers-dialog"
      slotProps={{
        paper: {
          sx: {
            minHeight: '80vh',
            maxHeight: '90vh',
          },
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Typography variant="h6" fontWeight={600}>
          {t('statisticsDrawer.statistics')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <LottoNumbersFilter
            shouldExcludeZeroCounts={shouldExcludeZeroCounts}
            sortByValue={sortByValue}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortingChange}
            onClearFilters={handleClearFilters}
          />
          <IconButton onClick={handleDialogClose} data-testid="dialog-close-button" size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>

        {/* Numbers Grid */}
        {Object.entries(numberStatsByPositions).map(([position, stats], positionIndex) => (
          <Box key={`position-container-${positionIndex}`} sx={{ mb: 3 }}>
            {position !== UnassignedPosition ? (
              <Typography data-testid={`position-${positionIndex}-title`} sx={{ px: 1, mb: 1, fontWeight: 600 }}>
                {t('statisticsDrawer.position')}: {safeBig(position).plus(1).toNumber()}
              </Typography>
            ) : null}
            <Grid container spacing={1} sx={{ px: 1 }}>
              {stats.map((stat, statIndex) => (
                <Grid
                  key={`statistics-container-${positionIndex}-${statIndex}`}
                  size={{ xs: 6, sm: 4, md: 3 }}
                >
                  <Box
                    onClick={() => {
                      setSelectedStat(stat);
                      setDrawerOpen(true);
                    }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      p: 1,
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      backgroundColor: 'background.paper',
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: 'action.hover' },
                    }}
                  >
                    <LottoNumber
                      digit={stat.digit}
                      index={`dialog-${positionIndex}-${statIndex}`}
                      style={style?.digitButton}
                    />
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography variant="caption" color="text.secondary" display="block" noWrap>
                        {t('general.count')}: {stat.count}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block" noWrap>
                        {t('general.probability')}: {convertToPercentage(stat.frequency)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </DialogContent>
      <LottoNumberDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        numberStat={selectedStat}
        relatedNumbers={[]}
      />
    </Dialog>
  );
};
