import { deleteRoutine } from '@/app/api/routineApi';
import ConfirmationDialog from '@/app/components/dialogs/ConfirmationDialog';
import { AppRoutes } from '@/types/routes';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './RoutineOptionsButton.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const RoutineOptionsButton: React.FC<Props> = ({ routineId }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: deleteRoutineMutation } = useMutation({
    mutationFn: deleteRoutine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
  });

  const handleClose = () => {
    setOpenConfirmationDialog(false);
  };

  const handleConfirm = async () => {
    try {
      await deleteRoutineMutation(routineId);
    } catch (e) {
      console.log(e);
    }
    setOpenConfirmationDialog(false);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleEditRoutineClick = (): void => {
    handleMenuClose();
    const url = AppRoutes.ROUTINE_UPDATE.replace(':routineId', routineId!);
    navigate(url);
  };

  const handleDeleteRoutineClick = (): void => {
    handleMenuClose();
    setOpenConfirmationDialog(true);
  };

  return (
    <div className='routine_options_button'>
      <Tooltip title='Routine options'>
        <IconButton
          onClick={handleButtonClick}
          aria-controls={open ? 'routine-options' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          size='small'
        >
          <MoreVertIcon className='options_icon' />
        </IconButton>
      </Tooltip>
      <ConfirmationDialog
        description='Are you sure you want to delete this Routine?'
        open={openConfirmationDialog}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
      <Menu
        className='routine_options_menu'
        anchorEl={anchorEl}
        id='routine-options'
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem className='menu_list_item' onClick={handleEditRoutineClick}>
          <ListItemIcon>
            <EditIcon className='menu_list_icon' />
          </ListItemIcon>
          <Typography className='menu_list_text'>Edit Routine</Typography>
        </MenuItem>
        <Divider />
        <MenuItem className='menu_list_item' onClick={handleDeleteRoutineClick}>
          <ListItemIcon>
            <DeleteForeverIcon className='menu_list_icon' />
          </ListItemIcon>
          <Typography className='menu_list_text'>Delete Routine</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

type Props = {
  routineId: string;
};

export default RoutineOptionsButton;
