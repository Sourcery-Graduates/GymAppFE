import { AppRoutes } from '@/types/routes';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import RoutineOptionsButton from './routineOptionsButton/RoutineOptionsButton';

import './RoutineCard.scss';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/config/tanstack_query/config';
import { like } from '@/api/routineLikeApi';

const RoutineCard: React.FC<RoutineProps> = (props) => {
  const navigate = useNavigate();

  const { mutate: likeRoutine } = useMutation({
    mutationFn: (id: string) => like(id, 'POST'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
    onError: (error) => {
      console.error('Error liking routine:', error);
    },
  });

  const { mutate: deleteRoutine } = useMutation({
    mutationFn: (id: string) => like(id, 'DELETE'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
    onError: (error) => {
      console.error('Error disliking routine:', error);
    },
  });

  const openRoutineDetails = (routineId: string) => {
    const url = AppRoutes.ROUTINE_DETAILS.replace(':routineId', routineId);
    navigate(url);
  };

  const likes = useMemo(() => {
    return props.likesCount > 999 ? `${(props.likesCount / 1000).toFixed(0)}k` : props.likesCount;
  }, [props.likesCount]);

  const handleLikeClick = () => {
    if (props.isLikedByCurrentUser) {
      deleteRoutine(props.id);
    } else {
      likeRoutine(props.id);
    }
  };

  return (
    <div className='routine-list-item'>
      <div className='routine-list-item_name' onClick={() => openRoutineDetails(props.id)}>
        <h3>
          <title>{props.name}</title>
          {props.name}
        </h3>
      </div>
      <div className='routine-list-item_description'>
        <p>{props.description}</p>
      </div>
      <div className='routine-list-item_options'>
        <RoutineOptionsButton routineId={props.id} />
      </div>
      <div className='likes-container' onClick={handleLikeClick}>
        <div className='likes-number'>
          <p>{likes}</p>
        </div>
        <div className={`likes-icon ${props.isLikedByCurrentUser ? 'active' : ''}`}>
          <ThumbUpOffAltIcon fontSize='small' />
        </div>
      </div>
    </div>
  );
};

type RoutineProps = {
  id: string;
  name: string;
  description?: string;
  likesCount: number;
  isLikedByCurrentUser: boolean;
  createdAt: string;
  userId: string;
};

export default RoutineCard;
