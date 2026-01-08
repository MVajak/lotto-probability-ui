import { useTranslation } from 'react-i18next';

import { Avatar, cn, InteractiveCard } from '@lotto/ui';

import { getLotteryConfig, type LottoType } from '@/domains/lotto';

interface LotteryCardProps {
  lottoType: LottoType;
  isSelected: boolean;
  onClick: () => void;
}

export function LotteryCard({ lottoType, isSelected, onClick }: LotteryCardProps) {
  const { t } = useTranslation();
  const config = getLotteryConfig(lottoType);

  return (
    <InteractiveCard
      onClick={onClick}
      className={cn(
        'relative items-center text-center',
        isSelected && 'border-primary bg-primary/1 ring-2 ring-primary/20'
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Lottery Logo */}
      <Avatar
        src={config.logo}
        displayName={t(`lottery.${lottoType}`)}
        objectFit="contain"
        className={cn(
          'size-14 p-2 transition-transform',
          'bg-linear-to-br from-primary/10 to-primary/5',
          'group-hover:scale-110'
        )}
      />

      {/* Lottery Name */}
      <span className="text-body-small-bold text-foreground">{t(`lottery.${lottoType}`)}</span>

      {/* Draw Frequency Badge */}
      <span className="text-label-small text-muted-foreground">{t(`lottery.frequency.${lottoType}`)}</span>
    </InteractiveCard>
  );
}
