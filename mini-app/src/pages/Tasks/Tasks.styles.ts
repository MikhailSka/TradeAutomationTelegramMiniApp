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
  taskItem: {
    padding: '16px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskDetails: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginLeft: '16px',
  },
  taskTitle: {
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: '4px',
  },
  taskPoints: {
    color: theme.palette.text.secondary,
  },
  taskIcon: {
    marginRight: '16px',
  },
  startButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  completedIcon: {
    color: '#28a745',
    fontSize: '32px',
  },
}));

export default useStyles;