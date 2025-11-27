import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Chip, IconButton, Tooltip } from '@mui/material';

import type { NumberStat } from '../../types';
import { findRelatedNumbers } from '../../utils/numberGrouping';
import { LottoNumber } from '../LottoNumber';
import { LottoNumberDialog } from '../LottoNumberDialog';
import type { LottoNumberGroupProps } from './types';

export const LottoNumberGroup = ({ numbers, index, style, maxVisible }: LottoNumberGroupProps): React.JSX.Element => {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedNumberIndex, setSelectedNumberIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  if (numbers.length === 0) {
    return <></>;
  }

  // Handle clicking a related number in the dialog
  const handleNumberChange = (newStat: NumberStat) => {
    const newIndex = numbers.findIndex((n) => n.digit === newStat.digit);
    if (newIndex !== -1) {
      setSelectedNumberIndex(newIndex);
    }
  };

  // Determine how many numbers to show
  const shouldShowExpandButton = maxVisible && numbers.length > maxVisible;
  const initialNumbers = shouldShowExpandButton ? numbers.slice(0, maxVisible) : numbers;
  const hiddenNumbers = shouldShowExpandButton ? numbers.slice(maxVisible) : [];
  const hiddenCount = hiddenNumbers.length;

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
        <LottoNumberDialog
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          numberStat={numbers[selectedNumberIndex]}
          relatedNumbers={[]}
          onNumberChange={handleNumberChange}
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
            padding: '3px',
            borderRadius: '24px',
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
            border: '2px dashed rgba(25, 118, 210, 0.3)',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {/* Always visible numbers */}
          {initialNumbers.map((num, idx) => (
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

          {/* Collapsible hidden numbers */}
          {shouldShowExpandButton &&
            hiddenNumbers.length > 0 &&
            isExpanded &&
            hiddenNumbers.map((num, idx) => (
              <LottoNumber
                key={idx + initialNumbers.length}
                digit={num.digit}
                index={`group-${index}-${idx + initialNumbers.length}`}
                onClick={() => {
                  setSelectedNumberIndex(idx + initialNumbers.length);
                  setDrawerOpen(true);
                }}
                style={{
                  margin: 0,
                  animation: 'fadeIn 0.1s ease-in-out',
                  '@keyframes fadeIn': {
                    '0%': {
                      opacity: 0,
                    },
                    '100%': {
                      opacity: 1,
                    },
                  },
                  ...style,
                }}
              />
            ))}

          {/* Show expand/collapse button if there are hidden numbers */}
          {shouldShowExpandButton && (
            <Tooltip
              title={isExpanded ? t('general.showLess') : t('general.showMoreTiedNumbers', { count: hiddenCount })}
            >
              <IconButton
                size="small"
                onClick={() => setIsExpanded(!isExpanded)}
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: 'rgba(25, 118, 210, 0.15)',
                  transition: 'transform 0.3s ease-in-out',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.25)',
                  },
                }}
              >
                <ExpandMoreIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* Small label indicating they're tied */}
        <Chip
          label={`${t('general.tied')} (${numbers.length})`}
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
      <LottoNumberDialog
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        numberStat={numbers[selectedNumberIndex]}
        relatedNumbers={findRelatedNumbers(numbers[selectedNumberIndex], numbers)}
        onNumberChange={handleNumberChange}
      />
    </>
  );
};
