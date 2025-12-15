import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { currentUserQuery, requestOtpMutation, useAuthStore, verifyOtpMutation } from '@/domains/auth';
import { LoginForm, VerifyOtpForm } from '@/domains/auth/components';
import { LanguageSelector } from '@/domains/region/components/LanguageSelector';
import { BrandLayout } from '@/layouts/BrandLayout';
import { SuccessLayout } from '@/layouts/SuccessLayout';

export const Route = createFileRoute('/_unauthenticated/login')({
  component: LoginPage,
});

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setTokens = useAuthStore((state) => state.setTokens);

  const [submittedEmail, setSubmittedEmail] = useState('');
  const [step, setStep] = useState<'login' | 'verify' | 'success'>('login');

  const requestOtpMut = useMutation({
    ...requestOtpMutation,
    onSuccess: (_data, email) => {
      setSubmittedEmail(email);
      setStep('verify');
    },
  });

  const verifyOtpMut = useMutation({
    ...verifyOtpMutation,
    onSuccess: async (data) => {
      setTokens(data);
      setStep('success');
      await queryClient.prefetchQuery(currentUserQuery);
      setTimeout(() => {
        navigate({ to: '/home' });
      }, 1000);
    },
  });

  const handleLogin = (email: string) => {
    requestOtpMut.mutate(email);
  };

  const handleVerify = (code: string) => {
    verifyOtpMut.mutate({ email: submittedEmail, code });
  };

  const handleResend = () => {
    requestOtpMut.mutate(submittedEmail);
  };

  const handleBack = () => {
    setStep('login');
    requestOtpMut.reset();
    verifyOtpMut.reset();
  };

  return (
    <BrandLayout>
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      {step === 'login' && (
        <LoginForm
          onSubmit={handleLogin}
          isLoading={requestOtpMut.isPending}
          error={requestOtpMut.error?.message ?? null}
        />
      )}

      {step === 'verify' && (
        <VerifyOtpForm
          email={submittedEmail}
          onVerify={handleVerify}
          onResend={handleResend}
          onBack={handleBack}
          isVerifying={verifyOtpMut.isPending}
          isResending={requestOtpMut.isPending}
          error={verifyOtpMut.error?.message ?? null}
        />
      )}

      {step === 'success' && (
        <SuccessLayout title={t('verifyOtp.verificationSuccessful')} message={t('verifyOtp.redirecting')} />
      )}
    </BrandLayout>
  );
}
