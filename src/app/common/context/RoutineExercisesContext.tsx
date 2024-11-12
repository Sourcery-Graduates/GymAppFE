import { RoutineExercise } from '@/types/entities/Routine';
import { createContext, ReactNode, useContext, useState } from 'react';

interface RoutineExercisesContextType {
  exercises: RoutineExercise[];
  setExercises: (exercises: RoutineExercise[]) => void;
  addExercise: (exercise: RoutineExercise) => void;
  removeExercise: (id: string) => void;
}

interface RoutineExercisesProviderProps {
  children: ReactNode;
}

const RoutineExercisesContext = createContext<RoutineExercisesContextType | undefined>(undefined);

export const RoutineExercisesProvider = ({ children }: RoutineExercisesProviderProps) => {
  const [exercises, setExercises] = useState<RoutineExercise[]>([]);
  const addExercise = (exercise: RoutineExercise) => {
    setExercises((prev) => [...prev, exercise]);
  };
  const removeExercise = (id: string) => {
    setExercises((prev) => prev.filter((item) => item.routineExerciseId != id));
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
