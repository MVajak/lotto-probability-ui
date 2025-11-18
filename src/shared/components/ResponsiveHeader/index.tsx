import { Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '../../types';
import { UserMenu } from '../UserMenu';

function ResponsiveHeader() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(pageRoutes.Home);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#00347f' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, cursor: 'pointer' }}
            onClick={handleLogoClick}
          >
            <img src="/img/logo_lotto.png" alt="Lotto Logo" style={{ maxWidth: '50px', height: 'auto' }} />
          </Grid>
          <Typography
            variant="h6"
            noWrap
            onClick={handleLogoClick}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOTTO
          </Typography>

          <Grid
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, cursor: 'pointer' }}
            onClick={handleLogoClick}
          >
            <img src="/img/logo_lotto.png" alt="Lotto Logo" style={{ maxWidth: '50px', height: 'auto' }} />
          </Grid>
          <Typography
            variant="h5"
            noWrap
            onClick={handleLogoClick}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOTTO
          </Typography>
          <Grid sx={{ display: 'flex', my: 1 }}>
            <UserMenu />
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveHeader;
