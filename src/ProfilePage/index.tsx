import { Box, Container, Paper, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';

import ResponsiveHeader from '../shared/components/ResponsiveHeader';

export const ProfilePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 2 }}>
        <Paper elevation={12}>
          <ResponsiveHeader />
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              {t('profile.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('profile.comingSoon')}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
