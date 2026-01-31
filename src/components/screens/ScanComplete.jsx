import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ScanComplete = ({ handleStepChange }) => {
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // 결과 표시 타이머
    const resultTimer = setTimeout(() => {
      setShowResults(true);
    }, 800);

    // 다음 페이지로 전환 타이머
    const transitionTimer = setTimeout(() => {
      handleStepChange('solution');
    }, 3000);

    return () => {
      clearTimeout(resultTimer);
      clearTimeout(transitionTimer);
    };
  }, [handleStepChange]);

  const analysisResults = [
    { label: '얼굴형', value: 'OVAL', icon: '👤' },
    { label: '퍼스널 컬러', value: 'COOL TONE', icon: '🎨' },
    { label: '체형 타입', value: 'ATHLETIC', icon: '💪' },
    { label: '스타일 매칭', value: '96%', icon: '✨' },
  ];

  return (
    <motion.div
      key="scan-complete"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e] flex flex-col items-center justify-center z-[150] p-8"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="relative mb-8"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-24 h-24 bg-orange-500/20 rounded-full flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-3xl shadow-lg shadow-orange-500/50"
          >
            ✓
          </motion.div>
        </motion.div>

        {/* Pulse Ring */}
        <motion.div
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute inset-0 border-2 border-orange-500 rounded-full"
        />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-white mb-2">스캔 완료!</h2>
        <p className="text-gray-400 text-sm">AI가 당신만의 스타일을 분석했습니다</p>
      </motion.div>

      {/* Analysis Results */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm space-y-3"
        >
          {analysisResults.map((result, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="flex items-center justify-between bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{result.icon}</span>
                <span className="text-sm text-gray-400">{result.label}</span>
              </div>
              <span className="text-sm font-bold text-white tracking-wide">{result.value}</span>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Loading to Solution */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-0 right-0 text-center"
      >
        <motion.p
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-xs text-orange-400 uppercase tracking-widest"
        >
          스타일 솔루션 준비 중...
        </motion.p>
        <div className="mt-4 w-32 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="w-full h-full bg-gradient-to-r from-transparent via-orange-500 to-transparent"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScanComplete;
