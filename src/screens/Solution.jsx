import React from 'react';
import { motion } from 'framer-motion';
import { APP_STEPS, CATEGORIES } from '../constants';
import PhysicsButton from '../components/PhysicsButton';
import { IMAGE_PATHS } from '../data/imagePaths';

const Solution = ({ setStep, pageVariants, activeCategory, setActiveCategory, finalLook, setFinalLook, trendingData }) => {
  return (
    <motion.div key="solution" {...pageVariants} className="pb-44 min-h-screen bg-white">
      <header className="p-8 space-y-6 text-center">
        <div className="inline-block px-4 py-1 bg-green-50 text-green-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-100 animate-bounce">✓ SCAN SUCCESSFUL</div>
        <h2 className="text-5xl font-serif italic font-bold tracking-tighter leading-none pt-2">Final Solution.</h2>
      </header>

      <div className="px-8 mb-10">
        <motion.div
          key={finalLook}
          initial={{ filter: 'blur(15px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="aspect-[3/4] bg-gray-50 rounded-[3.5rem] border border-gray-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] flex items-center justify-center overflow-hidden"
        >
          <img src={IMAGE_PATHS.FINAL_LOOK} className="w-full h-full object-cover" alt="Final Look" />
        </motion.div>
      </div>

      <nav className="sticky top-0 bg-white/90 backdrop-blur-xl border-y border-gray-100 flex justify-around px-4 z-[80]">
        {[CATEGORIES.HAIR, CATEGORIES.TOP, CATEGORIES.BOTTOM, CATEGORIES.SHOES].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-6 text-[10px] font-black tracking-[0.2em] uppercase transition-all ${activeCategory === cat ? 'text-black border-b-2 border-black' : 'text-gray-300'}`}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="p-8 space-y-8">
        <div className="flex justify-between items-baseline px-2">
          <h3 className="text-sm font-black italic tracking-tighter uppercase">Trending {activeCategory}</h3>
          <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Type 01 - 03</span>
        </div>
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-10">
          {trendingData[activeCategory].map((name, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.95, y: 10 }}
              onClick={() => setFinalLook(`${activeCategory}_${idx}`)}
              className="min-w-[180px] aspect-[4/5] bg-white rounded-[2.5rem] border-2 border-gray-100 shadow-[0_10px_0_0_#eeeeee] p-6 flex flex-col justify-between active:shadow-none active:translate-y-[10px] transition-all text-left group"
            >
              <div className="w-full h-24 bg-gray-50 rounded-3xl mb-4 shadow-inner group-hover:bg-gray-100" />
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Texture {idx + 1}</p>
                <h4 className="font-bold text-xs uppercase leading-tight">{name}</h4>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 p-8 bg-gradient-to-t from-white via-white/80 to-transparent z-[90]">
        <PhysicsButton
          onClick={() => setStep(APP_STEPS.CHECKOUT)}
          shadowY={15}
          whileTapY={15}
          className="py-9 rounded-[3rem] border border-gray-800 flex-col items-center justify-center gap-1"
        >
          <span className="text-[10px] font-bold tracking-[0.4em] opacity-40 uppercase mb-1">Synchronized Purchase</span>
          <span className="text-3xl font-serif italic font-bold tracking-tighter uppercase">THE LOOK.</span>
        </PhysicsButton>
      </div>
    </motion.div>
  );
};

export default Solution;