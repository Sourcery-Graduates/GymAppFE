import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/app/App.tsx';
import { ThemeProvider } from '@mui/material';
import { GymTheme } from './MUITheme/GymTheme.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/config/tanstack_query/config.ts';
import { AuthContextProvider } from '@/app/common/context/AuthContext.tsx';
import { RoutineExercisesProvider } from './app/common/context/RoutineExercisesContext.tsx';
import '@/config/dayjs/config.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={GymTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RoutineExercisesProvider>
            <App />
          </RoutineExercisesProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
