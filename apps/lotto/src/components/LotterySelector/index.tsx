import type React from 'react';
import { useTranslation } from 'react-i18next';

import type { LottoType } from '@/domains/lotto';

import { LotteryTypeSelector } from './LotteryTypeSelector';

interface LotterySelectorProps {
  selectedLottery: LottoType;
  onLotteryChange: (lottery: LottoType) => void;
}

export const LotterySelector: React.FC<LotterySelectorProps> = ({ selectedLottery, onLotteryChange }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-6 p-6 md:flex-row">
      <div className="flex-1">
        <h3 className="mb-2 text-title-small-bold">{t('home.selectLottery')}</h3>
        <p className="text-body-default">{t('home.selectLotteryDescription')}</p>
      </div>
      <div className="w-[90%] md:w-[300px]">
        <LotteryTypeSelector selectedLottery={selectedLottery} onLotteryChange={onLotteryChange} />
      </div>
    </div>
  );
};
