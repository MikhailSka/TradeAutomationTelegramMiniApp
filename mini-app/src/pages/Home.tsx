import React, { useEffect, useState, useRef } from 'react';
import { Typography, Button, Avatar, Box } from '@mui/material';
import { useAppStore } from '../state/store';
import AnimatedCounter from '../components/AnimatedCounter';  // Import AnimatedCounter

const Home: React.FC = () => {
  const username = useAppStore((state) => state.username);
  const points = useAppStore((state) => state.points);
  const farmingStartTime = useAppStore((state) => state.farmingStartTime);
  const collectFarmingPoints = useAppStore((state) => state.collectFarmingPoints);  // Function to collect farming points
  const startFarming = useAppStore((state) => state.startFarming);

  const [timeLeft, setTimeLeft] = useState('8:00:00');  // Initial farming time with hours, minutes, and seconds
  const [farmingStatus, setFarmingStatus] = useState<'start' | 'in-progress' | 'complete'>('start');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);  // Keep track of the interval

  useEffect(() => {
    const updateFarmingTimeLeft = () => {
      if (farmingStartTime) {
        const elapsed = Date.now() - farmingStartTime;
        const totalFarmingTime = 2 *  1000;  // Farming duration, 2 minutes for testing (can be set to 8 hours)60 *
        const remaining = totalFarmingTime - elapsed;

        if (remaining > 0) {
          const hours = Math.floor(remaining / (1000 * 60 * 60));
          const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
          setFarmingStatus('in-progress');  // Farming is in progress
        } else {
          setTimeLeft('0:00:00');  // Farming is complete
          setFarmingStatus('complete');  // Change the status to complete
        }
      }
    };

    // Call immediately to avoid waiting 1 second before showing the correct state
    updateFarmingTimeLeft();

    // Clear any previous interval when the component unmounts or before creating a new one
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Set interval for regular updates
    if (farmingStartTime) {
      intervalRef.current = setInterval(updateFarmingTimeLeft, 1000);  // Update every second
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);  // Cleanup the interval on component unmount
    };
  }, [farmingStartTime]);  // Dependency only on farmingStartTime

  // Handle button click to start or restart farming
  const handleStartFarming = () => {
    if (farmingStatus === 'complete') {
      // If farming is complete, collect the farming points
      collectFarmingPoints();
      setFarmingStatus('start');  // Change status back to start
    } else if (farmingStatus === 'start') {
      // If farming hasn't started yet, start farming
      startFarming();
      setFarmingStatus('in-progress');  // Change to in-progress when farming starts
    }
  };

  // Define button color based on farming status using hex colors
  const getButtonStyle = () => {
    if (farmingStatus === 'complete') return { backgroundColor: '#28a745', color: '#fff' };  // Green when complete
    if (farmingStatus === 'in-progress') return { backgroundColor: '#29292b', color: '#fff' };  // Black-like color when in progress
    return { backgroundColor: '#969696', color: '#fff' };  // Gray when starting
  };

  // Define button text based on farming status
  const getButtonText = () => {
    if (farmingStatus === 'complete') return 'Collect Points';
    if (farmingStatus === 'in-progress') return `Farming in Progress: ${timeLeft}`;
    return 'Start Farming';
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"  // Center content vertically
      alignItems="center"
      sx={{
        minHeight: '100vh',  // Full viewport height to center vertically
        bgcolor: '#121212',  // Background color
        textAlign: 'center', // Center text horizontally
      }}
    >
      {/* Centered Section */}
      <Box 
        display="flex"
        flexDirection="column"
        alignItems="center" // Ensure everything is aligned in the center
        sx={{ mb: 4 }}
      >
        {/* 1. Placeholder for Logo */}
        <Avatar sx={{ bgcolor: 'blue', width: 80, height: 80 }}>
          {username.charAt(0).toUpperCase()}  {/* Get first letter of username */}
        </Avatar>

        {/* 2. Username */}
        <Typography variant="h6" sx={{ marginTop: '10px', color: '#e0e0e0' }}>
          {username}
        </Typography>

        {/* 3. Animated Points Counter */}
        <AnimatedCounter targetValue={points} />  {/* Use the AnimatedCounter component */}
      </Box>

      {/* Bottom Section (Farming Button) */}
      <Box 
        sx={{ 
          position: 'fixed', 
          bottom: '70px', 
          width: '85%',   // Set the container's width to 85%
          px: 2            // Add padding to create space around the button
        }}
      >
        <Button
          fullWidth  // Makes the button take the full width of its container
          sx={{ 
            height: '50px',
            borderRadius: '10px',  // Set the border radius to round the corners
            ...getButtonStyle()     // Apply dynamic styles based on farming status
          }}
          onClick={handleStartFarming}  // Start or restart farming on click
        >
          {getButtonText()}  {/* Display the button text based on farming status */}
        </Button>
      </Box>

    </Box>
  );
};

export default Home;
