import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhysicsButton from '../PhysicsButton';
import finalLookImg from '../../assets/images/05_final_look.jpg';

const StyleConfirmation = ({ handleStepChange, pageVariants }) => {
  const [selectedAction, setSelectedAction] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const actionOptions = [
    {
      id: 'weekly',
      icon: '📅',
      title: '주간 스타일 예약',
      description: '일주일 스타일을 미리 계획하세요',
      color: 'from-orange-400 to-orange-500',
      step: 'weekly',
    },
    {
      id: 'purchase',
      icon: '🛍️',
      title: 'THE LOOK 구매',
      description: '추천 아이템을 바로 구매하세요',
      color: 'from-orange-500 to-orange-600',
      step: 'checkout',
    },
    {
      id: 'save',
      icon: '💾',
      title: '스타일 저장',
      description: '나만의 스타일을 저장하세요',
      color: 'from-orange-600 to-orange-700',
      step: null,
    },
  ];

  const handleAction = (action) => {
    setSelectedAction(action.id);

    if (action.step) {
      setTimeout(() => {
        handleStepChange(action.step);
      }, 500);
    } else {
      // 저장 액션
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setSelectedAction(null);
      }, 2000);
    }
  };

  return (
    <motion.div
      key="style-confirmation"
      {...pageVariants}
      className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e] text-white pb-32"
    >
      {/* Header */}
      <header className="p-6 pt-12">
        <div className="flex items-center gap-3 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleStepChange('solution')}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20"
          >
            ←
          </motion.button>
          <div>
            <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Complete</p>
            <h2 className="text-2xl font-bold text-white">스타일 확정</h2>
          </div>
        </div>
      </header>

      {/* Final Look Preview */}
      <div className="px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
        >
          <img
            src={finalLookImg}
            className="w-full h-full object-cover"
            alt="Your Final Look"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Style Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="absolute top-4 right-4 px-4 py-2 bg-orange-500/90 backdrop-blur-sm rounded-full flex items-center gap-2"
          >
            <span className="text-lg">✓</span>
            <span className="text-xs font-bold uppercase tracking-wider">Confirmed</span>
          </motion.div>

          {/* Style Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-1">
                Your Perfect Look
              </p>
              <h3 className="text-2xl font-bold mb-3">Winter Elegance</h3>
              <div className="flex gap-2">
                {['#Minimal', '#Trendy', '#Warm'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/10 backdrop-blur-sm text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Action Options */}
      <div className="px-6 space-y-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">다음 단계 선택</p>

        {actionOptions.map((action, idx) => (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + idx * 0.1 }}
            whileTap={{ scale: 0.98, y: 4 }}
            onClick={() => handleAction(action)}
            className={`w-full p-5 rounded-2xl flex items-center gap-4 transition-all border-2 ${
              selectedAction === action.id
                ? 'border-orange-500 bg-orange-600/20'
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
            style={{ boxShadow: '0 4px 0 0 rgba(255,255,255,0.05)' }}
          >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center text-2xl shadow-lg`}>
              {action.icon}
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-bold text-sm">{action.title}</h4>
              <p className="text-xs text-gray-400 mt-1">{action.description}</p>
            </div>
            <motion.div
              animate={{ x: selectedAction === action.id ? 5 : 0 }}
              className="text-gray-400"
            >
              →
            </motion.div>
          </motion.button>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent z-[100]">
        <PhysicsButton
          variant="gradient"
          depth={10}
          onClick={() => handleStepChange('home')}
          icon="🏠"
        >
          처음으로 돌아가기
        </PhysicsButton>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[200]"
          >
            <div className="bg-green-500 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg">
              <span>✓</span>
              <span>스타일이 저장되었습니다!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StyleConfirmation;
