import { LikeNotification } from '@/types/entities/LikeNotification';
import { Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

export type NotificationItemProps = {
  setNotificationDrawerOpen: (value: boolean) => void;
} & LikeNotification;

const NotificationItem = (props: NotificationItemProps) => {
  const likeCountPositive = props.likesCount > 0;
  const likeWord = Math.abs(props.likesCount) === 1 ? "like" : "likes";
  const notificationText = `Your routine '${props.routineTitle}' ${likeCountPositive ? 'received' : 'lost'} ${Math.abs(props.likesCount)} ${likeWord}.`;
  const formattedDate = dayjs(props.createdAt).toDate().toLocaleDateString();
  const navigate = useNavigate();

  const clickHandler = () => {
    props.setNotificationDrawerOpen(false);
    navigate(`/routines/routine-details/${props.routineId}`);
  };

  return (
    <>
      <ListItem key={props.routineId + props.createdAt} disablePadding>
        <ListItemButton onClick={clickHandler}>
          <ListItemIcon>{likeCountPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}</ListItemIcon>
          <ListItemText
            primary={
              <Typography variant='body1' fontWeight='bold'>
                {notificationText}
              </Typography>
            }
            secondary={
              <Typography variant='body2' color='accent'>
                {formattedDate}
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider sx={{ backgroundColor: 'grey', marginX: 2 }} />
    </>
  );
};

export default NotificationItem;
