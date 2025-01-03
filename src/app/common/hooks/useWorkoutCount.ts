import { getWorkoutCount } from '@/api/workout';
import { useQuery } from '@tanstack/react-query';

const useWorkoutCount = (minusMonth: number) => {
  return useQuery<number>({
    queryKey: ['workout-count', minusMonth],
    queryFn: getWorkoutCount,
  });
};

export default useWorkoutCount;
