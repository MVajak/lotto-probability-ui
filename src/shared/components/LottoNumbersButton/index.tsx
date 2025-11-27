import type React from 'react';
import { useCallback, useState } from 'react';

import { Button, Grid } from '@mui/material';

import { LottoNumbersDialog } from '../LottoNumbersDialog';
import type { LottoNumbersButtonProps } from './types';

export const LottoNumbersButton = ({ buttonText, numberStats, style }: LottoNumbersButtonProps): React.JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleDialogOpen = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return (
    <Grid>
      <Button onClick={handleDialogOpen}>{buttonText}</Button>
      <LottoNumbersDialog isOpen={isDialogOpen} onClose={handleDialogClose} numberStats={numberStats} style={style} />
    </Grid>
  );
};
