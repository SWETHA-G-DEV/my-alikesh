import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio.ts';
import { Sparkles, Quote, Award } from 'lucide-react';
import { soundFX } from '../utils/audio.ts';

export const Philosophy: React.FC = () => {
  return (
    <section id="philosophy" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-12 border-b border-white/[0.08]">
        <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#FF5500] block mb-2">
          Guiding Creative Tenets
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Philosophy & The Craft
        </h2>
        <p className="text-neutral-400 font-body text-base max-w-2xl mt-3">
          Why approaching software with an editor&apos;s eye and video with an engineer&apos;s rigor creates disproportionate impact.
        </p>
      </div>

      {/* Main Split Section: Portrait & Bio on Left, Tenets on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 items-stretch">
        {/* Left Column: Portrait & Personal Manifesto */}
        <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-2xl bg-[#0E0E14] border border-white/[0.08]">
          <div className="space-y-6">
            {/* Portrait Image Frame */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <img
                src="/src/assets/images/avatar_akilesh_1794157387438.jpg"
                alt="Akilesh portrait"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E14] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-neutral-300">
                <span className="text-white font-semibold">AKILESH</span>
                <span className="text-[#FF5500]">SAN FRANCISCO / REMOTE</span>
              </div>
            </div>

            {/* Quote */}
            <div className="relative p-6 rounded-xl bg-[#14141E] border border-white/[0.06]">
              <Quote className="w-6 h-6 text-[#FF5500]/40 mb-3" />
              <p className="font-display text-base sm:text-lg font-medium text-neutral-200 italic leading-relaxed">
                &quot;{PORTFOLIO_DATA.philosophy.quote}&quot;
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-mono text-neutral-400 flex items-center justify-between">
            <span>DISCIPLINE: DUAL-SPECIALIST</span>
            <span className="text-[#FF5500] font-semibold">EST. 2021</span>
          </div>
        </div>

        {/* Right Column: 4 Editorial Tenets */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            {PORTFOLIO_DATA.philosophy.tenets.map((tenet) => (
              <div
                key={tenet.number}
                onMouseEnter={() => soundFX.playHover()}
                className="p-7 rounded-2xl bg-[#0E0E14] border border-white/[0.08] hover:border-[#FF5500]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#FF5500] block mb-3">
                    {tenet.number}.
                  </span>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-[#FFA066] transition-colors mb-2 tracking-tight">
                    {tenet.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {tenet.body}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-neutral-600 uppercase">
                  NON-NEGOTIABLE BENCHMARK
                </div>
              </div>
            ))}
          </div>

          {/* Full-width Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#0E0E14] border border-white/[0.08] mt-2">
            {PORTFOLIO_DATA.philosophy.stats.map((stat, sIdx) => (
              <div key={sIdx} className="text-left">
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-white tabular-nums block mb-1">
                  {stat.value}
                </span>
                <span className="text-xs font-mono text-neutral-400 block leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
