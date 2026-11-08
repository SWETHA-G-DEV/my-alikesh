import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio.ts';
import { ArrowUp, Heart } from 'lucide-react';
import { soundFX } from '../utils/audio.ts';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundFX.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#050508] py-12 px-6 md:px-12 text-xs font-mono text-neutral-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Title */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="font-display font-bold text-base text-white">
            AKIL<span className="text-[#FF5500]">ESH</span>
          </span>
          <span className="hidden sm:inline text-neutral-600">/</span>
          <span className="text-neutral-400">
            {PORTFOLIO_DATA.title}
          </span>
        </div>

        {/* Center: Social links */}
        <div className="flex items-center gap-6">
          {PORTFOLIO_DATA.socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundFX.playHover()}
              className="text-neutral-400 hover:text-[#FFA066] transition-colors"
            >
              {s.name}
            </a>
          ))}
        </div>

        {/* Right: Back to Top & Copyright */}
        <div className="flex items-center gap-4">
          <span>&copy; {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
          <button
            onClick={scrollToTop}
            title="Scroll to top"
            className="p-2 rounded-lg bg-white/[0.04] hover:bg-[#FF5500] hover:text-white border border-white/[0.08] transition-all cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
