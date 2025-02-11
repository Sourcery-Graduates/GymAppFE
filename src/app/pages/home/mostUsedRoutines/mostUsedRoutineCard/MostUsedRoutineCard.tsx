import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/types/routes';
import './MostUsedRoutineCard.scss';

const MostUsedRoutineCard = ({ routineId, routineName }: { routineId: string; routineName: string }) => {
  const navigate = useNavigate();

  const openRoutineDetails = (routineId: string) => {
    const url = AppRoutes.ROUTINE_DETAILS.replace(':routineId', routineId);

    navigate(url);
  };

  return (
    <>
      <div className='most-used-routine-card' onClick={() => openRoutineDetails(routineId)}>
        <div className='most-used-routine-card__name'>
          <h3>
            <title>{routineName}</title>
            {routineName}
          </h3>
        </div>
      </div>
    </>
  );
};

export default MostUsedRoutineCard;
