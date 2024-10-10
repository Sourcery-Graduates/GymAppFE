import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/app/App.tsx';
import { ThemeProvider } from '@mui/material';
import { GymTheme } from './MUITheme/GymTheme.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider theme={GymTheme}>
			<App />
		</ThemeProvider>
	</StrictMode>
);
