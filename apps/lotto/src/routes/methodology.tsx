import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { Button, Card } from '@lotto/ui';

import { LanguageSelector } from '@/domains/region/components/LanguageSelector';
import { BrandLayout } from '@/layouts/BrandLayout';

export const Route = createFileRoute('/methodology')({
  component: MethodologyPage,
});

const methods = [
  'frequencyAnalysis',
  'wilsonConfidenceInterval',
  'hotColdNumbers',
  'trendAnalysis',
  'streaksGaps',
  'markovChain',
  'autocorrelation',
  'pairAnalysis',
  'monteCarlo',
  'seasonalPatterns',
] as const;

function MethodologyPage() {
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
            <Link to="/support">
              <Button variant="ghost" size="sm" className="size-9 p-0">
                <ArrowLeftIcon className="size-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-title-large-bold text-foreground">{t('methodology.title')}</h1>
              <p className="text-body-small text-muted-foreground">{t('methodology.subtitle')}</p>
            </div>
          </div>

          {/* Intro */}
          <div className="mb-8 rounded-lg bg-primary/5 p-4">
            <p className="text-body-medium text-muted-foreground">{t('methodology.intro')}</p>
          </div>

          {/* Methods */}
          <div className="space-y-8">
            {methods.map((method, index) => (
              <section key={method} className="border-b border-border pb-6 last:border-0 last:pb-0">
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-body-small-bold text-primary">
                    {index + 1}
                  </span>
                  <h2 className="text-title-medium-bold text-foreground">
                    {t(`methodology.methods.${method}.title`)}
                  </h2>
                </div>
                <div className="ml-11">
                  <p className="mb-3 text-body-medium text-muted-foreground">
                    {t(`methodology.methods.${method}.description`)}
                  </p>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-body-small text-muted-foreground">
                      <span className="font-semibold text-foreground">{t('methodology.howItHelps')}: </span>
                      {t(`methodology.methods.${method}.helps`)}
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-8 rounded-lg bg-base-yellow p-4">
            <h3 className="mb-2 text-title-small-bold text-primary-yellow">{t('methodology.disclaimer.title')}</h3>
            <p className="text-body-small text-muted-foreground">{t('methodology.disclaimer.content')}</p>
          </div>

          {/* Back button */}
          <div className="mt-8">
            <Link to="/support">
              <Button variant="outline">{t('methodology.back')}</Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </BrandLayout>
  );
}