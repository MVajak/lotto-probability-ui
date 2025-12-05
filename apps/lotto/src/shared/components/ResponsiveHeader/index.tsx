import { useNavigate } from 'react-router-dom';

import { Box, Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { pageRoutes } from '../../types';
import { UserMenu } from '../UserMenu';

function ResponsiveHeader() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(pageRoutes.Home);
  };

  return (
    <AppBar
      position="static"
      elevation={12}
      sx={{
        background: 'linear-gradient(135deg, #00347f 0%, #004ba3 100%)',
        borderRadius: 3,
        mb: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
      }}
    >
      <Paper elevation={8} sx={{ bgcolor: 'transparent', borderRadius: 3, color: 'inherit' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Grid
              sx={{
                display: { xs: 'none', md: 'flex' },
                mr: 1,
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
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
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease-in-out',
                '&:hover': {
                  opacity: 0.85,
                },
              }}
            >
              LOTTO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />

            <Grid
              sx={{
                display: { xs: 'flex', md: 'none' },
                mr: 1,
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
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
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease-in-out',
                '&:hover': {
                  opacity: 0.85,
                },
              }}
            >
              LOTTO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} />
            <Grid sx={{ display: 'flex', my: 1 }}>
              <UserMenu />
            </Grid>
          </Toolbar>
        </Container>
      </Paper>
    </AppBar>
  );
}
export default ResponsiveHeader;
