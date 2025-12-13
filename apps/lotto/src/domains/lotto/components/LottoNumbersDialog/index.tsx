import type React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import groupBy from 'lodash/groupBy';
import { useTranslation } from 'react-i18next';

import { Dialog, DialogBody, DialogContent, DialogHeader, DialogTitle } from '@lotto/ui';

import { findRelatedNumbers, LottoNumberDetailDialog } from '@/domains/lotto';

import type { NumberStat } from '../../types';
import { LottoNumbersFilter } from './LottoNumbersFilter';
import { NumberStatsGrid } from './NumberStatsGrid';
import { type LottoNumbersDialogProps, SortingType } from './types';

const UnassignedPosition = 'unassigned';

export const LottoNumbersDialog = ({
  isOpen,
  onClose,
  numberStats,
  isSecondaryNumbers = false,
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

  const handleSorting = useCallback(
    (showOnlyAppearing: boolean, sortingValue: SortingType): NumberStat[] => {
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
    },
    [numberStats]
  );

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
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleDialogClose()}>
      <DialogContent
        className="flex max-h-[90vh] min-h-[80vh] flex-col gap-0 sm:max-w-4xl"
        data-testid="lotto-numbers-dialog"
        aria-describedby={undefined}
      >
        <DialogHeader className="flex-row items-center justify-between">
          <DialogTitle>
            {t('statisticsDrawer.statistics')}
          </DialogTitle>
          <div className="px-10">
            <LottoNumbersFilter
              shouldExcludeZeroCounts={shouldExcludeZeroCounts}
              sortByValue={sortByValue}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortingChange}
              onClearFilters={handleClearFilters}
            />
          </div>

        </DialogHeader>

        <DialogBody>
          {Object.entries(numberStatsByPositions).map(([position, stats]) => (
            <NumberStatsGrid
              key={`position-container-${position}`}
              position={position}
              stats={stats}
              positionIndex={Number(position === UnassignedPosition ? -1 : position)}
              maxFrequency={maxFrequency}
              onStatClick={(stat) => {
                setSelectedStat(stat);
                setDrawerOpen(true);
              }}
            />
          ))}
        </DialogBody>
      </DialogContent>
      <LottoNumberDetailDialog
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        numberStat={selectedStat}
        relatedNumbers={relatedNumbers}
        onNumberChange={(newStat) => setSelectedStat(newStat)}
        isSecondaryNumbers={isSecondaryNumbers}
      />
    </Dialog>
  );
};
