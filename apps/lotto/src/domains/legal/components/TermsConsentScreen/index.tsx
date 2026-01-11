import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { Button, Card, Checkbox, Label } from '@lotto/ui';

import { Logo } from '@/domains/brand';

import { CURRENT_TERMS_VERSION } from '../../config';
import { useAcceptTermsMutation } from '../../mutations';

interface TermsConsentScreenProps {
  /** Whether this is a re-consent (terms updated) vs first-time consent */
  isUpdate?: boolean;
}

export function TermsConsentScreen({ isUpdate = false }: TermsConsentScreenProps) {
  const { t } = useTranslation();
  const [accepted, setAccepted] = useState(false);
  const acceptMutation = useAcceptTermsMutation();

  const handleAccept = () => {
    acceptMutation.mutate(CURRENT_TERMS_VERSION);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background bg-glass-mesh p-4">
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="-top-1/4 -left-1/4 absolute size-3/4 rounded-full bg-primary/10 blur-3xl" />
        <div className="-right-1/4 -bottom-1/4 absolute size-3/4 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-lg"
      >
        <Card className="border-glass-border bg-glass p-8 backdrop-blur-xl gap-4">
          {/* Logo */}
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>

          {/* Title */}
          <div className="flex flex-col gap-4">
            <h1 className="text-center text-title-large-bold text-foreground">
              {isUpdate ? t('legal.consent.titleUpdated') : t('legal.consent.title')}
            </h1>

            {/* Description */}
            <p className="text-center text-body-medium text-muted-foreground">
              {isUpdate ? t('legal.consent.descriptionUpdated') : t('legal.consent.description')}
            </p>
          </div>

          {/* Links to documents */}
          <div className="flex flex-col gap-2 mb-6">
            <Link
              to="/terms-of-service"
              target="_blank"
              className="text-center text-body-medium text-primary underline-offset-4 hover:underline"
            >
              {t('legal.consent.viewTerms')}
            </Link>
            <Link
              to="/privacy-policy"
              target="_blank"
              className="text-center text-body-medium text-primary underline-offset-4 hover:underline"
            >
              {t('legal.consent.viewPrivacy')}
            </Link>
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="accept-terms"
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked === true)}
            />
            <Label htmlFor="accept-terms" className="text-body-medium text-foreground leading-tight">
              {t('legal.consent.checkbox')}
            </Label>
          </div>

          {/* Error message */}
          {acceptMutation.isError && (
            <p className="text-center text-body-small text-destructive">
              {acceptMutation.error?.message || 'An error occurred'}
            </p>
          )}

          {/* Accept button */}
          <Button className="w-full" disabled={!accepted || acceptMutation.isPending} onClick={handleAccept}>
            {acceptMutation.isPending ? '...' : t('legal.consent.accept')}
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}
