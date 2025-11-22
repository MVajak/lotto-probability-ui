import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Interpretation, NumberStat } from '../../../types';
import { safeBig } from '../../../utils/calculations';
import { NumberStatCard } from '../NumberStatCard';
import { LottoNumbersDialogStyle } from '../types';

interface PositionGroupProps {
  position: string;
  stats: NumberStat[];
  positionIndex: number;
  maxFrequency: number;
  onStatClick: (stat: NumberStat) => void;
  style?: LottoNumbersDialogStyle;
}

const UnassignedPosition = 'unassigned';

export const PositionGroup: React.FC<PositionGroupProps> = ({
  position,
  stats,
  positionIndex,
  maxFrequency,
  onStatClick,
  style,
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 4 }}>
      {position !== UnassignedPosition ? (
        <Typography
          data-testid={`position-${positionIndex}-title`}
          sx={{
            px: 2,
            mb: 2,
            fontWeight: 700,
            fontSize: '1.1rem',
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {t('statisticsDrawer.position')}: {safeBig(position).plus(1).toNumber()}
        </Typography>
      ) : null}
      <Grid container spacing={2} sx={{ px: 2 }}>
        {stats.map((stat, statIndex) => {
          // Use backend's category if available, otherwise default to 'normal'
          const category: Interpretation['status'] = stat.interpretation?.status || 'normal';
          const normalizedFrequency = (stat.frequency / maxFrequency) * 100;

          return (
            <Grid key={`statistics-container-${positionIndex}-${statIndex}`} size={{ xs: 6, sm: 4, md: 3 }}>
              <NumberStatCard
                stat={stat}
                category={category}
                normalizedFrequency={normalizedFrequency}
                onClick={() => onStatClick(stat)}
                index={`dialog-${positionIndex}-${statIndex}`}
                style={style?.digitButton}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
