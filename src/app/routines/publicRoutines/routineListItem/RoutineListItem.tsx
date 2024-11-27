import { Routine } from '@/types/entities/Routine';
import { ListItem, ListItemText, Typography } from '@mui/material';
import './RoutineListItem.scss';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/types/routes';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { queryClient } from '@/config/tanstack_query/config';
import { useMutation } from '@tanstack/react-query';
import { dislike, like } from '@/api/routineLikeApi';
import { useState } from 'react';
import AppAlert from '@/app/components/alerts/AppAlert';

const RoutineListItem = ({ routine }: { routine: Routine }) => {
  const {
    id = '',
    name = 'No name',
    description = 'No description',
    likesCount = 0,
    isLikedByCurrentUser = false,
  } = routine || {};
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { mutate: likeRoutine } = useMutation({
    mutationFn: (id: string) => like(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['public-routines'] });
    },
    onError: () => {
      setSnackbarOpen(true);
    },
  });

  const { mutate: dislikeRoutine } = useMutation({
    mutationFn: (id: string) => dislike(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['public-routines'] });
    },
    onError: () => {
      setSnackbarOpen(true);
    },
  });

  const handleLikeClick = () => {
    if (isLikedByCurrentUser) {
      dislikeRoutine(id);
    } else {
      likeRoutine(id);
    }
  };

  const handleSnackbarClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason && reason !== 'timeout') {
      return;
    }
    setSnackbarOpen(false);
  };

  const openRoutineDetails = (routineId: string) => {
    const url = AppRoutes.ROUTINE_DETAILS.replace(':routineId', routineId);
    navigate(url);
  };

  return (
    <>
      <div>
        <ListItem alignItems='flex-start' key={id} className='public-routine-list-item'>
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
          <div className='public-routine-list-item__likes' onClick={handleLikeClick}>
            <div className='public-routine-list-item__likes-number'>
              <p>{likesCount}</p>
            </div>
            <div className={`likes-icon ${isLikedByCurrentUser ? 'active' : ''}`}>
              <ThumbUpOffAltIcon fontSize='small' />
            </div>
          </div>
        </ListItem>
      </div>
      <AppAlert
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        text='An error occurred while updating your like'
        severity='error'
      />
    </>
  );
};

export default RoutineListItem;
