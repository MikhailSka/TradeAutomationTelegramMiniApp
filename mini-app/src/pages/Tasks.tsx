import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Completed icon
import YouTubeIcon from '@mui/icons-material/YouTube'; // Example: YouTube icon
import TwitterIcon from '@mui/icons-material/Twitter'; // Example: Twitter icon
import { useAppStore } from '../state/store';  // Import the store

// Define task types to assign icons
const getTaskIcon = (platform: string) => {
  switch (platform) {
    case 'YouTube':
      return <YouTubeIcon sx={{ color: '#FF0000', fontSize: '32px' }} />; // Red YouTube icon
    case 'Twitter':
      return <TwitterIcon sx={{ color: '#1DA1F2', fontSize: '32px' }} />; // Blue Twitter icon
    default:
      return <CheckCircleIcon sx={{ color: '#28a745', fontSize: '32px' }} />; // Default completed icon
  }
};

const Tasks: React.FC = () => {
  const tasks = useAppStore((state) => state.tasks);  // Get tasks from store
  const markTaskComplete = useAppStore((state) => state.markTaskComplete);  // Function to mark task complete

  // Calculate the number of incomplete tasks
  const incompleteTasksCount = tasks.filter(task => !task.isComplete).length;

  // Handle task start button click
  const handleStartTask = (id: number) => {
    markTaskComplete(id);  // Mark the task as complete and add points
  };

  return (
    <Box
      sx={{ padding: '16px', bgcolor: '#121212', color: '#e0e0e0', height: '100vh' }}
    >
      {/* Display "Tasks" with a badge for the number of incomplete tasks */}
      <Typography variant="h4" gutterBottom>
        Tasks 
        <sup style={{ fontSize: '18px' }}> {/* Red number for active tasks */}
          {incompleteTasksCount}
        </sup>
      </Typography>

      {tasks.map((task) => (
        <Box
          key={task.id}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ padding: '16px', borderBottom: '1px solid #333' }}
        >
          {/* Task Icon */}
          <Box display="flex" alignItems="center" sx={{ mr: 2 }}>
            {getTaskIcon(task.platform)}  {/* Dynamically display the task icon */}
          </Box>

          {/* Task Title and Points */}
          <Box display="flex" flexDirection="column" sx={{ flexGrow: 1 }}>
            <Typography variant="h6" noWrap>{task.title}</Typography>  {/* Title text with ellipsis */}
            <Typography variant="body2">+{task.points} BP</Typography>
          </Box>

          {/* Task Status: Show either Start button or Completed icon */}
          {task.isComplete ? (
            <CheckCircleIcon sx={{ color: '#28a745', fontSize: '32px' }} />
          ) : (
            <Button
              variant="contained"
              sx={{ backgroundColor: '#4e4f4e', color: '#fff' }}
              onClick={() => handleStartTask(task.id)}  // Call to add points
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
