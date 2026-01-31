import React from 'react';
import { motion } from 'framer-motion';
import { APP_STEPS } from '../constants';
import PhysicsButton from '../components/PhysicsButton';
import { IMAGE_PATHS } from '../data/imagePaths';

const Home = ({ setStep, pageVariants }) => {
  return (
    <motion.div key="home" {...pageVariants} className="pb-40">
      <header className="sticky top-0 z-50 p-6 bg-white/80 backdrop-blur-md border-b border-gray-100 flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-serif italic font-bold tracking-tighter">StyleSync.</h1>
          {/* <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none italic">Winter • 10:20 AM • Sunny 5°C</p> */}
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">🌐</button>
        </div>
      </header>

      <main className="p-8 space-y-12">
        <section className="space-y-4">
          <h2 className="text-xl font-bold italic tracking-tight px-2">Recommended Hair</h2>
          <motion.div
            whileTap={{ scale: 0.98, y: 5 }}
            onClick={() => console.log("Navigate to Hair Detail")}
            className="relative aspect-[4/5] bg-gray-50 rounded-[3.5rem] border border-gray-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] cursor-pointer overflow-hidden group"
          >
            <img src={IMAGE_PATHS.HAIR_HERO} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt="Hero Hair" />
            <div className="absolute bottom-10 left-10 text-white z-20">
              <h3 className="text-3xl font-bold italic leading-none">Winter Soft Layers</h3>
            </div>
          </motion.div>
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-center px-2">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Scroll for more</h4>
          </div>
          <div className="h-40 bg-gray-50 rounded-[2.5rem] border border-gray-100 p-8 flex flex-col justify-end shadow-inner">
            <p className="font-bold italic">Top & Bottom Syncing...</p>
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 inset-x-0 p-8 bg-gradient-to-t from-white to-transparent z-[100]">
        <PhysicsButton
          onClick={() => setStep(APP_STEPS.PROFILE)}
          shadowY={12}
          whileTapY={12}
          className="py-7 text-xs tracking-[0.4em]"
        >
          START STYLING
        </PhysicsButton>
      </div>
    </motion.div>
  );
};

export default Home;