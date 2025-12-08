import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { requestMagicLinkMutation } from '@/domains/auth';
import { LanguageSelector } from '@/domains/region/components/LanguageSelector';
import { BrandLayout } from '@/layouts/BrandLayout';

import { EmailSentSuccess, LoginForm } from '../../domains/auth/components';

export const Route = createFileRoute('/_unauthenticated/login')({
  component: LoginPage,
});

function LoginPage() {
  const [submittedEmail, setSubmittedEmail] = useState<string>('');
  const [emailSent, setEmailSent] = useState(false);

  const mutation = useMutation({
    ...requestMagicLinkMutation,
    onSuccess: () => {
      setEmailSent(true);
    },
  });

  const handleSubmit = (email: string) => {
    setSubmittedEmail(email);
    mutation.mutate(email);
  };

  const handleBack = () => {
    setEmailSent(false);
    mutation.reset();
  };

  return (
    <BrandLayout>
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      {emailSent ? (
        <EmailSentSuccess email={submittedEmail} onBack={handleBack} />
      ) : (
        <LoginForm onSubmit={handleSubmit} isLoading={mutation.isPending} error={mutation.error?.message ?? null} />
      )}
    </BrandLayout>
  );
}
