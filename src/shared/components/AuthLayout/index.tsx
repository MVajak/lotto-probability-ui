import { Box, Container, Paper } from '@mui/material';
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, maxWidth = 'sm' }) => {
  return (
    <Container maxWidth={maxWidth}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 3,
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          {children}
        </Paper>
      </Box>
    </Container>
  );
};
