import type React from 'react';
import { CheckCircleIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Badge, Button, cn } from '@lotto/ui';

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
    <div
      className={cn(
        'relative flex h-full cursor-pointer flex-col rounded-xl bg-card p-6 transition-all duration-200',
        isHighlighted
          ? 'hover:-translate-y-1 border-2 border-primary-orange shadow-[0_4px_20px_color-mix(in_srgb,var(--color-primary-orange)_15%,transparent)] hover:shadow-[0_12px_32px_color-mix(in_srgb,var(--color-primary-orange)_25%,transparent)]'
          : 'hover:-translate-y-1 border border-border shadow-sm hover:shadow-lg'
      )}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      role="button"
      tabIndex={0}
    >
      {isHighlighted && (
        <Badge className="-top-3 -translate-x-1/2 absolute left-1/2 bg-primary-orange text-body-small-bold text-primary-foreground tracking-wide">
          {t('subscription.popular')}
        </Badge>
      )}

      <h3 className="mb-1 text-title-default-bold">{t(`subscription.${tierKey}.name`)}</h3>

      <div className="mb-5">
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

      <div className="mb-5 flex-grow">
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
          'w-full rounded-full py-2.5 text-body-default-bold',
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
    </div>
  );
};
