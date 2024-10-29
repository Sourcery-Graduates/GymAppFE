import { deleteRoutine, fetchRoutineDetails } from '@/api/routineApi';
import Button from '@/app/components/buttons/Button/Button';
import ConfirmationDialog from '@/app/components/dialogs/ConfirmationDialog';
import BasicSpinner from '@/app/components/loaders/BasicSpinner';
import { AppRoutes } from '@/types/routes';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import './RoutineDetails.scss';

const RoutineDetails = () => {
  const { routineId } = useParams();
  const navigate = useNavigate();
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const queryClient = useQueryClient();

  const openRoutineUpdate = () => {
    const url = AppRoutes.ROUTINE_UPDATE.replace(':routineId', routineId!);
    navigate(url);
  };

  const handleClickOpen = () => {
    setOpenConfirmationDialog(true);
  };

  const handleClose = () => {
    setOpenConfirmationDialog(false);
  };

  const handleConfirm = async () => {
    try {
      await deleteRoutineMutation(routineId!);
    } catch (e) {
      console.log(e);
    }
    setOpenConfirmationDialog(false);
    navigate(AppRoutes.ROUTINES);
  };

  const goBackHandler = () => {
    navigate(-1);
  };

  const { data: routine, isLoading } = useQuery({
    queryFn: () => fetchRoutineDetails(routineId!),
    queryKey: ['routines', routineId],
  });

  const { mutateAsync: deleteRoutineMutation } = useMutation({
    mutationFn: deleteRoutine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'], exact: true });
    },
    onError: () => {
      alert('Failed to delete data');
    },
  });

  if (isLoading) {
    return (
      <div className='routine-details-container'>
        <BasicSpinner />
      </div>
    );
  }

  return (
    <div className='routine-details-container'>
      <div className='routine-options-bar'>
        <IconButton aria-label='go back' onClick={goBackHandler}>
          <ArrowBackIosNewIcon sx={{ color: 'accent.main' }} />
        </IconButton>
        <div className='routine-options'>
          <Button size='small' onClick={openRoutineUpdate}>
            <EditIcon fontSize='small' /> &nbsp; Edit Routine
          </Button>
          <Button size='small' className='delete-routine-button' onClick={handleClickOpen}>
            <DeleteForeverIcon fontSize='small' /> &nbsp; Delete Routine
          </Button>
          <ConfirmationDialog
            description='Are you sure you want to delete this Routine?'
            open={openConfirmationDialog}
            onConfirm={handleConfirm}
            onClose={handleClose}
          />
        </div>
      </div>
      <h2>{routine?.name}</h2>
      <div className='routine-description'>{routine?.description}</div>
      <div className='routine-exercise-list'>SPACE FOR EXERCISES</div>
    </div>
  );
};

export default RoutineDetails;
