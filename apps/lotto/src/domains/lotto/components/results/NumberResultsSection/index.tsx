import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@lotto/ui';

import { LottoNumbersDialog } from '../../LottoNumbersDialog';
import type { NumberResultsSectionProps } from './types';

export const NumberResultsSection = ({
  children,
  allNumberStats,
  titleKey,
}: NumberResultsSectionProps): React.JSX.Element => {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="col-span-12">
      <p className="px-2 py-4 text-title-small-bold">{t(titleKey)}</p>
      {children}
      <Button variant="ghost" className="block" onClick={() => setIsDialogOpen(true)}>
        {t('result.seeMore')}
      </Button>
      <LottoNumbersDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} numberStats={allNumberStats} />
    </div>
  );
};
