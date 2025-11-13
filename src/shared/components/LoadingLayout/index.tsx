import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

interface LoadingLayoutProps {
  title: string;
  message?: string;
}

export const LoadingLayout: React.FC<LoadingLayoutProps> = ({ title, message }) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <CircularProgress size={64} sx={{ mb: 2 }} />
      <Typography variant="h5" component="h1" gutterBottom>
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
