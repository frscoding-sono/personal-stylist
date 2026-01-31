import React from 'react';
import { motion } from 'framer-motion';
import { APP_STEPS } from '../constants';

const Checkout = ({ setStep }) => {
  return (
    <motion.div key="checkout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-12 space-y-10">
      <motion.h2
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-6xl font-serif italic text-white font-bold tracking-tighter"
      >
        THE LOOK.
      </motion.h2>
      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.6em] animate-pulse">Establishing Secure Sync...</p>
      <div className="w-56 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 3 }} className="h-full bg-white shadow-[0_0_15px_white]" />
      </div>
      <button onClick={() => setStep(APP_STEPS.HOME)} className="mt-20 text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em] underline">Return to StyleSync</button>
    </motion.div>
  );
};

export default Checkout;