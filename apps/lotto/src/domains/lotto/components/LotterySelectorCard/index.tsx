import { useTranslation } from 'react-i18next';

import { Card, CardContent } from '@lotto/ui';

import { LotteryTypeSelector } from './LotteryTypeSelector';

/**
 * Card component for selecting a lottery type.
 * Includes title, description, and dropdown selector.
 * Uses the lotto store directly - no props needed.
 */
export const LotterySelectorCard = () => {
  const { t } = useTranslation();

  return (
    <Card className="shadow-md">
      <CardContent>
        <div className="flex flex-col items-center gap-6 py-2 md:flex-row">
          <div className="flex-1">
            <h3 className="mb-2 text-title-small-bold">{t('home.selectLottery')}</h3>
            <p className="text-body-default">{t('home.selectLotteryDescription')}</p>
          </div>
          <div className="w-[90%] md:w-[300px]">
            <LotteryTypeSelector />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
