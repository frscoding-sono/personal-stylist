import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 주간 데이터
const WEEKLY_DATA = [
  {
    id: 1,
    day: 'Monday',
    date: 12,
    weather: { icon: '☀️', condition: 'Sunny', temp: 24 },
    planned: true,
    fabrics: ['Silk Top', 'Wool Outer'],
    matchScore: 94,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH4dg3NDUpdrQ1XhIdQpI9PmRnNdSN9TZ0DSCURfqPhitSeQz35M1sbUYLCwVj6VKqtgdZYkMIIJaFvEvhUONG1-tPGZm9J87VZ8k8ZQAtxhpMXn7Mxev6rv2FIAtaOQjk62btCK1D1cY873hqrHFwU67Tqu0gU-jNKuZ3Kleih2gMdeFpmcr3uWy_kaZPxFwz-M8QfRAkSduNwo0TvHqmh3kpzQtI7cqIaFYaHXsYuhtB-ekvDODhn9g8Xb6-s_BFokAUlGJtLpY',
  },
  {
    id: 2,
    day: 'Tuesday',
    date: 13,
    weather: { icon: '🌤️', condition: 'Cloudy', temp: 21 },
    planned: true,
    fabrics: ['Cashmere Blend'],
    matchScore: 88,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnQBPBl3gsZxqtvw1uy2v8S1akwLEFlRtiK1T3qoO2sgwoATOkURUOcJDrNB1ujSzqkonVAXjWvlKZVWQAU3ViuZmUuvw1S_276vH7V-AuRwkbIyO9bs1JfBHz0PEaXUDz_EdxwXZ5u_96KO0n4dQgvc6uJx7y-HF6s9IAFaPl6Wh0Rod3oH4lCQcxtRZNvciXAMxn7vbagnmgRgW3T9U8MveCoqTBUXtWxeKzw_PE3SdnMqKYlfh_yuWSBtxL4kR_tFgZrKMPChg',
  },
  {
    id: 3,
    day: 'Wednesday',
    date: 14,
    weather: { icon: '⛅', condition: 'Partly Cloudy', temp: 22 },
    planned: false,
    fabrics: [],
    matchScore: 0,
    image: null,
  },
  {
    id: 4,
    day: 'Thursday',
    date: 15,
    weather: { icon: '🌧️', condition: 'Rainy', temp: 18 },
    planned: false,
    fabrics: [],
    matchScore: 0,
    image: null,
  },
  {
    id: 5,
    day: 'Friday',
    date: 16,
    weather: { icon: '☀️', condition: 'Sunny', temp: 26 },
    planned: true,
    fabrics: ['Linen Relaxed', 'Cotton'],
    matchScore: 97,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKRm8ZfOwJKgmXY1OF4DBGa-udttKU13pN1Ss5z9iergsApI7Lsz9Jk1b5F6kabSg515QFmnjXImDbPEzMAv-Vikzj-lxmPMgQbxQX7ydfywyosa4Jq7t6lFriR7MKtccSEISRswDTZlSNIV_4vg0ERpM2ESrdSb5ETqRLIGgBS64boP_TsaOPi997Go9pl6ZbJfoSG7fvMpVDz0mUNr5WFCU3eMVtCtlgV3mMkG3-NOAC5gEL195_027_v6rZANgXujuk9YJVVho',
  },
];

const WeeklyCalendar = ({ handleStepChange, pageVariants }) => {
  const [weekData, setWeekData] = useState(WEEKLY_DATA);
  const [isMagicFilling, setIsMagicFilling] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Magic Fill 기능
  const handleMagicFill = () => {
    setIsMagicFilling(true);

    setTimeout(() => {
      setWeekData(prev => prev.map(day => {
        if (!day.planned) {
          return {
            ...day,
            planned: true,
            fabrics: day.weather.temp > 20 ? ['Light Cotton', 'Linen'] : ['Wool Blend', 'Cashmere'],
            matchScore: 85 + Math.floor(Math.random() * 10),
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH4dg3NDUpdrQ1XhIdQpI9PmRnNdSN9TZ0DSCURfqPhitSeQz35M1sbUYLCwVj6VKqtgdZYkMIIJaFvEvhUONG1-tPGZm9J87VZ8k8ZQAtxhpMXn7Mxev6rv2FIAtaOQjk62btCK1D1cY873hqrHFwU67Tqu0gU-jNKuZ3Kleih2gMdeFpmcr3uWy_kaZPxFwz-M8QfRAkSduNwo0TvHqmh3kpzQtI7cqIaFYaHXsYuhtB-ekvDODhn9g8Xb6-s_BFokAUlGJtLpY',
            isNew: true,
          };
        }
        return day;
      }));
      setIsMagicFilling(false);
    }, 1500);
  };

  // 요일 카드 컴포넌트 - 계획됨
  const PlannedDayCard = ({ day }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {day.isNew && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 left-4 z-10 bg-orange-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1"
        >
          ✨ NEW
        </motion.div>
      )}
      <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white p-4 shadow-[0_10px_25px_rgba(0,0,0,0.05)] border border-gray-100">
        <div className="flex flex-[2] flex-col justify-between gap-3">
          <div className="flex flex-col gap-1">
            {/* Weather */}
            <div className="flex items-center gap-2">
              <span className="text-lg">{day.weather.icon}</span>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                {day.weather.condition} {day.weather.temp}°C
              </p>
            </div>
            {/* Day */}
            <p className="text-gray-900 text-xl font-bold leading-tight font-serif">
              {day.day} {day.date}
            </p>
            {/* Fabrics */}
            <div className="flex flex-wrap gap-1 mt-1">
              {day.fabrics.map((fabric, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-bold text-gray-600 uppercase"
                >
                  {fabric}
                </span>
              ))}
            </div>
          </div>
          {/* Match Score & Arrow */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1 bg-orange-100 px-3 py-1 rounded-full">
              <span className="text-orange-600 text-sm">✨</span>
              <span className="text-orange-600 text-xs font-bold">{day.matchScore}% Match</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center rounded-full h-8 w-8 bg-gray-100 text-gray-900"
            >
              →
            </motion.button>
          </div>
        </div>
        {/* Image */}
        <div
          className="w-32 bg-center bg-no-repeat bg-cover rounded-lg shadow-inner bg-gray-100"
          style={{ backgroundImage: `url("${day.image}")` }}
        />
      </div>
    </motion.div>
  );

  // 요일 카드 컴포넌트 - 미계획
  const EmptyDayCard = ({ day, onPlan }) => (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onPlan}
      className="flex items-center gap-4 bg-white/40 border-2 border-dashed border-gray-200 px-4 min-h-[88px] rounded-xl justify-between cursor-pointer transition-all"
    >
      <div className="flex items-center gap-4">
        <div className="text-white flex items-center justify-center rounded-full bg-orange-500 shadow-lg shadow-orange-300 shrink-0 w-10 h-10">
          <span className="text-xl">+</span>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-gray-900 text-base font-bold font-serif leading-tight">
            {day.day} {day.date}
          </p>
          <p className="text-gray-500 text-xs font-normal">Plan this Day</p>
        </div>
      </div>
      <div className="shrink-0 flex items-center gap-2">
        <span className="text-2xl">{day.weather.icon}</span>
        <span className="text-xs text-gray-400 font-bold">{day.weather.temp}°C</span>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      key="weekly-calendar"
      {...pageVariants}
      className="min-h-screen bg-gray-50 pb-56"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md">
        <div className="flex items-center p-4 pb-2 justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleStepChange('weekly')}
            className="flex items-center justify-center w-12 h-12 text-gray-900"
          >
            ←
          </motion.button>
          <div className="flex flex-col items-center flex-1">
            <h2 className="text-gray-900 text-lg font-bold leading-tight tracking-tight font-serif">
              October 2023
            </h2>
            <p className="text-orange-500 text-xs font-bold tracking-widest uppercase">
              Weekly Style
            </p>
          </div>
          <div className="flex w-12 items-center justify-end">
            <button className="flex cursor-pointer items-center justify-center rounded-lg h-12 bg-transparent text-gray-900">
              📅
            </button>
          </div>
        </div>
        {/* Week Navigation */}
        <div className="flex items-center justify-between px-6 py-2">
          <span className="text-orange-500 cursor-pointer text-xl">‹</span>
          <h4 className="text-gray-500 text-sm font-bold leading-normal tracking-widest font-serif">
            12th - 18th
          </h4>
          <div className="flex items-center gap-1 text-orange-500 cursor-pointer">
            <span className="text-xs font-bold uppercase tracking-tight">Next Week</span>
            <span className="text-xl">›</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 space-y-4">
        {weekData.map((day) => (
          <div key={day.id} className="py-1">
            {day.planned ? (
              <PlannedDayCard day={day} />
            ) : (
              <EmptyDayCard
                day={day}
                onPlan={() => handleStepChange('weekly')}
              />
            )}
          </div>
        ))}

        {/* Weekend */}
        <div className="opacity-60 mt-4">
          <div className="flex items-center gap-4 bg-gray-100 px-4 min-h-[72px] rounded-xl justify-between">
            <div className="flex items-center gap-4">
              <div className="text-gray-900 flex items-center justify-center rounded-lg bg-white/50 shrink-0 w-10 h-10">
                🛋️
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-gray-900 text-base font-bold font-serif">Sat 17 - Sun 18</p>
                <p className="text-gray-500 text-xs font-normal">Weekend planning coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Magic Fill Button */}
      <div className="fixed bottom-36 left-1/2 -translate-x-1/2 z-[70]">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleMagicFill}
          disabled={isMagicFilling}
          className="flex items-center justify-center gap-3 px-8 h-14 rounded-full text-white font-bold transition-all"
          style={{
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            boxShadow: '0 0 20px rgba(249, 115, 22, 0.4), inset 0 -4px 0 rgba(0,0,0,0.2), inset 0 2px 2px rgba(255,255,255,0.3)',
          }}
        >
          {isMagicFilling ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="text-2xl"
              >
                ⚡
              </motion.span>
              <span className="tracking-wide">Filling...</span>
            </>
          ) : (
            <>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-2xl"
              >
                ✨
              </motion.span>
              <span className="tracking-wide">Magic Fill</span>
            </>
          )}
        </motion.button>

        {/* Magic Dust Particles */}
        <AnimatePresence>
          {isMagicFilling && (
            <>
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  animate={{
                    x: (Math.random() - 0.5) * 300,
                    y: -Math.random() * 400 - 100,
                    opacity: 0,
                    scale: 0.5,
                  }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="absolute left-1/2 top-1/2 w-2 h-2 bg-orange-400 rounded-full blur-[1px]"
                  style={{
                    boxShadow: '0 0 10px #f97316',
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Footer */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-6 border-t border-gray-100 z-[60]"
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex gap-4">
          {/* Share Week Button */}
          <motion.button
            whileTap={{ y: 4, scale: 0.98 }}
            onClick={() => setShowShareModal(true)}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl h-14 border-2 border-gray-100 bg-white text-gray-900 font-bold transition-all"
            style={{ boxShadow: '0 4px 0 0 #e5e7eb' }}
          >
            <span className="text-xl">📤</span>
            <span>Share Week</span>
          </motion.button>

          {/* Sync to Closet Button */}
          <motion.button
            whileTap={{ y: 6, scale: 0.98 }}
            onClick={() => handleStepChange('checkout')}
            className="flex-[1.5] flex items-center justify-center gap-2 rounded-xl h-14 bg-orange-500 text-white font-bold transition-all"
            style={{ boxShadow: '0 6px 0 0 #c2410c' }}
          >
            <span className="text-xl">👔</span>
            <span>Sync to Closet</span>
          </motion.button>
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-6"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl"
            >
              <h3 className="text-xl font-bold text-center mb-4 font-serif">Share Your Week</h3>
              <p className="text-gray-500 text-sm text-center mb-6">
                Share your weekly style plan with friends!
              </p>
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { icon: '📸', name: 'Instagram', color: 'bg-gradient-to-r from-pink-500 to-purple-600' },
                  { icon: '🐦', name: 'Twitter', color: 'bg-blue-400' },
                  { icon: '💬', name: 'Kakao', color: 'bg-yellow-400' },
                  { icon: '🔗', name: 'Link', color: 'bg-gray-400' },
                ].map((platform, idx) => (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.9 }}
                    className={`${platform.color} w-full aspect-square rounded-2xl flex items-center justify-center text-2xl text-white`}
                  >
                    {platform.icon}
                  </motion.button>
                ))}
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full py-3 text-gray-500 text-sm"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WeeklyCalendar;
