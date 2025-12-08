import type React from 'react';
import { useState } from 'react';
import { AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Badge, Button, cn, Popover, PopoverContent, PopoverTrigger } from '@lotto/ui';

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
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const hasActiveFilters = shouldExcludeZeroCounts || sortByValue !== SortingType.DigitAsc;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={hasActiveFilters ? 'primary' : 'outline'}
          size="sm"
          className="gap-1.5"
          data-testid="filter-chip"
        >
          <AdjustmentsHorizontalIcon className="size-4" />
          {hasActiveFilters ? t('statisticsDrawer.filtered') : t('statisticsDrawer.sortAndFilter')}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-[300px] p-4">
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h4 className="text-body-default-bold">{t('statisticsDrawer.sortAndFilter')}</h4>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-6 gap-1 px-2 text-body-small">
                <XMarkIcon className="size-3.5" />
                {t('statisticsDrawer.clear')}
              </Button>
            )}
          </div>

          {/* Filter Section */}
          <div>
            <p className="mb-2 text-body-small-bold text-muted-foreground">{t('statisticsDrawer.display')}</p>
            <Badge
              onClick={() => onFilterChange(!shouldExcludeZeroCounts)}
              className={cn(
                'cursor-pointer px-3 py-1.5 transition-colors',
                shouldExcludeZeroCounts
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'border border-border bg-transparent text-foreground hover:bg-muted'
              )}
            >
              {t('statisticsDrawer.showOnlyAppearingNumbers')}
            </Badge>
          </div>

          {/* Sort Section */}
          <div>
            <p className="mb-2 text-body-small-bold text-muted-foreground">{t('statisticsDrawer.sortBy')}</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { type: SortingType.DigitAsc, label: `${t('general.digit')} ↑` },
                { type: SortingType.DigitDesc, label: `${t('general.digit')} ↓` },
                { type: SortingType.FrequencyAsc, label: `${t('general.frequency')} ↑` },
                { type: SortingType.FrequencyDesc, label: `${t('general.frequency')} ↓` },
              ].map(({ type, label }) => (
                <Badge
                  key={type}
                  onClick={() => onSortChange(type)}
                  className={cn(
                    'cursor-pointer justify-center px-3 py-1.5 transition-colors',
                    sortByValue === type
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border border-border bg-transparent text-foreground hover:bg-muted'
                  )}
                >
                  {label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
