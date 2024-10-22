import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

import "./RoutineOptionsButton.scss";

const RoutineOptionsButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleEditRoutineClick = (): void => {
    handleMenuClose();
  };

  const handleDeleteRoutineClick = (): void => {
    handleMenuClose();
  };

  return (
    <div className="routine_options_button">
      <Tooltip title="Routine options">
        <IconButton
          onClick={handleButtonClick}
          aria-controls={open ? "routine-options" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          size="small"
        >
          <MoreVertIcon className="options_icon" />
        </IconButton>
      </Tooltip>
      <Menu
        className="routine_options_menu"
        anchorEl={anchorEl}
        id="routine-options"
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem className="menu_list_item" onClick={handleEditRoutineClick}>
          <ListItemIcon>
            <EditIcon className="menu_list_icon" />
          </ListItemIcon>
          <Typography className="menu_list_text">Edit Routine</Typography>
        </MenuItem>
        <Divider />
        <MenuItem className="menu_list_item" onClick={handleDeleteRoutineClick}>
          <ListItemIcon>
            <DeleteForeverIcon className="menu_list_icon" />
          </ListItemIcon>
          <Typography className="menu_list_text">Delete Routine</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default RoutineOptionsButton;
