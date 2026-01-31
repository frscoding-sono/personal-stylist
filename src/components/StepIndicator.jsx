import React from 'react';
import { motion } from 'framer-motion';

const StepIndicator = ({ currentStep, totalSteps = 5, onStepClick }) => {
  const steps = [
    { id: 1, name: 'Profile', step: 'profile' },
    { id: 2, name: 'Scan', step: 'scan' },
    { id: 3, name: 'Style', step: 'solution' },
    { id: 4, name: 'Plan', step: 'weekly' },
    { id: 5, name: 'Shop', step: 'checkout' },
  ];

  const stepOrder = ['profile', 'scan', 'scanComplete', 'solution', 'confirmation', 'weekly', 'calendar', 'checkout'];
  const currentIndex = stepOrder.indexOf(currentStep);

  const getStepStatus = (stepName) => {
    const stepIdx = stepOrder.indexOf(stepName);
    if (stepIdx < currentIndex) return 'completed';
    if (stepIdx === currentIndex || stepOrder[currentIndex]?.includes(stepName)) return 'current';
    return 'upcoming';
  };

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {steps.map((step, idx) => {
        const status = getStepStatus(step.step);
        const isCompleted = status === 'completed';
        const isCurrent = status === 'current';

        return (
          <React.Fragment key={step.id}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => isCompleted && onStepClick?.(step.step)}
              className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                isCompleted
                  ? 'bg-orange-500 text-white cursor-pointer'
                  : isCurrent
                  ? 'bg-orange-600 text-white'
                  : 'bg-white/10 text-gray-500'
              }`}
            >
              {isCompleted ? (
                <span className="text-xs">✓</span>
              ) : (
                <span className="text-xs font-bold">{step.id}</span>
              )}

              {/* Pulse animation for current step */}
              {isCurrent && (
                <motion.div
                  animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-0 border-2 border-orange-500 rounded-full"
                />
              )}
            </motion.button>

            {/* Connector Line */}
            {idx < steps.length - 1 && (
              <div className={`w-8 h-0.5 rounded-full transition-all ${
                isCompleted ? 'bg-orange-500' : 'bg-white/10'
              }`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;
