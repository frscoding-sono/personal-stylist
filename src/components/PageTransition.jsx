import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children, direction = 'right' }) => {
  const variants = {
    initial: {
      opacity: 0,
      x: direction === 'right' ? 50 : -50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      x: direction === 'right' ? -50 : 50,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
