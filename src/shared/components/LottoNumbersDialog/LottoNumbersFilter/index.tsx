import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ClearIcon from '@mui/icons-material/Clear';
import SortIcon from '@mui/icons-material/Sort';
import { Box, Chip, Popover, Stack, Typography } from '@mui/material';

import { SortingType } from '../types';

interface LottoNumbersFilterProps {
  shouldExcludeZeroCounts: boolean;
  sortByValue: SortingType;
  onFilterChange: (excludeZeros: boolean) => void;
  onSortChange: (sortType: SortingType) => void;
  onClearFilters: () => void;
}

export const LottoNumbersFilter: React.FC<LottoNumbersFilterProps> = ({
  shouldExcludeZeroCounts,
  sortByValue,
  onFilterChange,
  onSortChange,
  onClearFilters,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();

  const open = Boolean(anchorEl);
  const hasActiveFilters = shouldExcludeZeroCounts || sortByValue !== SortingType.DigitAsc;

  return (
    <>
      {/* Compact Chip Trigger */}
      <Chip
        icon={<SortIcon />}
        label={hasActiveFilters ? t('statisticsDrawer.filtered') : t('statisticsDrawer.sortAndFilter')}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        color={hasActiveFilters ? 'primary' : 'default'}
        variant={hasActiveFilters ? 'filled' : 'outlined'}
        sx={{
          cursor: 'pointer',
          fontWeight: hasActiveFilters ? 600 : 400,
        }}
        data-testid="filter-chip"
      />

      {/* Modern Popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              p: 2,
              minWidth: 300,
              maxWidth: 350,
              borderRadius: 2,
              boxShadow: 3,
            },
          },
        }}
      >
        <Stack spacing={2.5}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {t('statisticsDrawer.sortAndFilter')}
            </Typography>
            {hasActiveFilters && (
              <Chip
                icon={<ClearIcon sx={{ fontSize: 16 }} />}
                label={t('statisticsDrawer.clear')}
                size="small"
                onClick={onClearFilters}
                sx={{ height: 24 }}
              />
            )}
          </Box>

          {/* Filter Section */}
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block', fontWeight: 500 }}>
              {t('statisticsDrawer.display')}
            </Typography>
            <Chip
              label={t('statisticsDrawer.showOnlyAppearingNumbers')}
              onClick={() => onFilterChange(!shouldExcludeZeroCounts)}
              color={shouldExcludeZeroCounts ? 'primary' : 'default'}
              variant={shouldExcludeZeroCounts ? 'filled' : 'outlined'}
              sx={{ cursor: 'pointer' }}
            />
          </Box>

          {/* Sort Section */}
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block', fontWeight: 500 }}>
              {t('statisticsDrawer.sortBy')}
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 1,
              }}
            >
              <Chip
                label={`${t('general.digit')} ↑`}
                onClick={() => onSortChange(SortingType.DigitAsc)}
                color={sortByValue === SortingType.DigitAsc ? 'primary' : 'default'}
                variant={sortByValue === SortingType.DigitAsc ? 'filled' : 'outlined'}
                sx={{ cursor: 'pointer', justifyContent: 'center' }}
              />
              <Chip
                label={`${t('general.digit')} ↓`}
                onClick={() => onSortChange(SortingType.DigitDesc)}
                color={sortByValue === SortingType.DigitDesc ? 'primary' : 'default'}
                variant={sortByValue === SortingType.DigitDesc ? 'filled' : 'outlined'}
                sx={{ cursor: 'pointer', justifyContent: 'center' }}
              />
              <Chip
                label={`${t('general.frequency')} ↑`}
                onClick={() => onSortChange(SortingType.FrequencyAsc)}
                color={sortByValue === SortingType.FrequencyAsc ? 'primary' : 'default'}
                variant={sortByValue === SortingType.FrequencyAsc ? 'filled' : 'outlined'}
                sx={{ cursor: 'pointer', justifyContent: 'center' }}
              />
              <Chip
                label={`${t('general.frequency')} ↓`}
                onClick={() => onSortChange(SortingType.FrequencyDesc)}
                color={sortByValue === SortingType.FrequencyDesc ? 'primary' : 'default'}
                variant={sortByValue === SortingType.FrequencyDesc ? 'filled' : 'outlined'}
                sx={{ cursor: 'pointer', justifyContent: 'center' }}
              />
            </Box>
          </Box>
        </Stack>
      </Popover>
    </>
  );
};
