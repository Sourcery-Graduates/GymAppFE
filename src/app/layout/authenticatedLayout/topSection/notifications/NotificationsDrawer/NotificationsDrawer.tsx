import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import './NotificationsDrawer.scss';

export type NotificationsDrawerProps = {
    open: boolean;
    closeHandler: (value: boolean) => void;
}

const NotificationsDrawer = ({ open, closeHandler }: NotificationsDrawerProps) => {
  const isPhoneScreen = useMediaQuery('(min-width:480px)');
  
    return (
        <Drawer
            className="likes-notification-drawer"
            anchor={isPhoneScreen ? "right" : "bottom"}
            open={open}
            onClose={() => closeHandler(false)}
        >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
                <IconButton onClick={() => closeHandler(false)}>
                    <CloseIcon />
                </IconButton>
            </Box>
          <List>
            {['All mail', 'Trash', 'Spam'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
    );
}

export default NotificationsDrawer;
