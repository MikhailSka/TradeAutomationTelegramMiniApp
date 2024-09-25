import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '16px',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    minHeight: '100vh',
    position: 'relative',
  },
  referralPointsSection: {
    backgroundColor: theme.palette.background.paper,
    padding: '16px',
    borderRadius: '8px',
    textAlign: 'center',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  claimButton: {
    marginTop: '16px',
    height: '50px',
    borderRadius: '30px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  claimButtonDisabled: {
    backgroundColor: '#333',
    color: '#b3b5b3',
    '&:hover': {
      backgroundColor: '#4e4f4e',
    },
  },
  friendItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  inviteButton: {
    height: '50px',
    borderRadius: '10px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  bottomSection: {
    position: 'fixed',
    bottom: '70px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '85%',
    padding: '0 16px',
  },
}));

export default useStyles;