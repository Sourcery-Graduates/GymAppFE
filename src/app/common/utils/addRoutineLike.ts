import { PagedRoutine, Routine } from '@/types/entities/Routine';
import { QueryClient } from '@tanstack/react-query';

export const addRoutineLike = (queryClient: QueryClient, routineId: string) => {
  queryClient.setQueryData(['routines'], (oldData: Routine[]) => {
    return oldData.map((oldRoutine) =>
      oldRoutine.id === routineId
        ? { ...oldRoutine, likesCount: oldRoutine.likesCount + 1, isLikedByCurrentUser: true }
        : oldRoutine,
    );
  });
  queryClient.setQueriesData<PagedRoutine>({ queryKey: ['public-routines'] }, (oldData) => {
    if (!oldData) return oldData;

    return {
      ...oldData,
      data: oldData.data.map((oldRoutine) =>
        oldRoutine.id === routineId
          ? { ...oldRoutine, likesCount: oldRoutine.likesCount + 1, isLikedByCurrentUser: true }
          : oldRoutine,
      ),
    };
  });
}