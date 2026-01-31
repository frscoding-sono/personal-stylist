import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AIStylistApp = () => {
  // 상태 관리
  const [step, setStep] = useState('home');
  const [activeTab, setActiveTab] = useState('hair');
  const [score, setScore] = useState(0);

  // 애니메이션 설정 메모이제이션
  const fadeVariants = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }), []);

  // 스코어 증가 로직 최적화
  useEffect(() => {
    if (step !== 'board') return;

    const timer = setTimeout(() => {
      let currentScore = 0;
      const interval = setInterval(() => {
        currentScore += 1;
        setScore(currentScore);
        if (currentScore >= 92) clearInterval(interval);
      }, 20);
      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, [step]);

  // 콜백 함수 메모이제이션
  const handleStartSetup = useCallback(() => {
    setStep('setup');
  }, []);

  const handleAnalyzeStyle = useCallback(() => {
    setStep('loading');
    setTimeout(() => setStep('board'), 2000);
  }, []);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  // 탭 데이터 메모이제이션
  const tabs = useMemo(() => ['hair', 'upper', 'lower', 'shoes'], []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans overflow-x-hidden selection:bg-black selection:text-white">
      <AnimatePresence mode="wait">
        
        {/* 1. 홈화면 UI 화면 구성 */}
        {step === 'home' && (
          <motion.div key="home" variants={fadeVariants} initial="initial" animate="animate" exit="exit" className="pb-32">
            <header className="p-8 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-40">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Winter '95 10:20 AM</p>
              <h1 className="text-3xl font-bold italic tracking-tight">Seoul, 5℃ Sunny</h1>
            </header>
            
            <div className="p-8 space-y-16">
              <section>
                <div className="flex justify-between items-end mb-6">
                  <h2 className="text-xl font-bold italic">Recommended Hair</h2>
                  <span className="text-[10px] font-bold text-gray-300 uppercase">View All</span>
                </div>
                <div className="aspect-[4/5] bg-gray-50 rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm">
                  <div className="w-full h-full flex items-center justify-center text-gray-300 italic text-sm">Realistic Hair Image</div>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-xl font-bold italic">Style Feed</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div className="h-80 bg-gray-50 rounded-[2.5rem] border border-gray-100" />
                  <div className="h-80 bg-gray-50 rounded-[2.5rem] border border-gray-100" />
                </div>
              </section>
            </div>

            {/* 화면 버튼 위치 : setup 화면으로 이동할 수 있는 버튼 */}
            <div className="fixed bottom-0 inset-x-0 p-8 bg-gradient-to-t from-white via-white to-transparent">
              <button 
                onClick={handleStartSetup}
                className="w-full py-6 bg-black text-white rounded-full font-bold shadow-2xl active:scale-95 transition-all"
              >
                START PERSONAL STYLING
              </button>
            </div>
          </motion.div>
        )}

        {/* 2. 프로필 정보 입력 셋업 화면 */}
        {step === 'setup' && (
          <motion.div key="setup" variants={fadeVariants} initial="initial" animate="animate" exit="exit" className="p-8 space-y-12 flex flex-col min-h-screen">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold italic leading-tight">Your Profile &<br/>Face Scan</h2>
              <p className="text-sm text-gray-400">스캔 정보를 통해 당신의 얼굴형과 피부톤에 맞춘 스타일을 추천해드립니다.</p>
            </div>

            <div className="space-y-8 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Height</span>
                  <p className="text-xl font-bold mt-1">178<span className="text-xs ml-1">cm</span></p>
                </div>
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Weight</span>
                  <p className="text-xl font-bold mt-1">72<span className="text-xs ml-1">kg</span></p>
                </div>
              </div>
              <div className="aspect-square bg-gray-100 rounded-[3rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center">📱</div>
                <p className="text-xs font-bold text-gray-400 uppercase">Tap to Scan Face</p>
              </div>
            </div>

            <button 
              onClick={handleAnalyzeStyle}
              className="w-full py-6 bg-black text-white rounded-full font-bold shadow-xl"
            >
              ANALYZE MY STYLE
            </button>
          </motion.div>
        )}

        {/* 3. 분석 화면 (Transition) */}
        {step === 'loading' && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen flex flex-col items-center justify-center space-y-6">
            <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-bold tracking-widest animate-pulse italic">SCANNING SUCCESSFUL...</p>
          </motion.div>
        )}

        {/* 4. 결과 스타일 게시판 (Tab Navigation & Score) */}
        {step === 'board' && (
          <motion.div key="board" variants={fadeVariants} initial="initial" animate="animate" className="pb-10">
            {/* 상단 헤더 스코어 정보 텍스트 */}
            <header className="p-8 space-y-6 text-center">
              <div className="inline-block p-1 px-4 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2">Scan Successful</div>
              <div className="relative inline-block">
                <div className="text-6xl font-bold italic tracking-tighter">{score}</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase mt-1">Match Score</div>
              </div>
            </header>

            {/* 스타일 카테고리 탭 버튼 선택 가능 */}
            <nav className="sticky top-0 bg-white/90 backdrop-blur-xl border-b border-gray-100 flex justify-around px-4 z-50">
              {tabs.map(tab => (
                <button 
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-4 py-6 text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'text-black border-b-2 border-black' : 'text-gray-300'}`}
                >
                  {tab}
                </button>
              ))}
            </nav>

            {/* 스타일 추천 컨텐츠 (탭에 따라 변경) */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl font-bold italic capitalize leading-none">{activeTab} Suggestions</h3>
                  <div className="grid grid-cols-1 gap-6">
                    {[1, 2].map(i => (
                      <div key={i} className="bg-gray-50 aspect-square rounded-[3rem] p-8 border border-gray-100 flex flex-col justify-between group hover:border-black transition-all">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-bold text-gray-400">Option 0{i}</span>
                          <button className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center hover:shadow-md transition-shadow" aria-label="Like this style">❤️</button>
                        </div>
                        <button className="w-full py-4 bg-white border border-gray-200 rounded-2xl font-bold text-xs uppercase tracking-widest group-hover:bg-black group-hover:text-white transition-all">
                          Select Item
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default AIStylistApp;
