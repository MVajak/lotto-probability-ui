import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Card, CardContent } from '@lotto/ui';

import { currentUserQuery, refreshAuthTokens } from '@/domains/auth';
import { PageLayout } from '@/layouts/PageLayout';
import { SuccessLayout } from '@/layouts/SuccessLayout';

export const Route = createFileRoute('/subscription/success')({
  component: CheckoutSuccessPage,
});

function CheckoutSuccessPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(true);

  useEffect(() => {
    const handleSuccess = async () => {
      try {
        // Refresh tokens to get updated subscription claims
        await refreshAuthTokens();
        // Invalidate user data to refetch with new subscription
        await queryClient.invalidateQueries({ queryKey: currentUserQuery.queryKey });
      } catch (error) {
        console.error('Failed to refresh auth tokens:', error);
      } finally {
        setIsRefreshing(false);
      }

      // Redirect to subscription page after a short delay
      setTimeout(() => {
        void navigate({ to: '/subscription' });
      }, 2000);
    };

    void handleSuccess();
  }, [navigate, queryClient]);

  return (
    <PageLayout>
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <SuccessLayout
              title={t('subscription.checkout.successTitle')}
              message={isRefreshing ? t('subscription.checkout.activating') : t('subscription.checkout.successMessage')}
            />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
