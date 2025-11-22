import React, { useState } from 'react';

import { LottoNumber } from '../LottoNumber';
import { LottoNumberDialog } from '../LottoNumberDialog';
import { LottoNumberButtonProps } from './types';

export const LottoNumberButton = ({
  index,
  frequency,
  digit,
  count,
  leftoverNumbers,
  style,
  numberStat,
}: LottoNumberButtonProps): React.JSX.Element => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleClick = (): void => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = (): void => {
    setDrawerOpen(false);
  };

  // Construct a full NumberStat object
  const fullNumberStat = numberStat || {
    position: null,
    digit,
    count,
    frequency,
  };

  return (
    <>
      <LottoNumber
        digit={digit}
        index={`drawer-trigger-${index}`}
        onClick={handleClick}
        style={style}
      />
      <LottoNumberDialog
        open={drawerOpen}
        onClose={handleDrawerClose}
        numberStat={fullNumberStat}
        relatedNumbers={leftoverNumbers}
      />
    </>
  );
};
