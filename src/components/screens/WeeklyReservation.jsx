import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhysicsButton from '../PhysicsButton';

// 날씨 데이터 (실제로는 API 연동)
const WEEKLY_WEATHER = [
  { day: '월', date: 27, weather: '☀️', temp: 5, condition: 'sunny' },
  { day: '화', date: 28, weather: '🌤️', temp: 3, condition: 'cloudy' },
  { day: '수', date: 29, weather: '❄️', temp: -2, condition: 'snow' },
  { day: '목', date: 30, weather: '🌧️', temp: 1, condition: 'rain' },
  { day: '금', date: 31, weather: '☀️', temp: 4, condition: 'sunny' },
  { day: '토', date: 1, weather: '🌤️', temp: 6, condition: 'cloudy' },
  { day: '일', date: 2, weather: '☀️', temp: 8, condition: 'sunny' },
];

// 옷 아이템 데이터
const OUTFIT_ITEMS = {
  sunny: {
    name: 'Light Layered Look',
    items: [
      { icon: '🧥', name: '울 코트', category: 'outer' },
      { icon: '👔', name: '니트 스웨터', category: 'top' },
      { icon: '👖', name: '슬랙스', category: 'bottom' },
      { icon: '🧣', name: '머플러', category: 'accessory' },
    ],
    color: 'from-orange-500 to-yellow-500',
  },
  cloudy: {
    name: 'Cozy Warm Look',
    items: [
      { icon: '🧥', name: '패딩 재킷', category: 'outer' },
      { icon: '👕', name: '터틀넥', category: 'top' },
      { icon: '👖', name: '기모 팬츠', category: 'bottom' },
      { icon: '🧤', name: '장갑', category: 'accessory' },
    ],
    color: 'from-gray-500 to-gray-600',
  },
  snow: {
    name: 'Winter Protection',
    items: [
      { icon: '🧥', name: '롱 패딩', category: 'outer' },
      { icon: '👕', name: '히트텍', category: 'top' },
      { icon: '👖', name: '기모 청바지', category: 'bottom' },
      { icon: '👢', name: '방한 부츠', category: 'shoes' },
    ],
    color: 'from-blue-400 to-cyan-500',
  },
  rain: {
    name: 'Rain Ready Look',
    items: [
      { icon: '🧥', name: '트렌치 코트', category: 'outer' },
      { icon: '👕', name: '방수 자켓', category: 'top' },
      { icon: '👖', name: '슬랙스', category: 'bottom' },
      { icon: '👢', name: '레인부츠', category: 'shoes' },
    ],
    color: 'from-blue-600 to-indigo-600',
  },
};

const WeeklyReservation = ({ handleStepChange, pageVariants }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [reservedDays, setReservedDays] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [showItemDetail, setShowItemDetail] = useState(null);

  const selectedWeather = WEEKLY_WEATHER[selectedDay];
  const selectedOutfit = OUTFIT_ITEMS[selectedWeather.condition];

  // 아이템 선택/해제 토글
  const toggleItem = (itemIndex) => {
    const key = `${selectedDay}_${itemIndex}`;
    setSelectedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // 아이템이 선택되었는지 확인
  const isItemSelected = (itemIndex) => {
    const key = `${selectedDay}_${itemIndex}`;
    return selectedItems[key] || false;
  };

  // 아이템 상세 보기
  const handleItemPress = (item, idx) => {
    toggleItem(idx);
    setShowItemDetail({ ...item, index: idx });
    setTimeout(() => setShowItemDetail(null), 1500);
  };

  const handleReserve = () => {
    const daySelectedItems = selectedOutfit.items.filter((_, idx) => isItemSelected(idx));

    setReservedDays(prev => ({
      ...prev,
      [selectedDay]: {
        outfit: selectedOutfit,
        items: daySelectedItems.length > 0 ? daySelectedItems : selectedOutfit.items,
        weather: selectedWeather,
      }
    }));
    setShowConfirm(true);
    setTimeout(() => {
      setShowConfirm(false);
      // 예약 완료 후 캘린더 화면으로 이동
      handleStepChange('calendar');
    }, 1500);
  };

  const isReserved = (dayIndex) => reservedDays[dayIndex] !== undefined;

  return (
    <motion.div
      key="weekly"
      {...pageVariants}
      className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e] text-white pb-52"
    >
      {/* Header */}
      <header className="p-6 pt-12">
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleStepChange('solution')}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
          >
            ←
          </motion.button>
          <h1 className="text-lg font-bold">주간 스타일 예약</h1>
          <div className="w-10" />
        </div>

        <div className="text-center mb-2">
          <p className="text-xs text-gray-400 uppercase tracking-widest">2025년 1월</p>
          <p className="text-2xl font-bold mt-1">
            이번 주 <span className="text-orange-400">스타일링</span>
          </p>
        </div>
      </header>

      {/* Weekly Calendar */}
      <div className="px-4 mb-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-4 border border-white/10">
          <div className="grid grid-cols-7 gap-2">
            {WEEKLY_WEATHER.map((day, idx) => (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.95, y: 3 }}
                onClick={() => setSelectedDay(idx)}
                className={`relative flex flex-col items-center py-3 rounded-2xl transition-all ${
                  selectedDay === idx
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
                style={selectedDay === idx ? { boxShadow: '0 4px 0 0 #c2410c' } : {}}
              >
                <span className="text-[10px] font-bold uppercase">{day.day}</span>
                <span className="text-lg font-bold my-1">{day.date}</span>
                <span className="text-lg">{day.weather}</span>
                <span className="text-[10px] mt-1">{day.temp}°</span>

                {/* 예약된 표시 */}
                {isReserved(idx) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-[10px]"
                  >
                    ✓
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Day Detail */}
      <div className="px-6">
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Weather Info Card */}
          <div className={`bg-gradient-to-r ${selectedOutfit.color} rounded-3xl p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs opacity-80 uppercase tracking-widest">
                  {WEEKLY_WEATHER[selectedDay].day}요일 날씨
                </p>
                <p className="text-4xl font-bold mt-1">{selectedWeather.temp}°C</p>
              </div>
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-6xl"
              >
                {selectedWeather.weather}
              </motion.span>
            </div>
            <p className="text-sm opacity-90">
              {selectedWeather.condition === 'sunny' && '맑고 포근한 날씨예요'}
              {selectedWeather.condition === 'cloudy' && '구름이 많아요, 따뜻하게 입으세요'}
              {selectedWeather.condition === 'snow' && '눈이 올 수 있어요, 방한 필수!'}
              {selectedWeather.condition === 'rain' && '비가 올 수 있어요, 우산 챙기세요'}
            </p>
          </div>

          {/* Recommended Outfit */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest">추천 스타일</p>
                <p className="text-xl font-bold mt-1">{selectedOutfit.name}</p>
              </div>
              <p className="text-[10px] text-orange-400 font-bold">아이템을 눌러 선택하세요</p>
            </div>

            {/* Outfit Items - 클릭 가능 */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {selectedOutfit.items.map((item, idx) => (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.95, y: 4 }}
                  onClick={() => handleItemPress(item, idx)}
                  className={`relative p-4 rounded-xl flex items-center gap-3 transition-all border-2 ${
                    isItemSelected(idx)
                      ? 'bg-orange-600/30 border-orange-500'
                      : 'bg-white/5 border-transparent hover:bg-white/10'
                  }`}
                  style={isItemSelected(idx) ? { boxShadow: '0 4px 0 0 #c2410c' } : { boxShadow: '0 4px 0 0 rgba(255,255,255,0.05)' }}
                >
                  <motion.div
                    whileTap={{ rotate: [0, -10, 10, 0] }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                      isItemSelected(idx) ? 'bg-orange-500/50' : 'bg-white/10'
                    }`}
                  >
                    {item.icon}
                  </motion.div>
                  <div className="text-left flex-1">
                    <span className="text-sm font-medium block">{item.name}</span>
                    <span className="text-[10px] text-gray-500 uppercase">{item.category}</span>
                  </div>

                  {/* 선택 표시 */}
                  {isItemSelected(idx) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-[10px]"
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Reserved Days Summary */}
          {Object.keys(reservedDays).length > 0 && (
            <div className="bg-orange-600/20 rounded-2xl p-4 border border-orange-500/30">
              <p className="text-xs text-orange-300 uppercase tracking-widest mb-3">예약된 스타일</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(reservedDays).map(([dayIdx, data]) => (
                  <div
                    key={dayIdx}
                    className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1"
                  >
                    <span className="text-sm font-bold">{WEEKLY_WEATHER[dayIdx].day}</span>
                    {data.items.slice(0, 2).map((item, i) => (
                      <span key={i}>{item.icon}</span>
                    ))}
                    {data.items.length > 2 && (
                      <span className="text-[10px] text-gray-400">+{data.items.length - 2}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent z-[100]">
        <PhysicsButton
          variant={isReserved(selectedDay) ? 'success' : 'gradient'}
          depth={10}
          onClick={handleReserve}
          disabled={isReserved(selectedDay)}
          icon={isReserved(selectedDay) ? '✓' : '📅'}
        >
          {isReserved(selectedDay)
            ? `${WEEKLY_WEATHER[selectedDay].day}요일 예약 완료`
            : `${WEEKLY_WEATHER[selectedDay].day}요일 스타일 예약`
          }
        </PhysicsButton>

        <p className="text-center text-[10px] text-gray-500 mt-3">
          예약된 스타일은 해당 날짜에 알림을 보내드려요
        </p>
      </div>

      {/* Item Detail Toast */}
      <AnimatePresence>
        {showItemDetail && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[200]"
          >
            <div className="bg-white text-black px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
              <span className="text-3xl">{showItemDetail.icon}</span>
              <div>
                <p className="font-bold">{showItemDetail.name}</p>
                <p className="text-xs text-gray-500">
                  {isItemSelected(showItemDetail.index) ? '아이템 선택됨' : '선택 해제됨'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Toast */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[200]"
          >
            <div className="bg-green-500 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg">
              <span>✓</span>
              <span>{WEEKLY_WEATHER[selectedDay].day}요일 스타일 예약 완료!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WeeklyReservation;
