import React from 'react';
import { motion } from 'framer-motion';
import { APP_STEPS } from '../constants';
import PhysicsButton from '../components/PhysicsButton';

const Profile = ({ setStep, pageVariants, profile, setProfile }) => {
  return (
    <motion.div key="profile" {...pageVariants} className="p-10 space-y-12 min-h-screen flex flex-col">
      <header className="pt-6 space-y-2">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Step 01</p>
        <h2 className="text-4xl font-bold italic leading-none">Your Stats</h2>
      </header>

      <div className="space-y-14 flex-1 py-10">
        {['height', 'weight'].map((key) => (
          <div key={key} className="space-y-6">
            <div className="flex justify-between font-bold text-[10px] uppercase tracking-widest text-gray-400 px-2">
              <span>{key}</span>
              <span className="text-black font-mono">{profile[key]} {key === 'height' ? 'cm' : 'kg'}</span>
            </div>
            <input
              type="range"
              min={key === 'height' ? 140 : 40}
              max={key === 'height' ? 210 : 130}
              value={profile[key]}
              onChange={(e) => setProfile({...profile, [key]: e.target.value})}
              className="w-full h-1 bg-gray-100 appearance-none rounded-full accent-black cursor-pointer"
            />
          </div>
        ))}
      </div>

      <PhysicsButton
        onClick={() => setStep(APP_STEPS.SCAN)}
        shadowY={8}
        whileTapY={8}
        className="py-6 text-xs tracking-[0.3em] mb-10"
      >
        PROCEED TO SCAN
      </PhysicsButton>
    </motion.div>
  );
};

export default Profile;