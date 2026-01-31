import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Import screen components
import SplashScreen from './components/screens/SplashScreen';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Scan from './components/screens/Scan';
import ScanComplete from './components/screens/ScanComplete';
import Solution from './components/screens/Solution';
import StyleConfirmation from './components/screens/StyleConfirmation';
import WeeklyReservation from './components/screens/WeeklyReservation';
import WeeklyCalendar from './components/screens/WeeklyCalendar';
import Checkout from './components/screens/Checkout';
import BottomNavigation from './components/BottomNavigation';

const App = () => {
  const [step, setStep] = useState('splash');
  const [profile, setProfile] = useState({ height: 178, weight: 72 });
  const [activeCategory, setActiveCategory] = useState('TOP');
  const [finalLook, setFinalLook] = useState('Original Base');
  const [navigationHistory, setNavigationHistory] = useState([]);

  const pageVariants = useMemo(
    () => ({
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
      transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] }
    }),
    []
  );

  const handleStepChange = useCallback((newStep) => {
    setNavigationHistory(prev => [...prev, step]);
    setStep(newStep);
  }, [step]);

  const handleGoBack = useCallback(() => {
    if (navigationHistory.length > 0) {
      const previousStep = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory(prev => prev.slice(0, -1));
      setStep(previousStep);
    }
  }, [navigationHistory]);

  const handleProfileChange = useCallback((key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-orange-500 selection:text-white">
      <AnimatePresence mode="wait">
        {step === 'splash' && (
          <SplashScreen
            handleStepChange={handleStepChange}
          />
        )}
        {step === 'home' && (
          <Home
            handleStepChange={handleStepChange}
            pageVariants={pageVariants}
          />
        )}
        {step === 'profile' && (
          <Profile
            handleStepChange={handleStepChange}
            pageVariants={pageVariants}
            profile={profile}
            handleProfileChange={handleProfileChange}
          />
        )}
        {step === 'scan' && (
          <Scan
            handleStepChange={handleStepChange}
          />
        )}
        {step === 'scanComplete' && (
          <ScanComplete
            handleStepChange={handleStepChange}
          />
        )}
        {step === 'solution' && (
          <Solution
            handleStepChange={handleStepChange}
            pageVariants={pageVariants}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            finalLook={finalLook}
            setFinalLook={setFinalLook}
          />
        )}
        {step === 'confirmation' && (
          <StyleConfirmation
            handleStepChange={handleStepChange}
            pageVariants={pageVariants}
          />
        )}
        {step === 'weekly' && (
          <WeeklyReservation
            handleStepChange={handleStepChange}
            pageVariants={pageVariants}
          />
        )}
        {step === 'calendar' && (
          <WeeklyCalendar
            handleStepChange={handleStepChange}
            pageVariants={pageVariants}
          />
        )}
        {step === 'checkout' && (
          <Checkout
            handleStepChange={handleStepChange}
          />
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <BottomNavigation
        currentStep={step}
        handleStepChange={handleStepChange}
      />
    </div>
  );
};

export default App;
