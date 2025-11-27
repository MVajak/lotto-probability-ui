import LinkIcon from '@mui/icons-material/Link';
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';

import type { NumberStat } from '../../../../types';
import { LottoNumber } from '../../../LottoNumber';

interface RelatedNumbersCardProps {
  relatedNumbers: NumberStat[];
  onNumberClick?: (numberStat: NumberStat) => void;
}

export const RelatedNumbersCard: React.FC<RelatedNumbersCardProps> = ({ relatedNumbers, onNumberClick }) => {
  const { t } = useTranslation();

  if (relatedNumbers.length === 0) return null;

  return (
    <Card
      elevation={2}
      sx={{
        height: '100%',
        bgcolor: 'background.paper',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
          <Box
            sx={{
              p: 0.75,
              borderRadius: 1.5,
              bgcolor: 'primary.50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LinkIcon sx={{ fontSize: 20, color: 'primary.main' }} />
          </Box>
          <Typography variant="h6" fontWeight="bold">
            {t('result.numbersWithSameProbability')}
          </Typography>
        </Stack>

        <Chip
          label={`${relatedNumbers.length} ${relatedNumbers.length === 1 ? t('general.number') : t('general.numbers')}`}
          size="small"
          sx={{
            mb: 2,
            fontWeight: 600,
            bgcolor: 'primary.50',
            color: 'primary.dark',
            borderRadius: 1,
          }}
        />

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1.5,
            p: 2,
            borderRadius: 2,
            bgcolor: 'grey.50',
            border: '1px solid',
            borderColor: 'grey.200',
          }}
        >
          {relatedNumbers.map((stat, index) => (
            <LottoNumber
              key={index}
              digit={stat.digit}
              index={`related-dialog-${index}`}
              onClick={onNumberClick ? () => onNumberClick(stat) : undefined}
              style={{
                cursor: onNumberClick ? 'pointer' : 'default',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': onNumberClick
                  ? {
                      transform: 'scale(1.1)',
                    }
                  : {},
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
