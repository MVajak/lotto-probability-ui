import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Drawer, Grid, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import groupBy from 'lodash/groupBy';
import React, { useCallback } from 'react';

import { convertToPercentage, safeBig } from '../../utils/calculations';
import { LottoNumber } from '../LottoNumber';
import { LottoDrawerProps } from './types';

const UnassignedPosition = 'unassigned';

export const LottoDrawer = ({ isOpen, onClose, numberStats, style }: LottoDrawerProps): React.JSX.Element => {
  const numberStatsByPositions = groupBy(numberStats, (stat) => stat.position ?? UnassignedPosition);
  const handleDrawerClose = useCallback((): void => {
    onClose();
  }, [onClose]);

  return (
    <Drawer
      open={isOpen}
      onClose={handleDrawerClose}
      anchor={'right'}
      slotProps={{ paper: { sx: { width: '300px' } } }}
      data-testid="lotto-drawer"
    >
      <Grid container sx={{ p: 1 }}>
        <Grid container sx={{ p: 1 }}>
          <Typography data-testid="number-statistics-title" variant={'h6'} sx={{ p: 0.25, fontWeight: 600 }}>
            All number statistics:
          </Typography>
          <IconButton onClick={handleDrawerClose} data-testid="drawer-close-button">
            <ArrowForwardIcon />
          </IconButton>
        </Grid>
        {Object.entries(numberStatsByPositions).map(([position, stats], positionIndex) => (
          <Grid key={`position-container-${positionIndex}`} size={{ xs: 12 }}>
            {position !== UnassignedPosition ? (
              <Typography data-testid={`position-${positionIndex}-title`} sx={{ p: 0.25, fontWeight: 600 }}>
                Position: {safeBig(position).plus(1).toNumber()}
              </Typography>
            ) : null}
            {stats.map((stat, statIndex) => (
              <Grid
                container
                key={`statistics-container-${positionIndex}-${statIndex}`}
                size={{ xs: 12 }}
                sx={{
                  alignItems: 'center',
                  p: 1,
                }}
              >
                <LottoNumber index={`${positionIndex}-${statIndex}`} digit={stat.digit} style={style?.digitButton} />
                <Grid sx={{ paddingLeft: 2 }}>
                  <Grid container data-testid={`count-${positionIndex}-${statIndex}-statistics`}>
                    <Typography sx={{ p: 0.25, fontWeight: 600 }}>Count: </Typography>
                    <Typography sx={{ p: 0.25 }}>{stat.count}</Typography>
                  </Grid>
                  <Grid container data-testid={`probability-${positionIndex}-${statIndex}-statistics`}>
                    <Typography sx={{ p: 0.25, fontWeight: 600 }}>Probability: </Typography>
                    <Typography sx={{ p: 0.25 }}>{convertToPercentage(stat.probability)}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Drawer>
  );
};
