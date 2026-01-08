import type React from 'react';
import { useCallback } from 'react';
import { motion } from 'motion/react';
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
    <div className="flex w-full flex-col items-center gap-8">
      {/* Logo with glow effect */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 scale-150 rounded-full bg-gold/20 blur-2xl" />
        <img src="/img/lotto_lens.png" alt="Lotto Lens" className="relative size-24" />
      </motion.div>

      {/* Title section */}
      <motion.div
        className="flex flex-col items-center gap-2 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h1 className="text-display-small text-foreground">{t('login.title')}</h1>
        <p className="text-body-default text-muted-foreground">{t('login.subtitle')}</p>
      </motion.div>

      {/* Form */}
      <motion.form
        className="flex w-full flex-col gap-6"
        onSubmit={handleSubmit(submit)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
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
      </motion.form>
    </div>
  );
};
