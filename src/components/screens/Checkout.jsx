import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PhysicsButton from '../PhysicsButton';
import thelookBridge from '../../assets/images/06_thelook_bridge.jpg';

const Checkout = ({ handleStepChange }) => {
  const [progress, setProgress] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsConnected(true);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      key="checkout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-8 relative overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${thelookBridge})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleStepChange('solution')}
        className="absolute top-8 left-8 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20"
      >
        ←
      </motion.button>

      {/* Content */}
      <div className="relative z-10 space-y-8 w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-4"
        >
          <motion.h2
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-6xl font-serif italic text-white font-bold tracking-tighter"
          >
            THE LOOK.
          </motion.h2>
          <p className="text-xs text-gray-500 uppercase tracking-[0.4em]">
            Premium Fashion Platform
          </p>
        </motion.div>

        {/* Connection Status */}
        <div className="space-y-4">
          <motion.p
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]"
          >
            {isConnected ? 'Connection Established' : 'Establishing Secure Sync...'}
          </motion.p>

          {/* Progress Bar */}
          <div className="w-full max-w-xs mx-auto h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-orange-500 to-white shadow-[0_0_15px_white]"
            />
          </div>

          <p className="text-xs text-gray-600 font-mono">{progress}%</p>
        </div>

        {/* Features */}
        {isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-3 gap-4 mt-8"
          >
            {[
              { icon: '🛍️', label: '독점 제품' },
              { icon: '🚀', label: '빠른 배송' },
              { icon: '💎', label: 'VIP 혜택' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
              >
                <span className="text-2xl block mb-2">{item.icon}</span>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">{item.label}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="space-y-4 mt-12"
        >
          {isConnected ? (
            <>
              <PhysicsButton
                variant="secondary"
                depth={8}
                onClick={() => window.open('https://www.thelook.co.kr', '_blank')}
                icon="🛍️"
              >
                THE LOOK 쇼핑하기
              </PhysicsButton>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStepChange('home')}
                className="w-full py-4 text-gray-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                ← Return to StyleSync
              </motion.button>
            </>
          ) : (
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full"
              />
              <span className="text-xs uppercase tracking-widest">Connecting...</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-900/20 to-transparent pointer-events-none" />

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/10" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-white/10" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/10" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/10" />
    </motion.div>
  );
};

export default Checkout;
