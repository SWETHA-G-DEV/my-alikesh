import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio.ts';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { soundFX } from '../utils/audio.ts';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-12 border-b border-white/[0.08]">
        <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#FF5500] block mb-2">
          Career Trajectory
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Experience & Studios
        </h2>
        <p className="text-neutral-400 font-body text-base max-w-2xl mt-3">
          Proven track record leading commercial video workflows, brand narrative systems, and modern web applications.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative mt-12 space-y-12 before:absolute before:inset-y-0 before:left-3 md:before:left-1/2 before:-translate-x-1/2 before:w-[1px] before:bg-white/[0.08]">
        {PORTFOLIO_DATA.experience.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={item.period}
              onMouseEnter={() => soundFX.playHover()}
              className={`relative flex flex-col md:flex-row items-start ${
                isEven ? 'md:flex-row-reverse' : ''
              } gap-8 group`}
            >
              {/* Timeline Center Node */}
              <div className="absolute left-3 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#0E0E14] border-2 border-[#FF5500] flex items-center justify-center z-10 shadow-[0_0_15px_rgba(255,85,0,0.4)]">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>

              {/* Card Container */}
              <div className="ml-10 md:ml-0 md:w-1/2 md:px-8">
                <div className="p-6 sm:p-8 rounded-2xl bg-[#0E0E14] border border-white/[0.08] hover:border-[#FF5500]/40 transition-all shadow-sm">
                  {/* Period & Role */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-semibold text-[#FF5500] tracking-wider">
                      {item.period}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                      <MapPin className="w-3 h-3 text-neutral-500" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {item.role}
                  </h3>

                  <div className="text-sm font-body text-[#FFA066] font-medium mt-0.5 mb-4">
                    {item.company}
                  </div>

                  <p className="text-neutral-300 font-body text-sm leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* Deliverables Bullet List */}
                  <div className="space-y-2 mb-6">
                    {item.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-400">
                        <CheckCircle2 className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tools Stack (Zero-Pill format) */}
                  <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-x-2 text-xs font-mono text-neutral-400">
                    <span className="text-neutral-500 uppercase tracking-wider text-[11px]">Primary Tools:</span>
                    {item.tools.map((tool, tIdx) => (
                      <React.Fragment key={tool}>
                        <span className="text-neutral-300">{tool}</span>
                        {tIdx < item.tools.length - 1 && <span className="text-neutral-600">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
