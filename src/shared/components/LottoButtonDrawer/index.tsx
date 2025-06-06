import { Button, Grid } from '@mui/material';
import React, { useCallback, useState } from 'react';

import { LottoDrawer } from '../LottoDrawer';
import { LottoButtonDrawerProps } from './types';

export const LottoButtonDrawer = ({ buttonText, numberStats }: LottoButtonDrawerProps): React.JSX.Element => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleMainDrawerOpen = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleMainDrawerClose = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return (
    <Grid>
      <Button onClick={handleMainDrawerOpen} sx={{ textTransform: 'capitalize' }}>
        {buttonText}
      </Button>
      <LottoDrawer isOpen={isDrawerOpen} onClose={handleMainDrawerClose} numberStats={numberStats} />
    </Grid>
  );
};
