import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const SplashScreen = ({ handleStepChange }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      handleStepChange('home');
    }, 2500);
    return () => clearTimeout(timer);
  }, [handleStepChange]);

  return (
    <motion.div
      key="splash"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] flex items-center justify-center z-[1000]"
    >
      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="absolute w-[500px] h-[500px] bg-orange-500/30 rounded-full blur-[150px]"
      />

      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h1
            className="text-5xl font-bold tracking-tight text-white"
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            Style<span className="text-orange-400">Sync</span>
          </motion.h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xs text-gray-500 mt-4 tracking-[0.3em] uppercase"
        >
          AI Personal Stylist
        </motion.p>

        {/* Loading Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  delay: i * 0.2,
                }}
                className="w-2 h-2 bg-orange-500 rounded-full"
              />
            ))}
          </div>
        </motion.div>

        {/* Version */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 text-[10px] text-gray-600 tracking-widest"
        >
          v1.0.0
        </motion.p>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-orange-500/30" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-orange-500/30" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-orange-500/30" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-orange-500/30" />
    </motion.div>
  );
};

export default SplashScreen;
