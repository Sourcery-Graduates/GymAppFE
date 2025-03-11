import './Notifications.scss';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsDrawer from './NotificationsDrawer/NotificationsDrawer';
import { useState } from 'react';

const Notifications = () => {
  const [notificationsDrawerOpen, setNotificationsDrawerOpen] = useState<boolean>(false);

  return (
    <div className='notifications'>
      <div onClick={() => setNotificationsDrawerOpen(true)}>
      <NotificationsIcon/>
      </div>
      <NotificationsDrawer open={notificationsDrawerOpen} closeHandler={setNotificationsDrawerOpen}/>
    </div>
  );
};

export default Notifications;
