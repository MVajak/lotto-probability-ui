import type React from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Typography } from '@mui/material';

interface SuccessLayoutProps {
  title: string;
  message?: string;
}

export const SuccessLayout: React.FC<SuccessLayoutProps> = ({ title, message }) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <CheckCircleOutlineIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
      <Typography variant="h4" component="h1" gutterBottom color="success.main">
        {title}
      </Typography>
      {message && (
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
};
