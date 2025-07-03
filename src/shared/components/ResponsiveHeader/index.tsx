import MenuIcon from '@mui/icons-material/Menu';
import { Divider, FormControl, Grid, Select, SelectChangeEvent } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import i18n from 'i18next';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Locale } from '../../../locales/types';
import { PageName, pageRoutes } from '../../types';
import FlagEstonia from './assets/flag_estonia.svg';
import FlagUK from './assets/flag_united_kingdom.svg';
import LottoLogo from './assets/logo.png';

const pages: PageName[] = ['Eurojackpot', 'VikingLotto', 'Bingo', 'Keno', 'Jokker'];

function ResponsiveHeader() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [language, setLanguage] = React.useState<Locale>(Locale.ET);

  const navigate = useNavigate();

  const handleNavClick = (page: PageName) => {
    handleCloseNavMenu();
    navigate(pageRoutes[page]);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLanguageChange = async (event: SelectChangeEvent) => {
    const changedLanguage: Locale = event.target.value as Locale;

    await i18n.changeLanguage(changedLanguage);
    setLanguage(changedLanguage);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#00347f' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <img src={LottoLogo} alt="Lotto Logo" width={50} height={50} />
          </Grid>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOTTO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleNavClick(page)}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
              <Divider textAlign="center" />
              <Grid sx={{ display: { xs: 'flex', md: 'none', justifyContent: 'center' } }}>
                <FormControl sx={{ my: 1 }} size="small">
                  <Select
                    labelId="select-language-label"
                    id="select-language"
                    value={language}
                    onChange={handleLanguageChange}
                  >
                    <MenuItem value={Locale.ET}>
                      <img src={FlagEstonia} alt="ET" width={25} height={15} />
                    </MenuItem>
                    <MenuItem value={Locale.EN}>
                      <img src={FlagUK} alt="EN" width={25} height={15} />
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Menu>
          </Box>
          <Grid sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <img src={LottoLogo} alt="Lotto Logo" width={50} height={50} />
          </Grid>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page} onClick={() => handleNavClick(page)} sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box>
          <Grid sx={{ display: { xs: 'none', md: 'flex' } }}>
            <FormControl sx={{ my: 1, width: '100%' }} size="small">
              <Select
                labelId="select-language-label"
                id="select-language"
                value={language}
                onChange={handleLanguageChange}
              >
                <MenuItem value={Locale.ET}>
                  <img src={FlagEstonia} alt="ET" width={25} height={15} />
                </MenuItem>
                <MenuItem value={Locale.EN}>
                  <img src={FlagUK} alt="EN" width={25} height={15} />
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveHeader;
