import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Button, Field, FieldContent, FieldError, FieldLabel, Input } from '@lotto/ui';

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
    <div className="animate-fade-in">
      <div className="flex justify-center">
        <img src="/img/logo_lotto.png" alt="Lotto Logo" className="max-w-[120px] p-4" />
      </div>
      <h5 className="mb-2 text-center text-title-small">{t('login.title')}</h5>
      <div className="mt-6">
        <form onSubmit={handleSubmit}>
          <Field className="mb-6">
            <FieldLabel>{t('login.emailLabel')}</FieldLabel>
            <FieldContent>
              <Input
                type="email"
                value={email}
                onChange={handleEmailChange}
                disabled={isLoading}
                autoFocus
                aria-invalid={!!emailError}
              />
            </FieldContent>
            {emailError && <FieldError>{emailError}</FieldError>}
          </Field>

          {error && (
            <Alert variant="destructive" className="mb-4">
              {error}
            </Alert>
          )}

          <Button type="submit" className="w-full py-3" size="lg" disabled={isLoading}>
            {t('login.sendMagicLink')}
          </Button>
        </form>
      </div>
    </div>
  );
};
