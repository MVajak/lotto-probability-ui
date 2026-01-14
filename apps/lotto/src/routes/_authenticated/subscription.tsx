import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { Badge } from '@lotto/ui';

import { currentUserQuery } from '@/domains/auth';
import { subscriptionTiersQuery } from '@/domains/subscription';
import { PricingCard } from '@/domains/subscription/components/PricingCard';
import { PageLayout } from '@/layouts/PageLayout';

export const Route = createFileRoute('/_authenticated/subscription')({
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(subscriptionTiersQuery),
      context.queryClient.ensureQueryData(currentUserQuery),
    ]),
  component: SubscriptionPage,
});

function SubscriptionPage() {
  const { t } = useTranslation();
  const { data: tiers } = useSuspenseQuery(subscriptionTiersQuery);
  const { data: userData } = useSuspenseQuery(currentUserQuery);

  const currentTierCode = userData.subscription?.tier ?? 'FREE';
  const sortedTiers = [...tiers].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <PageLayout>
      <div className="p-6">
        {/* Header */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-3 text-display-small-bold text-foreground">{t('subscription.title')}</h1>
          <p className="mx-auto max-w-md text-body-large text-muted-foreground">{t('subscription.subtitle')}</p>

          {/* Value proposition badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Badge variant="outline" className="text-body-small">
              {t('subscription.valueProposition.cost')}
            </Badge>
            <Badge variant="outline" className="text-body-small">
              {t('subscription.valueProposition.noUpfront')}
            </Badge>
            <Badge variant="outline" className="text-body-small">
              {t('subscription.valueProposition.cancel')}
            </Badge>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
            >
              <PricingCard
                tier={tier}
                isCurrentPlan={tier.code === currentTierCode}
                currentSubscription={userData.subscription ?? undefined}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
