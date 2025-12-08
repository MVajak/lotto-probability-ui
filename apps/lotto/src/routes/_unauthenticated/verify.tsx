import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { currentUserQuery, useAuthStore, verifyMagicLinkMutation } from '@/domains/auth';
import { BrandLayout } from '@/layouts/BrandLayout';
import { ErrorLayout } from '@/layouts/ErrorLayout';
import { LoadingLayout } from '@/layouts/LoadingLayout';
import { SuccessLayout } from '@/layouts/SuccessLayout';

export const Route = createFileRoute('/_unauthenticated/verify')({
  validateSearch: (search: Record<string, unknown>) => ({
    token: (search.token as string) || '',
  }),
  component: VerifyPage,
});

function VerifyPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token } = Route.useSearch();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const verifyMutation = useMutation({
    ...verifyMagicLinkMutation,
    onSuccess: async (data) => {
      setAccessToken(data.accessToken);
      // Prefetch user data
      await queryClient.prefetchQuery(currentUserQuery);
      // Redirect after a short delay for UX
      setTimeout(() => {
        navigate({ to: '/home' });
      }, 1000);
    },
  });

  useEffect(() => {
    if (token && !verifyMutation.isPending && !verifyMutation.isSuccess && !verifyMutation.isError) {
      verifyMutation.mutate(token);
    }
  }, [token, verifyMutation]);

  // No token provided
  if (!token) {
    return (
      <BrandLayout>
        <ErrorLayout
          title={t('verify.invalidLink')}
          message={t('verify.noTokenProvided')}
          actionLabel={t('verify.backToLogin')}
          actionPath="/login"
        />
      </BrandLayout>
    );
  }

  // Verification error
  if (verifyMutation.isError) {
    return (
      <BrandLayout>
        <ErrorLayout title={t('verify.verificationFailed')} actionLabel={t('verify.backToLogin')} actionPath="/login" />
      </BrandLayout>
    );
  }

  // Verification successful
  if (verifyMutation.isSuccess) {
    return (
      <BrandLayout>
        <SuccessLayout title={t('verify.verificationSuccessful')} message={t('verify.redirecting')} />
      </BrandLayout>
    );
  }

  // Verifying (loading state)
  return (
    <BrandLayout>
      <LoadingLayout title={t('verify.verifying')} message={t('verify.pleaseWait')} />
    </BrandLayout>
  );
}
