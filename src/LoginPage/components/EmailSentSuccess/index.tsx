import type React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Alert, Box, Button, Typography } from '@mui/material';

interface EmailSentSuccessProps {
  email: string;
  onBack: () => void;
}

export const EmailSentSuccess: React.FC<EmailSentSuccessProps> = ({ email, onBack }) => {
  const { t } = useTranslation();

  return (
    <Box className="animate-fade-in">
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src="/img/logo_lotto.png"
          alt="Lotto Logo"
          style={{ maxWidth: '120px', height: 'auto', padding: '16px' }}
        />
      </Box>
      <Typography variant="h5" component="h5" gutterBottom align="center">
        {t('login.checkYourInbox')}
      </Typography>
      <Box sx={{ mt: 3, px: 2 }}>
        <Alert
          severity="success"
          sx={{
            mb: 2,
            display: 'flex',
            justifyContent: 'center',
            '& .MuiAlert-icon': {
              marginRight: 1,
            },
          }}
        >
          <Trans i18nKey="login.sentToEmail" values={{ email }} components={{ strong: <strong /> }} />
        </Alert>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 3 }}>
          {t('login.checkYourEmail')}
        </Typography>
        <Button variant="outlined" fullWidth onClick={onBack}>
          {t('login.back')}
        </Button>
      </Box>
    </Box>
  );
};
