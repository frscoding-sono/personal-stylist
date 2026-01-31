import React from 'react';
import { motion } from 'framer-motion';
import PhysicsButton from '../PhysicsButton';

const WelcomeBack = ({ handleStepChange, pageVariants, userName = '스타일러' }) => {
  const quickActions = [
    { id: 'continue', icon: '▶️', label: '이어서 하기', step: 'solution' },
    { id: 'new', icon: '✨', label: '새 스타일링', step: 'profile' },
    { id: 'weekly', icon: '📅', label: '주간 계획', step: 'weekly' },
    { id: 'shop', icon: '🛍️', label: 'THE LOOK', step: 'checkout' },
  ];

  return (
    <motion.div
      key="welcome-back"
      {...pageVariants}
      className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e] text-white p-6 flex flex-col"
    >
      {/* Header */}
      <header className="pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <p className="text-xs text-orange-400 font-bold uppercase tracking-widest">Welcome Back</p>
          <h1 className="text-3xl font-bold">
            안녕하세요, <span className="text-orange-400">{userName}</span>님!
          </h1>
          <p className="text-sm text-gray-400">오늘도 멋진 스타일링 해볼까요?</p>
        </motion.div>
      </header>

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-3 mb-8"
      >
        {[
          { label: '완료한 스타일', value: '12', icon: '✨' },
          { label: '저장한 룩', value: '5', icon: '💾' },
          { label: '주간 예약', value: '3', icon: '📅' },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10"
          >
            <span className="text-xl mb-1 block">{stat.icon}</span>
            <p className="text-xl font-bold text-white">{stat.value}</p>
            <p className="text-[9px] text-gray-500 uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex-1"
      >
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">빠른 실행</p>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, idx) => (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              whileTap={{ scale: 0.95, y: 4 }}
              onClick={() => handleStepChange(action.step)}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-left border border-white/10 hover:bg-white/10 transition-all"
              style={{ boxShadow: '0 4px 0 0 rgba(255,255,255,0.05)' }}
            >
              <span className="text-3xl mb-3 block">{action.icon}</span>
              <p className="text-sm font-bold">{action.label}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Last Style Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 mb-24"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-gray-400 uppercase tracking-widest">마지막 스타일</p>
          <button className="text-xs text-orange-400 font-bold">더보기 →</button>
        </div>
        <div className="bg-gradient-to-r from-orange-600/20 to-orange-500/20 rounded-2xl p-4 border border-orange-500/30 flex items-center gap-4">
          <div className="w-16 h-20 bg-orange-500/30 rounded-xl flex items-center justify-center text-2xl">
            👔
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm">Winter Elegance</p>
            <p className="text-xs text-gray-400 mt-1">2일 전 저장됨</p>
            <div className="flex gap-1 mt-2">
              {['#Minimal', '#Trendy'].map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-white/10 text-[9px] rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleStepChange('solution')}
            className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center"
          >
            →
          </motion.button>
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <div className="fixed bottom-24 inset-x-0 p-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent z-[100]">
        <PhysicsButton
          variant="gradient"
          depth={10}
          onClick={() => handleStepChange('profile')}
          icon="✨"
        >
          새로운 스타일링 시작
        </PhysicsButton>
      </div>
    </motion.div>
  );
};

export default WelcomeBack;
