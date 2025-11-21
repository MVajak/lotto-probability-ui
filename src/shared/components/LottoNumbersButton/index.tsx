import { Button, Grid } from '@mui/material';
import React, { useCallback, useState } from 'react';

import { LottoNumbersDialog } from '../LottoNumbersDialog';
import { LottoNumbersButtonProps } from './types';

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
      <Button onClick={handleDialogOpen}>
        {buttonText}
      </Button>
      <LottoNumbersDialog isOpen={isDialogOpen} onClose={handleDialogClose} numberStats={numberStats} style={style} />
    </Grid>
  );
};
