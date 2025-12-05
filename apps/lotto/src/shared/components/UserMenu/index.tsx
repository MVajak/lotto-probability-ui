import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';

import { logout } from '../../../features/auth/authSlice';
import { pageRoutes } from '../../types';
import { LanguageSelector } from '../LanguageSelector';
import { RegionSelector } from '../RegionSelector';

export const UserMenu: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate(pageRoutes.Profile);
    handleClose();
  };

  const handleSubscription = () => {
    navigate(pageRoutes.Subscription);
    handleClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(pageRoutes.Login);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick} size="small" sx={{ color: 'inherit', display: 'flex', gap: 0.5 }}>
        <SettingsIcon sx={{ fontSize: 24 }} />
        <KeyboardArrowDownIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          {t('userMenu.profile')}
        </MenuItem>
        <MenuItem onClick={handleSubscription}>
          <ListItemIcon>
            <SubscriptionsIcon fontSize="small" />
          </ListItemIcon>
          {t('userMenu.subscription')}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          {t('userMenu.logout')}
        </MenuItem>
        <Divider />
        <Box sx={{ px: 2, py: 1.5, display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              {t('userMenu.language')}
            </Typography>
            <LanguageSelector size="small" />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              {t('userMenu.region')}
            </Typography>
            <RegionSelector size="small" />
          </Box>
        </Box>
      </Menu>
    </>
  );
};
