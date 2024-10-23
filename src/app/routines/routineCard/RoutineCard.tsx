import { AppRoutes } from '@/types/routes';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import RoutineOptionsButton from './routineOptionsButton/RoutineOptionsButton';

import './RoutineCard.scss';

const RoutineCard: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const openRoutineDetails = (routineId: string) => {
    const url = AppRoutes.ROUTINE_DETAILS.replace(':routineId', routineId);
    navigate(url);
  };

  const likes = useMemo(() => {
    return props.likes > 999 ? `${(props.likes / 1000).toFixed(0)}k` : props.likes;
  }, [props.likes]);

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
        <RoutineOptionsButton />
      </div>
      <div className='likes-container'>
        <div className='likes-number'>
          <p>{likes}</p>
        </div>
        <div className={`likes-icon ${props.userLikes ? 'active' : ''}`}>
          <ThumbUpOffAltIcon fontSize='small' />
        </div>
      </div>
    </div>
  );
};

type Props = {
  id: string;
  name: string;
  description?: string;
  likes: number;
  userLikes: boolean;
};

export default RoutineCard;
