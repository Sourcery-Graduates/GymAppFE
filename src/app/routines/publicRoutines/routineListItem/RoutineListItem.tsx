import { PagedRoutine, Routine } from '@/types/entities/Routine';
import { ListItem, ListItemText, Typography } from '@mui/material';
import './RoutineListItem.scss';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/types/routes';
import { useMutation } from '@tanstack/react-query';
import { dislike, like } from '@/api/routineLikeApi';
import { useState } from 'react';
import AppAlert from '@/app/components/alerts/AppAlert';
import LikeWithCount from '@/app/components/likeWithCount/LikeWithCount';
import { AppAlertState } from '@/types/entities/AppAlert';
import { queryClient } from '@/config/tanstack_query/config';

const RoutineListItem = ({ routine }: { routine: Routine }) => {
  const {
    id = '',
    name = 'No name',
    description = 'No description',
    likesCount = 0,
    isLikedByCurrentUser = false,
  } = routine || {};
  const navigate = useNavigate();

  const [alertState, setAlertState] = useState<AppAlertState>({
    open: false,
    text: '',
    severity: 'error',
  });

  const { mutate: likeRoutine, isPending: likeRoutinePending } = useMutation({
    mutationFn: (id: string) => like(id),
    onSuccess: () => {
      queryClient.setQueriesData<PagedRoutine>({ queryKey: ['public-routines'] }, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: oldData.data.map((oldRoutine) =>
            oldRoutine.id === id
              ? { ...oldRoutine, likesCount: oldRoutine.likesCount + 1, isLikedByCurrentUser: true }
              : oldRoutine,
          ),
        };
      });
      queryClient.setQueryData(['routines'], (oldData: Routine[]) => {
        return oldData.map((oldRoutine) =>
          oldRoutine.id === id
            ? { ...oldRoutine, likesCount: oldRoutine.likesCount + 1, isLikedByCurrentUser: true }
            : oldRoutine,
        );
      });
    },
    onError: () => {
      setAlertState({
        open: true,
        text: 'Error while liking routine',
        severity: 'error',
      });
    },
  });

  const { mutate: dislikeRoutine, isPending: dislikeRoutinePending } = useMutation({
    mutationFn: (id: string) => dislike(id),
    onSuccess: () => {
      queryClient.setQueriesData<PagedRoutine>({ queryKey: ['public-routines'] }, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: oldData.data.map((oldRoutine) =>
            oldRoutine.id === id
              ? { ...oldRoutine, likesCount: oldRoutine.likesCount - 1, isLikedByCurrentUser: false }
              : oldRoutine,
          ),
        };
      });
      queryClient.setQueryData(['routines'], (oldData: Routine[]) => {
        return oldData.map((oldRoutine) =>
          oldRoutine.id === id
            ? { ...oldRoutine, likesCount: oldRoutine.likesCount - 1, isLikedByCurrentUser: false }
            : oldRoutine,
        );
      });
    },
    onError: () => {
      setAlertState({
        open: true,
        text: 'Error while disliking routine',
        severity: 'error',
      });
    },
  });

  const handleLikeClick = () => {
    if (isLikedByCurrentUser) {
      if (!dislikeRoutinePending) {
        dislikeRoutine(id);
      }
    } else {
      if (!likeRoutinePending) {
        likeRoutine(id);
      }
    }
  };

  const handleSnackbarClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason && reason !== 'timeout') {
      return;
    }
    setAlertState({
      open: false,
      text: '',
      severity: 'error',
    });
  };

  const openRoutineDetails = (routineId: string) => {
    const url = AppRoutes.ROUTINE_DETAILS.replace(':routineId', routineId);
    navigate(url);
  };

  return (
    <>
      <div className='public-routine-list-item'>
        <ListItem key={id}>
          <div className='public-routine-list-item__content'>
            <ListItemText
              onClick={() => openRoutineDetails(id)}
              primary={name}
              primaryTypographyProps={{
                fontWeight: 'bold',
              }}
              className='public-routine-list-item__name'
              secondary={
                <Typography component='span' variant='body2' className='public-routine-list-item__description'>
                  {description}
                </Typography>
              }
            />
            <div className='public-routine-list-item_like-container'>
              <LikeWithCount
                likesCount={likesCount}
                isLikedByCurrentUser={isLikedByCurrentUser}
                handleClick={handleLikeClick}
              />
            </div>
          </div>
        </ListItem>
      </div>
      <AppAlert
        open={alertState.open}
        onClose={handleSnackbarClose}
        text={alertState.text}
        severity={alertState.severity}
      />
    </>
  );
};

export default RoutineListItem;
