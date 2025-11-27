import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import groupBy from 'lodash/groupBy';
import type React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { NumberStat } from '../../types';
import { findRelatedNumbers } from '../../utils/numberGrouping';
import { LottoNumberDialog } from '../LottoNumberDialog';
import { LottoNumbersFilter } from './LottoNumbersFilter';
import { PositionGroup } from './PositionGroup';
import { type LottoNumbersDialogProps, SortingType } from './types';

const UnassignedPosition = 'unassigned';

export const LottoNumbersDialog = ({
  isOpen,
  onClose,
  numberStats,
  style,
}: LottoNumbersDialogProps): React.JSX.Element => {
  const [filteredStats, setFilteredStats] = useState<NumberStat[]>(numberStats);
  const [shouldExcludeZeroCounts, setShouldExcludeZeroCounts] = useState<boolean>(false);
  const [sortByValue, setSortByValue] = useState<SortingType>(SortingType.DigitAsc);
  const [selectedStat, setSelectedStat] = useState<NumberStat | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t } = useTranslation();

  const numberStatsByPositions = groupBy(filteredStats, (stat) => stat.position ?? UnassignedPosition);

  // Calculate max frequency for normalization
  const maxFrequency = useMemo(() => {
    return Math.max(...filteredStats.map((stat) => stat.frequency), 0.0001);
  }, [filteredStats]);

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

  // Sync filteredStats when numberStats prop changes
  useEffect(() => {
    setFilteredStats(handleSorting(shouldExcludeZeroCounts, sortByValue));
  }, [shouldExcludeZeroCounts, sortByValue, handleSorting]);

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

  // Calculate related numbers (numbers with same frequency as selected)
  const relatedNumbers = useMemo(() => {
    if (!selectedStat) return [];
    return findRelatedNumbers(selectedStat, filteredStats);
  }, [selectedStat, filteredStats]);

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
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 2,
          pt: 2.5,
          position: 'sticky',
          top: 0,
          zIndex: 10,
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Typography variant="h5" fontWeight={700} sx={{ color: 'primary.main' }}>
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

      <DialogContent dividers sx={{ bgcolor: 'grey.50' }}>
        {/* Numbers Grid */}
        {Object.entries(numberStatsByPositions).map(([position, stats], positionIndex) => (
          <PositionGroup
            key={`position-container-${positionIndex}`}
            position={position}
            stats={stats}
            positionIndex={positionIndex}
            maxFrequency={maxFrequency}
            onStatClick={(stat) => {
              setSelectedStat(stat);
              setDrawerOpen(true);
            }}
            style={style}
          />
        ))}
      </DialogContent>
      <LottoNumberDialog
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        numberStat={selectedStat}
        relatedNumbers={relatedNumbers}
        onNumberChange={(newStat) => setSelectedStat(newStat)}
      />
    </Dialog>
  );
};
