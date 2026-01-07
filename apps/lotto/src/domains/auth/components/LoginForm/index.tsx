import type React from 'react';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Field, FieldError, Input } from '@lotto/ui';

interface LoginFormInputs {
  email: string;
}

interface LoginFormProps {
  onSubmit: (email: string) => void;
  isLoading: boolean;
  error: string | null;
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading, error }) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    defaultValues: { email: '' },
    mode: 'onChange',
  });

  // Set form error when API returns error
  if (error && !errors.email) {
    setError('email', { message: error });
  }

  const submit = useCallback(
    ({ email }: LoginFormInputs) => {
      onSubmit(email);
    },
    [onSubmit]
  );

  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center gap-8">
      <img src="/img/lotto_lens.png" alt="Lotto Logo" className="max-w-[120px]" />

      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-display-small text-foreground">{t('login.title')}</h1>
      </div>

      <form className="flex w-full flex-col gap-8" onSubmit={handleSubmit(submit)}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: t('login.emailRequired'),
            validate: (value) => isValidEmail(value) || t('login.emailInvalid'),
          }}
          render={({ field }) => (
            <Field data-invalid={!!errors.email}>
              <Input
                id="email"
                placeholder={t('login.emailLabel')}
                className="text-light"
                type="email"
                autoComplete="email"
                autoFocus
                aria-invalid={!!errors.email}
                {...field}
              />
              {errors.email && <FieldError>{errors.email?.message}</FieldError>}
            </Field>
          )}
        />

        <Button type="submit" loading={isLoading} variant="primary" size="lg" className="w-full" disabled={!isValid}>
          {t('login.sendCode')}
        </Button>
      </form>
    </div>
  );
};
