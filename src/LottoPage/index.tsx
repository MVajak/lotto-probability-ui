import { Box, Container, Grid, styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import React from 'react';

import ResponsiveHeader from '../shared/components/ResponsiveHeader';
import { LottoPageProps } from './types';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  lineHeight: '60px',
}));

export const LottoPage = ({ children }: LottoPageProps) => {
  return (
    <Container maxWidth="lg">
      <Box>
        <Grid container sx={{ xs: 12 }}>
          <Item elevation={12}>
            <ResponsiveHeader />
            {children}
          </Item>
        </Grid>
      </Box>
    </Container>
  );
};
