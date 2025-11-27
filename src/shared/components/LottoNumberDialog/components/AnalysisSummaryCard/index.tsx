import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';

import { CATEGORY_COLORS } from '../../../../constants';
import type { NumberStat } from '../../../../types';

interface AnalysisSummaryCardProps {
  numberStat: NumberStat;
}

export const AnalysisSummaryCard: React.FC<AnalysisSummaryCardProps> = ({ numberStat }) => {
  const { t } = useTranslation();

  if (!numberStat.interpretation) return null;

  const isMoreFrequent = numberStat.interpretation.percentDifference > 0;
  const hasDeviation = numberStat.interpretation.percentDifference !== 0;

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
              bgcolor: 'warning.50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LightbulbIcon sx={{ fontSize: 20, color: 'warning.light' }} />
          </Box>
          <Typography variant="h6" fontWeight="bold">
            {t('numberStats.analysisSummary')}
          </Typography>
        </Stack>

        {/* Appearance count with modern styling */}
        <Box
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 2,
            bgcolor: 'grey.50',
            border: '1px solid',
            borderColor: 'grey.200',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.6,
              '& strong': {
                color: 'primary.main',
                fontSize: '1.1em',
              },
            }}
            dangerouslySetInnerHTML={{
              __html: t('numberStats.appearedTimes', {
                count: numberStat.interpretation.appearedCount,
                total: numberStat.interpretation.totalDraws,
              }),
            }}
          />
        </Box>

        {/* Deviation highlight with icon */}
        {hasDeviation && (
          <Box
            sx={{
              p: 2.5,
              borderRadius: 2,
              bgcolor: isMoreFrequent ? 'error.50' : 'info.50',
              border: 2,
              borderColor: isMoreFrequent ? 'error.200' : 'info.200',
              position: 'relative',
              boxShadow: `0 4px 12px ${isMoreFrequent ? 'rgba(211, 47, 47, 0.1)' : 'rgba(2, 136, 209, 0.1)'}`,
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <Box
                sx={{
                  mt: 0.5,
                  p: 0.75,
                  borderRadius: 1,
                  bgcolor: isMoreFrequent ? 'error.100' : 'info.100',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isMoreFrequent ? (
                  <TrendingUpIcon sx={{ fontSize: 20, color: 'error.dark' }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: 20, color: 'info.dark' }} />
                )}
              </Box>
              <Typography
                variant="body1"
                fontWeight="600"
                sx={{
                  flex: 1,
                  lineHeight: 1.6,
                  '& span': {
                    display: 'inline-block',
                  },
                }}
                dangerouslySetInnerHTML={{
                  __html: isMoreFrequent
                    ? t('numberStats.appearingMoreThanExpected', {
                        color: CATEGORY_COLORS.frequent.primary,
                        percent: numberStat.interpretation.percentDifference,
                      })
                    : t('numberStats.appearingLessThanExpected', {
                        color: CATEGORY_COLORS.rare.primary,
                        percent: Math.abs(numberStat.interpretation.percentDifference),
                      }),
                }}
              />
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
