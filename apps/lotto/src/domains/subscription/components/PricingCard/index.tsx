import type React from 'react';
import { CheckCircleIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Badge, Button, CardContent, cn, InteractiveCard } from '@lotto/ui';

import type { SubscriptionTier } from '@/domains/subscription';

interface PricingCardProps {
  tier: SubscriptionTier;
  isCurrentPlan?: boolean;
  onSelect?: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ tier, isCurrentPlan = false, onSelect }) => {
  const { t } = useTranslation();

  const isHighlighted = tier.code === 'PRO';
  const tierKey = tier.code.toLowerCase() as 'free' | 'pro' | 'premium';

  const handleClick = () => {
    if (!isCurrentPlan) {
      onSelect?.();
    }
  };

  return (
    <InteractiveCard
      className={cn(
        'relative h-full border-border',
        isHighlighted &&
          'border-2 border-primary-orange'
      )}
      onClick={handleClick}
    >
      {isHighlighted && (
        <Badge className="-top-3 -translate-x-1/2 absolute left-1/2 bg-primary-orange text-body-small-bold text-primary-foreground tracking-wide">
          {t('subscription.popular')}
        </Badge>
      )}

      <CardContent className="flex h-full flex-col gap-2 p-6">
        <h3 className="text-title-default-bold">{t(`subscription.${tierKey}.name`)}</h3>

        <div>
          <span
            className={cn(
              'text-title-large-bold leading-none',
              isHighlighted ? 'text-primary-orange' : 'text-foreground'
            )}
          >
            {tier.price}
          </span>
          <span className="ml-1 text-body-small text-muted-foreground">{t('subscription.perMonth')}</span>
        </div>

        <div className="flex-grow">
          {tier.features.map((feature) => (
            <div key={feature} className="mb-2.5 flex items-start gap-2">
              <CheckIcon
                className={cn('mt-0.5 size-4 shrink-0', isHighlighted ? 'text-primary-orange' : 'text-primary-green')}
              />
              <span className="text-body-small text-muted-foreground leading-relaxed">
                {t(`subscription.features.${feature}`, feature)}
              </span>
            </div>
          ))}
        </div>

        <Button
          variant={isHighlighted && !isCurrentPlan ? 'primary' : 'outline'}
          className={cn(
            'w-full rounded-full text-body-default-bold',
            isHighlighted && !isCurrentPlan && 'bg-primary-orange text-primary-foreground hover:bg-gold-dark'
          )}
          disabled={isCurrentPlan}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          {isCurrentPlan ? (
            <span className="flex items-center gap-2">
              <CheckCircleIcon className="size-5" />
              {t('subscription.alreadyOnPlan')}
            </span>
          ) : (
            t('subscription.choosePlan')
          )}
        </Button>
      </CardContent>
    </InteractiveCard>
  );
};
