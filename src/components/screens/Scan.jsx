import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PhysicsButton from '../PhysicsButton';
import faceScan from '../../assets/images/03_face_scan.jpg';

const Scan = ({ handleStepChange }) => {
  const [progress, setProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (isScanning && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + 2, 100));
      }, 50);
      return () => clearTimeout(timer);
    }

    if (progress >= 100) {
      setTimeout(() => {
        handleStepChange('scanComplete');
      }, 500);
    }
  }, [isScanning, progress, handleStepChange]);

  const handleStartScan = () => {
    setIsScanning(true);
  };

  return (
    <motion.div
      key="scan"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black z-[110] flex flex-col overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 grayscale"
        style={{ backgroundImage: `url(${faceScan})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <p className="text-[10px] text-blue-400 font-bold tracking-[0.3em] uppercase">
              SYS_AUTH: {isScanning ? 'SCANNING' : 'READY'}
            </p>
          </motion.div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleStepChange('profile')}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20"
          >
            ←
          </motion.button>
        </div>

        {/* Title */}
        <div className="mt-6 space-y-3">
          <h3 className="text-2xl font-bold text-white tracking-tight uppercase italic">
            {isScanning ? 'Analyzing Facial Map...' : 'Ready to Scan'}
          </h3>
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]"
            />
          </div>
          <p className="text-[10px] text-white/40 font-mono tracking-wider">
            PROGRESS: {progress}%
          </p>
        </div>

        {/* Scan Area */}
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="relative w-64 h-80">
            {/* Outer Frame */}
            <div className="absolute inset-0 border-2 border-blue-500/30 rounded-[3rem] overflow-hidden">
              {/* Corner Markers */}
              {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => (
                <div
                  key={pos}
                  className={`absolute w-8 h-8 border-blue-400 ${
                    pos.includes('top') ? 'top-4' : 'bottom-4'
                  } ${pos.includes('left') ? 'left-4 border-l-2 border-t-2' : 'right-4 border-r-2 border-t-2'}
                  ${pos.includes('bottom') ? 'border-t-0 border-b-2' : ''}`}
                />
              ))}

              {/* Scanning Laser Line */}
              {isScanning && (
                <motion.div
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_30px_#3b82f6]"
                />
              )}

              {/* Grid Overlay */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Center Crosshair */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: isScanning ? [1, 1.1, 1] : 1, opacity: isScanning ? 1 : 0.5 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-16 h-16 border border-blue-400/50 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                </motion.div>
              </div>
            </div>

            {/* Pulsing Ring */}
            {isScanning && (
              <motion.div
                animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 border-2 border-blue-400 rounded-[3rem]"
              />
            )}
          </div>
        </div>

        {/* Data Display */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'FACE_TYPE', value: isScanning ? 'ANALYZING' : 'PENDING' },
            { label: 'SYMMETRY', value: isScanning ? `${Math.min(progress, 98)}%` : '--' },
            { label: 'COLOR_TONE', value: isScanning ? 'COOL' : 'PENDING' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10"
            >
              <p className="text-[8px] text-blue-400 font-mono uppercase tracking-wider">{item.label}</p>
              <p className="text-xs text-white font-bold mt-1 font-mono">{item.value}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        {!isScanning ? (
          <PhysicsButton
            variant="blue"
            depth={12}
            onClick={handleStartScan}
            icon="📡"
          >
            START AUTO-SCAN
          </PhysicsButton>
        ) : progress >= 100 ? (
          <PhysicsButton
            variant="success"
            depth={10}
            onClick={() => handleStepChange('solution')}
            icon="✓"
          >
            ANALYSIS COMPLETE
          </PhysicsButton>
        ) : (
          <div className="py-5 text-center">
            <motion.p
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-blue-400 text-xs font-bold uppercase tracking-widest"
            >
              Processing Biometric Data...
            </motion.p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Scan;
