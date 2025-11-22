import { Box, Chip } from '@mui/material';
import React, { useState } from 'react';

import { LottoNumber } from '../LottoNumber';
import { LottoNumberDrawer } from '../LottoNumberDrawer';
import { LottoNumberGroupProps } from './types';

export const LottoNumberGroup = ({ numbers, index, style }: LottoNumberGroupProps): React.JSX.Element => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedNumberIndex, setSelectedNumberIndex] = useState(0);

  if (numbers.length === 0) {
    return <></>;
  }

  // If only one number, display it normally
  if (numbers.length === 1) {
    return (
      <>
        <LottoNumber
          digit={numbers[0].digit}
          index={`single-${index}`}
          onClick={() => {
            setSelectedNumberIndex(0);
            setDrawerOpen(true);
          }}
          style={style}
        />
        <LottoNumberDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          numberStat={numbers[selectedNumberIndex]}
          relatedNumbers={[]}
        />
      </>
    );
  }

  // Multiple numbers with same frequency - show compact group
  return (
    <>
      <Box
        sx={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
          margin: '4px',
          verticalAlign: 'top',
        }}
      >
        {/* Grouped numbers in a compact horizontal layout */}
        <Box
          sx={{
            display: 'flex',
            gap: 0.5,
            padding: '4px',
            borderRadius: '24px',
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
            border: '2px dashed rgba(25, 118, 210, 0.3)',
          }}
        >
          {numbers.map((num, idx) => (
            <LottoNumber
              key={idx}
              digit={num.digit}
              index={`group-${index}-${idx}`}
              onClick={() => {
                setSelectedNumberIndex(idx);
                setDrawerOpen(true);
              }}
              style={{ margin: 0, ...style }}
            />
          ))}
        </Box>

        {/* Small label indicating they're tied */}
        <Chip
          label={`Tied (${numbers.length})`}
          size="small"
          sx={{
            height: '18px',
            fontSize: '0.65rem',
            backgroundColor: 'rgba(25, 118, 210, 0.12)',
            color: 'primary.main',
            fontWeight: 600,
            '& .MuiChip-label': {
              padding: '0 6px',
            },
          }}
        />
      </Box>
      <LottoNumberDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        numberStat={numbers[selectedNumberIndex]}
        relatedNumbers={numbers.filter((_, idx) => idx !== selectedNumberIndex)}
      />
    </>
  );
};
