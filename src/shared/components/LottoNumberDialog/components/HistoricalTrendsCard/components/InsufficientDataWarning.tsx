import type React from 'react';

import { Box, Typography } from '@mui/material';

interface InsufficientDataWarningProps {
  title: string;
  message: string;
}

export const InsufficientDataWarning: React.FC<InsufficientDataWarningProps> = ({ title, message }) => {
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: 'warning.50',
        borderRadius: 1,
        border: '1px dashed',
        borderColor: 'warning.main',
      }}
    >
      <Typography variant="body2" color="text.secondary" fontWeight="600" gutterBottom>
        {title}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};
