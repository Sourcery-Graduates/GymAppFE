import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Button from '../buttons/Button/Button';
import './ConfirmationDialog.scss';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const ConfirmationDialog: React.FC<Props> = ({
  title,
  description,
  open,
  onConfirm,
  onClose,
  confirmationText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby='alert-dialog-slide-description'
      aria-modal={true}
      sx={{
        '& .MuiPaper-root': {
          color: 'text.primary',
          backgroundColor: 'primary.main',
          borderRadius: '8px',
          border: 1,
          borderColor: 'secondary.main',

          '& .MuiTypography-root': {
            color: 'text.primary',
          },
        },
      }}
    >
      {title ? <DialogTitle>{title}</DialogTitle> : ''}
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className='close-button' size='small' onClick={onClose}>
          {cancelText}
        </Button>
        <Button size='small' onClick={onConfirm}>
          {confirmationText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

type Props = {
  title?: string;
  description?: string;
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
  confirmationText?: string;
  cancelText?: string;
};

export default ConfirmationDialog;
