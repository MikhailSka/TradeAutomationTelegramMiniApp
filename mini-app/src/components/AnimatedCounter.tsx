import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';  // Import Framer Motion for animations

interface AnimatedCounterProps {
  targetValue: number;  // The value to animate to
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ targetValue }) => {
  const [displayValue, setDisplayValue] = useState(targetValue);  // Start with the targetValue
  const prevValue = useRef(targetValue);  // Store the previous value to detect changes

  // Only increment the counter when the target value increases
  useEffect(() => {
    if (targetValue > prevValue.current) {
      const interval = setInterval(() => {
        setDisplayValue((prev) => {
          if (prev < targetValue) {
            return prev + 1;  // Increment by 1 until the target is reached
          } else {
            clearInterval(interval);  // Stop the interval once the target is reached
            return prev;
          }
        });
      }, 20);  // Adjust the speed of the count-up effect

      prevValue.current = targetValue;  // Update the previous value after the animation starts

      return () => clearInterval(interval);  // Cleanup interval on unmount
    } else {
      setDisplayValue(targetValue);  // If no animation needed, just set the value directly
    }
  }, [targetValue]);  // Only run effect when targetValue changes

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}  // Starting animation state
      animate={{ opacity: 1, scale: 1 }}    // Ending animation state
      transition={{ duration: 0.3 }}        // Animation duration
      style={{
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginTop: '10px',
      }}
    >
      ₿ {displayValue.toLocaleString()}  {/* Display the value formatted with commas */}
    </motion.div>
  );
};

export default AnimatedCounter;
