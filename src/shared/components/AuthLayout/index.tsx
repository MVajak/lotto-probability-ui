import type React from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Paper, Typography } from '@mui/material';

import { LotteryBalls } from './LotteryBalls';
import { StatisticalCurve } from './StatisticalCurve';

interface AuthLayoutProps {
  children: React.ReactNode;
  maxWidth?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, maxWidth = '400px' }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: { xs: 'center', md: 'flex-end' },
        // background: 'linear-gradient(135deg, #1a2a4e 0%, #2d4a7c 50%, #1a2a4e 100%)',
        backgroundImage: 'url(/img/lottery_login_clean.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Decorative elements - hidden on mobile */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        {/* Title and description - top left */}
        <Box
          sx={{
            position: 'absolute',
            top: '8%',
            left: '5%',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              color: 'white',
              mb: 1,
              fontSize: { md: '2rem', lg: '3rem' },
            }}
          >
            {t('authLayout.title')}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: 300,
              fontSize: { md: '1.1rem', lg: '1.25rem' },
            }}
          >
            {t('authLayout.subtitle')}
          </Typography>
        </Box>

        {/* Lottery balls positioned in upper-left area */}
        <Box
          sx={{
            position: 'absolute',
            top: '25%',
            left: '5%',
            width: '60%',
            maxWidth: '1200px',
          }}
        >
          <LotteryBalls width={1100} height={400} className="lottery-balls-svg" />
        </Box>

        {/* Statistical curve positioned at bottom */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '15%',
            left: '5%',
            width: '60%',
            maxWidth: '1200px',
          }}
        >
          <StatisticalCurve width={1100} height={150} startX={0} baseY={75} className="curve-svg" />
        </Box>

        {/* Bottom labels */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '8%',
            left: '5%',
          }}
        >
          <Typography
            sx={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: { md: '0.5rem', lg: '1rem' },
              fontWeight: 300,
            }}
          >
            {t('authLayout.features')}
          </Typography>
        </Box>
      </Box>

      <Paper
        elevation={1}
        sx={{
          p: '24px',
          width: '100%',
          maxWidth: { xs: '100%', md: maxWidth },
          boxShadow: { xs: 'none', md: '0px 2px 4px rgba(0, 0, 0, 0.1)' },
          m: '18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};
