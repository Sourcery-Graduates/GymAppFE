import { Routine } from '@/types/entities/Routine';
import { ListItem, ListItemText, Typography } from '@mui/material';
import './RoutineListItem.scss';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/types/routes';

const RoutineListItem = ({ routine }: { routine: Routine }) => {
  const { id = '', name = 'No name', description = 'No description' } = routine;
  const navigate = useNavigate();

  const openRoutineDetails = (routineId: string) => {
    const url = AppRoutes.ROUTINE_DETAILS.replace(':routineId', routineId);
    navigate(url);
  };

  return (
    <div className='public-routine-list-item'>
      <ListItem alignItems='flex-start' key={id}>
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
      </ListItem>
    </div>
  );
};

export default RoutineListItem;
