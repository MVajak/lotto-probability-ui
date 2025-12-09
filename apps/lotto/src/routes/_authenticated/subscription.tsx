import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { currentUserQuery } from '@/domains/auth';
import { PageLayout } from '@/layouts/PageLayout';
import { subscriptionTiersQuery } from '@/domains/subscription';
import { PricingCard } from '@/domains/subscription/components/PricingCard';

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

  const currentTierCode = userData.subscription?.tierCode ?? 'FREE';
  const sortedTiers = [...tiers].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <PageLayout>
      <div className="p-6">
        <h1 className="mb-4 text-center text-muted-foreground text-title-large">{t('subscription.title')}</h1>
        <p className="mb-8 text-center text-body-default text-muted-foreground">{t('subscription.subtitle')}</p>
        <div className="grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedTiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} isCurrentPlan={tier.code === currentTierCode} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
