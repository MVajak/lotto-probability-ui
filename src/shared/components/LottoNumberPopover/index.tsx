import { Grid, Popover, Typography } from '@mui/material';
import React, { useState } from 'react';

import { convertToPercentage } from '../../utils/calculations';
import { LottoNumber } from '../LottoNumber';
import { LottoNumberPopoverProps } from './types';

export const LottoNumberPopover = ({
  index,
  probability,
  digit,
  count,
  leftoverNumbers,
  style,
}: LottoNumberPopoverProps): React.JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? `popover-${index}` : '';
  const showBadge = Boolean(leftoverNumbers?.length);

  return (
    <>
      <LottoNumber
        digit={digit}
        index={id}
        onClick={handleClick}
        showBadge={showBadge}
        style={{ cursor: 'help', ...style }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Grid sx={{ p: 1, maxWidth: '416px' }}>
          <Grid container data-testid={`count-${id}-statistics`}>
            <Typography sx={{ p: 0.25, fontWeight: 600 }}>Count: </Typography>
            <Typography sx={{ p: 0.25 }}>{count}</Typography>
          </Grid>
          <Grid container data-testid={`probability-${id}-statistics`}>
            <Typography sx={{ p: 0.25, fontWeight: 600 }}>Probability: </Typography>
            <Typography sx={{ p: 0.25 }}>{convertToPercentage(probability)}</Typography>
          </Grid>
          {leftoverNumbers?.length ? (
            <Grid>
              <Typography sx={{ p: 0.25, fontWeight: 600 }}>Numbers with same probability:</Typography>
              <Grid>
                {leftoverNumbers.map((stat, numberIndex) => (
                  <LottoNumber key={numberIndex} digit={stat.digit} style={style} />
                ))}
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Popover>
    </>
  );
};
