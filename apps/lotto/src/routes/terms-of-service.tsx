import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { Trans, useTranslation } from 'react-i18next';

import { Button, Card } from '@lotto/ui';

import { LanguageSelector } from '@/domains/region/components/LanguageSelector';
import { BrandLayout } from '@/layouts/BrandLayout';

export const Route = createFileRoute('/terms-of-service')({
  component: TermsOfServicePage,
});

const sections = [
  'acceptance',
  'serviceDescription',
  'disclaimer',
  'accounts',
  'subscriptions',
  'intellectualProperty',
  'termination',
  'liability',
  'governingLaw',
  'changes',
  'contact',
] as const;

function TermsOfServicePage() {
  const { t } = useTranslation();

  return (
    <BrandLayout topRight={<LanguageSelector />}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-3xl"
      >
        <Card className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-6 flex items-center gap-4">
            <Button variant="ghost" size="sm" className="size-9 p-0" onClick={() => window.history.back()}>
              <ArrowLeftIcon className="size-5" />
            </Button>
            <div>
              <h1 className="text-foreground text-title-large-bold">{t('legal.termsOfService.title')}</h1>
              <p className="text-body-small text-muted-foreground">
                {t('legal.termsOfService.lastUpdated', { date: 'January 10, 2026' })}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {sections.map((section) => (
              <section key={section} className={section === 'disclaimer' ? 'rounded-lg bg-base-yellow p-4' : ''}>
                <h2
                  className={`mb-2 text-title-medium-bold ${section === 'disclaimer' ? 'text-primary-yellow' : 'text-foreground'}`}
                >
                  {t(`legal.termsOfService.${section}.title`)}
                </h2>
                {section === 'contact' ? (
                  <p className="text-body-medium text-muted-foreground">
                    <Trans
                      i18nKey="legal.termsOfService.contact.content"
                      components={{
                        email: (
                          // biome-ignore lint/a11y/useAnchorContent: Trans component provides children
                          <a
                            href="mailto:support@lottolens.io"
                            className="text-primary underline hover:text-primary/80"
                          />
                        ),
                      }}
                    />
                  </p>
                ) : (
                  <p className="text-body-medium text-muted-foreground">
                    {t(`legal.termsOfService.${section}.content`)}
                  </p>
                )}
              </section>
            ))}
          </div>

          {/* Back button */}
          <div className="mt-8">
            <Button variant="outline" onClick={() => window.history.back()}>
              {t('legal.termsOfService.back')}
            </Button>
          </div>
        </Card>
      </motion.div>
    </BrandLayout>
  );
}
