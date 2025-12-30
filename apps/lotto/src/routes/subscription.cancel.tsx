import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Card, CardContent } from '@lotto/ui';

import { ErrorLayout } from '@/layouts/ErrorLayout';
import { PageLayout } from '@/layouts/PageLayout';

export const Route = createFileRoute('/subscription/cancel')({
  component: CheckoutCancelPage,
});

function CheckoutCancelPage() {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <ErrorLayout
              title={t('subscription.checkout.cancelTitle')}
              message={t('subscription.checkout.cancelMessage')}
              actionLabel={t('subscription.checkout.returnToSubscription')}
              actionPath="/subscription"
            />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
