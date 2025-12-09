import type React from 'react';
import { Suspense } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { Dialog, DialogContent, DialogTitle, IconButton, LottoNumber, Spinner } from '@lotto/ui';

import { numberHistoryQueryOptions, useLottoStore } from '@/domains/lotto';

import type { NumberHistoryDto, NumberStat } from '../../types';
import {
  AnalysisSummaryCard,
  ConfidenceIntervalCard,
  DeviationAnalysisCard,
  HistoricalTrendsCard,
  NumberStatsCard,
  RelatedNumbersCard,
} from './components';

interface LottoNumberDetailDialogProps {
  open: boolean;
  onClose: () => void;
  numberStat: NumberStat | null;
  relatedNumbers?: NumberStat[];
  onNumberChange?: (numberStat: NumberStat) => void;
}

interface LottoNumberDetailContentProps {
  numberStat: NumberStat;
  numberHistory: NumberHistoryDto;
  relatedNumbers: NumberStat[];
  onNumberChange?: (numberStat: NumberStat) => void;
}

/**
 * Content component that renders all the detail cards.
 * Separated to allow Suspense boundary around data fetching.
 */
const LottoNumberDetailContent: React.FC<LottoNumberDetailContentProps> = ({
  numberStat,
  numberHistory,
  relatedNumbers,
  onNumberChange,
}) => {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Compact Stats with Status Badge */}
      <div className="col-span-12">
        <NumberStatsCard numberStat={numberStat} numberHistory={numberHistory} />
      </div>

      {/* Confidence Interval */}
      {numberHistory.summary.confidenceInterval && (
        <div className="col-span-12 md:col-span-6">
          <ConfidenceIntervalCard confidenceInterval={numberHistory.summary.confidenceInterval} />
        </div>
      )}

      {/* Deviation Analysis */}
      {numberHistory.summary.deviation && (
        <div className="col-span-12 md:col-span-6">
          <DeviationAnalysisCard deviation={numberHistory.summary.deviation} />
        </div>
      )}

      {/* Interpretation Summary & Related Numbers - Side by Side */}
      {numberStat.interpretation && (
        <div className={relatedNumbers.length > 0 ? 'col-span-12 md:col-span-6' : 'col-span-12'}>
          <AnalysisSummaryCard numberStat={numberStat} />
        </div>
      )}

      {/* Related Numbers */}
      <div className={numberStat.interpretation ? 'col-span-12 md:col-span-6' : 'col-span-12'}>
        <RelatedNumbersCard relatedNumbers={relatedNumbers} onNumberClick={onNumberChange} />
      </div>

      {/* Historical Trends */}
      <div className="col-span-12">
        <HistoricalTrendsCard numberHistory={numberHistory} />
      </div>
    </div>
  );
};

/**
 * Wrapper component that fetches data using useSuspenseQuery.
 * This suspends while data is loading, triggering the Suspense fallback.
 */
const LottoNumberDetailFetcher: React.FC<{
  numberStat: NumberStat;
  relatedNumbers: NumberStat[];
  onNumberChange?: (numberStat: NumberStat) => void;
}> = ({ numberStat, relatedNumbers, onNumberChange }) => {
  const searchParams = useLottoStore((state) => state.searchParams);

  const { data: numberHistory } = useSuspenseQuery(
    numberHistoryQueryOptions({
      lottoType: searchParams.lottoType!,
      number: numberStat.digit,
      dateFrom: searchParams.dateFrom,
      dateTo: searchParams.dateTo,
      position: numberStat.position ?? undefined,
    })
  );

  return (
    <LottoNumberDetailContent
      numberStat={numberStat}
      numberHistory={numberHistory}
      relatedNumbers={relatedNumbers}
      onNumberChange={onNumberChange}
    />
  );
};

/**
 * Loading fallback shown while data is being fetched.
 */
const LoadingFallback: React.FC = () => (
  <div className="flex flex-1 items-center justify-center py-20">
    <Spinner className="size-8" />
  </div>
);

export const LottoNumberDetailDialog: React.FC<LottoNumberDetailDialogProps> = ({
  open,
  onClose,
  numberStat,
  relatedNumbers = [],
  onNumberChange,
}) => {
  const { t } = useTranslation();

  if (!numberStat) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[90vh] min-h-[80vh] flex-col gap-0 overflow-hidden rounded-lg p-0 sm:max-w-6xl"
        aria-describedby={undefined}
      >
        {/* Header - Always visible */}
        <div className="flex items-center justify-between border-b bg-background p-4">
          <div className="flex items-center gap-3">
            <LottoNumber digit={numberStat.digit} index={`dialog-${numberStat.digit}`} />
            <DialogTitle className="text-foreground text-title-default-bold">
              {t('general.number')} {numberStat.digit}
            </DialogTitle>
          </div>
          <IconButton variant="ghost" size="sm" label="Close dialog" onClick={onClose}>
            <XMarkIcon className="size-5" />
          </IconButton>
        </div>

        {/* Content - Wrapped in Suspense */}
        <div className="flex-1 overflow-y-auto bg-muted/30 p-6">
          <Suspense fallback={<LoadingFallback />}>
            <LottoNumberDetailFetcher
              numberStat={numberStat}
              relatedNumbers={relatedNumbers}
              onNumberChange={onNumberChange}
            />
          </Suspense>
        </div>
      </DialogContent>
    </Dialog>
  );
};
