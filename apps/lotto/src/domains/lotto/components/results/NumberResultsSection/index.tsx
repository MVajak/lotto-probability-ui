import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@lotto/ui';

import { LottoNumbersDialog } from '@/domains/lotto';

import type { NumberResultsSectionProps } from './types';

export const NumberResultsSection = ({
  children,
  allNumberStats,
  titleKey,
  isSecondaryNumbers = false,
}: NumberResultsSectionProps): React.JSX.Element => {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="col-span-12">
      <h3 className="mb-2 text-foreground text-title-small-bold">{t(titleKey)}</h3>
      <div className="mb-3">{children}</div>
      <Button variant="ghost" size="sm" onClick={() => setIsDialogOpen(true)}>
        {t('result.seeMore')}
      </Button>
      <LottoNumbersDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        numberStats={allNumberStats}
        isSecondaryNumbers={isSecondaryNumbers}
      />
    </div>
  );
};
