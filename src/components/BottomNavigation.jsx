import React from 'react';
import { motion } from 'framer-motion';

const BottomNavigation = ({ currentStep, handleStepChange }) => {
  const navItems = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'profile', icon: '👤', label: 'Profile' },
    { id: 'solution', icon: '✨', label: 'Style' },
    { id: 'weekly', icon: '📅', label: 'Weekly' },
  ];

  // 네비게이션 바를 보여주지 않을 화면들
  const hideOnSteps = ['splash', 'scan', 'scanComplete', 'checkout'];

  if (hideOnSteps.includes(currentStep)) {
    return null;
  }

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 inset-x-0 z-[90] px-4 pb-6"
    >
      <div className="max-w-md mx-auto bg-[#1a1a2e]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = currentStep === item.id ||
              (item.id === 'solution' && ['solution', 'confirmation'].includes(currentStep)) ||
              (item.id === 'weekly' && ['weekly', 'calendar'].includes(currentStep));

            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleStepChange(item.id)}
                className={`flex flex-col items-center py-3 px-5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-orange-500/30 text-orange-400'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <motion.span
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  className="text-xl mb-1"
                >
                  {item.icon}
                </motion.span>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  isActive ? 'text-orange-400' : 'text-gray-500'
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-1 w-1 h-1 bg-orange-400 rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;
