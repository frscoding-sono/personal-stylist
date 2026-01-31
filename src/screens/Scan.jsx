import React from 'react';
import { motion } from 'framer-motion';
import { APP_STEPS } from '../constants';
import { IMAGE_PATHS } from '../data/imagePaths';

const Scan = ({ setStep }) => {
  return (
    <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black z-[110] p-10 flex flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 bg-[url('${IMAGE_PATHS.FACE_SCAN}')] bg-cover opacity-50 grayscale" />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div className="relative z-10 space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-[10px] text-blue-500 font-bold tracking-[0.4em] uppercase">Sys_Auth: Active</p>
          <button onClick={() => setStep(APP_STEPS.HOME)} className="text-white text-xl">✕</button>
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight uppercase italic">Analyzing Facial Map...</h3>
        <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: '74%' }} transition={{ duration: 2 }} className="h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]" />
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="w-64 h-80 border border-blue-500/30 rounded-full relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-dashed border-blue-400 opacity-20 animate-pulse" />
          <motion.div
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_25px_#3b82f6]"
          />
          <div className="text-blue-500 font-mono text-[8px] opacity-40">XY_COORD_SYNC_ENABLED</div>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setStep(APP_STEPS.SOLUTION)}
        className="relative z-10 py-7 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-[0_0_40px_rgba(59,130,246,0.6)] border border-blue-400"
      >
        Start Auto-Scan
      </motion.button>
    </motion.div>
  );
};

export default Scan;