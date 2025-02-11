import { AppRoutes } from '@/types/routes';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import RoutineOptionsButton from './routineOptionsButton/RoutineOptionsButton';

import './RoutineCard.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dislike, like } from '@/api/routineLikeApi';
import AppAlert from '@/app/components/alerts/AppAlert';
import { Routine } from '@/types/entities/Routine';
import LikeWithCount from '@/app/components/likeWithCount/LikeWithCount';
import { AppAlertState } from '@/types/entities/AppAlert';
import { addRoutineLike } from '@/app/common/utils/addRoutineLike';
import { removeRoutineLike } from '@/app/common/utils/removeRoutineLike';

const RoutineCard = ({ routine }: { routine: Routine }) => {
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
      addRoutineLike(queryClient, routine.id);
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

  const openRoutineDetails = (routineId: string) => {
    const url = AppRoutes.ROUTINE_DETAILS.replace(':routineId', routineId);
    navigate(url);
  };

  const handleLikeClick = () => {
    if (routine.isLikedByCurrentUser) {
      if (!dislikeRoutinePending) {
        dislikeRoutine(routine.id);
      }
    } else {
      if (!likeRoutinePending) {
        likeRoutine(routine.id);
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
        <div className='routine-list-item_like-container'>
          <LikeWithCount
            likesCount={routine.likesCount}
            isLikedByCurrentUser={routine.isLikedByCurrentUser}
            handleClick={handleLikeClick}
          />
        </div>
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

export default RoutineCard;
