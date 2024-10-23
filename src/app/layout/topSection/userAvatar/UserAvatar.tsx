import { Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import './UserAvatar.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/types/routes';
import useAuth from '@/app/common/hooks/useAuth';

const UserAvatar = () => {
	const { logOutUser } = useAuth();
	const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleMyProfileClick = (): void => {
    navigate(AppRoutes.MY_PROFILE);
    handleMenuClose();
  };

	const handleLogoutClick = (): void => {
		handleMenuClose();
		logOutUser();
	};

  const handleOptionsClick = (): void => {
    navigate(AppRoutes.OPTIONS);
    handleMenuClose();
  };

  return (
    <div className='user_avatar'>
      <Tooltip title='Account settings'>
        <IconButton
          onClick={handleAvatarClick}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        >
          <AccountCircleIcon className='user_icon' />
        </IconButton>
      </Tooltip>
      <Menu
        className='user_menu'
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem className='menu_list_item' onClick={handleMyProfileClick}>
          <ListItemIcon>
            <ManageAccountsIcon className='menu_list_icon' />
          </ListItemIcon>
          <Typography className='menu_list_text'>My profile</Typography>
        </MenuItem>
        <Divider />
        <MenuItem className='menu_list_item options_menu' onClick={handleOptionsClick}>
          <ListItemIcon>
            <SettingsIcon className='menu_list_icon' />
          </ListItemIcon>
          <Typography className='menu_list_text'>Options</Typography>
        </MenuItem>
        <Divider className='options_menu' />
        <MenuItem className='menu_list_item' onClick={handleLogoutClick}>
          <ListItemIcon>
            <Logout className='menu_list_icon' />
          </ListItemIcon>
          <Typography className='menu_list_text'>Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserAvatar;
