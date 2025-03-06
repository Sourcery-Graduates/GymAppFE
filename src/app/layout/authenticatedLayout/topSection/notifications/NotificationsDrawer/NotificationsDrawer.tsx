import { Box, Button, Drawer, IconButton, List, Typography, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './NotificationsDrawer.scss';
import NotificationItem from './NotificationItem';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { fetchLikeNotifications } from '@/api/likeNotificationApi';

export type NotificationsDrawerProps = {
  open: boolean;
  closeHandler: (value: boolean) => void;
};

const NotificationsDrawer = ({ open, closeHandler }: NotificationsDrawerProps) => {
  const isPhoneScreen = useMediaQuery('(min-width:480px)');
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['like-notifications'],
    queryFn: ({ pageParam }) => fetchLikeNotifications(pageParam, 5),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },
  });

  const drawerCloseHandler = () => {
    closeHandler(false);
    queryClient.invalidateQueries({ queryKey: ['like-notifications'] });
  };

  return (
    <Drawer
      className='likes-notification-drawer'
      anchor={isPhoneScreen ? 'right' : 'bottom'}
      open={open}
      onClose={drawerCloseHandler}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
        <IconButton onClick={drawerCloseHandler}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {data?.pages.map((page) =>
          page.data.map((notification) => (
            <NotificationItem
              key={notification.routineId + notification.createdAt}
              {...notification}
              setNotificationDrawerOpen={closeHandler}
            />
          )),
        )}

        <div className='like-notification-controll'>
          {hasNextPage ? (
            <Button
              variant='outlined'
              color='info'
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              variant='outlined'
            >
              Load More
            </Button>
          ) : (
            <Typography variant='body2' color='textPrimary'>
              You have seen all info up-to-date
            </Typography>
          )}
        </div>
      </List>
    </Drawer>
  );
};

export default NotificationsDrawer;
