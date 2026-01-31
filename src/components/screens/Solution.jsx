import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhysicsButton from '../PhysicsButton';
import solutionBase from '../../assets/images/04_solution_base.jpg';
import finalLookImg from '../../assets/images/05_final_look.jpg';

const CATEGORIES = ['HAIR', 'TOP', 'BOTTOM', 'SHOES'];
const TRENDING_DATA = {
  HAIR: ['Silk Smooth', 'Natural Perm', 'Classic Cut'],
  TOP: ['Premium Knit', 'Silk Shirt', 'Wool Jacket'],
  BOTTOM: ['Wide Slacks', 'Raw Denim', 'Cargo Pants'],
  SHOES: ['Derby Shoes', 'Classic Sneaker', 'Chelsea Boots']
};

const SNS_PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: '📸', color: 'from-pink-500 to-purple-600' },
  { id: 'twitter', name: 'Twitter', icon: '🐦', color: 'from-blue-400 to-blue-600' },
  { id: 'facebook', name: 'Facebook', icon: '👍', color: 'from-blue-600 to-blue-800' },
  { id: 'kakao', name: 'KakaoTalk', icon: '💬', color: 'from-yellow-400 to-yellow-500' },
];

const Solution = ({ handleStepChange, pageVariants, activeCategory, setActiveCategory, finalLook, setFinalLook }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleShare = (platform) => {
    setShareSuccess(true);
    setTimeout(() => {
      setShareSuccess(false);
      setShowShareModal(false);
    }, 1500);
  };

  const renderTrendingFeed = () => {
    return TRENDING_DATA[activeCategory].map((name, idx) => (
      <motion.button
        key={idx}
        whileTap={{ scale: 0.95, y: 5 }}
        onClick={() => setFinalLook(`${activeCategory}_${idx}`)}
        className={`min-w-[160px] aspect-[4/5] rounded-2xl border p-4 flex flex-col justify-between transition-all text-left group
          ${finalLook === `${activeCategory}_${idx}`
            ? 'bg-orange-600/20 border-orange-500'
            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-orange-500/50'
          }`}
      >
        <div className={`w-full h-20 rounded-xl mb-3 transition-colors
          ${finalLook === `${activeCategory}_${idx}` ? 'bg-orange-500/30' : 'bg-white/10 group-hover:bg-orange-500/20'}`}
        />
        <div className="space-y-1">
          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Type {idx + 1}</p>
          <h4 className="font-bold text-xs uppercase leading-tight text-white">{name}</h4>
        </div>
        {finalLook === `${activeCategory}_${idx}` && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs"
          >
            ✓
          </motion.div>
        )}
      </motion.button>
    ));
  };

  return (
    <motion.div
      key="solution"
      {...pageVariants}
      className="pb-64 min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e] text-white"
    >
      {/* Header */}
      <header className="p-6 pt-12 space-y-4">
        <div className="flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleStepChange('scan')}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20"
          >
            ←
          </motion.button>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-500/30"
          >
            ✓ 분석 완료
          </motion.div>
          <div className="w-10" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-center">
          나만의 <span className="text-orange-400">스타일</span>
        </h2>
      </header>

      {/* Main Look Image */}
      <div className="px-6 mb-6">
        <motion.div
          key={finalLook}
          initial={{ filter: 'blur(15px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10"
        >
          <img
            src={finalLook === 'Original Base' ? solutionBase : finalLookImg}
            className="w-full h-full object-cover"
            alt="Final Look"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Share Button on Image */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowShareModal(true)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30"
          >
            <span className="text-xl">📤</span>
          </motion.button>

          {/* Style Tag */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-orange-300 font-bold uppercase tracking-wider">Your Look</p>
                <p className="text-lg font-bold">Winter Collection</p>
              </div>
              <div className="flex gap-2">
                {['#Trendy', '#Minimal'].map(tag => (
                  <span key={tag} className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-[10px]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SNS Share Quick Actions */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-400 uppercase tracking-widest">자랑하기</span>
          <button
            onClick={() => setShowShareModal(true)}
            className="text-xs text-orange-400 font-bold"
          >
            더보기 →
          </button>
        </div>
        <div className="flex gap-3">
          {SNS_PLATFORMS.slice(0, 4).map((platform) => (
            <motion.button
              key={platform.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleShare(platform.id)}
              className={`flex-1 py-3 rounded-xl bg-gradient-to-r ${platform.color} flex items-center justify-center gap-2 text-white font-bold text-xs`}
            >
              <span>{platform.icon}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Category Navigation */}
      <nav className="sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-xl border-y border-white/10 flex justify-around px-4 z-[80]">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-4 text-[10px] font-bold tracking-[0.15em] uppercase transition-all ${
              activeCategory === cat
                ? 'text-orange-400 border-b-2 border-orange-400'
                : 'text-gray-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Trending Items */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-baseline">
          <h3 className="text-sm font-bold tracking-tight">
            Trending <span className="text-orange-400">{activeCategory}</span>
          </h3>
          <span className="text-[9px] text-gray-500 uppercase tracking-widest">01 - 03</span>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {renderTrendingFeed()}
        </div>
      </div>

      {/* Bottom CTAs - Physics Buttons */}
      <div className="fixed bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent z-[100]">
        {/* Confirm Style Button */}
        <motion.button
          whileTap={{ y: 8, scale: 0.98 }}
          onClick={() => handleStepChange('confirmation')}
          className="w-full py-4 mb-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-2xl font-bold text-sm tracking-wider flex items-center justify-center gap-2"
          style={{ boxShadow: '0 8px 0 0 #c2410c' }}
        >
          <span>✓</span>
          <span>이 스타일로 확정하기</span>
        </motion.button>

        <div className="flex gap-3">
          {/* Weekly Reservation Button */}
          <motion.button
            whileTap={{ y: 6, scale: 0.98 }}
            onClick={() => handleStepChange('weekly')}
            className="flex-1 py-4 bg-orange-500/20 backdrop-blur-sm text-orange-400 rounded-2xl font-bold text-xs tracking-wider uppercase border border-orange-500/30 flex items-center justify-center gap-2"
            style={{ boxShadow: '0 6px 0 0 rgba(249,115,22,0.2)' }}
          >
            <span>📅</span>
            <span>주간 예약</span>
          </motion.button>

          {/* Purchase Button */}
          <motion.button
            whileTap={{ y: 10, scale: 0.98 }}
            onClick={() => handleStepChange('checkout')}
            className="flex-[2] py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-2xl font-bold text-sm tracking-wider flex items-center justify-center gap-2"
            style={{ boxShadow: '0 10px 0 0 #9a3412' }}
          >
            <span>🛍️</span>
            <span>THE LOOK 구매</span>
          </motion.button>
        </div>
      </div>

      {/* SNS Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-end justify-center"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#1a1a2e] rounded-t-3xl p-6 pb-10"
            >
              {shareSuccess ? (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-center py-10"
                >
                  <span className="text-6xl mb-4 block">🎉</span>
                  <p className="text-xl font-bold text-white">공유 완료!</p>
                  <p className="text-gray-400 text-sm mt-2">친구들에게 자랑해보세요</p>
                </motion.div>
              ) : (
                <>
                  <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-white text-center mb-2">스타일 자랑하기</h3>
                  <p className="text-gray-400 text-sm text-center mb-6">SNS에 나만의 스타일을 공유해보세요</p>

                  <div className="grid grid-cols-2 gap-3">
                    {SNS_PLATFORMS.map((platform) => (
                      <motion.button
                        key={platform.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleShare(platform.id)}
                        className={`py-4 rounded-2xl bg-gradient-to-r ${platform.color} flex items-center justify-center gap-3 text-white font-bold`}
                      >
                        <span className="text-2xl">{platform.icon}</span>
                        <span>{platform.name}</span>
                      </motion.button>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowShareModal(false)}
                    className="w-full mt-4 py-3 text-gray-400 text-sm"
                  >
                    닫기
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Solution;
