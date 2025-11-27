import type React from 'react';
import { useTranslation } from 'react-i18next';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { Box, Card, CardContent, Chip, LinearProgress, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

import { CATEGORY_COLORS } from '../../../constants';
import type { Interpretation, NumberStat } from '../../../types';
import { convertToPercentage } from '../../../utils/calculations';
import { LottoNumber } from '../../LottoNumber';

interface NumberStatCardProps {
  stat: NumberStat;
  category: Interpretation['status'];
  normalizedFrequency: number;
  onClick: () => void;
  index: string;
  style?: SxProps<Theme>;
}

// Helper function to get gradient background based on probability
const getCardGradient = (category: Interpretation['status']): string => {
  return CATEGORY_COLORS[category].gradient;
};

// Helper function to get border color based on probability
const getBorderColor = (category: Interpretation['status']): string => {
  return CATEGORY_COLORS[category].border;
};

// Helper function to get border hover color
const getBorderHoverColor = (category: Interpretation['status']): string => {
  return CATEGORY_COLORS[category].borderHover;
};

// Helper function to get progress bar color
const getProgressColor = (category: Interpretation['status']): string => {
  return CATEGORY_COLORS[category].primary;
};

export const NumberStatCard: React.FC<NumberStatCardProps> = ({
  stat,
  category,
  normalizedFrequency,
  onClick,
  index,
  style,
}) => {
  const { t } = useTranslation();

  const getCategoryLabel = (cat: Interpretation['status']): string => {
    switch (cat) {
      case 'frequent':
        return t('numberStats.frequent');
      case 'rare':
        return t('numberStats.rare');
      default:
        return t('numberStats.normal');
    }
  };

  return (
    <Card
      onClick={onClick}
      sx={{
        position: 'relative',
        background: getCardGradient(category),
        border: 1.5,
        borderColor: getBorderColor(category),
        borderRadius: 3,
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'visible',
        '&:hover': {
          transform: 'translateY(-4px) scale(1.02)',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
          borderColor: getBorderHoverColor(category),
        },
        '&:active': {
          transform: 'translateY(-2px) scale(1.01)',
        },
      }}
    >
      {/* Frequent/Rare Badge */}
      {(category === 'frequent' || category === 'rare') && (
        <Chip
          icon={category === 'frequent' ? <LocalFireDepartmentIcon /> : <AcUnitIcon />}
          label={getCategoryLabel(category)}
          size="small"
          sx={{
            position: 'absolute',
            top: -10,
            right: 8,
            height: 24,
            fontSize: '0.7rem',
            fontWeight: 700,
            bgcolor: CATEGORY_COLORS[category].primary,
            color: 'white',
            boxShadow: 2,
            zIndex: 1,
            '& .MuiChip-icon': {
              color: 'white',
              fontSize: '0.9rem',
            },
          }}
        />
      )}

      <CardContent sx={{ p: 1.5, pb: '12px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <LottoNumber digit={stat.digit} index={index} style={style} />
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: '1.25rem',
                color: 'text.primary',
                mb: 0.5,
              }}
            >
              {convertToPercentage(stat.frequency)}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            >
              {stat.count} {t('general.count').toLowerCase()}
            </Typography>
          </Box>
        </Box>

        {/* Probability Progress Bar */}
        <LinearProgress
          variant="determinate"
          value={normalizedFrequency}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: 'rgba(0, 0, 0, 0.08)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 3,
              transition: 'transform 0.4s ease-in-out',
              bgcolor: getProgressColor(category),
            },
          }}
        />
      </CardContent>
    </Card>
  );
};
