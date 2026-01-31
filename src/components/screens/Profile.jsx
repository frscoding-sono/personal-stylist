import React from 'react';
import { motion } from 'framer-motion';
import PhysicsButton from '../PhysicsButton';
import profileBase from '../../assets/images/02_profile_base.jpg';

const PROFILE_LIMITS = {
  height: { min: 140, max: 210, unit: 'cm', label: 'HEIGHT' },
  weight: { min: 40, max: 130, unit: 'kg', label: 'WEIGHT' }
};

const Profile = ({ handleStepChange, pageVariants, profile, handleProfileChange }) => {
  return (
    <motion.div
      key="profile"
      {...pageVariants}
      className="min-h-screen flex flex-col relative overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${profileBase})` }}
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen p-8">
        {/* Header */}
        <header className="pt-6 space-y-2">
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleStepChange('home')}
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20"
            >
              ←
            </motion.button>
            <div>
              <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Step 01</p>
              <h2 className="text-3xl font-bold text-white italic leading-none">Your Stats</h2>
            </div>
          </div>
        </header>

        {/* Sliders */}
        <div className="flex-1 flex flex-col justify-center space-y-12 py-10">
          {Object.entries(PROFILE_LIMITS).map(([key, config]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: key === 'height' ? 0.2 : 0.4 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-baseline px-1">
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">
                  {config.label}
                </span>
                <motion.span
                  key={profile[key]}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-white font-mono"
                >
                  {profile[key]}
                  <span className="text-sm text-white/50 ml-1">{config.unit}</span>
                </motion.span>
              </div>

              {/* Custom Slider */}
              <div className="relative">
                <input
                  type="range"
                  min={config.min}
                  max={config.max}
                  value={profile[key]}
                  onChange={(e) => handleProfileChange(key, parseInt(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-6
                    [&::-webkit-slider-thumb]:h-6
                    [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:shadow-[0_4px_15px_rgba(0,0,0,0.3)]
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:transition-transform
                    [&::-webkit-slider-thumb]:hover:scale-110
                    [&::-webkit-slider-thumb]:active:scale-95"
                />
                {/* Progress Bar */}
                <div
                  className="absolute top-0 left-0 h-2 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full pointer-events-none"
                  style={{
                    width: `${((profile[key] - config.min) / (config.max - config.min)) * 100}%`
                  }}
                />
              </div>

              {/* Min/Max Labels */}
              <div className="flex justify-between text-[10px] text-white/30 font-mono">
                <span>{config.min}{config.unit}</span>
                <span>{config.max}{config.unit}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="pb-28"
        >
          <PhysicsButton
            variant="dark"
            depth={10}
            onClick={() => handleStepChange('scan')}
            icon="🔍"
          >
            PROCEED TO SCAN
          </PhysicsButton>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;
