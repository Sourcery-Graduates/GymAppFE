import { Snackbar, Alert, AlertColor } from '@mui/material';
import React from 'react';

interface AppAlertProps {
  open: boolean;
  onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  text: string;
  severity: AlertColor;
  autoHideDuration?: number;
}

const AppAlert: React.FC<AppAlertProps> = ({ open, onClose, text, severity, autoHideDuration = 3000 }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default AppAlert;
