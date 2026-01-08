import { useCallback, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { subMonths } from 'date-fns';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { Avatar, Button, Card, CardContent, DatePicker } from '@lotto/ui';

import type { LotteryConfig } from '@/domains/lotto';
import { useLottoStore } from '@/domains/lotto';
import { useSubscriptionTier } from '@/domains/subscription';

interface AnalysisHeaderProps {
  config: LotteryConfig;
}

export function AnalysisHeader({ config }: AnalysisHeaderProps) {
  const { t } = useTranslation();
  const { minAllowedDate } = useSubscriptionTier();
  const setSearchParams = useLottoStore((state) => state.setSearchParams);

  const [showDescription, setShowDescription] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date | undefined>(subMonths(new Date(), 1));
  const [dateTo, setDateTo] = useState<Date | undefined>(new Date());

  const handleSearch = useCallback(() => {
    setSearchParams({
      lottoType: config.lottoType,
      dateFrom: dateFrom?.toISOString() ?? subMonths(new Date(), 1).toISOString(),
      dateTo: dateTo?.toISOString() ?? new Date().toISOString(),
    });
  }, [dateFrom, dateTo, config.lottoType, setSearchParams]);

  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        {/* Header Row: Name + Frequency */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar src={config.logo} displayName={t(`lottery.${config.lottoType}`)} objectFit="contain" />
            <div>
              <h2 className="text-foreground text-title-small-bold">{t(`lottery.${config.lottoType}`)}</h2>
              <span className="text-body-small text-muted-foreground">
                {t(`lottery.frequency.${config.lottoType}`)}
              </span>
            </div>
          </div>

          {/* Expand/Collapse Description */}
          <Button variant="ghost" size="xs" onClick={() => setShowDescription(!showDescription)}>
            {showDescription ? t('common.hideDetails') : t('common.showDetails')}
            {showDescription ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
          </Button>
        </div>

        {/* Expandable Description */}
        <AnimatePresence>
          {showDescription && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.1 }}
              className="overflow-hidden"
            >
              <p className="text-body-default text-muted-foreground">{t(`info.${config.lottoType}`)}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Row */}
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex items-center gap-2">
            <DatePicker value={dateFrom} minDate={minAllowedDate} maxDate={dateTo} onChange={setDateFrom} />
            <span className="text-muted-foreground">→</span>
            <DatePicker value={dateTo} minDate={dateFrom} maxDate={new Date()} onChange={setDateTo} />
          </div>
          <Button variant="primary" onClick={handleSearch}>
            {t('search.calculate')}
          </Button>
        </div>

        {/* Links Row */}
        <div className="flex items-center gap-2">
          <Button variant="link" size="xs" asChild>
            <a href={config.links.gameRules} target="_blank" rel="noopener noreferrer">
              {t('info.gameRules')}
            </a>
          </Button>
          <span className="text-muted-foreground">•</span>
          <Button variant="link" size="xs" asChild>
            <a href={config.links.buyTickets} target="_blank" rel="noopener noreferrer">
              {t('info.buyTickets')}
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
