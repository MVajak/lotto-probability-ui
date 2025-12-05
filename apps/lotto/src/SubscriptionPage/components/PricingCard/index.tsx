import type React from 'react';
import { useTranslation } from 'react-i18next';

import CheckIcon from '@mui/icons-material/Check';
import { Box, Button, Chip, Paper, Typography } from '@mui/material';

import type { SubscriptionTierCode } from '@/features/subscription';

interface PricingCardProps {
  tierCode: SubscriptionTierCode;
  price: string;
  features: string[];
  isHighlighted?: boolean;
  isCurrentPlan?: boolean;
  onSelect: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  tierCode,
  price,
  features,
  isHighlighted = false,
  isCurrentPlan = false,
  onSelect,
}) => {
  const { t } = useTranslation();

  // Map uppercase code to lowercase for translation keys
  const tierKey = tierCode.toLowerCase() as 'free' | 'pro' | 'premium';

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        background: '#fff',
        borderRadius: 3,
        border: isHighlighted ? '2px solid #f59e0b' : '1px solid #e5e7eb',
        boxShadow: isHighlighted ? '0 4px 20px rgba(245, 158, 11, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.08)',
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.25s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: isHighlighted ? '0 12px 32px rgba(245, 158, 11, 0.25)' : '0 8px 24px rgba(0, 0, 0, 0.12)',
        },
      }}
      onClick={onSelect}
    >
      {isHighlighted && (
        <Chip
          label={t('subscription.popular')}
          size="small"
          sx={{
            position: 'absolute',
            top: -12,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.7rem',
            letterSpacing: '0.3px',
          }}
        />
      )}

      <Typography
        variant="h6"
        sx={{
          color: 'text.primary',
          fontWeight: 600,
          mb: 0.5,
        }}
      >
        {t(`subscription.${tierKey}.name`)}
      </Typography>

      <Box sx={{ mb: 2.5 }}>
        <Typography
          component="span"
          sx={{
            color: isHighlighted ? '#d97706' : 'text.primary',
            fontWeight: 700,
            fontSize: '2rem',
            lineHeight: 1,
          }}
        >
          {price}
        </Typography>
        <Typography
          component="span"
          sx={{
            color: 'text.secondary',
            fontSize: '0.875rem',
            ml: 0.5,
          }}
        >
          {t('subscription.perMonth')}
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, mb: 2.5 }}>
        {features.map((feature) => (
          <Box
            key={feature}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1,
              mb: 1.25,
            }}
          >
            <CheckIcon
              sx={{
                color: isHighlighted ? '#f59e0b' : '#10b981',
                fontSize: '1.1rem',
                mt: 0.1,
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: '0.875rem',
                lineHeight: 1.5,
              }}
            >
              {feature}
            </Typography>
          </Box>
        ))}
      </Box>

      <Button
        variant={isHighlighted ? 'contained' : 'outlined'}
        fullWidth
        disabled={isCurrentPlan}
        sx={{
          py: 1.25,
          borderRadius: 8,
          fontWeight: 600,
          textTransform: 'none',
          fontSize: '0.9rem',
          ...(isCurrentPlan
            ? {
                borderColor: '#e5e7eb',
                color: 'text.disabled',
                '&.Mui-disabled': {
                  borderColor: '#e5e7eb',
                  color: 'text.disabled',
                },
              }
            : isHighlighted
              ? {
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  border: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                  },
                }
              : {
                  borderColor: '#d1d5db',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: '#9ca3af',
                    background: '#f9fafb',
                  },
                }),
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        {isCurrentPlan ? t('subscription.currentPlan') : t('subscription.choosePlan')}
      </Button>
    </Paper>
  );
};
