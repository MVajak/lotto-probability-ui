import type React from 'react';
import { Suspense } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { Dialog, DialogContent, DialogTitle, IconButton, LottoNumber } from '@lotto/ui';

import { numberHistoryQueryOptions, useLottoStore } from '@/domains/lotto';
import { LoadingLayout } from '@/layouts/LoadingLayout';

import type { NumberStat } from '../../types';
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
  isSecondaryNumbers?: boolean;
}

interface LottoNumberDetailContentProps {
  numberStat: NumberStat;
  relatedNumbers: NumberStat[];
  onNumberChange?: (numberStat: NumberStat) => void;
  isSecondaryNumbers?: boolean;
}

/**
 * Content component that fetches and renders all the detail cards.
 * Uses useSuspenseQuery to suspend while data is loading.
 */
const LottoNumberDetailContent: React.FC<LottoNumberDetailContentProps> = ({
  numberStat,
  relatedNumbers,
  onNumberChange,
  isSecondaryNumbers,
}) => {
  const searchParams = useLottoStore((state) => state.searchParams);

  // Guard: lottoType must be set to fetch number history
  if (!searchParams.lottoType) {
    throw new Error('Cannot fetch number history: lottoType is not set');
  }

  const { data: numberHistory } = useSuspenseQuery(
    numberHistoryQueryOptions({
      lottoType: searchParams.lottoType,
      number: numberStat.digit,
      dateFrom: searchParams.dateFrom,
      dateTo: searchParams.dateTo,
      position: numberStat.position ?? undefined,
      useSecondaryNumbers: isSecondaryNumbers,
    })
  );

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

export const LottoNumberDetailDialog: React.FC<LottoNumberDetailDialogProps> = ({
  open,
  onClose,
  numberStat,
  relatedNumbers = [],
  onNumberChange,
  isSecondaryNumbers = false,
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
          <Suspense fallback={<LoadingLayout />}>
            <LottoNumberDetailContent
              numberStat={numberStat}
              relatedNumbers={relatedNumbers}
              onNumberChange={onNumberChange}
              isSecondaryNumbers={isSecondaryNumbers}
            />
          </Suspense>
        </div>
      </DialogContent>
    </Dialog>
  );
};
