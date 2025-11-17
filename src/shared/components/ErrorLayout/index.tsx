import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorLayoutProps {
  title: string;
  message?: string;
  actionLabel?: string;
  actionPath?: string;
}

export const ErrorLayout: React.FC<ErrorLayoutProps> = ({ title, message, actionLabel, actionPath }) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (actionPath) {
      navigate(actionPath);
    }
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <ErrorOutlineIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
      <Typography variant="h4" component="h1" gutterBottom color="error">
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {message}
      </Typography>
      {actionLabel && actionPath && (
        <Button variant="contained" size="large" onClick={handleAction}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};
