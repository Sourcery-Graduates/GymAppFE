import { Routine } from '@/types/entities/Routine';
import { ListItem, ListItemText, Typography } from '@mui/material';
import './RoutineListItem.scss';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/types/routes';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { queryClient } from '@/config/tanstack_query/config';
import { useMutation } from '@tanstack/react-query';
import { like } from '@/api/routineLikeApi';

const RoutineListItem = ({ routine }: { routine: Routine }) => {
  const {
    id = '',
    name = 'No name',
    description = 'No description',
    likesCount = 0,
    isLikedByCurrentUser = false,
  } = routine;
  const navigate = useNavigate();

  const { mutate: likeRoutine } = useMutation({
    mutationFn: (id: string) => like(id, 'POST'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['public-routines'] });
    },
    onError: (error) => {
      console.error('Error liking routine:', error);
    },
  });

  const { mutate: deleteRoutine } = useMutation({
    mutationFn: (id: string) => like(id, 'DELETE'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['public-routines'] });
    },
    onError: (error) => {
      console.error('Error disliking routine:', error);
    },
  });

  const handleLikeClick = () => {
    if (isLikedByCurrentUser) {
      deleteRoutine(id);
    } else {
      likeRoutine(id);
    }
  };

  const openRoutineDetails = (routineId: string) => {
    const url = AppRoutes.ROUTINE_DETAILS.replace(':routineId', routineId);
    navigate(url);
  };

  return (
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
  );
};

export default RoutineListItem;
