import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useInviteFriendModalStyles = makeStyles((theme: Theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed', // Ensure the modal fills the screen
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    zIndex: 1300, // High z-index to appear above other content
  },
  modalContent: {
    padding: '20px',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderRadius: '8px',
    textAlign: 'center',
    width: '90%',
    maxWidth: '400px',
    boxShadow: theme.shadows[5],
  },
  qrCodeContainer: {
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonGroup: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  closeButton: {
    marginTop: '10px',
  },
}));

export default useInviteFriendModalStyles;