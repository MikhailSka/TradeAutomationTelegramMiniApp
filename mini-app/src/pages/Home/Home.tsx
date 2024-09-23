import React, { useEffect, useState, useRef } from 'react';
import { Typography, Box } from '@mui/material';
import { useAppStore } from '../../state/store';
import AnimatedCounter from '../../components/Common/AnimatedCounter';
import Button from '../../components/Common/Button';
import useStyles from './Home.styles';

const Home: React.FC = () => {
  const classes = useStyles();

  const username = useAppStore((state) => state.username);
  const points = useAppStore((state) => state.points);
  const farmingStartTime = useAppStore((state) => state.farmingStartTime);
  const collectFarmingPoints = useAppStore((state) => state.collectFarmingPoints);
  const startFarming = useAppStore((state) => state.startFarming);

  const [timeLeft, setTimeLeft] = useState('8:00:00');
  const [farmingStatus, setFarmingStatus] = useState<'start' | 'in-progress' | 'complete'>('start');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateFarmingTimeLeft = () => {
      if (farmingStartTime) {
        const elapsed = Date.now() - farmingStartTime;
        const totalFarmingTime = 8 * 60 * 60 * 1000; // 8 hours
        const remaining = totalFarmingTime - elapsed;

        if (remaining > 0) {
          const hours = Math.floor(remaining / (1000 * 60 * 60));
          const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
          setFarmingStatus('in-progress');
        } else {
          setTimeLeft('0:00:00');
          setFarmingStatus('complete');
        }
      }
    };

    updateFarmingTimeLeft();

    if (intervalRef.current) clearInterval(intervalRef.current);

    if (farmingStartTime) {
      intervalRef.current = setInterval(updateFarmingTimeLeft, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [farmingStartTime]);

  const handleStartFarming = () => {
    if (farmingStatus === 'complete') {
      collectFarmingPoints();
      setFarmingStatus('start');
    } else if (farmingStatus === 'start') {
      startFarming();
      setFarmingStatus('in-progress');
    }
  };

  const getButtonStyles = () => {
    if (farmingStatus === 'complete') {
      return {
        backgroundColor: '#28a745',
        '&:hover': {
          backgroundColor: '#218838',
        },
      };
    } else if (farmingStatus === 'in-progress') {
      return {
        backgroundColor: '#29292b',
        '&:hover': {
          backgroundColor: '#3a3a3a',
        },
      };
    } else {
      return {
        backgroundColor: '#969696',
        '&:hover': {
          backgroundColor: '#7e7e7e',
        },
      };
    }
  };

  const getButtonText = () => {
    if (farmingStatus === 'complete') return 'Collect Points';
    if (farmingStatus === 'in-progress') return `Farming in Progress: ${timeLeft}`;
    return 'Start Farming';
  };

  return (
    <Box className={classes.root}>
      {/* Centered Section */}
      <Box className={classes.centeredSection}>
        {/* 1. Placeholder for Logo or Avatar */}
        <Typography variant="h6" className={classes.username}>
          {username}
        </Typography>

        {/* 2. Animated Points Counter */}
        <AnimatedCounter targetValue={points} />
      </Box>

      {/* Bottom Section (Farming Button) */}
      <Box className={classes.bottomSection}>
        <Button
          fullWidth
          onClick={handleStartFarming}
          disabled={farmingStatus === 'in-progress'}
          className={classes.farmingButton}
          sx={getButtonStyles()}
        >
          {getButtonText()}
        </Button>
      </Box>
    </Box>
  );
};

export default Home;