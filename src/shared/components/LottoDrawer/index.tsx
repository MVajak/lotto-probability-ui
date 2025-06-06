import { Drawer, Grid, Typography } from '@mui/material';
import groupBy from 'lodash/groupBy';
import React from 'react';

import { convertToPercentage, safeBig } from '../../utils/calculations';
import { LottoNumber } from '../LottoNumber';
import { LottoDrawerProps } from './types';

const UnassignedPosition = 'unassigned';

export const LottoDrawer = ({ isOpen, onClose, numberStats }: LottoDrawerProps): React.JSX.Element => {
  const numberStatsByPositions = groupBy(numberStats, (stat) => stat.position ?? UnassignedPosition);
  const handleDrawerClose = () => {
    onClose();
  };

  return (
    <Drawer
      open={isOpen}
      onClose={handleDrawerClose}
      anchor={'right'}
      slotProps={{ paper: { sx: { width: '280px' } } }}
    >
      <Grid container sx={{ p: 1 }}>
        <Grid sx={{ p: 1 }}>
          <Typography variant={'h6'} sx={{ p: 0.25, fontWeight: 600 }}>
            All number statistics:
          </Typography>
        </Grid>
        {Object.entries(numberStatsByPositions).map(([position, stats], key) => (
          <Grid key={`position-container-${key}`} size={{ xs: 12 }}>
            {position !== UnassignedPosition ? (
              <Typography sx={{ p: 0.25, fontWeight: 600 }}>
                Position: {safeBig(position).plus(1).toNumber()}
              </Typography>
            ) : null}
            {stats.map((stat, index) => (
              <Grid
                container
                key={`statistics-container-${index}`}
                size={{ xs: 12 }}
                sx={{
                  alignItems: 'center',
                  p: 1,
                }}
              >
                <LottoNumber index={key} digit={stat.digit} />
                <Grid sx={{ paddingLeft: 2 }}>
                  <Grid container>
                    <Typography sx={{ p: 0.25, fontWeight: 600 }}>Count: </Typography>
                    <Typography sx={{ p: 0.25 }}>{stat.count}</Typography>
                  </Grid>
                  <Grid container>
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
