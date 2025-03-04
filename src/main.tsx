import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/app/App.tsx';
import { ThemeProvider } from '@mui/material';
import { GymTheme } from './MUITheme/GymTheme.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/config/tanstack_query/config.ts';
import { RoutineExercisesProvider } from './app/common/context/RoutineExercisesContext.tsx';
import '@/config/dayjs/config.ts';
import { AuthProvider} from 'react-oauth2-code-pkce';
import { oauth2Config } from '@/config/auth/config.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={GymTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider authConfig={oauth2Config}>
          <RoutineExercisesProvider>
            <App />
          </RoutineExercisesProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
