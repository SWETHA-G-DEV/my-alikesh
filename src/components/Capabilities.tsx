import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio.ts';
import { Video, Code2, Cpu } from 'lucide-react';
import { soundFX } from '../utils/audio.ts';

export const Capabilities: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes('video')) {
      return <Video className="w-5 h-5 text-[#FF5500]" />;
    }
    if (category.toLowerCase().includes('engineering')) {
      return <Code2 className="w-5 h-5 text-[#FF5500]" />;
    }
    return <Cpu className="w-5 h-5 text-[#FF5500]" />;
  };

  return (
    <section id="capabilities" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-12 border-b border-white/[0.08]">
        <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#FF5500] block mb-2">
          Technical & Creative Arsenal
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Capabilities & Depth
        </h2>
        <p className="text-neutral-400 font-body text-base max-w-2xl mt-3">
          Cross-pollinating non-linear video editing instincts with modern, type-safe full-stack software architecture.
        </p>
      </div>

      {/* 3 Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {PORTFOLIO_DATA.skills.map((category) => (
          <div
            key={category.category}
            onMouseEnter={() => soundFX.playHover()}
            className="p-7 sm:p-8 rounded-2xl bg-[#0E0E14] border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-all shadow-sm"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-[#14141E] border border-white/[0.06]">
                  {getCategoryIcon(category.category)}
                </div>
                <h3 className="font-display text-xl font-bold text-white tracking-tight">
                  {category.category}
                </h3>
              </div>

              <p className="text-xs text-neutral-400 font-body leading-relaxed mb-6">
                {category.description}
              </p>

              {/* Skill Bars */}
              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex justify-between items-baseline text-xs font-mono">
                      <span className="text-neutral-200 font-medium">{skill.name}</span>
                      <span className="text-[#FF5500] tabular-nums font-semibold">{skill.level}%</span>
                    </div>

                    {/* Progress track */}
                    <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF5500] to-[#FFA066] rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    {skill.highlight && (
                      <span className="text-[11px] font-mono text-neutral-500 block">
                        {skill.highlight}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-500">
              <span>PROFICIENCY VERIFIED</span>
              <span className="text-neutral-400">STUDIO GRADE</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
