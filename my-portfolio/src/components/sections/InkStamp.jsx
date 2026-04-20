
import React from 'react';
import { motion } from 'framer-motion';

const InkStamp = ({ visible, message }) => {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: -5 }} // Initial state with rotation
      animate={{ scale: 1, opacity: 1, rotate: -5 }} // Animate to scale and opacity, keep rotation consistent
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.2, // Slight delay before it starts animating in
        rotate: { type: 'spring', stiffness: 200, damping: 15 }, // Animate rotation separately if needed
      }}
      style={{
        position: 'fixed', // Use fixed to position relative to viewport
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(-5deg)', // Center and apply rotation
        backgroundColor: '#f0f0f0', // Light gray background
        padding: '20px 40px', // Generous padding
        borderRadius: '50%', // Makes it round
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)', // Softer shadow
        fontSize: '1.2em',
        fontWeight: 'bold',
        color: '#333', // Dark gray text
        textAlign: 'center',
        zIndex: 1000, // Ensure it's on top of other content
        border: '2px solid #ccc', // Subtle border
        maxWidth: '80%', // Prevent it from being too wide on small screens
        wordBreak: 'break-word', // Ensure long words break
      }}
    >
      {message}
    </motion.div>
  );
};

export default InkStamp;
