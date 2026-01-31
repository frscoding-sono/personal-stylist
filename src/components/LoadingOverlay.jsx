import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingOverlay = ({ isLoading, message = 'Loading...' }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[500] flex items-center justify-center"
        >
          <div className="text-center">
            {/* Spinner */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-12 h-12 border-3 border-white/20 border-t-orange-500 rounded-full mx-auto mb-4"
            />

            {/* Message */}
            <motion.p
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-sm text-gray-400 uppercase tracking-widest"
            >
              {message}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;
