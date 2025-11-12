import { Alert, Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { resetAuthState } from '../features/auth/authSlice';
import { requestMagicLink } from '../features/auth/authThunks';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isLoading, error, emailSent } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    // Reset auth state when component mounts
    dispatch(resetAuthState());
  }, [dispatch]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    if (emailError && value) {
      setEmailError('');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate email
    if (!email) {
      setEmailError(t('login.emailRequired'));
      return;
    }

    if (!validateEmail(email)) {
      setEmailError(t('login.emailInvalid'));
      return;
    }

    // Send magic link request
    dispatch(requestMagicLink({ email }));
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            {t('login.title')}
          </Typography>

          {emailSent ? (
            <Box sx={{ mt: 3 }}>
              <Alert severity="success" sx={{ mb: 2 }}>
                {t('login.emailSentSuccess')}
              </Alert>
              <Typography variant="body1" align="center" color="text.secondary">
                {t('login.checkYourEmail')}
              </Typography>
            </Box>
          ) : (
            <>
              <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
                {t('login.description')}
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label={t('login.emailLabel')}
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  error={!!emailError}
                  helperText={emailError}
                  disabled={isLoading}
                  autoFocus
                  sx={{ mb: 3 }}
                />

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={isLoading}
                  sx={{ py: 1.5 }}
                >
                  {isLoading ? t('login.sending') : t('login.sendMagicLink')}
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
};
