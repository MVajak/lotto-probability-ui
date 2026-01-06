import type React from 'react';
import { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { AdSpace, Dialog, DialogBody, DialogContent, DialogHeader, DialogTitle, LottoNumber } from '@lotto/ui';

import { adConfig } from '@/domains/ads/config';
import { numberDetailQueryOptions, useLottoStore } from '@/domains/lotto';
import { UpgradePromptCard, useSubscriptionTier } from '@/domains/subscription';
import { LoadingLayout } from '@/layouts/LoadingLayout';

import type { NumberStat } from '../../types';
import {
  AnalysisSummaryCard,
  ConfidenceIntervalCard,
  DeviationAnalysisCard,
  LastSeenCard,
  NumberInsightsCard,
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
  const { isPro } = useSubscriptionTier();

  // Guard: lottoType must be set to fetch number detail
  if (!searchParams.lottoType) {
    throw new Error('Cannot fetch number detail: lottoType is not set');
  }

  const { data: numberDetail } = useSuspenseQuery(
    numberDetailQueryOptions({
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
        <NumberStatsCard numberStat={numberStat} numberDetail={numberDetail} />
      </div>

      {/* Last Seen Info */}
      <div className="col-span-12">
        <LastSeenCard summary={numberDetail.summary} />
      </div>

      {/* Confidence Interval: PRO feature */}
      {numberDetail.confidenceInterval && (
        <div className="col-span-12 md:col-span-6">
          <ConfidenceIntervalCard confidenceInterval={numberDetail.confidenceInterval} />
        </div>
      )}

      {/* Deviation Analysis: PRO feature */}
      {numberDetail.deviation && (
        <div className="col-span-12 md:col-span-6">
          <DeviationAnalysisCard deviation={numberDetail.deviation} />
        </div>
      )}

      {/* Interpretation Summary & Related Numbers - Side by Side */}
      {numberStat.interpretation && (
        <div className={relatedNumbers.length > 0 ? 'col-span-12 md:col-span-6' : 'col-span-12'}>
          <AnalysisSummaryCard numberStat={numberStat} />
        </div>
      )}

      {/* Related Numbers */}
      {Boolean(relatedNumbers.length) && (
        <div className={numberStat.interpretation ? 'col-span-12 md:col-span-6' : 'col-span-12'}>
          <RelatedNumbersCard relatedNumbers={relatedNumbers} onNumberClick={onNumberChange} />
        </div>
      )}

      {/* Number Insights - PRO and PREMIUM only */}
      {isPro ? (
        <div className="col-span-12">
          <NumberInsightsCard numberDetail={numberDetail} />
        </div>
      ) : (
        <>
          <div className="col-span-12">
            <UpgradePromptCard requiredTier="PRO" />
          </div>
          {/* Ad for FREE users in dialog */}
          <div className="col-span-12">
            <AdSpace position="dialog" {...adConfig.getAdProps('dialog')} />
          </div>
        </>
      )}
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
        className="flex max-h-[90vh] min-h-[80vh] flex-col gap-0 overflow-hidden sm:max-w-6xl"
        aria-describedby={undefined}
      >
        <DialogHeader className="flex-row items-center gap-3">
          <LottoNumber digit={numberStat.digit} index={`dialog-${numberStat.digit}`} />
          <DialogTitle>
            {t('general.number')} {numberStat.digit}
          </DialogTitle>
        </DialogHeader>

        {/* Content - Wrapped in Suspense */}
        <DialogBody>
          <Suspense fallback={<LoadingLayout />}>
            <LottoNumberDetailContent
              numberStat={numberStat}
              relatedNumbers={relatedNumbers}
              onNumberChange={onNumberChange}
              isSecondaryNumbers={isSecondaryNumbers}
            />
          </Suspense>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
