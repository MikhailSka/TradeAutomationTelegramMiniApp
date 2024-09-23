import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useAppStore } from '../../state/store';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import useStyles from './Tasks.styles';

const getTaskIcon = (platform: string) => {
  switch (platform) {
    case 'YouTube':
      return <YouTubeIcon />;
    case 'Twitter':
      return <TwitterIcon />;
    default:
      return <CheckCircleIcon />;
  }
};

const Tasks: React.FC = () => {
  const classes = useStyles();
  const tasks = useAppStore((state) => state.tasks);
  const markTaskComplete = useAppStore((state) => state.markTaskComplete);

  const incompleteTasksCount = tasks.filter((task) => !task.isComplete).length;

  const handleStartTask = (id: number) => {
    markTaskComplete(id);
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Tasks{' '}
        <sup style={{ fontSize: '18px', color: '#FF0000' }}>{incompleteTasksCount}</sup>
      </Typography>

      {tasks.map((task) => (
        <Box key={task.id} className={classes.taskItem}>
          <Box className={classes.taskIcon}>{getTaskIcon(task.platform)}</Box>

          <Box className={classes.taskDetails}>
            <Typography variant="h6" className={classes.taskTitle} noWrap>
              {task.title}
            </Typography>
            <Typography variant="body2" className={classes.taskPoints}>
              +{task.points} BP
            </Typography>
          </Box>

          {task.isComplete ? (
            <CheckCircleIcon className={classes.completedIcon} />
          ) : (
            <Button
              variant="contained"
              className={classes.startButton}
              onClick={() => handleStartTask(task.id)}
            >
              Start
            </Button>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Tasks;