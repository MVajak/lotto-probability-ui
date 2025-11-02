import { Box } from '@mui/material';
import React from 'react';

import { AdSpace } from '../AdSpace';

/**
 * In-content ad wrapper that shows only on mobile/tablet devices
 * Use this between major content sections for better user experience
 */
export const InContentAd: React.FC = () => {
  return (
    <Box sx={{ display: { xs: 'block', lg: 'none' }, width: '100%' }}>
      <AdSpace position="in-content" />
    </Box>
  );
};
