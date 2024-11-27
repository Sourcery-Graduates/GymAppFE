import { AppRoutes } from '@/types/routes';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import RoutineOptionsButton from './routineOptionsButton/RoutineOptionsButton';

import './RoutineCard.scss';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/config/tanstack_query/config';
import { dislike, like } from '@/api/routineLikeApi';
import AppAlert from '@/app/components/alerts/AppAlert';
import { Routine } from '@/types/entities/Routine';

const RoutineCard = ({ routine }: { routine: Routine }) => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { mutate: likeRoutine } = useMutation({
    mutationFn: (id: string) => like(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
    onError: () => {
      setSnackbarOpen(true);
    },
  });

  const { mutate: dislikeRoutine } = useMutation({
    mutationFn: (id: string) => dislike(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
    onError: () => {
      setSnackbarOpen(true);
    },
  });

  const openRoutineDetails = (routineId: string) => {
    const url = AppRoutes.ROUTINE_DETAILS.replace(':routineId', routineId);
    navigate(url);
  };

  const likes = useMemo(() => {
    return routine.likesCount > 999 ? `${(routine.likesCount / 1000).toFixed(0)}k` : routine.likesCount;
  }, [routine.likesCount]);

  const handleLikeClick = () => {
    if (routine.isLikedByCurrentUser) {
      dislikeRoutine(routine.id);
    } else {
      likeRoutine(routine.id);
    }
  };

  const handleSnackbarClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason && reason !== 'timeout') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <div className='routine-list-item'>
        <div className='routine-list-item_name' onClick={() => openRoutineDetails(routine.id)}>
          <h3>
            <title>{routine.name}</title>
            {routine.name}
          </h3>
        </div>
        <div className='routine-list-item_description'>
          <p>{routine.description}</p>
        </div>
        <div className='routine-list-item_options'>
          <RoutineOptionsButton routineId={routine.id} />
        </div>
        <div className='likes-container' onClick={handleLikeClick}>
          <div className='likes-number'>
            <p>{likes}</p>
          </div>
          <div className={`likes-icon ${routine.isLikedByCurrentUser ? 'active' : ''}`}>
            <ThumbUpOffAltIcon fontSize='small' />
          </div>
        </div>
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

export default RoutineCard;
