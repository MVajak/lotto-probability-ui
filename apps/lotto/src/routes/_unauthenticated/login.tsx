import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'motion/react';
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

  const renderForm = () => {
    switch (step) {
      case 'login':
        return (
          <LoginForm
            onSubmit={handleLogin}
            isLoading={requestOtpMut.isPending}
            error={requestOtpMut.error?.message ?? null}
          />
        );

      case 'verify':
        return (
          <VerifyOtpForm
            email={submittedEmail}
            onVerify={handleVerify}
            onResend={handleResend}
            onBack={handleBack}
            isVerifying={verifyOtpMut.isPending}
            isResending={requestOtpMut.isPending}
            error={verifyOtpMut.error?.message ?? null}
          />
        );

      case 'success':
        return <SuccessLayout title={t('verifyOtp.verificationSuccessful')} message={t('verifyOtp.redirecting')} />;
    }
  };

  return (
    <BrandLayout topRight={<LanguageSelector />}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="relative flex min-h-[400px] w-full items-center justify-center"
        >
          {renderForm()}
        </motion.div>
      </AnimatePresence>
    </BrandLayout>
  );
}
