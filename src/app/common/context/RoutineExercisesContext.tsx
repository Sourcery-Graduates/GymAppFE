import { CreteRoutineExerciseJoined } from '@/types/entities/Exercise';
import { mockExercises } from '@/types/entities/Exercise';
import { createContext, ReactNode, useContext, useState } from 'react';

interface RoutineExercisesContextType {
  exercises: CreteRoutineExerciseJoined[];
  setExercises: (exercises: CreteRoutineExerciseJoined[]) => void;
  addExercise: (exercise: CreteRoutineExerciseJoined) => void;
  removeExercise: (id: string) => void;
}

interface RoutineExercisesProviderProps {
  children: ReactNode;
}

const RoutineExercisesContext = createContext<RoutineExercisesContextType | undefined>(undefined);

export const RoutineExercisesProvider = ({ children }: RoutineExercisesProviderProps) => {
  const [exercises, setExercises] = useState<CreteRoutineExerciseJoined[]>(mockExercises);
  const addExercise = (exercise: CreteRoutineExerciseJoined) => {
    setExercises((prev) => [...prev, exercise]);
  };
  const removeExercise = (id: string) => {
    setExercises((prev) => prev.filter((item) => item.exerciseId != id));
  };

  return (
    <RoutineExercisesContext.Provider value={{ exercises, setExercises, addExercise, removeExercise }}>
      {children}
    </RoutineExercisesContext.Provider>
  );
};

export const useRoutineExercises = () => {
  const context = useContext(RoutineExercisesContext);
  if (!context) {
    throw new Error('useRoutineExercises must be used within a RoutineExercisesProvider');
  }
  return context;
};
