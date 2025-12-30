import type React from 'react';
import { useState } from 'react';
import { CheckCircleIcon, CheckIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Badge, Button, CardContent, cn, InteractiveCard } from '@lotto/ui';

import {
  FeaturePreviewDialog,
  type SubscriptionTier,
  useCancelSubscriptionMutation,
  useCreateCheckoutSessionMutation,
} from '@/domains/subscription';

interface PricingCardProps {
  tier: SubscriptionTier;
  isCurrentPlan?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({ tier, isCurrentPlan = false }) => {
  const { t } = useTranslation();
  const checkoutMutation = useCreateCheckoutSessionMutation();
  const cancelMutation = useCancelSubscriptionMutation();
  const [showPreview, setShowPreview] = useState(false);

  const isHighlighted = tier.code === 'PRO';
  const isPending = checkoutMutation.isPending || cancelMutation.isPending;

  const handleClick = () => {
    if (isCurrentPlan || isPending) return;

    // FREE tier = cancel subscription (downgrade at period end)
    if (tier.code === 'FREE') {
      cancelMutation.mutate();
      return;
    }

    checkoutMutation.mutate({
      tierCode: tier.code,
      successUrl: `${window.location.origin}/subscription/success`,
      cancelUrl: `${window.location.origin}/subscription/cancel`,
    });
  };

  return (
    <InteractiveCard
      className={cn('relative h-full border-border', isHighlighted && 'border-2 border-primary-orange')}
      onClick={handleClick}
    >
      {isHighlighted && (
        <Badge className="-top-3 -translate-x-1/2 absolute left-1/2 bg-primary-orange text-body-small-bold text-primary-foreground tracking-wide">
          {t('subscription.popular')}
        </Badge>
      )}

      <CardContent className="flex h-full flex-col gap-2 p-6">
        <h3 className="text-title-default-bold">{t(`subscription.${tier.code}.name`)}</h3>

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

        {/* Preview link for non-current PRO/PREMIUM plans */}
        {!isCurrentPlan && tier.code !== 'FREE' && (
          <Button
            variant="link"
            size="sm"
            className="mb-2 h-auto gap-1 p-0 text-muted-foreground hover:text-foreground"
            onClick={(e) => {
              e.stopPropagation();
              setShowPreview(true);
            }}
          >
            <EyeIcon className="size-4" />
            {t('subscription.preview.seeWhatYouGet')}
          </Button>
        )}

        <Button
          variant={isHighlighted && !isCurrentPlan ? 'primary' : 'outline'}
          className={cn(
            'text-body-default-bold',
            isHighlighted && !isCurrentPlan && 'bg-primary-orange text-primary-foreground hover:bg-gold-dark'
          )}
          disabled={isCurrentPlan || isPending}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          {isCurrentPlan ? (
            <span className="flex items-center gap-1">
              <CheckCircleIcon className="size-5" />
              {t('subscription.alreadyOnPlan')}
            </span>
          ) : isPending ? (
            t('subscription.updating')
          ) : (
            t('subscription.choosePlan')
          )}
        </Button>
      </CardContent>

      {tier.code !== 'FREE' && (
        <FeaturePreviewDialog open={showPreview} onOpenChange={setShowPreview} tier={tier.code} />
      )}
    </InteractiveCard>
  );
};
