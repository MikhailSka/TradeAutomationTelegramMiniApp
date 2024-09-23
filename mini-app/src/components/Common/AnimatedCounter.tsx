import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

interface AnimatedCounterProps {
  targetValue: number; // The target value to animate to
}

const useStyles = makeStyles((theme: Theme) => ({
  counter: {
    fontFamily: theme.typography.fontFamily, // Ensure it uses the theme's font
    fontWeight: theme.typography.fontWeightBold, // Adjust the weight as per your design needs
    fontSize: '48px', // Adjust size to your preference
    color: theme.palette.text.primary, // Use primary text color
    textAlign: 'center', // Center text alignment
    marginTop: '10px', // Adjust margin for better spacing
  },
}));

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ targetValue }) => {
  const classes = useStyles();
  const [displayValue, setDisplayValue] = useState(targetValue); // Start with the targetValue
  const prevValue = useRef(targetValue); // Store the previous value to detect changes

  // Increment the counter when the target value increases
  useEffect(() => {
    if (targetValue > prevValue.current) {
      const interval = setInterval(() => {
        setDisplayValue((prev) => {
          if (prev < targetValue) {
            return prev + 1; // Increment by 1 until the target is reached
          } else {
            clearInterval(interval); // Stop the interval once the target is reached
            return prev;
          }
        });
      }, 20); // Adjust the speed of the count-up effect

      prevValue.current = targetValue; // Update the previous value after the animation starts

      return () => clearInterval(interval); // Cleanup interval on unmount
    } else {
      setDisplayValue(targetValue); // If no animation needed, just set the value directly
    }
  }, [targetValue]); // Only run effect when targetValue changes

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }} // Starting animation state
      animate={{ opacity: 1, scale: 1 }} // Ending animation state
      transition={{ duration: 0.3 }} // Animation duration
      className={classes.counter}
    >
      ₿ {displayValue.toLocaleString()} {/* Display the value formatted with commas */}
    </motion.div>
  );
};

export default AnimatedCounter;