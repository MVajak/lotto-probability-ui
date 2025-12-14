import type React from 'react';
import { ChartBarIcon, LockClosedIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Badge, Button, Card, CardContent } from '@lotto/ui';

type FeatureType = 'markov' | 'autocorrelation' | 'trends';
type RequiredTier = 'PRO' | 'PREMIUM';

interface UpgradePromptCardProps {
  feature: FeatureType;
  requiredTier: RequiredTier;
  className?: string;
}

const FEATURE_ICONS: Record<FeatureType, React.ReactNode> = {
  markov: <SparklesIcon className="size-6" />,
  autocorrelation: <SparklesIcon className="size-6" />,
  trends: <ChartBarIcon className="size-6" />,
};

export const UpgradePromptCard: React.FC<UpgradePromptCardProps> = ({ feature, requiredTier, className }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate({ to: '/subscription' });
  };

  return (
    <Card className={className}>
      <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
        {/* Lock icon with feature icon */}
        <div className="relative">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            {FEATURE_ICONS[feature]}
          </div>
          <div className="-right-1 -bottom-1 absolute flex size-6 items-center justify-center rounded-full bg-muted">
            <LockClosedIcon className="size-4 text-muted-foreground" />
          </div>
        </div>

        {/* Feature title and description */}
        <div className="space-y-2">
          <h4 className="text-title-small-bold">{t(`subscription.upgrade.${feature}Title`)}</h4>
          <p className="text-body-small text-muted-foreground">{t(`subscription.upgrade.${feature}Description`)}</p>
        </div>

        {/* Required tier badge */}
        <Badge variant="secondary" className="gap-1">
          <SparklesIcon className="size-3" />
          {t('subscription.upgrade.upgradeToUnlock', { tier: requiredTier })}
        </Badge>

        {/* Upgrade button */}
        <Button variant="primary" onClick={handleUpgrade} className="mt-2">
          {t('subscription.upgrade.upgradeButton')}
        </Button>
      </CardContent>
    </Card>
  );
};
