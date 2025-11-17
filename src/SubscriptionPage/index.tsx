import { Box, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ResponsiveHeader from '../shared/components/ResponsiveHeader';

export const SubscriptionPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 2 }}>
        <Paper elevation={12}>
          <ResponsiveHeader />
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              {t('subscription.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('subscription.comingSoon')}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
