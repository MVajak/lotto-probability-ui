import type React from 'react';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Badge, LottoNumber, Tooltip, TooltipContent, TooltipTrigger } from '@lotto/ui';

import { findRelatedNumbers, LottoNumberDetailDialog, type NumberStat } from '@/domains/lotto';

import type { LottoNumberGroupProps } from './types';

export const LottoNumberGroup = ({ numbers, index, maxVisible }: LottoNumberGroupProps): React.JSX.Element | null => {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedNumberIndex, setSelectedNumberIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  if (numbers.length === 0) {
    return null;
  }

  // Handle clicking a related number in the dialog
  const handleNumberChange = (newStat: NumberStat) => {
    const newIndex = numbers.findIndex((n) => n.digit === newStat.digit);
    if (newIndex !== -1) {
      setSelectedNumberIndex(newIndex);
    }
  };

  // Determine how many numbers to show
  const shouldShowExpandButton = maxVisible && numbers.length > maxVisible;
  const initialNumbers = shouldShowExpandButton ? numbers.slice(0, maxVisible) : numbers;
  const hiddenNumbers = shouldShowExpandButton ? numbers.slice(maxVisible) : [];
  const hiddenCount = hiddenNumbers.length;

  // If only one number, display it normally
  if (numbers.length === 1) {
    return (
      <>
        <LottoNumber
          digit={numbers[0].digit}
          index={`single-${index}`}
          onClick={() => {
            setSelectedNumberIndex(0);
            setDrawerOpen(true);
          }}
        />
        <LottoNumberDetailDialog
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          numberStat={numbers[selectedNumberIndex]}
          relatedNumbers={[]}
          onNumberChange={handleNumberChange}
        />
      </>
    );
  }

  // Multiple numbers with same frequency - show compact group
  return (
    <>
      <div className="m-1 inline-flex flex-col items-center gap-1 align-top">
        {/* Grouped numbers in a compact horizontal layout */}
        <div className="flex flex-wrap items-center gap-1 rounded-3xl border-2 border-primary/30 border-dashed bg-primary/10 p-[3px]">
          {/* Always visible numbers */}
          {initialNumbers.map((num) => (
            <LottoNumber
              key={num.digit}
              digit={num.digit}
              index={`group-${index}-${num.digit}`}
              onClick={() => {
                setSelectedNumberIndex(numbers.findIndex((n) => n.digit === num.digit));
                setDrawerOpen(true);
              }}
              className="m-0"
            />
          ))}

          {/* Collapsible hidden numbers */}
          {shouldShowExpandButton &&
            hiddenNumbers.length > 0 &&
            isExpanded &&
            hiddenNumbers.map((num) => (
              <LottoNumber
                key={num.digit}
                digit={num.digit}
                index={`group-${index}-${num.digit}`}
                onClick={() => {
                  setSelectedNumberIndex(numbers.findIndex((n) => n.digit === num.digit));
                  setDrawerOpen(true);
                }}
                className="m-0 animate-fade-in"
              />
            ))}

          {/* Show expand/collapse button if there are hidden numbers */}
          {shouldShowExpandButton && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex size-8 items-center justify-center rounded-full bg-primary/15 transition-transform duration-300 ease-in-out hover:bg-primary/25"
                  style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <ChevronDownIcon className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {isExpanded ? t('general.showLess') : t('general.showMoreTiedNumbers', { count: hiddenCount })}
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Small label indicating they're tied */}
        <Badge variant="info" className="h-[18px] bg-primary/10 px-1.5 text-body-small-bold text-foreground">
          {t('general.tied')} ({numbers.length})
        </Badge>
      </div>
      <LottoNumberDetailDialog
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        numberStat={numbers[selectedNumberIndex]}
        relatedNumbers={findRelatedNumbers(numbers[selectedNumberIndex], numbers)}
        onNumberChange={handleNumberChange}
      />
    </>
  );
};
