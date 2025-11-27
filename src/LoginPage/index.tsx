import type React from 'react';
import { useEffect, useState } from 'react';

import { Box } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { resetAuthState } from '../features/auth/authSlice';
import { requestMagicLink } from '../features/auth/authThunks';
import { LanguageSelector } from '../shared/components/LanguageSelector';
import { AuthLayout } from '../shared/layouts/AuthLayout';
import { EmailSentSuccess, LoginForm } from './components';

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, emailSent } = useAppSelector((state) => state.auth);
  const [submittedEmail, setSubmittedEmail] = useState<string>('');

  useEffect(() => {
    // Reset auth state when component mounts
    dispatch(resetAuthState());
  }, [dispatch]);

  const handleSubmit = (email: string) => {
    setSubmittedEmail(email);
    dispatch(requestMagicLink({ email }));
  };

  const handleBack = () => {
    dispatch(resetAuthState());
  };

  return (
    <AuthLayout>
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        <LanguageSelector />
      </Box>
      {emailSent ? (
        <EmailSentSuccess email={submittedEmail} onBack={handleBack} />
      ) : (
        <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
      )}
    </AuthLayout>
  );
};
