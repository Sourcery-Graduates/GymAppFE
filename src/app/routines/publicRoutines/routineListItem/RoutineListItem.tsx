import { Routine } from '@/types/entities/Routine';
import { ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

//TODO: to fix
const RoutineListItem = ({ routine }: { routine: Routine }) => {
  const { id, name, description } = routine;
  return (
    <ListItem alignItems='flex-start' key={id}>
      <ListItemText
        primary={name}
        secondary={
          <React.Fragment>
            <Typography
              component='span'
              variant='body2'
              sx={{
                color: 'text.primary',
                display: 'inline',
              }}
            >
              {description}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default RoutineListItem;
