import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
  onSubmit: (email: string) => void;
  isLoading: boolean;
  error: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading, error }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

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

    onSubmit(email);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src="/img/logo_lotto.png"
          alt="Lotto Logo"
          style={{ maxWidth: '120px', height: 'auto', padding: '16px' }}
        />
      </Box>
      <Typography variant="h5" component="h5" gutterBottom align="center">
        {t('login.title')}
      </Typography>
      <Box sx={{ mt: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={t('login.emailLabel')}
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
            disabled={isLoading}
            autoFocus
            sx={{ mb: 3 }}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2, marginLeft: 0 }}>
              {error}
            </Alert>
          )}

          <Button type="submit" variant="contained" fullWidth size="large" disabled={isLoading} sx={{ py: 1.5 }}>
            {t('login.sendMagicLink')}
          </Button>
        </form>
      </Box>
    </>
  );
};
