import { deleteRoutine, fetchRoutineWithExercises } from '@/api/routineApi';
import Button from '@/app/components/buttons/Button/Button';
import ConfirmationDialog from '@/app/components/dialogs/ConfirmationDialog';
import BasicSpinner from '@/app/components/loaders/BasicSpinner';
import { AppRoutes } from '@/types/routes';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import './RoutineDetails.scss';
import ExercisesTable from '../exercisesTable/ExercisesTable';
import { useRoutineExercises } from '@/app/common/context/RoutineExercisesContext';
import useAuth from '@/app/common/hooks/useAuth';

const RoutineDetails = () => {
  const { userId } = useAuth();
  const { routineId } = useParams();
  const navigate = useNavigate();
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const queryClient = useQueryClient();
  const { setExercises } = useRoutineExercises();

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

  const { data: data, isLoading } = useQuery({
    queryFn: () => fetchRoutineWithExercises(routineId!),
    queryKey: ['routines', routineId],
  });

  useEffect(() => {
    if (data && data.exercises) {
      setExercises(data.exercises);
    }
  }, [data, setExercises]);

  const { mutateAsync: deleteRoutineMutation } = useMutation({
    mutationFn: deleteRoutine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'], exact: true });
    },
    onError: () => {
      alert('Failed to delete data');
    },
  });

  const startWorkoutHandler = () => {
    navigate(AppRoutes.WORKOUT_CREATE, { state: { routineData: data } });
  };

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
        {data?.routine.userId === userId && (
          <div className='routine-options'>
            <Button size='small' onClick={openRoutineUpdate}>
              <EditIcon fontSize='small' /> &nbsp; Edit Routine
            </Button>
            <Button size='small' className='delete-routine-button' onClick={handleClickOpen}>
              <DeleteForeverIcon fontSize='small' /> &nbsp; Delete Routine
            </Button>
            <Button size='small' className='start-workout-button' onClick={startWorkoutHandler}>
              Start Workout
            </Button>
            <ConfirmationDialog
              description='Are you sure you want to delete this Routine?'
              open={openConfirmationDialog}
              onConfirm={handleConfirm}
              onClose={handleClose}
            />
          </div>
        )}
        {}
      </div>
      <div className='routine-header'>
        <h2>{data?.routine.name}</h2>
        {data?.routine.createdAt ? (
          <div>
            <p>Created at:</p>
            <p> {data?.routine.createdAt ? new Date(data.routine.createdAt).toLocaleDateString() : ''}</p>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className='routine-description'>{data?.routine.description}</div>
      <ExercisesTable editable={false} />
    </div>
  );
};

export default RoutineDetails;
