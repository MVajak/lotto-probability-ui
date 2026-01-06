import type React from 'react';
import { useState } from 'react';
import { CheckCircleIcon, CheckIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Badge, Button, CardContent, cn, InteractiveCard } from '@lotto/ui';

import type { Subscription } from '@/domains/auth';
import { formatDate } from '@/domains/date';
import {
  FeaturePreviewDialog,
  type SubscriptionTier,
  useCancelSubscriptionMutation,
  useChangeTierMutation,
  useCreateCheckoutSessionMutation,
  useResumeSubscriptionMutation,
} from '@/domains/subscription';

interface PricingCardProps {
  tier: SubscriptionTier;
  isCurrentPlan?: boolean;
  currentSubscription?: Subscription;
}

export const PricingCard: React.FC<PricingCardProps> = ({ tier, isCurrentPlan = false, currentSubscription }) => {
  const { t } = useTranslation();
  const checkoutMutation = useCreateCheckoutSessionMutation();
  const cancelMutation = useCancelSubscriptionMutation();
  const changeTierMutation = useChangeTierMutation();
  const resumeMutation = useResumeSubscriptionMutation();
  const [showPreview, setShowPreview] = useState(false);

  const isHighlighted = tier.code === 'PRO';
  const isCancelled = currentSubscription?.cancelAtPeriodEnd ?? false;
  const hasStripeSubscription = !!currentSubscription?.stripeSubscriptionId;
  const isPending =
    checkoutMutation.isPending || cancelMutation.isPending || changeTierMutation.isPending || resumeMutation.isPending;

  // FREE card should be disabled when cancellation is already pending
  const isFreeCardDisabled = tier.code === 'FREE' && isCancelled;

  const handleClick = () => {
    if (isCurrentPlan || isPending || isFreeCardDisabled) return;

    // FREE tier = cancel subscription (downgrade at period end)
    if (tier.code === 'FREE') {
      cancelMutation.mutate();
      return;
    }

    // Check if user already has a Stripe subscription
    if (!hasStripeSubscription) {
      // FREE user → use checkout
      checkoutMutation.mutate({
        tierCode: tier.code,
        successUrl: `${window.location.origin}/subscription/success`,
        cancelUrl: `${window.location.origin}/subscription/cancel`,
      });
    } else {
      // Paid user → use change-tier (also handles resume if cancelled)
      changeTierMutation.mutate({ tierCode: tier.code });
    }
  };

  const handleResume = (e: React.MouseEvent) => {
    e.stopPropagation();
    resumeMutation.mutate();
  };

  // Determine button text based on state
  const getButtonContent = () => {
    // Current plan with cancellation pending → show resume UI
    if (isCurrentPlan && isCancelled) {
      return (
        <div className="flex flex-col gap-2">
          <span className="text-body-small text-primary-orange">
            {t('subscription.endsOn', { date: formatDate(currentSubscription?.cancelAt, 'long') })}
          </span>
          <Button variant="outline" onClick={handleResume} disabled={resumeMutation.isPending}>
            {resumeMutation.isPending ? t('subscription.resuming') : t('subscription.resume')}
          </Button>
        </div>
      );
    }

    // Current plan (normal)
    if (isCurrentPlan) {
      return (
        <Button variant="outline" disabled>
          <span className="flex items-center gap-1">
            <CheckCircleIcon className="size-5" />
            {t('subscription.alreadyOnPlan')}
          </span>
        </Button>
      );
    }

    // FREE card when downgrade is scheduled
    if (isFreeCardDisabled) {
      return (
        <Button variant="outline" disabled>
          {t('subscription.downgradeScheduled')}
        </Button>
      );
    }

    // Regular subscribe/upgrade/switch button
    return (
      <Button
        variant={isHighlighted ? 'primary' : 'outline'}
        className={cn('text-body-default-bold', isHighlighted && 'bg-primary-orange text-primary-foreground hover:bg-gold-dark')}
        disabled={isPending}
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
      >
        {isPending ? t('subscription.updating') : t('subscription.choosePlan')}
      </Button>
    );
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
            ${tier.price}
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

        {getButtonContent()}
      </CardContent>

      {tier.code !== 'FREE' && (
        <FeaturePreviewDialog open={showPreview} onOpenChange={setShowPreview} tier={tier.code} />
      )}
    </InteractiveCard>
  );
};
