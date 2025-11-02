import { Box, Paper, styled, Typography } from '@mui/material';
import React from 'react';

import { GoogleAd } from './GoogleAd';

interface AdSpaceProps {
  position: 'left' | 'right' | 'top-mobile' | 'in-content';
}

// Check if we should show placeholders or real ads
// Controlled by REACT_APP_SHOW_AD_PLACEHOLDERS environment variable
// Development (.env): true - shows placeholder ads
// Production (.env.production): false - shows real Google AdSense ads
const SHOW_PLACEHOLDER = process.env.REACT_APP_SHOW_AD_PLACEHOLDERS === 'true';

const SideAdContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5',
  height: '600px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'sticky',
  top: theme.spacing(2),
  border: '1px dashed #ccc',
}));

const MobileBannerAdContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: '#f5f5f5',
  minHeight: '70px', // 50px ad + padding to prevent layout shift
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px dashed #ccc',
  marginBottom: theme.spacing(2),
}));

const InContentAdContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0.5),
  backgroundColor: '#f5f5f5',
  minHeight: '100px', // Compact height to avoid taking too much screen space
  maxHeight: '120px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px dashed #ccc',
  margin: `${theme.spacing(3)} 0`,
}));

export const AdSpace: React.FC<AdSpaceProps> = ({ position }) => {
  // Render placeholder ads for development/testing
  if (SHOW_PLACEHOLDER) {
    if (position === 'top-mobile') {
      return (
        <MobileBannerAdContainer elevation={0}>
          <Typography variant="caption" color="text.secondary" gutterBottom>
            Advertisement
          </Typography>
          <Box
            sx={{
              width: '100%',
              maxWidth: '320px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#e0e0e0',
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Mobile Banner
              <br />
              320x50
            </Typography>
          </Box>
        </MobileBannerAdContainer>
      );
    }

    if (position === 'in-content') {
      return (
        <InContentAdContainer elevation={0}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#e0e0e0',
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Advertisement - In-Content (320x100)
            </Typography>
          </Box>
        </InContentAdContainer>
      );
    }

    return (
      <SideAdContainer elevation={0}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Advertisement
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#e0e0e0',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {position === 'left' ? 'Left Ad Space' : 'Right Ad Space'}
            <br />
            300x600
          </Typography>
        </Box>
      </SideAdContainer>
    );
  }

  // Render real ads for production
  if (position === 'top-mobile') {
    return (
      <MobileBannerAdContainer elevation={0}>
        <GoogleAd
          slot={process.env.REACT_APP_ADSENSE_MOBILE_SLOT || '1234567890'}
          format="horizontal"
          responsive
        />
      </MobileBannerAdContainer>
    );
  }

  if (position === 'in-content') {
    return (
      <InContentAdContainer elevation={0}>
        <GoogleAd
          slot={process.env.REACT_APP_ADSENSE_INCONTENT_SLOT || '0987654321'}
          format="horizontal"
          responsive
        />
      </InContentAdContainer>
    );
  }

  return (
    <SideAdContainer elevation={0}>
      <GoogleAd slot={process.env.REACT_APP_ADSENSE_SIDEBAR_SLOT || '1122334455'} format="vertical" />
    </SideAdContainer>
  );
};
