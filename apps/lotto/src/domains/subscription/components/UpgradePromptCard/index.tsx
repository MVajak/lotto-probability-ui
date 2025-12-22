import type React from 'react';
import { CheckIcon, LockClosedIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Badge, Button, Card, CardContent, cn } from '@lotto/ui';

import { TIER_FEATURES } from '@/domains/subscription';

type RequiredTier = 'PRO' | 'PREMIUM';

interface UpgradePromptCardProps {
  requiredTier: RequiredTier;
  className?: string;
}

export const UpgradePromptCard: React.FC<UpgradePromptCardProps> = ({ requiredTier, className }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleUpgrade = () => {
    void navigate({ to: '/subscription' });
  };

  const features = TIER_FEATURES[requiredTier];
  const isProTier = requiredTier === 'PRO';

  return (
    <Card
      className={cn('border-2 border-dashed', isProTier ? 'border-primary-orange/50' : 'border-primary/50', className)}
    >
      <CardContent className="flex flex-col gap-4 py-6">
        {/* Header with lock icon */}
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex size-10 items-center justify-center rounded-full',
              isProTier ? 'bg-primary-orange/10' : 'bg-primary/10'
            )}
          >
            <LockClosedIcon className={cn('size-5', isProTier ? 'text-primary-orange' : 'text-primary')} />
          </div>
          <div>
            <h4 className="text-title-small-bold">{t(`subscription.upgrade.${requiredTier.toLowerCase()}Title`)}</h4>
            <p className="text-body-small text-muted-foreground">
              {t(`subscription.upgrade.${requiredTier.toLowerCase()}Description`)}
            </p>
          </div>
        </div>

        {/* Feature list */}
        <div className="grid gap-2 sm:grid-cols-2">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <CheckIcon className={cn('size-4 shrink-0', isProTier ? 'text-primary-orange' : 'text-primary-green')} />
              <span className="text-body-small text-muted-foreground">{t(`subscription.features.${feature}`)}</span>
            </div>
          ))}
        </div>

        {/* Footer with badge and button */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Badge variant="secondary" className="gap-1">
            <SparklesIcon className="size-3" />
            {t('subscription.upgrade.upgradeToUnlock', { tier: requiredTier })}
          </Badge>

          <Button
            variant="primary"
            size="sm"
            onClick={handleUpgrade}
            className={cn(isProTier && 'bg-primary-orange hover:bg-gold-dark')}
          >
            {t('subscription.upgrade.upgradeButton')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
