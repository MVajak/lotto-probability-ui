import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { PageLayout } from '@/domains/lotto/components/cards/PageLayout';

export const Route = createFileRoute('/_authenticated/profile')({
  component: ProfilePage,
});

function ProfilePage() {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <div className="p-6">
        <h1 className="mb-4 text-title-large">{t('profile.title')}</h1>
        <p className="text-body-default text-muted-foreground">{t('profile.comingSoon')}</p>
      </div>
    </PageLayout>
  );
}
