import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface ExerciseModalProps {
  open: boolean;
  handleClose: () => void;
}

const ExerciseModal = ({ open, handleClose }: ExerciseModalProps) => {
  return (
    <Dialog
      onClose={handleClose}
      open={open}
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
      <DialogTitle>Set backup account</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates occasionally.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={handleClose}>Cancel</Button>
        <Button variant="outlined" color="info">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExerciseModal;
