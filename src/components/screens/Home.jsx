import React from 'react';
import { motion } from 'framer-motion';
import PhysicsButton from '../PhysicsButton';
import hairHero from '../../assets/images/01_hair_hero.jpg';

const Home = ({ handleStepChange, pageVariants }) => {
  return (
    <motion.div
      key="home"
      {...pageVariants}
      className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e] text-white relative overflow-hidden"
    >
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-50 px-6 pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight">
            Style<span className="text-orange-400">Sync</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1 tracking-widest uppercase">AI Personal Stylist</p>
        </motion.div>
      </header>

      {/* Main Hero Card */}
      <main className="relative z-10 px-6 pb-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative"
        >
          {/* Card Label */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-400 tracking-widest uppercase">Today's Pick</span>
            <span className="px-3 py-1 bg-orange-500/30 text-orange-300 text-[10px] font-bold rounded-full uppercase tracking-wider">
              New Season
            </span>
          </div>

          {/* Hero Image Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleStepChange('profile')}
            className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden cursor-pointer group"
          >
            {/* Image */}
            <img
              src={hairHero}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Recommended Hair Style"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              {/* Style Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-2">
                  Recommended for You
                </p>
                <h2 className="text-4xl font-bold leading-tight mb-3">
                  Winter Soft<br />Layers
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  부드러운 레이어드 컷으로<br />
                  세련된 겨울 스타일을 완성하세요
                </p>

                {/* Tags */}
                <div className="flex gap-2 flex-wrap">
                  {['Natural', 'Layered', 'Trendy'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm text-xs rounded-full text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Tap Indicator */}
            <div className="absolute top-6 right-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
              >
                <span className="text-white text-lg">→</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-3 mt-6"
        >
          {[
            { icon: '✨', label: 'AI 분석', value: '얼굴형 매칭' },
            { icon: '👤', label: '맞춤 추천', value: '체형 기반' },
            { icon: '🛍️', label: '쇼핑 연동', value: 'THE LOOK' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10"
            >
              <span className="text-2xl mb-2 block">{item.icon}</span>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">{item.label}</p>
              <p className="text-xs text-gray-300 mt-1">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Bottom CTA - 3D Physics Button */}
      <div className="fixed bottom-24 inset-x-0 p-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent z-[100]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <PhysicsButton
            variant="gradient"
            depth={10}
            onClick={() => handleStepChange('profile')}
            icon="✨"
          >
            START STYLING
          </PhysicsButton>
        </motion.div>

        {/* Safety Text */}
        <p className="text-center text-[10px] text-gray-600 mt-4">
          스타일링 시작 시 프로필 정보를 입력합니다
        </p>
      </div>
    </motion.div>
  );
};

export default Home;
