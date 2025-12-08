import type React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { Dialog, DialogContent, IconButton, LottoNumber } from '@lotto/ui';

import { numberHistoryQueryOptions, useLottoStore } from '@/domains/lotto';

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
}

export const LottoNumberDetailDialog: React.FC<LottoNumberDetailDialogProps> = ({
  open,
  onClose,
  numberStat,
  relatedNumbers = [],
  onNumberChange,
}) => {
  const { t } = useTranslation();
  const searchParams = useLottoStore((state) => state.searchParams);

  const { data: numberHistory, isLoading: isLoadingHistory } = useQuery({
    ...numberHistoryQueryOptions({
      lottoType: searchParams.lottoType!,
      number: numberStat?.digit ?? 0,
      dateFrom: searchParams.dateFrom,
      dateTo: searchParams.dateTo,
      position: numberStat?.position ?? undefined,
    }),
    enabled: open && !!numberStat && !!searchParams.lottoType,
  });

  if (!numberStat) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[90vh] min-h-[80vh] flex-col gap-0 overflow-hidden rounded-lg p-0 sm:max-w-6xl"
      >
        {/* Compact Header */}
        <div className="flex items-center justify-between border-b bg-background p-4">
          <div className="flex items-center gap-3">
            <LottoNumber digit={numberStat.digit} index={`dialog-${numberStat.digit}`} />
            <h2 className="text-foreground text-title-default-bold">
              {t('general.number')} {numberStat.digit}
            </h2>
          </div>
          <IconButton variant="ghost" size="sm" label="Close dialog" onClick={onClose}>
            <XMarkIcon className="size-5" />
          </IconButton>
        </div>

        <div className="flex-1 overflow-y-auto bg-muted/30 p-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Compact Stats with Status Badge */}
            <div className="col-span-12">
              <NumberStatsCard numberStat={numberStat} />
            </div>

            {/* Confidence Interval */}
            {numberStat.confidenceInterval && (
              <div className="col-span-12 md:col-span-6">
                <ConfidenceIntervalCard numberStat={numberStat} />
              </div>
            )}

            {/* Deviation Analysis */}
            {numberStat.deviation && (
              <div className="col-span-12 md:col-span-6">
                <DeviationAnalysisCard numberStat={numberStat} />
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
              <HistoricalTrendsCard numberHistory={numberHistory ?? null} isLoading={isLoadingHistory} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
