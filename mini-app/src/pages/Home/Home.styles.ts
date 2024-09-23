import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '16px',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    textAlign: 'center',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Vertically center content
    alignItems: 'center', // Horizontally center content
  },
  centeredSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '4rem',
  },
  username: {
    marginTop: '10px',
    // No fontFamily override here
  },
  bottomSection: {
    position: 'fixed',
    bottom: '70px',
    width: '85%',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '0 16px',
  },
  farmingButton: {
    height: '50px',
    borderRadius: '10px',
    color: '#fff',
    // Background color is handled via `sx` prop in `Home.tsx`
  },
}));

export default useStyles;