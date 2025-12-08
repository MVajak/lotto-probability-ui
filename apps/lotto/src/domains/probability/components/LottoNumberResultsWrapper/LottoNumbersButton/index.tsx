import type React from 'react';
import { useCallback, useState } from 'react';

import { Button } from '@lotto/ui';

import { LottoNumbersDialog } from '@/domains/lotto';

import type { LottoNumbersButtonProps } from './types';

export const LottoNumbersButton = ({ buttonText, numberStats }: LottoNumbersButtonProps): React.JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleDialogOpen = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return (
    <div>
      <Button variant="ghost" onClick={handleDialogOpen}>
        {buttonText}
      </Button>
      <LottoNumbersDialog isOpen={isDialogOpen} onClose={handleDialogClose} numberStats={numberStats} />
    </div>
  );
};
