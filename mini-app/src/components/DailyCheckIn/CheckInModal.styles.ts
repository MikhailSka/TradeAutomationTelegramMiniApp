import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed', // Make sure the modal fills the screen
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark overlay effect
    zIndex: 1300, // High z-index to appear above other content
  },
  modalContent: {
    padding: '20px',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    borderRadius: '8px',
    textAlign: 'center',
    width: '90%',
    maxWidth: '400px',
  },
  dayCount: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  checkInButton: {
    marginTop: '20px',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  rewardMessage: {
    marginTop: '20px',
    fontSize: '24px',
    color: '#28a745',
  },
  resetWarning: {
    fontSize: '14px',
    color: theme.palette.text.secondary,
    marginTop: '10px',
  },
}));

export default useStyles;
