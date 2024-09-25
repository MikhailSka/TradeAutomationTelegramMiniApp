// src/components/Animations/Confetti.tsx
import React from 'react';
import { motion } from 'framer-motion';

const Confetti: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(255, 223, 0, 0.3)',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      {/* Confetti effect or any celebratory animation */}
    </motion.div>
  );
};

export default Confetti;
