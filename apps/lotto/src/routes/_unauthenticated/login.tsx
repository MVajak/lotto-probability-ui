import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { Card, Separator } from '@lotto/ui';

import { currentUserQuery, requestOtpMutation, useAuthStore, verifyOtpMutation } from '@/domains/auth';
import { LoginForm, VerifyOtpForm } from '@/domains/auth/components';
import { Logo } from '@/domains/brand';
import { LanguageSelector } from '@/domains/region/components/LanguageSelector';
import { FeatureList, MobileBranding, PreviewModal, PreviewThumbnail } from '@/layouts/BrandLayout/components';
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
  const [showPreview, setShowPreview] = useState(false);

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
    <div className="relative min-h-screen bg-background bg-glass-mesh">
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="-top-1/4 -left-1/4 absolute size-3/4 rounded-full bg-primary/10 blur-3xl" />
        <div className="-right-1/4 -bottom-1/4 absolute size-3/4 rounded-full bg-gold/10 blur-3xl" />
      </div>

      {/* Top right slot */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSelector />
      </div>

      {/* Content container with max width */}
      <div className="relative mx-auto flex min-h-screen max-w-screen-2xl">
        {/* Left side - Branding (hidden on mobile) */}
        <div className="relative hidden w-2/3 flex-col p-12 lg:flex">
          {/* Brand Logo */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 scale-150 rounded-full bg-gold/30 blur-xl" />
                <Logo className="relative" />
              </div>
              <span className="text-foreground text-title-large-bold">{t('authLayout.title')}</span>
            </div>
          </motion.div>

          {/* Main content */}
          <motion.div
            className="relative z-10 flex flex-col gap-8 pt-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col gap-4">
              <h1 className="max-w-lg text-display-default-bold text-foreground leading-tight">
                {t('authLayout.headline')}
              </h1>
              <p className="max-w-md text-body-large text-muted-foreground">{t('authLayout.subtitle')}</p>
            </div>

            <Separator className="my-2" />

            {/* Features and Preview side by side */}
            <div className="flex items-start gap-12">
              <FeatureList />
              <PreviewThumbnail onClick={() => setShowPreview(true)} />
            </div>
          </motion.div>
        </div>

        {/* Right side - Form */}
        <div className="relative flex w-full flex-col items-center p-4 pt-8 lg:w-1/3 lg:justify-start lg:pt-40">
          <MobileBranding />

          {/* Glass card */}
          <motion.div
            className="relative z-10 w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="w-full border-glass-border bg-glass p-8 backdrop-blur-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="relative flex min-h-[360px] justify-center"
                >
                  {renderForm()}
                </motion.div>
              </AnimatePresence>
            </Card>
          </motion.div>

          {/* Mobile-only features section */}
          <motion.div
            className="mt-12 w-full max-w-md pb-8 lg:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Separator className="mb-8" />

            <div className="flex flex-col items-center gap-6">
              <div className="text-center">
                <h2 className="text-foreground text-title-default-bold">{t('authLayout.headline')}</h2>
                <p className="mt-2 text-body-small text-muted-foreground">{t('authLayout.subtitle')}</p>
              </div>

              <FeatureList />

              <PreviewThumbnail onClick={() => setShowPreview(true)} />
            </div>
          </motion.div>
        </div>
      </div>

      <PreviewModal open={showPreview} onOpenChange={setShowPreview} />
    </div>
  );
}
