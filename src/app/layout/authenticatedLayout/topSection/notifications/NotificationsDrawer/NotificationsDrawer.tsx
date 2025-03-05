import { Box, Drawer, IconButton, List, useMediaQuery } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import './NotificationsDrawer.scss';
import NotificationItem from "./NotificationItem";

export type NotificationsDrawerProps = {
    open: boolean;
    closeHandler: (value: boolean) => void;
}

const testData = {"totalPages":1,"totalElements":2,"data":[{"ownerId":"844f7756-1a97-4dd8-b9da-fc8b1ce4ab54","routineId":"bc267b85-ea6f-4af7-8cb5-baabc7630100","likesCount":-1,"routineTitle":"Weekly presentation routine","createdAt":"2025-02-27T14:20:37.94381"},{"ownerId":"844f7756-1a97-4dd8-b9da-fc8b1ce4ab54","routineId":"60debffd-9b2d-4e2f-a923-ba01146c2115","likesCount":1,"routineTitle":"Mewing routine","createdAt":"2025-02-26T23:33:49.383197"}]}

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
            {testData.data.map((notification) => (
              <NotificationItem {...notification} setNotificationDrawerOpen={closeHandler}/>
            ))}
          </List>
        </Drawer>
    );
}

export default NotificationsDrawer;
