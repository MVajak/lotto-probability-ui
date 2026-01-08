import type React from 'react';
import { useCallback } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { motion } from 'motion/react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Field, FieldError, IconButton, InputOTP, InputOTPGroup, InputOTPSlot } from '@lotto/ui';

interface VerifyOtpFormInputs {
  otp: string;
}

interface VerifyOtpFormProps {
  email: string;
  onVerify: (code: string) => void;
  onResend: () => void;
  onBack: () => void;
  isVerifying: boolean;
  isResending: boolean;
  error: string | null;
}

export const VerifyOtpForm: React.FC<VerifyOtpFormProps> = ({
  email,
  onVerify,
  onResend,
  onBack,
  isVerifying,
  isResending,
  error,
}) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<VerifyOtpFormInputs>({
    defaultValues: { otp: '' },
  });

  const submit = useCallback(
    ({ otp }: VerifyOtpFormInputs) => {
      onVerify(otp);
    },
    [onVerify]
  );

  // Set form error when verification fails
  if (error && !errors.otp) {
    setError('otp', { message: t('verifyOtp.invalidCode') });
  }

  return (
    <div className="flex w-full flex-col items-center gap-8">
      {/* Back button */}
      <motion.div
        className="absolute top-0 left-0"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <IconButton label={t('verifyOtp.backToLogin')} size="lg" onClick={onBack}>
          <ArrowLeftIcon />
        </IconButton>
      </motion.div>

      {/* Title section */}
      <motion.div
        className="flex flex-col items-center gap-2 pt-12 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-display-small text-foreground">{t('verifyOtp.enterCode')}</h1>
        <p className="text-body-default text-muted-foreground">{t('verifyOtp.codeSentToEmailPlain', { email })}</p>
      </motion.div>

      {/* OTP Form */}
      <motion.form
        onSubmit={handleSubmit(submit)}
        className="flex w-full flex-col items-center gap-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Controller
          name="otp"
          control={control}
          rules={{
            required: t('verifyOtp.codeRequired'),
            pattern: {
              value: /^[0-9]{6}$/,
              message: t('verifyOtp.codeMustBe6Digits'),
            },
          }}
          render={({ field }) => (
            <Field data-invalid={!!errors.otp} className="w-auto">
              <InputOTP
                value={field.value}
                onComplete={handleSubmit(submit)}
                onChange={field.onChange}
                maxLength={6}
                disabled={isVerifying}
                autoFocus
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={1} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={4} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {errors.otp && <FieldError>{errors.otp?.message}</FieldError>}
            </Field>
          )}
        />

        <Button type="submit" variant="primary" size="lg" className="w-full" loading={isVerifying}>
          {t('verifyOtp.verify')}
        </Button>
      </motion.form>

      {/* Resend section */}
      <motion.div
        className="flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <p className="text-body-small text-muted-foreground">{t('verifyOtp.didntReceiveCode')}</p>
        <Button variant="link" className="text-primary" onClick={onResend} disabled={isResending}>
          {isResending ? t('verifyOtp.resending') : t('verifyOtp.resendCode')}
        </Button>
      </motion.div>
    </div>
  );
};
