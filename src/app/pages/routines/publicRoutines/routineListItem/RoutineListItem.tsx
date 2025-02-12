import { Routine } from '@/types/entities/Routine';
import { ListItem, ListItemText, Typography } from '@mui/material';
import './RoutineListItem.scss';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/types/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dislike, like } from '@/api/routineLikeApi';
import { useState } from 'react';
import AppAlert from '@/app/components/alerts/AppAlert';
import LikeWithCount from '@/app/components/likeWithCount/LikeWithCount';
import { AppAlertState } from '@/types/entities/AppAlert';
import { addRoutineLike } from '@/app/common/utils/addRoutineLike';
import { removeRoutineLike } from '@/app/common/utils/removeRoutineLike';

const RoutineListItem = ({ routine }: { routine: Routine }) => {
  const {
    id = '',
    name = 'No name',
    description = 'No description',
    likesCount = 0,
    isLikedByCurrentUser = false,
  } = routine || {};
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [alertState, setAlertState] = useState<AppAlertState>({
    open: false,
    text: '',
    severity: 'error',
  });

  const { mutate: likeRoutine, isPending: likeRoutinePending } = useMutation({
    mutationFn: (id: string) => like(id),
    onSuccess: () => {
      addRoutineLike(queryClient, id);
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
      removeRoutineLike(queryClient, routine.id);
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
