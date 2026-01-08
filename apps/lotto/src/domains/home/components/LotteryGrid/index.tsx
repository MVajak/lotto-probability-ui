import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { useLocalStorage } from '@lotto/ui';

import { LottoType } from '@/domains/lotto';
import { REGION_LOTTERY_TYPES, Region, RegionStorageKey } from '@/domains/region';

import { LotteryCard } from '../LotteryCard';

interface LotteryGridProps {
  selectedLottery: LottoType | null;
  onSelectLottery: (lottoType: LottoType) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function LotteryGrid({ selectedLottery, onSelectLottery }: LotteryGridProps) {
  const { t } = useTranslation();
  const [region] = useLocalStorage<Region>(RegionStorageKey.REGION, Region.EE);

  const lotteries = REGION_LOTTERY_TYPES[region] || [];

  return (
    <div className="flex flex-col gap-4">
      {/* Section Title */}
      <h2 className="text-body-default-bold text-foreground">{t('home.selectLottery')}</h2>

      {/* Lottery Cards Grid */}
      <motion.div
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-8 md:grid-cols-4 lg:grid-cols-5"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        key={region} // Re-animate when region changes
      >
        {lotteries.map((lottoType) => (
          <motion.div key={lottoType} variants={itemVariants}>
            <LotteryCard
              lottoType={lottoType}
              isSelected={selectedLottery === lottoType}
              onClick={() => onSelectLottery(lottoType)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
