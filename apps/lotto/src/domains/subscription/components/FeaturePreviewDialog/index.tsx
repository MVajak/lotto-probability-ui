import type React from 'react';
import { EyeIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import {
  Badge,
  Button,
  cn,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  LottoNumber,
} from '@lotto/ui';

import {
  PremiumFeatures,
  ProFeatures,
} from '@/domains/lotto/components/LottoNumberDetailDialog/components/NumberInsightsCard/components';

import { DEMO_NUMBER_DETAIL } from '../../data/demoData';

type PreviewTier = 'PRO' | 'PREMIUM';

interface FeaturePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tier: PreviewTier;
}

/**
 * Dialog that shows a preview of PRO or PREMIUM features using demo data.
 * Allows users to see what they're missing before upgrading.
 */
export const FeaturePreviewDialog: React.FC<FeaturePreviewDialogProps> = ({ open, onOpenChange, tier }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isProTier = tier === 'PRO';
  const demoNumber = DEMO_NUMBER_DETAIL.summary.number;

  const handleUpgrade = () => {
    onOpenChange(false);
    void navigate({ to: '/subscription' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[90vh] min-h-[60vh] flex-col gap-0 overflow-hidden sm:max-w-3xl"
        aria-describedby={undefined}
      >
        <DialogHeader className="flex-row items-center gap-3">
          <div
            className={cn(
              'flex size-10 items-center justify-center rounded-full',
              isProTier ? 'bg-primary-orange/10' : 'bg-primary/10'
            )}
          >
            <EyeIcon className={cn('size-5', isProTier ? 'text-primary-orange' : 'text-primary')} />
          </div>
          <div>
            <DialogTitle>{t('subscription.preview.title', { tier })}</DialogTitle>
            <p className="text-body-small text-muted-foreground">{t('subscription.preview.description', { tier })}</p>
          </div>
        </DialogHeader>

        <DialogBody className="flex-1 overflow-y-auto">
          {/* Demo indicator */}
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-muted-foreground/30 border-dashed bg-muted/50 p-3">
            <LottoNumber digit={demoNumber} index={`preview-${demoNumber}`} className="size-8 text-sm" />
            <span className="text-body-small text-muted-foreground">
              {t('subscription.preview.demoNote', { number: demoNumber })}
            </span>
          </div>

          {/* Feature preview content */}
          <div className="space-y-6">
            {tier === 'PRO' && (
              <ProFeatures
                summary={DEMO_NUMBER_DETAIL.summary}
                trends={DEMO_NUMBER_DETAIL.trends}
                timeline={DEMO_NUMBER_DETAIL.timeline}
              />
            )}
            {tier === 'PREMIUM' && <PremiumFeatures numberDetail={DEMO_NUMBER_DETAIL} />}
          </div>
        </DialogBody>

        <DialogFooter className="flex-row items-center justify-between gap-3 border-t pt-4">
          <DialogClose asChild>
            <Button variant="ghost" size="sm">
              {t('general.close')}
            </Button>
          </DialogClose>

          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="gap-1">
              <SparklesIcon className="size-3" />
              {tier}
            </Badge>

            <Button
              variant="primary"
              size="sm"
              onClick={handleUpgrade}
              className={cn(isProTier && 'bg-primary-orange hover:bg-gold-dark')}
            >
              {t('subscription.upgrade.upgradeButton')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
