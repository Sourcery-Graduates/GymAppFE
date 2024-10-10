import { Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import './UserAvatar.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/types/routes';

const UserAvatar = () => {
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleAvatarClick = (event: React.MouseEvent<HTMLElement>): void => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = (): void => {
		setAnchorEl(null);
	};

	const handleMyAccountClick = (): void => {
		handleMenuClose();
	};

	const handleLogoutClick = (): void => {
		handleMenuClose();
	};

	const handleOptionsClick = (): void => {
		navigate(AppRoutes.OPTIONS);
		handleMenuClose();
	};

	return (
		<div className='user_avatar'>
			<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
				<Tooltip title='Account settings'>
					<IconButton
						onClick={handleAvatarClick}
						size='small'
						sx={{ ml: 2 }}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
					>
						<AccountCircleIcon sx={{ color: 'black' }} />
					</IconButton>
				</Tooltip>
				<Menu
					anchorEl={anchorEl}
					id='account-menu'
					open={open}
					onClose={handleMenuClose}
					onClick={handleMenuClose}
					transformOrigin={{ horizontal: 'right', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				>
					<MenuItem onClick={handleMyAccountClick}>
						<ListItemIcon>
							<ManageAccountsIcon sx={{ color: 'black' }} />
						</ListItemIcon>
						My account
					</MenuItem>
					<Divider />
					<MenuItem className='options_menu' onClick={handleOptionsClick}>
						<ListItemIcon>
							<SettingsIcon sx={{ color: 'black' }} fontSize='small' />
						</ListItemIcon>
						Options
					</MenuItem>
					<Divider className='options_menu' />
					<MenuItem onClick={handleLogoutClick}>
						<ListItemIcon>
							<Logout sx={{ color: 'black' }} fontSize='small' />
						</ListItemIcon>
						Logout
					</MenuItem>
				</Menu>
			</Box>
		</div>
	);
};

export default UserAvatar;
