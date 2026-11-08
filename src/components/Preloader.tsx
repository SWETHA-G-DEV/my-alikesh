import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  progress: number;
  isReady: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ progress, isReady }) => {
  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070709] select-none"
        >
          {/* Subtle background ambient glow */}
          <div className="absolute w-96 h-96 rounded-full bg-[#FF5500]/10 blur-[120px] pointer-events-none" />

          <div className="relative flex flex-col items-center text-center px-6">
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter text-white"
            >
              AKIL<span className="text-[#FF5500]">ESH</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xs uppercase tracking-[0.3em] text-neutral-400 mt-3 font-mono"
            >
              Video Editor & Full Stack Developer
            </motion.p>

            {/* Progress Bar & Counter */}
            <div className="w-64 mt-10">
              <div className="flex justify-between items-center text-xs font-mono text-neutral-400 mb-2">
                <span>BUFFERING SEQUENCE</span>
                <span className="text-[#FF5500] font-semibold tabular-nums">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-[2px] bg-neutral-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#FF5500] to-[#FFA066]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
            </div>

            <p className="text-[11px] font-mono text-neutral-600 mt-4 tracking-wider">
              INITIALIZING 180-FRAME CINEMATIC SCRUB ENGINE
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
