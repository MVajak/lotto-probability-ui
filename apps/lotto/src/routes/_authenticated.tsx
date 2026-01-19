import { useEffect } from 'react';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { safeBig } from '@lotto/ui/utils';

import { currentUserQuery, useAuthStore } from '@/domains/auth';
import { featureFlagsQuery } from '@/domains/featureFlags';
import { CURRENT_TERMS_VERSION, TermsConsentScreen } from '@/domains/legal';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      throw redirect({ to: '/login' });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(currentUserQuery);
  const user = data.user;

  // Prefetch feature flags for the app
  useSuspenseQuery(featureFlagsQuery);

  // Listen for terms-not-accepted event from API client (backend fallback)
  useEffect(() => {
    const handleTermsNotAccepted = () => {
      void queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    };

    window.addEventListener('terms-not-accepted', handleTermsNotAccepted);
    return () => window.removeEventListener('terms-not-accepted', handleTermsNotAccepted);
  }, [queryClient]);

  // Check if user needs to accept terms
  const needsConsent = !user.acceptedTermsVersion || user.acceptedTermsVersion < CURRENT_TERMS_VERSION;

  // Determine if this is a first-time consent or re-consent due to update
  const isUpdate = Boolean(user.acceptedTermsVersion) && safeBig(user.acceptedTermsVersion).lt(CURRENT_TERMS_VERSION);

  if (needsConsent) {
    return <TermsConsentScreen isUpdate={isUpdate} />;
  }

  return <Outlet />;
}
